'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/utils/lib';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { FaChevronRight, FaPlus, FaShare } from 'react-icons/fa6';
import { IconType } from 'react-icons/lib';
import { toast } from 'sonner';
import { BiRename, BiStar, BiTrash } from 'react-icons/bi';
import { updateTitle } from '@/convex/document';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import RenameModal from '@/components/modals/rename-modal';
import { formatDistanceToNow } from 'date-fns';

type ItemProps = {
  id?: Id<'documents'>;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  iconAction: IconType;
};

export default function Item({
  label,
  onClick,
  iconAction: Icon,
  isSearch,
  id,
  expanded,
  documentIcon,
  active,
  level = 0,
  onExpand,
}: ItemProps) {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.document.create);
  const rename = useMutation(api.document.updateTitle);
  const archive = useMutation(api.document.archive);
  const star = useMutation(api.document.star);

  const onStar = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!id) return;

    const promise = star({ id });

    toast.promise(promise, {
      loading: 'Starring document...',
      success: 'Document starred!',
      error: 'Failed to star document',
    });
  };

  const onArchive = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (!id) return;

    const promise = archive({ id });

    toast.promise(promise, {
      loading: 'Archiving document...',
      success: 'Document archived!',
      error: 'Failed to archive document',
    });
  };

  const handleExpand = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onExpand?.();
  };

  const ChevronIcon = expanded ? FaChevronDown : FaChevronRight;

  const onCreate = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = create({ title: 'Untitled', parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        // router.push(`/documents/${documentId}`);
      }
    );

    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New note created!',
      error: 'Failed to create a new note',
    });
  };

  return (
    <div
      role="button"
      onClick={onClick}
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : '12px' }}
      className={cn(
        'group min-h-[27px] text-sm cursor-pointer w-full hover:bg-primary/5 flex items-center text-muted-foreground dark:text-white/85 font-medium',
        active && 'bg-primary/5 text-primary',
        isSearch && 'border-1'
      )}
    >
      {!!id && (
        <div
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1 transition transform duration-300"
          onClick={handleExpand}
          role="button"
        >
          <ChevronIcon className="size-5 shrink-0 text-muted-foreground/50 dark:text-white/85 hover:bg-accent p-1" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px] dark:text-white/85">
          {documentIcon}
        </div>
      ) : (
        <Icon className="size-4 mr-2 text-muted-foreground dark:text-white/85" />
        // <>
        // </>
      )}
      <span className="truncate font-medium text-muted-foreground dark:text-white/85">
        {label}
      </span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs text-gray-500 dark:text-white/85">⌘</span>K
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm
              hover:bg-neutral-300 dark:hover:bg-neutral-600"
                role="button"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="size-3 text-muted-foreground dark:text-white/85 m-1" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60 bg-white bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-100"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={onStar} className="flex items-center">
                <BiStar className="w-4 h-4 mr-2" />| Favorite
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Dialog>
                  <DialogTrigger
                    className="flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BiRename className="w-4 h-4 mr-2 " />| Rename
                  </DialogTrigger>
                  <RenameModal id={id} documentName={label} />
                </Dialog>
              </DropdownMenuItem>
              <Dialog>
                <DropdownMenuItem>
                  <DialogTrigger
                    className="flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BiTrash className="w-4 h-4 mr-2" />| Archive
                  </DialogTrigger>
                </DropdownMenuItem>
                <DialogContent>
                  <DialogTitle className="text-lg font-semibold">
                    Archive Document
                  </DialogTitle>
                  <div className="flex flex-col gap-y-4">
                    <Label className="text-sm font-medium">
                      Are you sure you want to archive this document?
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      This action cannot be undone. The document will be moved
                      to the archive.
                    </p>
                    <div className="flex justify-end gap-2">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant="destructive" onClick={onArchive}>
                          Archive
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DropdownMenuItem>
                  <DialogTrigger
                    className="flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaShare className="w-4 h-4 mr-2" />| Share
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle className="text-lg flex items-center font-semibold">
                      <FaShare className="mr-4" />
                      Share Document
                    </DialogTitle>
                    <div className="flex flex-col gap-y-4">
                      <Label className="text-sm font-medium"></Label>
                      <p className="text-sm text-muted-foreground">
                        You can share this document with others once the feature
                        is available.
                      </p>
                      <div className="flex justify-end">
                        <DialogClose asChild>
                          <Button variant="outline">Close</Button>
                        </DialogClose>
                      </div>
                    </div>
                  </DialogContent>
                </DropdownMenuItem>
              </Dialog>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-2">
                Last edited by: {user?.username}
                <br />
                {formatDistanceToNow(new Date(document.lastModified || 0), {
                  addSuffix: true,
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            className="opacity-0 group-hover:opacity-100 p-1 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
            role="button"
            onClick={onCreate}
          >
            <FaPlus className="w-4 h-4 text-muted-foreground dark:text-white/85" />
          </div>
        </div>
      )}
    </div>
  );
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12}px` : '12px',
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="size-4" />

      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
