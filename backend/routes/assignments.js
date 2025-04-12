const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");

router.get("/:courseId/", assignmentController.getAllAssignments);
router.post("/:courseId/", assignmentController.createAssignment);
router.put("/:courseId/:id", assignmentController.updateAssignment);
router.delete("/:courseId/:id", assignmentController.deleteAssignment);

module.exports = router;
