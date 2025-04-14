import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Conversation from "@/models/conversation";

export async function GET(req: NextRequest) {
  await connectDb();
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

  // For simplicity, assume one active conversation per user.
  let conversation = await Conversation.findOne({ userId });
  if (!conversation) {
    conversation = await Conversation.create({ userId, title: "New Chat" });
  }
  return NextResponse.json(conversation);
}
