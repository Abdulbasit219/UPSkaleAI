import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import AuthUser from "@/models/AuthUser";

export async function POST(req) {
  await connectDB();

  try {
    const { email, secret } = await req.json();

    // Simple security check to prevent public abuse
    // In production, this secret should be an environment variable
    if (secret !== "setup_admin_secret_123") {
      return NextResponse.json({ message: "Invalid secret" }, { status: 403 });
    }

    const user = await AuthUser.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.role = "Admin";
    user.isAdmin = true; // For backward compatibility
    await user.save();

    return NextResponse.json({ message: `User ${email} promoted to Admin` });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to promote user" },
      { status: 500 }
    );
  }
}
