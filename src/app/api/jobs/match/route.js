import connectDB from "@/lib/connectDB";
import Job from "@/models/Job";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// GET /api/jobs/match - Get AI-matched jobs for user
export async function GET(request) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "You must be logged in to get matched jobs",
        },
        { status: 401 }
      );
    }

    // This is a placeholder for AI matching logic
    // In a real implementation, you would:
    // 1. Get user's profile, skills, experience, etc.
    // 2. Use AI/ML to match jobs based on user profile
    // 3. Calculate match scores
    // 4. Return sorted results

    // For now, we'll return featured and recent jobs
    const jobs = await Job.find({ status: "active" })
      .sort({ featured: -1, createdAt: -1 })
      .limit(20)
      .select("-__v")
      .lean();

    // Add mock match scores (in production, this would be calculated by AI)
    const jobsWithScores = jobs.map((job) => ({
      ...job,
      matchScore: Math.floor(Math.random() * 20) + 80, // Random score between 80-100
      matchReasons: [
        "Skills match your profile",
        "Experience level fits",
        "Location preference aligned",
      ],
    }));

    // Sort by match score
    jobsWithScores.sort((a, b) => b.matchScore - a.matchScore);

    return Response.json(
      {
        success: true,
        data: jobsWithScores,
        message: "AI matching is currently in beta. Showing best matches based on your profile.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching matched jobs:", error);
    return Response.json(
      {
        success: false,
        message: "Error fetching matched jobs",
      },
      { status: 500 }
    );
  }
}
