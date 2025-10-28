'use client';

import { NeuralNetwork } from '@/components/ui/NeuralNetwork';
import { MobileNeuralNetwork } from '@/components/ui/MobileNeuralNetwork';
import { useEffect, useState } from 'react';

export const FixedBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Use viewport width as primary indicator for mobile
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, #faf8f6 0%, #f3ede8 50%, #ede3dd 100%)' }}>
      {/* Neural network animation background */}
      <div className="absolute inset-0 w-full h-full">
        {isMobile ? <MobileNeuralNetwork /> : <NeuralNetwork />}
      </div>

      {/* Animated background blobs with improved positioning */}
      <div className="absolute top-20 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ backgroundColor: '#3A015C' }}></div>
      <div className="absolute top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" style={{ backgroundColor: '#4F0147' }}></div>
      <div className="absolute -bottom-32 left-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" style={{ backgroundColor: '#35012C' }}></div>
    </div>
  );
};
