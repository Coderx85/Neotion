import React, { ReactNode } from 'react';
import { inter, lora } from '../styles/font';
import { Metadata } from 'next';
import { Toaster } from 'sonner';
import '@/styles/globals.css';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'Main Layout',
  description: 'This is the main layout of the application.',
};

const MainLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={`${inter.className} ${lora.className} antialiased`}>
        {/* 
        <Provider>
          {children}
          <SidebarPage />
        </Provider>
        */}
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
          <SidebarPage />
          <main className="flex-1 h-full overflow-y-auto">{children}</main>
        </div>
            {children}
      </body>
    </html>
  );
};

export default MainLayout;
