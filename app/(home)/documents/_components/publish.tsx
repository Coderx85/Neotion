'use client';
import React, { useState } from 'react';
import { useOrigin } from '@/hooks/use-origin';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { BiCheck, BiCopy, BiGlobe } from 'react-icons/bi';
import { Input } from '@/components/ui/input';
import { ToolbarProps } from '@/types';

const Publish = ({ initialData }: ToolbarProps) => {
  const origin = useOrigin();
  const update = useMutation(api.document.update);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [copy, setCopy] = useState<boolean>(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);
    const promise = update({ id: initialData._id, isPublished: true }).finally(
      () => {
        setIsSubmitting(false);
      }
    );
    toast.promise(promise, {
      success: 'Document published successfully',
      error: 'Failed to publish document',
      loading: 'Publishing document...',
    });
  };

  const onUnPublish = () => {
    setIsSubmitting(true);
    const promise = update({ id: initialData._id, isPublished: false }).finally(
      () => {
        setIsSubmitting(false);
      }
    );
    toast.promise(promise, {
      success: 'Document unpublished successfully',
      error: 'Failed to unpublish document',
      loading: 'Unpublishing document...',
    });
  };

  const onCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 2000);
      })
      .finally(() => {
        toast.success('Link copied to clipboard');
      });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          Publish
          {initialData.isPublished && <BiGlobe className="mr-2" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align={'end'} sideOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="flex flex-col gap-2">
            <div className="flex gap-x-2 items-center">
              <BiGlobe className="text-sky-500 animate-pulse w-4 h-4" />
              <p className="text-xs font-medium text-sky-500">
                This note live on web
              </p>
            </div>
            <div className="flex items-center">
              <Input
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                value={url}
                disabled
              />
              <Button
                className="h-8 rounded-l-none"
                onClick={onCopy}
                disabled={copy}
              >
                {copy ? (
                  <BiCheck className="w-4 h-4" />
                ) : (
                  <BiCopy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <Button
              className="w-full text-xs"
              size="sm"
              disabled={isSubmitting}
              onClick={onUnPublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <BiGlobe className="text-2xl" />
            <p className="text-sm font-medium mb-2">Publish this note</p>
            <span className="text-xs text-muted-foreground mb-4">
              Share your work with others.
            </span>
            <Button
              className="w-full text-xs"
              size="sm"
              disabled={isSubmitting}
              onClick={onPublish}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
