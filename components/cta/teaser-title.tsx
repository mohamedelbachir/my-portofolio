'use client';

import NumberFlow from '@number-flow/react';
import { useEffect, useRef, useState } from 'react';

type TeaserTitleProps = {
  contacts: number;
  title: string;
};

export const TeaserTitle = ({ contacts, title }: TeaserTitleProps) => {
  const [count, setCount] = useState(2000);
  const h2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setCount(contacts);
          observer.disconnect(); // Stop observing once triggered
        }
      },
      { threshold: 1 } // Trigger when at least 10% of the element is visible
    );

    if (h2Ref.current) {
      observer.observe(h2Ref.current);
    }

    return () => {
      if (h2Ref.current) {
        observer.unobserve(h2Ref.current);
      }
    };
  }, [contacts]);

  const parts = title.split('[count]');

  return (
    <h2 ref={h2Ref} className="font-bold text-2xl tracking-tight sm:text-3xl">
      {parts[0]}
      <NumberFlow value={count} />
      {parts[1]}
    </h2>
  );
};
