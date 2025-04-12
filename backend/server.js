const express = require("express");
const cors = require("cors");
const coursesRouter = require("./routes/courses");
const assignmentsRouter = require("./routes/assignments");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/courses", coursesRouter);
app.use("/api/assignments", assignmentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
