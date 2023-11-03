import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';
import BottomNavigator from './src/navigation/BottomNavigation';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <BottomNavigator />
    </NavigationContainer>
    // <NavigationContainer>
    //   <Tab.Navigator>
    //     <Tab.Screen name="Screen1" component={Screen1} />
    //     <Tab.Screen name="Screen2" component={Screen1} />
    //   </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default App;

const Screen1 = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Text>hi</Text>
    </View>
  );
};
