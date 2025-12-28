import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import {
  calculateRecommendations,
  extractUserPreferences,
} from "@/lib/recommendationHelper";
import UserProgress from "@/models/learning/UserProgress";
import UserProfile from "@/models/UserProfile";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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

    const userId = session.user._id;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "6");

    const enrolledCourses = await UserProgress.find({ userId }).populate(
      "courseId",
      "category tags difficulty title"
    );

    const profile = await UserProfile.findOne({ userId });

    const userPreferences = extractUserPreferences(enrolledCourses, profile);

    const recommendations = await calculateRecommendations(
      userId,
      userPreferences,
      limit
    );

    return NextResponse.json({
      success: true,
      courses: recommendations,
    });
  } catch (error) {
    console.error("Recommendation Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
