import "react-native-gesture-handler";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import { View } from "react-native";

//Screens
import HomeScreen from "../views/HomeScreen";
import GroupScreen from "../views/GroupScreen";
import LogScreen from "../views/LogScreen";
import TodoScreen from "../views/TodoScreen";
import AccountScreen from "../views/AccountScreen";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        style: {
          height: 75,
          borderTopWidth: 0,
          elevation: 0
        },
        showLabel: false,
        activeTintColor: COLORS.primary
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Group"
        component={GroupScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="group" color={color} size={28} />
          )
        }}
      />
      <Tab.Screen
        name="Logger"
        component={LogScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="notes" color={color} size={28} />
          )
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                height: 60,
                width: 60,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.white,
                borderColor: color,
                borderWidth: 2,
                borderRadius: 30,
                top: -25,
                elevation: 5
              }}
            >
              <Icon name="today" color={color} size={28} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Todo"
        component={TodoScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="assignment" color={color} size={28} />
          )
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="account-circle" color={color} size={28} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
