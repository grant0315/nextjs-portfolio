'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  items: React.ReactNode[];
  itemsPerView?: number;
  gap?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
}

export const SwipeableCarousel = ({
  items,
  itemsPerView = 1,
  gap = 16,
  autoPlay = false,
  autoPlayInterval = 5000,
  showIndicators = true,
  showArrows = true,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerView);

  // Handle swipe/drag detection
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndRef.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = useCallback(() => {
    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, totalPages]);

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  // Navigation functions
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, totalPages - 1));
  };

  // Auto-play effect
  useEffect(() => {
    if (autoPlay) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
      }, autoPlayInterval);

      return () => {
        if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      };
    }
  }, [autoPlay, autoPlayInterval, totalPages]);

  // Reset auto-play timer on manual navigation
  useEffect(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    if (autoPlay) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
      }, autoPlayInterval);
    }
  }, [currentIndex, autoPlay, autoPlayInterval, totalPages]);

  // Add keyboard listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Calculate offset for carousel position
  const offset = -currentIndex * (100 / itemsPerView);

  return (
    <div className="w-full relative group">
      {/* Main carousel container */}
      <div
        ref={containerRef}
        className="carousel-container relative overflow-hidden rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Carousel"
        aria-live="polite"
      >
        {/* Items wrapper */}
        <motion.div
          className="flex"
          animate={{ x: `${offset}%` }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{ gap: `${gap}px` }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="carousel-item"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {item}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation arrows (desktop) */}
      {showArrows && totalPages > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: '#4F0147' }} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" style={{ color: '#4F0147' }} />
          </motion.button>
        </>
      )}

      {/* Indicators (dots) */}
      {showIndicators && totalPages > 1 && (
        <div className="carousel-indicators mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {/* Touch swipe hint for mobile */}
      {showArrows && totalPages > 1 && (
        <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium opacity-50 pointer-events-none text-center px-4">
          Swipe to navigate
        </div>
      )}
    </div>
  );
};
