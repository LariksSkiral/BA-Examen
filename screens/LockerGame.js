import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

// De vier mogelijke pijlen
const ARROWS = ['↑', '↓', '←', '→'];

// Geeft terug hoeveel pijlen de reeks heeft voor een bepaalde ronde
function getSequenceLength(round) {
  if (round <= 4) {
    return round + 2; // ronde 1 = 3, ronde 2 = 4, ronde 3 = 5, ronde 4 = 6
  }
  return 7; // vanaf ronde 5 altijd 7
}

// Geeft terug hoeveel seconden de speler heeft om in te voeren
function getTimerMax(round) {
  if (round <= 4) {
    return round + 8; // ronde 1 = 9s, ronde 2 = 10s, ronde 3 = 11s, ronde 4 = 12s
  }
  // Vanaf ronde 5 wordt de timer korter, met een minimum van 3 seconden
  var timer = 12 - (round - 4);
  if (timer < 3) {
    return 3;
  }
  return timer;
}

// Maakt een willekeurige reeks pijlen van de opgegeven lengte
function generateSequence(length) {
  var result = [];
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * ARROWS.length); //math.random geeft een getal tussen 0 (inclusief) en 1 (exclusief), dus vermenigvuldigen met de lengte van ARROWS en afronden naar beneden geeft een index van 0 tot 3
    result.push(ARROWS[randomIndex]);
  }
  return result;
}

