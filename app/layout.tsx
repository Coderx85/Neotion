import React, { ReactNode } from 'react';
import { inter, lora } from '../styles/font';
import { Metadata } from 'next';
import { Toaster } from 'sonner';
import '@/styles/globals.css';
import { Navigation } from '@/components/NavigationBar';
import Provider from '@/components/providers/Provider';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'Main Layout',
  description: 'This is the main layout of the application.',
};

const MainLayout = ({ children }: Props) => {
  return (
    <Provider>
      <html lang="en">
        <body className={`${inter.className} ${lora.className} antialiased`}>
          <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
            <Navigation />
            <Toaster position="top-right" />
            <main className="flex-1 h-full overflow-y-auto">{children}</main>
          </div>
          {children}
        </body>
      </html>
    </Provider>
  );
};

export default MainLayout;
