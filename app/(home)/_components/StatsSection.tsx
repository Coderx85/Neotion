'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export default function StatsSection() {
  const stats = [
    {
      number: '100K+',
      label: 'Active Users',
      description: 'Teams collaborating daily',
    },
    {
      number: '1M+',
      label: 'Documents Created',
      description: 'Ideas brought to life',
    },
    {
      number: '99.9%',
      label: 'Uptime',
      description: 'Reliable performance',
    },
    {
      number: '150+',
      label: 'Countries',
      description: 'Global reach',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            Trusted by teams worldwide
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Join thousands of teams who have chosen our platform to transform
            their workflow
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
