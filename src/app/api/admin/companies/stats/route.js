import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import AuthUser from "@/models/AuthUser";

export async function GET() {
  await connectDB();

  try {
    const totalCompanies = await AuthUser.countDocuments({ role: "Company" });
    const approvedCompanies = await AuthUser.countDocuments({
      role: "Company",
      status: "approved",
    });
    const pendingCompanies = await AuthUser.countDocuments({
      role: "Company",
      status: "pending",
    });
    const flaggedCompanies = await AuthUser.countDocuments({
      role: "Company",
      status: "flagged",
    });

    return NextResponse.json({
      totalCompanies,
      approvedCompanies,
      pendingCompanies,
      flaggedCompanies,
    });
  } catch (error) {
    console.error("Error fetching company stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
