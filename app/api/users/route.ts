import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/app/utils/connectDB";
import { writeFile } from "fs/promises";
import bcrypt from "bcryptjs";
import User from "@/app/models/users/users";

export async function GET() {
  try {
    await connectToDB();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
export async function POST(req: NextRequest) {
  await connectToDB();

  const data = await req.formData();
  const photo: File | null = data.get("photo") as unknown as File;
  const firstname = data.get("firstname") as string;
  const lastname = data.get("lastname") as string;
  const email = data.get("email") as string;
  const role = data.get("role") as string;
  const isactive = data.get("isactive") as string;
  const password = data.get("password") as string;

  if (
    !photo ||
    !firstname ||
    !lastname ||
    !email ||
    !role ||
    !isactive ||
    !password
  ) {
    return NextResponse.json({ success: false });
  }

  const bytes = await photo.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = `public/uploads/${photo.name}`;
  const dbpath = `uploads/${photo.name}`;
  await writeFile(path, buffer);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    role,
    isactive,
    photo: dbpath,
  });

  await user.save();

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    await User.deleteOne({ _id: id });
    return NextResponse.json({ message: "Data Deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error Deleting Data" });
  }
}
