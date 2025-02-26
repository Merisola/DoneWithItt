// FetchScores.js
import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // Adjust the path as necessary

const FetchScores = ({ setPlayerScores }) => {
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const scores = [];
        const querySnapshot = await getDocs(collection(db, "scores"));
        querySnapshot.forEach((doc) => {
          const scoreData = { id: doc.id, ...doc.data() };
          // Filter out scores with empty usernames
          if (scoreData.userName && scoreData.userName.trim() !== "") {
            scores.push(scoreData);
          }
        });
        // Remove the logging line
        // console.log("Fetched scores:", scores);
        setPlayerScores(scores); // Set valid scores in parent component
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
  }, [setPlayerScores]); // Dependency array to trigger effect

  return null; // This component does not render anything itself
};

export default FetchScores;
