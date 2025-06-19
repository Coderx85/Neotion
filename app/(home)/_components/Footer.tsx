import Link from 'next/link';
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiCodersrank } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="w-full align-bottom content-end px-8 py-10 flex flex-col">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <SiCodersrank className="h-auto w-8 text-primary" />
            <h2 className="text-xl font-bold">Collaro</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">
            A modern platform for seamless developer discussions, video
            conferencing, and collaboration.
          </p>
          <div className="flex gap-4 mt-2">
            <Link
              href="https://github.com/Coderx85"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <FaGithub size={22} />
            </Link>
            <Link
              href="https://coderx85.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <SiCodersrank size={22} />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <FaTwitter size={22} />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
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
                href="/workspace"
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Workspaces
              </Link>
            </li>
            <li>
              <Link
                href="/guide"
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                User Guide
              </Link>
            </li>
            <li>
              <Link
                href="/about-me"
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                About Me
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Contact</h3>
          <div className="flex items-center gap-2">
            <MdEmail className="text-primary" />
            <a
              href="mailto:work.priyanshu085@gmail.com"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              work.priyanshu085@gmail.com
            </a>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Feel free to reach out with any questions, feedback, or
            collaboration opportunities.
          </p>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Collaro. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built with ❤️ by{' '}
            <Link
              href="https://github.com/Coderx85"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary dark:hover:text-primary transition-colors"
            >
              Priyanshu
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
