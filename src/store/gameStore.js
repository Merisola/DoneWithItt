import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import translations from "../translation/translations";
import { useLanguage } from "../context/LanguageContext";

const ColorGame = () => {
  const { language, setLanguage } = useLanguage(); // Use language context
  const [difficulty, setDifficulty] = useState("Easy");
  const [targetColor, setTargetColor] = useState(getRandomColor());
  const [colorOptions, setColorOptions] = useState([]);

  // (Include getRandomColor, generateColors, and checkAnswer functions here)

  useEffect(() => {
    generateColors();
  }, [difficulty]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translations[language].title}</Text>
      <Text style={styles.rgbText}>{`RGB(${targetColor.values.join(
        ", "
      )})`}</Text>
      <View style={styles.languageContainer}>
        <TouchableOpacity onPress={() => setLanguage("en")}>
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLanguage("am")}>
          <Text style={styles.buttonText}>አማርኛ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLanguage("fr")}>
          <Text style={styles.buttonText}>Français</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.difficultyContainer}>
        {["Easy", "Hard"].map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => setDifficulty(level)}
            style={[
              styles.difficultyButton,
              difficulty === level && styles.activeButton,
            ]}
          >
            <Text style={styles.buttonText}>
              {translations[language][level.toLowerCase()]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.optionsContainer}>
        {colorOptions.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorButton, { backgroundColor: color.rgbString }]}
            onPress={() => checkAnswer(color)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.newColorsButton} onPress={generateColors}>
        <Text style={styles.buttonText}>
          {translations[language].newColors}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// (Include styles here)

export default ColorGame;
