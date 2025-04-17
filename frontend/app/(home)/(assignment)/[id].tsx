import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Switch, StyleSheet } from "react-native";
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
        // NOTE: Replace 'localhost' with '10.0.2.2' for Android emulator
        const res = await axios.get(
          `http://10.0.2.2:3000/api/assignments/${id}`
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
      // NOTE: Replace 'localhost' with '10.0.2.2' for Android emulator
      await axios.put(
        `http://10.0.2.2:3000/api/assignments/${id}/${assignmentId}`
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
      // NOTE: Replace 'localhost' with '10.0.2.2' for Android emulator
      await axios.delete(
        `http://10.0.2.2:3000/api/assignments/${id}/${assignmentId}`
      );
      setAssignments((prev) => prev.filter((a) => a.id !== assignmentId));
    } catch (err) {
      console.error("Failed to delete assignment:", err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {assignments.length === 0 ? (
        <Text style={styles.emptyText}>No assignments found.</Text>
      ) : (
        assignments.map((assignment) => (
          <View key={assignment.id} style={styles.listItemContainer}>
            <View style={styles.listItemTextContainer}>
              <Text
                style={[
                  styles.assignmentTitle,
                  assignment.status === "completed" &&
                    styles.assignmentTitleCompleted,
                ]}
              >
                {assignment.title}
              </Text>
              <Text style={styles.dueDateText}>
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
              style={styles.deleteButton}
            >
              <Ionicons name="trash-outline" size={22} color="red" />
            </Pressable>
          </View>
        ))
      )}

      <Link
        href={{
          pathname: "/addAssignmentModal",
          params: { id: id as string }, // Ensure id is passed as string if needed
        }}
        style={styles.floatingButton}
      >
        <Ionicons name="add" size={30} color="white" />
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 16,
    position: "relative",
  },
  emptyText: {
    color: "#6b7280",
  },
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb", // border-gray-200 equivalent
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  listItemTextContainer: {
    flex: 1,
    marginRight: 8, // Add some space before the switch/button
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827", // Default text color
  },
  assignmentTitleCompleted: {
    textDecorationLine: "line-through",
    color: "#9ca3af", // text-gray-400
  },
  dueDateText: {
    fontSize: 14,
    color: "#6b7280", // text-gray-500
  },
  deleteButton: {
    marginLeft: 12,
  },
  floatingButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#2563eb",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: 50,
  },
});
