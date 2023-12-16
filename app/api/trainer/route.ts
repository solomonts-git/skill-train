import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/app/utils/connectDB";
import { writeFile } from "fs/promises";

import Trainer from "@/app/models/trainer/trainer";

export async function GET() {
  try {
    await connectToDB();
    const trainers = await Trainer.find().populate("affiliation");
    return NextResponse.json(trainers);
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
  const title = data.get("title") as string;
  const affiliation = data.get("affiliation") as string;
  const specialization = data.get("specialization") as string;
  const exprience = data.get("exprience") as string;
  const gender = data.get("gender") as string;
  const biodesc = data.get("biodesc") as string;

  if (
    !photo ||
    !firstname ||
    !lastname ||
    !email ||
    !title ||
    !affiliation ||
    !specialization ||
    !exprience ||
    !biodesc ||
    !gender
  ) {
    return NextResponse.json({ success: false });
  }

  const bytes = await photo.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = `public/uploads/${photo.name}`;
  const dbpath = `uploads/${photo.name}`;
  await writeFile(path, buffer);

  const trainer = new Trainer({
    title,
    firstname,
    lastname,
    email,
    specialization,
    exprience,
    affiliation,
    gender,
    biodesc,
    photo: dbpath,
  });

  await trainer.save();

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    await Trainer.deleteOne({ _id: id });
    return NextResponse.json({ message: "Data Deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error Deleting Data" });
  }
}
