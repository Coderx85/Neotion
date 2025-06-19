'use client';

import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { useMediaQuery } from 'usehooks-ts';
import { MenuIcon } from 'lucide-react';

import Publish from './publish';
import { NavbarProps } from '@/types';
import { Title } from './Title';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/utils/lib';

// import { Banner } from './Banner';
// import { Menu } from './Menu';

/**
 * Navigation bar component that displays document-specific navigation and controls.
 *
 * Renders a responsive navigation bar that adapts based on mobile/desktop views and sidebar state.
 * Shows loading skeleton while document data is being fetched, and displays the document title
 * with publishing controls when data is available.
 *
 * @param props - The component props
 * @param props.isCollapsed - Whether the sidebar is collapsed, determines if menu icon should be shown
 * @param props.onResetWidthAction - Callback function to reset sidebar width when menu icon is clicked
 *
 * @returns The navigation bar JSX element, or null if document doesn't exist
 *
 * @example
 * ```tsx
 * <Navbar
 *   isCollapsed={sidebarCollapsed}
 *   onResetWidthAction={handleSidebarReset}
 * />
 * ```
 */
export function Navbar({ isCollapsed, onResetWidthAction }: NavbarProps) {
  const params = useParams();
  const isMobile = useMediaQuery('(max-width:768px)');

  const document = useQuery(
    api.document.getById,
    params.documentId
      ? { documentId: params.documentId as Id<'documents'> }
      : 'skip'
  );

  if (document === undefined) {
    return (
      <nav
        className={cn(
          'bg-accent-foreground px-3 py-2 w-full flex justify-between gap-x-4',
          isMobile && 'p-0'
        )}
      >
        <Title.Skeleton />
        <div className="flex gap-x-2 items-center">
          {/* <Menu.Skeleton /> */}
          Menu Section
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav
        className={cn(
          'bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex justify-between gap-x-4',
          isMobile && 'p-0'
        )}
      >
        {isCollapsed && (
          <MenuIcon
            className="w-6 h-6 text-muted-foreground cursor-pointer"
            role="button"
            onClick={onResetWidthAction}
          />
        )}
        <div className="flex justify-between items-center w-full">
          <Title initialData={document} />
          <div className="flex gap-x-2 items-center">
            <Publish initialData={document} />
            {/* <Menu documentId={document._id} /> */}
          </div>
        </div>
      </nav>
      {/* {document.isArchived && <Banner documentId={document._id} />} */}
    </>
  );
}
