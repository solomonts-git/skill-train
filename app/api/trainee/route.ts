import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/app/utils/connectDB";
import { writeFile } from "fs/promises";

import Trainee from "@/app/models/trainee/trainee";

export async function GET() {
  try {
    await connectToDB();
    const trainers = await Trainee.find()
      .populate("trainingname")
      .populate("trainerorg");
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
  const trainerorg = data.get("trainerorg") as string;
  const status = data.get("status") as string;
  const trainingname = data.get("trainingname") as string;
  const gender = data.get("gender") as string;
  const biodesc = data.get("biodesc") as string;
  const year = data.get("year") as string;

  if (
    !photo ||
    !firstname ||
    !lastname ||
    !email ||
    !title ||
    !trainingname ||
    !year ||
    !trainerorg ||
    !status ||
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

  const trainee = new Trainee({
    title,
    firstname,
    lastname,
    email,
    status,
    trainingname,
    year,
    trainerorg,
    gender,
    biodesc,
    photo: dbpath,
  });

  await trainee.save();

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    await Trainee.deleteOne({ _id: id });
    return NextResponse.json({ message: "Data Deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error Deleting Data" });
  }
}
