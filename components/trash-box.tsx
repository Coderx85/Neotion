'use client';

import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { BiSearch, BiTrash, BiUndo } from 'react-icons/bi';
import ConfirmModal from './modals/confirm-nodal';
import { toast } from 'sonner';
import { Id } from '@/convex/_generated/dataModel';

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const doc = useQuery(api.document.getTrash);
  const restore = useMutation(api.document.restore);
  const remove = useMutation(api.document.remove);

  const [search, setSearch] = useState('');

  const filterDocuments = doc?.filter((d) => {
    return d.title.toLowerCase().includes(search.toLowerCase() || '');
  });

  const onClick = (id: string) => {
    if (params.documentId === id) {
      router.push('/documents');
    } else {
      router.push(`/documents/${id}`);
    }
  };

  const onRestore = (id: Id<'documents'>) => {
    const promise = restore({ id });

    toast.promise(promise, {
      loading: 'Restoring note...',
      success: 'Note restored!',
      error: 'Failed to restore note',
    });
  };

  const onRemove = (id: Id<'documents'>) => {
    const promise = remove({ id });
    toast.promise(promise, {
      loading: 'Removing document...',
      success: 'Document removed successfully',
      error: 'Failed to remove document',
    });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">
        Trash{' '}
        <span className="text-sm text-muted-foreground">({doc?.length})</span>
      </h2>
      <div>
        <Input
          placeholder="Search in trash..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />
        <BiSearch className="absolute right-3 top-3 text-muted-foreground" />
      </div>
      <div className="mt-2 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found
        </p>
        {filterDocuments?.map((document) => (
          <div
            className="text-sm rounded-sm w-full hover:bg-primary/5 py-1 flex justify-between items-center text-primary"
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
          >
            <span className="truncate pl-2">{document.title}</span>

            <div className="flex items-center">
              <div
                className="rounded-sm p-2 hover:bg-neutral-200 
              dark:hover:bg-neutral-600"
                onClick={() => onRestore(document._id)}
              >
                <BiUndo className="w-4 h-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  className="rounded-sm p-2 hover:bg-neutral-200
                dark:hover:bg-neutral-600"
                  role="button"
                >
                  <BiTrash className="w-4 h-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
