'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Play,
  Code,
  FileText,
  Users,
  Zap,
  ArrowRight,
  Monitor,
  Smartphone,
  Tablet,
} from 'lucide-react';
import { cn } from '@/utils/lib';

const demoSections = [
  {
    id: 'editor',
    title: 'Rich Text Editor',
    icon: <FileText className="h-4 w-4" />,
    description: 'Experience our powerful block-based editor',
    features: [
      'Drag & drop blocks',
      'Real-time collaboration',
      'Rich formatting',
      'Media embeds',
    ],
    image: '/demo/editor.png',
  },
  {
    id: 'collaboration',
    title: 'Team Collaboration',
    icon: <Users className="h-4 w-4" />,
    description: 'See how teams work together seamlessly',
    features: [
      'Live cursors',
      'Comments & mentions',
      'Version history',
      'Permissions',
    ],
    image: '/demo/collaboration.png',
  },
  {
    id: 'automation',
    title: 'Workflow Automation',
    icon: <Zap className="h-4 w-4" />,
    description: 'Automate repetitive tasks and processes',
    features: [
      'Custom workflows',
      'Triggers & actions',
      'API integrations',
      'Smart templates',
    ],
    image: '/demo/automation.png',
  },
  {
    id: 'api',
    title: 'Developer API',
    icon: <Code className="h-4 w-4" />,
    description: 'Build custom integrations with our API',
    features: ['RESTful API', 'Webhooks', 'SDK libraries', 'Documentation'],
    image: '/demo/api.png',
  },
];

const devices = [
  { id: 'desktop', icon: <Monitor className="h-4 w-4" />, label: 'Desktop' },
  { id: 'tablet', icon: <Tablet className="h-4 w-4" />, label: 'Tablet' },
  { id: 'mobile', icon: <Smartphone className="h-4 w-4" />, label: 'Mobile' },
];

export function InteractiveDemoSection() {
  const [activeDemo, setActiveDemo] = useState('editor');
  const [activeDevice, setActiveDevice] = useState('desktop');

  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Play className="h-3 w-3 mr-1" />
            Interactive Demo
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            See it in action
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our platform's capabilities through interactive demos. No
            signup required.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Demo Navigation */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Choose a demo
            </h3>
            <div className="space-y-2">
              {demoSections.map((demo) => (
                <button
                  key={demo.id}
                  onClick={() => setActiveDemo(demo.id)}
                  className={cn(
                    'w-full text-left p-4 rounded-lg border transition-all duration-200',
                    activeDemo === demo.id
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-white/50 dark:bg-slate-800/50 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700'
                  )}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {demo.icon}
                    <span className="font-medium">{demo.title}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {demo.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Demo Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              {/* Device Selector */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {demoSections.find((d) => d.id === activeDemo)?.title}
                </h4>
                <div className="flex items-center gap-2">
                  {devices.map((device) => (
                    <button
                      key={device.id}
                      onClick={() => setActiveDevice(device.id)}
                      className={cn(
                        'flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-colors',
                        activeDevice === device.id
                          ? 'bg-primary text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      )}
                    >
                      {device.icon}
                      {device.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Demo Content */}
              <div className="p-6">
                <div
                  className={cn(
                    'mx-auto bg-gray-100 dark:bg-slate-800 rounded-lg overflow-hidden',
                    activeDevice === 'desktop' && 'max-w-full aspect-video',
                    activeDevice === 'tablet' && 'max-w-md aspect-[4/3]',
                    activeDevice === 'mobile' && 'max-w-xs aspect-[9/16]'
                  )}
                >
                  {/* Placeholder for demo content */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                      <Play className="h-12 w-12 mx-auto mb-4" />
                      <p className="text-sm">Interactive demo will load here</p>
                    </div>
                  </div>
                </div>

                {/* Demo Features */}
                <div className="mt-6">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                    Key Features:
                  </h5>
                  <div className="grid grid-cols-2 gap-3">
                    {demoSections
                      .find((d) => d.id === activeDemo)
                      ?.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-primary rounded-full" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {feature}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white group">
                    Try This Feature Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Ready to experience the full power?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                These demos show just a glimpse of what's possible. Sign up for
                free to explore everything.
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Start Your Free Trial
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
