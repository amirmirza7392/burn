import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Modal,
  Pressable,
  Alert,
  SectionList,
} from "react-native";
import moment from "moment";
import COLORS from "../consts/colors";
import { StatusBar } from "expo-status-bar";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Schedule from "f-react-native-schedule";
import { TextInput } from "react-native-gesture-handler";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { auth, app, db } from "../../firebase";
import { set } from "date-fns";
import { firebase } from "@react-native-firebase/database";

const DATA = [
  {
    title: "Calendar",
    data: ["Marking days"],
  },
];

const HomeScreen = ({ navigation }) => {
  const [selected, setSelected] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  //add schedule
  const [newdate, setnewDate] = React.useState("");
  const [newdesc, setnewDesc] = React.useState("");
  const [newstamp, setnewStamp] = React.useState("");
  const [userid, setUser] = useState("");

  const current_date = moment().format("YYYY-MM-DD");

  useEffect(() => {
    getData();
    setSelected(current_date);

    function loadItems() {
      firebase
        .firestore()
        .collection("task")
        .get.then((snapshot) => {
          snapshot.foreach((doc) => {
            DataTransferItemList.push({
              [doc.date]: [{ name: doc.desc, description: doc.desc }],
            });
          });
        });
      return itemList;
    }
  }, []);

  const getData = async () => {
    try {
      const value = await ReactNativeAsyncStorage.getItem("Prime");
      console.log("Home: User account no: " + value);
      setUser(value);
    } catch (error) {
      console.log(error);
    }
  };

  const add_schedule = (stamp) => {
    let _date = new Date(stamp);
    console.log(stamp + " : " + _date);
    setnewStamp(stamp);
    setnewDate(_date);

    setModalVisible(true);
  };

  const add_task = async () => {
    if (newdesc === undefined || newdesc === null || newdesc === "") {
      alert("Error: Empty field");
    } else {
      try {
        let _in_mark = "on-going";
        let _in_stamp = newstamp.toString();

        const docRef = await addDoc(collection(db, "task"), {
          date: selected,
          desc: newdesc,
          mark: _in_mark,
          stamp: _in_stamp,
          userid: userid,
        });

        console.log("Document written with ID: " + userid);

        alert("Schedule successfully added!");
        setModalVisible(!modalVisible);
        clear_modal();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const cancel_add = async () => {
    console.log("Cancel : " + userid);
    clear_modal();
    setModalVisible(!modalVisible);
  };

  const clear_modal = () => {
    let new_date = "";
    setnewDesc(new_date);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={{ width: "auto" }}>
            <Calendar
              onDayPress={(day) => {
                setSelected(day.dateString);
                console.log("Selected day: ", day);
              }}
              markedDates={{
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: COLORS.primary,
                },
                [sched_dates]: {
                  selected: true,
                  marked: true,
                  selectedColor: COLORS.primary,
                },
              }}
            />
          </View>
        )}
      ></SectionList>

      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Schedule
              style={{ marginTop: 5 }}
              cellDimensions={{ height: 50 }}
              currentView="day"
              selectedDate={selected}
              onCellLongPress={(value) => {
                //console.log("Value of cell: " + new Date(value));
                //console.log("Value of cell: " + value);
                //console.log(selected);
                add_schedule(value);
              }}
            ></Schedule>
          </View>
        )}
      ></SectionList>

      <StatusBar style="auto" />

      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ padding: 10, fontSize: 20 }}>Add Task</Text>
              <TextInput
                style={{
                  padding: 20,
                  fontSize: 20,
                  borderColor: COLORS.dark,
                  borderWidth: 1,
                  borderRadius: 5,
                  marginVertical: 10,
                }}
                placeholder="Enter Task"
                multiline
                numberOfLines={4}
                maxLength={50}
                type="text"
                onChangeText={(text) => setnewDesc(text)}
                value={newdesc}
              ></TextInput>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => add_task()}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => cancel_add()}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: 300,

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
  },

  buttonOpen: {
    backgroundColor: COLORS.secondary,
  },

  buttonClose: {
    backgroundColor: COLORS.primary,
  },

  textStyle: {
    color: "white",
    textAlign: "center",
    padding: 5,
  },

  modalText: {
    marginBottom: 15,
  },

  Modal: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
