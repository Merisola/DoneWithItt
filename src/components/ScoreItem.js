import React from "react";
import { Text } from "react-native";
import { styles } from "../Styles/gameStyles";

const ScoreItem = ({ userName, score, date }) => (
  <Text style={styles.scoreItem}>
    {userName} - {score} on {new Date(date).toLocaleString()}
  </Text>
);

export default ScoreItem;
