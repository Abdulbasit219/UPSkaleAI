import connectDB from "@/lib/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserProgress from "@/models/learning/UserProgress";
import { NextResponse } from "next/server";
import Lesson from "@/models/learning/Lesson";
import Certificate from "@/models/learning/Certificate";
import Course from "@/models/learning/Course"

// GET USER PROGRESS (search for both query based on course or not)
export async function GET(request) {  
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");
    const userId = session.user._id;

    let query = { userId };
    if (courseId) {
      query.courseId = courseId;
    }

    const progress = await UserProgress.find(query)
      .populate("courseId", "title slug category difficulty tags estimatedTime")
      .populate("currentLesson", "title slug")
      .sort({ lastAccessedAt: -1 });

    return NextResponse.json({
      success: true,
      count: progress.length,
      data: progress,
    });
  } catch (error) {
    console.error("Get progress error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch progress",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// UPDATE PROGRESS (Mark Lesson Complete)
export async function POST(request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { courseId, lessonId } = body;
    const userId = session.user._id;
    
    if (!courseId || !lessonId) {
      return NextResponse.json(
        { success: false, message: "courseId and lessonId are required" },
        { status: 400 }
      );
    }

    let progress = await UserProgress.findOne({ userId, courseId });

    if (!progress) {
      return NextResponse.json(
        { success: false, message: "Not enrolled in this course" },
        { status: 404 }
      );
    }

    const alreadyCompleted = progress.completedLessons.some(
      (cl) => cl.lessonId.toString() === lessonId
    );

    if (!alreadyCompleted) {
      progress.completedLessons.push({
        lessonId,
        completedAt: new Date(),
      });
    }

    const totalLessons = await Lesson.countDocuments({ courseId });

    const completedCount = progress.completedLessons.length;
    progress.progressPercentage = Math.round(
      (completedCount / totalLessons) * 100
    );

    progress.lastAccessedAt = new Date();

    const currentLesson = await Lesson.findById(lessonId);
    const nextLesson = await Lesson.findOne({
      courseId,
      order: { $gt: currentLesson.order },
    }).sort({ order: 1 });

    if (nextLesson) {
      progress.currentLesson = nextLesson._id;
    }

    if (completedCount === totalLessons && !progress.isCompleted) {
      progress.isCompleted = true;
      progress.completedAt = new Date();

      // // Generate certificate
      // const certificateId = `CERT-${Date.now()}-${userId.toString().slice(-6)}`;
      // await Certificate.create({
      //   userId,
      //   courseId,
      //   certificateId,
      //   issuedAt: new Date(),
      // });

      // progress.certificateIssued = true;
    }

    await progress.save();

    return NextResponse.json({
      success: true,
      message: "Progress updated successfully",
      data: progress,
    });
  } catch (error) {
    console.error("Update progress error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update progress",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
