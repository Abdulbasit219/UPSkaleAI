import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Course from "@/models/learning/Course";
import AuthUser from "@/models/AuthUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// get all courses
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty");
    const search = searchParams.get("search");
    const isPublished = searchParams.get("isPublished");

    let query = {};

    if (category) {
      query.category = category;
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (isPublished !== null && isPublished !== undefined) {
      query.isPublished = isPublished === "true";
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const courses = await Course.find(query)
      .populate("author", "username email name")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error("Get courses error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch courses",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// create single course
export async function POST(request) {
  try {
    await connectDB();

    // Get session (optional - uncomment if you want authentication)
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json(
    //     { success: false, message: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }

    const body = await request.json();
    
    const {
      title,
      description,
      category,
      difficulty,
      // thumbnail,
      tags,
      estimatedTime,
      prerequisites,
      isPublished,
      author,
    } = body;

    if (!title || !description || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, description, and category are required",
        },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    console.log(slug)

    const existingCourse = await Course.findOne({ slug });
    if (existingCourse) {
      return NextResponse.json(
        {
          success: false,
          message: "Course with this title already exists",
        },
        { status: 400 }
      );
    }

    const course = await Course.create({
      title,
      slug,
      description,
      category,
      difficulty: difficulty || "Beginner",
      // thumbnail: thumbnail || "",
      tags: tags || [],
      estimatedTime: estimatedTime || "2 hours",
      prerequisites: prerequisites || [],
      isPublished: isPublished || false,
      author: author, // Session se user id lo: session.user._id
    });

    await course.populate("author", "username email name");

    return NextResponse.json(
      {
        success: true,
        message: "Course created successfully",
        data: course,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create course error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create course",
        error: error.message,
      },
      { status: 500 }
    );
  }
}