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
import { db } from "../config/firebaseConfig";
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
    Instructions: Guess the RGB color!
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
      setHint(translations[language].correctHint);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
      setHint(
        `${translations[language].tryAgainHint} RGB(${targetColor.values.join(
          ", "
        )})`
      );
    }
  };

  const handleActionButtonPress = () => {
    animateButtonPress();
    // Always generate new colors when the button is pressed
    generateColors();
    // Clear hint when starting a new round
    setHint("");
  };

  const finishGame = () => {
    if (userName.trim() === "") {
      Alert.alert(translations[language].nameAlert);
      return;
    }
    saveScore(userName, score);
    Alert.alert(
      translations[language].gameFinished,
      translations[language].thankYou,
      [
        {
          text: "OK",
          onPress: () => {
            // Reset all game states
            setUserName("");
            setScore(0);
            setTargetColor(null);
            setColorOptions([]);
            setIsCorrect(false);
            setHint("");
            setHasGuessed(false);
            // Clear feedback
            setHint(""); // Clear any existing hints
            setHasGuessed(false); // Reset guessing state
            generateColors(); // Start a new game
          },
        },
      ]
    );
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
        <Text style={styles.rgbText}>
          {targetColor ? `RGB(${targetColor.values.join(", ")})` : ""}
        </Text>
      </View>

      <View style={styles.horizontalLayout}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.newColorsButton}
            onPress={handleActionButtonPress}
          >
            <Text style={styles.buttonText}>
              {isCorrect
                ? translations[language].playAgain
                : translations[language].newColors}
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

      <TextInput
        placeholder={translations[language].enterYourName}
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
      />

      <TouchableOpacity onPress={() => setShowScores(!showScores)}>
        <Text style={styles.buttonText}>
          {showScores
            ? translations[language].hidePastScores
            : translations[language].showPastScores}
        </Text>
      </TouchableOpacity>

      <FetchScores setPlayerScores={setPlayerScores} />

      {showScores && <PastPlayerScores playerScores={playerScores} />}

      <FlatList
        data={colorOptions}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.colorBox, { backgroundColor: item.rgbString }]}
            onPress={() => checkAnswer(item)}
          />
        )}
        keyExtractor={(item) => item.rgbString}
        numColumns={3}
        contentContainerStyle={{
          justifyContent: "space-around",
          paddingBottom: 20,
        }}
      />

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

      <TouchableOpacity onPress={finishGame} style={styles.finishGameButton}>
        <Text style={styles.buttonText}>
          {translations[language].finishGame}
        </Text>
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
