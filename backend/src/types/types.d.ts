import { type ObjectId } from "mongoose";

export interface IUser {
  fullname: string;
  age: number;
  location: string;
  rol: string;
  email: string;
  phone: string;
  password: string;
  postulations: ObjectId[];
}

export interface IJob {
  title: string;
  company: string;
  employment: string;
  location: string;
  salary: number;
  description: string;
  inthisrole: string;
  skills: string;
  level: string;
  applicants: ObjectId[];
}
