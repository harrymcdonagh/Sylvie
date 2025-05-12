import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Message from "@/models/message";
import User from "@/models/users";
import Conversation from "@/models/conversation";

export async function POST(request: NextRequest) {
  const { message, userId, conversationId } = await request.json();
  if (!message || !conversationId || !userId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    await connectDb();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const dbMessages = await Message.find({ conversationId }).sort({ timestamp: 1 });

    const history = dbMessages
      .filter((m) => m.content?.trim().length > 0)
      .map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.content,
      }));

    const res = await fetch("http://localhost:8000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: message,
        student_name: user.name,
        course: user.course,
        year: user.year,
        history,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("LLM error:", err);
      return NextResponse.json({ error: "LLM service failed" }, { status: 502 });
    }

    const conversation = await Conversation.findById(conversationId);
    const { reply, title } = await res.json();

    if (conversation?.title === "New Chat") {
      await Conversation.findByIdAndUpdate(conversationId, { title });
    }

    return NextResponse.json({ reply });
  } catch (e) {
    console.error("Chat proxy error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
