import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import UserProgress from "@/models/learning/UserProgress";
import Lesson from "@/models/learning/Lesson";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const userId = session?.user?._id;

    const learningPath = await UserProgress.find({
      userId,
      isCompleted: false,
      progressPercentage: { $gt: 0 },
    })
      .populate({
        path: "courseId",
        select: "title category difficulty",
      })
      .populate({
        path: "currentLesson",
        select: "title",
      })
      .sort({ lastAccessedAt: -1 })
      .limit(5);

    const formattedPath = learningPath.map((progress) => ({
      _id: progress._id,
      courseName: progress.courseId?.title,
      courseId: progress.courseId?._id,
      progress: Math.round(progress.progressPercentage),
      status:
        progress.progressPercentage < 30
          ? "Started"
          : progress.progressPercentage < 80
            ? "In Progress"
            : "Almost Done",
      currentLesson: progress.currentLesson?.title,
      lastAccessed: progress.lastAccessedAt,
      enrolledAt: progress.enrolledAt,
    }));

    return NextResponse.json({ success: true, data: formattedPath });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
