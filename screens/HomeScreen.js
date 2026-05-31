import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Switch, Button } from 'react-native';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import BlogCard from '../components/NewsCard';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';



const HomeScreen = () => {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });





  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <ScrollView>
        <Text style={styles.sectionTitle}>Welkom bij het Busleyden Atheneum!</Text>
        <Text style={{...styles.h2, marginHorizontal: 16, marginBottom: 20}}>
          Ontdek ons studieaanbod
        </Text>
        <Text style={{...styles.description, marginHorizontal: 16, marginBottom: 20}}>
          Ontdek onze fantastische webshop met een breed assortiment aan producten, van trendy kleding tot handige accessoires. We bieden ook een inspirerende blog vol nieuws en tips. En vergeet niet om onze spannende kluisjes te kraken voor geweldige prijzen!
        </Text>

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
    fontSize: 22,
    marginVertical: 20,
    marginLeft: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#000',
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
  picker: {
    height: 50,
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
});

export default HomeScreen;
