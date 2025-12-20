import connectDB from "@/lib/connectDB";
import Course from "@/models/learning/Course";
import Lesson from "@/models/learning/Lesson";
import { NextResponse } from "next/server";
import AuthUser from "@/models/AuthUser";
import UserProgress from "@/models/learning/UserProgress";

// get single course
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const course = await Course.findById(id).populate(
      "author",
      "username email name"
    );

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    const lessonCount = await Lesson.countDocuments({ courseId: id });

    return NextResponse.json({
      success: true,
      data: {
        ...course.toObject(),
        lessonCount,
      },
    });
  } catch (error) {
    console.error("Get course error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch course",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// update course 
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    if (body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const course = await Course.findByIdAndUpdate(id, body, {
      new: true,
    }).populate("author", "username email name");

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    console.error("Update course error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update course",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

//delete single course
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    await Lesson.deleteMany({ courseId: id });

    await UserProgress.deleteMany({ courseId: id });

    return NextResponse.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete course",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
