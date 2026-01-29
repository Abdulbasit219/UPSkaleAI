import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/connectDB";
import Message from "@/models/Message";
import UserProfile from "@/models/UserProfile";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?._id) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const currentUserId = session.user._id;

  try {
    const messages = await Message.find({
      $or: [{ senderId: currentUserId }, { recipientId: currentUserId }],
    }).sort({ createdAt: -1 });

    const contactIds = new Set();
    const lastMessagesMap = new Map();

    messages.forEach((msg) => {
      const otherId =
        msg.senderId.toString() === currentUserId
          ? msg.recipientId.toString()
          : msg.senderId.toString();

      if (!contactIds.has(otherId)) {
        contactIds.add(otherId);
        lastMessagesMap.set(otherId, msg);
      }
    });

    const contactIdsArray = Array.from(contactIds);

    const profiles = await UserProfile.find({
      userId: { $in: contactIdsArray },
    }).select("userId name avatar role");

    const contactsWithMeta = profiles.map((p) => {
      const lastMsg = lastMessagesMap.get(p.userId.toString());
      return {
        id: p.userId,
        name: p.name || "Unknown User",
        role: p.role || "User",
        avatar:
          p.avatar ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.userId}`,
        status: "offline",
        lastMessage: lastMsg?.text || "",
        time: lastMsg?.createdAt
          ? new Date(lastMsg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
        unread: 0,
      };
    });

    return NextResponse.json({ success: true, data: contactsWithMeta });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
