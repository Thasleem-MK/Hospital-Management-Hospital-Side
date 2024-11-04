import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Your App Name",
        short_name: "AppName",
        description: "Your App Description",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/favicon.jpeg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/favicon.jpeg",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
