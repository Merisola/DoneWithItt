import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Alert,
} from "react-native";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translation/translations";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../Styles/gameStyles";

const ColorGame = () => {
  const { language, setLanguage } = useLanguage();
  const [targetColor, setTargetColor] = useState(null);
  const [colorOptions, setColorOptions] = useState([]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [isCorrect, setIsCorrect] = useState(false);
  const [hint, setHint] = useState("");
  const [hasGuessed, setHasGuessed] = useState(false);

  // Animation values
  const buttonScale = new Animated.Value(1);
  const rgbAnim = new Animated.Value(0);

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { rgbString: `rgb(${r}, ${g}, ${b})`, values: [r, g, b] };
  };

  const generateColors = () => {
    const newTarget = getRandomColor();
    setTargetColor(newTarget);
    const optionsCount = difficulty === "Easy" ? 3 : 6;
    const newColorOptions = [newTarget];

    while (newColorOptions.length < optionsCount) {
      const randomColor = getRandomColor();
      if (
        !newColorOptions.some(
          (color) => color.rgbString === randomColor.rgbString
        )
      ) {
        newColorOptions.push(randomColor);
      }
    }
    setColorOptions(newColorOptions.sort(() => Math.random() - 0.5));
    setIsCorrect(false);
    setHint("");
    setHasGuessed(false);
  };

  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const checkAnswer = (selectedColor) => {
    setHasGuessed(true);
    if (selectedColor.rgbString === targetColor.rgbString) {
      setIsCorrect(true);
      setHint("");
    } else {
      setIsCorrect(false);
      setHint("Try again! Remember, it's RGB values!");
    }
  };

  const handleTryAgainPress = () => {
    animateButtonPress();
    isCorrect ? generateColors() : checkAnswer(targetColor);
  };

  const handleNewColorsPress = () => {
    animateButtonPress();
    generateColors();
  };

  useEffect(() => {
    generateColors();
  }, [difficulty]);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>{translations[language].title}</Text>
        <Text style={styles.tagline}>{translations[language].tagline}</Text>
        <TouchableOpacity
          onPress={() => Alert.alert(translations[language].instructions)}
        >
          <Text style={styles.instructionsLink}>
            {translations[language].instructionsLink}
          </Text>
        </TouchableOpacity>
        {/* RGB Display */}
        <Text style={styles.rgbText}>
          {targetColor ? `RGB(${targetColor.values.join(", ")})` : ""}
        </Text>
      </View>

      {/* Language Selection */}
      <View style={styles.languageButtons}>
        <TouchableOpacity onPress={() => setLanguage("en")}>
          <Text
            style={[
              styles.languageButtonText,
              language === "en" && styles.activeLanguage,
            ]}
          >
            EN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLanguage("fr")}>
          <Text
            style={[
              styles.languageButtonText,
              language === "fr" && styles.activeLanguage,
            ]}
          >
            FR
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLanguage("am")}>
          <Text
            style={[
              styles.languageButtonText,
              language === "am" && styles.activeLanguage,
            ]}
          >
            AMH
          </Text>
        </TouchableOpacity>
      </View>

      {/* Difficulty Selection */}
      <View style={styles.difficultyContainer}>
        <TouchableOpacity
          style={[
            styles.difficultyButton,
            difficulty === "Easy" && styles.activeDifficulty,
          ]}
          onPress={() => setDifficulty("Easy")}
        >
          <Text style={styles.buttonText}>{translations[language].easy}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.difficultyButton,
            difficulty === "Hard" && styles.activeDifficulty,
          ]}
          onPress={() => setDifficulty("Hard")}
        >
          <Text style={styles.buttonText}>{translations[language].hard}</Text>
        </TouchableOpacity>
      </View>

      {/* Color Options Grid */}
      <FlatList
        data={colorOptions}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.colorBox, { backgroundColor: item.rgbString }]}
            onPress={() => checkAnswer(item)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3} // Three columns for the grid
        contentContainerStyle={{
          justifyContent: "space-around", // Space items evenly
          paddingBottom: 20, // Add bottom padding for spacing
        }}
      />

      {/* New Colors Button */}
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={styles.newColorsButton}
          onPress={handleNewColorsPress}
        >
          <Text style={styles.buttonText}>New Colors</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.tryAgainButton}
            onPress={handleTryAgainPress}
          >
            <Text style={styles.buttonText}>
              {isCorrect
                ? translations[language].playAgain
                : translations[language].tryAgain}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Feedback Section */}
      <View style={styles.feedbackContainer}>
        {hasGuessed && isCorrect !== null && (
          <Icon
            name={isCorrect ? "check" : "times"}
            size={30}
            color={isCorrect ? "green" : "red"}
          />
        )}
        {hint ? <Text style={styles.hintText}>{hint}</Text> : null}
      </View>
    </View>
  );
};

export default ColorGame;
