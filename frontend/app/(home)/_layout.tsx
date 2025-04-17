import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="(course)"
    >
      <Stack.Screen name="(course)" options={{ title: "Home" }} />
      <Stack.Screen name="(assignment)" />
    </Stack>
  );
}
