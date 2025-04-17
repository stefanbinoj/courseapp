import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import { format } from "date-fns";
import axios from "axios";
import { api } from "@/constants/api";

interface courseType {
  id: number;
  courseName: string;
  professor?: string;
  startDate: string;
  endDate: string;
}

const CourseScreen = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<courseType[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${api}/api/courses`);
        setCourses(res.data.courses);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${api}/api/courses/${id}`);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete course:", err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <Text className="pl-4 mt-3 text-2xl font-bold text-blue-600">
        Courses
      </Text>
      <View className="border-t border-gray-300 my-3" />

      <FlashList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({
          item,
        }: {
          item: {
            id: number;
            courseName: string;
            professor?: string;
            startDate: string;
            endDate: string;
          };
        }) => (
          <View className="bg-gray-100 mx-4 mb-3 p-4 rounded-xl shadow-sm flex-row justify-between items-start">
            <View className="flex-1">
              <Text
                className="text-lg font-semibold text-gray-900"
                onPress={() => {
                  router.push(`/(home)/(assignment)/${item.id}`);
                }}
              >
                {item.courseName}
              </Text>
              {item.professor && (
                <Text className="text-sm text-gray-600 mt-1">
                  Professor: {item.professor}
                </Text>
              )}
              <Text className="text-sm text-gray-600 mt-1">
                {format(new Date(item.startDate), "dd MMM yyyy")} →
                {format(new Date(item.endDate), "dd MMM yyyy")}
              </Text>
            </View>

            <View className="flex-row space-x-3">
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        estimatedItemSize={80}
        ListEmptyComponent={
          <View className="items-center justify-center mt-20">
            <Text className="text-gray-400">
              Courses list is empty. Add a course!
            </Text>
          </View>
        }
      />

      {/* Floating + Button */}
      <Link
        href="/addCourseModal"
        className="absolute  bottom-6 right-6 bg-blue-600 w-14 h-14 rounded-full items-center justify-center shadow-lg z-50"
      >
        <Ionicons name="add" size={30} color="white" className="m-3  top-3" />
      </Link>
    </SafeAreaView>
  );
};

export default CourseScreen;
