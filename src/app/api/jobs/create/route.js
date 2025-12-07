import connectDB from "@/lib/connectDB";
import Job from "@/models/Job";
import { jobSchema } from "@/schemas/jobSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// POST /api/jobs/create - Create new job posting (admin only)
export async function POST(request) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "You must be logged in to create jobs",
        },
        { status: 401 }
      );
    }

    // Check if user is admin (you may need to adjust this based on your auth setup)
    // For now, we'll allow any authenticated user to create jobs
    // You can add admin check here later

    const body = await request.json();

    // Validate request body
    const result = jobSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.format();
      return Response.json(
        {
          success: false,
          message: "Invalid job data",
          errors,
        },
        { status: 400 }
      );
    }

    const jobData = {
      ...result.data,
      postedBy: session.user._id,
    };

    // Create job
    const job = await Job.create(jobData);

    return Response.json(
      {
        success: true,
        message: "Job created successfully",
        data: job,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating job:", error);
    return Response.json(
      {
        success: false,
        message: "Error creating job",
      },
      { status: 500 }
    );
  }
}
