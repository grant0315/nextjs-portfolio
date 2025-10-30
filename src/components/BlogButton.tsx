'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export const BlogButton = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-30"
      initial={{ opacity: 0 }}
      animate={{
        opacity: scrollProgress > 10 ? 0 : 1,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25, delay: 0.5 }}
      style={{
        pointerEvents: scrollProgress > 10 ? 'none' : 'auto',
      }}
    >
      <a
        href="https://medium.com/@granthopkins0315"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center gap-2 px-4 py-3 rounded-full backdrop-blur-sm border-2 transition-all duration-300 hover:gap-3 hover:shadow-lg overflow-hidden group cursor-pointer"
        style={{
          borderColor: '#5a4a5c',
          color: '#4F0147',
          display: 'flex',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {/* Background Image */}
        <Image
          src="/BB.png"
          alt=""
          fill
          className="absolute inset-0 object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
          style={{ zIndex: -1 }}
        />
        
        {/* Gradient Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/10 rounded-full" style={{ zIndex: -1 }} />

        <BookOpen size={18} color={"white"}/>
        <span className="text-sm text-white font-semibold">Read My Blog</span>
      </a>

      {/* Floating animation pulse */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          backgroundColor: 'rgba(79, 1, 71, 0.05)',
          borderColor: 'rgba(79, 1, 71, 0.2)',
          borderWidth: '1px',
        }}
        animate={{ scale: [1, 1.3], opacity: [1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
      />
    </motion.div>
  );
};
