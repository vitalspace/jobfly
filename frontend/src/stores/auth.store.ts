import { writable } from "svelte/store";

function createAuthStore() {
  const { subscribe, set } = writable(false);

  return {
    subscribe,
    login: (jwt: string) => {
      document.cookie = `auth=${jwt};path=/;max-age=7*86400;Secure;SameSite=Lax`;
      set(true);
    },
    logout: () => {
      document.cookie = `auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      set(false);
    },
    initialize: () => {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)auth\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      set(!!token);
    },
  };
}

export const auth = createAuthStore();