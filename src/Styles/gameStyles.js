import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align items to the top
    alignItems: "center",
    backgroundColor: "#333", // Darker background for contrast
    paddingTop: 60, // Adjusted padding to give more space at the top
  },
  header: {
    width: "100%",
    backgroundColor: "#00A0E1", // Header background color
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff", // White color for title
  },
  tagline: {
    fontSize: 16,
    color: "#fff", // White for tagline
    marginBottom: 5,
  },
  instructionsLink: {
    fontSize: 14,
    color: "#FFD700", // Gold color for instructions link
    textDecorationLine: "underline",
  },
  languageButtons: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
  },
  languageButtonText: {
    fontSize: 16,
    color: "#fff", // White text for language buttons
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#555", // Darker background for buttons
  },
  activeLanguage: {
    fontWeight: "bold",
    color: "#FFD700", // Gold color for active language
  },
  rgbDisplayContainer: {
    marginTop: 8, // Positioned below the header
    backgroundColor: "#444",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  rgbText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700", // Gold color for RGB text
  },
  colorBox: {
    width: "30%", // Adjust width based on desired spacing
    height: 80, // Consistent height for all boxes
    margin: 5, // Margin to provide space around each box
    borderWidth: 0,
    borderColor: "#fff", // White border for color boxes
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "90%", // Adjusted width
    paddingHorizontal: 10,
  },
  tryAgainButton: {
    backgroundColor: "#28a745", // Green color for Try Again button
    padding: 10,
    borderRadius: 8,
    elevation: 4,
    flex: 1,
    marginRight: 5,
  },
  newColorsButton: {
    backgroundColor: "#007bff", // Blue color for New Colors button
    padding: 10,
    borderRadius: 8,
    elevation: 4,
    marginTop: 20,
    alignSelf: "center",
    width: "80%", // Adjusted width for the button
  },
  buttonText: {
    color: "#fff", // White text for buttons
    fontSize: 16, // Adjusted font size
    fontWeight: "bold",
    textAlign: "center",
  },
  feedbackContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  hintText: {
    marginTop: 10,
    color: "orange", // Orange color for hint text
    fontSize: 14, // Adjusted font size
  },
  difficultyContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 0, // Set to 0 to remove space
    paddingVertical: 2, // Set to 0 to remove space
    width: "100%",
  },
  difficultyButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#6c757d", // Grey background for difficulty buttons
    elevation: 3,
    flex: 1,
    marginHorizontal: 5,
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
  },
});
