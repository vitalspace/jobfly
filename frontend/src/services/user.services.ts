import axios from "./axios";
import { type IUser } from "../types/types.d";

export const signUp = async (body: Partial<IUser>) =>
  await axios.post("/signup", body);
export const signIn = async (body: Partial<IUser>) =>
  await axios.post("/signin", body);
export const update = async (body: Partial<IUser>) =>
  await axios.put("/update", body);
export const getProfile = async () => axios.get("/profile");
export const postulate = async (body: { id: string }) =>
  axios.post(`/apply`, body);
export const unApply = async (body: { id: string }) =>
  axios.post(`/unapply`, body);
export const saveJob = async (body: { id: string }) =>
  axios.post(`/savejob`, body);
export const unSavedJob = async (body: { id: string }) =>
  axios.post(`/unsavedjob`, body);
export const getMyJobs = async () => await axios.get(`/getmyjobs`);
