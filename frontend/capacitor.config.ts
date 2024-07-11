import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.vital.io",
  appName: "capapp",
  webDir: "dist",
  server: {
    url: "http://192.168.56.1:5173/",
    cleartext: true,
  },
};

export default config;
