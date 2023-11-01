import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
} from "react-native";
import COLORS from "../consts/colors";
import { PrimaryButton } from "../consts/buttons";
import { StatusBar } from "expo-status-bar";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const OnBoardScreen = ({ navigation }) => {
  const [user] = React.useState("");
  const [loading, setLoading] = useState(false);
  let target;

  useEffect(() => {}, []);

  const getData = async () => {
    try {
      const value = await ReactNativeAsyncStorage.getItem("Prime");
      console.log("Home: User account no:" + value);

      if (value === undefined || value === null) {
        navigation.navigate("Login");
      } else {
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={style.safeviewstyle}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/MyHorseBg.png")}
      >
        <View style={{ height: 400 }}>
          <Image
            style={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
              resizeMode: "contain",
              top: -330,
            }}
            source={require("../../src/assets/MyHorse.png")}
          />
        </View>

        <View style={style.textContainer}>
          <View>
            <Text style={{ fontSize: 22, textAlign: "center" }}>
              {" "}
              Barn Scheduling App
            </Text>
            <Text
              style={{ fontSize: 16, textAlign: "center", color: COLORS.grey }}
            >
              {" "}
              Created by: FindingOppa
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#0000FF" />
          ) : (
            <>
              <PrimaryButton onPress={() => getData()} title="Get Started" />
            </>
          )}
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: "space-between",
    paddingBottom: 40,
  },

  safeviewstyle: {
    flex: 1,
  },
});

export default OnBoardScreen;
