import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import User from "@/models/users";

export async function GET(req: NextRequest) {
  await connectDb();
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const user = await User.findById(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
