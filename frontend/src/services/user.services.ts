import axios from "./axios";

export const getProfile = async () => axios.get("/profile");
