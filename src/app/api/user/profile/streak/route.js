import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import { updateLearningStreak } from "@/lib/updateLearningStreak";
import UserProfile from "@/models/UserProfile";
import { getServerSession } from "next-auth";

export async function POST() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?._id) {
      return Response.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    await updateLearningStreak(session.user._id);

    await UserProfile.findOneAndUpdate(
      { userId: session.user._id },
      {
        $push: {
          recentActivity: {
            action: "Logged in and updated streak",
            icon: "CheckCircle",
            color: "text-green-500",
            timestamp: new Date(),
          },
        },
      },
      { new: true }
    );

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
