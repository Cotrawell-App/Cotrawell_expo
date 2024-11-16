import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import signupScreen from "../Style/signupScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import COLORS from "../constants/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { signUp } from "../services/CognitoService";
import VerifyOTP from "./VerifyOTP";

SplashScreen.preventAutoHideAsync();

const SignupScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [formUsername, setFormUsername] = useState("");

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;

    // Validate first name
    // if (!input.firstname) {
    //   handleError("Please enter your first name", "firstname");
    //   valid = false;
    // }

    // // Validate last name
    // if (!input.lastname) {
    //   handleError("Please enter your last name", "lastname");
    //   valid = false;
    // }

    // Validate email
    if (!input.email) {
      handleError("Please enter your email", "email");
      valid = false;
    } else if (!input.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      valid = false;
    }

    // Validate password
    if (!input.password) {
      handleError("Please enter your password", "password");
      valid = false;
    } else if (input.password.length < 6) {
      handleError("Password must be at least 6 characters long", "password");
      valid = false;
    } else if (!/[A-Z]/.test(input.password)) {
      // Check for at least one uppercase letter
      handleError(
        "Password must contain at least one uppercase letter",
        "password"
      );
      valid = false;
    } else if (!/[0-9]/.test(input.password)) {
      // Check for at least one number
      handleError("Password must contain at least one number", "password");
      valid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(input.password)) {
      // Check for at least one special character
      handleError(
        "Password must contain at least one special character",
        "password"
      );
      valid = false;
    }

    if (valid) {
      handleSignUp();
    }
  };

  const handleSignUp = async () => {
    const formattedUsername = input.username.startsWith("+")
      ? input.username
      : `+${input.username}`;
    try {
      const result = await signUp(
        formattedUsername,
        input.password,
        input.email
      );
      setMessage(`Sign-up successful: ${result}`);
      setFormUsername(formattedUsername);
      await AsyncStorage.setItem("user", JSON.stringify(input));
      if (result) {
        setIsConfirm(true);
        setInput("");
      }
    } catch (error) {
      setMessage(`${error.message}`);
      console.log(message, "message");
    }
  };

  const handleChange = (text, inputField) => {
    setInput((prevState) => ({ ...prevState, [inputField]: text }));
  };

  const handleError = (errorMessage, inputField) => {
    setErrors((prevState) => ({ ...prevState, [inputField]: errorMessage }));
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={signupScreen.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <>
      {isConfirm ? (
        <VerifyOTP username={formUsername} />
      ) : (
        <LinearGradient
          colors={["#E0F7FF", "#89B3BF"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={signupScreen.background}
        >
          <SafeAreaView style={signupScreen.safeAreaViewContainer}>
            <ScrollView contentContainerStyle={signupScreen.scrollViewContent}>
              <View style={signupScreen.contentContainer}>
                <Text style={signupScreen.inputText}>Create Profile</Text>
                <View style={signupScreen.inputcardContainer}>
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        alignItems: "center",
                        fontFamily: "PoppinsRegular",
                        marginVertical: 10,
                      }}
                    >
                      This how your details appears in cotrawell
                    </Text>
                  </View>
                  <View style={signupScreen.inputContainer}>
                    <Input
                      placeholder="Enter your phonenumber"
                      onChangeText={(text) => handleChange(text, "username")}
                      error={errors.username}
                      onFocus={() => handleError(null, "username")}
                    />
                    <Input
                      placeholder="Enter your email address"
                      onChangeText={(text) => handleChange(text, "email")}
                      error={errors.email}
                      onFocus={() => handleError(null, "email")}
                    />
                    <Input
                      placeholder="Enter your password"
                      onChangeText={(text) => handleChange(text, "password")}
                      password
                      error={errors.password}
                      onFocus={() => handleError(null, "password")}
                    />
                    {message ? (
                      <Text
                        style={{
                          color: "red",
                          textAlign: "center",
                          marginBottom: 10,
                          maxWidth: "90%",
                          marginHorizontal: "auto",
                          fontSize: 12,
                        }}
                      >
                        {message}
                      </Text>
                    ) : null}
                    <Button title="Create" onPress={validate} />
                  </View>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      )}
    </>
  );
};

export default SignupScreen;
