//api/conversations/recent/route.ts

import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Conversation from "@/models/conversation";

export async function GET(req: NextRequest) {
  await connectDb();
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const conversations = await Conversation.find({ userId }).sort({ createdAt: -1 });

  return NextResponse.json(conversations);
}
