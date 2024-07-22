export enum Role {
  Recruiter,
  Candidate,
}

export interface IUser {
  _id: string;
  avatar: string;
  fullname: string;
  age: number | null;
  location: string;
  rol: Rol;
  phone: string;
  email: string;
  password: string;
  applications: [] | undefined;
  savedJobs: [] | undefined;
}

export interface IJob {
  // _id: string;
  // title: string;
  // company: string;
  // employment: string;
  // location: string;
  // salary: number;
  // description: string;
  // inthisrole: string;
  // skills: string;
  // level: string;
  _id: string;
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
  recruiter: string;
  applicants: string[];
}
