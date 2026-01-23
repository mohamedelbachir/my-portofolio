import { codeToHtml } from 'shiki';
import { CodeSnippetClient } from './client';

type CodeSnippetProps = {
  language: string;
  code: string;
};

export const CodeSnippet = async ({ language, code }: CodeSnippetProps) => {
  const lightHtml = await codeToHtml(code, {
    theme: 'vitesse-light',
    lang: language,
  });
  const darkHtml = await codeToHtml(code, {
    theme: 'vitesse-dark',
    lang: language,
  });

  return <CodeSnippetClient dark={darkHtml} light={lightHtml} code={code} />;
};
