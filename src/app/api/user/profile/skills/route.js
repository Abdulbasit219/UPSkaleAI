import { NextResponse } from "next/server";
import UserProfile from "@/models/UserProfile";
import connectDB from "@/lib/connectDB";

export async function POST(req) {
  try {
    await connectDB();

    const { userId, skillName, level, lastPracticed } = await req.json();

    console.log(userId, skillName, level, lastPracticed)

    if (!userId || !skillName) {
      return NextResponse.json(
        { success: false, message: "userId and skill name are required" },
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
      { $push: { skills: newSkill } },
      { new: true }
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
