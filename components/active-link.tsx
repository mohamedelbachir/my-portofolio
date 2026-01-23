'use client';

import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import type { ComponentProps, ReactNode } from 'react';

type ActiveLinkProps = ComponentProps<typeof Link> & {
  children: ReactNode;
  href: string;
};

export const ActiveLink = ({ href, children, ...props }: ActiveLinkProps) => {
  const pathname = usePathname();
  const active = href === '/' ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        'text-muted-foreground text-sm transition-colors',
        'hover:text-foreground',
        active && 'font-medium text-foreground'
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
