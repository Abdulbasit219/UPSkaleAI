import connectDB from "@/lib/connectDB";
import JobApplication from "@/models/JobApplication";
import Job from "@/models/Job";
import { jobApplicationSchema } from "@/schemas/jobSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// POST /api/jobs/apply - Submit job application
export async function POST(request) {
  await connectDB();

  try {
    // Get authenticated user
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "You must be logged in to apply for jobs",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate request body
    const result = jobApplicationSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.format();
      return Response.json(
        {
          success: false,
          message: "Invalid application data",
          errors,
        },
        { status: 400 }
      );
    }

    const { jobId, coverLetter, resume, answers, notes } = result.data;

    // Check if job exists and is active
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

    if (job.status !== "active") {
      return Response.json(
        {
          success: false,
          message: "This job is no longer accepting applications",
        },
        { status: 400 }
      );
    }

    // Get user ID from session 
    const userId = session.user.id || session.user._id || session.user.sub;
    
    // Check if user already applied
    const existingApplication = await JobApplication.findOne({
      job: jobId,
      user: userId,
    });

    if (existingApplication) {
      return Response.json(
        {
          success: false,
          message: "You have already applied for this job",
        },
        { status: 400 }
      );
    }

    // Create application
    const application = await JobApplication.create({
      job: jobId,
      user: userId,
      coverLetter,
      resume,
      answers,
      notes,
    });

    // Increment applicants count
    await Job.findByIdAndUpdate(jobId, {
      $inc: { applicants: 1 },
    });

    return Response.json(
      {
        success: true,
        message: "Application submitted successfully",
        data: application,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting application:", error);
    
    // Handle duplicate application error
    if (error.code === 11000) {
      return Response.json(
        {
          success: false,
          message: "You have already applied for this job",
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: false,
        message: "Error submitting application",
      },
      { status: 500 }
    );
  }
}
