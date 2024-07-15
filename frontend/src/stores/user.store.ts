import { writable } from "svelte/store";
import { getProfile } from "../services/user.services";
import { type IUser } from "../types/types.d";

const createUserStore = () => {
  const { subscribe, set } = writable<Partial<IUser>>();

  const initialize = async () => {
    try {
      const { data } = await getProfile();
      set(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error initalizing profile store:", error);
      }
    }
  };

  const updateProfile = (newData: any) => {
    set(newData);
  };

  initialize();

  return {
    subscribe,
    initialize,
    updateProfile,
  };
};

export const userStore = createUserStore();
