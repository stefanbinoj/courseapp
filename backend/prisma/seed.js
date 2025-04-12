const prisma = require("./index");

async function main() {
  // Create some courses
  const course1 = await prisma.course.create({
    data: {
      courseName: "Introduction to Computer Science",
      professor: "Dr. Smith",
      startDate: new Date("2025-01-15"),
      endDate: new Date("2025-05-15"),
    },
  });

  const course2 = await prisma.course.create({
    data: {
      courseName: "Software Engineering",
      professor: "Prof. Jane Doe",
      startDate: new Date("2025-01-20"),
      endDate: new Date("2025-05-20"),
    },
  });

  // Create assignments linked to course1
  await prisma.assignment.createMany({
    data: [
      {
        courseId: course1.id,
        title: "Assignment 1: Basics of Computing",
        dueDate: new Date("2025-02-10"),
        status: "pending",
      },
      {
        courseId: course1.id,
        title: "Assignment 2: Logic Gates",
        dueDate: new Date("2025-03-01"),
        status: "completed",
      },
    ],
  });

  // Create assignments linked to course2
  await prisma.assignment.createMany({
    data: [
      {
        courseId: course2.id,
        title: "Assignment 1: Software Development Life Cycle",
        dueDate: new Date("2025-02-20"),
        status: "pending",
      },
      {
        courseId: course2.id,
        title: "Assignment 2: Agile Methodologies",
        dueDate: new Date("2025-03-15"),
        status: "pending",
      },
    ],
  });

  console.log("✅ Seed completed.");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
