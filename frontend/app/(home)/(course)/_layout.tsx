import { Slot, Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />

      <Stack.Screen
        name="addCourseModal"
        options={{
          title: "Add Course",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
