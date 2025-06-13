'use client';
import { SignIn } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    setTimeout(() => {
      window.document.title = 'Sign In | Neotion';
    }, 3000);
  }, []);

  return <SignIn />;
}
