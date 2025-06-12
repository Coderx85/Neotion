import React from 'react';

const AuthLayout = ({ chidren }: { chidren: React.ReactNode }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-zinc-900">
      {chidren}
    </div>
  );
};

export default AuthLayout;
