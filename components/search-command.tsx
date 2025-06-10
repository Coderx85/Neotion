'use client';

import { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/hooks/use-search';
import { useUser } from '@clerk/nextjs';

import { BiFile } from 'react-icons/bi';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
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
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput
        placeholder={`Search ${user?.firstName || 'User'}'s Notion Clone...`}
        onValueChange={(value) => setSearchTerm(value)}
      />
      <CommandList>
        <CommandEmpty>No results found for "{searchTerm}"</CommandEmpty>
        <CommandGroup heading="Documents">
          {documents?.map((doc) => (
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
              <span className="font-medium">{doc.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </CommandDialog>
  );
};
export default SearchCommand;
