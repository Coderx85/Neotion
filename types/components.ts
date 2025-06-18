import { ReactNode } from 'react';
import { Id, Doc } from '@/convex/_generated/dataModel';
import { Editor } from '@tiptap/react';

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
export interface ToolbarProps {
  initialData: Doc<'documents'>;
  preview?: boolean;
}

export interface DocumentPreviewProps {
  params: Promise<{
    documentId: Id<'documents'>;
  }>;
}

export interface ToolbarProps {
  initialData: Doc<'documents'>;
  preview?: boolean;
}

export interface SlashCommandMenuProps {
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
  editor: Editor;
  isOpen: boolean;
  onClose: () => void;
  position?: { x: number; y: number };
}
