'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white/90 text-sm font-medium">
              Ready to transform your workflow?
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Start building amazing
            <br />
            <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              workspaces today
            </span>
          </h2>

          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of teams who have already transformed their
            productivity. Get started in minutes, no credit card required.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/workspace">
              <Button
                size="lg"
                className="group bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>

            <Link href="/guide">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3 text-lg backdrop-blur-sm"
              >
                View Demo
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-white/60 text-sm mt-6"
          >
            14-day free trial • No credit card required • Cancel anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
