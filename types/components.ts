import { ReactNode } from 'react';
import { Id, Doc } from '@/convex/_generated/dataModel';

// Component interfaces
export interface NavbarProps {
  isCollapsed: boolean;
  onResetWidthAction: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
  [key: string]: unknown;
}

export interface DocumentListProps {
  parentDocumentId?: Id<'documents'>;
  level?: number;
  data?: Doc<'documents'>[];
  star?: boolean;
}

export interface ItemProps {
  id?: Id<'documents'>;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  iconAction: import('react-icons/lib').IconType;
}

export interface SettingModalProps {
  children: ReactNode;
}
