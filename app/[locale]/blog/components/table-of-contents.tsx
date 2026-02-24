'use client';

import { type Heading } from '@/lib/blog';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type TableOfContentsProps = {
  headings: Heading[];
  title: string;
};

export const TableOfContents = ({ headings, title }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="flex flex-col gap-4">
      <p className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <ul className="flex flex-col gap-2">
        {headings.map((heading,i) => (
          <li
            key={i}
            className={cn(
              'text-sm transition-colors hover:text-foreground',
              heading.level === 3 && 'pl-4',
              activeId === heading.id
                ? 'font-medium text-foreground'
                : 'text-muted-foreground'
            )}
          >
            <a
              href={`#${heading.id}`}
              // onClick={(e) => {
              //   e.preventDefault();
              //   document.getElementById(heading.id)?.scrollIntoView({
              //     behavior: 'smooth',
              //   });
              //   history.pushState(null, '', `#${heading.id}`);
              // }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
