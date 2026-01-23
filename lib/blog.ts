import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export type Post = {
    slug: string;
    title: string;
    pubDate: string;
    description: string;
    preview: string;
    tags: string[];
    content: string;
};

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .filter((fileName) => {
            const fullPath = path.join(postsDirectory, fileName);
            return (
                fs.statSync(fullPath).isFile() && /\.(md|mdx)$/.test(fileName)
            );
        })
        .map((fileName) => {
            const slug = fileName.replace(/\.(md|mdx)$/, "");
            const fullPath = path.join(postsDirectory, fileName);
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

export function getPostData(slug: string) {
    const decodedSlug = decodeURIComponent(slug);
    const fullPathMd = path.join(postsDirectory, `${decodedSlug}.md`);
    const fullPathMdx = path.join(postsDirectory, `${decodedSlug}.mdx`);

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
        }),
    };
}
