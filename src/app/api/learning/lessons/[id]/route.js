import connectDB from "@/lib/connectDB";
import Lesson from "@/models/learning/Lesson";
import { NextResponse } from "next/server";

// get single lesson
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const lesson = await Lesson.findById(id).populate("courseId", "title slug");
    //   .populate("quiz");

    if (!lesson) {
      return NextResponse.json(
        { success: false, message: "Lesson not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    console.error("Get lesson error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch lesson",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// update single lesson
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

    const lesson = await Lesson.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!lesson) {
      return NextResponse.json(
        { success: false, message: "Lesson not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lesson updated successfully",
      data: lesson,
    });
  } catch (error) {
    console.error("Update lesson error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update lesson",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// delete single lesson
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const lesson = await Lesson.findByIdAndDelete(id);

    if (!lesson) {
      return NextResponse.json(
        { success: false, message: "Lesson not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    console.error("Delete lesson error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete lesson",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
