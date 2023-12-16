// import { Schema, Document, model } from "mongoose";
import mongoose from "mongoose";
import Partner from "../partners/Partner";

// Define the interface for the document
interface TrainerType extends mongoose.Document {
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  specialization: string;
  exprience: number;
  affiliation: mongoose.ObjectId;
  photo: string;
  biodesc: string;
  gender: string;
}

// Define the mongoose schema
const trainerSchema = new mongoose.Schema<TrainerType>(
  {
    title: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    specialization: { type: String, required: true },
    exprience: { type: Number, required: true },
    affiliation: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: Partner,
    },
    photo: { type: String, required: true },
    biodesc: { type: String, required: true },
    gender: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Create and export the mongoose model
const Trainer =
  mongoose.models.Trainer ||
  mongoose.model<TrainerType>("Trainer", trainerSchema);

export default Trainer;
