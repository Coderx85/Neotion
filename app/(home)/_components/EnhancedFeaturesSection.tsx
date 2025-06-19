'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Zap,
  Users,
  Shield,
  Smartphone,
  Moon,
  Share2,
  Database,
  Clock,
} from 'lucide-react';

export default function EnhancedFeaturesSection() {
  const features = [
    {
      icon: Users,
      title: 'Real-time Collaboration',
      description:
        'Work together seamlessly with your team in real-time. See changes as they happen and never lose track of progress.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description:
        'Bank-level security with end-to-end encryption, SSO integration, and advanced permission controls.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description:
        'Optimized performance with instant loading, smart caching, and seamless synchronization across devices.',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description:
        'Full-featured mobile experience that works perfectly on any device, anywhere, anytime.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Share2,
      title: 'Easy Sharing',
      description:
        'Share your work with anyone, control permissions, and collaborate with external partners effortlessly.',
      gradient: 'from-red-500 to-rose-500',
    },
    {
      icon: Database,
      title: 'Powerful Database',
      description:
        'Built on Convex for reliable, scalable data management with real-time updates and offline support.',
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      icon: Moon,
      title: 'Dark Mode',
      description:
        "Beautiful dark mode that's easy on your eyes during those late-night work sessions.",
      gradient: 'from-gray-500 to-slate-500',
    },
    {
      icon: Clock,
      title: 'Version History',
      description:
        'Never lose your work with comprehensive version history and one-click restore functionality.',
      gradient: 'from-teal-500 to-cyan-500',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Powerful features designed to boost your team's productivity and
            streamline your workflow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 hover:scale-105">
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
