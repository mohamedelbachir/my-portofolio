import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { getSortedPostsData } from '@/lib/blog';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getTranslations, getLocale } from 'next-intl/server';

export const FeaturedPosts = async () => {
  const t = await getTranslations('Sections.Writing');
  const locale = await getLocale();
  const posts = getSortedPostsData().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <Section className="flex flex-col border-t">
      <div className="flex items-center justify-between px-4 py-8 sm:px-8">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-2xl tracking-tight">{t('title')}</h2>
          <p className="text-muted-foreground text-sm">
            {t('subtitle')}
          </p>
        </div>
        <Button variant="ghost" asChild className="group">
          <Link href="/blog">
            {t('readAll')}
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
      <div className="grid divide-y border-t sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block transition-colors hover:bg-muted/50"
          >
            <ViewAnimation
              initial={{ opacity: 0, translateY: 8 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              delay={index * 0.1}
              className={cn(
                'flex flex-col justify-between gap-4 px-4 py-8 h-full',
                'sm:px-8'
              )}
            >
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-lg leading-tight group-hover:underline underline-offset-4 decoration-primary/50">
                  {post.title}
                </h3>
                <Prose className="prose-sm line-clamp-3 text-muted-foreground">
                  {post.description}
                </Prose>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
                 <CalendarDays className="size-3.5" />
                 <time dateTime={post.pubDate}>
                    {new Intl.DateTimeFormat(locale, {
                      dateStyle: 'medium',
                    }).format(new Date(post.pubDate))}
                 </time>
              </div>
            </ViewAnimation>
          </Link>
        ))}
      </div>
    </Section>
  );
};
