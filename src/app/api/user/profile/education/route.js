import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import UserProfile from "@/models/UserProfile";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// POST - Add new education
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const educationData = await req.json();
    const { institution, degree, fieldOfStudy, startDate, endDate, current, grade, description } = educationData;

    if (!institution || !degree || !startDate) {
      return NextResponse.json(
        { error: "Institution, degree, and start date are required" },
        { status: 400 }
      );
    }

    const profile = await UserProfile.findOne({ userId: session.user._id });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const newEducation = {
      institution,
      degree,
      fieldOfStudy: fieldOfStudy || "",
      startDate,
      endDate: current ? "" : endDate || "",
      current: current || false,
      grade: grade || "",
      description: description || "",
      createdAt: new Date(),
    };

    profile.education.push(newEducation);
    await profile.save();

    const addedEducation = profile.education[profile.education.length - 1];

    return NextResponse.json({
      success: true,
      education: addedEducation,
    });
  } catch (error) {
    console.error("Error adding education:", error);
    return NextResponse.json(
      { error: "Failed to add education" },
      { status: 500 }
    );
  }
}

// PUT - Update existing education
export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const updateData = await req.json();
    const { educationId, institution, degree, fieldOfStudy, startDate, endDate, current, grade, description } = updateData;

    if (!educationId) {
      return NextResponse.json(
        { error: "Education ID is required" },
        { status: 400 }
      );
    }

    const profile = await UserProfile.findOne({ userId: session.user._id });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const educationIndex = profile.education.findIndex(
      (edu) => edu._id.toString() === educationId
    );

    if (educationIndex === -1) {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 }
      );
    }

    if (institution) profile.education[educationIndex].institution = institution;
    if (degree) profile.education[educationIndex].degree = degree;
    if (fieldOfStudy !== undefined) profile.education[educationIndex].fieldOfStudy = fieldOfStudy;
    if (startDate) profile.education[educationIndex].startDate = startDate;
    if (current !== undefined) {
      profile.education[educationIndex].current = current;
      if (current) {
        profile.education[educationIndex].endDate = "";
      }
    }
    if (endDate !== undefined && !current) profile.education[educationIndex].endDate = endDate;
    if (grade !== undefined) profile.education[educationIndex].grade = grade;
    if (description !== undefined) profile.education[educationIndex].description = description;

    await profile.save();

    return NextResponse.json({
      success: true,
      education: profile.education[educationIndex],
    });
  } catch (error) {
    console.error("Error updating education:", error);
    return NextResponse.json(
      { error: "Failed to update education" },
      { status: 500 }
    );
  }
}

// DELETE - Remove education
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { educationId } = await req.json();

    if (!educationId) {
      return NextResponse.json(
        { error: "Education ID is required" },
        { status: 400 }
      );
    }

    const profile = await UserProfile.findOne({ userId: session.user._id });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    profile.education = profile.education.filter(
      (edu) => edu._id.toString() !== educationId
    );

    await profile.save();

    return NextResponse.json({
      success: true,
      message: "Education deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting education:", error);
    return NextResponse.json(
      { error: "Failed to delete education" },
      { status: 500 }
    );
  }
}