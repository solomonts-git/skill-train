// import { Schema, Document, model } from "mongoose";
import mongoose from "mongoose";
import Partner from "../partners/Partner";

// Define the interface for the document
interface EventType extends mongoose.Document {
  eventname: string;
  startdate: Date;
  enddate: Date;
  organizer: mongoose.ObjectId;
  eventtype: string;
  description: string;
  photo: string;
  address: string;
}

// Define the mongoose schema
const eventSchema = new mongoose.Schema<EventType>(
  {
    eventname: { type: String, required: true },
    eventtype: { type: String, required: true },
    organizer: { type: mongoose.Types.ObjectId, required: true, ref: Partner },
    description: { type: String, required: true },
    startdate: { type: Date, required: true },
    enddate: { type: Date, required: true },
    photo: { type: String },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Create and export the mongoose model
const Event =
  mongoose.models.Event || mongoose.model<EventType>("Event", eventSchema);

export default Event;
