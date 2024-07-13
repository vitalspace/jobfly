import mongoose, { type Document } from "mongoose";

interface IUser extends Document {
  avatar: string;
  fullname: string;
  age: number;
  location: string;
  email: string;
  password: string;
  phone: string;
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
});

const User = mongoose.model<IUser>("User", userSchema);
export { User };
