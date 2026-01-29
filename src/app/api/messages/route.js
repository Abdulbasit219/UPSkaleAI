import connectDB from "@/lib/connectDB";
import Message from "@/models/Message";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const { senderId, recipientId, text, roomId } = body;

    if (!senderId || !recipientId || !text || !roomId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    const newMessage = await Message.create({
      senderId,
      recipientId,
      text,
      roomId,
    });

    return NextResponse.json({ success: true, data: newMessage });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  if (!roomId) {
    return NextResponse.json(
      { success: false, message: "Room ID is required" },
      { status: 400 },
    );
  }

  try {
    const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
