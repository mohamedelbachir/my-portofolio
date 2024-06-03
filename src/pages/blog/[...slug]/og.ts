import satori from "satori";
import { html } from "satori-html";
const fs = require("fs").promises;
import type { APIRoute, MarkdownInstance } from "astro";
import sharp from "sharp";
import { basename } from "path";
import type { ReactNode } from "react";

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;
  // Find the slug in content dir
  const posts: Record<string, () => Promise<any>> = import.meta.glob(
    `./**/*.md`
  );

  const postPaths = Object.entries(posts).map(([path, promise]) => ({
    slug: basename(path).replace(".md", ""),
    loadPost: promise,
  }));

  const post = postPaths.find((p) => p.slug === String(slug));
  let postTitle = `My Blog`; // Default title if post not found
  if (post) {
    const postData = (await post.loadPost()) as MarkdownInstance<
      Record<string, any>
    >;
    postTitle = postData.frontmatter.title;
  }

  const fontFilePath = `${process.cwd()}/public/fonts/TitilliumWeb-Regular.ttf`;
  const fontFile = await fs.readFile(fontFilePath);
  const markup = html(`<div
    style="height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: rgb(45,26,84); font-size: 32px; font-weight: 600;"
  >
    <div
      style="font-size: 70px; margin-top: 38px; display: flex; flex-direction: column; color: white;"
    >
      ${postTitle}
    </div>
  </div>`);
  const svg = await satori(markup as ReactNode, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Optimistic Display",
        data: fontFile,
        style: "normal",
      },
    ],
  });

  const png = sharp(Buffer.from(svg)).png();
  const response = await png.toBuffer();

  return new Response(response, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "s-maxage=1, stale-while-revalidate=59",
    },
  });
};
