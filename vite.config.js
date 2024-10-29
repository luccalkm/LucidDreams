import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      clientPort: 443, // Run the websocket server on the SSL port
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Meu PWA",
        short_name: "PWA",
        description: "Meu Progressive Web App",
        theme_color: "#ffffff",
        icons: [
          {
            src: "https://cdn.glitch.global/6db14119-43b6-433c-a071-924b6c869839/144-144.jpeg?v=1649263127255",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "https://cdn.glitch.global/6db14119-43b6-433c-a071-924b6c869839/144-144.jpeg?v=1649263127255",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "https://cdn.glitch.global/6db14119-43b6-433c-a071-924b6c869839/144-144.jpeg?v=1649263127255",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
