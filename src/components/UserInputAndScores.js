import React from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import ScoreItem from "./ScoreItem";
import { styles } from "../Styles/gameStyles";

const UserInputAndScores = ({ userName, setUserName, playerScores }) => {
  return (
    <View style={styles.scoresContainer}>
      {/* User Name Input */}
      <TextInput
        placeholder="Enter your name"
        value={userName}
        onChangeText={setUserName}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 5,
          marginBottom: 20,
          width: "40%",
          borderRadius: 5,
          backgroundColor: "#fff",
        }}
      />

      {/* Display Fetched Scores */}
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
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default UserInputAndScores;
