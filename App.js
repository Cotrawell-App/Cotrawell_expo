import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { ReadableStream } from "web-streams-polyfill";

if (typeof global.ReadableStream === "undefined") {
  global.ReadableStream = ReadableStream;
}
import { Buffer } from "buffer";
global.Buffer = Buffer;

import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SignupScreen from "./screens/SignupScreen";
import DashboardScreen from "./screens/DashboardScreen";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";
import VerifyOTP from "./screens/VerifyOTP";

const Stack = createStackNavigator();

const linking = {
  prefixes: ["http://localhost:8081/", "yourapp://"],
  config: {
    screens: {
      Home: "/",
      Login: "login",
      Signup: "signup",
      Dashboard: "dashboard",
      ForgetPassword: "forget-password",
      VerifyOTP: "VerifyOTP",
    },
  },
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          initialRouteName={isAuthenticated ? "Home" : "Login"}
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "white" },
          }}
        >
          {isAuthenticated ? (
            // Authenticated routes
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
              <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
            </>
          ) : (
            // Unauthenticated routes
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen
                name="ForgetPassword"
                component={ForgetPasswordScreen}
              />
            </>
          )}
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "web" ? 0 : 40,
  },
});
