import { LayoutProps } from '@/types';

export default function PublicLayout({ children }: LayoutProps) {
  return <div className="h-full dark:bg-[#1F1F1F]">{children}</div>;
}
