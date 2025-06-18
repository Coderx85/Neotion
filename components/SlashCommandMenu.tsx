'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { EDITOR_COMMANDS } from '@/constants/editor-commands';
import { cn } from '@/utils/lib';
import { SlashCommandMenuProps } from '@/types';

export function SlashCommandMenu({
  editor,
  isOpen,
  onClose,
  searchInputRef: _searchInputRef,
  position = { x: 0, y: 0 },
  initialQuery = '',
}: SlashCommandMenuProps & {
  editor: any;
  onClose: () => void;
  initialQuery?: string;
}) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const commandRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement>(null); // Ref for first command item
  const filteredCommands = EDITOR_COMMANDS.filter(
    (command) =>
      command.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      command.command.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    if (isOpen) {
      setSearchTerm(initialQuery);
      setSelectedIndex(0);
      // Auto-focus the search input when menu opens
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialQuery]);

  // Update search term when initialQuery changes (for real-time filtering)
  useEffect(() => {
    if (isOpen && initialQuery !== searchTerm) {
      setSearchTerm(initialQuery);
      setSelectedIndex(0);
    }
  }, [initialQuery, isOpen, searchTerm]);

  // Auto-focus first item when menu opens or commands change
  useEffect(() => {
    if (isOpen && filteredCommands.length > 0 && selectedIndex === 0) {
      firstItemRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
    // Scroll to the selected item
  }, [isOpen, filteredCommands.length, selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (filteredCommands[selectedIndex]) {
            executeCommand(filteredCommands[selectedIndex].command);
          }
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  const executeCommand = (command: string) => {
    if (!editor) return;

    // Remove the slash and any search term
    const { from, to } = editor.state.selection;
    const textBefore = editor.state.doc.textBetween(
      Math.max(0, from - 20),
      from,
      ''
    );
    const slashIndex = textBefore.lastIndexOf('/');

    if (slashIndex !== -1) {
      const deleteFrom = from - (textBefore.length - slashIndex);
      editor.chain().focus().deleteRange({ from: deleteFrom, to }).run();
    }

    // Execute the command
    switch (command) {
      case '/h1':
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case '/h2':
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case '/h3':
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case '/ul':
        editor.chain().focus().toggleBulletList().run();
        break;
      case '/ol':
        editor.chain().focus().toggleOrderedList().run();
        break;
      case '/code':
        editor.chain().focus().toggleCodeBlock().run();
        break;
      case '/quote':
        editor.chain().focus().toggleBlockquote().run();
        break;
      case '/divider':
        editor.chain().focus().setHorizontalRule().run();
        break;
    }

    // Clear search term and close menu
    setSearchTerm('');
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div
      ref={commandRef}
      className="slash-command-menu"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {' '}
      <Command className="w-full">
        <CommandInput
          ref={searchInputRef}
          placeholder="Search for commands..."
          value={searchTerm}
          onValueChange={(value) => {
            setSearchTerm(value);
            setSelectedIndex(0); // Reset selection when filtering
          }}
          className="slash-command-input"
          autoFocus
        />
        <CommandList className="slash-command-list">
          <CommandEmpty>
            <div className="slash-command-empty">No commands found.</div>
          </CommandEmpty>{' '}
          <CommandGroup>
            {filteredCommands.map((command, index) => {
              const Icon = command.icon;
              return (
                <CommandItem
                  key={command.command}
                  value={command.command}
                  ref={index === 0 ? firstItemRef : null} // Attach ref to first item only
                  onSelect={() => executeCommand(command.command)}
                  className={cn(
                    'slash-command-item',
                    index === selectedIndex && 'selected'
                  )}
                >
                  <Icon className="slash-command-icon" />
                  <div className="slash-command-content">
                    <div className="slash-command-title">{command.name}</div>
                    <div className="slash-command-description">
                      {command.description}
                    </div>
                  </div>
                  <span className="slash-command-shortcut">
                    {command.command}
                  </span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
