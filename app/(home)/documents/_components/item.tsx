import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { IconType } from 'react-icons/lib';

type ItemProps = {
  label: string;
  onClick: () => void;
  icon: IconType;
  isSearch?: boolean;
};

export default function Item ({ label, onClick, icon: Icon, isSearch }: ItemProps) {
  return (
    <div
      role="button"
      onClick={onClick}
      className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-md"
    >
      <Icon className="shrink-0 h-[14px] mr-2" />
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
          <span className="text-xs text-gray-500">⌘</span>K
        </kbd>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div 
      style={{
        paddingLeft: level ? `${(level * 12)}px` : "12px"
      }}
      className='flex gap-x-2 py-[3px]'
    >
      <Skeleton className='size-4'/>

      <Skeleton className='h-4 w-[30%]'/>
    </div>
  );
}