import React from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import ScoreItem from "./ScoreItem"; // Import ScoreItem
import { styles } from "../Styles/gameStyles"; // Ensure the path is correct

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
          width: "33%", // Adjust width for better alignment
          borderRadius: 5,
          backgroundColor: "#fff", // Background color for the input
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
