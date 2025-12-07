import connectDB from "@/lib/connectDB";
import JobApplication from "@/models/JobApplication";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// GET /api/jobs/applications - Get user's job applications
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

    // Get user ID from session (try different possible fields)
    const userId = session.user.id || session.user._id || session.user.sub;
    
    console.log("Fetching applications for user:", userId);

    // Build filter
    const filter = { user: userId };
    
    if (status && status !== "all") {
      filter.status = status;
    }

    const applications = await JobApplication.find(filter)
      .populate("job")
      .populate("user")
      .sort({ createdAt: -1 })
      .lean();

    return Response.json(
      {
        success: true,
        data: applications,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching applications:", error);
    return Response.json(
      {
        success: false,
        message: "Error fetching applications",
      },
      { status: 500 }
    );
  }
}
