import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import { updateLearningStreak } from "@/lib/updateLearningStreak";
import { getServerSession } from "next-auth";

export async function POST() {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user?._id) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  await updateLearningStreak(session.user._id);

  return Response.json({
    success: true,
  });
}
