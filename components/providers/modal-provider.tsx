'use client';

import { useState, useEffect } from 'react';
import { useSearch } from '@/hooks/use-search';
import SettingModal from '../modals/setting-modal';

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingModal />
    </>
  );
};
