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
        { status: 400 }
      );
    }

    const { search, category, type, remote, featured, page, limit, sortBy } = result.data;

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

      return {
        ...job,
        id: job._id.toString(),
        match: Math.floor(Math.random() * 20) + 80, // Mock match score for now
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
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return Response.json(
      {
        success: false,
        message: "Error fetching jobs",
      },
      { status: 500 }
    );
  }
}
