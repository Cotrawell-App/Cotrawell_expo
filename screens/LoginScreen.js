import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import loginScreen from "../Style/loginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import COLORS from "../constants/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import LoginButton from "../components/LoginButton";
import { LinearGradient } from "expo-linear-gradient";
import { signIn } from "../services/CognitoService";

SplashScreen.preventAutoHideAsync();

const LoginScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const validate = () => {
    if (Platform.OS !== "web") {
      Keyboard.dismiss();
    }

    let valid = true;

    // if (!input.email) {
    //   handleError("Please enter your email", "email");
    //   valid = false;
    // } else if (!input.email.match(/\S+@\S+\.\S+/)) {
    //   handleError("Please input a valid email", "email");
    //   valid = false;
    // }

    if (!input.password) {
      handleError("Please enter your password", "password");
      valid = false;
    } else if (input.password.length < 6) {
      handleError("Password must be at least 6 characters long", "password");
      valid = false;
    }

    if (valid) {
      login();
    }
  };

  const login = async () => {
    try {
      const response = await signIn(input.email, input.password);
      console.log("res", response);

      if (Platform.OS === "web") {
        localStorage.setItem("user", JSON.stringify(input));
      } else {
        AsyncStorage.setItem("user", JSON.stringify(input));
      }
      navigation.navigate("Home");
    } catch (error) {
      console.error("Login failed:", error);

      if (error.message.includes("Incorrect username or password")) {
        setLoginError("Incorrect email or password. Please try again.");
      } else {
        setLoginError("Failed to login. Please try again later.");
      }
    }
  };

  const handleChange = (text, input) => {
    setInput((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient
      colors={["#E0F7FF", "#89B3BF"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={loginScreen.background}
    >
      <SafeAreaView style={loginScreen.loginContainer}>
        <ScrollView contentContainerStyle={loginScreen.scrollViewContent}>
          <View style={loginScreen.contentContainer}>
            <View>
              <Text style={loginScreen.inputText}>Welcome to Cotrawell!</Text>
              <Text style={loginScreen.inputText}>
                Ready to find your next travel vibe?
              </Text>
              <Text style={loginScreen.inputText}>Let's go!</Text>
            </View>
            <View>
              <Text style={loginScreen.headerText}>
                Sign in or sign-up to find your perfect travel match, create
                instant travel plans for must-see places, great travel deals,
                and more!
              </Text>
            </View>
            <View
              style={Platform.OS === "web" && loginScreen.loginInputContainer}
            >
              <View style={loginScreen.loginInput}>
                <Input
                  label="Email"
                  placeholder="Enter your email address"
                  onChangeText={(text) => handleChange(text, "email")}
                  error={errors.email}
                  onFocus={() => {
                    handleError(null, "email");
                  }}
                />
                <Input
                  label="Password"
                  placeholder="Enter your Password"
                  onChangeText={(text) => handleChange(text, "password")}
                  password
                  error={errors.password}
                  onFocus={() => {
                    handleError(null, "password");
                  }}
                />
                <Text
                  style={loginScreen.forget}
                  onPress={() => {
                    navigation.navigate("ForgetPassword");
                  }}
                >
                  Forget Password?
                </Text>
                {loginError ? (
                  <View
                    style={{
                      color: "red",
                      textAlign: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "red",
                        textAlign: "center",
                        marginBottom: 10,
                      }}
                    >
                      {loginError}
                    </Text>
                  </View>
                ) : null}
                <Button title="Login" onPress={validate} />
              </View>
            </View>

            <View style={loginScreen.lineContainer}>
              <View style={loginScreen.line} />
              <Text style={loginScreen.text}>More Sign-in Options</Text>
              <View style={loginScreen.line} />
            </View>
            <View style={loginScreen.loginButtonContainer}>
              <LoginButton
                title="Google"
                url="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
              />
              <LoginButton
                title="Apple"
                url="https://w7.pngwing.com/pngs/664/673/png-transparent-apple-logo-iphone-computer-apple-logo-company-heart-logo-thumbnail.png"
              />
            </View>
            <View style={loginScreen.accountContainer}>
              <Text style={{ fontSize: 10, fontFamily: "PoppinsRegular" }}>
                Don't have an account?
              </Text>
              <Text
                style={{ fontSize: 10, fontFamily: "PoppinsBold" }}
                onPress={() => navigation.navigate("Signup")}
              >
                Create Account
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
