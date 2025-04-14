import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Conversation from "@/models/conversation";

export async function POST(req: NextRequest) {
  await connectDb();

  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const newConversation = await Conversation.create({
      userId,
      title: "New Chat",
    });

    return NextResponse.json(newConversation, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
