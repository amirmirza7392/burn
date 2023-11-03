import React, {useState, useEffect} from 'react';
import {
  Alert,
  Text,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native';
import COLORS from '../consts/colors';
import {PrimaryButton, SecondaryButton} from '../consts/buttons';
import {ImageBackground} from 'react-native';
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   documentId,
//   doc,
//   updateDoc,
// } from "firebase/firestore";
import {auth, app, db} from '../../firebase';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = ({navigation}) => {
  const [id, setid] = useState('');
  const [name, setName] = useState('');
  const [post, setPost] = useState('');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [col, setCol] = useState('');
  const [group, setGroup] = useState('');

  useEffect(() => {
    getData();
  }, []);

  //get userid
  const getData = async () => {
    try {
      const value = await ReactNativeAsyncStorage.getItem('Prime');
      if (value !== null) {
        setid(value);
        console.log('Account current user id: ' + value);
        get_user_data(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const get_user_data = async _id => {
    try {
      const q = query(collection(db, 'user'), where(documentId(), '==', _id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        //console.log(doc.data());

        setName(doc.data()['name']);
        setPost(doc.data()['status']);
        setGroup(doc.data()['group']);
        setUser(doc.data()['username']);
        setPass(doc.data()['password']);
        setCol(doc.data()['color']);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const update_handler = () => {
    Alert.alert(
      'Update',
      'Confirm to proceed the update.',
      [
        {text: 'Confirm', onPress: () => update_account(id)},
        {
          text: 'Cancel',
          onPress: () => get_user_data(id),
          style: 'cancel',
        },
      ],

      {cancelable: false},
    );
  };

  //Update
  const update_account = async _id_user => {
    if (name === undefined || name === null || name === '') {
      alert('Update Name: No entry! Fill the name field.');
    } else {
      if (post === undefined || post === null || post === '') {
        alert('Update designation: No entry! Fill the position field.');
      } else {
        if (user === undefined || user === null || user === '') {
          alert('Update Username: No entry! Fill the position field.');
        } else {
          if (pass === undefined || pass === null || pass === '') {
            alert('Update Password: No entry! Fill the aspiring field.');
          } else {
            try {
              const accountRef = doc(db, 'user', _id_user);
              await updateDoc(accountRef, {
                name: name,
                status: post,
                group: group,
                username: user,
                password: pass,
              });

              alert('Account successfully updated!');
              console.log('Account updated');

              getData();
            } catch (e) {
              console.log(e);
            }
          }
        }
      }
    }
  };

  //Logout confirmation box
  const logout_handler = () => {
    Alert.alert(
      'Logout',
      'Thanks for using the mobile app, are you sure you want to logout?',
      [
        {text: 'Yes', onPress: () => logout()},
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const logout = () => {
    const new_user = '';
    storeData(new_user);

    alert('Successfully logged out!');
    navigation.navigate('OnBoard');
  };

  //store empty data for clear cache
  const storeData = async value => {
    try {
      await ReactNativeAsyncStorage.setItem('Prime', value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={style.mainContainer}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/MyHorseBg.png')}>
        <ScrollView>
          <View
            style={{
              width: 150,
              height: 150,
              backgroundColor: col,
              borderRadius: 100,
              marginTop: 20,
              justifyContent: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            <Text style={{textAlign: 'center', fontSize: 50}}>
              {Array.from(name)[0]}
            </Text>
          </View>

          <View>
            <View style={style.mainContainer2}>
              <TextInput
                placeholder="Name"
                style={style.input}
                value={name}
                onChangeText={text => setName(text)}
              />

              <TextInput
                placeholder="Group"
                value={group}
                style={style.input}
              />

              <TextInput
                placeholder="Designation"
                value={post}
                style={style.input}
                onChangeText={text => setPost(text)}
              />

              <TextInput
                placeholder="Username"
                value={user}
                style={style.input}
                onChangeText={text => setUser(text)}
              />

              <TextInput
                placeholder="Password"
                value={pass}
                style={style.input}
                secureTextEntry
                onChangeText={text => setPass(text)}
              />
            </View>

            <View style={{marginTop: 30, paddingHorizontal: 40}}>
              <PrimaryButton
                title="Update"
                onPress={update_handler}></PrimaryButton>
            </View>
            <View style={{marginTop: 10, paddingHorizontal: 40}}>
              <SecondaryButton
                title="Logout"
                onPress={logout_handler}></SecondaryButton>
            </View>

            <StatusBar style="auto" />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignContent: 'center',
  },

  mainContainer2: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 30,
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
});

export default AccountScreen;
