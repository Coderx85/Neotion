import React, { ReactNode } from 'react';
import { inter, lora } from '../styles/font';
import { Metadata } from 'next';
import { Toaster } from 'sonner';
import '@/styles/globals.css';
import Provider from '@/components/providers/Provider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { LayoutProps } from '@/types';
import { EdgeStoreProvider } from '@/utils/lib/edgestore';

export const metadata: Metadata = {
  title: 'Neotion',
  description: 'A Neotion built with Next.js, Convex, and Clerk.',
};

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <Provider>
      <html lang="en">
        <body className={`${inter.className} ${lora.className} antialiased`}>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
                <Toaster position="top-right" />
                <main className="flex-1 h-full overflow-y-auto">
                  {children}
                </main>
              </div>
            </ThemeProvider>
          </EdgeStoreProvider>
        </body>
      </html>
    </Provider>
  );
};

export default MainLayout;
