import { NextResponse } from "next/server";
import UserProfile from "@/models/UserProfile";
import connectDB from "@/lib/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?._id) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const userId = session.user._id;
    const { skillName, level, lastPracticed } = await req.json();

    if (!skillName) {
      return NextResponse.json(
        { success: false, message: "Skill name is required" },
        { status: 400 }
      );
    }

    const newSkill = {
      skillName,
      level: level || "Beginner",
      lastPracticed: lastPracticed || null,
    };

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId: userId },
      {
        $push: {
          skills: newSkill,
          recentActivity: {
            action: `Added a new skill: ${skillName}`,
            icon: "Star",
            color: "text-yellow-400",
            timestamp: new Date(),
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return NextResponse.json(
        { success: false, message: "User profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Skill added successfully",
        data: updatedProfile.skills,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding skill:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
