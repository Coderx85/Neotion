'use client';

import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';

import { Doc } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { DocumentWithParent } from '@/types/common';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { FaSlash } from 'react-icons/fa6';

interface TitleProps {
  initialData: Doc<'documents'>;
}

export function Title({ initialData }: TitleProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const update = useMutation(api.document.update);

  // Fetch document with parent information
  const documentWithParent = useQuery(api.document.getByIdWithParent, {
    documentId: initialData._id,
  });

  const [title, setTitle] = useState(initialData.title || 'Untitled');
  const [isEditing, setIsEditing] = useState(false);

  const navigateToParent = () => {
    if (initialData.parentDocument) {
      router.push(`/documents/${initialData.parentDocument}`);
    }
  };

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    update({
      id: initialData._id,
      title: event.target.value || 'Untitled',
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      disableInput();
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      {/* Parent Document Breadcrumb */}
      {documentWithParent === undefined
        ? // Loading state for parent info
          initialData.parentDocument && (
            <div className="flex items-center">
              <Skeleton className="h-4 w-32" />
            </div>
          )
        : documentWithParent?.parentTitle && (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                    onClick={navigateToParent}
                  >
                    {documentWithParent.parentTitle}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator
                  children={<FaSlash className="rotate-45 font-bold h-4" />}
                />
                <BreadcrumbItem>
                  <div className="flex gap-x-1 items-center">
                    {!!initialData.icon && <p>{initialData.icon}</p>}
                    {isEditing ? (
                      <Input
                        className="h-7 px-2 focus-visible:ring-transparent"
                        ref={inputRef}
                        onClick={enableInput}
                        onBlur={disableInput}
                        value={title}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                      />
                    ) : (
                      <Button
                        className="font-normal h-auto p-1"
                        variant="ghost"
                        size="sm"
                        onClick={enableInput}
                      >
                        <span className="truncate">{initialData?.title}</span>
                      </Button>
                    )}
                  </div>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}

      {/* Current Document Title */}
    </div>
  );
}

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="w-20 h-8 rounded-md" />;
};
