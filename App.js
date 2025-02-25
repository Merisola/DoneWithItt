// src/App.js
import React from "react";
import { LanguageProvider } from "./src/context/LanguageContext"; // This should work now
import AppNavigator from "./src/navigation/AppNavigator"; // Adjust path as needed
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </LanguageProvider>
  );
};

export default App;
