import React from "react";
import { LanguageProvider } from "./src/context/LanguageContext"; // This should work now
import AppNavigator from "./src/navigation/AppNavigator"; // Adjust path as needed
import { NavigationContainer } from "@react-navigation/native";
import firebaseApp from "./src/config/firebaseConfig"; // Adjust path based on location

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
