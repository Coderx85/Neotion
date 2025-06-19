'use client';

import { useMutation, useQuery } from 'convex/react';
import { use } from 'react';

import { api } from '@/convex/_generated/api';
import { Toolbar } from '@/components/Toolbar';
import { Cover } from '@/components/Cover';
import { Skeleton } from '@/components/ui/skeleton';
import { Editor } from '@/components/Editor';
import { DocumentPreviewProps } from '@/types';

export default function DocumentIdPage({ params }: DocumentPreviewProps) {
  const resolvedParams = use(params);
  const document = useQuery(api.document.getById, {
    documentId: resolvedParams.documentId,
  });

  const update = useMutation(api.document.update);

  const onChange = (content: string) => {
    update({
      id: resolvedParams.documentId,
      content,
    });
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-14 w-[80%]" />
            <Skeleton className="h-14 w-[40%]" />
            <Skeleton className="h-14 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not Found</div>;
  }

  return (
    <div className="pb-40">
      <Cover preview url={document.coverImage} />
      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
        <Toolbar preview initialData={document} />
        <Editor
          editable={false}
          onChangeAction={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
}
