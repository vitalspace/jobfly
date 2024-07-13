import axios from "./axios";
import { type UserData} from "../types/types.d";

export const signUp = async (body: UserData) => await axios.post("/signup", body);
export const signIn = async (body: Partial<UserData>) => await axios.post("/signin", body);
export const getProfile = async () => axios.get("/profile");
