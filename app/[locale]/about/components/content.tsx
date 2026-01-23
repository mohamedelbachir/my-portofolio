import { Prose } from '@/components/prose';
import { Section } from '@/components/section';
import { cn } from '@/lib/utils';
import { ViewAnimation } from '@/providers/view-animation';
import { education } from '@/lib/data';
import { getTranslations } from 'next-intl/server';

export const Content = async () => {
  const t = await getTranslations('About.content');

  return (
    <Section className="grid items-start divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0">
      <div>
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.4}
          className={cn(
            'flex h-full flex-col items-start justify-between gap-4 px-4 py-8',
            'sm:px-8'
          )}
        >
          <div className="flex flex-col gap-2">
            <small className="text-muted-foreground">{t('label')}</small>
            <Prose>
              <h3>{t('title')}</h3>
              <p>
                {t('description')}
              </p>
            </Prose>
          </div>
        </ViewAnimation>
      </div>
      <div className="size-full">
        <ViewAnimation
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="size-full px-4 py-8 sm:px-8"
        >
          <div className="flex flex-col gap-4">
             <h3 className="font-bold text-xl">{t('education')}</h3>
             {education.map((edu) => (
               <div key={edu.id} className="flex flex-col gap-1">
                 <p className="font-semibold">{t(`items.${edu.id}.degree`)}</p>
                 <p className="text-muted-foreground text-sm">{edu.school} &bull; {edu.duration}</p>
               </div>
             ))}
          </div>
        </ViewAnimation>
      </div>
    </Section>
  );
};
