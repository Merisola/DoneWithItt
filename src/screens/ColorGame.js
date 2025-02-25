import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translation/translations";

const ColorGame = () => {
  const { language, setLanguage } = useLanguage();
  const [targetColor, setTargetColor] = useState(null);
  const [colorOptions, setColorOptions] = useState([]);
  const [difficulty, setDifficulty] = useState("Easy"); // Default difficulty
  const [isCorrect, setIsCorrect] = useState(false); // Track if the last guess was correct

  // Function to generate a random RGB color
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { rgbString: `rgb(${r}, ${g}, ${b})`, values: [r, g, b] };
  };

  const generateColors = () => {
    const newTarget = getRandomColor();
    setTargetColor(newTarget);

    // Generate colors based on difficulty
    const optionsCount = difficulty === "Easy" ? 3 : 6;
    const newColorOptions = [newTarget];

    // Add more random colors until we reach the desired count
    while (newColorOptions.length < optionsCount) {
      const randomColor = getRandomColor();
      // Ensure no duplicates
      if (
        !newColorOptions.some(
          (color) => color.rgbString === randomColor.rgbString
        )
      ) {
        newColorOptions.push(randomColor);
      }
    }

    // Shuffle the options for randomness
    setColorOptions(newColorOptions.sort(() => Math.random() - 0.5));
    setIsCorrect(false); // Reset correct status for the new round
  };

  const checkAnswer = (selectedColor) => {
    if (selectedColor.rgbString === targetColor.rgbString) {
      Alert.alert("Correct", "You guessed the right color!");
      setIsCorrect(true);
    } else {
      Alert.alert("Wrong", "Try again!");
    }
  };

  const handlePlayAgain = () => {
    generateColors();
  };

  const showRules = () => {
    Alert.alert(
      "Game Rules",
      "Hello!\n\n" +
        "In this game, you will guess the RGB color based on the displayed square RGB values.\n" +
        "(Hint: The first number indicates the amount of RED, the second number indicates the amount of GREEN, while the third number indicates the amount of BLUE!)\n\n" +
        "Ok, got it!",
      [{ text: "OK" }]
    );
  };

  useEffect(() => {
    showRules(); // Show rules when the game starts
    generateColors();
  }, [difficulty]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Great Color Game</Text>
      <Text style={styles.subtitle}>
        Guess the color of this RGB combination:
      </Text>

      {/* Display the target RGB string directly after the subtitle */}
      <Text style={styles.targetColorText}>
        {targetColor ? targetColor.rgbString : ""}
      </Text>

      <View style={styles.languageButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setLanguage("en")}
        >
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setLanguage("am")}
        >
          <Text style={styles.buttonText}>Amharic</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setLanguage("fr")}
        >
          <Text style={styles.buttonText}>French</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.difficultyButtons}>
        <TouchableOpacity
          style={[
            styles.difficultyButton,
            difficulty === "Easy" && styles.activeDifficulty,
          ]}
          onPress={() => setDifficulty("Easy")}
        >
          <Text style={styles.buttonText}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.difficultyButton,
            difficulty === "Hard" && styles.activeDifficulty,
          ]}
          onPress={() => setDifficulty("Hard")}
        >
          <Text style={styles.buttonText}>Hard</Text>
        </TouchableOpacity>
      </View>

      {/* New Colors and Try Again / Play Again Button Section */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.newColorsButton}
          onPress={generateColors}
        >
          <Text style={styles.buttonText}>New Colors</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tryAgainButton}
          onPress={isCorrect ? handlePlayAgain : () => checkAnswer(targetColor)}
        >
          <Text style={styles.buttonText}>
            {isCorrect ? "Play Again?" : "Try Again"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.colorTitle}>{translations[language].guessColor}</Text>
      <FlatList
        data={colorOptions}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.colorBox, { backgroundColor: item.rgbString }]}
            onPress={() => {
              checkAnswer(item);
              if (item.rgbString === targetColor.rgbString) {
                setIsCorrect(true);
              }
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
      />

      {/* Finish Game Button at the bottom */}
      <TouchableOpacity
        style={styles.finishButton}
        onPress={() => Alert.alert("Game Finished", "Thank you for playing!")}
      >
        <Text style={styles.buttonText}>Finish Game!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#333", // Dark background color
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#fff", // White text color
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#fff", // White text color
  },
  targetColorText: {
    fontSize: 20,
    marginVertical: 10,
    textAlign: "center",
    color: "#fff", // White text color
  },
  languageButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  difficultyButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  difficultyButton: {
    padding: 10,
    backgroundColor: "#28a745",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  newColorsButton: {
    padding: 10,
    backgroundColor: "#28a745", // Color for the new colors button
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  tryAgainButton: {
    padding: 10,
    backgroundColor: "#FF5733", // Color for the try again button
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  activeDifficulty: {
    backgroundColor: "#0056b3", // Darker shade for active difficulty
  },
  buttonText: {
    color: "#fff", // White text color
    fontSize: 16,
  },
  colorTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: "#fff", // White text color
  },
  colorBox: {
    width: 100,
    height: 100,
    margin: 5,
  },
  finishButton: {
    padding: 10,
    backgroundColor: "#FF5733", // Color for the finish button
    borderRadius: 5,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
});

export default ColorGame;
