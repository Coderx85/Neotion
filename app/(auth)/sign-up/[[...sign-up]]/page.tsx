'use client';
import { SignUp } from '@clerk/nextjs';
import { useEffect } from 'react';

const SignUpPage = () => {
  useEffect(() => {
    setTimeout(() => {
      window.document.title = 'Sign In | Neotion';
    }, 3000);
  }, []);
  return <SignUp />;
};

export default SignUpPage;
