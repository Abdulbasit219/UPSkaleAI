import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import UserProfile from "@/models/UserProfile";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { title, company, location, startDate, endDate, current, description } = await req.json();

    if (!title || !company || !startDate) {
      return NextResponse.json(
        { error: "Title, company, and start date are required" },
        { status: 400 }
      );
    }

    const profile = await UserProfile.findOne({ userId: session.user._id });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const newExperience = {
      title,
      company,
      location: location || "",
      startDate,
      endDate: current ? "" : endDate,
      current: current || false,
      description: description || "",
    };

    profile.experience.push(newExperience);
    await profile.save();

    return NextResponse.json({
      success: true,
      experience: profile.experience[profile.experience.length - 1],
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add experience" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { experienceId, title, company, location, startDate, endDate, current, description } = await req.json();

    if (!experienceId) {
      return NextResponse.json({ error: "Experience ID is required" }, { status: 400 });
    }

    const profile = await UserProfile.findOne({ userId: session.user._id });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const expIndex = profile.experience.findIndex((exp) => exp._id.toString() === experienceId);
    if (expIndex === -1) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }

    if (title) profile.experience[expIndex].title = title;
    if (company) profile.experience[expIndex].company = company;
    if (location !== undefined) profile.experience[expIndex].location = location;
    if (startDate) profile.experience[expIndex].startDate = startDate;
    if (current !== undefined) {
      profile.experience[expIndex].current = current;
      if (current) profile.experience[expIndex].endDate = "";
    }
    if (endDate !== undefined && !current) profile.experience[expIndex].endDate = endDate;
    if (description !== undefined) profile.experience[expIndex].description = description;

    await profile.save();

    return NextResponse.json({
      success: true,
      experience: profile.experience[expIndex],
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { experienceId } = await req.json();

    if (!experienceId) {
      return NextResponse.json({ error: "Experience ID is required" }, { status: 400 });
    }

    const profile = await UserProfile.findOne({ userId: session.user._id });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    profile.experience = profile.experience.filter((exp) => exp._id.toString() !== experienceId);
    await profile.save();

    return NextResponse.json({ success: true, message: "Experience deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}