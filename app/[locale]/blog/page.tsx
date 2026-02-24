import { Prose } from "@/components/prose";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ViewAnimation } from "@/providers/view-animation";
import groupBy from "lodash.groupby";
import { Link } from '@/i18n/routing';
import { getTranslations, getLocale } from "next-intl/server";

//import { Prose } from '@/components/prose';
//import { Section } from '@/components/section';
import { getSortedPostsData } from "@/lib/blog";
//import { cn } from '@/lib/utils';
//import { ViewAnimation } from '@/providers/view-animation';
//import groupBy from 'lodash.groupby';
//import Link from 'next/link';

export const generateMetadata = async () => {
    const t = await getTranslations('Blog.metadata');
    return {
        title: t('title'),
        description: t('description'),
    };
};

const Blog = async () => {
    const t = await getTranslations('Blog');
    const locale = await getLocale();
    const posts = getSortedPostsData(locale);

    if (!posts.length) {
        return (
            <Section className="divide-y border-t">
                <div className="px-4 py-8 sm:px-8">
                    <p>{t('empty')}</p>
                </div>
            </Section>
        );
    }

    const postsByYear = groupBy(posts, (post) =>
        new Date(post.pubDate).getFullYear(),
    );

    return (
        <Section className="divide-y border-t">
            {Object.entries(postsByYear)
                .sort((a, b) => Number(b[0]) - Number(a[0]))
                .map(([year, yearPosts]) => (
                    <div
                        className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0"
                        key={year}
                    >
                        <div className="bg-dashed">
                            <div
                                className={cn(
                                    "sticky top-16 px-4 py-8",
                                    "sm:px-8",
                                )}
                            >
                                <h2 className="font-bold text-2xl leading-normal tracking-tight">
                                    {year}
                                </h2>
                            </div>
                        </div>
                        <div className="divide-y sm:col-span-2">
                            {yearPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="block transition-colors hover:bg-muted"
                                >
                                    <ViewAnimation
                                        initial={{ opacity: 0, translateY: -8 }}
                                        whileInView={{
                                            opacity: 1,
                                            translateY: 0,
                                        }}
                                        className={cn(
                                            "flex flex-col gap-2 px-4 py-8",
                                            "sm:px-8",
                                        )}
                                    >
                                        <h2 className="font-bold text-lg leading-normal tracking-tight">
                                            {post.title}
                                        </h2>
                                        <Prose className="prose-sm line-clamp-3">
                                            {post.description}
                                        </Prose>
                                        <small className="text-muted-foreground text-xs">
                                            {new Intl.DateTimeFormat("en-US", {
                                                dateStyle: "medium",
                                            }).format(new Date(post.pubDate))}
                                        </small>
                                    </ViewAnimation>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
        </Section>
    );
};

export default Blog;

//export default Blog;
