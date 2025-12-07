import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import AuthUser from "@/models/AuthUser";
import JobApplication from "@/models/JobApplication";

export async function GET() {
  await connectDB();

  try {
    const users = await AuthUser.find().select("-password"); // Exclude password
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const applicationCount = await JobApplication.countDocuments({
          user: user._id,
        });

        // Determine resume status
        const resumeUploaded = !!user.resume || applicationCount > 0; // Better logic might check applications for resumes if stored there

        // Calculate profile completeness
        let filledFields = 0;
        const totalFields = 6; // name, email, role, phone, location, bio
        if (user.name) filledFields++;
        if (user.email) filledFields++;
        if (user.role) filledFields++;
        if (user.phone) filledFields++;
        if (user.location) filledFields++;
        if (user.bio) filledFields++;

        const profileComplete = Math.round((filledFields / totalFields) * 100);

        // Determine last active (mocking for now as we don't track login time yet)
        const lastActive = "Recently";

        return {
          id: user._id,
          name: user.name || user.username || "Unknown",
          email: user.email,
          phone: user.phone || "N/A",
          location: user.location || "N/A",
          joinDate: user.createdAt.toISOString().split("T")[0],
          status: user.status || "active",
          role: user.role || "Job Seeker",
          applications: applicationCount,
          resumeUploaded,
          lastActive,
          profileComplete,
        };
      })
    );

    return NextResponse.json(usersWithStats);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
