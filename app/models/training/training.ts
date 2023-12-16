// import { Schema, Document, model } from "mongoose";
import mongoose from "mongoose";

// Define the interface for the document
interface TrainingType extends mongoose.Document {
  trainingname: string;
  imagePath: string;
  description: string;
}

// Define the mongoose schema
const trainingSchema = new mongoose.Schema<TrainingType>(
  {
    trainingname: { type: String, required: true },
    imagePath: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Create and export the mongoose model
const Training =
  mongoose.models.Training ||
  mongoose.model<TrainingType>("Training", trainingSchema);

export default Training;
