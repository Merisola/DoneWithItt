import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../Styles/gameStyles"; // Adjust the path if necessary

const LanguageSelector = ({ setLanguage, language }) => {
  return (
    <View style={styles.languageSelectorContainer}>
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setLanguage("en")}
      >
        <Text style={styles.languageButtonText}>EN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setLanguage("fr")}
      >
        <Text style={styles.languageButtonText}>FR</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setLanguage("am")}
      >
        <Text style={styles.languageButtonText}>AMH</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageSelector;
