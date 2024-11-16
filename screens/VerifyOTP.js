import { SafeAreaView, StatusBar, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import verifyOTP from "../Style/verifyOTP";
import { OtpInput } from "react-native-otp-entry";
import Button from "../components/Button";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";
import { confirmSignUp, resendOTP } from "../services/CognitoService";
import { useNavigation } from "@react-navigation/native";

const VerifyOTP = (username) => {
  const [fontsLoaded] = useFonts({
    PoppinsBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const handleConfirmSignUp = async () => {
    try {
      const response = await confirmSignUp(username.username, otp);
      navigation.navigate("Home");
      console.log("res", response);
    } catch (error) {
      console.error("Error confirming sign-up:", error);
      if (error.response && error.response.data) {
        setErrorMessage(
          error.response.data.message ||
            "Failed to confirm sign up. Please try again."
        );
      } else {
        setErrorMessage("Failed to confirm sign up. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={verifyOTP.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }
  return (
    <LinearGradient
      colors={["#E0F7FF", "#89B3BF"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={verifyOTP.background}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={[
            {
              flex: 1,
              padding: "10%",
              alignContent: "center",
              justifyContent: "center",
            },
          ]}
        >
          <StatusBar hidden />
          <View style={verifyOTP.VerifyContainer}>
            <Text style={verifyOTP.headerText}>
              Please verify your email address
            </Text>
            <Text style={verifyOTP.headerSubText}>
              We just sent a 6-digit verification code to your
              email:xxxxxx@gmail.com. Please enter the code within 5 minutes.
            </Text>
            <OtpInput
              numberOfDigits={6}
              focusColor="green"
              focusStickBlinkingDuration={500}
              onFilled={(text) => setOtp(text)}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                containerStyle: verifyOTP.container,
                pinCodeContainerStyle: verifyOTP.pinCodeContainer,
                pinCodeTextStyle: verifyOTP.pinCodeText,
                focusStickStyle: verifyOTP.focusStick,
                focusedPinCodeContainerStyle: verifyOTP.activePinCodeContainer,
              }}
            />
            <Button title="Sign-in" onPress={handleConfirmSignUp} />
            {errorMessage ? (
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
                {errorMessage}
              </Text>
            ) : null}
            <Text style={verifyOTP.checkText}>
              Can't find the email? try checking your spam folder, or click here
              to{" "}
              <Text
                style={verifyOTP.sendText}
                onPress={() => resendOTP(username.username)}
              >
                send a new code.
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default VerifyOTP;
