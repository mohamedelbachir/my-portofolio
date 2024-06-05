import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import vercel from "@astrojs/vercel/serverless";
import sectionize from "@hbsnow/rehype-sectionize";
import rehypePrettyCode from "rehype-pretty-code";
import theme from "./syntax-theme.json";
import expressiveCode from "astro-expressive-code";
const prettyCodeOptions = {
  theme,
  onVisitHighlightedLine(node) {
    node?.properties?.className?.push("highlighted");
  },
  onVisitHighlightedChars(node) {
    console.log(node);
    node?.properties?.className
      ? node.properties.className.push("highlighted-chars")
      : (node.properties.className = ["highlighted-chars"]);
  },
  tokensMap: {},
};

// https://astro.build/config
export default defineConfig({
  site: "https://bachdev.vercel.app",
  server: {
    port: 8080,
    host: true,
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
  adapter: vercel({
    includeFiles: [
      "./public/fonts/Michroma-Regular.ttf",
      "./public/fonts/TitilliumWeb-Regular.ttf",
    ],
  }),
});
