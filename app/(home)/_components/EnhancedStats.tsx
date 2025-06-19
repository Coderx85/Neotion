'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  FaUsers,
  FaFileAlt,
  FaClock,
  FaChartLine,
  FaStar,
  FaDownload,
} from 'react-icons/fa';
import { cn } from '@/utils/lib';

const stats = [
  {
    icon: <FaUsers className="h-8 w-8" />,
    value: '100K+',
    label: 'Active Users',
    description: 'Growing community of knowledge workers',
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: <FaFileAlt className="h-8 w-8" />,
    value: '5M+',
    label: 'Documents Created',
    description: 'Ideas and knowledge shared daily',
    color: 'text-green-600 dark:text-green-400',
  },
  {
    icon: <FaClock className="h-8 w-8" />,
    value: '99.9%',
    label: 'Uptime',
    description: 'Reliable workspace you can depend on',
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    icon: <FaChartLine className="h-8 w-8" />,
    value: '400%',
    label: 'Productivity Boost',
    description: 'Average improvement in team efficiency',
    color: 'text-orange-600 dark:text-orange-400',
  },
  {
    icon: <FaStar className="h-8 w-8" />,
    value: '4.8/5',
    label: 'User Rating',
    description: 'Consistently top-rated by users',
    color: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    icon: <FaDownload className="h-8 w-8" />,
    value: '250K+',
    label: 'Downloads',
    description: 'Across web, mobile, and desktop',
    color: 'text-red-600 dark:text-red-400',
  },
];

export function StatsSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)',
          backgroundSize: '20px 20px',
          opacity: 0.1,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Trusted Worldwide
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Join millions who build with Neotion
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our platform empowers teams and individuals worldwide to organize
            their thoughts, collaborate effectively, and build amazing things
            together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/50 dark:bg-slate-800/50 rounded-full backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Live updates
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Updated every minute
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ stat }: { stat: (typeof stats)[0]; index: number }) {
  return (
    <Card
      className={cn(
        'group relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 hover:bg-white dark:hover:bg-slate-800 transition-all duration-500 hover:shadow-2xl hover:scale-105',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-white before:to-gray-50 dark:before:from-slate-800 dark:before:to-slate-900 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500'
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardContent className="relative p-8 text-center">
        <div
          className={cn(
            'inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-300 group-hover:scale-110',
            'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800'
          )}
        >
          <div className={stat.color}>{stat.icon}</div>
        </div>

        <div className="space-y-2">
          <div
            className={cn(
              'text-4xl font-bold bg-gradient-to-br bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110',
              stat.color
                .replace('text-', 'from-')
                .replace(' dark:', ' to-')
                .split(' ')[0] + ' to-gray-600 dark:to-gray-300'
            )}
          >
            {stat.value}
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {stat.label}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {stat.description}
          </p>
        </div>

        {/* Animated border effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </CardContent>
    </Card>
  );
}
