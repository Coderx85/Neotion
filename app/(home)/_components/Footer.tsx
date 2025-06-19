import Link from 'next/link';
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiCodersrank } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="w-full align-bottom content-end px-8 py-10 flex flex-col relative">
      <div className="glass-card rounded-2xl p-8 mx-auto w-full max-w-6xl">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              {/* <SiCodersrank className="h-auto w-8 text-primary" /> */}
              <h2 className="text-xl font-bold">Neotion</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              A fast, secure, and extensible Notion-like clone built with modern
              web technologies.
            </p>
            <div className="flex gap-4 mt-2">
              <Link
                href="https://github.com/Coderx85"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 p-2 rounded-full glass hover:glass-strong"
              >
                <FaGithub size={22} />
              </Link>
              <Link
                href="https://coderx85.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 p-2 rounded-full glass hover:glass-strong"
              >
                <SiCodersrank size={22} />
              </Link>
              <Link
                href="https://twitter.com/PriyanshuX085"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 p-2 rounded-full glass hover:glass-strong"
              >
                <FaTwitter size={22} />
              </Link>
              <Link
                href="https://linkedin.com/in/priyanshu085/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 p-2 rounded-full glass hover:glass-strong"
              >
                <FaLinkedin size={22} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/documents"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1"
                >
                  Documents
                </Link>
              </li>
              <li>
                <Link
                  href="#guide"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1"
                >
                  User Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/about-me"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="flex items-center gap-2 p-2 rounded-lg glass hover:glass-strong transition-all duration-300">
              <MdEmail className="text-primary" />
              <a
                href="mailto:work.priyanshu085@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                work.priyanshu085@gmail.com
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Feel free to reach out with any questions, feedback, or
              collaboration opportunities.
            </p>
          </div>
        </div>

        <div className="w-full border-t border-border/50 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Neotion. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ by{' '}
              <Link
                href="https://github.com/Coderx85"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-all duration-300 glass px-2 py-1 rounded hover:glass-strong"
              >
                Priyanshu
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
