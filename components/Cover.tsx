'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/lib';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useConverImage } from '@/hooks/use-cover-image';
import { useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

import { BiImageAdd, BiX } from 'react-icons/bi';

interface CoverProps {
  url?: string;
  preview?: boolean;
}

export function Cover({ url, preview }: CoverProps) {
  const params = useParams();
  const coverImage = useConverImage();
  const removeCoverImage = useMutation(api.document.removeCoverImage);

  const onRemove = async () => {
    if (params?.documentId) {
      removeCoverImage({
        id: params.documentId as Id<'documents'>,
      });
    }
  };

  return (
    <div
      className={cn(
        'relative w-full h-[35vh] group',
        !url && 'h-[12vh]',
        url && 'bg-muted'
      )}
      onClick={!url ? () => {} : () => coverImage.onReplace(url)}
    >
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <BiImageAdd className="w-4 h-4 mr-2" />
            Change cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="destructive"
            size="sm"
          >
            <BiX className="w-4 h-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
