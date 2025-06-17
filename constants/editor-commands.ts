import { EditorCommand } from '@/types/editor';

export const EDITOR_COMMANDS: EditorCommand[] = [
  {
    name: 'Heading 1',
    command: '/h1',
    icon: '📝',
    description: 'Big section heading',
    action: () => {},
  },
  {
    name: 'Heading 2',
    command: '/h2',
    icon: '📄',
    description: 'Medium section heading',
    action: () => {},
  },
  {
    name: 'Heading 3',
    command: '/h3',
    icon: '📃',
    description: 'Small section heading',
    action: () => {},
  },
  {
    name: 'Bullet List',
    command: '/ul',
    icon: '•',
    description: 'Create a simple bullet list',
    action: () => {},
  },
  {
    name: 'Numbered List',
    command: '/ol',
    icon: '1.',
    description: 'Create a list with numbering',
    action: () => {},
  },
  {
    name: 'Code Block',
    command: '/code',
    icon: '💻',
    description: 'Capture a code snippet',
    action: () => {},
  },
  {
    name: 'Quote',
    command: '/quote',
    icon: '"',
    description: 'Capture a quote',
    action: () => {},
  },
  {
    name: 'Divider',
    command: '/divider',
    icon: '—',
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
