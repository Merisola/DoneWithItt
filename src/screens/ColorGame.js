import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import translations from "../translation/translations";
import { useLanguage } from "../context/LanguageContext";

const ColorGame = () => {
  // Function to generate a random RGB color
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { rgbString: `rgb(${r}, ${g}, ${b})`, values: [r, g, b] };
  };

  const { language } = useLanguage(); // Get current language
  const [difficulty, setDifficulty] = useState("Easy"); // Default difficulty
  const [targetColor, setTargetColor] = useState(getRandomColor());
  const [colorOptions, setColorOptions] = useState([]);

  const generateColors = () => {
    const numChoices = difficulty === "Easy" ? 3 : 6; // Number of choices based on difficulty
    const newTarget = getRandomColor();
    const options = [newTarget];

    // Generate unique color options
    while (options.length < numChoices) {
      const newColor = getRandomColor();
      if (!options.some((color) => color.rgbString === newColor.rgbString)) {
        options.push(newColor);
      }
    }

    setColorOptions(options.sort(() => Math.random() - 0.5));
    setTargetColor(newTarget);
  };

  const checkAnswer = (selectedColor) => {
    const message =
      selectedColor.rgbString === targetColor.rgbString
        ? translations[language].correct
        : translations[language].wrong;

    Alert.alert(message, translations[language].guessColor);
    if (message === translations[language].correct) {
      generateColors(); // Generate new colors after a correct guess
    }
  };

  useEffect(() => {
    generateColors();
  }, [difficulty]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translations[language].title}</Text>
      <Text style={styles.rgbText}>{`RGB(${targetColor.values.join(
        ", "
      )})`}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  rgbText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  difficultyContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  difficultyButton: {
    margin: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#0056b3",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  colorButton: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 10,
  },
  newColorsButton: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ColorGame;
