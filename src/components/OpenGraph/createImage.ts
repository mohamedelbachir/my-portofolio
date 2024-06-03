import fs from "fs/promises";
import satori from "satori";
import sharp from "sharp";

export async function SVG(component: JSX.Element) {
  return await satori(component, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Michroma",
        data: await fs.readFile("./public/fonts/Michroma-Regular.ttf"),
      },
      {
        name: "TitilliumWeb",
        data: await fs.readFile("./public/fonts/TitilliumWeb-Regular.ttf"),
      },
    ],
  });
}

export async function PNG(component: JSX.Element) {
  return await sharp(Buffer.from(await SVG(component)))
    .png()
    .toBuffer();
}
