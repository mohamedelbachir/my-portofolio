import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://bachdev.vercel.app",
  integrations: [
    tailwind(),
    react(),
    mdx(),
    icon({
      include: {
        tabler: ["*"],
      },
    }),
  ],
  output: "server",
  adapter: vercel({
    includeFiles: [
      "./public/fonts/Michroma-Regular.ttf",
      "./public/fonts/TitilliumWeb-Regular.ttf",
    ],
  }),
});
