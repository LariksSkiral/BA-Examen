import react from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LockerGame from '../screens/LockerGame';
import { Image } from 'react-native';


const Stack = createNativeStackNavigator();


const screenOptions = {
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerTitle: () => (
    <Image
      source={require('../assets/logo.png')}
      style={{ width: 250, height: 40 }}
      resizeMode="contain"
    />
  ),
  headerTitleAlign: 'center',
};

export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="LockerGame" component={LockerGame} />
        </Stack.Navigator>
    );
}