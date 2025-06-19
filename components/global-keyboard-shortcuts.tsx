'use client';

import { useEffect } from 'react';
import { useSidebar } from '@/stores/use-sidebar';

export const GlobalKeyboardShortcuts = () => {
  const { toggle } = useSidebar();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for backslash key (\) to toggle sidebar
      if ((event.ctrlKey || event.metaKey) && event.key === '\\') {
        event.preventDefault();
        toggle();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggle]);

  return null;
};
