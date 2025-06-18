import { EditorCommand } from '@/types/editor';
import {
  RiCodeSSlashFill,
  RiDivideLine,
  RiH1,
  RiH2,
  RiH3,
  RiListOrdered,
  RiListUnordered,
  RiQuoteText,
} from '@remixicon/react';

export const EDITOR_COMMANDS: EditorCommand[] = [
  {
    name: 'Heading 1',
    command: '/h1',
    icon: RiH1,
    description: 'Big section heading',
    action: () => {},
  },
  {
    name: 'Heading 2',
    command: '/h2',
    icon: RiH2,
    description: 'Medium section heading',
    action: () => {},
  },
  {
    name: 'Heading 3',
    command: '/h3',
    icon: RiH3,
    description: 'Small section heading',
    action: () => {},
  },
  {
    name: 'Bullet List',
    command: '/ul',
    icon: RiListUnordered,
    description: 'Create a simple bullet list',
    action: () => {},
  },
  {
    name: 'Numbered List',
    command: '/ol',
    icon: RiListOrdered,
    description: 'Create a list with numbering',
    action: () => {},
  },
  {
    name: 'Code Block',
    command: '/code',
    icon: RiCodeSSlashFill,
    description: 'Capture a code snippet',
    action: () => {},
  },
  {
    name: 'Quote',
    command: '/quote',
    icon: RiQuoteText,
    description: 'Capture a quote',
    action: () => {},
  },
  {
    name: 'Divider',
    command: '/divider',
    icon: RiDivideLine,
    description: 'Visually divide blocks',
    action: () => {},
  },
];

export const KEYBOARD_SHORTCUTS = {
  BOLD: 'Ctrl+B',
  ITALIC: 'Ctrl+I',
  UNDERLINE: 'Ctrl+U',
  STRIKE: 'Ctrl+Shift+X',
  CODE: 'Ctrl+E',
  LINK: 'Ctrl+K',
} as const;
