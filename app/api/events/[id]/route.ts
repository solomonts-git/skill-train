import connectToDB from "../../../utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

import { writeFile } from "fs/promises";

import Event from "@/app/models/events/event";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();

    const id: string = request.url.slice(request.url.lastIndexOf("/") + 1);
    const event = await Event.findById(id);
    return NextResponse.json(event);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}

export async function PUT(req: Request) {
  await connectToDB();

  const data = await req.formData();

  //console.log("data", data);
  const file: File | null = data.get("photo") as unknown as File;
  const eventname = data.get("eventname") as string;
  const description = data.get("description") as string;
  const eventtype = data.get("eventtype") as string;
  const startdate = data.get("startdate") as string;
  const enddate = data.get("enddate") as string;
  const address = data.get("address") as string;
  const organizer = data.get("organizer") as string;
  const id = data.get("id") as string;

  //   console.log("name", name);
  if (
    !file ||
    !eventname ||
    !eventtype ||
    !description ||
    !startdate ||
    !enddate ||
    !address ||
    !organizer
  ) {
    return NextResponse.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = `public/uploads/${file.name}`;
  const dbpath = `uploads/${file.name}`;
  await writeFile(path, buffer);

  const update = {
    photo: dbpath,
    eventname: eventname,
    eventtype: eventtype,
    organizer: organizer,
    startdate: startdate,
    enddate: enddate,
    address: address,
    description: description,
  };

  await Event.findOneAndUpdate({ _id: id }, update);

  return NextResponse.json({ success: true });
}
