import React, { ReactNode } from 'react';
import { inter, lora } from '../styles/font';
// import Provider from '@/components/providers/Provider';
import SidebarPage from '@/components/NavigationBar';

type Props = {
  children: ReactNode;
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
      </body>
    </html>
  );
};

export default MainLayout;
