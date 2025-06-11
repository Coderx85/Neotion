export interface ThemeOption {
  value: 'light' | 'dark' | 'system';
  label: string;
  icon: import('react-icons/lib').IconType;
  description: string;
}

export interface shortcutsProps {
  key: string;
  description: string;
  action: string;
}
