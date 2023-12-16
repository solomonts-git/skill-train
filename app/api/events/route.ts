import connectToDB from "../../utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

import { writeFile } from "fs/promises";

import Event from "@/app/models/events/event";

// Define the GET handler to retrieve all training data
export async function GET() {
  try {
    await connectToDB();

    const events = await Event.find().populate("organizer");
    return NextResponse.json(events);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}

export async function POST(req: NextRequest) {
  await connectToDB();

  const data = await req.formData();
  //   console.log("data", data);
  const file: File | null = data.get("photo") as unknown as File;
  const eventname = data.get("eventname") as string;
  const description = data.get("description") as string;
  const eventtype = data.get("eventtype") as string;
  const startdate = data.get("startdate") as string;
  const enddate = data.get("enddate") as string;
  const organizer = data.get("organizer") as string;
  const address = data.get("address") as string;

  //   console.log("name", name);
  if (
    !file ||
    !eventname ||
    !eventtype ||
    !description ||
    !startdate ||
    !enddate ||
    !organizer ||
    !address
  ) {
    return NextResponse.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = `public/uploads/${file.name}`;
  const dbpath = `uploads/${file.name}`;
  await writeFile(path, buffer);

  const event = new Event({
    photo: dbpath,
    eventname: eventname,
    eventtype: eventtype,
    organizer: organizer,
    startdate: startdate,
    enddate: enddate,
    address: address,
    description: description,
  });

  await event.save();
  //   console.log("data registered");
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    await Event.deleteOne({ _id: id });
    return NextResponse.json({ message: "Data Deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error Deleting Data" });
  }
}
