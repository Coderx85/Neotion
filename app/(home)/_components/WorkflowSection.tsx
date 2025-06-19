'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/utils/lib';
import {
  BiArrowToRight,
  BiCheckCircle,
  BiPauseCircle,
  BiPlayCircle,
  BiReset,
  BiSolidArrowToRight,
  BiSolidFile,
  BiSolidMessageSquare,
  BiSolidShare,
  BiSolidUserRectangle,
} from 'react-icons/bi';
import { IconType } from 'react-icons/lib';

interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: IconType;
  color: string;
  details: string[];
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: 'Create & Write',
    description: 'Start with our intuitive block-based editor',
    icon: BiSolidFile,
    color: 'from-blue-500/20 to-cyan-500/20',
    details: [
      'Rich text formatting',
      'Drag & drop blocks',
      'Media embeds',
      'Templates',
    ],
  },
  {
    id: 2,
    title: 'Collaborate',
    description: 'Invite team members and work together',
    icon: BiSolidUserRectangle,
    color: 'from-green-500/20 to-emerald-500/20',
    details: [
      'Real-time editing',
      'Live cursors',
      'Commenting system',
      'Version history',
    ],
  },
  {
    id: 3,
    title: 'Review & Comment',
    description: 'Get feedback and iterate quickly',
    icon: BiSolidMessageSquare,
    color: 'from-orange-500/20 to-red-500/20',
    details: [
      'Inline comments',
      'Mention teammates',
      'Resolve discussions',
      'Approval workflows',
    ],
  },
  {
    id: 4,
    title: 'Share & Publish',
    description: 'Make your work accessible to everyone',
    icon: BiSolidShare,
    color: 'from-purple-500/20 to-pink-500/20',
    details: [
      'Public sharing',
      'Access controls',
      'Embed options',
      'Export formats',
    ],
  },
];

export function WorkflowSection() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Auto-advance through steps
      const interval = setInterval(() => {
        setActiveStep((prev) => {
          const next = prev >= 4 ? 1 : prev + 1;
          if (next === 1 && prev === 4) {
            setIsPlaying(false);
            clearInterval(interval);
          }
          return next;
        });
      }, 2000);
    }
  };

  const resetDemo = () => {
    setActiveStep(1);
    setIsPlaying(false);
  };

  const Icon = workflowSteps[activeStep - 1]?.icon;

  return (
    <div className="relative overflow-hidden min-h-screen" id="guide">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Your workflow, simplified
          </h2>
        </div>

        {/* Interactive Demo Controls */}
        <div className="flex justify-center gap-4 mb-9">
          <Button
            variant="outline"
            onClick={handlePlayPause}
            className={cn(
              'text-white dark:text-green-500/75 dark:border-green-500/75 dark:bg-transparent bg-green-600',
              'hover:bg-green-700 hover:text-white dark:hover:text-green-500/75 dark:hover:bg-white/15 transition-colors',
              isPlaying &&
                'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white dark:text-white'
            )}
          >
            {isPlaying ? (
              <BiPauseCircle className="h-4 w-4" />
            ) : (
              <BiPlayCircle className="h-4 w-4" />
            )}
            {isPlaying ? 'Pause Demo' : 'Play Demo'}
          </Button>
          <Button
            variant="outline"
            onClick={resetDemo}
            className={cn(
              'flex items-center gap-2 transition-opacity text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600/50 bg-white/80 dark:bg-slate-900/80',
              'hover:bg-white/90 dark:hover:bg-slate-800/90 dark:hover:text-gray-300 hover:text-gray-700'
            )}
          >
            <BiReset className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Steps Navigation */}
          <div className="space-y-4">
            {workflowSteps.map((step: WorkflowStep) => (
              <WorkflowStep
                key={step.id}
                step={step}
                isActive={activeStep === step.id}
                isCompleted={activeStep > step.id}
                onClick={() => setActiveStep(step.id)}
              />
            ))}
          </div>

          {/* Active Step Detail */}
          <div className="lg:sticky lg:top-8">
            <Card className="overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0">
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-20',
                  workflowSteps[activeStep - 1]?.color
                )}
              />

              <CardContent className="relative px-6 py-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6 text-black/75 dark:text-white/75" />
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      Step {activeStep}
                    </Badge>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {workflowSteps[activeStep - 1]?.title}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                  {workflowSteps[activeStep - 1]?.description}
                </p>

                <div className="space-y-3 mb-8">
                  {workflowSteps[activeStep - 1]?.details.map(
                    (detail, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <BiCheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {detail}
                        </span>
                      </div>
                    )
                  )}
                </div>

                {/* Visual Placeholder */}
                <div className="bg-gray-100 dark:bg-slate-800 rounded-lg p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6 dark:text-black/75 text-white/75" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Interactive demo for {workflowSteps[activeStep - 1]?.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-16">
          <div className="flex justify-center items-center gap-2 mb-4">
            {workflowSteps.map((step: WorkflowStep) => (
              <div
                key={step.id}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  activeStep === step.id
                    ? 'bg-primary scale-125'
                    : activeStep > step.id
                      ? 'bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-700'
                )}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Step {activeStep} of {workflowSteps.length}
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-0">
            <CardContent className="px-6 py-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Ready to streamline your workflow?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Join thousands of teams who have already transformed their
                productivity with our intuitive platform.
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white group"
              >
                Get Started Now
                <BiSolidArrowToRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function WorkflowStep({
  step,
  isActive,
  isCompleted,
  onClick,
}: {
  step: (typeof workflowSteps)[0];
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}) {
  const Icon = step.icon;
  return (
    <Card
      className={cn(
        'group cursor-pointer transition-all duration-300 border-0',
        isActive
          ? 'bg-primary/10 shadow-lg'
          : isCompleted
            ? 'bg-green-50 dark:bg-green-900/20'
            : 'bg-white/50 dark:bg-slate-900/50 hover:bg-white/70 dark:hover:bg-slate-800/70'
      )}
      onClick={onClick}
    >
      <CardContent className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              'flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300',
              isActive
                ? 'bg-primary text-white scale-110'
                : isCompleted
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400'
            )}
          >
            {isCompleted ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <Icon
                className={cn(
                  'h-6 w-6 text-black/75 dark:text-white/75 transition-colors',
                  isActive && 'text-white/75 dark:text-black/75'
                )}
              />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3
                className={cn(
                  'font-semibold transition-colors',
                  isActive ? 'text-primary' : 'text-gray-900 dark:text-white'
                )}
              >
                {step.title}
              </h3>
              <Badge
                variant={isActive ? 'default' : 'secondary'}
                className={cn('text-xs', isActive && 'bg-primary')}
              >
                {step.id}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {step.description}
            </p>
          </div>

          <BiArrowToRight
            className={cn(
              'h-5 w-5 transition-all duration-300',
              isActive
                ? 'text-primary translate-x-1'
                : 'text-gray-400 group-hover:translate-x-1'
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
