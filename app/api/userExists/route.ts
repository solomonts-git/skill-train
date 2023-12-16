import connectToDB from "@/app/utils/connectDB";
import User from "@/app/models/users/users";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}
