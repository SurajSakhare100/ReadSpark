'use client';

import React, { useState, ComponentPropsWithoutRef } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export default function MarkdownPreview({ content, className = '' }: MarkdownPreviewProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className={`prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code: function CodeBlock({ 
            inline, 
            className, 
            children,
            ...props
          }: ComponentPropsWithoutRef<'code'> & { inline?: boolean }) {
            const match = /language-(\w+)/.exec(className || '');
            const code = String(children).replace(/\n$/, '');

            return !inline && match ? (
              <div className="relative group not-prose">
                <div className="absolute right-2 top-2 z-10">
                  <button
                    onClick={() => handleCopyCode(code)}
                    className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-gray-700/90 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gray-600/90"
                    aria-label={copiedCode === code ? "Copied!" : "Copy code"}
                  >
                    {copiedCode === code ? (
                      <>
                        <Check className="h-3 w-3" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="rounded-lg overflow-hidden">
                  // Update the SyntaxHighlighter component style
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.5rem',
                    }}
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              </div>
            ) : (
              <code {...props} className={`${className} px-1.5 py-0.5 rounded`}>
                {children}
              </code>
            );
          },
          h1: ({ children }) => (
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-6">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="leading-7 [&:not(:first-child)]:mt-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
              {children}
            </ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mt-6 border-l-4 border-gray-300 dark:border-gray-700 pl-6 italic">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="rounded-lg border border-border my-4 max-w-full h-auto"
              loading="lazy"
            />
          ),
          table: ({ children }) => (
            <div className="my-6 w-full overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border px-4 py-2 text-left font-semibold bg-muted">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-4 py-2">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}