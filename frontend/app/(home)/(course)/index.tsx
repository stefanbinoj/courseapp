import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons"; // or any icon set you like

const course = () => {
  return (
    <View>
      <Text>course</Text>
    </View>
  );
};

export default course;

export const options = {
  tabBarLabel: "Home Page",
  tabBarIcon: ({ color, size }: { color: string; size: number }) => (
    <Ionicons name="home-outline" color={color} size={size} />
  ),
};

const styles = StyleSheet.create({});
