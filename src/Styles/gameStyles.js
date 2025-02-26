import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align items to the top
    alignItems: "center",
    backgroundColor: "#333", // Darker background for contrast
    paddingTop: 0, // Adjusted padding to give more space at the top
  },
  header: {
    width: "100%",
    backgroundColor: "#00A0E1", // Header background color
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
    color: "#fff", // White color for title
  },
  tagline: {
    fontSize: 14,
    color: "#fff", // White for tagline
    marginBottom: 5,
  },
  instructionsLink: {
    fontSize: 10,
    paddingVertical: 1,
    color: "#FFD700", // Gold color for instructions link
    textDecorationLine: "underline",
  },
  // Updated languageButtons style
  languageButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 1, // Adjust margin to align with difficulty buttons
    marginVertical: 2,
  },
  languageButtonText: {
    fontSize: 10,
    color: "#fff", // White text for language buttons
    marginHorizontal: 1,
    padding: 1,
    borderRadius: 4,
    backgroundColor: "#555", // Darker background for buttons
  },
  activeLanguage: {
    fontWeight: "bold",
    color: "#FFD700", // Gold color for active language
  },
  rgbDisplayContainer: {
    marginTop: 3, // Positioned below the header
    backgroundColor: "#444",
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  rgbText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFD700", // Gold color for RGB text
  },
  colorBox: {
    width: "30%", // Adjust width based on desired spacing
    height: 95, // Consistent height for all boxes
    margin: 5, // Margin to provide space around each box
    borderWidth: 0,
    borderColor: "#fff", // White border for color boxes
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 200,
    width: "80%", // Adjusted width
    paddingHorizontal: 10,
  },
  newColorsButton: {
    backgroundColor: "#007bff", // Blue color for New Colors button
    padding: 3,
    borderRadius: 8,
    elevation: 8,
    marginTop: 2,
    alignSelf: "center",
    width: "100%", // Adjusted width for the button
  },
  buttonText: {
    color: "#fff", // White text for buttons
    fontSize: 10, // Adjusted font size
    fontWeight: "bold",
    textAlign: "center",
  },
  feedbackContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  hintText: {
    marginTop: 50,
    color: "orange", // Orange color for hint text
    fontSize: 10, // Adjusted font size
  },
  difficultyContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 0, // Set to 0 to remove space
    paddingVertical: 0, // Set to 0 to remove space
    width: "25%",
  },
  difficultyButton: {
    padding: 3,
    borderRadius: 5,
    backgroundColor: "#6c757d", // Grey background for difficulty buttons
    elevation: 3,
    flex: 1,
    marginHorizontal: 1,
    marginVertical: 2,
  },
  activeDifficulty: {
    backgroundColor: "#FFD700", // Gold color for active difficulty button
    elevation: 4,
  },
  horizontalLayout: {
    flexDirection: "row",
    justifyContent: "space-between", // Space elements evenly
    alignItems: "center", // Center vertically
    paddingHorizontal: 10, // Add horizontal padding
    marginTop: 10, // Add some top margin
  },
  feedbackText: {
    color: "orange", // Adjust color for feedback
    marginLeft: 10, // Space between buttons and feedback
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
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
});
