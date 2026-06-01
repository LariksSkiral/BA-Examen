import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import ProductsStack from './ProductsStack';
import NewsStack from './NewsStack';
import HomeStack from './HomeStack';
import CampusStack from './CampusStack';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarActiveTintColor: '#86BC25',
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'Webshop') {
      iconName = focused ? 'cart' : 'cart-outline';
    } else if (route.name === 'Nieuws') {
      iconName = focused ? 'newspaper' : 'newspaper-outline';
    } else if (route.name === 'Campus') {
      iconName = focused ? 'school' : 'school-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
});




export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Webshop" component={ProductsStack} />
        <Tab.Screen name="Nieuws" component={NewsStack} />
        <Tab.Screen name="Campus" component={CampusStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
