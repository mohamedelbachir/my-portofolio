import { Prose } from "@/components/prose";
import { Section } from "@/components/section";
import { HeroSection } from "@/components/sections/hero";
import { getPostData } from "@/lib/blog";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CodeSnippet } from "@/components/code-snippet";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import Logo from "@/components/header/elbachir.jpg";
type BlogPostProps = {
    params: Promise<{
        slug: string;
    }>;
};

export const generateMetadata = async ({ params }: BlogPostProps) => {
    const { slug } = await params;
    try {
        const post = getPostData(slug);
        return {
            title: post?.title,
            description: post?.description,
        };
    } catch {
        return {};
    }
};

const BlogPost = async ({ params }: BlogPostProps) => {
    const { slug } = await params;
    const locale = await getLocale();

    const post = getPostData(slug);

    if (!post) {
        return notFound();
    }

    return (
        <>
            <HeroSection
                title={post.title}
                image={
                    <Image
                        src={Logo}
                        alt=""
                        width={64}
                        height={64}
                        className="size-12 overflow-hidden rounded-full object-cover"
                        priority
                    />
                }
            >
                <p className="mx-auto max-w-4xl sm:text-center">
                    <Balancer className="mt-0">{post.description}</Balancer>
                </p>
                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                    <p>
                        {new Intl.DateTimeFormat(locale, {
                            dateStyle: "medium",
                        }).format(new Date(post.pubDate))}
                    </p>
                </div>
            </HeroSection>
            <Section className={cn("px-4 py-8", "sm:px-8 sm:py-16")}>
                <Prose className="mx-auto max-w-3xl">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            code({
                                node,
                                inline,
                                className,
                                children,
                                ...props
                            }: any) {
                                const match = /language-(\w+)/.exec(
                                    className || "",
                                );
                                const language = match ? match[1] : "";
                                const code = String(children).replace(
                                    /\n$/,
                                    "",
                                );

                                if (!inline && language) {
                                    return (
                                        <CodeSnippet
                                            language={language}
                                            code={code}
                                        />
                                    );
                                }

                                return (
                                    <code
                                        className={cn(
                                            "rounded bg-muted px-1.5 py-0.5 font-mono text-sm",
                                            className,
                                        )}
                                        {...props}
                                    >
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </Prose>
            </Section>
        </>
    );
};

export default BlogPost;
