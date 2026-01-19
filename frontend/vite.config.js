import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "https://dolphin-app-8q5qf.ondigitalocean.app", // backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
