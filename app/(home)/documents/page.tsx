'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FaPlusCircle } from 'react-icons/fa';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';

const WelcomePage = () => {
  const user = useUser();

  const create = useMutation(api.document.create);

  const onCreate = () => {
    const promise = create({ title: 'Untitled' });

    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New note created',
      error: 'Failed to create a new note',
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-full space-y-4">
      <Image
        className="dark:hidden"
        src="/empty.png"
        alt="Empty"
        width="300"
        height="300"
      />
      <Image
        className="hidden dark:block"
        src="/empty-dark.png"
        alt="Empty"
        width="300"
        height="300"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user.user?.firstName}&apos;s Notion Clone
      </h2>
      <Button onClick={onCreate}>
        <FaPlusCircle className="w-4 h-4 mr-2" />
        Create note
      </Button>
    </div>
  );
};

export default WelcomePage;
