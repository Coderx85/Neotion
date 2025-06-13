'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/utils/lib';

interface EditorProps {
  onChangeAction: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export function Editor({
  onChangeAction,
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
    onChangeAction(value);
  };

  if (!editable) {
    return (
      <div className="prose prose-stone dark:prose-invert max-w-none">
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {content || (
            <div className="text-muted-foreground italic">Empty page</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Type '/' for commands, or start writing..."
        className={cn(
          'w-full min-h-[400px] resize-none border-none outline-none',
          'bg-transparent text-sm leading-relaxed',
          'placeholder:text-muted-foreground/60',
          'focus:outline-none focus:ring-0',
          'font-normal tracking-normal'
        )}
        style={{
          fontSize: '16px',
          lineHeight: '1.6',
          fontFamily: 'inherit',
        }}
      />
    </div>
  );
}
