import connectDB from "@/lib/connectDB";
import Job from "@/models/Job";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// GET /api/company/jobs - Get all jobs posted by the company
export async function GET(request) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "You must be logged in to view your jobs",
        },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // active, closed, draft, all

    // Get user ID from session (company user)
    const userId = session.user._id || session.user.id || session.user.sub;
    
    console.log("Fetching jobs for company user:", userId);

    // Build filter for jobs posted by this company
    const filter = { postedBy: userId };
    
    if (status && status !== "all") {
      filter.status = status;
    }

    // Fetch jobs posted by this company
    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    console.log("Found jobs posted by company:", jobs.length);

    // Transform jobs to include additional computed fields
    const transformedJobs = jobs.map((job) => {
      const created = new Date(job.createdAt);
      const now = new Date();
      const diffMs = now - created;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      let posted;
      if (diffDays > 0) {
        posted = diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
      } else if (diffHours > 0) {
        posted = diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
      } else {
        posted = "Just now";
      }

      return {
        ...job,
        id: job._id.toString(),
        posted,
      };
    });

    return Response.json(
      {
        success: true,
        data: transformedJobs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching company jobs:", error);
    return Response.json(
      {
        success: false,
        message: "Error fetching jobs",
      },
      { status: 500 }
    );
  }
}
