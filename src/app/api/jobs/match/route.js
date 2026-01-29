import connectDB from "@/lib/connectDB";
import Job from "@/models/Job";
import UserProfile from "@/models/UserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";

const RECOMMENDER_SERVICE_URL =
  process.env.RECOMMENDER_SERVICE_URL || "http://127.0.0.1:8000/jobs/recommend";

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
        { status: 401 },
      );
    }

    // 1. Fetch User Profile for context
    const mongoose = (await import("mongoose")).default;
    const userId = session.user._id || session.user.id;
    const profile = await UserProfile.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (!profile) {
      return Response.json(
        {
          success: false,
          message: "Please complete your profile to enable AI matching",
        },
        { status: 404 },
      );
    }

    const userSkills = profile.skills?.map((s) => s.skillName) || [];
    const userBio = profile.bio || "";

    // 2. Fetch Active Jobs
    const jobs = await Job.find({ status: "active" }).limit(50).lean();

    if (jobs.length === 0) {
      return Response.json({
        success: true,
        data: [],
        message: "No active jobs found",
      });
    }

    // 3. Call Python Recommender Service
    try {
      const response = await axios.post(
        RECOMMENDER_SERVICE_URL,
        {
          user_skills: userSkills,
          user_bio: userBio,
          jobs: jobs.map((j) => ({
            id: j._id.toString(),
            title: j.title,
            skills: j.skills || [],
            description: j.description || "",
          })),
        },
        { timeout: 5000 },
      );

      if (response.data.success) {
        const recommendations = response.data.recommendations;

        // Map scores back to original job objects
        const jobsWithScores = recommendations.map((rec) => {
          const originalJob = jobs.find((j) => j._id.toString() === rec.job_id);
          return {
            ...originalJob,
            matchScore: Math.round(rec.score * 100),
            semanticDepth: rec.semantic_depth,
            keywordMatch: rec.keyword_match,
            matchedSkills: rec.matched_skills,
            matchReasons: [
              rec.semantic_depth > 0.7
                ? "Strong semantic alignment with your experience"
                : "Good conceptual match",
              rec.keyword_match > 0.5
                ? "Direct skill overlap detected"
                : "Broadly fits your skill set",
              `Matches your interest in ${rec.matched_skills.slice(0, 2).join(", ") || "this field"}`,
            ],
          };
        });

        return Response.json({
          success: true,
          data: jobsWithScores,
          message: "Jobs matched using UpSkale AI Semantic Intelligence",
          engine: response.data.engine,
        });
      }
    } catch (apiError) {
      console.warn(
        "Recommender Service Connection Failed. Falling back to simple matching.",
        apiError.message,
      );

      // Fallback: Simple keyword overlap matching if Python service is down
      const fallbackJobs = jobs
        .map((job) => {
          const overlap = (job.skills || []).filter((s) =>
            userSkills.some((us) => us.toLowerCase() === s.toLowerCase()),
          );
          const score =
            userSkills.length > 0
              ? (overlap.length / userSkills.length) * 100
              : 0;

          return {
            ...job,
            matchScore: Math.min(Math.round(score + 60), 95),
            matchReasons: ["Falling back to keyword matching"],
            matchedSkills: overlap,
          };
        })
        .sort((a, b) => b.matchScore - a.matchScore);

      return Response.json({
        success: true,
        data: fallbackJobs,
        message: "Showing basic matches (Recommender Service offline)",
      });
    }
  } catch (error) {
    console.error("Critical error in Job Matching API:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
