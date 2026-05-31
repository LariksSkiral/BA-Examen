import react from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CampusScreen from '../screens/CampusScreen';
import CampusDetail from '../screens/CampusDetail';
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

export default function CampusStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="CampusScreen" component={CampusScreen} />
            <Stack.Screen name="CampusDetail" component={CampusDetail} />
        </Stack.Navigator>
    );
}   