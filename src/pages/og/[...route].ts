import { getCollection } from "astro:content";

// Assuming you have a collection named "blog"
const blogs = await getCollection("blog");

// Transform the collection into an object
const pages = Object.fromEntries(
  blogs.map(({ id, slug, data }) => [id, { data, slug }])
);

import { OGImageRoute } from "astro-og-canvas";

export const { getStaticPaths, GET } = OGImageRoute({
  // The name of your dynamic route segment.
  // In this case it’s `route`, because the file is named `[...route].ts`.
  param: "route",

  // A collection of pages to generate images for.
  pages,

  // For each page, this callback will be used to customize the OG image.
  getImageOptions: async (_, { data, slug }: (typeof pages)[string]) => {
    return {
      title: `${data.title}`,
      description: data.description,
      border: { color: [37, 99, 235], width: 20, side: "inline-start" },
      bgGradient: [
        [6, 38, 45],
        [8, 3, 2],
      ],
    };
  },
});
