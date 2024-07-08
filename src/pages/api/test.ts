/* import satori from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import OpenSans from "./_fonts/Michroma-Regular.ttf";
import type { ReactNode } from "react";
export async function GET() {
  const out = html`<div tw="flex flex-col w-full h-full bg-white">
    <h1 tw="text-6xl text-center">Hello World</h1>
  </div>`;

  let svg = await satori(out as ReactNode, {
    fonts: [
      {
        name: "Open Sans",
        data: Buffer.from(OpenSans),
        style: "normal",
      },
    ],
    height: 630,
    width: 1200,
  });
  const resvg = new Resvg(svg);
  const image = resvg.render();
  return new Response(image.asPng(), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
 */
