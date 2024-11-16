import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import homeScreen from "../Style/homeScreen";
import { Picker } from "@react-native-picker/picker";
import { DatePickerInput } from "react-native-paper-dates";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "../components/Navbar";

const locations = ["Chennai", "Trichy", "Muhavur", "Thaeni"];
const suggestionText = [
  "Show me travellers going to mumbai",
  "Top 10 must see places in Mumbai",
  "Prepare 3 trip itinerary for Goa",
  "Show me hot travel related deals",
  "List out local events in Mumbai",
];

const LocationSelect = ({ label, selectedValue, onValueChange }) => (
  <View style={homeScreen.newUserItem}>
    <Text style={homeScreen.label}>{label}:</Text>
    <Picker
      selectedValue={selectedValue}
      style={homeScreen.homeSelect}
      onValueChange={onValueChange}
    >
      {locations.map((location, index) => (
        <Picker.Item key={index} label={location} value={location} />
      ))}
    </Picker>
  </View>
);

const IconSwap = () => (
  <View style={homeScreen.swapIcon}>
    <Ionicons name="swap-horizontal" size={24} color="black" />
  </View>
);

const Home = () => {
  ///
  ///
  const [selectedFromLocation, setSelectedFromLocation] = useState("");
  const [selectedToLocation, setSelectedToLocation] = useState("");
  const [mode, setMode] = useState("");
  const [status, setStatus] = useState("");
  const [inputFromDate, setInputFromDate] = useState(undefined);
  const [inputToDate, setInputToDate] = useState(undefined);

  return (
    <ScrollView contentContainerStyle={homeScreen.homeContainer}>
      <View style={{ backgroundColor: "white", height: 40 }}>
        <Navbar />
      </View>
      <View style={homeScreen.homeContent}>
        <Text style={homeScreen.title}>
          Find your next travel companion right here!
        </Text>
        <View style={homeScreen.homeSuggestions}>
          {suggestionText.map((value, i) => (
            <Text key={i} style={homeScreen.suggestionText}>
              {value}
            </Text>
          ))}
        </View>
        <View style={homeScreen.inputContainer}>
          <View style={homeScreen.locationDate}>
            {/* Location Section */}
            <View style={homeScreen.locationSection}>
              <View style={homeScreen.location}>
                <View style={homeScreen.fromLocation}>
                  <Text style={homeScreen.label}>From:</Text>
                  <Picker
                    selectedValue={selectedFromLocation}
                    onValueChange={(itemValue) =>
                      setSelectedFromLocation(itemValue)
                    }
                    style={homeScreen.picker}
                    itemStyle={homeScreen.pickerItem}
                  >
                    <Picker.Item label="Chennai" value="Chennai" />
                    <Picker.Item label="Madurai" value="Madurai" />
                    <Picker.Item label="Mumbai" value="Mumbai" />
                  </Picker>
                </View>
                <IconSwap />
                <View style={homeScreen.fromLocation}>
                  <Text style={homeScreen.label}>To:</Text>
                  <Picker
                    selectedValue={selectedToLocation}
                    onValueChange={(itemValue) =>
                      setSelectedToLocation(itemValue)
                    }
                    style={homeScreen.picker}
                    itemStyle={homeScreen.pickerItem}
                  >
                    <Picker.Item label="Chennai" value="Chennai" />
                    <Picker.Item label="Madurai" value="Madurai" />
                    <Picker.Item label="Mumbai" value="Mumbai" />
                  </Picker>
                </View>
              </View>
            </View>

            {/* Date Section */}
            <View style={homeScreen.dateSection}>
              <View style={homeScreen.date}>
                <DatePickerInput
                  locale="en"
                  label="Date"
                  value={inputFromDate}
                  onChange={(d) => setInputFromDate(d)}
                  inputMode="start"
                  style={homeScreen.datePicker}
                />
                <IconSwap />
                <DatePickerInput
                  locale="en"
                  label="Date"
                  value={inputToDate}
                  onChange={(d) => setInputToDate(d)}
                  inputMode="start"
                  style={homeScreen.datePicker}
                />
              </View>
            </View>
          </View>
          {/* <View style={homeScreen.modestatus}>
            <View style={homeScreen.fromLocation}>
              <Text style={homeScreen.label}>Mode:</Text>
              <Picker
                selectedValue={mode}
                onValueChange={(itemValue) => setMode(itemValue)}
                style={homeScreen.picker}
                itemStyle={homeScreen.pickerItem}
              >
                <Picker.Item label="Flight" value="Flight" />
                <Picker.Item label="Train" value="Train" />
                <Picker.Item label="Bus" value="Bus" />
                <Picker.Item label="Car" value="Car" />
              </Picker>
            </View>
            <View style={homeScreen.fromLocation}>
              <Text style={homeScreen.label}>Status:</Text>
              <Picker
                selectedValue={status}
                onValueChange={(itemValue) => setStatus(itemValue)}
                style={homeScreen.picker}
                itemStyle={homeScreen.pickerItem}
              >
                <Picker.Item label="Booked my trip" value="Booked my trip" />
                <Picker.Item
                  label="Trip in Progress"
                  value="Trip in Progress"
                />
                <Picker.Item label="Dream List" value="Dream List" />
              </Picker>
            </View>
          </View>
          <TouchableOpacity style={homeScreen.roundedButton}>
            <Text style={homeScreen.buttonText}>Search</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
