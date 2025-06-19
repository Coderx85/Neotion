'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';

export function CTASection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.2),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Badge
            variant="secondary"
            className="mb-6 bg-primary/10 text-primary border-primary/20"
          >
            <Sparkles className="h-3 w-3 mr-1" />
            Ready to get started?
          </Badge>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Transform your
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              productivity today
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Join thousands of teams who have already revolutionized their
            workflow. Start your free trial and experience the future of
            collaborative workspaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <CTAFeature
            icon={<Zap className="h-6 w-6" />}
            title="Quick Setup"
            description="Get started in under 2 minutes"
          />
          <CTAFeature
            icon={<Target className="h-6 w-6" />}
            title="No Commitment"
            description="14-day free trial, cancel anytime"
          />
          <CTAFeature
            icon={<Sparkles className="h-6 w-6" />}
            title="Full Access"
            description="All features included in trial"
          />
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold group transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 dark:border-gray-700 hover:border-primary hover:text-primary px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            No credit card required • Setup in 2 minutes • Cancel anytime
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Trusted by teams at leading companies
            </p>
          </div>

          <div className="flex justify-center items-center gap-8 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300">
            {/* Placeholder for company logos */}
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CTAFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="group bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-0 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
      <CardContent className="text-center p-6">
        <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
