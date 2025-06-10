'use client';
import React, {
  ComponentRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { FaChevronLeft, FaSearch, FaTrashRestore } from 'react-icons/fa';
import { useMediaQuery } from 'usehooks-ts';
import { FaCirclePlus, FaGear } from 'react-icons/fa6';

import { cn } from '@/utils/lib';
import { MenuIcon } from 'lucide-react';
import UserItem from '@/app/(home)/documents/_components/user-item';
import Item from '@/app/(home)/documents/_components/item';
import { DocumentList } from '@/app/(home)/documents/_components/document-list';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import { Id } from '@/convex/_generated/dataModel';
import { Separator } from './ui/separator';
import { Navbar } from './Navbar';
import { BiPlus } from 'react-icons/bi';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import TrashBox from './trash-box';
import { useSearch } from '@/hooks/use-search';
import SettingModal from './modals/setting-modal';
import { useSettings } from '@/stores/use-settings';

export function Navigation() {
  const search = useSearch();
  const router = useRouter();
  const setting = useSettings();
  const params = useParams();
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width:768px)');
  const create = useMutation(api.document.create);

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ComponentRef<'aside'>>(null);
  const navbarRef = useRef<ComponentRef<'div'>>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty('left', `${newWidth}px`);
      navbarRef.current.style.setProperty(
        'width',
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleCreate = () => {
    const promise = create({ title: 'Untitled' })
      .then
      // (documentId: Id<'documents'>) => router.push(`/documents/${documentId}`)
      ();

    toast.promise(promise, {
      loading: 'Creating new note...',
      success: 'New note created!',
      error: 'Failed to create note.',
    });
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  const resetWidth = useCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? '100%' : '240px';
      navbarRef.current.style.setProperty(
        'width',
        isMobile ? '0' : 'calc(100% - 240px)'
      );
      navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px');
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  }, [isMobile]);

  const collapse = useCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = '0';
      navbarRef.current.style.setProperty('width', '100%');
      navbarRef.current.style.setProperty('left', '0');
      setTimeout(() => setIsResetting(false), 300);
    }
  }, []);

  return (
    <>
      <aside
        className={cn(
          `group/sidebar h-full bg-gray-100 dark:bg-zinc-800 overflow-y-auto relative flex flex-col w-60 z-[99999]`,
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'w-0'
        )}
        ref={sidebarRef}
      >
        <div>
          <div
            className={cn(
              `w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute
              top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition`,
              isMobile && 'opacity-100'
            )}
            onClick={collapse}
            role="button"
          >
            <FaChevronLeft className="w-6 h-6" />
          </div>
          <div className="p-2">
            <UserItem />
            <Item
              label="Search"
              onClick={search.onOpen}
              iconAction={FaSearch}
              isSearch
            />
            <Item
              label="Settings"
              onClick={setting.onOpen}
              iconAction={FaGear}
            />
            <Item
              label="New Page"
              onClick={handleCreate}
              iconAction={FaCirclePlus}
            />
          </div>
          <Separator className="mb-2" />
          <h2 className="text-sm my-2 font-semibold px-2 text-muted-foreground">
            Favorite
          </h2>
          <DocumentList star />
          <Separator className="mb-2" />
          <h2 className="text-sm my-2 font-semibold px-2 text-muted-foreground">
            Pages
          </h2>
          <DocumentList />
          <div className="mt-4">
            <Item
              label="Add a Page"
              onClick={handleCreate}
              iconAction={BiPlus}
            />
            <Popover>
              <PopoverTrigger className="w-full mt-4">
                <Item label="Restore" iconAction={FaTrashRestore} />
              </PopoverTrigger>
              <PopoverContent
                className="w-64"
                side={isMobile ? 'bottom' : 'right'}
              >
                <TrashBox />
              </PopoverContent>
            </Popover>
          </div>

          {/* Resize handle */}
          <div
            className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
            onMouseDown={handleMouseDown}
            onClick={resetWidth}
          ></div>
        </div>
      </aside>
      <div
        className={cn(
          `absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]`,
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'left-0 w-full'
        )}
        ref={navbarRef}
      >
        {!!params.documentId ? (
          // <Navbar isCollapsed={isCollapsed} onResetWidthAction={resetWidth} />
          <></>
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                className="w-6 h-6 text-muted-foreground cursor-pointer"
                onClick={resetWidth}
                role="button"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
}
