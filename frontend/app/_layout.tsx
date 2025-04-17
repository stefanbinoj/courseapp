import "./global.css";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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
        tabBarLabel: () => {
          switch (route.name) {
            case "(home)":
              return "Courses";
            case "(profile)":
              return "Profile";
            case "(settings)":
              return "Settings";
            default:
              return route.name;
          }
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
