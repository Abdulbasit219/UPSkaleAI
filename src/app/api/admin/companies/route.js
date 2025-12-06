import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import AuthUser from "@/models/AuthUser";
import Job from "@/models/Job";

export async function GET() {
  await connectDB();

  try {
    // Fetch users with role 'Company'
    const companies = await AuthUser.find({ role: "Company" }).select(
      "-password"
    );

    const companiesWithStats = await Promise.all(
      companies.map(async (company) => {
        const jobPostsCount = await Job.countDocuments({
          postedBy: company._id,
        });

        // Mock registration docs for now as we don't have a model for documents yet
        // In real app, we would fetch from CompanyDocument model

        return {
          id: company._id,
          name: company.companyName || company.name || "Unknown Company",
          logo: company.logo || "🏢",
          industry: company.industry || "Uncategorized",
          location: company.location || "Remote",
          website: company.website || "",
          email: company.email,
          phone: company.phone || "N/A",
          registrationDate: company.createdAt.toISOString().split("T")[0],
          status: company.status || "pending", // Default to pending if not set
          employees: company.employees || "N/A",
          jobPosts: jobPostsCount,
          verified: company.verified || false,
          description: company.companyDescription || "No description provided.",
        };
      })
    );

    return NextResponse.json(companiesWithStats);
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}
