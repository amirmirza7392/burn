import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import COLORS from "../consts/colors";
import { PrimaryButton } from "../consts/buttons";
import { SelectList } from "react-native-dropdown-select-list";
import { collection, setDoc, addDoc } from "@firebase/firestore";
import { auth, app, db } from "../../firebase";
import { TextInput } from "react-native";

const RegScreen = ({ navigation }) => {
  const [selected, setSelected] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    validateForm();
  }, [selected, name, email, pass]);

  const validateForm = () => {
    let errors = {};

    // Validate name field
    if (!name) {
      errors.name = "Name is required.";
    }

    if (!selected) {
      errors.selected = "Group is required.";
    }

    // Validate email field
    if (!email) {
      errors.email = "Username is required.";
    }

    // Validate password field
    if (!pass) {
      errors.pass = "Password is required.";
    } else if (pass.length < 6) {
      errors.pass = "Password must be at least 6 characters.";
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const reg_handler = () => {
    Alert.alert(
      "Confirmation Box",
      "I confirmed that all information entered are correct.",
      [{ text: "Confirm", onPress: () => to_login() }],
      { cancelable: false }
    );
  };

  const to_login = () => {
    alert("Account successfully created");
    console.log("Form submitted successfully!");

    navigation.navigate("Login");
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      const generateColor = () => {
        const randomColor = Math.floor(Math.random() * 360)
          .toString(16)
          .padStart(6, "0");
        return `#${randomColor}`;
      };

      try {
        const docRef = await addDoc(collection(db, "user"), {
          name: name,
          group: selected,
          username: email,
          password: pass,
          status: "member",
          color: generateColor(),
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      reg_handler();
    } else {
      // Form is invalid, display error messages
      console.log("Form has errors. Empty field");
      alert("Form has errors. Empty field.");
    }
  };

  const data = [
    { key: "1", value: "Group 1" },
    { key: "2", value: "Group 2" },
    { key: "3", value: "Group 3" },
    { key: "4", value: "Group 4" },
    { key: "5", value: "Group 5" },
    { key: "6", value: "Group 6" },
    { key: "7", value: "Group 7" },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/MyHorseBg.png")}
      >
        <View style={style.mainContainer}>
          <View style={style.loginframe3}>
            <Text style={{ fontSize: 20, color: COLORS.primary }}>
              Registration Form
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: COLORS.grey,
                marginTop: 10,
                marginHorizontal: 16,
              }}
            >
              Reminder: All data can be edited though the account's panel except
              for the group. Be advised to ask to yout specific group before
              proceeding to the registration.
            </Text>
          </View>

          <View style={style.loginframe}>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Complete Name"
              style={style.input}
            />
          </View>

          <View style={style.loginframeS}>
            <SelectList
              value={selected}
              setSelected={(val) => setSelected(val)}
              data={data}
              save="value"
              search={false}
              placeholder="Select Group"
            />
          </View>

          <View style={style.loginframe}>
            <TextInput
              value={email}
              type="text"
              onChangeText={(text) => setEmail(text)}
              placeholder="Username"
              style={style.input}
            />

            <TextInput
              value={pass}
              type="text"
              onChangeText={(text) => setPass(text)}
              placeholder="Password"
              style={style.input}
              secureTextEntry
            />
          </View>

          <View style={style.loginframe2}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000FF" />
            ) : (
              <>
                <PrimaryButton title={"Submit"} onPress={handleSubmit} />
              </>
            )}
          </View>

          <View style={style.loginframe3}>
            <Text
              style={{ fontSize: 18, color: COLORS.primary }}
              onPress={() => navigation.navigate("Login")}
            >
              Already have an account
            </Text>
          </View>
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
    paddingTop: 3,
    marginHorizontal: 20,
  },

  loginframeS: {
    width: "auto",
    paddingTop: 3,
    marginHorizontal: 23,
  },

  loginframeS2: {
    width: "auto",
    paddingTop: 8,
    marginHorizontal: 23,
  },

  loginframe2: {
    width: "auto",
    paddingHorizontal: 30,
    marginTop: 20,
  },

  loginframe3: {
    width: "auto",
    alignItems: "center",
    padding: 10,
  },

  button: {
    backgroundColor: "green",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  error: {
    color: "red",
    fontSize: 10,
    marginBottom: 12,
  },
});

export default RegScreen;
