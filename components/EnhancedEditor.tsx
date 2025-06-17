'use client';

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Link from '@tiptap/extension-link';
import { cn } from '@/utils/lib';
import { TipTapEditorProps } from '@/types/editor';
import { SlashCommandMenu } from './SlashCommandMenu';

export function EnhancedEditor({
  onChangeAction,
  initialContent = '',
  editable = true,
  placeholder = "Type '/' for commands, or start writing...",
  className,
  autoFocus = false,
}: TipTapEditorProps) {
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // We'll use custom heading
        bulletList: false, // We'll use custom bullet list
        orderedList: false, // We'll use custom ordered list
        listItem: false, // We'll use custom list item
        codeBlock: false, // We'll use custom code block
        blockquote: false, // We'll use custom blockquote
        bold: false, // We'll use custom bold
        italic: false, // We'll use custom italic
        strike: false, // We'll use custom strike
      }),
      Placeholder.configure({
        placeholder,
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
      Typography,
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {
          class: 'notion-heading',
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'notion-bullet-list',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'notion-ordered-list',
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: 'notion-list-item',
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'notion-code-block',
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: 'notion-blockquote',
        },
      }),
      Bold.configure({
        HTMLAttributes: {
          class: 'notion-bold',
        },
      }),
      Italic.configure({
        HTMLAttributes: {
          class: 'notion-italic',
        },
      }),
      Underline.configure({
        HTMLAttributes: {
          class: 'notion-underline',
        },
      }),
      Strike.configure({
        HTMLAttributes: {
          class: 'notion-strike',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'notion-link',
        },
      }),
    ],
    content: initialContent,
    editable,
    autofocus: autoFocus,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChangeAction(html); // Check for slash command
      const { from } = editor.state.selection;
      const textBefore = editor.state.doc.textBetween(
        Math.max(0, from - 20),
        from,
        ''
      );
      const slashIndex = textBefore.lastIndexOf('/');

      if (slashIndex !== -1 && slashIndex === textBefore.length - 1) {
        // Show slash menu
        const coords = editor.view.coordsAtPos(from);
        setSlashMenuPosition({
          x: coords.left,
          y: coords.bottom + 10,
        });
        setShowSlashMenu(true);
      } else {
        setShowSlashMenu(false);
      }
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl',
          'prose-stone dark:prose-invert max-w-none',
          'focus:outline-none min-h-[400px] p-4',
          'text-foreground',
          className
        ),
      },
    },
  });

  // Update content when initialContent changes
  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);
  if (!editor) {
    return (
      <div className="editor-loading">
        <div className="editor-loading-spinner"></div>
      </div>
    );
  }

  if (!editable) {
    return (
      <div className="editor-readonly">
        <div
          className="prose prose-stone dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
        />
      </div>
    );
  }

  return (
    <div className="editor-container">
      <div className="editor-content">
        <EditorContent
          editor={editor}
          className={cn(
            'w-full',
            '[&_.ProseMirror]:outline-none',
            '[&_.ProseMirror]:border-none',
            className
          )}
        />
      </div>

      {showSlashMenu && (
        <SlashCommandMenu
          editor={editor}
          isOpen={showSlashMenu}
          onClose={() => setShowSlashMenu(false)}
          position={slashMenuPosition}
        />
      )}
    </div>
  );
}
