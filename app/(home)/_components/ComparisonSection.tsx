'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Crown, Zap, Shield, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/lib';

const features = [
  {
    category: 'Core Features',
    items: [
      {
        name: 'Rich Text Editor',
        us: true,
        competitor1: true,
        competitor2: false,
      },
      {
        name: 'Real-time Collaboration',
        us: true,
        competitor1: true,
        competitor2: true,
      },
      {
        name: 'Block-based Content',
        us: true,
        competitor1: false,
        competitor2: false,
      },
      {
        name: 'Drag & Drop Interface',
        us: true,
        competitor1: false,
        competitor2: true,
      },
      {
        name: 'Custom Templates',
        us: true,
        competitor1: true,
        competitor2: false,
      },
    ],
  },
  {
    category: 'Advanced Features',
    items: [
      { name: 'API Access', us: true, competitor1: false, competitor2: false },
      {
        name: 'Workflow Automation',
        us: true,
        competitor1: false,
        competitor2: false,
      },
      {
        name: 'Advanced Permissions',
        us: true,
        competitor1: true,
        competitor2: false,
      },
      {
        name: 'Custom Integrations',
        us: true,
        competitor1: false,
        competitor2: false,
      },
      {
        name: 'White-label Options',
        us: true,
        competitor1: false,
        competitor2: false,
      },
    ],
  },
  {
    category: 'Enterprise',
    items: [
      {
        name: 'SSO Integration',
        us: true,
        competitor1: true,
        competitor2: false,
      },
      {
        name: 'Advanced Analytics',
        us: true,
        competitor1: false,
        competitor2: false,
      },
      {
        name: 'Priority Support',
        us: true,
        competitor1: true,
        competitor2: false,
      },
      {
        name: 'Custom Onboarding',
        us: true,
        competitor1: false,
        competitor2: false,
      },
      {
        name: 'SLA Guarantees',
        us: true,
        competitor1: false,
        competitor2: false,
      },
    ],
  },
];

const competitors = [
  {
    name: 'Our Platform',
    highlight: true,
    badge: 'Best Choice',
    color: 'bg-primary text-white',
    icon: <Crown className="h-4 w-4" />,
  },
  {
    name: 'Competitor A',
    highlight: false,
    color: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  },
  {
    name: 'Competitor B',
    highlight: false,
    color: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  },
];

export function ComparisonSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800" />

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Shield className="h-3 w-3 mr-1" />
            Feature Comparison
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            See how we stack up
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Compare our features with the leading alternatives and see why
            thousands choose us.
          </p>
        </div>

        {/* Comparison Table */}
        <Card className="overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-b border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-4 gap-4">
              <div></div>
              {competitors.map((competitor, index) => (
                <div key={index} className="text-center">
                  <div
                    className={cn(
                      'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium',
                      competitor.color
                    )}
                  >
                    {competitor.icon}
                    {competitor.name}
                  </div>
                  {competitor.badge && (
                    <Badge className="mt-2 bg-primary/20 text-primary border-primary/30">
                      {competitor.badge}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {features.map((category) => (
              <div key={category.category}>
                <div className="bg-gray-50 dark:bg-slate-800 px-6 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {category.category}
                  </h3>
                </div>
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      {item.us ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex justify-center">
                      {item.competitor1 ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex justify-center">
                      {item.competitor2 ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Experience the difference
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Don't take our word for it. Try our platform for free and see
                why it's the preferred choice for teams worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white group"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="border-2">
                  Schedule Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
