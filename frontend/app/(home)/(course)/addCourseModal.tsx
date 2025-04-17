import React, { useState } from "react";
import { Text, TextInput, View, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { api } from "@/constants/api";

const AddCourseModal = () => {
  const [courseName, setCourseName] = useState("");
  const [professor, setProfessor] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!courseName || !professor || !endDate) {
      setError("All fields are required");
      return;
    }

    const newCourse = {
      courseName,
      professor,
      endDate,
    };

    try {
      const response = await axios.post(`${api}/api/courses`, newCourse);
      console.log("Course added successfully:", response.data);
      router.back();
    } catch (error) {
      console.error("Error adding course:", error);
      setError("Failed to add the course. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Course</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Course Name"
        value={courseName}
        onChangeText={setCourseName}
      />
      <TextInput
        style={styles.input}
        placeholder="Professor Name"
        value={professor}
        onChangeText={setProfessor}
      />
      <TextInput
        style={styles.input}
        placeholder="End Date (YYYY-MM-DD)"
        value={endDate}
        onChangeText={setEndDate}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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

export default AddCourseModal;
