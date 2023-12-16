import connectToDB from "../../utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
// import multer from "multer";
import { writeFile } from "fs/promises";
// import { v4 as uuidv4 } from "uuid";

import Training from "@/app/models/training/training";

// Define the GET handler to retrieve all training data
export async function GET() {
  try {
    await connectToDB();

    const trainings = await Training.find();
    return NextResponse.json(trainings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}

export async function POST(req: NextRequest) {
  await connectToDB();

  const data = await req.formData();
  //   console.log("data", data);
  const file: File | null = data.get("file") as unknown as File;
  const name = data.get("trainingname") as string;
  const description = data.get("description") as string;
  //   console.log("name", name);
  if (!file || !name || !description) {
    return NextResponse.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = `public/uploads/${file.name}`;
  const dbpath = `uploads/${file.name}`;
  await writeFile(path, buffer);

  const training = new Training({
    imagePath: dbpath,
    trainingname: name,
    description: description,
  });

  await training.save();
  //   console.log("data registered");
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    await Training.deleteOne({ _id: id });
    return NextResponse.json({ message: "Data Deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error Deleting Data" });
  }
}
