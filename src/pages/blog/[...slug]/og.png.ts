import {
  getCollection,
  getEntryBySlug,
  type CollectionEntry,
} from "astro:content";
import fs from "fs";
import path from "path";
import { ImageResponse } from "@vercel/og";
import { html } from "./html";
import type { JSXElementConstructor, ReactElement } from "react";
interface Props {
  params: { slug: string };
  props: { post: CollectionEntry<"blog"> };
}

export async function GET({ props, params }: Props) {
  const post = await getEntryBySlug("blog", params.slug as string);

  // using custom font files
  const MichromaRegular = fs.readFileSync(
    path.resolve("./public/fonts/Michroma-Regular.ttf")
  );
  const TitilliumWebRegular = fs.readFileSync(
    path.resolve("./public/fonts/TitilliumWeb-Regular.ttf")
  );

  // post cover with Image is pretty tricky for dev and build phase

  const postCover = fs.readFileSync(
    process.env.NODE_ENV === "development"
      ? post!.data.image.src.replace("/@fs/C:", "").split("?")[0]
      : path.resolve(post!.data.image.src.replace("/", "dist/"))
  );

  // Astro doesn't support tsx endpoints so usign React-element objects
  /*  
 const html = {
    type: "div",
    props: {
      children: [
        {
          type: "div",
          props: {
            // using tailwind
            tw: "w-[200px] h-[200px] flex rounded-3xl overflow-hidden",
            children: [
              {
                type: "img",
                props: {
                  src: postCover.buffer,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            tw: "pl-10 shrink flex",
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "48px",
                    fontFamily: "DM Sans Bold",
                  },
                  children: post?.data.title,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            tw: "absolute right-[40px] bottom-[40px] flex items-center",
            children: [
              {
                type: "div",
                props: {
                  tw: "text-blue-600 text-3xl",
                  style: {
                    fontFamily: "DM Sans Bold",
                  },
                  children: "MOHAMED EL BACHIR",
                },
              },
              {
                type: "div",
                props: {
                  tw: "px-2 text-3xl",
                  style: {
                    fontSize: "30px",
                  },
                  children: "|",
                },
              },
              {
                type: "div",
                props: {
                  tw: "text-3xl",
                  children: "Blog",
                },
              },
            ],
          },
        },
      ],
      tw: "w-full h-full flex items-center justify-center relative px-22  ",
      style: {
        backgroundColor: "#f7f8e8",
        fontFamily: "DM Sans Regular",
      },
    },
  }; 
  */
  const myElement = {
    type: "div",
    props: {
      tw: "flex h-full w-full items-center justify-center",
      style: {
        letterSpacing: "-.02em",
        fontWeight: 700,
        background: "white",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              left: 42,
              top: 42,
              position: "absolute",
              display: "flex",
              alignItems: "center",
            },
            children: [
              {
                type: "span",
                props: {
                  style: {
                    width: 24,
                    height: 24,
                    background: "black",
                  },
                },
              },
              {
                type: "span",
                props: {
                  style: {
                    marginLeft: 8,
                    fontSize: 20,
                  },
                  children: "rauchg.com",
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            tw: "flex flex-wrap justify-center",
            style: {
              padding: "20px 50px",
              margin: "0 42px",
              fontSize: 40,
              maxWidth: 550,
              textAlign: "center",
              backgroundColor: "black",
              color: "white",
              lineHeight: 1.4,
            },
            children: "Making the Web. Faster.",
          },
        },
      ],
    },
  };

  return new ImageResponse(
    html({
      author: "MOHAMED EL BACHIR | BLOG",
      title: post?.data.title!,
      img: postCover.buffer,
    }) as ReactElement<any, string | JSXElementConstructor<any>>,
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Michroma",
          data: MichromaRegular.buffer,
          style: "normal",
        },
        {
          name: "Titillium",
          data: TitilliumWebRegular.buffer,
          style: "normal",
        },
      ],
    }
  );
}
