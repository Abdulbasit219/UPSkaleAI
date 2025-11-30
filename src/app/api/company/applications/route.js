import connectDB from "@/lib/connectDB";
import JobApplication from "@/models/JobApplication";
import Job from "@/models/Job";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// GET /api/company/applications - Get applications for jobs posted by the company
export async function GET(request) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "You must be logged in to view applications",
        },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    // Get user ID from session (company user)
    const userId = session.user.id || session.user._id || session.user.sub;
    
    console.log("Fetching applications for company user:", userId);

    // First, find all jobs posted by this company user
    const companyJobs = await Job.find({ postedBy: userId }).select("_id");
    const jobIds = companyJobs.map(job => job._id);

    console.log("Found jobs posted by company:", jobIds.length);

    if (jobIds.length === 0) {
      return Response.json(
        {
          success: true,
          data: [],
          message: "No jobs posted yet",
        },
        { status: 200 }
      );
    }

    // Build filter for applications to these jobs
    const filter = { job: { $in: jobIds } };
    
    if (status && status !== "all") {
      filter.status = status;
    }

    // Find all applications for the company's jobs
    const applications = await JobApplication.find(filter)
      .populate("job")
      .populate("user")
      .sort({ createdAt: -1 })
      .lean();

    console.log("Found applications:", applications.length);

    return Response.json(
      {
        success: true,
        data: applications,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching company applications:", error);
    return Response.json(
      {
        success: false,
        message: "Error fetching applications",
      },
      { status: 500 }
    );
  }
}
