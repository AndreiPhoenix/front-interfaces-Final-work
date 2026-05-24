

import { TokenType, SyntaxToken } from '@/types';

export const SYNTAX_PATTERNS: Array<{
  type: TokenType;
  pattern: RegExp;
}> = [
  { type: 'heading', pattern: /^##\s+.+$/gm },
  { type: 'separator', pattern: /^—+$/gm },
  { type: 'arrow', pattern: /→/g },
  { type: 'xml-tag', pattern: /<\/?[\w-]+>/g },
  { type: 'variable', pattern: /\{\{[\w\s]+\}\}/g },
  { type: 'accent', pattern: /\b[A-Z]{2,}\b/g },
  { type: 'metaglyph', pattern: /[∈∩∪¬⊕]/g },
  { type: 'inline-code', pattern: /`[^`]+`/g },
  { type: 'json', pattern: /"[^"]+":\s*"[^"]*"/g },
  { type: 'decorator', pattern: /\+\+\+[A-Za-z]+/g },
];

export const tokenize = (text: string): SyntaxToken[] => {
  const tokens: SyntaxToken[] = [];
  const matched = new Set<number>();

  // Find all matches for each pattern
  SYNTAX_PATTERNS.forEach(({ type, pattern }) => {
    let match: RegExpExecArray | null;
    const regex = new RegExp(pattern.source, pattern.flags);
    
    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      
      // Check for overlapping matches
      let hasOverlap = false;
      for (let i = start; i < end; i++) {
        if (matched.has(i)) {
          hasOverlap = true;
          break;
        }
      }
      
      if (!hasOverlap) {
        tokens.push({
          type,
          value: match[0],
          index: start,
        });
        
        for (let i = start; i < end; i++) {
          matched.add(i);
        }
      }
    }
  });

  return tokens.sort((a, b) => a.index - b.index);
};