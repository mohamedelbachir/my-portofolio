import { cn } from '@/lib/utils';
import { ViewAnimation } from '../../providers/view-animation';
import { Links } from './links';
import { Status } from './status';
import { ThemeSwitcher } from './theme-switcher';
import { getTranslations } from 'next-intl/server';

export const Footer = async () => {
  const t = await getTranslations('Footer');

  return (
    <footer
      className={cn(
        'container mx-auto flex flex-col gap-4 px-4 py-6',
        'sm:gap-8 sm:px-8 sm:py-10'
      )}
    >
      <Links />
      <div className="grid items-center gap-4 border-t pt-6 sm:grid-cols-3">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.4}
        >
          <Status />
        </ViewAnimation>
        <div className="flex items-center sm:justify-center">
          <ViewAnimation
            initial={{ opacity: 0, translateY: -8 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            delay={0.8}
          >
            <p className="whitespace-nowrap text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Mohamed El Bachir. {t('rights')}
            </p>
          </ViewAnimation>
        </div>
        <div className="flex items-center sm:justify-end">
          <ViewAnimation
            initial={{ opacity: 0, translateY: -8 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            delay={1.2}
          >
            <ThemeSwitcher />
          </ViewAnimation>
        </div>
      </div>
    </footer>
  );
};
