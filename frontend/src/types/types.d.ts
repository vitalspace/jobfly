export enum Role {
  Recruiter,
  Candidate
}

export interface IUser {
  avatar: string;
  fullname: string;
  age: number | null;
  location: string;
  rol: Rol;
  phone: string;
  email: string;
  password: string;
}
