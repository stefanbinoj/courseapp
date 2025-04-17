import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Pressable, Switch } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AssignmentScreen() {
  const { id } = useLocalSearchParams();
  const [assignments, setAssignments] = useState<any[]>([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/assignments/${id}`
        );
        setAssignments(res.data.assignment);
      } catch (err) {
        console.error("Error fetching assignments:", err);
      }
    };

    fetchAssignments();
  }, [id]);

  const toggleStatus = async (assignmentId: number, currentStatus: string) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    try {
      await axios.put(
        `http://localhost:3000/api/assignments/${id}/${assignmentId}`
      );
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === assignmentId ? { ...a, status: newStatus } : a
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (assignmentId: number) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/assignments/${id}/${assignmentId}`
      );
      setAssignments((prev) => prev.filter((a) => a.id !== assignmentId));
    } catch (err) {
      console.error("Failed to delete assignment:", err);
    }
  };

  return (
    <SafeAreaView className="flex-1 p-4 relative">
      {assignments.length === 0 ? (
        <Text className="text-gray-500">No assignments found.</Text>
      ) : (
        assignments.map((assignment) => (
          <View
            key={assignment.id}
            className="flex-row justify-between items-center border p-3 rounded-lg mb-3"
          >
            <View className="flex-1">
              <Text
                className={`text-lg font-semibold ${
                  assignment.status === "completed"
                    ? "line-through text-gray-400"
                    : ""
                }`}
              >
                {assignment.title}
              </Text>
              <Text className="text-sm text-gray-500">
                Due: {format(new Date(assignment.dueDate), "MMM dd, yyyy")}
              </Text>
            </View>

            <Switch
              value={assignment.status === "completed"}
              onValueChange={() =>
                toggleStatus(assignment.id, assignment.status)
              }
            />

            <Pressable
              onPress={() => handleDelete(assignment.id)}
              className="ml-3"
            >
              <Ionicons name="trash-outline" size={22} color="red" />
            </Pressable>
          </View>
        ))
      )}

      <Link
        href={{
          pathname: "/addAssignmentModal",
          params: { id: id },
        }}
        className="absolute bottom-6 right-6 bg-blue-600 w-14 h-14 rounded-full items-center justify-center shadow-lg z-50"
      >
        <Ionicons name="add" size={30} color="white" />
      </Link>
    </SafeAreaView>
  );
}
