import connectDB from "@/lib/connectDB";
import AuthUser from "@/models/AuthUser";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import UserProfile from "@/models/UserProfile";

export async function POST(req) {
  // Endpoint for user signup
  await connectDB();

  try {
    const { name, email, password, role } = await req.json();

    // validate fields
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    // Generate unique username
    const baseUsername = name.toLowerCase().replace(/[^a-z0-9]/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString();
    const username = `${baseUsername}${randomSuffix}`;

    const existingUserByEmail = await AuthUser.findOne({ email });
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        );
      } else {
        // Update unverified user
        const hashedPassword = await bcrypt.hash(password, 10);

        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.role = role || "Job Seeker";
        existingUserByEmail.username = username; // Update username just in case
        existingUserByEmail.name = name;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);

      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newUser = await AuthUser.create({
        username,
        name,
        email,
        password: hashedPassword,
        role: role || "Job Seeker",
        verifyCode,
        verifyCodeExpiry: expiryDate,
      });

      // Create user profile
      await UserProfile.create({
        userId: newUser._id,
        name: name,
        avatar: "",
        coverPhoto: "",
        role: "",
        location: "",
        memberSince: newUser.createdAt.toISOString().split("T")[0],
        bio: "",
      });
    }

    // Send verification email
    const emailResponse = await sendVerificationEmail(email, name, verifyCode);

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
        username: username,
      },
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500 }
    );
  }
}
