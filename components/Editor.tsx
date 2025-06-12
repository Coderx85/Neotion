'use client';

import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from 'next-themes';

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export function Editor({
  onChange,
  initialContent = '',
  editable = true,
}: EditorProps) {
  const [content, setContent] = useState(initialContent);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    onChange(value);
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
