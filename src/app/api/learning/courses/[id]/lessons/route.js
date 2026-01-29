import { sendCourseUpdateEmail } from "@/helpers/sendCourseUpdateEmail";
import connectDB from "@/lib/connectDB";
import Course from "@/models/learning/Course";
import Lesson from "@/models/learning/Lesson";
import UserProgress from "@/models/learning/UserProgress";
import NotificationSettings from "@/models/NotificationSettings";
import { NextResponse } from "next/server";

// get all chap wise lessons
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const course = await Course.findById(id);
    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    const lessons = await Lesson.find({ courseId: id }).sort({ order: 1 });

    return NextResponse.json({
      success: true,
      count: lessons.length,
      data: lessons,
      totalAllowed: course.totalLessons,
    });
  } catch (error) {
    console.error("Get lessons error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch lessons",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// post Chap (lesson) wise content
export async function POST(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const course = await Course.findById(id).select("title totalLessons");

    console.log(course)
    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    if (!course.totalLessons) {
      return NextResponse.json(
        {
          success: false,
          message: "Course totalLessons not configured",
        },
        { status: 400 }
      );
    }

    const existingLessonsCount = await Lesson.countDocuments({ courseId: id });

    if (existingLessonsCount >= course.totalLessons) {
      return NextResponse.json(
        {
          success: false,
          message: `Cannot add more lessons. Course limit is ${course.totalLessons} lessons. Current: ${existingLessonsCount}`,
        },
        { status: 400 }
      );
    }

    const { title, content, order, duration, codeExamples, resources } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: "Title and content are required" },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    let lessonOrder = order;
    if (!lessonOrder) {
      const lastLesson = await Lesson.findOne({ courseId: id }).sort({
        order: -1,
      });
      lessonOrder = lastLesson ? lastLesson.order + 1 : 1;
    }

    const lesson = await Lesson.create({
      courseId: id,
      title,
      slug,
      content,
      order: lessonOrder,
      duration: duration || "10 min",
      codeExamples: codeExamples || [],
      resources: resources || [],
    });

    await recalculateProgressForCourse(id);

    const enrolledUsers = await UserProgress.find({ courseId: id }).select(
      "userId"
    );

    const userIds = enrolledUsers.map((u) => u.userId);

    const notificationSettings = await NotificationSettings.find({
      userId: { $in: userIds },
      "channels.email": true,
      "learning.courseUpdates": true,
    }).populate("userId", "email name");

    for (const ns of notificationSettings) {
      const user = ns.userId;

      await sendCourseUpdateEmail(
        user.email,
        user.name,
        course.title,
        lesson.title,
        course._id
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: `Lesson created successfully (${existingLessonsCount + 1}/${course.totalLessons})`,
        data: lesson,
        remaining: course.totalLessons - (existingLessonsCount + 1),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create lesson error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create lesson",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

async function recalculateProgressForCourse(courseId) {
  try {
    const totalLessons = await Lesson.countDocuments({ courseId });
    const allProgress = await UserProgress.find({ courseId });

    for (let progress of allProgress) {
      const completedCount = progress.completedLessons.length;
      const newPercentage =
        totalLessons > 0
          ? Math.round((completedCount / totalLessons) * 100)
          : 0;

      progress.progressPercentage = newPercentage;

      // Reset completion if new lessons added
      if (progress.isCompleted && newPercentage < 100) {
        progress.isCompleted = false;
        progress.completedAt = null;
      }

      await progress.save();
    }
  } catch (error) {
    console.error("Recalculation error:", error);
  }
}
