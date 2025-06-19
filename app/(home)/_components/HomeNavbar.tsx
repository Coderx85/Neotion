'use client';

import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { homeTabs } from '@/constants';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';
import React, { useState } from 'react';

const HomeNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full h-16 px-4 md:px-6 lg:px-8 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Logo */}
      <div className="flex items-center">
        <Link
          href="/"
          className="font-extrabold text-2xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:from-primary/80 hover:to-primary transition-all duration-300"
        >
          Neotion
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1">
        {homeTabs.map((tab) => (
          <Link
            key={tab.id}
            href={`#${tab.id}`}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all duration-200"
          >
            {tab.name}
          </Link>
        ))}
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center space-x-3">
        <ThemeToggle />
        <SignInButton mode="redirect">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button size="lg" variant={'outline'}>
            Get Started
          </Button>
        </SignUpButton>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center space-x-2">
        <ThemeToggle />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="secondary" size="sm">
              <FaBars className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-4 mt-8 px-2.5">
              <div className="flex flex-col space-y-2">
                {homeTabs.map((tab) => (
                  <Link
                    key={tab.id}
                    href={`#${tab.id}`}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 text-sm font-medium rounded-md hover:bg-accent transition-colors"
                  >
                    {tab.name}
                  </Link>
                ))}
              </div>
              <div className="border-t pt-4 flex flex-col space-y-2 px-5">
                <SignUpButton>
                  <Button className="justify-start" variant="link">
                    Get Started
                  </Button>
                </SignUpButton>
                <SignInButton mode="redirect">
                  <Button variant="secondary" className="justify-start">
                    Sign In
                  </Button>
                </SignInButton>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default HomeNavbar;
