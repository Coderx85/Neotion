'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/utils/lib';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'TechFlow Inc.',
    avatar: '/avatars/sarah.jpg',
    rating: 5,
    content:
      'This Neotion has completely transformed how our team collaborates. The real-time editing and intuitive interface make it so easy to keep everyone on the same page.',
    highlight: 'transformed how our team collaborates',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Freelance Writer',
    company: 'Independent',
    avatar: '/avatars/michael.jpg',
    rating: 5,
    content:
      "As a writer, I need a tool that doesn't get in my way. This platform's clean interface and powerful editor let me focus on what matters most - my writing.",
    highlight: 'focus on what matters most',
  },
  {
    name: 'Emily Watson',
    role: 'Startup Founder',
    company: 'InnovateLab',
    avatar: '/avatars/emily.jpg',
    rating: 5,
    content:
      "We've tried many workspace tools, but this one stands out. The combination of simplicity and power is exactly what we needed to scale our operations.",
    highlight: 'combination of simplicity and power',
  },
  {
    name: 'David Park',
    role: 'Engineering Lead',
    company: 'DevCorp',
    avatar: '/avatars/david.jpg',
    rating: 5,
    content:
      'The API integration and customization options are fantastic. We were able to integrate it seamlessly with our existing workflow and tools.',
    highlight: 'integrate it seamlessly',
  },
  {
    name: 'Lisa Thompson',
    role: 'Marketing Director',
    company: 'GrowthCo',
    avatar: '/avatars/lisa.jpg',
    rating: 5,
    content:
      'Our marketing campaigns are now so much more organized. The template system and collaboration features have streamlined our entire process.',
    highlight: 'streamlined our entire process',
  },
  {
    name: 'James Wilson',
    role: 'Consultant',
    company: 'Wilson Advisory',
    avatar: '/avatars/james.jpg',
    rating: 5,
    content:
      "I can't imagine working without this tool now. It's become the central hub for all my client projects and personal knowledge management.",
    highlight: 'central hub for all my projects',
  },
];

export function TestimonialsSection() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          Testimonials
        </Badge>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Loved by thousands of users
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          See what our amazing community has to say about their experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.name}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>

      <div className="text-center mt-12">
        <div className="flex justify-center items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <span className="font-medium">4.9/5</span>
          <span>from 2,400+ reviews</span>
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  return (
    <Card
      className={cn(
        'group relative overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 hover:shadow-xl hover:scale-105 border-0',
        'hover:border-primary/20'
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardContent className="relative p-6">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <Quote className="h-8 w-8 text-primary/20 mb-4" />

        <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          "{testimonial.content}"
        </blockquote>

        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {testimonial.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 dark:text-white text-sm">
              {testimonial.name}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
              {testimonial.role} • {testimonial.company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
