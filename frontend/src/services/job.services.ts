import axios from "./axios";
import { type IJob } from "../types/types.d";

export const createJob = async (body: Partial<IJob>) =>
  await axios.post("/jobs/create", body);
export const allJobs = async () => await axios.get("/jobs");
export const getJob = async (id: string) => await axios.get(`/jobs/${id}`);
export const updateJob = async (id: string, body: any) =>
  await axios.put(`/jobs/${id}`, body);
export const getApplicants = async (id: string) =>
  await axios.get(`/jobs/${id}/applicants`);
