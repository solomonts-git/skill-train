import connectToDB from "../../utils/connectDB";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
const fs = require("fs");
const path = require("path");
import { writeFile } from "fs/promises";

// Define the GET handler to retrieve all training data
export async function GET() {
  try {
    await connectToDB();
    // Check if the database connection is established

    if (mongoose.connection.readyState !== 1) {
      throw new Error("Failed to connect to the MongoDB database");
    }

    // Get all collection names
    const collectionNames = await mongoose.connection.db
      .listCollections()
      .toArray();

    // Get the current date and time
    const currentDate = new Date();

    // Format the date as a string for folder name
    const formattedDate = currentDate.toISOString().split("T")[0]; // Example format: YYYY-MM-DD

    // Generate the folder path based on the formatted date
    const folderPath = path.join("./app/databackup/", formattedDate); // Change the base folder path as needed

    // Create the folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Perform backup operation for each collection
    for (const collectionName of collectionNames) {
      const collection = mongoose.connection.collection(collectionName.name);
      const backupData = await collection.find().toArray();

      // Convert backup data to JSON string
      const jsonData = JSON.stringify(backupData);

      // Specify the desired file path for the backup
      const fileName = `mongodb_backup_${collectionName.name}_${formattedDate}.json`;
      const filePath = path.join(folderPath, fileName);

      // Write the backup data to a file
      fs.writeFileSync(filePath, jsonData);
    }
    //console.log("response...", res);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}
