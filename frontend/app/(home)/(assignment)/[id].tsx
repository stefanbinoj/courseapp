import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function AssignmentScreen() {
  const { id } = useLocalSearchParams();

  return <Text>Assignment ID: {id}</Text>;
}
