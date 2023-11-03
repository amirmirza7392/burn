import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, Text, StyleSheet, View, StatusBar} from 'react-native';
import {Alert, SafeAreaView, ImageBackground, Modal} from 'react-native';
// import { collection, query, where, getDocs } from "firebase/firestore";
import {auth, app, db} from '../../firebase';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../consts/colors';

const TodoScreen = ({navigation}) => {
  const [listItems, setListItems] = useState([]);
  const [userlog, setuserlog] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  //get the group
  useEffect(() => {
    getData();
    array_data(userlog); //
  }, []);

  //get userid
  const getData = async () => {
    try {
      const value = await ReactNativeAsyncStorage.getItem('Prime');
      if (value !== null) {
        console.log('Group -get data value: ' + value);
        setuserlog(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //populate the array
  const array_data = async id_user => {
    setListItems([]);

    const q = query(collection(db, 'task'), where('userid', '==', id_user));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      let dyt = doc.data()['stamp'];
      let desc = doc.data()['desc'];
      let mark = doc.data()['mark'];

      let arr = [
        {
          dates: dyt,
          decs: desc,
          marks: mark,
        },
      ];

      setListItems(current => [...current, ...arr]);
      console.log(doc.data()); //
    });
  };

  const ItemView = ({item}) => {
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <View
        style={{paddingLeft: 20, flex: 1, flexDirection: 'row', padding: 5}}>
        <View style={styles.item}>
          <Text style={{color: COLORS.dark}} onPress={() => getItem(item)}>
            {item.dates}
          </Text>
          <Text
            style={{fontWeight: 600, fontSize: 20}}
            onPress={() => getItem(item)}>
            {item.decs}
          </Text>
          <Text onPress={() => getItem(item)}>{item.marks}</Text>
        </View>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}} />
    );
  }; //

  const getItem = item => {
    //Function for click on an item
    Alert.alert(
      item.dates,
      item.decs,
      [{text: 'Close', onPress: () => console.log('View ' + item.dates)}],

      {cancelable: false},
    );

    //alert('Name : ' + item.name + ' Designation : ' + item.stat);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/MyHorseBg.png')}>
        <View>
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
  container: {
    flex: 1,
    height: 'auto',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  item: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
  },
});

export default TodoScreen;
