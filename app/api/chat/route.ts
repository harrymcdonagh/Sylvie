import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { message } = await request.json();
  if (!message) {
    return NextResponse.json({ error: "Missing message" }, { status: 400 });
  }

  try {
    const res = await fetch("http://localhost:8000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: message,
        top_k: 3,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("LLM error:", err);
      return NextResponse.json({ error: "LLM service failed" }, { status: 502 });
    }

    const { answer } = await res.json();
    return NextResponse.json({ reply: answer });
  } catch (e) {
    console.error("Chat proxy error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
