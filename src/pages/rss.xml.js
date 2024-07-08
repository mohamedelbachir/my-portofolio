import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
export async function GET(context) {
  const blog = await getCollection("blog");
  return rss({
    title: "MOHAMED EL BACHIR | BACHDEV BLOG",
    description: "list of blog where i share my tought",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/blog/[slug]` routes
      trailingSlash: false,
      link: `/blog/${post.slug}/`,
    })),
  });
}
