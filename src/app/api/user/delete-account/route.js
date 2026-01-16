import connectDB from "@/lib/connectDB";
import AuthUser from "@/models/AuthUser";
import UserProfile from "@/models/UserProfile";

export async function DELETE(req) {
  await connectDB();

  try {
    const { userId } = await req.json();

    if (!userId) {
      return Response.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await AuthUser.findById(userId);
    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    await UserProfile.findOneAndDelete({ userId });

    await AuthUser.findByIdAndDelete(userId);

    return Response.json(
      {
        success: true,
        message: "Account deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
