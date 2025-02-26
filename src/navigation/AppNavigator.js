import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ColorGame from "../screens/ColorGame";

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
