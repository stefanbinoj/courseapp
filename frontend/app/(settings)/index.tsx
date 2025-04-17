import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const settings = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-red-200">
      <Text className="text-lg text-blue-500">Settings</Text>
    </SafeAreaView>
  );
};

export default settings;
