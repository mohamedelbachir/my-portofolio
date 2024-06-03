import satori from "satori";
import { html } from "satori-html";
import { readFileSync } from "fs";
import sharp from "sharp";
import { basename } from "path";
import type { ReactNode } from "react";
import type { APIRoute, MarkdownInstance } from "astro";

export const generateOGImage = async (postData: any) => {
  // HTML template for OG image
  const markup = html(`
    <div
      style="height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: rgb(45,26,84); font-size: 32px; font-weight: 600;"
    >
      <div
        style="font-size: 70px; margin-top: 38px; display: flex; flex-direction: column; color: white;"
      >
        ${postData.frontmatter.title}
      </div>
    </div>
  `);

  // Render HTML template to SVG
  const svg = await satori(markup as ReactNode, {
    width: 1200,
    height: 630,
    fonts: [],
  });

  // Convert SVG to PNG
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return pngBuffer;
};

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

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  const postData = (await post.loadPost()) as MarkdownInstance<
    Record<string, any>
  >;

  try {
    // Generate OG image with dynamic content
    const ogImageBuffer = await generateOGImage(postData);

    // Serve the image
    return new Response(ogImageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "s-maxage=1, stale-while-revalidate=59",
      },
    });
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
