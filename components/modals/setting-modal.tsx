'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  FaGear,
  FaPalette,
  FaMoon,
  FaSun,
  FaDesktop,
  FaUser,
  FaBell,
} from 'react-icons/fa6';
import { useSettings } from '@/stores/use-settings';
import { shortcutsProps, ThemeOption } from '@/types';
import { shortcutsKeys } from '@/constants/setting';

const SettingModal = () => {
  const { theme, setTheme } = useTheme();
  const { isOpen, onOpen, onClose } = useSettings();
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ',' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpen();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onOpen]);

  if (!mounted) {
    return null;
  }

  const themeOptions: ThemeOption[] = [
    {
      value: 'light',
      label: 'Light',
      icon: FaSun,
      description: 'Light theme with bright colors',
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: FaMoon,
      description: 'Dark theme for comfortable viewing',
    },
    {
      value: 'system',
      label: 'System',
      icon: FaDesktop,
      description: 'Follows your system preference',
    },
  ];

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[85vh] overflow-y-auto backdrop-blur-xl bg-background/80 border-border/50 shadow-2xl">
        <DialogHeader className="pb-6 border-b border-border/20">
          <DialogTitle className="flex items-center gap-3 text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            <div className="p-2 rounded-lg bg-primary/10 backdrop-blur-sm border border-primary/20">
              <FaGear className="w-5 h-5 text-primary" />
            </div>
            Settings
          </DialogTitle>
          <p className="text-sm text-muted-foreground/80 ml-12">
            Manage your preferences and account settings
          </p>
        </DialogHeader>
        <div className="space-y-8">
          {/* Appearance Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm border border-primary/10">
              <div className="p-2 rounded-lg bg-primary/10 backdrop-blur-sm">
                <FaPalette className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Appearance
              </h3>
            </div>

            <div className="space-y-4 pl-4">
              <Label className="text-sm font-medium text-foreground/90">
                Theme Preference
              </Label>
              <div className="grid grid-cols-1 gap-4">
                {themeOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isSelected = theme === option.value;
                  return (
                    <div
                      key={option.value}
                      className={`
                        group relative flex items-center justify-between p-4 rounded-xl cursor-pointer
                        backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02]
                        ${
                          isSelected
                            ? 'border-primary/40 bg-gradient-to-r from-primary/10 to-primary/5 shadow-lg shadow-primary/10'
                            : 'border-border/30 bg-card/30 hover:border-accent/40 hover:bg-accent/5 hover:shadow-md'
                        }
                      `}
                      onClick={() => handleThemeChange(option.value)}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`
                          p-3 rounded-xl transition-all duration-300 backdrop-blur-sm
                          ${
                            isSelected
                              ? 'bg-primary/20 border border-primary/30 shadow-md'
                              : 'bg-muted/50 border border-muted-foreground/20 group-hover:bg-accent/20'
                          }
                        `}
                        >
                          <IconComponent
                            className={`w-5 h-5 transition-colors ${
                              isSelected
                                ? 'text-primary'
                                : 'text-muted-foreground group-hover:text-accent-foreground'
                            }`}
                          />
                        </div>
                        <div>
                          <div
                            className={`font-semibold transition-colors ${
                              isSelected
                                ? 'text-primary'
                                : 'text-foreground group-hover:text-accent-foreground'
                            }`}
                          >
                            {option.label}
                          </div>
                          <div className="text-sm text-muted-foreground/70">
                            {option.description}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`
                        relative w-5 h-5 rounded-full border-2 transition-all duration-300 backdrop-blur-sm
                        ${
                          isSelected
                            ? 'border-primary bg-primary shadow-lg shadow-primary/25 scale-110'
                            : 'border-muted-foreground/40 group-hover:border-accent'
                        }
                      `}
                      >
                        {isSelected && (
                          <div className="absolute inset-1 rounded-full bg-background shadow-inner animate-in zoom-in-50 duration-200" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <Separator className="bg-border/30" />
          {/* Notifications Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-accent/5 to-secondary/5 backdrop-blur-sm border border-accent/10">
              <div className="p-2 rounded-lg bg-accent/10 backdrop-blur-sm">
                <FaBell className="w-4 h-4 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Notifications
              </h3>
            </div>

            <div className="space-y-5 pl-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/20 hover:bg-card/40 transition-all duration-200">
                <div className="space-y-1">
                  <Label className="text-sm font-semibold text-foreground">
                    Enable notifications
                  </Label>
                  <div className="text-sm text-muted-foreground/80">
                    Get notified about document changes and mentions
                  </div>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/20 hover:bg-card/40 transition-all duration-200">
                <div className="space-y-1">
                  <Label className="text-sm font-semibold text-foreground">
                    Sound effects
                  </Label>
                  <div className="text-sm text-muted-foreground/80">
                    Play sounds for interactions and notifications
                  </div>
                </div>
                <Switch
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
              </div>
            </div>
          </div>
          <Separator className="bg-border/30" />
          {/* Account Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-secondary/5 to-muted/5 backdrop-blur-sm border border-secondary/10">
              <div className="p-2 rounded-lg bg-secondary/10 backdrop-blur-sm">
                <FaUser className="w-4 h-4 text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Account</h3>
            </div>

            <div className="space-y-3 pl-4">
              <div className="p-4 border rounded-xl bg-gradient-to-r from-muted/20 to-muted/10 backdrop-blur-sm border-muted/30">
                <div className="text-sm text-muted-foreground/90 font-medium">
                  Account settings are managed through your Clerk account.
                </div>
              </div>
            </div>
          </div>
          <Separator className="bg-border/30" />
          {/* Keyboard Shortcuts Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-accent/5 to-primary/5 backdrop-blur-sm border border-accent/10">
              <div className="p-2 rounded-lg bg-accent/10 backdrop-blur-sm">
                <FaGear className="w-4 h-4 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Keyboard Shortcuts
              </h3>
            </div>

            <div className="space-y-3 pl-4">
              {shortcutsKeys.map((shortcut: shortcutsProps) => (
                <div
                  key={shortcut.key}
                  className="flex items-center justify-between text-sm p-3 rounded-lg bg-card/20 backdrop-blur-sm border border-border/20"
                >
                  <span className="text-foreground/80 font-medium">
                    {shortcut.description}
                  </span>
                  <kbd className="px-3 py-1.5 text-xs bg-muted/60 backdrop-blur-sm rounded-md border border-border/40 font-mono shadow-sm">
                    {'Ctrl/Meta + ' + shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
          <Separator className="bg-border/30" />
          {/* About Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-muted/5 to-card/5 backdrop-blur-sm border border-muted/10">
              <div className="p-2 rounded-lg bg-muted/10 backdrop-blur-sm">
                <FaGear className="w-4 h-4 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">About</h3>
            </div>

            <div className="space-y-4 text-sm pl-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-card/20 backdrop-blur-sm border border-border/20">
                <span className="text-foreground/80 font-medium">Version</span>
                <span className="font-mono text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-md border border-primary/20 shadow-sm">
                  1.0.0
                </span>
              </div>
              <div className="p-3 rounded-lg bg-card/20 backdrop-blur-sm border border-border/20">
                <div className="text-foreground/80 font-medium mb-2">
                  Technology Stack
                </div>
                <div className="text-muted-foreground/80">
                  Built with Next.js 15, React 19, and Convex
                </div>
              </div>
              <div className="text-xs pt-3 border-t border-border/20 text-center text-muted-foreground/60">
                © 2024 Neotion. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingModal;
