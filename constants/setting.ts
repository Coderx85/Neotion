import { shortcutsProps } from '@/types';

export const shortcutsKeys: shortcutsProps[] = [
  {
    key: ',',
    description: 'Open Settings',
    action: 'toggleSettings',
  },
  {
    key: 'k',
    description: 'Open Search',
    action: 'toggleSearch',
  },
  {
    key: '\\',
    description: 'Open Sidebar',
    action: 'toggleSidebar',
  },
];
