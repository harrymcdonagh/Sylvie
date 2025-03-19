import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    return NextResponse.json({ message: "✅ MongoDB Connected!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "❌ Database connection failed" }, { status: 500 });
  }
}
