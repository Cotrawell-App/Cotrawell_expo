import React from "react";
import {
  View,
  Text,
  TextInput,
  Picker,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const locations = ["chennai", "trichy", "muhavur", "thaeni"];

const LocationSelect = ({ label, selectedValue, onValueChange }) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}:</Text>
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={styles.picker}
    >
      {locations.map((location, index) => (
        <Picker.Item key={index} label={location} value={location} />
      ))}
    </Picker>
  </View>
);

const DateSelect = ({ label, value, onChange }) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}:</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      placeholder="YYYY-MM-DD"
      keyboardType="numeric"
    />
  </View>
);

const IconSwap = () => (
  <View style={styles.iconContainer}>
    <Ionicons name="swap-horizontal" size={24} color="black" />
  </View>
);

const DashboardHeader = () => {
  const [fromLocation, setFromLocation] = React.useState(locations[0]);
  const [toLocation, setToLocation] = React.useState(locations[1]);
  const [date, setDate] = React.useState("");
  const [mode, setMode] = React.useState(locations[0]);
  const [status, setStatus] = React.useState(locations[0]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.group}>
          <LocationSelect
            label="From"
            selectedValue={fromLocation}
            onValueChange={setFromLocation}
          />
          <IconSwap />
          <LocationSelect
            label="To"
            selectedValue={toLocation}
            onValueChange={setToLocation}
          />
        </View>
        <View style={styles.group}>
          <DateSelect label="Date" value={date} onChange={setDate} />
        </View>
        <View style={styles.row}>
          <LocationSelect
            label="Mode"
            selectedValue={mode}
            onValueChange={setMode}
          />
          <LocationSelect
            label="Status"
            selectedValue={status}
            onValueChange={setStatus}
          />
        </View>
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.profileButton}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  form: {
    marginBottom: 20,
  },
  group: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  item: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  picker: {
    height: 40,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f8f8f8",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  updateButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  profileButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default DashboardHeader;
