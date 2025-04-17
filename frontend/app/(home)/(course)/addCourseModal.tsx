import React, { useState } from "react";
import { Text, TextInput, View, Button } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router"; // To navigate after course is added
import { api } from "@/constants/api";

const AddCourseModal = () => {
  const [courseName, setCourseName] = useState("");
  const [professor, setProfessor] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(""); // To display validation error messages
  const router = useRouter();

  const handleSubmit = async () => {
    if (!courseName || !professor || !endDate) {
      setError("All fields are required");
      return;
    }

    // Create the course object
    const newCourse = {
      courseName,
      professor,
      endDate,
    };

    try {
      // Make the POST request to add the new course
      const response = await axios.post(`${api}/api/courses`, newCourse);
      console.log("Course added successfully:", response.data);

      // On success, navigate back
      router.back();
    } catch (error) {
      console.error("Error adding course:", error);
      setError("Failed to add the course. Please try again.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl font-bold mb-4">Add New Course</Text>

      {/* Display error message */}
      {error && <Text className="text-red-500 mb-2">{error}</Text>}

      <TextInput
        className="border border-gray-400 rounded-md p-2 mb-4 w-full"
        placeholder="Course Name"
        value={courseName}
        onChangeText={setCourseName}
      />
      <TextInput
        className="border border-gray-400 rounded-md p-2 mb-4 w-full"
        placeholder="Professor Name"
        value={professor}
        onChangeText={setProfessor}
      />
      <TextInput
        className="border border-gray-400 rounded-md p-2 mb-4 w-full"
        placeholder="End Date (YYYY-MM-DD)"
        value={endDate}
        onChangeText={setEndDate}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default AddCourseModal;
