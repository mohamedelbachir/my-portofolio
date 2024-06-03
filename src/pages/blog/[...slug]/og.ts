import satori from "satori";
import { html } from "satori-html";
import fs from "fs";
import sharp from "sharp";
import path from "path";
import type { ReactNode } from "react";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
export const generateOGImage = async (postData: any) => {
  // HTML template for OG image
  const markup = html(`
    <div
      style="height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: rgb(45,26,84); font-size: 32px; font-weight: 600;"
    >
      <div
        style="font-size: 70px; margin-top: 38px; display: flex; flex-direction: column; color: white;"
      >
        ${postData.title}
      </div>
    </div>
  `);
  const fontFilePath = new URL(
    "../../../../public/fonts/Michroma-Regular.ttf",
    import.meta.url
  );
  console.log(import.meta.url);

  try {
    const fontFile = fs.readFileSync(fontFilePath);
    const svg = await satori(markup as ReactNode, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Michroma-Regular",
          data: fontFile,
          style: "normal",
        },
      ],
    });

    // Convert SVG to PNG
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
    console.log(fontFile);
    return pngBuffer;
  } catch (error) {
    return "file not found : " + error;
  }

  // Render HTML template to SVG
  /* const svg = await satori(markup as ReactNode, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Michroma-Regular",
        data: fontFile,
        style: "normal",
      },
    ],
  });

  // Convert SVG to PNG
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return pngBuffer; */
};

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;
  // Find the slug in content dir
  const blogs = await getCollection("blog");

  const pages = blogs.map((b) => b);

  const post = pages.find((p) => p.slug === String(slug));

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  try {
    // Generate OG image with dynamic content
    const ogImageBuffer = await generateOGImage(post.data);

    // Serve the image
    return new Response(JSON.stringify(ogImageBuffer), {
      status: 200,
      headers: {
        //"Content-Type": "image/png",
        "Content-Type": "text/plain",
        "Cache-Control": "s-maxage=1, stale-while-revalidate=59",
      },
    });
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
