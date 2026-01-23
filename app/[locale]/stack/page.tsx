import { Section } from '@/components/section';
import { ViewAnimation } from '@/providers/view-animation';
import { Apps } from './components/apps';
import { Attribution } from './components/attribution';
import { Hero } from './components/hero';
import { getTranslations } from 'next-intl/server';

export const generateMetadata = async () => {
  return {
    title: 'Stack',
    description: 'My tech stack.',
  };
};

const Stack = async () => {
  const t = await getTranslations('Stack.list');

  return (
  <>
    <Hero />
    <Section className="border-t px-4 py-8 sm:px-8">
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
      >
        <h2 className="font-bold text-2xl tracking-tight">{t('title')}</h2>
        <p className="text-muted-foreground text-sm">
          {t('subtitle')}
        </p>
      </ViewAnimation>
    </Section>
    <Apps />
    <Attribution />
  </>
);
};

export default Stack;
