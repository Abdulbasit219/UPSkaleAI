import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import Course from "@/models/learning/Course";
import Lesson from "@/models/learning/Lesson";
import UserProgress from "@/models/learning/UserProgress";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// enroll in course
export async function POST(request, { params }) {
  try {
    await connectDB();

    // Get user from session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const userId = session.user._id;

    // const id = "69427318118c4a94b6f5ce39"
    // const userId = "6922ad85960624dadd579169";

    // Check if course exists
    const course = await Course.findById(id);
    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    // Check if already enrolled
    const existingProgress = await UserProgress.findOne({
      userId,
      courseId: id,
    });

    if (existingProgress) {
      return NextResponse.json(
        { success: false, message: "Already enrolled in this course" },
        { status: 400 }
      );
    }

    const firstLesson = await Lesson.findOne({ courseId: id }).sort({
      order: 1,
    });

    const progress = await UserProgress.create({
      userId,
      courseId: id,
      currentLesson: firstLesson?._id,
      enrolledAt: new Date(),
      lastAccessedAt: new Date(),
    });

    await Course.findByIdAndUpdate(id, {
      $inc: { enrolledCount: 1 },
    });

    return NextResponse.json({
      success: true,
      message: "Successfully enrolled in course",
      data: progress,
    });
  } catch (error) {
    console.error("Enroll error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to enroll", error: error.message },
      { status: 500 }
    );
  }
}

// enroll progress
export async function GET(request, { params }) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: true, enrolled: false });
    }

    const { id } = params;
    const userId = session.user._id;
    // const userId = "6922ad85960624dadd579169"

    const progress = await UserProgress.findOne({
      userId,
      courseId: id,
    });

    return NextResponse.json({
      success: true,
      enrolled: !!progress,
      data: progress,
    });
  } catch (error) {
    console.error("Check enrollment error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to check enrollment",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
