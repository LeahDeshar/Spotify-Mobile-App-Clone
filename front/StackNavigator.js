import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerShadow: false,
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) => {
            focused ? (
              <Entypo name="home" size={24} color={"black"} />
            ) : (
              <AntDesign name="home" size={24} color={"black"} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) => {
            focused ? (
              <Ionicons name="person" size={24} color={"black"} />
            ) : (
              <Ionicons name="person-outline" size={24} color={"black"} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTab}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
