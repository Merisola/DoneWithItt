// PastPlayerScores.js
import React from "react";
import { View, Text, FlatList } from "react-native";
import ScoreItem from "./ScoreItem";
import { styles } from "../Styles/gameStyles";

const PastPlayerScores = ({ playerScores }) => {
  return (
    <View style={styles.scoresContainer}>
      <Text style={styles.pastScoresTitle}>Past Player Scores:</Text>
      <FlatList
        data={playerScores}
        renderItem={({ item }) => (
          <ScoreItem
            userName={item.userName}
            score={item.score}
            date={item.date}
          />
        )}
        keyExtractor={(item) => item.id} // Ensure this is unique
      />
    </View>
  );
};

export default PastPlayerScores;
