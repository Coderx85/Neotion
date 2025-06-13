import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-zinc-900">
      {children}
    </div>
  );
}
