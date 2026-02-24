'use client';

import { useTheme } from 'next-themes';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type CodeSnippetClientProps = {
  dark: string;
  light: string;
  code: string;
};

export const CodeSnippetClient = ({ dark, light, code }: CodeSnippetClientProps) => {
  const { theme } = useTheme();
  const [copied, setState] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setState(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setState(false), 2000);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="group relative">
      <div
        // biome-ignore lint/security/noDangerouslySetInnerHtml: "injecting code"
        dangerouslySetInnerHTML={{ __html: theme === 'dark' ? dark : light }}
      />
      <button
        type="button"
        onClick={copyToClipboard}
        className={cn(
          'absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-md border bg-background opacity-0 transition-opacity group-hover:opacity-100',
          copied && 'border-success text-success'
        )}
        aria-label="Copy code"
      >
        {copied ? <CheckIcon size={16} /> : <CopyIcon className="text-muted-foreground" size={16} />}
      </button>
    </div>
  );
};
