export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  content: string;
  category: TemplateCategory;
  tags: string[];
  author: User;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
}

export type TemplateCategory = 
  | 'chain-of-thought'
  | 'few-shot'
  | 'zero-shot'
  | 'role-playing'
  | 'structured-output'
  | 'custom';

export interface SyntaxToken {
  type: TokenType;
  value: string;
  index: number;
}

export type TokenType = 
  | 'heading'
  | 'separator'
  | 'arrow'
  | 'xml-tag'
  | 'variable'
  | 'accent'
  | 'metaglyph'
  | 'inline-code'
  | 'json'
  | 'decorator'
  | 'text';