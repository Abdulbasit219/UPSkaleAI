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

    // Calculate posted time
    const created = new Date(jobDoc.createdAt);
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

    // Transform job data to match frontend expectations
    const job = {
      ...jobDoc,
      id: jobDoc._id.toString(),
      match: Math.floor(Math.random() * 20) + 80, // Mock match score
      posted,
      views: Math.floor(Math.random() * 500) + 50, // Mock views
      hiringProcess: [
        "Initial screening call (30 mins)",
        "Technical interview (60 mins)",
        "Take-home assignment",
        "On-site interview (3 hours)",
        "Final decision within 48 hours",
      ],
      companyInfo: {
        name: jobDoc.company,
        description:
          "We're a fast-growing tech company building the future of digital experiences.",
        size: "50-200 employees",
        founded: "2015",
        industry: jobDoc.category || "Technology",
        website: jobDoc.companyWebsite || "#",
        culture: "Innovative, Collaborative, Fast-paced",
      },
    };

    return Response.json(
      {
        success: true,
        data: job,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching job:", error);
    return Response.json(
      {
        success: false,
        message: "Error fetching job details",
      },
      { status: 500 },
    );
  }
}
