import connectDB from "@/lib/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import DailyGoal from "@/models/DailyGoal";
import UserProfile from "@/models/UserProfile";
import { generateTasksFromSkills } from "@/utils/generateTasksFromSkills";

export async function GET() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const userId = session.user._id;
    const today = new Date().toISOString().split("T")[0];

    let dailyGoal = await DailyGoal.findOne({ userId, date: today });

    // 🔥 If not exist → create
    if (!dailyGoal) {
      const profile = await UserProfile.findOne({ userId });

      let tasks = [];

      if (profile?.skills?.length) {
        tasks = generateTasksFromSkills(profile.skills);
      }

      dailyGoal = await DailyGoal.create({
        userId,
        date: today,
        tasks,
      });
    }

    return NextResponse.json({
      success: true,
      data: dailyGoal,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to load daily goals" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const { title, time, priority } = await req.json();
    const userId = session.user._id;
    const today = new Date().toISOString().split("T")[0];

    const dailyGoal = await DailyGoal.findOneAndUpdate(
      { userId, date: today },
      {
        $push: {
          tasks: {
            title,
            time,
            priority,
            source: "user",
          },
        },
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, data: dailyGoal });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
