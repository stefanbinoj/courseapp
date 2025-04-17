import React, { useState } from "react";
import { Text, TextInput, View, Button, SafeAreaView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { api } from "@/constants/api";

const AddAssignmentModal = () => {
  const { id } = useLocalSearchParams(); // courseId from params
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
      await axios.post(`${api}/api/assignments/${id}`, newAssignment);
      router.back(); // Navigate back on success
    } catch (err) {
      console.error("Error adding assignment:", err);
      setError("Failed to add assignment. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Add Assignment</Text>

      {error && <Text className="text-red-500 mb-2">{error}</Text>}

      <TextInput
        className="border border-gray-400 rounded-md p-2 mb-4 w-full"
        placeholder="Assignment Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className="border border-gray-400 rounded-md p-2 mb-4 w-full"
        placeholder="Due Date (YYYY-MM-DD)"
        value={dueDate}
        onChangeText={setDueDate}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

export default AddAssignmentModal;
