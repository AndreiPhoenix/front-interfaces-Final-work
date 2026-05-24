import { tokenize } from '@/lib/syntax/tokens';
import { SyntaxToken } from '@/types';

describe('Syntax Tokenizer', () => {
  describe('tokenize', () => {
    it('should tokenize headings', () => {
      const tokens: SyntaxToken[] = tokenize('## Hello World');
      expect(tokens).toHaveLength(1);
      expect(tokens[0].type).toBe('heading');
      expect(tokens[0].value).toBe('## Hello World');
    });

    it('should tokenize variables', () => {
      const tokens: SyntaxToken[] = tokenize('Hello {{name}}!');
      expect(tokens).toHaveLength(1);
      expect(tokens[0].type).toBe('variable');
    });

    it('should tokenize XML tags', () => {
      const tokens: SyntaxToken[] = tokenize('<system>test</system>');
      expect(tokens).toHaveLength(2);
      expect(tokens[0].type).toBe('xml-tag');
      expect(tokens[0].value).toBe('<system>');
    });

    it('should tokenize arrows', () => {
      const tokens: SyntaxToken[] = tokenize('Step 1 → Step 2');
      expect(tokens).toHaveLength(1);
      expect(tokens[0].type).toBe('arrow');
    });

    it('should tokenize accent words', () => {
      const tokens: SyntaxToken[] = tokenize('This is IMPORTANT');
      expect(tokens).toHaveLength(1);
      expect(tokens[0].type).toBe('accent');
    });

    it('should tokenize inline code', () => {
      const tokens: SyntaxToken[] = tokenize('Use `code` here');
      expect(tokens).toHaveLength(1);
      expect(tokens[0].type).toBe('inline-code');
    });

    it('should handle complex prompts', () => {
      const text = '## Title\nIMPORTANT: Use {{var}}\n`code` and <tag>\n"key": "value"';
      const tokens: SyntaxToken[] = tokenize(text);
      expect(tokens.length).toBeGreaterThan(3);
    });
  });
});