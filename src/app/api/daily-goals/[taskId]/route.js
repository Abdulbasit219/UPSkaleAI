import connectDB from "@/lib/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import DailyGoal from "@/models/DailyGoal";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { taskId } = await params;

    // find today's goal
    const today = new Date().toISOString().split("T")[0];

    const dailyGoal = await DailyGoal.findOne({
      userId: session.user._id,
      date: today,
      "tasks._id": taskId,
    });

    if (!dailyGoal) {
      return NextResponse.json(
        { success: false, message: "Task not found" },
        { status: 404 }
      );
    }

    // toggle completed
    const task = dailyGoal.tasks.id(taskId);
    task.completed = !task.completed;

    await dailyGoal.save();

    return NextResponse.json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    console.error("Toggle Task Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
