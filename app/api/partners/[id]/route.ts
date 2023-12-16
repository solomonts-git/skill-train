import connectToDB from "../../../utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

import { writeFile } from "fs/promises";

import Partner from "@/app/models/partners/Partner";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();

    const id: string = request.url.slice(request.url.lastIndexOf("/") + 1);
    const partner = await Partner.findById(id);
    return NextResponse.json(partner);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}

export async function PUT(req: Request) {
  await connectToDB();

  const data = await req.formData();
  //   console.log("data", data);
  const file: File | null = data.get("org_logo") as unknown as File;
  const name = data.get("organizationname") as string;
  const description = data.get("description") as string;
  const org_type = data.get("org_type") as string;
  const id = data.get("id") as string;
  //   console.log("name", name);
  if (!id || !file || !name || !description || !org_type) {
    return NextResponse.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = `public/uploads/${file.name}`;
  const dbpath = `uploads/${file.name}`;
  await writeFile(path, buffer);

  const update = {
    org_logo: dbpath,
    organizationname: name,
    description: description,
    org_type: org_type,
  };
  await Partner.findOneAndUpdate({ _id: id }, update);

  return NextResponse.json({ success: true });
}
