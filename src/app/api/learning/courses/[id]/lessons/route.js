import connectDB from "@/lib/connectDB";
import Course from "@/models/learning/Course";
import Lesson from "@/models/learning/Lesson";
import { NextResponse } from "next/server";

// get all chap wise lessons
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const course = await Course.findById(id);
    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    const lessons = await Lesson.find({ courseId: id })
      .sort({ order: 1 });
      // .populate("quiz");

    return NextResponse.json({
      success: true,
      count: lessons.length,
      data: lessons,
    });
  } catch (error) {
    console.error("Get lessons error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch lessons",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// post Chap (lesson) wise content 
export async function POST(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const course = await Course.findById(id);
    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    const { title, content, order, duration, codeExamples, resources } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: "Title and content are required" },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    let lessonOrder = order;
    if (!lessonOrder) {
      const lastLesson = await Lesson.findOne({ courseId: id }).sort({
        order: -1,
      });
      lessonOrder = lastLesson ? lastLesson.order + 1 : 1;
    }

    const lesson = await Lesson.create({
      courseId: id,
      title,
      slug,
      content,
      order: lessonOrder,
      duration: duration || "10 min",
      codeExamples: codeExamples || [],
      resources: resources || [],
    });

    return NextResponse.json(
      {
        success: true,
        message: "Lesson created successfully",
        data: lesson,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create lesson error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create lesson",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
