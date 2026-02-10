import { MetadataRoute } from "next";
import { getSortedPostsData } from "@/lib/blog";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://bachdev.vercel.app";

  const locales = routing.locales;
  const defaultLocale = routing.defaultLocale;

  const routes = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/projects",
    "/stack",
    "/work",
  ];

  const posts = getSortedPostsData();

  const getAlternates = (path: string) => {
    const languages: Record<string, string> = {};
    locales.forEach((locale) => {
      languages[locale] = `${baseUrl}/${locale}${path}`;
    });
    return { languages };
  };

  const staticEntries = routes.map((route) => {
    return {
      url: `${baseUrl}/${defaultLocale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
      alternates: getAlternates(route),
    };
  });

  const postEntries = posts.map((post) => {
    const route = `/blog/${post.slug}`;
    return {
      url: `${baseUrl}/${defaultLocale}${route}`,
      lastModified: new Date(post.pubDate),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: getAlternates(route),
    };
  });

  return [...staticEntries, ...postEntries];
}
