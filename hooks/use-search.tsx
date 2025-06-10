import { create } from 'zustand';
import { SearchStore } from '@/types';

export const useSearch = create<SearchStore>((set, get) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
