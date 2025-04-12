const prisma = require("../prisma");

const getAllAssignments = async (req, res) => {
  try {
    const { courseId } = req.params;
    const assignment = await prisma.assignment.findMany({
      where: {
        courseId: parseInt(courseId),
      },
    });
    return res.json({ success: true, assignment }).status(200);
  } catch (error) {
    console.log("Error occured while fetching data : ", error);
    return res
      .status(500)
      .json({ success: false, error, message: "server error" });
  }
};

const createAssignment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, dueDate } = req.body;
    const newAssignment = await prisma.assignment.create({
      data: {
        title,
        courseId: parseInt(courseId),
        dueDate: new Date(dueDate),
      },
    });
    return res.status(201).json({ success: true, assignment: newAssignment });
  } catch (error) {
    console.log("Error occured while creating data : ", error);
    return res
      .status(500)
      .json({ success: false, error, message: "server error" });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const { id, courseId } = req.params;
    const assignment = await prisma.assignment.findUnique({
      where: { id: parseInt(id), courseId: parseInt(courseId) },
    });

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const newStatus = assignment.status === "pending" ? "completed" : "pending";

    const updatedAssignment = await prisma.assignment.update({
      where: { id: parseInt(id) },
      data: { status: newStatus },
    });

    res.status(200).json({ success: true, updatedAssignment });
  } catch (error) {
    console.log("Error occured while updating data : ", error);
    return res
      .status(500)
      .json({ success: false, error, message: "server error" });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const { id, courseId } = req.params;
    const assignment = await prisma.assignment.delete({
      where: { id: parseInt(id), courseId: parseInt(courseId) },
    });

    res.status(200).json({ success: true, assignment });
  } catch (error) {
    console.log("Error occured while updating data : ", error);
    return res
      .status(500)
      .json({ success: false, error, message: "server error" });
  }
};

module.exports = {
  getAllAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
