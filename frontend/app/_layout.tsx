import "./global.css";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = "help";

          if (route.name === "(home)") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "(profile)") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "(settings)") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarLabel: ({ color, focused }) => {
          // Accept standard props
          let labelName;
          switch (route.name) {
            case "(home)":
              labelName = "Courses";
              break; // Use break for clarity or just return directly
            case "(profile)":
              labelName = "Profile";
              break;
            case "(settings)":
              labelName = "Settings";
              break;
            default:
              labelName = route.name; // Keep the default fallback
          }

          return <Text style={{ color: color }}>{labelName}</Text>;
        },
        tabBarActiveTintColor: "#1e40af",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          paddingBottom: 12,
          paddingTop: 6,
          height: 70,
          backgroundColor: "#fff",
          display: "flex",
        },
      })}
    />
  );
}
