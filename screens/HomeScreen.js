import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Switch, Button, useWindowDimensions } from 'react-native';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import BlogCard from '../components/NewsCard';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';



const focusOptions = [
  "Ondernemen en IT",
  "Mens en welzijn",
  "Kennis en onderzoek",
  "Werk en leren",
  "Basisverpleegkunde",
  "Buitengewoon leren",
  "Integraal en creatief",
  "Gezondheid en wetenschap",
];

const finaliteitOptions = ["Verder studeren", "Gaan werken", "Werken of studeren"];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isWide = width >= 600;

  const [campussen, setCampussen] = useState([]);
  const [selectedCampus, setSelectedCampus] = useState('');
  const [selectedFocus, setSelectedFocus] = useState('');
  const [selectedFinaliteit, setSelectedFinaliteit] = useState('');

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    fetch('https://api.webflow.com/v2/collections/6a134b878a46ed51243b908d/items/live', {
      headers: { 'Authorization': 'Bearer f793e95b30f968796a1656b22d14563588d2c9c5f8bb59b9444c39d36f3e712e' }
    })
      .then(r => r.json())
      .then(data => setCampussen(data.items.map(i => i.fieldData.name)))
      .catch(() => {});
  }, []);





  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <ScrollView>
        <Text style={styles.sectionTitle}>Welkom bij het{'\n'}Busleyden Atheneum!</Text>

        {/* Studiezoeker */}
        <View style={styles.studieBg}>
          <Text style={styles.studieTitle}>Weet jij al wat{'\n'}je wil worden?</Text>
          <Text style={styles.studieSubtitle}>Onze studiezoeker helpt je de juiste richting vinden.</Text>
          <View style={styles.studieCard}>
            <View style={[styles.pickersRow, isWide && styles.pickersRowWide]}>
              <View style={[styles.pickerBlock, isWide && styles.pickerBlockWide]}>
                <Text style={styles.pickerLabel}>Campus</Text>
                <View style={styles.pickerWrap}>
                  <Picker
                    selectedValue={selectedCampus}
                    onValueChange={setSelectedCampus}
                    style={styles.picker}
                    dropdownIconColor="#555"
                  >
                    <Picker.Item label="Alle campussen" value="" />
                    {campussen.map(c => <Picker.Item key={c} label={c} value={c} />)}
                  </Picker>
                </View>
              </View>
              <View style={[styles.pickerBlock, isWide && styles.pickerBlockWide]}>
                <Text style={styles.pickerLabel}>Domein</Text>
                <View style={styles.pickerWrap}>
                  <Picker
                    selectedValue={selectedFocus}
                    onValueChange={setSelectedFocus}
                    style={styles.picker}
                    dropdownIconColor="#555"
                  >
                    <Picker.Item label="Alle domeinen" value="" />
                    {focusOptions.map(f => <Picker.Item key={f} label={f} value={f} />)}
                  </Picker>
                </View>
              </View>
              <View style={[styles.pickerBlock, isWide && styles.pickerBlockWide]}>
                <Text style={styles.pickerLabel}>Finaliteit</Text>
                <View style={styles.pickerWrap}>
                  <Picker
                    selectedValue={selectedFinaliteit}
                    onValueChange={setSelectedFinaliteit}
                    style={styles.picker}
                    dropdownIconColor="#555"
                  >
                    <Picker.Item label="Alle finaliteiten" value="" />
                    {finaliteitOptions.map(f => <Picker.Item key={f} label={f} value={f} />)}
                  </Picker>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.studieButton}
              
            >
              <Text style={styles.studieButtonText}>Zoek jouw studierichting</Text>
            </TouchableOpacity>
          </View>
        </View>
    

        <Text style={{...styles.h2, marginHorizontal: 16, marginBottom: 20}}>
          Of speel onze minigame!
        </Text>
        <TouchableOpacity style={{...styles.minigameButton, marginHorizontal: 16, marginBottom: 30}} onPress={() => navigation.navigate('LockerGame')}>
          <Text style={styles.minigameButtonText}>Kluisje Kraken</Text>
        </TouchableOpacity>


      </ScrollView>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 28,
    marginVertical: 20,
    marginLeft: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#000',
    textAlign: 'center',
  },
  searchInput: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F2F2F2',
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    color: '#000',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterSection: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 13,
    color: '#555',
    fontFamily: 'Poppins_500Medium',
    marginBottom: 6,
  },
  pickerContainer: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  resetButtonContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 4,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderBottomWidth: 2,
    borderBottomColor: '#E0E0E0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  tabButtonActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#86BC25',
    backgroundColor: '#fff',
  },
  tabButtonText: {
    fontSize: 15,
    color: '#888',
    fontFamily: 'Poppins_500Medium',
  },
  tabButtonTextActive: {
    color: '#000',
    fontFamily: 'Poppins_700Bold',
  },
  h2: {
    fontSize: 18,
    color: '#000',
    marginBottom: 8,
    fontFamily: 'Poppins_700Bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    lineHeight: 22,
    fontFamily: 'Poppins_400Regular',
  },
  minigameButton: {
    backgroundColor: '#86BC25',
    paddingVertical: 12,
    paddingHorizontal: 48,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  minigameButtonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#fff',
  },
  studieBg: {
    backgroundColor: '#86BC25',
    paddingVertical: 36,
    paddingHorizontal: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  studieTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 10,
  },
  studieSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#f0f0f0',
    textAlign: 'center',
    marginBottom: 24,
  },
  studieCard: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 20,
    width: '100%',
    maxWidth: 900,
  },
  pickersRow: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  pickersRowWide: {
    flexDirection: 'row',
    gap: 12,
  },
  pickerBlock: {
    marginBottom: 12,
  },
  pickerBlockWide: {
    flex: 1,
    marginBottom: 0,
  },
  pickerLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    color: '#555',
    marginBottom: 6,
  },
  pickerWrap: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: '#333',
  },
  studieButton: {
    backgroundColor: '#86BC25',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 2,
  },
  studieButtonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 15,
    color: '#fff',
  },
});

export default HomeScreen;
