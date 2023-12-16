import connectToDB from "../../utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

import { writeFile } from "fs/promises";

import Partner from "@/app/models/partners/Partner";

// Define the GET handler to retrieve all training data
export async function GET() {
  try {
    await connectToDB();

    const partners = await Partner.find();
    return NextResponse.json(partners);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}

export async function POST(req: NextRequest) {
  await connectToDB();

  const data = await req.formData();
  //   console.log("data", data);
  const file: File | null = data.get("org_logo") as unknown as File;
  const org_name = data.get("organizationname") as string;
  const description = data.get("description") as string;
  const org_type = data.get("org_type") as string;

  //   console.log("name", name);
  if (!file || !org_name || !org_type || !description) {
    return NextResponse.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = `public/uploads/${file.name}`;
  const dbpath = `uploads/${file.name}`;
  await writeFile(path, buffer);

  const partner = new Partner({
    org_logo: dbpath,
    organizationname: org_name,
    description: description,
    org_type: org_type,
  });

  await partner.save();
  //   console.log("data registered");
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    await Partner.deleteOne({ _id: id });
    return NextResponse.json({ message: "Data Deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error Deleting Data" });
  }
}
