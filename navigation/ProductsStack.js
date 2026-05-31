import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsScreen from "../screens/ProductsScreen";
import ProductDetail from "../screens/ProductDetail";
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

export default function ProductsStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Products" component={ProductsScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
        </Stack.Navigator>
    );
}