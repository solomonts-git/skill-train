import mongoose from "mongoose";

interface UserType extends mongoose.Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  photo: string;
  isactive: string;
}

const userSchema = new mongoose.Schema<UserType>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    photo: { type: String, required: true },
    isactive: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User || mongoose.model<UserType>("User", userSchema);

export default User;
