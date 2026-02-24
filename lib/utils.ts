import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
};

export const parseError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unknown error occurred';
};

export const handleError = (error: unknown) => {
  const message = parseError(error);

  toast.error(message);
};

export const formatDateRange = (
  startDate: string,
  endDate: string | null,
  locale: string
): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;

  const formatter = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  });

  const startFormatted = formatter.format(start);
  const endFormatted = end ? formatter.format(end) : (locale === 'fr' ? 'Présent' : 'Present');

  return `${startFormatted} - ${endFormatted}`;
};
