'use client';

import React from 'react';
import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react';
import { cn } from '@/utils/lib';

interface FormattingToolbarProps {
  editor: Editor;
  className?: string;
}

export function FormattingToolbar({
  editor,
  className,
}: FormattingToolbarProps) {
  if (!editor) return null;

  const isActive = (format: string, attributes?: any) => {
    if (attributes) {
      return editor.isActive(format, attributes);
    }
    return editor.isActive(format);
  };

  const formatButtons = [
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      active: isActive('bold'),
      label: 'Bold (Ctrl+B)',
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: isActive('italic'),
      label: 'Italic (Ctrl+I)',
    },
    {
      icon: Underline,
      action: () => editor.chain().focus().toggleUnderline().run(),
      active: isActive('underline'),
      label: 'Underline (Ctrl+U)',
    },
    {
      icon: Strikethrough,
      action: () => editor.chain().focus().toggleStrike().run(),
      active: isActive('strike'),
      label: 'Strikethrough',
    },
    {
      icon: Code,
      action: () => editor.chain().focus().toggleCode().run(),
      active: isActive('code'),
      label: 'Inline Code',
    },
  ];

  const headingButtons = [
    {
      icon: Heading1,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: isActive('heading', { level: 1 }),
      label: 'Heading 1',
    },
    {
      icon: Heading2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: isActive('heading', { level: 2 }),
      label: 'Heading 2',
    },
    {
      icon: Heading3,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: isActive('heading', { level: 3 }),
      label: 'Heading 3',
    },
  ];

  const listButtons = [
    {
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: isActive('bulletList'),
      label: 'Bullet List',
    },
    {
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: isActive('orderedList'),
      label: 'Numbered List',
    },
    {
      icon: Quote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      active: isActive('blockquote'),
      label: 'Quote',
    },
  ];

  const linkButton = {
    icon: Link,
    action: () => {
      const url = window.prompt('Enter URL:');
      if (url) {
        editor.chain().focus().setLink({ href: url }).run();
      }
    },
    active: isActive('link'),
    label: 'Add Link',
  };
  return (
    <div className={cn('formatting-toolbar', className)}>
      {/* Text Formatting */}
      <div className="toolbar-section">
        {formatButtons.map((button, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={button.action}
            className={cn('toolbar-button', button.active && 'active')}
            title={button.label}
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      <div className="toolbar-divider" />

      {/* Headings */}
      <div className="toolbar-section">
        {headingButtons.map((button, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={button.action}
            className={cn('toolbar-button', button.active && 'active')}
            title={button.label}
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      <div className="toolbar-divider" />

      {/* Lists and Quotes */}
      <div className="toolbar-section">
        {listButtons.map((button, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={button.action}
            className={cn('toolbar-button', button.active && 'active')}
            title={button.label}
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      <div className="toolbar-divider" />

      {/* Link */}
      <Button
        variant="ghost"
        size="sm"
        onClick={linkButton.action}
        className={cn('toolbar-button', linkButton.active && 'active')}
        title={linkButton.label}
      >
        <linkButton.icon className="h-4 w-4" />
      </Button>
    </div>
  );
}
