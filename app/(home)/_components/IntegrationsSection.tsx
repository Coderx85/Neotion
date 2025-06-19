'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Code2,
  Palette,
  Workflow,
  Database,
  Lock,
  Zap,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { cn } from '@/utils/lib';

const integrations = [
  {
    name: 'Developer Tools',
    description: 'Connect with your favorite development tools',
    icon: <Code2 className="h-6 w-6" />,
    tools: ['GitHub', 'GitLab', 'VS Code', 'Figma'],
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
  {
    name: 'Design Systems',
    description: 'Seamless integration with design workflows',
    icon: <Palette className="h-6 w-6" />,
    tools: ['Figma', 'Sketch', 'Adobe XD', 'InVision'],
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
  },
  {
    name: 'Automation',
    description: 'Automate your workflows with popular tools',
    icon: <Workflow className="h-6 w-6" />,
    tools: ['Zapier', 'IFTTT', 'Make', 'n8n'],
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-200 dark:border-green-800',
  },
  {
    name: 'Databases',
    description: 'Connect to your existing data sources',
    icon: <Database className="h-6 w-6" />,
    tools: ['Airtable', 'MongoDB', 'PostgreSQL', 'Supabase'],
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
  },
];

const features = [
  'Real-time collaboration',
  'Advanced permissions',
  'API access',
  'Custom integrations',
  'Enterprise security',
  '24/7 support',
];

export function IntegrationsSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Integrations
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Connect with your favorite tools
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Seamlessly integrate with over 100+ popular tools and services.
            Build powerful workflows that connect your entire tech stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {integrations.map((integration, index) => (
            <IntegrationCard
              key={integration.name}
              integration={integration}
              index={index}
            />
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Enterprise-ready features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white group">
              Explore All Integrations
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl" />
            <Card className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Enterprise Security
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Bank-level security with SOC 2 compliance, end-to-end
                  encryption, and advanced access controls.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      SSL Encryption
                    </span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      SOC 2 Compliance
                    </span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      GDPR Ready
                    </span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationCard({
  integration,
}: {
  integration: (typeof integrations)[0];
  index: number;
}) {
  return (
    <Card
      className={cn(
        'group relative overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 border-0',
        integration.borderColor
      )}
    >
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          integration.color
        )}
      />

      <CardContent className="relative p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 group-hover:scale-110 transition-transform duration-300">
            {integration.icon}
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {integration.name}
          </h3>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {integration.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {integration.tools.map((tool) => (
            <Badge key={tool} variant="secondary" className="text-xs">
              {tool}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
