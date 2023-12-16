import connectToDB from "../../../utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
// import multer from "multer";
import { writeFile } from "fs/promises";
// import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import User from "@/app/models/users/users";

// Define the GET handler to retrieve all training data
export async function GET(request: NextRequest) {
  //   const { searchParams } = new URL(request.url);
  //   const id = searchParams.get("id");
  try {
    await connectToDB();

    const id: string = request.url.slice(request.url.lastIndexOf("/") + 1);

    const user = await User.findById(id);
    // console.log("user server", user);
    // console.log("id", id);

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}

export async function PUT(req: Request) {
  await connectToDB();

  const data = await req.formData();
  const photo: File | null = data.get("photo") as unknown as File;
  const firstname = data.get("firstname") as string;
  const lastname = data.get("lastname") as string;
  const email = data.get("email") as string;
  const role = data.get("role") as string;
  const isactive = data.get("isactive") as string;
  const password = data.get("password") as string;
  const id = data.get("id") as string;

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
  const update = {
    firstname,
    lastname,
    email,
    password: hashedPassword,
    role,
    isactive,
    photo: dbpath,
  };
  await User.findOneAndUpdate({ _id: id }, update);

  return NextResponse.json({ success: true });
}
