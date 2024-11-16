import { Dimensions, Platform, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const isLargeScreen = width > 600; // Define a breakpoint for large screens
const isWeb = Platform.OS === "web";

const homeScreen = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundImage: `linear-gradient(180deg, #E0F7FF -4.92%, #89B3BF 284.25%)`,
  },
  homeContent: {
    padding: isLargeScreen ? 50 : 20,
    paddingHorizontal: isLargeScreen ? 60 : 20,
    elevation: 3,
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: isLargeScreen ? 24 : 20,
    margin: isLargeScreen ? 40 : 20,
    color: "#333",
    fontWeight: "bold",
  },
  homeSuggestions: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
  },
  suggestionText: {
    padding: isLargeScreen ? 12 : 8,
    backgroundColor: "white",
    borderRadius: 10,
    fontSize: isLargeScreen ? 16 : 14,
    margin: isLargeScreen ? 10 : 5,
    color: "#555",
  },
  inputContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: isLargeScreen ? 30 : 15,
    marginHorizontal: isLargeScreen ? 40 : 20,
    backgroundColor: "#E4EFF3",
    padding: 20,
  },
  locationDate: {
    flex: 1,
    gap: 20,
  },
  locationSection: {
    marginBottom: 20,
  },
  locationDate: {
    flex: 1,
    flexDirection: "column",
  },
  location: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fromLocation: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: isLargeScreen ? 15 : 10,
    borderWidth: 1,
    paddingHorizontal: isLargeScreen ? 15 : 10,
    borderRadius: 5,
    backgroundColor: "white",
    maxHeight: 50,
    gap: 10,
  },
  picker: {
    flex: 1,
    height: 40,
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 5,
    fontSize: isLargeScreen ? 16 : 14,
    color: "#555",
    width: isLargeScreen ? 200 : 150,
    paddingHorizontal: isLargeScreen ? 25 : 15,
    outlineWidth: isWeb ? 0 : undefined, // Only apply outlineWidth for web
  },
  pickerItem: {
    fontSize: isLargeScreen ? 18 : 16,
    color: "#333",
    marginHorizontal: isLargeScreen ? 60 : 30,
  },
  date: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  datePicker: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    color: "#555",
    paddingVertical: 0,
    maxHeight: isLargeScreen ? 40 : 40,
    paddingHorizontal: isLargeScreen ? 15 : 10,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },
  label: {
    fontSize: isLargeScreen ? 18 : 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  swapIcon: {
    padding: isLargeScreen ? 8 : 8,
    marginHorizontal: isLargeScreen ? 10 : 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  modestatus: {
    flex: 1,
    alignItems: "center",
    gap: 20,
  },
  statusContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    paddingHorizontal: isLargeScreen ? 15 : 10,
    borderRadius: 5,
    backgroundColor: "white",
    maxHeight: 50,
  },
  roundedButton: {
    backgroundColor: "#007BFF",
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default homeScreen;
