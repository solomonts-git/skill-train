// import mongoose from "mongoose";

const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGODB_URL);

    console.log("Connected to the database!");
    return res;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

export default connectToDB;
