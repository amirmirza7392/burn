import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import { Alert, SafeAreaView, ImageBackground } from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, app, db } from "../../firebase";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const GroupScreen = ({ navigation }) => {
  const [listItems, setListItems] = useState([]);
  const [group, setGroup] = useState("");

  //get the group
  useEffect(() => {
    getData();
  }, []);

  //get userid
  const getData = async () => {
    try {
      const value = await ReactNativeAsyncStorage.getItem("Prime");
      if (value !== null) {
        console.log("Group -get data value: " + value);
        get_user_data(value);
      } else {
        console.log("ID no value");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const get_user_data = async (_id) => {
    if (!_id) {
      //logout();
      console.log("Group: id empty");
    } else {
      console.log("Group show id: " + _id);

      const q = query(collection(db, "user"), where(documentId(), "==", _id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());

        setGroup(doc.data()["group"]);
        console.log("Group: retreive group: " + doc.data()["group"]);
      });
    }
  };

  //populate the array
  const array_data = async () => {
    setListItems([]);
    const q = query(collection(db, "user"), where("group", "==", group));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let nym = doc.data()["name"];
      let syt = doc.data()["status"];
      let col = doc.data()["color"]; //

      let arr = [
        {
          name: nym,
          stat: syt,
          color: col,
        },
      ];

      setListItems((current) => [...current, ...arr]);
      console.log(doc.data());
    });
  };

  const ItemView = ({ item }) => {
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <View style={{ paddingLeft: 20, flex: 1, flexDirection: "row" }}>
        <View
          style={{
            justifyContent: "center",
            width: 50,
            height: 50,
            backgroundColor: item.color,
            borderRadius: 150 / 2,
            alignSelf: "center",
            marginRight: 20,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 24 }}>
            {Array.from(item.name)[0]}
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={{ fontSize: 20 }} onPress={() => getItem(item)}>
            {item.name}
          </Text>
          <Text onPress={() => getItem(item)}>{item.stat}</Text>
        </View>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#C8C8C8" }}
      />
    );
  }; //

  const getItem = (item) => {
    //Function for click on an item //
    Alert.alert(
      item.name,
      item.stat,
      [{ text: "Close", onPress: () => console.log("View " + item.name) }],

      { cancelable: false }
    );

    //alert('Name : ' + item.name + ' Designation : ' + item.stat);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/MyHorseBg.png")}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            data={listItems}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            keyExtractor={(item, index) => index.toString()} //
          />

          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
  },
});

export default GroupScreen;
