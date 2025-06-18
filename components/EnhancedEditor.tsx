'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  const [slashQuery, setSlashQuery] = useState(''); // Track what user types after slash
  const ref = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
      onChangeAction(html);

      // Check for slash command - simplified logic
      const { from } = editor.state.selection;
      const textBefore = editor.state.doc.textBetween(
        Math.max(0, from - 50), // Increased range to catch more text
        from,
        ''
      );

      // Find the last slash in the text
      const slashIndex = textBefore.lastIndexOf('/');

      // Debug logging
      console.log('Text before cursor:', textBefore);
      console.log('Slash index:', slashIndex);

      // Check if we have a slash and it's recent (within reasonable distance)
      if (slashIndex !== -1 && textBefore.length - slashIndex <= 20) {
        // Extract the query after the slash
        const query = textBefore.substring(slashIndex + 1);
        console.log('Query after slash:', query);

        // Only show menu if the query doesn't contain spaces (indicating it's still a command)
        if (!query.includes(' ') && !query.includes('\n')) {
          setSlashQuery(query);

          // Show slash menu
          const coords = editor.view.coordsAtPos(from);
          setSlashMenuPosition({
            x: coords.left,
            y: coords.bottom + 10,
          });
          setShowSlashMenu(true);
        } else {
          setShowSlashMenu(false);
          setSlashQuery('');
        }
      } else {
        setShowSlashMenu(false);
        setSlashQuery('');
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
      handleKeyDown: (view, event) => {
        // Handle slash command trigger
        if (event.key === '/') {
          // Don't interfere with the default typing, just prepare to show menu
          setTimeout(() => {
            const { from } = view.state.selection;
            const coords = view.coordsAtPos(from);
            setSlashMenuPosition({
              x: coords.left,
              y: coords.bottom + 10,
            });
            setShowSlashMenu(true);
            setSlashQuery(''); // Start with empty query, will be updated by onUpdate
          }, 50); // Slightly longer delay to ensure text is processed
        }

        // Handle escape to close slash menu
        if (event.key === 'Escape' && showSlashMenu) {
          event.preventDefault();
          setShowSlashMenu(false);
          return true; // Prevent other handlers
        }

        return false; // Let other handlers process the event
      },
    },
  });

  // const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Handle command selection
  // const handleCommandSelect = (command: NotionCommandType) => {
  //   console.log('Command selected:', command.name);

  //   // Add any custom logic here
  //   if (command.command === '/h1') {
  //     console.log('Heading 1 selected');
  //   }
  //   // Close the palette
  //   setIsCommandPaletteOpen(false);

  //   // Focus back to editor
  //   editor?.commands.focus();
  // };

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
          onClick={() => {
            if (showSlashMenu) {
              setShowSlashMenu(false);
            }
          }}
          ref={ref}
        />
      </div>
      {showSlashMenu && (
        <SlashCommandMenu
          editor={editor}
          isOpen={showSlashMenu}
          searchInputRef={searchInputRef}
          onClose={() => setShowSlashMenu(false)}
          position={slashMenuPosition}
          initialQuery={slashQuery}
        />
      )}

      {/* <NotionCommandDialog
        open={isCommandPaletteOpen}
        onOpenChange={setIsCommandPaletteOpen}
        editor={editor || undefined}
        onCommandSelect={handleCommandSelect}
        title="Command Palette"
        description="Type a command or search for formatting options..."
      /> */}
    </div>
  );
}
