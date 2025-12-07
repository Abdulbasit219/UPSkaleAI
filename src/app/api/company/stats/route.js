import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import Job from "@/models/Job";
import JobApplication from "@/models/JobApplication";

export async function GET() {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "Company") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const companyId = session.user._id;

    // Get all jobs posted by this company
    const totalJobs = await Job.countDocuments({ postedBy: companyId });
    const activeJobs = await Job.countDocuments({
      postedBy: companyId,
      status: "active",
    });

    // Get all applications for this company's jobs
    const companyJobs = await Job.find({ postedBy: companyId }).select("_id");
    const jobIds = companyJobs.map((job) => job._id);

    const totalApplications = await JobApplication.countDocuments({
      job: { $in: jobIds },
    });

    // Get applications from this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const applicationsThisWeek = await JobApplication.countDocuments({
      job: { $in: jobIds },
      createdAt: { $gte: oneWeekAgo },
    });

    // Get interviews scheduled (applications with status "interview")
    const interviewsScheduled = await JobApplication.countDocuments({
      job: { $in: jobIds },
      status: "interview",
    });

    // Get hired this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const hiredThisMonth = await JobApplication.countDocuments({
      job: { $in: jobIds },
      status: "hired",
      updatedAt: { $gte: startOfMonth },
    });

    return NextResponse.json({
      activeJobs,
      totalApplications,
      applicationsThisWeek,
      interviewsScheduled,
      hiredThisMonth,
      totalJobs,
    });
  } catch (error) {
    console.error("Error fetching company stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
