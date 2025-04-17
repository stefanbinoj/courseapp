import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
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
    <SafeAreaView style={styles.safeArea}>
      <Text style={[styles.headerText]}>Courses</Text>
      <View style={styles.divider} />

      <FlashList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItemContainer}>
            <View style={styles.listItemTextContainer}>
              <Text
                style={styles.courseNameText}
                onPress={() => {
                  router.push(`/(home)/(assignment)/${item.id}`);
                }}
              >
                {item.courseName}
              </Text>
              {item.professor && (
                <Text style={styles.detailsText}>
                  Professor: {item.professor}
                </Text>
              )}
              <Text style={styles.detailsText}>
                {format(new Date(item.startDate), "dd MMM yyyy")} →{" "}
                {format(new Date(item.endDate), "dd MMM yyyy")}
              </Text>
            </View>

            <View style={styles.listItemButtonContainer}>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        estimatedItemSize={80}
        ListEmptyComponent={
          <View style={styles.emptyListComponent}>
            <Text style={styles.emptyListText}>
              Courses list is empty. Add a course!
            </Text>
          </View>
        }
      />

      <Link href="/addCourseModal" style={styles.floatingButton}>
        <Ionicons style={{ top: 15 }} name="add" size={30} color="white" />
      </Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
    position: "relative",
  },
  headerText: {
    paddingLeft: 16,
    marginTop: 12,
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: "#d1d5db",
    marginVertical: 12,
  },
  listItemContainer: {
    backgroundColor: "#f3f4f6",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  listItemTextContainer: {
    flex: 1,
  },
  courseNameText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  detailsText: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 4,
  },
  listItemButtonContainer: {
    flexDirection: "row",
    // Add paddingLeft here if space-x-3 effect is needed for multiple buttons
    // paddingLeft: 12,
  },
  emptyListComponent: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  emptyListText: {
    color: "#9ca3af",
  },
  floatingButton: {
    position: "absolute",
    paddingTop: 10,
    paddingLeft: 10,
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
    zIndex: 50, // Note: zIndex behavior can vary
  },
});

export default CourseScreen;
