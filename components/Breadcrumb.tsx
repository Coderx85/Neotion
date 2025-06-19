'use client';

import React from 'react';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { ChevronRight, FileText } from 'lucide-react';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/utils/lib';

interface BreadcrumbProps {
  documentId: Id<'documents'>;
}

export function Breadcrumb({ documentId }: BreadcrumbProps) {
  const router = useRouter();
  const document = useQuery(
    api.document.getById,
    documentId ? { documentId } : 'skip'
  );

  const handleNavigateHome = () => {
    router.push('/documents');
  };

  if (!document) return null;

  return (
    <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
      <button
        onClick={handleNavigateHome}
        className="hover:text-foreground transition-colors flex items-center"
      >
        <FileText className="h-4 w-4 mr-1" />
      </button>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground font-medium truncate max-w-[200px]">
        {document.title}
      </span>
    </div>
  );
}