const LockerGame = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  // Huidige score — reset naar 0 bij game over
  const [score, setScore] = useState(0);

  // Hoogste score — wordt opgeslagen en geladen via AsyncStorage
  const [highScore, setHighScore] = useState(0);

  useEffect(function () {
    AsyncStorage.getItem('highScore').then(function (value) {
      if (value !== null) {
        setHighScore(parseInt(value, 10));
      }
    });
  }, []);

  // Huidige ronde — reset naar 1 bij game over
  const [round, setRound] = useState(1);

  // De reeks pijlen die de speler moet onthouden
  const [sequence, setSequence] = useState([]);

  // Wat de speler tot nu toe heeft ingevoerd
  const [playerInput, setPlayerInput] = useState([]);

  // Fase van het spel: 'idle', 'memorize', 'input', 'result'
  const [phase, setPhase] = useState('idle');

  // Hoeveel seconden er nog over zijn
  const [timerValue, setTimerValue] = useState(0);

  // Maximale tijd voor de huidige ronde (nodig voor de breedte van de balk)
  const [timerMax, setTimerMax] = useState(9);

  // Of de info-modal getoond wordt
  const [showInfo, setShowInfo] = useState(false);

  // Bijhouden of de speler al minstens één keer gespeeld heeft (voor "Herstart spel" en game over tekst)
  const [hasPlayed, setHasPlayed] = useState(false);

  // Ref om de setInterval in op te slaan zodat we hem kunnen stoppen
  const intervalRef = useRef(null);

  // Stopt de lopende timer
  function stopTimer() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  // Start de afteltimer voor de invoerfase
  // Bij 0 is de tijd op en volgt game over
  function startTimer(max) {
    stopTimer();
    setTimerValue(max);
    intervalRef.current = setInterval(function () {
      setTimerValue(function (prev) {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  // Zorgt ervoor dat game over wordt getriggerd als de timer op 0 komt tijdens de invoerfase
  useEffect(function () {
    if (phase === 'input' && timerValue === 0) {
      triggerGameOver();
    }
  }, [timerValue, phase]);

  // Start een nieuwe ronde: genereer reeks, toon 'memorize'-fase, schakel na 2s naar 'input'
  function startRound(roundNumber) {
    var length = getSequenceLength(roundNumber);
    var max = getTimerMax(roundNumber);
    var newSequence = generateSequence(length);

    stopTimer();
    setHasPlayed(true);
    setRound(roundNumber);
    setSequence(newSequence);
    setPlayerInput([]);
    setTimerMax(max);
    setTimerValue(max);
    setPhase('memorize');

    setTimeout(function () {
      setPhase('input');
      startTimer(max);
    }, 2000);
  }

  // Reset het spel volledig naar de begintoestand
  function resetGame() {
    stopTimer();
    setScore(0);
    setRound(1);
    setSequence([]);
    setPlayerInput([]);
    setTimerValue(0);
    setPhase('idle');
  }

  // Zet de score op 0 en ronde op 1, toont het idle-scherm
  function triggerGameOver() {
    stopTimer();
    setScore(0);
    setRound(1);
    setSequence([]);
    setPlayerInput([]);
    setPhase('idle');
  }

  // Verwerkt een druk op een pijlknop
  // Controleert of de invoer klopt; bij volledig correcte reeks → volgende ronde; bij fout → game over
  function handleArrowPress(arrow) {
    if (phase !== 'input') {
      return;
    }

    var newInput = playerInput.concat([arrow]);
    var index = newInput.length - 1;

    // Controleer of de ingedrukte pijl klopt
    if (newInput[index] !== sequence[index]) {
      // Fout: game over
      setPlayerInput(newInput);
      stopTimer();
      setTimeout(function () {
        triggerGameOver();
      }, 400);
      return;
    }

    // Correct tot nu toe
    if (newInput.length === sequence.length) {
      // Hele reeks correct: punten tellen, volgende ronde starten
      stopTimer();
      var newScore = score + round * 10;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        AsyncStorage.setItem('highScore', String(newScore));
      }
      setPhase('result');
      setPlayerInput(newInput);
      setTimeout(function () {
        startRound(round + 1);
      }, 800);
    } else {
      // Nog niet klaar, ga door
      setPlayerInput(newInput);
    }
  }

  // Berekent de kleur van de timerbalk op basis van de resterende tijd
  function getTimerColor() {
    if (timerMax === 0) {
      return '#86BC25';
    }
    var ratio = timerValue / timerMax;
    if (ratio > 0.66) {
      return '#86BC25';
    }
    if (ratio > 0.33) {
      return '#FFA500';
    }
    return '#FF4444';
  }

  // Berekent de breedte van de timerbalk als percentage
  function getTimerWidth() {
    if (timerMax === 0) {
      return '100%';
    }
    var percent = (timerValue / timerMax) * 100;
    return percent + '%';
  }

  // Bepaalt welk slotje getoond wordt
  function getLockEmoji() {
    if (phase === 'result') {
      return '🔓';
    }
    return '🔒';
  }

  // Bepaalt de instructietekst
  function getInstructionText() {
    if (phase === 'idle') {
      if (hasPlayed) {
        return 'Druk op "Herstart spel" om opnieuw te spelen!';
      }
      return 'Druk op "Start spel" om te beginnen!';
    }
    if (phase === 'memorize') {
      return 'Onthoud de reeks...';
    }
    if (phase === 'input') {
      return 'Voer de reeks in! (' + playerInput.length + '/' + sequence.length + ')';
    }
    if (phase === 'result') {
      return 'Correct! Volgende ronde...';
    }
    return '';
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContent}>

        {/* Info-knop rechtsboven */}
        <TouchableOpacity
          style={styles.infoButton}
          onPress={function () { setShowInfo(true); }}
        >
          <Text style={styles.infoButtonText}>ⓘ</Text>
        </TouchableOpacity>

        {/* Bovenste statistieken: Score, Ronde, High Score */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Score</Text>
            <Text style={styles.statValue}>{score}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Ronde</Text>
            <Text style={styles.statValue}>{round}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>High Score</Text>
            <Text style={styles.statValue}>{highScore}</Text>
          </View>
        </View>

        {/* Timerbalk — achtergrond is lichtgrijs, de gekleurde balk loopt leeg */}
        <View style={styles.timerBarBackground}>
          <View
            style={[
              styles.timerBarFill,
              {
                width: getTimerWidth(),
                backgroundColor: getTimerColor(),
              },
            ]}
          />
        </View>

        {/* Slotje in het midden */}
        <Text style={styles.lockEmoji}>{getLockEmoji()}</Text>

        {/* Reeks pijlen — alleen zichtbaar tijdens de memorize-fase */}
        {phase === 'memorize' && (
          <View style={styles.sequenceRow}>
            {sequence.map(function (arrow, index) {
              return (
                <Text key={index} style={styles.sequenceArrow}>
                  {arrow}
                </Text>
              );
            })}
          </View>
        )}

        {/* Lege ruimte als de reeks niet zichtbaar is, zodat de layout niet springt */}
        {phase !== 'memorize' && (
          <View style={styles.sequencePlaceholder} />
        )}

        {/* Instructietekst */}
        <Text style={styles.instructionText}>{getInstructionText()}</Text>

        {/* Ingevoerde pijlen van de speler (feedback) — altijd zichtbaar zodat de layout niet verspringt */}
        <View style={styles.inputFeedbackRow}>
          {phase === 'input' && playerInput.map(function (arrow, index) {
            return (
              <Text key={index} style={styles.inputFeedbackArrow}>
                {arrow}
              </Text>
            );
          })}
        </View>

        {/* Pijlknoppen in 2x2 grid — alleen actief tijdens invoerfase */}
        <View style={styles.arrowGrid}>
          <View style={styles.arrowRow}>
            <TouchableOpacity
              style={[styles.arrowButton, phase !== 'input' && styles.arrowButtonDisabled]}
              onPress={function () { handleArrowPress('↑'); }}
              disabled={phase !== 'input'}
            >
              <Text style={styles.arrowButtonText}>↑</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.arrowButton, phase !== 'input' && styles.arrowButtonDisabled]}
              onPress={function () { handleArrowPress('→'); }}
              disabled={phase !== 'input'}
            >
              <Text style={styles.arrowButtonText}>→</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.arrowRow}>
            <TouchableOpacity
              style={[styles.arrowButton, phase !== 'input' && styles.arrowButtonDisabled]}
              onPress={function () { handleArrowPress('↓'); }}
              disabled={phase !== 'input'}
            >
              <Text style={styles.arrowButtonText}>↓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.arrowButton, phase !== 'input' && styles.arrowButtonDisabled]}
              onPress={function () { handleArrowPress('←'); }}
              disabled={phase !== 'input'}
            >
              <Text style={styles.arrowButtonText}>←</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Game over tekst — alleen zichtbaar na een afgelopen spel */}
        {phase === 'idle' && hasPlayed && (
          <Text style={styles.gameOverText}>Game Over!</Text>
        )}

        {/* Start/Herstart-knop — alleen zichtbaar in de idle-fase */}
        {phase === 'idle' && (
          <TouchableOpacity
            style={styles.startButton}
            onPress={function () { startRound(1); }}
          >
            <Text style={styles.startButtonText}>
              {hasPlayed ? 'Herstart spel' : 'Start spel'}
            </Text>
          </TouchableOpacity>
        )}

      </View>

      {/* Info Modal */}
      <Modal
        visible={showInfo}
        transparent={true}
        animationType="fade"
        onRequestClose={function () { setShowInfo(false); }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Hoe werkt Kluisje Kraken?</Text>

            <Text style={styles.modalText}>
              Een reeks pijlen verschijnt kort op het scherm. Onthoud ze goed!
            </Text>
            <Text style={styles.modalText}>
              Na 2 seconden verdwijnen de pijlen. Voer daarna dezelfde reeks in
              door op de pijlknoppen te drukken.
            </Text>
            <Text style={styles.modalText}>
              Je hebt beperkte tijd — kijk naar de balk bovenaan. Die gaat van
              groen naar oranje naar rood naarmate de tijd opraakt.
            </Text>
            <Text style={styles.modalText}>
              Bij een fout of als de tijd op is, start het spel opnieuw vanaf
              ronde 1 en verlies je je score.
            </Text>
            <Text style={styles.modalText}>
              Elke correcte ronde geeft je ronde × 10 punten. De reeks wordt
              langer per ronde (max. 7 pijlen) en de timer wordt korter vanaf
              ronde 5.
            </Text>
            <Text style={styles.modalText}>
              Je high score blijft bewaard, ook als je de app afsluit.
            </Text>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={function () { setShowInfo(false); }}
            >
              <Text style={styles.modalCloseButtonText}>Sluiten</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default LockerGame;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
  },

  // Info-knop rechtsboven
  infoButton: {
    alignSelf: 'flex-end',
    marginTop: 4,
    marginBottom: 0,
    padding: 4,
  },
  infoButtonText: {
    fontSize: 22,
    color: '#86BC25',
    fontFamily: 'Poppins_700Bold',
  },

  // Statistieken bovenaan
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#888',
  },
  statValue: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    color: '#000',
  },

  // Timerbalk
  timerBarBackground: {
    width: '100%',
    height: 14,
    backgroundColor: '#E0E0E0',
    marginBottom: 10,
  },
  timerBarFill: {
    height: 14,
  },

  // Slotje emoji
  lockEmoji: {
    fontSize: 60,
    marginBottom: 6,
  },

  // Reeks pijlen tijdens de memorize-fase
  sequenceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 6,
    minHeight: 44,
  },
  sequenceArrow: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: '#86BC25',
    marginHorizontal: 4,
  },

  // Placeholder zodat de layout niet verspringt als de reeks verborgen is
  sequencePlaceholder: {
    height: 44,
    marginBottom: 6,
  },

  // Instructietekst
  instructionText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    textAlign: 'center',
  },

  // Ingevoerde pijlen als feedback — vaste hoogte zodat de knoppen niet verschuiven
  inputFeedbackRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 6,
    height: 36,
  },
  inputFeedbackArrow: {
    fontSize: 24,
    fontFamily: 'Poppins_400Regular',
    color: '#000',
    marginHorizontal: 4,
  },

  // Game over tekst
  gameOverText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#FF4444',
    marginBottom: 8,
    textAlign: 'center',
  },

  // Pijlknoppen grid
  arrowGrid: {
    width: '100%',
    marginBottom: 12,
  },
  arrowRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  arrowButton: {
    width: 90,
    height: 90,
    backgroundColor: '#86BC25',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  arrowButtonDisabled: {
    backgroundColor: '#F2F2F2',
  },
  arrowButtonText: {
    fontSize: 36,
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
  },

  // Start-knop
  startButton: {
    backgroundColor: '#86BC25',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  startButtonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#fff',
  },

  // Modal overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalBox: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  modalTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: '#000',
    marginBottom: 16,
  },
  modalText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    lineHeight: 22,
  },
  modalCloseButton: {
    backgroundColor: '#86BC25',
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  modalCloseButtonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 15,
    color: '#fff',
  },
});
