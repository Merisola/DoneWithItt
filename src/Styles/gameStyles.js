import { StyleSheet } from "react-native";

// Common styles
const commonButtonStyles = {
  borderRadius: 5,
  padding: 4,
  elevation: 3,
  marginVertical: 2,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align items to the top
    alignItems: "center",
    backgroundColor: "#333",
    paddingTop: 0,
  },
  header: {
    width: "100%",
    backgroundColor: "#00A0E1",
    paddingVertical: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  tagline: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 5,
  },
  languageButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  languageButtonText: {
    fontSize: 10,
    color: "#fff",
    marginHorizontal: 5, // Adjusted spacing between buttons
  },
  activeLanguage: {
    fontWeight: "bold",
    color: "#FFD700",
  },
  rgbDisplayContainer: {
    marginTop: 3,
    backgroundColor: "#444",
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  rgbText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFD700",
  },
  colorBox: {
    width: "30%",
    height: 95,
    margin: 5,
    borderWidth: 0,
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "80%",
  },
  scoresContainer: {
    marginVertical: 1,
    width: "50%",
    alignItems: "center",
  },
  pastScoresTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  scoreItem: {
    color: "#fff",
    fontSize: 14,
    marginVertical: 2,
  },
  newColorsButton: {
    ...commonButtonStyles,
    marginHorizontal: 7, // Spacing between buttons
    backgroundColor: "transparent", // Removed background color
  },
  tryAgainButton: {
    ...commonButtonStyles,
    marginHorizontal: 5, // Spacing between buttons
    backgroundColor: "transparent", // Removed background color
  },
  buttonText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  feedbackContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  hintText: {
    marginTop: 50,
    color: "orange",
    fontSize: 10,
  },
  difficultyContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "30%", // Adjusted width for better alignment
  },
  difficultyButton: {
    ...commonButtonStyles,
    flex: 1,
    marginHorizontal: 3, // Spacing between difficulty buttons
    backgroundColor: "transparent", // Removed background color
  },
  activeDifficulty: {
    backgroundColor: "#FFD700",
    elevation: 4,
  },
  horizontalLayout: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 5,
    width: "100%", // Full width for horizontal layout
    backgroundColor: "#555", // Common background color for all buttons
    padding: 10, // Padding for better spacing
    borderRadius: 5, // Rounded corners for the layout
  },
  feedbackText: {
    color: "orange",
    marginLeft: 10,
    marginVertical: 50,
  },
  // Modal Styles
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
});
