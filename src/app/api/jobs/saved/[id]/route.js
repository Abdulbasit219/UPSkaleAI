import connectDB from "@/lib/connectDB";
import SavedJob from "@/models/SavedJob";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// DELETE /api/jobs/saved/[id] - Remove saved job
export async function DELETE(request, { params }) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "You must be logged in to remove saved jobs",
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

    // Find and delete saved job
    const savedJob = await SavedJob.findOneAndDelete({
      job: id,
      user: session.user.id,
    });

    if (!savedJob) {
      return Response.json(
        {
          success: false,
          message: "Saved job not found",
        },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Job removed from saved list",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error removing saved job:", error);
    return Response.json(
      {
        success: false,
        message: "Error removing saved job",
      },
      { status: 500 },
    );
  }
}
