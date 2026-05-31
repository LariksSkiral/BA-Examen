import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import ProductCard from './components/ProductCard';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import HomeScreen from './screens/HomeScreen';
import ProductDetail from './screens/ProductDetail';
import NewsDetail from './screens/NewsDetail';
import LockerGame from './screens/LockerGame';
import AppNavigator from './navigation/AppNavigator';

const Tab = createBottomTabNavigator();

// const HeaderLogo = () => (
//   <Image
//     source={require('./assets/logo.png')}
//     style={{ width: 400, height: 40 }}
//     resizeMode="contain"
//   />
// );

// const HeaderOptions = {
//   headerStyle: {
//     backgroundColor: '#ffffff',
//   },
//   headerTintColor: '#fff',
//   headerTitle: () => <HeaderLogo />,
//   headerTitleAlign: 'center',
// };

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return <AppNavigator />;
}
