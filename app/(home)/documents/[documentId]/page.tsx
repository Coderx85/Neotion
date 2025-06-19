'use client';

import React, { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useQuery, useMutation } from 'convex/react';

import { Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { Toolbar } from '@/components/Toolbar';
import { Cover } from '@/components/Cover';
import { Editor } from '@/components/EditorNew';
import { DocumentMeta } from '@/components/DocumentMeta';
import { Skeleton } from '@/components/ui/skeleton';

interface DocumentIdPageProps {
  params: Promise<{
    documentId: Id<'documents'>;
  }>;
}

export default function DocumentIdPage({ params }: DocumentIdPageProps) {
  const resolvedParams = React.use(params);
  const update = useMutation(api.document.update);

  const document = useQuery(
    api.document.getById,
    resolvedParams.documentId
      ? { documentId: resolvedParams.documentId }
      : 'skip'
  );

  const onChange = (content: string) => {
    update({
      id: resolvedParams.documentId,
      content,
    });
  };

  useEffect(() => {
    window.document.title = document?.title || 'Document Editor';
  }, [document?.title]);
  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-0 md:pl-8 pt-4 pr-4 md:pr-0">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }
  if (document === null) {
    redirect('/documents');
  }
  return (
    <div className="pb-40 min-h-screen">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto px-4 md:px-0">
        <Toolbar initialData={document} />
        <div className="pl-0 md:pl-[50px] pt-4 pr-0 md:pr-0">
          <Editor
            onChangeAction={onChange}
            initialContent={document.content}
            editable={true}
          />
        </div>
        <div className="px-0 md:px-[50px]">
          <DocumentMeta document={document} content={document.content || ''} />
        </div>
      </div>
    </div>
  );
}
