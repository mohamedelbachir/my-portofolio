import { Section } from '@/components/section';
import { ViewAnimation } from '@/providers/view-animation';
import { Apps } from './components/apps';
import { Hero } from './components/hero';
import { GitHubTeaser } from './components/github-teaser';
import { getTranslations } from 'next-intl/server';

export const generateMetadata = async () => {
  return {
    title: 'Projects',
    description: 'My projects.',
  };
};

const Projects = async () => {
  const t = await getTranslations('Projects.list');

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
    <GitHubTeaser />
  </>
);
};

export default Projects;
