import { ImageResponse } from "@vercel/og";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
export const GET: APIRoute = async ({ params }) => {
  // Make sure the font exists in the specified path:

  const fontData = await fetch(
    new URL("/public/fonts/Michroma-Regular.ttf", import.meta.url)
  ).then((res) => {
    console.log(res.arrayBuffer());
    return res.arrayBuffer;
  });
  return new Response(
    JSON.stringify({
      fontData,
    }),
    {
      status: 200,
      statusText: "OK",
    }
  );
};
