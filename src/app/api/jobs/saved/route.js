import connectDB from "@/lib/connectDB";
import SavedJob from "@/models/SavedJob";
import Job from "@/models/Job";
import { savedJobSchema } from "@/schemas/jobSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// GET /api/jobs/saved - Get user's saved jobs
export async function GET(request) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "You must be logged in to view saved jobs",
        },
        { status: 401 }
      );
    }

    const savedJobs = await SavedJob.find({ user: session.user.id })
      .populate("job")
      .sort({ createdAt: -1 })
      .lean();

    return Response.json(
      {
        success: true,
        data: savedJobs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    return Response.json(
      {
        success: false,
        message: "Error fetching saved jobs",
      },
      { status: 500 }
    );
  }
}

// POST /api/jobs/saved - Save/bookmark a job
export async function POST(request) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "You must be logged in to save jobs",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate request body
    const result = savedJobSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.format();
      return Response.json(
        {
          success: false,
          message: "Invalid data",
          errors,
        },
        { status: 400 }
      );
    }

    const { jobId, notes } = result.data;

    // Check if job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return Response.json(
        {
          success: false,
          message: "Job not found",
        },
        { status: 404 }
      );
    }

    // Check if already saved
    const existingSavedJob = await SavedJob.findOne({
      job: jobId,
      user: session.user.id,
    });

    if (existingSavedJob) {
      return Response.json(
        {
          success: false,
          message: "Job already saved",
        },
        { status: 400 }
      );
    }

    // Save job
    const savedJob = await SavedJob.create({
      job: jobId,
      user: session.user.id,
      notes,
    });

    return Response.json(
      {
        success: true,
        message: "Job saved successfully",
        data: savedJob,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving job:", error);

    if (error.code === 11000) {
      return Response.json(
        {
          success: false,
          message: "Job already saved",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: false,
        message: "Error saving job",
      },
      { status: 500 }
    );
  }
}
