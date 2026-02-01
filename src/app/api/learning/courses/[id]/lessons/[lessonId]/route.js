import connectDB from "@/lib/connectDB";
import Course from "@/models/learning/Course";
import Lesson from "@/models/learning/Lesson";
import UserProgress from "@/models/learning/UserProgress";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id: courseId, lessonId } = await params;

    // check course
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    // check lesson
    const lesson = await Lesson.findOne({
      _id: lessonId,
      courseId: courseId,
    });

    if (!lesson) {
      return NextResponse.json(
        { success: false, message: "Lesson not found in this course" },
        { status: 404 }
      );
    }

    const deletedOrder = lesson.order;

    await lesson.deleteOne();

    await Lesson.updateMany(
      { courseId: courseId, order: { $gt: deletedOrder } },
      { $inc: { order: -1 } }
    );

    const progresses = await UserProgress.find({ courseId });

    for (let progress of progresses) {
      progress.completedLessons = progress.completedLessons.filter(
        (id) => id.toString() !== lessonId
      );
      await progress.save();
    }

    await recalculateProgressForCourse(courseId);

    return NextResponse.json({
      success: true,
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    console.error("Delete lesson error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete lesson",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

async function recalculateProgressForCourse(courseId) {
  const totalLessons = await Lesson.countDocuments({ courseId });
  const allProgress = await UserProgress.find({ courseId });

  for (let progress of allProgress) {
    const completedCount = progress.completedLessons.length;

    progress.progressPercentage =
      totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    if (progress.isCompleted && progress.progressPercentage < 100) {
      progress.isCompleted = false;
      progress.completedAt = null;
    }

    await progress.save();
  }
}
