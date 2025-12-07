import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Job from "@/models/Job";

export async function GET() {
  await connectDB();

  try {
    const totalJobs = await Job.countDocuments();
    const activeJobs = await Job.countDocuments({ status: "active" });
    const pendingJobs = await Job.countDocuments({ status: "draft" });
    const featuredJobs = await Job.countDocuments({ featured: true });

    return NextResponse.json({
      totalJobs,
      activeJobs,
      pendingJobs,
      featuredJobs,
    });
  } catch (error) {
    console.error("Error fetching job stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
