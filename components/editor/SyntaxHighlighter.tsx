
'use client';

import React, { useMemo } from 'react';
import { tokenize } from '@/lib/syntax/tokens';
import { SyntaxToken } from '@/types';

interface SyntaxHighlighterProps {
  text: string;
  className?: string;
}

const TOKEN_STYLES: Record<string, React.CSSProperties> = {
  heading: {
    color: '#2d3748',
    fontWeight: 'bold',
    fontSize: '1.1em',
  },
  separator: {
    color: '#a0aec0',
  },
  arrow: {
    color: '#d53f8c',
    fontWeight: 'bold',
  },
  'xml-tag': {
    color: '#2b6cb0',
  },
  variable: {
    color: '#d69e2e',
    backgroundColor: '#fefcbf',
    padding: '2px 4px',
    borderRadius: '3px',
  },
  accent: {
    color: '#c53030',
    fontWeight: 'bold',
  },
  metaglyph: {
    color: '#805ad5',
    fontSize: '1.2em',
  },
  'inline-code': {
    color: '#2f855a',
    backgroundColor: '#f0fff4',
    padding: '2px 4px',
    borderRadius: '3px',
    fontFamily: 'monospace',
  },
  json: {
    color: '#2b6cb0',
  },
  decorator: {
    color: '#00a3c4',
    fontWeight: 'bold',
  },
  text: {
    color: '#4a5568',
  },
};

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  text,
  className = '',
}) => {
  const highlightedContent = useMemo(() => {
    if (!text) return null;

    const tokens = tokenize(text);
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    tokens.forEach((token: SyntaxToken, idx: number) => {
      // Add text before this token
      if (token.index > lastIndex) {
        elements.push(
          <span
            key={`text-${lastIndex}`}
            style={TOKEN_STYLES.text}
          >
            {text.slice(lastIndex, token.index)}
          </span>
        );
      }

      // Add the token
      elements.push(
        <span
          key={`token-${idx}`}
          style={TOKEN_STYLES[token.type]}
          data-token-type={token.type}
        >
          {token.value}
        </span>
      );

      lastIndex = token.index + token.value.length;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(
        <span
          key={`text-${lastIndex}`}
          style={TOKEN_STYLES.text}
        >
          {text.slice(lastIndex)}
        </span>
      );
    }

    return elements;
  }, [text]);

  return (
    <div
      className={`syntax-highlighter bg-gray-50 p-4 rounded-md font-mono text-sm ${className}`}
      aria-label="Syntax highlighted prompt"
    >
      <pre className="whitespace-pre-wrap break-words">
        <code>{highlightedContent || text}</code>
      </pre>
    </div>
  );
};