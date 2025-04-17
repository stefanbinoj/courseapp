import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const profile = () => {
  return (
    <SafeAreaView className="bg-red-300 text-lg text-red-700 flex-1 justify-center">
      <Text className=" text-center">Profile</Text>
    </SafeAreaView>
  );
};

export default profile;
