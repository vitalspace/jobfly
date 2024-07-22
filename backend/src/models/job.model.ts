import mongoose, { type Document, ObjectId, Schema } from "mongoose";

interface IJob extends Document {
  avatar: string;
  title: string;
  company: string;
  employment: string;
  location: string;
  salary: number;
  description: string;
  inthisrole: string;
  skills: string;
  level: string;
  recruiter: ObjectId;
  applicants: ObjectId[];
}

const jobSchema: mongoose.Schema<IJob> = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    employment: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    inthisrole: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    recruiter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicants: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model<IJob>("Job", jobSchema);
export { Job };
