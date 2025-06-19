import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Feature } from './_components/Feature';
import { BentoGrid } from './_components/BentoGrid';
import { TestimonialsSection } from './_components/EnhancedTestimonials';
import { CTASection } from './_components/EnhancedCTA';
import { StatsSection } from './_components/EnhancedStats';
import { IntegrationsSection } from './_components/IntegrationsSection';
import { WorkflowSection } from './_components/WorkflowSection';
import FAQ from './_components/FAQs';
import ContactForm from './_components/ContactForm';
import Footer from './_components/Footer';
import { config } from '@/utils/config/env';
import HomeNavbar from './_components/HomeNavbar';

const Rootpage = async () => {
  return (
    <div className="min-h-screen">
      <HomeNavbar />
      <section
        className="relative mx-auto flex flex-col items-center justify-center overflow-y-auto scroll-smooth pt-16"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {/* Hero Section */}
        <div
          className="px-4 py-6 md:py-10 grid grid-cols-1 min-h-screen lg:grid-cols-2 lg:py-0 w-full bg-repeating-background-overlay"
          style={{ scrollSnapAlign: 'start' }}
        >
          <div className="hidden lg:flex px-10 items-center justify-center min-h-vw">
            <Image
              src="/hero.png"
              alt="hero"
              width={700}
              height={300}
              className="w-[700px] h-[350px] object-cover rounded-lg shadow-2xl"
            />
          </div>
          <div className="flex flex-col w-full items-center justify-center gap-4 py-32 xl:gap-2.5">
            <h1 className="text-4xl md:text-4xl font-semibold xl:text-8xl gap-3 flex xl:flex-row flex-col text-foreground mx-auto text-center items-center">
              {'Welcome to '}
            </h1>
            <span className="text-6xl font-sans sm:text-4xl xl:text-8xl group/heading font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-primary via-primary/75 to-primary/50 hover:to-primary transition-all duration-300">
              Neotion
            </span>
            <p className="w-full md:w-4/5 px-2 mt-4 md:mt-6 xl:mt-2 xl:max-w-5xl text-lg xl:text-lg xl:text-center text-justify leading-6 text-muted-foreground">
              {config.description}
            </p>
            <div className="flex justify-center mt-5 gap-3 sm:gap-5">
              <Link href="/documents">
                <Button
                  size="lg"
                  variant={'outline'}
                  className="rounded-lg font-semibold"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/guide">
                <Button
                  variant="link"
                  size="lg"
                  className="rounded-lg font-semibold"
                >
                  User Guide
                </Button>
              </Link>
            </div>
            <p className="mt-4 w-4/5 gap-4 md:w-3/5 xl:max-w-4xl mx-auto text-center text-xs sm:text-sm xl:text-xl text-muted-foreground">
              For any queries, contact us or want to know about me <br />
              <Link
                className="underline text-foreground hover:text-primary xl:text-2xl py-2 transition-colors"
                href="/contact-us"
                target="_blank"
              >
                Contact Us
              </Link>{' '}
              |{' '}
              <Link
                href={'/about-me'}
                className="underline text-foreground hover:text-primary xl:text-2xl py-2 transition-colors"
              >
                About Me
              </Link>
            </p>
          </div>
        </div>
        {/* Features Section */}
        <div
          className="w-full px-4 py-20 md:py-28 flex flex-col items-center justify-center"
          id="features"
        >
          <Feature />
        </div>
        {/* Bento Grid Section */}
        <div className="w-full px-4 py-20 md:py-28 flex flex-col items-center justify-center bg-gradient-to-br from-muted/50 to-background">
          <BentoGrid />
        </div>
        {/* Stats Section */}
        <div className="w-full py-10 md:py-20" id="stats">
          <StatsSection />
        </div>
        {/* Testimonials Section */}
        <div className="w-full px-8 py-10 md:py-20 flex flex-col items-center justify-center bg-repeating-background-overlay">
          <TestimonialsSection />
        </div>
        {/* Workflow Section */}
        <div className="w-full py-10 md:py-20 bg-repeating-background-overlay">
          <WorkflowSection />
        </div>
        {/* Integrations Section */}
        <div className="w-full py-10 md:py-20 bg-gradient-to-br from-gray-50/50 to-white dark:from-slate-900/50 dark:to-slate-800/50">
          <IntegrationsSection />
        </div>
        {/* CTA Section */}
        <div className="w-full py-10 md:py-20">
          <CTASection />
        </div>
        {/* FAQ Section */}
        <div
          id="faq"
          className="w-full px-8 py-10 md:py-40 bg-gradient-to-b from-gray-500/50 to-white dark:from-slate-900/50 dark:to-slate-800/50 flex flex-col min-h-screen items-center bg-repeating-background-overlay"
        >
          <FAQ />
        </div>
        {/* Contact Section */}
        <div
          id="contact"
          className="w-full bg-gradient-to-b from-gray-500/50 to-white dark:from-slate-900/50 dark:to-slate-800/50 py-4"
        >
          <div className="w-full px-8 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              <div className="lg:col-span-1">
                <ContactForm />
              </div>
              <div className="lg:col-span-2">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rootpage;
