import { ReactNode } from 'react';
import { IconType } from 'react-icons/lib';

// Common types
export type AppProps = {
  children: ReactNode;
};

export type SearchStore = {
  isOpen: boolean;
  toggle: () => void;
  onOpen: () => void;
  onClose: () => void;
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
