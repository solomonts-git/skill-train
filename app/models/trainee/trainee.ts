// import { Schema, Document, model } from "mongoose";
import mongoose from "mongoose";
import Training from "../training/training";
import Partner from "../partners/Partner";

// Define the interface for the document
interface TraineeType extends mongoose.Document {
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  trainingname: mongoose.ObjectId;
  trainerorg: mongoose.ObjectId;
  status: string;
  year: number;
  photo: string;
  gender: string;
  biodesc: string;
}

// Define the mongoose schema
const traineeSchema = new mongoose.Schema<TraineeType>(
  {
    title: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    trainingname: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: Training,
    },
    trainerorg: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: Partner,
    },
    status: { type: String, required: true },
    year: { type: Number, required: true },
    photo: { type: String, required: true },
    gender: { type: String, required: true },
    biodesc: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Create and export the mongoose model
const Trainee =
  mongoose.models.Trainee ||
  mongoose.model<TraineeType>("Trainee", traineeSchema);

export default Trainee;
