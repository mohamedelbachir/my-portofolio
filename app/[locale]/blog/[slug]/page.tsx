import { Prose } from "@/components/prose";
import { Section } from "@/components/section";
import { HeroSection } from "@/components/sections/hero";
import { getPostData, getHeadings } from "@/lib/blog";
import { cn, slugify } from "@/lib/utils";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CodeSnippet } from "@/components/code-snippet";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Logo from "@/components/header/elbachir.jpg";
import { TableOfContents } from "../components/table-of-contents";
import { ContentType } from "@/types";
import { getPostOgImageUrl } from "@/helpers/post";
import WithReactions from "@/components/layouts/WithReactions";

type BlogPostProps = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export const generateMetadata = async ({ params }: BlogPostProps) => {
  const { slug, locale } = await params;
  try {
    const post = getPostData(slug, locale);

    if (!post) {
      return {};
    }

    const ogImage = getPostOgImageUrl({
      title: post.title,
      category: "Blog",
      tags: post.tags,
      date: post.pubDate,
      lang: post.lang as "en" | "id",
    });

    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.pubDate,
        authors: ["Mohamed El Bachir"],
        images: [
          {
            url: ogImage.default,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: [ogImage.default],
      },
    };
  } catch {
    return {};
  }
};

const BlogPost = async ({ params }: BlogPostProps) => {
  const { slug, locale } = await params;
  const t = await getTranslations("Blog");

  const post = getPostData(slug, locale);

  if (!post) {
    return notFound();
  }

  const headings = getHeadings(post.content);

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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12 max-w-5xl mx-auto">
          <Prose className="w-full">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h2({ children }) {
                  const id = slugify(String(children));
                  return <h2 id={id}>{children}</h2>;
                },
                h3({ children }) {
                  const id = slugify(String(children));
                  return <h3 id={id}>{children}</h3>;
                },
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  const language = match ? match[1] : "";
                  const code = String(children).replace(/\n$/, "");

                  if (!inline && language) {
                    return <CodeSnippet language={language} code={code} />;
                  }

                  return (
                    <code
                      className={cn(
                        "rounded bg-muted px-1.5 py-0.5 font-mono text-sm before:content-none after:content-none",
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
            <WithReactions
              contentType={ContentType.POST}
              contentTitle={post.title}
            />
          </Prose>
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={headings} title={t("toc")} />
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
};

export default BlogPost;
