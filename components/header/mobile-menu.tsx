'use client';

import { navigation } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { atom, useAtom } from 'jotai';
import { Link } from '@/i18n/routing';
import { ActiveLink } from '../active-link';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';

export const mobileMenuOpen = atom(false);

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useAtom(mobileMenuOpen);
  const t = useTranslations('Navigation');
  const tHero = useTranslations('Hero');

  return (
    <div
      className={cn(
        'fixed top-[53px] right-0 left-0 z-50 flex h-[calc(100vh-53px)] flex-col gap-4 bg-backdrop p-4 md:p-8',
        'sm:top-[69px] sm:h-[calc(100vh-69px)]',
        isOpen ? 'flex' : 'hidden'
      )}
    >
      {navigation.map((link) => (
        <ActiveLink
          key={link.href}
          href={link.href}
          onClick={() => setIsOpen(false)}
        >
          {t(link.label.toLowerCase())}
        </ActiveLink>
      ))}
      <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
        <Link href="/contact">{tHero('contact')}</Link>
      </Button>
    </div>
  );
};
