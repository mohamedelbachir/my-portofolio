import { Section } from '@/components/section';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { certifications } from '@/lib/data';
import { Award, ExternalLink } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Badge } from '@/components/ui/badge';
import { getTranslations } from 'next-intl/server';

export const Certifications = async () => {
  const t = await getTranslations('About.certifications');

  if (!certifications || certifications.length === 0) return null;

  return (
    <Section className={cn('flex flex-col gap-8 px-4 py-8', 'sm:px-8')}>
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        className="px-4"
      >
        <h2 className="font-bold text-2xl tracking-tight">{t('title')}</h2>
        <p className="text-muted-foreground text-sm">
          {t('subtitle')}
        </p>
      </ViewAnimation>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
        {certifications.map((cert, index) => (
          <ViewAnimation
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            delay={index * 0.1}
          >
            <Link 
              href={cert.url} 
              target="_blank" 
              className="group block h-full"
            >
              <div className="relative flex h-full flex-col justify-between gap-4 rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:bg-muted/50">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                     <Award className="size-8 text-primary opacity-80" />
                     <ExternalLink className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold leading-tight group-hover:underline decoration-primary/50 underline-offset-4">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                   <Badge variant="secondary" className="text-xs font-normal">
                      {cert.date}
                   </Badge>
                </div>
              </div>
            </Link>
          </ViewAnimation>
        ))}
      </div>
    </Section>
  );
};
