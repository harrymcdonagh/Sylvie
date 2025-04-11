import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Message from "@/models/message";

export async function GET(req: NextRequest) {
  await connectDb();
  const conversationId = req.nextUrl.searchParams.get("conversationId");
  if (!conversationId)
    return NextResponse.json({ error: "Missing conversationId" }, { status: 400 });

  const messages = await Message.find({ conversationId }).sort({ timestamp: 1 });
  return NextResponse.json(messages);
}

// app/api/messages/route.ts (POST handler)
export async function POST(req: NextRequest) {
  await connectDb();
  const body = await req.json();
  // Make sure body has the conversationId property
  const message = await Message.create(body);
  return NextResponse.json(message);
}
