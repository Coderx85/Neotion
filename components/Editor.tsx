'use client';

import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface EditorProps {
  onChangeAction: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

/**
 * Editor component for displaying and editing text content.
 *
 * @param onChangeAction - Callback function called when the content changes.
 * @param initialContent - The initial content to display in the editor. Defaults to an empty string.
 * @param editable - Determines if the editor is editable or read-only. Defaults to true.
 *
 * When `editable` is false, the content is displayed as formatted, non-editable text.
 * When `editable` is true, a textarea is rendered for editing the content.
 */

export function Editor({
  onChangeAction,
  initialContent = '',
  editable = true,
}: EditorProps) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    onChangeAction(value);
  };

  if (!editable) {
    return (
      <div className="prose prose-stone dark:prose-invert max-w-none">
        <div className="whitespace-pre-wrap text-sm">
          {content || 'Empty page'}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Textarea
        value={content}
        onChange={handleChange}
        placeholder="Start writing..."
        className="min-h-[200px] resize-none border-none focus-visible:ring-0 text-sm p-0 bg-transparent"
      />
    </div>
  );
}
