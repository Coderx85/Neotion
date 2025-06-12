'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { cn } from '@/utils/lib';
import Item from './item';
import { FileIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface DocumentListProps {
  parentDocumentId?: Id<'documents'>;
  level?: number;
  data?: Doc<'documents'>[];
  star?: boolean;
}

export function DocumentList({
  parentDocumentId,
  level = 0,
  star = false,
}: DocumentListProps) {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const starredDocument = useQuery(api.document.getStarred);

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const documents = useQuery(api.document.getSidebar, {
    parentDocument: parentDocumentId,
  });

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        className={cn(
          `hidden text-sm font-medium text-muted-foreground/80`,
          expanded && 'last:block',
          level === 0 && 'hidden'
        )}
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
      >
        No pages available
      </p>
      {!!star ? (
        <>
          {starredDocument &&
            starredDocument?.map((document: Doc<'documents'>) => (
              <div key={document._id} className="mx-2">
                <Item
                  key={document._id}
                  id={document._id}
                  onClick={() => onRedirect(document._id)}
                  label={document.title}
                  iconAction={FileIcon}
                  documentIcon={document.icon}
                  active={params.documentId === document._id}
                  level={level}
                  onExpand={() => onExpand(document._id)}
                  expanded={expanded[document._id]}
                />
                {expanded[document._id] && (
                  <DocumentList
                    parentDocumentId={document._id}
                    level={level + 1}
                  />
                )}
                <Separator
                  style={{
                    paddingLeft: level ? `${level * 12 + 25}px` : undefined,
                  }}
                />
              </div>
            ))}
        </>
      ) : (
        <>
          {documents.map((document: Doc<'documents'>) => (
            <div key={document._id} className="mx-2">
              <Item
                key={document._id}
                id={document._id}
                onClick={() => onRedirect(document._id)}
                label={document.title}
                iconAction={FileIcon}
                documentIcon={document.icon}
                active={params.documentId === document._id}
                level={level}
                onExpand={() => onExpand(document._id)}
                expanded={expanded[document._id]}
              />
              {expanded[document._id] && (
                <DocumentList
                  parentDocumentId={document._id}
                  level={level + 1}
                />
              )}
              <Separator
                style={{
                  paddingLeft: level ? `${level * 12 + 25}px` : undefined,
                }}
              />
            </div>
          ))}
        </>
      )}
    </>
  );
}
