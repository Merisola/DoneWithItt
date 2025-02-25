import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const ColorGame = () => {
  // Function to generate random RGB color
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { rgbString: `rgb(${r}, ${g}, ${b})`, values: [r, g, b] };
  };

  // State to hold target color and color options
  const [targetColor, setTargetColor] = useState(getRandomColor());
  const [colorOptions, setColorOptions] = useState([]);

  // Generate new set of color options and set target color
  const generateColors = () => {
    const newTarget = getRandomColor();
    const options = [newTarget];

    // Generate 5 more random colors
    while (options.length < 6) {
      const newColor = getRandomColor();
      if (!options.some((color) => color.rgbString === newColor.rgbString)) {
        options.push(newColor);
      }
    }

    setColorOptions(options.sort(() => Math.random() - 0.5));
    setTargetColor(newTarget);
  };

  // Check the player's guess and give feedback
  const checkAnswer = (selectedColor) => {
    if (selectedColor.rgbString === targetColor.rgbString) {
      Alert.alert("Correct!", "You guessed the color correctly!");
    } else {
      Alert.alert("Try Again!", "Wrong guess. Keep trying!");
    }
  };

  useEffect(() => {
    generateColors();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess the Color!</Text>
      {/* Display RGB string as the target, without showing the actual color */}
      <Text style={styles.rgbDisplay}>
        Target Color: {targetColor.rgbString}
      </Text>
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
        <Text style={styles.buttonText}>New Colors</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  rgbDisplay: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
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
