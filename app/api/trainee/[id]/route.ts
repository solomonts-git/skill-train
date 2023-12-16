import connectToDB from "../../../utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

import { writeFile } from "fs/promises";

// import Trainer from "@/app/models/trainer/trainer";
import Trainee from "@/app/models/trainee/trainee";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();

    const id: string = request.url.slice(request.url.lastIndexOf("/") + 1);
    const trainer = await Trainee.findById(id);
    return NextResponse.json(trainer);
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
  const title = data.get("title") as string;
  const trainerorg = data.get("trainerorg") as string;
  const status = data.get("status") as string;
  const trainingname = data.get("trainingname") as string;
  const gender = data.get("gender") as string;
  const biodesc = data.get("biodesc") as string;
  const year = data.get("year") as string;
  const id = data.get("id") as string;
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

  const trainee = {
    title,
    firstname,
    lastname,
    email,
    trainerorg,
    status,
    trainingname,
    gender,
    biodesc,
    photo: dbpath,
  };
  // console.log("Trainer update data", trainer);
  await Trainee.findOneAndUpdate({ _id: id }, trainee);

  return NextResponse.json({ success: true });
}
