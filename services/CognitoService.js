import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
  ResendConfirmationCodeCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import CryptoJS from "crypto-js";
import config from "../config.json";

// Initialize Cognito client
const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});
const calculateSecretHash = (username, clientId, clientSecret) => {
  const message = username + clientId;
  const hash = CryptoJS.HmacSHA256(message, clientSecret).toString(
    CryptoJS.enc.Base64
  );
  return hash;
};

// Sign in function
export const signIn = async (username, password) => {
  const secretHash = calculateSecretHash(
    username,
    config.ClientId,
    config.ClientSecret
  );
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: config.ClientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  };
  try {
    const command = new InitiateAuthCommand(params);
    const { AuthenticationResult } = await cognitoClient.send(command);
    if (AuthenticationResult) {
      await AsyncStorage.setItem("idToken", AuthenticationResult.IdToken || "");
      await AsyncStorage.setItem(
        "accessToken",
        AuthenticationResult.AccessToken || ""
      );
      await AsyncStorage.setItem(
        "refreshToken",
        AuthenticationResult.RefreshToken || ""
      );
      return AuthenticationResult;
    }
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

// Sign up function
export const signUp = async (username, password, email) => {
  const secretHash = calculateSecretHash(
    username,
    config.ClientId,
    config.ClientSecret
  );

  const params = {
    ClientId: config.ClientId,
    Username: username,
    Password: password,
    SecretHash: secretHash,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };
  try {
    const command = new SignUpCommand(params);
    const response = await cognitoClient.send(command);
    console.log("Sign up success: ", response);
    return response;
  } catch (error) {
    console.error("Error signing up: ", error);
    throw error;
  }
};

// Confirm sign up function
export const confirmSignUp = async (username, code) => {
  let secretHash;
  try {
    secretHash = calculateSecretHash(
      username,
      config.ClientId,
      config.ClientSecret
    );
  } catch (error) {
    console.error("Error generating secret hash:", error);
    throw new Error("Invalid secret hash configuration.");
  }

  const params = {
    ClientId: config.ClientId,
    Username: username,
    ConfirmationCode: code,
    SecretHash: secretHash,
  };

  try {
    const command = new ConfirmSignUpCommand(params);
    await cognitoClient.send(command);
    console.log("User confirmed successfully");
    return true;
  } catch (error) {
    console.error("Error confirming sign up:", error);
    throw error;
  }
};

export const resendOTP = async (username) => {
  const secretHash = calculateSecretHash(
    username,
    config.ClientId,
    config.ClientSecret
  );
  const params = {
    ClientId: config.ClientId,
    Username: username,
    SecretHash: secretHash,
  };
  try {
    const command = new ResendConfirmationCodeCommand(params);
    await cognitoClient.send(command);
    console.log("OTP has been resent successfully");
    return true;
  } catch (error) {
    console.error("Error resending OTP:", error);
    throw error;
  }
};
