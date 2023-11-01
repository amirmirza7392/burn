import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native";
import COLORS from "../consts/colors";
import { PrimaryButton } from "../consts/buttons";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, app, db } from "../../firebase";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassKey] = React.useState("");
  const [loading, setLoading] = useState(false);

  const storeData = async (value) => {
    console.log("Login init val: " + value);

    try {
      await ReactNativeAsyncStorage.setItem("Prime", value);
      console.log("Login user info: " + value);
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = async () => {
    if (!email || !password) {
      login_handler_empty();
    } else {
      const q = query(
        collection(db, "user"),
        where("username", "==", email),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log("Values: " + email + password);
        // console.log("Transfer ID: " + doc.id);
        storeData(doc.id);
      });

      if (querySnapshot.empty) {
        login_handler_noaccount();
      } else {
        alert("Successful login");
        navigation.navigate("Home");
      }
    }
  };

  const login_handler_empty = () => {
    Alert.alert(
      "Error: Empty field",
      "Please use proper credentials upon signing in.",
      [{ text: "Okay", onPress: () => console.log("Invalid Entry") }],
      { cancelable: false }
    );
  };

  const login_handler_noaccount = () => {
    Alert.alert(
      "Error: Account not found",
      "Make sure all credentials are correct.",
      [{ text: "Okay", onPress: () => console.log("Invalid Entry") }],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/MyHorseBg.png")}
      >
        <View style={style.mainContainer}>
          <KeyboardAvoidingView behavior="padding">
            <View style={style.loginframe3}>
              <Text style={{ fontSize: 20, color: COLORS.primary }}>
                Login Form
              </Text>
            </View>

            <View style={style.loginframe}>
              <TextInput
                placeholder="Username"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={style.input}
              />

              <TextInput
                secureTextEntry
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassKey(text)}
                style={style.input}
              />
            </View>

            <View style={style.loginframe2}>
              {loading ? (
                <ActivityIndicator size="large" color="#0000FF" />
              ) : (
                <>
                  <PrimaryButton
                    title={"Login"}
                    onPress={validateForm}
                  ></PrimaryButton>
                </>
              )}
            </View>

            <View style={style.loginframe3}>
              <Text
                style={{ fontSize: 18, color: COLORS.primary }}
                onPress={() => navigation.navigate("Registration")}
              >
                Register
              </Text>
            </View>
          </KeyboardAvoidingView>
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  input: {
    fontSize: 16,
    paddingLeft: 20,
    borderColor: COLORS.dark,
    borderWidth: 1,
    padding: 8,
    margin: 5,
    borderRadius: 10,
  },

  loginframe: {
    width: "auto",
    padding: 20,
  },

  loginframe2: {
    width: "auto",
    paddingHorizontal: 30,
  },

  loginframe3: {
    width: "auto",
    alignItems: "center",
    padding: 10,
  },
});

export default LoginScreen;
