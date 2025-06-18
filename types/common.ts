import { ReactNode } from 'react';
import { IconType } from 'react-icons/lib';
import { Doc } from '@/convex/_generated/dataModel';

// Common types
export type LayoutProps = {
  children: ReactNode;
};

export interface DocumentLayoutProps extends LayoutProps {
  sidebar: ReactNode;
}

export type SearchStore = {
  isOpen: boolean;
  toggle: () => void;
  onOpen: () => void;
  onClose: () => void;
};

// Document with parent title for search results
export type DocumentWithParent = Doc<'documents'> & {
  parentTitle: string | null;
};

export type FeatureCard = {
  title: string;
  description: string;
  icon: IconType;
};

export type SettingsStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
