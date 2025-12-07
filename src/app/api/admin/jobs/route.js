import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Job from "@/models/Job";
import JobApplication from "@/models/JobApplication";

export async function GET() {
  await connectDB();

  try {
    // Fetch all jobs with company information
    const jobs = await Job.find()
      .populate("postedBy", "companyName name email")
      .sort({ createdAt: -1 });

    // Get application counts for each job
    const jobsWithStats = await Promise.all(
      jobs.map(async (job) => {
        const applicationsCount = await JobApplication.countDocuments({
          job: job._id,
        });

        return {
          id: job._id,
          title: job.title,
          company: job.company,
          companyLogo: job.logo || "💼",
          location: job.location,
          type: job.type,
          salary: job.salary,
          postedDate: job.createdAt.toISOString().split("T")[0],
          status: job.status,
          featured: job.featured,
          applications: applicationsCount,
          views: 0, // TODO: Implement view tracking
          category: job.category,
          description: job.description,
          experience: job.experience,
          skills: job.skills,
          requirements: job.requirements,
          responsibilities: job.responsibilities,
          postedBy: job.postedBy,
        };
      })
    );

    return NextResponse.json(jobsWithStats);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
