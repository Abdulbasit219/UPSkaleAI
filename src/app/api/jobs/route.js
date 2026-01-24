import connectDB from "@/lib/connectDB";
import Job from "@/models/Job";
import SavedJob from "@/models/SavedJob";
import JobApplication from "@/models/JobApplication";
import { jobFilterSchema } from "@/schemas/jobSchema";
import { getServerSession } from "next-auth";

// GET /api/jobs - Fetch jobs with filtering and pagination
export async function GET(request) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);

    const queryParams = {
      search: searchParams.get("search") || undefined,
      category: searchParams.get("category") || undefined,
      type: searchParams.get("type") || undefined,
      remote: searchParams.get("remote") || undefined,
      featured: searchParams.get("featured") || undefined,
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "10",
      sortBy: searchParams.get("sortBy") || "recent",
    };

    // Validate query parameters
    const result = jobFilterSchema.safeParse(queryParams);

    if (!result.success) {
      const errors = result.error.format();
      return Response.json(
        {
          success: false,
          message: "Invalid query parameters",
          errors,
        },
        { status: 400 },
      );
    }

    const { search, category, type, remote, featured, page, limit, sortBy } =
      result.data;

    // Build filter query
    const filter = { status: "active" };

    if (search) {
      filter.$text = { $search: search };
    }

    if (category && category !== "all") {
      filter.category = category;
    }

    if (type) {
      filter.type = type;
    }

    if (remote === "true") {
      filter.remote = true;
    }

    if (featured === "true") {
      filter.featured = true;
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    let sort = {};
    switch (sortBy) {
      case "recent":
        sort = { createdAt: -1 };
        break;
      case "salary":
        sort = { salary: -1 };
        break;
      case "match":
        // This would require user profile matching logic
        sort = { featured: -1, createdAt: -1 };
        break;
      default:
        sort = { createdAt: -1 };
    }

    // Fetch jobs
    const jobsData = await Job.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .select("-__v")
      .lean();

    // 6. Calculate Match Scores (AI or Fallback)
    const { authOptions } = await import(
      "@/app/api/auth/[...nextauth]/options"
    );
    const session = await getServerSession(authOptions);
    let recommendations = [];
    let userSkills = [];

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
          userSkills = profile.skills?.map((s) => s.skillName) || [];
          const RECOMMENDER_SERVICE_URL =
            process.env.RECOMMENDER_SERVICE_URL ||
            "http://127.0.0.1:8000/jobs/recommend";

          const aiResponse = await axios.post(
            RECOMMENDER_SERVICE_URL,
            {
              user_skills: userSkills,
              user_bio: profile.bio || "",
              jobs: jobsData.map((j) => ({
                id: j._id.toString(),
                title: j.title,
                skills: j.skills || [],
                description: j.description || "",
              })),
            },
            { timeout: 3000 },
          );

          if (aiResponse.data.success) {
            recommendations = aiResponse.data.recommendations;
          }
        }
      } catch (err) {
        console.warn(
          "Global Jobs API: Match Service Unavailable or Profile missing. Using fallback.",
        );
      }
    }

    const jobs = jobsData.map((job) => {
      const created = new Date(job.createdAt);
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

      // 1. Check AI recommendations first
      const aiMatch = recommendations.find(
        (r) => r.job_id === job._id.toString(),
      );

      // 2. Fallback to keyword matching if AI isn't available
      let finalMatch = 0;
      if (aiMatch) {
        finalMatch = Math.round(aiMatch.score * 100);
      } else if (userSkills.length > 0 && job.skills?.length > 0) {
        // Simple Jaccard fallback
        const s1 = new Set(userSkills.map((s) => s.toLowerCase()));
        const s2 = new Set(job.skills.map((s) => s.toLowerCase()));
        const intersection = new Set([...s1].filter((x) => s2.has(x)));
        const union = new Set([...s1, ...s2]);
        finalMatch = Math.round((intersection.size / union.size) * 100);
      }

      return {
        ...job,
        id: job._id.toString(),
        match: finalMatch,
        posted,
      };
    });

    // Get total count for pagination
    const total = await Job.countDocuments(filter);

    return Response.json(
      {
        success: true,
        data: {
          jobs,
          pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            totalPages: Math.ceil(total / limitNum),
          },
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return Response.json(
      {
        success: false,
        message: "Error fetching jobs",
      },
      { status: 500 },
    );
  }
}
