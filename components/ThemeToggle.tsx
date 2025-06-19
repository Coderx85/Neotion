'use client';
import React from 'react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { BiMoon, BiSun } from 'react-icons/bi';
import { Toggle } from './ui/toggle';

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Toggle
      className="rounded-full w-10 h-6"
      onClick={() => setTheme('light')}
      aria-label="Switch to light mode"
    >
      <Button className="size-6 rounded-full bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent">
        {theme === 'light' ? (
          <BiSun className="size-4 text-yellow-500" />
        ) : (
          <BiMoon className="size-4 text-gray-800" />
        )}
      </Button>
    </Toggle>
  );
};

export default ThemeToggle;
