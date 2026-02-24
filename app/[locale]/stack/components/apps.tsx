import { StickyList } from '@/components/sections/sticky-list';
import { stack } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { ExternalLink } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getLocale, getTranslations } from 'next-intl/server';

export const Apps = async () => {
  const locale = (await getLocale()) as 'en' | 'fr';
  const t = await getTranslations('Stack');

  return (
    <>
      {stack.map((group) => (
        <StickyList key={group.category} title={t(`categories.${group.category}`)}>
          <div className="flex flex-col">
            {group.items.map((item, index) => (
              <ViewAnimation
                key={item.name}
                initial={{ opacity: 0, translateY: -8 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                delay={index * 0.05}
                className={cn(
                  'group flex flex-col gap-2 border-b p-4 transition-colors hover:bg-muted/50 sm:p-8',
                  index === group.items.length - 1 && 'border-b-0'
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                  </div>
                  {item.url && (
                    <Link
                      href={item.url}
                      target="_blank"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ExternalLink className="size-4" />
                      <span className="sr-only">Visit {item.name}</span>
                    </Link>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">
                  {item.description[locale]}
                </p>
              </ViewAnimation>
            ))}
          </div>
        </StickyList>
      ))}
    </>
  );
};
