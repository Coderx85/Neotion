'use client';

import React from 'react';
import { formatDistanceToNow } from 'date-fns';

import { Doc } from '@/convex/_generated/dataModel';
import { FaClock, FaFile } from 'react-icons/fa6';

interface DocumentMetaProps {
  document: Doc<'documents'>;
  content?: string;
}

export function DocumentMeta({ document, content = '' }: DocumentMetaProps) {
  const wordCount = content
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const charCount = content.length;

  const lastUpdated = document.updatedAt
    ? formatDistanceToNow(new Date(document.updatedAt), { addSuffix: true })
    : 'Never';

  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground py-2 border-t">
      <div className="flex items-center gap-1">
        <FaClock className="h-3 w-3" />
        <span>Updated {lastUpdated}</span>
      </div>
      <div className="flex items-center gap-1">
        <FaFile className="h-3 w-3" />
        <span>
          {wordCount} words, {charCount} characters
        </span>
      </div>
    </div>
  );
}
