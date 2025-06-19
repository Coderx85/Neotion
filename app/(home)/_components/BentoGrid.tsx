'use client';

import { cn } from '@/utils/lib';
import React from 'react';
import {
  FaFileAlt,
  FaUsers,
  FaBolt,
  FaShieldAlt,
  FaMobile,
  FaBrain,
} from 'react-icons/fa';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function BentoGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Everything you need to organize your world
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Powerful features designed to help you create, collaborate, and
          achieve more than ever before
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
        <BentoCard
          title="Rich Block Editor"
          description="Write with powerful formatting, tables, embeds, and media. Create stunning documents with our intuitive block-based editor."
          icon={<FaFileAlt className="h-6 w-6" />}
          className="md:col-span-2 md:row-span-1"
          gradient="from-blue-500/10 to-cyan-500/10"
          badge="Essential"
          features={[
            'Block-based editing',
            'Markdown support',
            'Rich formatting',
            'Media embedding',
          ]}
        />

        <BentoCard
          title="Team Collaboration"
          description="Work together seamlessly with your team in real-time with live cursors and instant sync"
          icon={<FaUsers className="h-6 w-6" />}
          className="lg:row-span-2"
          gradient="from-green-500/10 to-emerald-500/10"
          badge="Team"
          features={[
            'Live cursors',
            'Real-time comments',
            'Version history',
            'Team permissions',
          ]}
        />

        <BentoCard
          title="Lightning Fast"
          description="Optimized for speed and performance across all devices and platforms"
          icon={<FaBolt className="h-6 w-6" />}
          className=""
          gradient="from-yellow-500/10 to-orange-500/10"
          features={['Instant sync', 'Offline mode', 'Fast search']}
        />

        <BentoCard
          title="AI-Powered Assistant"
          description="Smart suggestions, automated workflows, and intelligent content generation to boost productivity"
          icon={<FaBrain className="h-6 w-6" />}
          className="md:col-span-2"
          gradient="from-purple-500/10 to-pink-500/10"
          badge="New"
          features={[
            'Auto-complete',
            'Smart templates',
            'Content suggestions',
            'Writing assistance',
          ]}
        />

        <BentoCard
          title="Enterprise Security"
          description="Bank-level security with encryption, SSO, and compliance certifications"
          icon={<FaShieldAlt className="h-6 w-6" />}
          className=""
          gradient="from-red-500/10 to-rose-500/10"
          features={[
            'End-to-end encryption',
            'SSO integration',
            'Compliance ready',
          ]}
        />

        <BentoCard
          title="Cross-Platform"
          description="Access your workspace anywhere, anytime, on any device with native apps"
          icon={<FaMobile className="h-6 w-6" />}
          className=""
          gradient="from-indigo-500/10 to-blue-500/10"
          features={['Web, mobile, desktop', 'Offline sync', 'Native apps']}
        />
      </div>
    </div>
  );
}

interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  gradient?: string;
  badge?: string;
  features?: string[];
}

function BentoCard({
  title,
  description,
  icon,
  className,
  gradient,
  badge,
  features,
}: BentoCardProps) {
  return (
    <Card
      className={cn(
        'group relative overflow-hidden border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1',
        className
      )}
    >
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
          gradient
        )}
      />

      <CardHeader className="relative pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="p-3 rounded-xl bg-muted group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
            <div className="text-foreground group-hover:text-primary transition-colors duration-300">
              {icon}
            </div>
          </div>
          {badge && (
            <Badge
              variant="secondary"
              className="text-xs opacity-80 group-hover:opacity-100 transition-opacity"
            >
              {badge}
            </Badge>
          )}
        </div>

        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
          {title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      {features && (
        <CardContent className="relative pt-0">
          <div className="flex flex-wrap gap-1 mb-3">
            {features.map((feature, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs py-1 opacity-70 group-hover:opacity-100 transition-opacity"
              >
                {feature}
              </Badge>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/10"
          >
            Learn more →
          </Button>
        </CardContent>
      )}

      {/* Animated border */}
      <div className="absolute inset-0 rounded-lg border-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
}
