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
        skill: updatedProfile.skills[updatedProfile.skills.length - 1],
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

export async function PUT(req) {
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
    const { skillId, skillName, level, lastPracticed, progress } =
      await req.json();

    if (!skillId) {
      return NextResponse.json(
        { success: false, message: "Skill ID is required" },
        { status: 400 }
      );
    }

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId: userId, "skills._id": skillId },
      {
        $set: {
          "skills.$.skillName": skillName,
          "skills.$.level": level,
          "skills.$.lastPracticed": lastPracticed,
          "skills.$.progress": progress,
        },
        $push: {
          recentActivity: {
            action: `Updated skill: ${skillName}`,
            icon: "Edit",
            color: "text-blue-400",
            timestamp: new Date(),
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return NextResponse.json(
        { success: false, message: "Skill not found" },
        { status: 404 }
      );
    }

    const updatedSkill = updatedProfile.skills.find(
      (skill) => skill._id.toString() === skillId
    );

    return NextResponse.json(
      {
        success: true,
        message: "Skill updated successfully",
        skill: updatedSkill,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating skill:", error);
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

export async function DELETE(req) {
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
    const { skillId, skillName } = await req.json();

    if (!skillId) {
      return NextResponse.json(
        { success: false, message: "Skill ID is required" },
        { status: 400 }
      );
    }

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId: userId },
      {
        $pull: { skills: { _id: skillId } },
        $push: {
          recentActivity: {
            action: `Deleted skill: ${skillName}`,
            icon: "Trash",
            color: "text-red-400",
            timestamp: new Date(),
          },
        },
      },
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
        message: "Skill deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting skill:", error);
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
