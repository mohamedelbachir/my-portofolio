import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import vercel from "@astrojs/vercel/serverless";
import sectionize from "@hbsnow/rehype-sectionize";
import theme from "./syntax-theme.json";
import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://bachdev.vercel.app",
  server: {
    port: 8080,
    host: true,
  },
  markdown: {
    rehypePlugins: [sectionize],
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [
    tailwind(),
    react(),
    expressiveCode({
      themes: theme,
      defaultProps: {
        wrap: true,
        preserveIndent: false,
      },
    }),

    mdx(),
    icon({
      include: {
        tabler: ["*"],
      },
    }),
  ],
  output: "server",
  adapter: vercel(),
});
