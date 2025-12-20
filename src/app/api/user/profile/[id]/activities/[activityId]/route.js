import connectDB from "@/lib/connectDB";
import UserProfile from "@/models/UserProfile";
import { NextResponse } from "next/server";

export async function DELETE(request, context) {
  try {
    await connectDB();
    const params = await context.params;
    const { id, activityId } = params;

    if (!id || !activityId) {
      return NextResponse.json(
        { message: "User ID or Activity ID missing" },
        { status: 400 }
      );
    }

    const profile = await UserProfile.findOne({ userId: id });

    if (!profile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    profile.recentActivity = profile.recentActivity.filter(
      (activity) => activity._id.toString() !== activityId
    );

    await profile.save();

    return NextResponse.json(
      { success: true, message: "Activity deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Delete Activity Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error while deleting activity" },
      { status: 500 }
    );
  }
}
