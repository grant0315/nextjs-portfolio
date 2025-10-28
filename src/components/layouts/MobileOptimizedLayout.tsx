'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MobileOptimizedLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Mobile-optimized layout wrapper that handles:
 * - Touch-friendly spacing
 * - Responsive padding adjustments
 * - Safe area insets for notched devices
 * - Gesture detection
 */
export const MobileOptimizedLayout = ({
  children,
  className = '',
}: MobileOptimizedLayoutProps) => {
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      setViewportHeight(window.innerHeight);
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  return (
    <motion.div
      className={`w-full ${className}`}
      style={{
        minHeight: viewportHeight > 0 ? `${viewportHeight}px` : '100vh',
        paddingTop: 'max(1rem, env(safe-area-inset-top))',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        paddingLeft: 'max(1rem, env(safe-area-inset-left))',
        paddingRight: 'max(1rem, env(safe-area-inset-right))',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Touch-optimized button wrapper that ensures 44px+ tap targets
 */
interface TouchButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof React.DOMAttributes<HTMLButtonElement>> {
  children: React.ReactNode;
  isActive?: boolean;
}

export const TouchButton = ({
  children,
  isActive = false,
  className = '',
  ...props
}: TouchButtonProps) => {
  return (
    <motion.button
      className={`inline-flex items-center justify-center min-w-11 min-h-11 rounded-lg transition-all ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};

/**
 * Mobile gesture detector hook for swipe events
 */
export const useSwipeGesture = (
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  onSwipeUp?: () => void,
  onSwipeDown?: () => void
) => {
  const touchStartRef = React.useRef({ x: 0, y: 0 });
  const touchEndRef = React.useRef({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndRef.current = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const xDiff = touchStartRef.current.x - touchEndRef.current.x;
    const yDiff = touchStartRef.current.y - touchEndRef.current.y;

    // Determine swipe direction (minimum 50px distance)
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      // Horizontal swipe
      if (xDiff > 50 && onSwipeLeft) onSwipeLeft();
      if (xDiff < -50 && onSwipeRight) onSwipeRight();
    } else {
      // Vertical swipe
      if (yDiff > 50 && onSwipeUp) onSwipeUp();
      if (yDiff < -50 && onSwipeDown) onSwipeDown();
    }
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };
};

/**
 * Landscape orientation detector hook
 */
export const useLandscapeDetection = () => {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    updateOrientation();
    window.addEventListener('orientationchange', updateOrientation);
    window.addEventListener('resize', updateOrientation);

    return () => {
      window.removeEventListener('orientationchange', updateOrientation);
      window.removeEventListener('resize', updateOrientation);
    };
  }, []);

  return isLandscape;
};

/**
 * Safe area detection for notched devices
 */
export const useSafeAreaInsets = () => {
  const [insets, setInsets] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    const updateInsets = () => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);

      // Parse safe-area-inset values (fallback to 0)
      const parseInset = (value: string) => {
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
      };

      setInsets({
        top: parseInset(computedStyle.getPropertyValue('--safe-area-inset-top')),
        bottom: parseInset(computedStyle.getPropertyValue('--safe-area-inset-bottom')),
        left: parseInset(computedStyle.getPropertyValue('--safe-area-inset-left')),
        right: parseInset(computedStyle.getPropertyValue('--safe-area-inset-right')),
      });
    };

    updateInsets();
    window.addEventListener('orientationchange', updateInsets);

    return () => window.removeEventListener('orientationchange', updateInsets);
  }, []);

  return insets;
};
