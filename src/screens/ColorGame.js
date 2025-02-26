import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Alert,
  TextInput,
} from "react-native";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translation/translations";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../Styles/gameStyles";
import { db } from "../config/firebaseConfig"; // Import db
import { collection, addDoc } from "firebase/firestore";
import InstructionsModal from "../components/InstructionsModal";
import PastPlayerScores from "../components/PastPlayerScores";
import FetchScores from "../components/FetchScores";

const ColorGame = () => {
  const { language, setLanguage } = useLanguage();
  const [targetColor, setTargetColor] = useState(null);
  const [colorOptions, setColorOptions] = useState([]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [isCorrect, setIsCorrect] = useState(false);
  const [hint, setHint] = useState("");
  const [hasGuessed, setHasGuessed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);
  const [playerScores, setPlayerScores] = useState([]);
  const [showScores, setShowScores] = useState(false);
  const buttonScale = new Animated.Value(1);

  const instructionsText = `
    Hello! 
    አማርኛ እና አማርኛ ለማየት አንድ ሙሉ ስም እና ቀለም ወደ ኋላ ይሄዱ ይኖርብን ወቅታዊ ይደርሳል።
    (Hint: The first number indicates the amount of RED, the second number indicates the amount of GREEN, while the third number indicates the amount of BLUE.)
  `;

  const saveScore = async (userName, score) => {
    try {
      const date = new Date().toISOString();
      await addDoc(collection(db, "scores"), {
        userName,
        score,
        date,
      });
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

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
      setHint("Correct!");
      setScore(score + 1);
    } else {
      setIsCorrect(false);
      setHint(
        `Try again! The correct color was RGB(${targetColor.values.join(", ")})`
      );
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

  const finishGame = () => {
    if (userName.trim() === "") {
      Alert.alert("Please enter your name before finishing the game.");
      return;
    }
    saveScore(userName, score);
    Alert.alert("Game Finished", "Thank you for playing!", [
      {
        text: "OK",
        onPress: () => {
          setUserName("");
          setScore(0);
        },
      },
    ]);
  };

  useEffect(() => {
    generateColors();
    setModalVisible(true);
  }, [difficulty]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{translations[language].title}</Text>
        <Text style={styles.tagline}>{translations[language].tagline}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.instructionsLink}>
            {translations[language].instructionsLink}
          </Text>
        </TouchableOpacity>
        <Text style={styles.rgbText}>
          {targetColor ? `RGB(${targetColor.values.join(", ")})` : ""}
        </Text>
      </View>

      <TextInput
        placeholder="Enter your name"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
      />

      {/* Button to toggle past scores visibility */}
      <TouchableOpacity onPress={() => setShowScores(!showScores)}>
        <Text style={styles.buttonText}>
          {showScores ? "Hide Past Scores" : "Show Past Scores"}
        </Text>
      </TouchableOpacity>

      {/* Fetch Scores Component */}
      <FetchScores setPlayerScores={setPlayerScores} />

      {/* Conditionally render PastPlayerScores based on showScores state */}
      {showScores && <PastPlayerScores playerScores={playerScores} />}

      <View style={styles.horizontalLayout}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.newColorsButton}
            onPress={handleNewColorsPress}
          >
            <Text style={styles.buttonText}>
              {isCorrect ? "Play Again?" : "New Colors"}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.languageButtons}>
          <TouchableOpacity onPress={() => setLanguage("en")}>
            <Text style={styles.languageButtonText}>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLanguage("fr")}>
            <Text style={styles.languageButtonText}>FR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLanguage("am")}>
            <Text style={styles.languageButtonText}>AMH</Text>
          </TouchableOpacity>
        </View>

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
      </View>

      <FlatList
        data={colorOptions}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.colorBox, { backgroundColor: item.rgbString }]}
            onPress={() => checkAnswer(item)}
          />
        )}
        keyExtractor={(item) => item.rgbString} // Improved key extraction
        numColumns={3}
        contentContainerStyle={{
          justifyContent: "space-around",
          paddingBottom: 20,
        }}
      />

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

      <View style={styles.feedbackContainer}>
        {hasGuessed && (
          <Icon
            name={isCorrect ? "check" : "times"}
            size={30}
            color={isCorrect ? "green" : "red"}
          />
        )}
        {hint ? <Text style={styles.hintText}>{hint}</Text> : null}
      </View>

      <TouchableOpacity onPress={finishGame}>
        <Text style={styles.buttonText}>Finish Game</Text>
      </TouchableOpacity>

      <InstructionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        instructions={instructionsText}
      />
    </View>
  );
};

export default ColorGame;
