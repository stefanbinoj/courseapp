import React from "react";
import { View, Text, StyleSheet } from "react-native"; // Import StyleSheet
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Settings</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fecaca",
  },
  text: {
    fontSize: 18,
    color: "#3b82f6",
  },
});

export default SettingsScreen; // Export the renamed component
