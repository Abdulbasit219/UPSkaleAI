import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import UserCareerProgress from "@/models/UserCareerProgress";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { role_key, milestoneIndex, progress, completed } = await req.json();

    if (role_key === undefined || milestoneIndex === undefined) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    let upProgress = await UserCareerProgress.findOne({
      userId: session.user._id,
      role_key,
    });

    if (!upProgress) {
      upProgress = new UserCareerProgress({
        userId: session.user._id,
        role_key,
        milestonesProgress: [],
      });
    }

    upProgress.isActive = true;

    let milestones = upProgress.milestonesProgress || [];
    let existingIndex = milestones.findIndex(
      (m) => m.milestoneIndex === milestoneIndex,
    );

    if (existingIndex > -1) {
      milestones[existingIndex].progress =
        progress ?? milestones[existingIndex].progress;
      milestones[existingIndex].completed =
        completed ?? milestones[existingIndex].completed;
      milestones[existingIndex].lastAccessed = new Date();
    } else {
      milestones.push({
        milestoneIndex,
        progress: progress || 0,
        completed: completed || false,
        lastAccessed: new Date(),
      });
    }

    upProgress.milestonesProgress = milestones;
    await upProgress.save();

    return NextResponse.json({ success: true, progress: upProgress });
  } catch (error) {
    console.error("❌ PROGRESS UPDATE ERROR:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
