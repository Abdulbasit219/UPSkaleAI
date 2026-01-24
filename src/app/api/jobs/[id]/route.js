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

    // 6. Calculate Real Match Score via AI
    const { authOptions } = await import(
      "@/app/api/auth/[...nextauth]/options"
    );
    const { getServerSession } = await import("next-auth");
    const session = await getServerSession(authOptions);
    let matchScore = 0;

    if (session?.user) {
      try {
        const UserProfile = (await import("@/models/UserProfile")).default;
        const axios = (await import("axios")).default;
        const mongoose = (await import("mongoose")).default;

        const userId = session.user._id || session.user.id;
        const profile = await UserProfile.findOne({
          userId: new mongoose.Types.ObjectId(userId),
        });

        if (profile) {
          const userSkills = profile.skills?.map((s) => s.skillName) || [];
          const RECOMMENDER_SERVICE_URL =
            process.env.RECOMMENDER_SERVICE_URL ||
            "http://127.0.0.1:8000/jobs/recommend";

          const aiResponse = await axios.post(
            RECOMMENDER_SERVICE_URL,
            {
              user_skills: userSkills,
              user_bio: profile.bio || "",
              jobs: [
                {
                  id: jobDoc._id.toString(),
                  title: jobDoc.title,
                  skills: jobDoc.skills || [],
                  description: jobDoc.description || "",
                },
              ],
            },
            { timeout: 3000 },
          );

          if (
            aiResponse.data.success &&
            aiResponse.data.recommendations.length > 0
          ) {
            matchScore = Math.round(
              aiResponse.data.recommendations[0].score * 100,
            );
          }
        }
      } catch (err) {
        console.warn(
          "Single Job API: Match Service Unavailable or Profile missing. Using fallback.",
        );
        // Fallback: Simple keyword overlap
        const profile = await (
          await import("@/models/UserProfile")
        ).default.findOne({
          userId: session.user._id || session.user.id,
        });
        if (profile) {
          const userSkills =
            profile.skills?.map((s) => s.skillName.toLowerCase()) || [];
          const jobSkills = jobDoc.skills?.map((s) => s.toLowerCase()) || [];
          const overlap = jobSkills.filter((s) => userSkills.includes(s));
          matchScore =
            jobSkills.length > 0
              ? Math.round((overlap.length / jobSkills.length) * 100)
              : 0;
        }
      }
    }

    // Transform job data to match frontend expectations
    const job = {
      ...jobDoc,
      id: jobDoc._id.toString(),
      match: matchScore,
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
