import { create } from 'zustand';

interface SidebarStore {
  isCollapsed: boolean;
  collapse: () => void;
  expand: () => void;
  toggle: () => void;
}

export const useSidebar = create<SidebarStore>((set, get) => ({
  isCollapsed: false,
  collapse: () => set({ isCollapsed: true }),
  expand: () => set({ isCollapsed: false }),
  toggle: () => set({ isCollapsed: !get().isCollapsed }),
}));
