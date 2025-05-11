import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import User from "@/models/users";

export async function POST(request: NextRequest) {
  const { message, userId } = await request.json();
  if (!message) {
    return NextResponse.json({ error: "Missing message" }, { status: 400 });
  }

  try {
    await connectDb();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const res = await fetch("http://localhost:8000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: message,
        student_name: user.name,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("LLM error:", err);
      return NextResponse.json({ error: "LLM service failed" }, { status: 502 });
    }

    const { reply } = await res.json();
    return NextResponse.json({ reply: reply });
  } catch (e) {
    console.error("Chat proxy error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
