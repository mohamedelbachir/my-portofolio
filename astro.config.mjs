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
import partytown from "@astrojs/partytown";
import astroRemark from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://bachdev.vercel.app",
  server: {
    port: 8080,
    host: true
  },
  markdown: {
    rehypePlugins: [sectionize
    /* "rehype-slug",
    ["rehype-autolink-headings", { behavior: "append" }],
    [
      "rehype-toc",
      {
        headings: ["h1", "h2"],
        cssClasses: {
          toc: "fixed w-[23%] top-[5.5rem] nav shape p-2 max-lg:hidden",
          link: "toc-link",
        },
      },
    ], */],
    remarkPlugins: [remarkReadingTime]
    //astroRemark,
  },
  vite: {
    plugins: [rawFonts([".ttf"])],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    }
  },
  integrations: [tailwind(), react(), expressiveCode({
    themes: theme,
    defaultProps: {
      wrap: true,
      preserveIndent: false
    }
  }), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  }), mdx(), icon({
    include: {
      tabler: ["*"],
      "skill-icons": ["*"],
      "vscode-icons": ["file-type-firebase"]
    }
  }), sitemap({
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date('2022-02-24'),
  })],
  output: "server",
  adapter: vercel()
});
function rawFonts(ext) {
  return {
    name: "vite-plugin-raw-fonts",
    transform(_, id) {
      if (ext.some(e => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null
        };
      }
    }
  };
}