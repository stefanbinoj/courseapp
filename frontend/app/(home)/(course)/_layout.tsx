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
      <Stack.Screen name="index" />

      <Stack.Screen
        name="addCourseModal"
        options={{
          title: "Add Course",
          headerShown: true,
          presentation: "modal",
          animation: "slide_from_bottom",
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
