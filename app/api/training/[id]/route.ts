import connectToDB from "../../../utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
// import multer from "multer";
import { writeFile } from "fs/promises";
// import { v4 as uuidv4 } from "uuid";

import Training from "@/app/models/training/training";

// Define the GET handler to retrieve all training data
export async function GET(request: NextRequest) {
  try {
    await connectToDB();

    const id: string = request.url.slice(request.url.lastIndexOf("/") + 1);
    const training = await Training.findById(id);
    return NextResponse.json(training);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}

export async function PUT(req: Request) {
  // const {id,file, trainingname,description } = await request.json()
  await connectToDB();

  const data = await req.formData();
  //   console.log("data", data);
  const file: File | null = data.get("file") as unknown as File;
  const name = data.get("trainingname") as string;
  const description = data.get("description") as string;
  const id = data.get("id") as string;
  //   console.log("name", name);
  if (!id || !file || !name || !description) {
    return NextResponse.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = `public/uploads/${file.name}`;
  const dbpath = `uploads/${file.name}`;
  await writeFile(path, buffer);

  const update = {
    imagePath: dbpath,
    trainingname: name,
    description: description,
  };
  await Training.findOneAndUpdate({ _id: id }, update);
  //await training.save();
  //   console.log("data registered");
  return NextResponse.json({ success: true });
}
