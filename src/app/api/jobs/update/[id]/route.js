import connectDB from "@/lib/connectDB";
import Job from "@/models/Job";
import { jobSchema } from "@/schemas/jobSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// PUT /api/jobs/update/[id] - Update job posting
export async function PUT(request, { params }) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "You must be logged in to update jobs",
        },
        { status: 401 },
      );
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return Response.json(
        {
          success: false,
          message: "Job ID is required",
        },
        { status: 400 },
      );
    }

    // Check if job exists and user is the owner
    const existingJob = await Job.findById(id);

    if (!existingJob) {
      return Response.json(
        {
          success: false,
          message: "Job not found",
        },
        { status: 404 },
      );
    }

    // Check ownership (or admin rights)
    if (existingJob.postedBy.toString() !== session.user.id) {
      return Response.json(
        {
          success: false,
          message: "You don't have permission to update this job",
        },
        { status: 403 },
      );
    }

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
        { status: 400 },
      );
    }

    // Update job
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { ...result.data },
      { new: true, runValidators: true },
    );

    return Response.json(
      {
        success: true,
        message: "Job updated successfully",
        data: updatedJob,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating job:", error);
    return Response.json(
      {
        success: false,
        message: "Error updating job",
      },
      { status: 500 },
    );
  }
}

// DELETE /api/jobs/update/[id] - Delete job posting
export async function DELETE(request, { params }) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "You must be logged in to delete jobs",
        },
        { status: 401 },
      );
    }

    const resolvedParams = await params; // ✅ the promise first
    const { id } = resolvedParams;

    if (!id) {
      return Response.json(
        {
          success: false,
          message: "Job ID is required",
        },
        { status: 400 },
      );
    }

    // Check if job exists and user is the owner
    const existingJob = await Job.findById(id);

    if (!existingJob) {
      return Response.json(
        {
          success: false,
          message: "Job not found",
        },
        { status: 404 },
      );
    }

    // Check ownership (or admin rights)
    if (existingJob.postedBy.toString() !== session.user.id) {
      return Response.json(
        {
          success: false,
          message: "You don't have permission to delete this job",
        },
        { status: 403 },
      );
    }

    // Delete job
    await Job.findByIdAndDelete(id);

    return Response.json(
      {
        success: true,
        message: "Job deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting job:", error);
    return Response.json(
      {
        success: false,
        message: "Error deleting job",
      },
      { status: 500 },
    );
  }
}
