'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import Link from 'next/link';

export default function PricingSection() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for personal use and small teams getting started',
      features: [
        'Up to 5 team members',
        '10GB storage',
        'Basic templates',
        'Community support',
        'Web access',
      ],
      popular: false,
      cta: 'Get Started Free',
      href: '/workspace',
    },
    {
      name: 'Pro',
      price: '$12',
      period: 'per user/month',
      description: 'Best for growing teams and businesses',
      features: [
        'Unlimited team members',
        '100GB storage',
        'Advanced templates',
        'Priority support',
        'Web & mobile access',
        'Advanced permissions',
        'Integration with tools',
        'Version history',
      ],
      popular: true,
      cta: 'Start Pro Trial',
      href: '/workspace',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'Advanced features for large organizations',
      features: [
        'Everything in Pro',
        'Unlimited storage',
        'Custom templates',
        '24/7 phone support',
        'Advanced security',
        'SSO integration',
        'Audit logs',
        'Custom branding',
      ],
      popular: false,
      cta: 'Contact Sales',
      href: '/contact-us',
    },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900"
      id="pricing"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Choose the plan that's right for your team. All plans include our
            core features with no hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white px-4 py-1 text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <Card
                className={`h-full transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? 'border-primary shadow-lg scale-105 bg-gradient-to-b from-primary/5 to-white dark:from-primary/10 dark:to-neutral-900'
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-primary/50'
                }`}
              >
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                      {plan.price}
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-400 ml-2">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-neutral-700 dark:text-neutral-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.href} className="block">
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? 'bg-primary hover:bg-primary/90 text-white'
                          : 'variant-outline'
                      }`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-neutral-600 dark:text-neutral-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
