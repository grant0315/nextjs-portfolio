'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export const BlogNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get URLs based on environment
  const getMainUrl = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.includes('localhost')) {
        return 'http://localhost:3000';
      }
    }
    return 'https://www.granthopkins.com';
  };

  const getDemosUrl = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname.includes('localhost')) {
        return 'http://demos.localhost:3000';
      }
    }
    return 'https://demos.granthopkins.com';
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-purple-600 to-purple-800"
        style={{
          scaleX: scrollProgress / 100,
          transformOrigin: '0%',
        }}
        initial={{ scaleX: 0 }}
      />

      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
        style={{
          paddingTop: isScrolled ? '0.5rem' : '1.5rem',
          paddingBottom: isScrolled ? '0.5rem' : '1.5rem',
        }}
        role="navigation"
        aria-label="Blog navigation"
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo - Link to main site */}
          <motion.a
            href={getMainUrl()}
            className="transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Grant Hopkins - Go to portfolio"
          >
            <Image 
              src="/icon.png" 
              alt="Grant Hopkins Logo" 
              width={32} 
              height={32}
              className="rounded"
              priority
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <motion.a
              href={getMainUrl()}
              className="text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 rounded px-2 py-1"
              style={{ color: '#5a4a5c' }}
              whileHover={{ color: '#4F0147' }}
            >
              Portfolio
            </motion.a>
            <motion.a
              href={getDemosUrl()}
              className="text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 rounded px-2 py-1"
              style={{ color: '#5a4a5c' }}
              whileHover={{ color: '#4F0147' }}
            >
              Demos
            </motion.a>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 rounded px-2 py-1"
              style={{ color: '#4F0147' }}
            >
              Blog
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-purple-600 rounded p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: '#2d1b2e' }}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
          role="region"
          aria-label="Mobile navigation menu"
        >
          <ul className="px-4 py-4 flex flex-col gap-0 backdrop-blur-md">
            <li>
              <motion.a
                href={getMainUrl()}
                className="w-full text-left py-4 px-6 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-inset rounded-lg"
                style={{ color: '#5a4a5c' }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portfolio
              </motion.a>
            </li>
            <li>
              <motion.a
                href={getDemosUrl()}
                className="w-full text-left py-4 px-6 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-inset rounded-lg"
                style={{ color: '#5a4a5c' }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Demos
              </motion.a>
            </li>
            <li>
              <motion.button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left py-4 px-6 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-inset rounded-lg"
                style={{ color: '#4F0147' }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                Back to Top
              </motion.button>
            </li>
          </ul>
        </motion.div>
      </motion.nav>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 shadow-lg flex items-center justify-center"
        style={{
          backgroundColor: '#4F0147',
          color: 'white',
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: scrollProgress > 20 ? 1 : 0,
          scale: scrollProgress > 20 ? 1 : 0,
        }}
        whileHover={{ scale: 1.15, boxShadow: '0 20px 40px rgba(79, 1, 71, 0.4)' }}
        whileTap={{ scale: 0.85 }}
        aria-label="Back to top"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </>
  );
};

