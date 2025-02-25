import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator"; // Path to AppNavigator
import { LanguageProvider } from "./src/context/LanguageContext"; // Path to LanguageContext

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
