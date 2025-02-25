import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ColorGame from "../screens/ColorGame";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ColorGame" component={ColorGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
