import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import UserProfile from "@/models/UserProfile";

export async function GET(request, context) {
  try {
    await connectDB();

    const params = await context.params;
    const { id } = params;

    console.log(id);

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const profile = await UserProfile.findOne({ userId: id }).select(
      "recentActivity"
    );

    if (!profile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        recentActivity: profile.recentActivity,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get Recent Activities Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error while fetching activities",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    await connectDB();

    const params = await context.params;
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
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

    profile.recentActivity = [];
    await profile.save();

    return NextResponse.json(
      {
        success: true,
        message: "All activities deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete All Activities Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error while deleting activities",
      },
      { status: 500 }
    );
  }
}
