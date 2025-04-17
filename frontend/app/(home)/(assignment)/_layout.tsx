import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function RootLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: "Assignment",
          headerShown: true,
          presentation: "modal",
          headerLeft: () => (
            <Pressable
              onPress={() => router.navigate("/(home)")}
              style={{ paddingHorizontal: 16 }}
            >
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
          ),
        }}
      />

      <Stack.Screen
        name="addAssignmentModal"
        options={{
          title: "Add Assignment",
          headerShown: true,
          presentation: "modal",
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={{ paddingHorizontal: 16 }}
            >
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
