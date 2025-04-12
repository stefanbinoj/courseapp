const prisma = require("../prisma");

const getAllCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    return res.status(200).json({ success: true, courses });
  } catch (error) {
    console.log("Error occurred while fetching courses:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
};

const createCourse = async (req, res) => {
  const { courseName, professor, startDate, endDate } = req.body;

  if (!courseName || !endDate) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const newCourse = await prisma.course.create({
      data: {
        courseName,
        professor: professor || null,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: new Date(endDate),
      },
    });

    return res.status(201).json({ success: true, course: newCourse });
  } catch (error) {
    console.log("Error occurred while creating course:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { courseName, professor, startDate, endDate } = req.body;

  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
    });

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const updatedCourse = await prisma.course.update({
      where: { id: parseInt(id) },
      data: {
        courseName: courseName || course.courseName,
        professor: professor || course.professor,
        startDate: startDate ? new Date(startDate) : course.startDate,
        endDate: endDate ? new Date(endDate) : course.endDate,
      },
    });

    return res.status(200).json({ success: true, course: updatedCourse });
  } catch (error) {
    console.log("Error occurred while updating course:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
    });

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    await prisma.course.delete({
      where: { id: parseInt(id) },
    });

    return res
      .status(204)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.log("Error occurred while deleting course:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};
