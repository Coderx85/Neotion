import { ReactNode } from 'react';

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
