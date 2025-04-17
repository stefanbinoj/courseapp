import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Profile</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fca5a5", // bg-red-300
    flex: 1, // flex-1
    justifyContent: "center", // justify-center
    // Note: text-lg and text-red-700 on SafeAreaView don't directly apply
    // standard styles to child Text in React Native StyleSheet.
    // Apply text styles directly to Text components.
  },
  text: {
    textAlign: "center", // text-center
  },
});

export default ProfileScreen;
