'use client';

import { useState, useEffect } from 'react';
import SettingModal from '../modals/setting-modal';
import SearchCommand from '../search-command';
import { GlobalKeyboardShortcuts } from '../global-keyboard-shortcuts';
import { CoverImageModal } from '../modals/cover-image-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <GlobalKeyboardShortcuts />
      <SearchCommand />
      <SettingModal />
      <CoverImageModal />
    </>
  );
};
