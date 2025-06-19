import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ModalProvider } from '@/components/providers/modal-provider';
import Provider from '@/components/providers/Provider';
import { DocumentLayoutProps } from '@/types';

export default async function DocumentLayout({
  children,
  sidebar,
}: DocumentLayoutProps) {
  const { userId } = await auth();

  if (!userId) {
    return redirect('/sign-in');
  }

  return (
    <Provider>
      <div className="h-screen flex bg-gray-200 dark:bg-zinc-900 overflow-hidden">
        {sidebar}
        <ModalProvider />
        <main className="flex-1 h-full overflow-y-auto overflow-x-hidden w-full min-w-0">
          {children}
        </main>
      </div>
    </Provider>
  );
}
