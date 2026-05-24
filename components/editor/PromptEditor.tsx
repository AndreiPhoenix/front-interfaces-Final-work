
'use client';

import React, { useState, useCallback, useRef } from 'react';
import { SyntaxHighlighter } from '@/components/editor/SyntaxHighlighter';

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
}

export const PromptEditor: React.FC<PromptEditorProps> = ({
  value,
  onChange,
  placeholder = 'Enter your prompt template...',
  label = 'Prompt Template',
  error,
  required = false,
}) => {
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const insertSyntax = useCallback(
    (syntaxType: string) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = value.substring(start, end);

      let newText = '';
      let cursorOffset = 0;

      switch (syntaxType) {
        case 'heading':
          newText = `## ${selectedText || 'Heading'}`;
          cursorOffset = 3;
          break;
        case 'variable':
          newText = `{{${selectedText || 'variable'}}}`;
          cursorOffset = 2;
          break;
        case 'xml-tag':
          newText = `<${selectedText || 'tag'}>`;
          cursorOffset = 1;
          break;
        case 'inline-code':
          newText = `\`${selectedText || 'code'}\``;
          cursorOffset = 1;
          break;
        case 'accent':
          newText = (selectedText || 'ACCENT').toUpperCase();
          break;
        case 'arrow':
          newText = ' → ';
          cursorOffset = 3;
          break;
        case 'metaglyph':
          newText = '⊕';
          cursorOffset = 1;
          break;
        case 'separator':
          newText = '\n—\n';
          cursorOffset = 3;
          break;
        case 'json':
          newText = `"${selectedText || 'key'}": "value"`;
          cursorOffset = 1;
          break;
        case 'decorator':
          newText = `+++${selectedText || 'Format'}`;
          cursorOffset = 3;
          break;
        default:
          return;
      }

      const updatedValue = value.substring(0, start) + newText + value.substring(end);
      onChange(updatedValue);

      // Restore cursor position after React re-render
      setTimeout(() => {
        textarea.focus();
        const newPosition = start + (selectedText ? newText.length : cursorOffset);
        textarea.setSelectionRange(newPosition, newPosition);
      }, 0);
    },
    [value, onChange]
  );

  const syntaxButtons = [
    { label: 'Heading', value: 'heading', symbol: '##' },
    { label: 'Variable', value: 'variable', symbol: '{{}}' },
    { label: 'XML Tag', value: 'xml-tag', symbol: '<>' },
    { label: 'Code', value: 'inline-code', symbol: '``' },
    { label: 'ACCENT', value: 'accent', symbol: 'A' },
    { label: 'Arrow', value: 'arrow', symbol: '→' },
    { label: 'Metaglyph', value: 'metaglyph', symbol: '∈' },
    { label: 'Separator', value: 'separator', symbol: '—' },
    { label: 'JSON', value: 'json', symbol: '{}' },
    { label: 'Decorator', value: 'decorator', symbol: '+++' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="prompt-editor"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          {isPreview ? 'Edit' : 'Preview'}
        </button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        {isPreview ? (
          <SyntaxHighlighter text={value} className="min-h-[200px]" />
        ) : (
          <>
            <div
              className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b"
              role="toolbar"
              aria-label="Syntax insertion tools"
            >
              {syntaxButtons.map((btn) => (
                <button
                  key={btn.value}
                  type="button"
                  onClick={() => insertSyntax(btn.value)}
                  className="px-2 py-1 text-xs font-medium text-gray-700 bg-white border rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  title={`Insert ${btn.label}`}
                  aria-label={`Insert ${btn.label}`}
                >
                  {btn.symbol}
                </button>
              ))}
            </div>
            <textarea
              ref={textareaRef}
              id="prompt-editor"
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              rows={10}
              className="w-full px-3 py-2 text-sm font-mono border-0 focus:ring-0 focus:outline-none resize-y"
              aria-invalid={!!error}
              aria-describedby={error ? 'editor-error' : undefined}
            />
          </>
        )}
      </div>
      {error && (
        <p id="editor-error" className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};