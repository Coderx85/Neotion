'use client';

import React, { useState, useEffect } from 'react';
import {
  NotionCommandDialog,
  NotionCommandType,
} from '@/components/notionCommand';

interface CommandPaletteProps {
  editor?: any;
  trigger?: React.ReactNode;
  onCommandExecute?: (command: NotionCommandType) => void;
}

/**
 * Main Command Palette component that wraps NotionCommandDialog
 * with additional functionality and state management
 */
export function CommandPalette({
  editor,
  trigger,
  onCommandExecute,
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [_recentCommands, setRecentCommands] = useState<NotionCommandType[]>(
    []
  );

  // Global keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open command palette
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }

      // Escape to close
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle command selection
  const handleCommandSelect = (command: NotionCommandType) => {
    // Update recent commands
    setRecentCommands((prev) => {
      const filtered = prev.filter((cmd) => cmd.command !== command.command);
      const updated = [{ ...command, isRecent: true }, ...filtered].slice(0, 5);

      // Persist to localStorage
      try {
        localStorage.setItem('notion-recent-commands', JSON.stringify(updated));
      } catch (error) {
        console.warn('Failed to save recent commands:', error);
      }

      return updated;
    });

    // Execute custom callback if provided
    onCommandExecute?.(command);

    // Close palette
    setIsOpen(false);

    // Focus editor if available
    if (editor && typeof editor.commands?.focus === 'function') {
      setTimeout(() => {
        editor.commands.focus();
      }, 100);
    }
  };

  // Load recent commands on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('notion-recent-commands');
      if (saved) {
        const parsed = JSON.parse(saved);
        setRecentCommands(parsed);
      }
    } catch (error) {
      console.warn('Failed to load recent commands:', error);
    }
  }, []);

  return (
    <>
      {/* Optional trigger button */}
      {trigger && (
        <div onClick={() => setIsOpen(true)} className="cursor-pointer">
          {trigger}
        </div>
      )}

      {/* Command Dialog */}
      <NotionCommandDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        editor={editor}
        onCommandSelect={handleCommandSelect}
        title="Command Palette"
        description="Search for commands and actions..."
        className="max-w-2xl"
      />
    </>
  );
}

/**
 * Hook for using command palette functionality
 */
export function useCommandPalette(editor?: any) {
  const [isOpen, setIsOpen] = useState(false);

  const openPalette = () => setIsOpen(true);
  const closePalette = () => setIsOpen(false);
  const togglePalette = () => setIsOpen((prev) => !prev);

  // Setup keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        togglePalette();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [togglePalette]);

  return {
    isOpen,
    openPalette,
    closePalette,
    togglePalette,
    // Render method
    CommandPalette: (props: Omit<CommandPaletteProps, 'editor'>) => (
      <CommandPalette {...props} editor={editor} />
    ),
  };
}

export default CommandPalette;
