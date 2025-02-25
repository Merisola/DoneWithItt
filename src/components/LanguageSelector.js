// src/components/LanguageSelector.js
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useLanguage } from "../context/LanguageContext";

const LanguageSelector = () => {
  const { toggleLanguage } = useLanguage();

  return (
    <View style={styles.languageContainer}>
      <TouchableOpacity
        onPress={() => toggleLanguage("en")}
        style={styles.languageButton}
      >
        <Text style={styles.buttonText}>EN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => toggleLanguage("fr")}
        style={styles.languageButton}
      >
        <Text style={styles.buttonText}>FR</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => toggleLanguage("am")}
        style={styles.languageButton}
      >
        <Text style={styles.buttonText}>AM</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  languageContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  languageButton: {
    margin: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LanguageSelector;
