import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { api } from "@/constants/api";

const AddAssignmentModal = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!title || !dueDate) {
      setError("Both fields are required");
      return;
    }

    const newAssignment = {
      title,
      dueDate,
    };

    try {
      // Note: Ensure 'api' constant includes the correct base URL (e.g., http://10.0.2.2:3000)
      await axios.post(`${api}/api/assignments/${id}`, newAssignment);
      router.back();
    } catch (err) {
      console.error("Error adding assignment:", err);
      setError("Failed to add assignment. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Add Assignment</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Assignment Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Due Date (YYYY-MM-DD)"
        value={dueDate}
        onChangeText={setDueDate}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  errorText: {
    color: "#ef4444",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#9ca3af",
    borderRadius: 6,
    padding: 8,
    marginBottom: 16,
    width: "100%",
  },
});

export default AddAssignmentModal;
