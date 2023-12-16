// import { Schema, Document, model } from "mongoose";
import mongoose from "mongoose";

// Define the interface for the document
interface PartnerType extends mongoose.Document {
  organizationname: string;
  org_type: string;
  description: string;
  org_logo: string;
}

// Define the mongoose schema
const partnerSchema = new mongoose.Schema<PartnerType>(
  {
    organizationname: { type: String, required: true },
    org_type: { type: String, required: true },
    description: { type: String, required: true },
    org_logo: { type: String },
  },
  {
    timestamps: true,
  }
);

// Create and export the mongoose model
const Partner =
  mongoose.models.Partner ||
  mongoose.model<PartnerType>("Partner", partnerSchema);

export default Partner;
