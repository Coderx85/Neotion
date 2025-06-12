'use client';

import { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/hooks/use-search';
import { useUser } from '@clerk/nextjs';
import { DocumentWithParent } from '@/types/common';

import { BiFile } from 'react-icons/bi';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { api } from '@/convex/_generated/api';

const SearchCommand = () => {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.document.getSearch);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((state) => state.toggle);
  const isOpen = useSearch((state) => state.isOpen);
  const onClose = useSearch((state) => state.onClose);

  // Filter documents based on search term in both title and parent title
  const filteredDocuments = documents?.filter((doc: DocumentWithParent) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    const titleMatch = doc.title.toLowerCase().includes(searchLower);
    const parentTitleMatch = doc.parentTitle
      ?.toLowerCase()
      .includes(searchLower);

    return titleMatch || parentTitleMatch;
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener('keydown', down);
    return () => {
      document.removeEventListener('keydown', down);
    };
  }, [toggle]);

  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={onClose}
      className="bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-100"
    >
      <CommandInput
        placeholder={`Search ${user?.firstName || 'User'}'s Neotion...`}
        onValueChange={(value) => setSearchTerm(value)}
      />
      <CommandList>
        <CommandEmpty>No results found for "{searchTerm}"</CommandEmpty>
        <CommandGroup
          heading="Documents"
          className="bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-100"
        >
          {filteredDocuments?.map((doc: DocumentWithParent) => (
            <CommandItem
              key={doc._id}
              onSelect={() => {
                router.push(`/documents/${doc._id}`);
                toggle();
              }}
            >
              {doc.icon ? (
                <p className="flex items-center gap-2">{doc.icon}</p>
              ) : (
                <BiFile className="w-4 h-4" />
              )}
              <div className="flex flex-col">
                <span className="font-medium">{doc.title}</span>
                {doc.parentTitle && (
                  <span className="text-xs text-muted-foreground">
                    in {doc.parentTitle}
                  </span>
                )}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
      <CommandShortcut
        className="text-xs text-muted-foreground"
        onClick={(e) => {
          e.preventDefault();
          onClose();
        }}
      >
        Press <kbd className="font-semibold">Esc</kbd> to close
      </CommandShortcut>
    </CommandDialog>
  );
};
export default SearchCommand;
