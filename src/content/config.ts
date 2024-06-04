// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const projectCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      preview: image(),
      tags: z.array(z.string()),
      demoLink: z.string(),
    }),
});

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      preview: image(),
      tags: z.array(z.string()),
    }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  project: projectCollection,
  blog: blogCollection,
};
