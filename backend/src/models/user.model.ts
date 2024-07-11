import mongoose, { type Document } from "mongoose";

interface IUser extends Document {
  avatar: string;
  name: string;
  age: string;
  location: string;
  email: string;
  phone: Number;
}

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema({
  avatar: {
    type: String,
    default: "",
  },

  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model<IUser>("User", userSchema);
export { User };
