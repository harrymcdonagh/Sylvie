import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Conversation from "@/models/conversation";
import Message from "@/models/message";

export async function DELETE(req: NextRequest) {
  await connectDb();
  const conversationId = req.nextUrl.searchParams.get("conversationId");
  if (!conversationId)
    return NextResponse.json({ error: "Missing conversationId" }, { status: 400 });
  try {
    const conversation = await Conversation.findByIdAndDelete(conversationId);
    const messages = await Message.deleteMany({ conversationId });
    return NextResponse.json({ conversation, messages }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
