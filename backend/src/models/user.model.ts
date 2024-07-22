import mongoose, { type Document, ObjectId, Schema } from "mongoose";

interface IUser extends Document {
  avatar: string;
  fullname: string;
  age: number;
  location: string;
  rol: string;
  email: string;
  password: string;
  phone: string;
  applications: ObjectId[];
  savedJobs: ObjectId[];
}

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema({
  avatar: {
    type: String,
    default: "",
  },
  fullname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  applications: {
    type: [Schema.Types.ObjectId],
    ref: "Job",
    default: [],
  },
  savedJobs: {
    type: [Schema.Types.ObjectId],
    ref: "Job",
    default: [],
  },
});

const User = mongoose.model<IUser>("User", userSchema);
export { User };
