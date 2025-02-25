import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ColorGame from "../screens/ColorGame"; // Adjust path as needed
// Import other screens as needed

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ColorGame" component={ColorGame} />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
