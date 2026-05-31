import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsScreen from "../screens/NewsScreen";
import NewsDetail from "../screens/NewsDetail";
import { Image } from "react-native";

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

export default function NewsStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="News" component={NewsScreen} />
            <Stack.Screen name="NewsDetail" component={NewsDetail} />
        </Stack.Navigator>
    );
}