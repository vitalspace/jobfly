import axios from "./axios";
import { type IUser} from "../types/types.d";

export const signUp = async (body: IUser) => await axios.post("/signup", body);
export const signIn = async (body: Partial<IUser>) => await axios.post("/signin", body);
export const update = async (body: Partial<IUser>) => await axios.put("/update", body);
export const getProfile = async () => axios.get("/profile");
