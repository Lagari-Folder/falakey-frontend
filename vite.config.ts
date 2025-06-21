import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   assetsInlineLimit: 0, // Ensures small assets are not inlined
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0", // Allow access from any IP address on the local network
    port: 3000, // Optional: specify the port, default is 3000
  },
});
