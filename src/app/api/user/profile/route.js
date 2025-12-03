import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import { UploadImage } from "@/lib/upload-Image";
import UserProfile from "@/models/UserProfile";

// get profile
export async function GET() {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user?._id) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  const userId = session.user._id;
  // const userId = "69216016faa3e29f3439fbb2"

  try {
    let profile = await UserProfile.findOne({ userId });

    if (!profile) {
      return Response.json(
        { success: false, message: "Profile not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      profile,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// update profile
export async function PUT(req) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user?._id) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  const userId = session.user._id;
  // const userId = "6922ad85960624dadd579169";
  const contentType = req.headers.get("content-type");

  try {
    if (contentType.startsWith("multipart/form-data")) {
      const form = await req.formData();
      const name = form.get("name");
      const role = form.get("role");
      const location = form.get("location");
      const bio = form.get("bio");

      const avatarFile = form.get("avatar"); // file or null
      const coverFile = form.get("coverPhoto"); // file or null

      let updateData = {};
      // Only update text fields if they exist
      if (name) updateData.name = name;
      if (role) updateData.role = role;
      if (location) updateData.location = location;
      if (bio) updateData.bio = bio;

      // Update avatar only if file is selected
      if (avatarFile && avatarFile.size > 0) {
        const uploadedAvatar = await UploadImage(avatarFile, "avatars");
        updateData.avatar = uploadedAvatar.secure_url;
      }

      // Update cover only if file is selected
      if (coverFile && coverFile.size > 0) {
        const uploadedCover = await UploadImage(coverFile, "covers");
        updateData.coverPhoto = uploadedCover.secure_url;
      }

      const updatedProfile = await UserProfile.findOneAndUpdate(
        { userId },
        { $set: updateData },
        { new: true }
      );

      return Response.json({
        success: true,
        message: "Profile updated successfully",
        profile: updatedProfile,
      });
    }
  } catch (error) {
    console.error("Profile update error:", error);
    return Response.json(
      {
        success: false,
        message: "Profile update failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}


