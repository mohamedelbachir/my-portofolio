import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { slugify } from "./utils";

const postsDirectory = path.join(process.cwd(), "content/blog");

export type Post = {
    slug: string;
    title: string;
    pubDate: string;
    description: string;
    preview: string;
    tags: string[];
    content: string;
    lang: string;
};

export type Heading = {
    text: string;
    level: number;
    id: string;
};

export function getHeadings(content: string): Heading[] {
    const regex = /^(#{2,3})\s+(.*)$/gm;
    const headings: Heading[] = [];
    let match;

    // biome-ignore lint/suspicious/noAssignInExpressions: "Standard loop pattern for regex"
    while ((match = regex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = slugify(text);

        headings.push({ text, level, id });
    }

    return headings;
}

export function getSortedPostsData(locale: string) {
    const localeDirectory = path.join(postsDirectory, locale);

    if (!fs.existsSync(localeDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(localeDirectory);
    const allPostsData = fileNames
        .filter((fileName) => {
            const fullPath = path.join(localeDirectory, fileName);
            return (
                fs.statSync(fullPath).isFile() && /\.(md|mdx)$/.test(fileName)
            );
        })
        .map((fileName) => {
            const slug = fileName.replace(/\.(md|mdx)$/, "");
            const fullPath = path.join(localeDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const matterResult = matter(fileContents);

            return {
                slug,
                ...(matterResult.data as {
                    title: string;
                    pubDate: string;
                    description: string;
                    preview: string;
                    tags: string[];
                    lang: string;
                }),
            };
        });

    return allPostsData.sort((a, b) => {
        if (a.pubDate < b.pubDate) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getPostData(slug: string, locale: string) {
    const decodedSlug = decodeURIComponent(slug);
    const localeDirectory = path.join(postsDirectory, locale);
    const fullPathMd = path.join(localeDirectory, `${decodedSlug}.md`);
    const fullPathMdx = path.join(localeDirectory, `${decodedSlug}.mdx`);

    let fullPath = fullPathMd;
    if (fs.existsSync(fullPathMd)) {
        fullPath = fullPathMd;
    } else if (fs.existsSync(fullPathMdx)) {
        fullPath = fullPathMdx;
    } else {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
        slug: decodedSlug,
        content: matterResult.content,
        ...(matterResult.data as {
            title: string;
            pubDate: string;
            description: string;
            preview: string;
            tags: string[];
            lang: string;
        }),
    };
}
