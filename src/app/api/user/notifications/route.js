import connectDB from "@/lib/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import NotificationSettings from "@/models/NotificationSettings";

export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  let settings = await NotificationSettings.findOne({
    userId: session.user._id,
  });

  if (!settings) {
    settings = await NotificationSettings.create({
      userId: session.user._id,
    });
  }

  return Response.json(settings);
}

export async function PUT(req) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const body = await req.json();

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  await NotificationSettings.findOneAndUpdate(
    { userId: session.user._id },
    { $set: body },
    { upsert: true, new: true }
  );

  return Response.json({ success: true });
}
