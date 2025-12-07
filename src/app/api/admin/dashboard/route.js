import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import AuthUser from "@/models/AuthUser";
import Job from "@/models/Job";
import JobApplication from "@/models/JobApplication";

export async function GET() {
  await connectDB();

  try {
    // 1. Stats Cards Data
    const totalUsers = await AuthUser.countDocuments();
    const totalJobs = await Job.countDocuments();
    // Assuming companies are unique users who have posted at least one job
    const companies = await Job.distinct("postedBy");
    const activeCompanies = companies.length;

    // Pending approvals - assuming 'draft' or a specific status for now, or just recent jobs for demo if no approval flow exist
    // Based on page.jsx mock data, it has "Pending Approvals".
    // Let's assume we want to track jobs with 'draft' status as pending for now, or add a 'pending' status if needed.
    // However, Job model has status enum ["active", "closed", "draft"].
    // And page.jsx also shows "Company Registration" in pending approvals.
    // For now, let's just count 'draft' jobs as pending approvals to have some dynamic data.
    const pendingApprovalsCount = await Job.countDocuments({ status: "draft" });

    // 2. Charts Data

    // User Growth (Last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const userGrowth = await AuthUser.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Job Trends (Last 6 months)
    const jobTrends = await Job.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Format data for Recharts (mapping month numbers to names)
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Merge growth data - this is a simplified merging strategy
    // In a real app we might want to ensure all months are present even if count is 0
    const userGrowthData = userGrowth.map((item) => ({
      name: monthNames[item._id - 1],
      users: item.count,
      companies: 0, // Placeholder as we don't have company registration dates easily separate without role
    }));

    const jobTrendsData = jobTrends.map((item) => ({
      name: monthNames[item._id - 1],
      jobs: item.count,
    }));

    // 3. Recent Activity
    // Fetch recent 5 jobs
    const recentJobs = await Job.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("postedBy", "username");

    const recentActivity = recentJobs.map((job) => ({
      id: job._id,
      user: job.postedBy?.username || "Unknown",
      action: `Posted a job: ${job.title}`,
      time: job.createdAt, // We will format this on frontend
      status: "info",
    }));

    // 4. Pending Approvals list
    // Fetch recent draft jobs
    const pendingJobs = await Job.find({ status: "draft" })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("postedBy", "username");

    const pendingApprovals = pendingJobs.map((job) => ({
      id: job._id,
      name: job.postedBy?.username || "Unknown", // Or company name
      type: "Job Post",
      date: job.createdAt.toISOString().split("T")[0],
      status: "Pending",
    }));

    return NextResponse.json({
      stats: {
        totalUsers,
        activeCompanies,
        totalJobs,
        pendingApprovals: pendingApprovalsCount,
      },
      userGrowthData,
      jobTrendsData,
      recentActivity,
      pendingApprovals,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
