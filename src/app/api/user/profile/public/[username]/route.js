import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import AuthUser from "@/models/AuthUser";
import UserProfile from "@/models/UserProfile";
import { getToday } from "@/utils/getToday";
import { getServerSession } from "next-auth";

export async function GET(req, { params }) {
  await connectDB();

  const { username } = await params;
  const today = getToday();

  const session = await getServerSession(authOptions);

  const user = await AuthUser.findOne({ username }, { password: 0, email: 0 });

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  const profile = await UserProfile.findOne(
    { userId: user._id },
    {
      memberSince: 0,
      streak: 0,
      lastActiveDate: 0,
      maxStreak: 0,
      areasOfInterest: 0,
      recentActivity: 0,
      createdAt: 0,
      updatedAt: 0,
    }
  );

  if (!profile || profile.isPublic === false) {
    return Response.json(
      { message: "This profile is private" },
      { status: 403 }
    );
  }

  const viewerId = session?.user?._id;

  if (viewerId && viewerId.toString() !== user._id.toString()) {
    const alreadyViewedToday = profile.profileViewLogs?.some(
      (log) =>
        log.viewerId?.toString() === viewerId.toString() && log.date === today
    );

    if (!alreadyViewedToday) {
      await UserProfile.updateOne(
        { userId: user._id },
        {
          $inc: { profileViews: 1 },
          $push: {
            profileViewLogs: {
              viewerId,
              date: today,
            },
          },
        }
      );
    }
  }

  return Response.json({
    user: {
      username: user.username,
    },
    profile,
  });
}
