'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);

      // Detect if scrolled
      setIsScrolled(scrollTop > 50);

      // Update active section
      const heroOffset = document.getElementById('hero')?.offsetTop ?? 0;
      const aboutOffset = document.getElementById('about')?.offsetTop ?? 0;
      const projectsOffset = document.getElementById('projects')?.offsetTop ?? 0;
      const contactOffset = document.getElementById('contact')?.offsetTop ?? 0;

      if (scrollTop < aboutOffset - 100) {
        setActiveSection('hero');
      } else if (scrollTop < projectsOffset - 100) {
        setActiveSection('about');
      } else if (scrollTop < contactOffset - 100) {
        setActiveSection('projects');
      } else {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

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
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('hero')}
            className="transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 rounded"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Grant Hopkins - Go to home"
            aria-current={activeSection === 'hero' ? 'page' : undefined}
          >
            <Image 
              src="/icon.png" 
              alt="Grant Hopkins Logo" 
              width={32} 
              height={32}
              className="rounded"
              priority
            />
          </motion.button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8">
            {sections.map((section) => (
              <li key={section.id}>
                <motion.button
                  onClick={() => scrollToSection(section.id)}
                  className="relative text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 rounded px-2 py-1"
                  style={{
                    color: activeSection === section.id ? '#4F0147' : '#5a4a5c',
                  }}
                  whileHover={{ color: '#4F0147' }}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                  aria-label={`Navigate to ${section.label} section`}
                >
                  {section.label}
                  {activeSection === section.id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-800"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              </li>
            ))}
          </ul>

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
          <ul className="px-4 py-4 flex flex-col gap-0 backdrop-blur-md mobile-menu">
            {sections.map((section) => (
              <li key={section.id}>
                <motion.button
                  onClick={() => scrollToSection(section.id)}
                  className="w-full text-left py-4 px-6 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-inset rounded-lg relative"
                  style={{
                    color: activeSection === section.id ? '#4F0147' : '#5a4a5c',
                  }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                >
                  <span className="flex items-center justify-between">
                    {section.label}
                  </span>
                  
                  {/* Underline animation */}
                  <motion.div
                    className="absolute bottom-2 left-6 right-6 h-0.5 bg-gradient-to-r from-purple-600 to-purple-800"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeSection === section.id ? 1 : 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    style={{ transformOrigin: 'left' }}
                  />
                </motion.button>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.nav>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => scrollToSection('hero')}
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
        title="Back to top (or press B)"
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
