import connectDB from "@/lib/connectDB";
import Job from "@/models/Job";

// GET /api/jobs/[id] - Get single job details
export async function GET(request, { params }) {
  await connectDB();

  try {
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

    const jobDoc = await Job.findById(id).select("-__v").lean();

    if (!jobDoc) {
      return Response.json(
        {
          success: false,
          message: "Job not found",
        },
        { status: 404 },
      );
    }
    return Response.json({
      success: true,
      data: {
        id: jobDoc._id,
        title: jobDoc.title,
        company: jobDoc.company,
        skills: jobDoc.skills,
        description: jobDoc.description,
        requirements: jobDoc.requirements,
      },
    });
  } catch (error) {
    console.error("Error in Interview Job API:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
