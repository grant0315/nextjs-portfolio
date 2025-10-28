'use client';

import { useEffect, useRef } from 'react';

/**
 * Mobile-optimized neural network animation
 * Uses canvas but with significantly reduced particle count and optimization
 * Stays fixed to viewport like desktop version
 */
export const MobileNeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false });
    if (!ctx) return;

    // Set canvas to match full viewport
    const handleResize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Center point for particle attraction - positioned in safe visible area
    // Center X: middle of screen, Center Y: upper third (safe from navbar)
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight * 0.35;

    // Update center on resize to keep it centered
    const updateCenter = () => {
      centerX = window.innerWidth / 2;
      centerY = window.innerHeight * 0.35;
    };

    window.addEventListener('resize', updateCenter);

    // Particles with floating/spiral data - similar to desktop but optimized for mobile
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      angle: number;
      speed: number;
      opacity: number;
    }> = [];

    // Initialize 50 particles (more particles for denser effect)
    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 2;
      const radius = Math.random() * 360 + 160; // Double the initial radius
      
      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.5 + 1.5, // Larger particles
        angle: angle,
        speed: Math.random() * 0.015 + 0.005,
        opacity: Math.random() * 0.6 + 0.3,
      });
    }

    let frameCount = 0;
    let time = 0;

    const animate = () => {
      // Skip frames on mobile for performance (every 2nd frame)
      frameCount++;
      if (frameCount % 2 !== 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Clear canvas with proper clearing
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      time += 0.016;

      // Update and draw particles with floating/spiral motion like desktop
      particles.forEach((particle, index) => {
        // Update particle position in spiral like desktop version
        particle.angle += particle.speed * 0.4;
        const spiralRadius = 280 + Math.sin(time * 0.3 + index * 0.1) * 140; // Double the spiral radius
        const spiralOffset = time * 0.15 + index * 0.2;
        
        particle.x = centerX + Math.cos(particle.angle + spiralOffset) * spiralRadius;
        particle.y = centerY + Math.sin(particle.angle + spiralOffset) * spiralRadius;
        
        // Add some organic floating motion with velocity
        particle.vx += (Math.random() - 0.5) * 0.1;
        particle.vy += (Math.random() - 0.5) * 0.1;
        
        // Damping for smooth motion
        particle.vx *= 0.95;
        particle.vy *= 0.95;
        
        particle.x += particle.vx * 0.5;
        particle.y += particle.vy * 0.5;
        
        // Pulsing opacity like desktop
        particle.opacity = 0.3 + Math.sin(time * 1.5 + index * 0.1) * 0.4;

        // Draw particle
        ctx.fillStyle = `rgba(79, 1, 71, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 280) {
            const opacity = (1 - distance / 280) * 0.15;
            ctx.strokeStyle = `rgba(79, 1, 71, ${opacity})`;
            ctx.lineWidth = 1; // Thicker lines
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw orbital rings like desktop version
      const ringConfigs = [
        { radius: 100, opacity: 0.4 },
        { radius: 200, opacity: 0.3 },
        { radius: 300, opacity: 0.2 }
      ];
      
      ringConfigs.forEach((ring) => {
        const ringOpacity = ring.opacity + Math.sin(time * 0.5) * ring.opacity * 0.5;
        ctx.strokeStyle = `rgba(79, 1, 71, ${ringOpacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw diagonal grid lines for visual interest
      const gridSpacing = 120;
      const gridLines = [];
      
      // Generate diagonal lines
      for (let i = -2; i < 3; i++) {
        for (let j = -2; j < 3; j++) {
          gridLines.push({
            x1: centerX + i * gridSpacing - 250,
            y1: centerY + j * gridSpacing - 250,
            x2: centerX + i * gridSpacing + 250,
            y2: centerY + j * gridSpacing + 250,
          });
        }
      }
      
      // Draw grid lines with fading opacity
      gridLines.forEach((line) => {
        const fadeOpacity = 0.08 + Math.sin(time * 0.2) * 0.04;
        ctx.strokeStyle = `rgba(79, 1, 71, ${fadeOpacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
      })

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', updateCenter);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 0,
        background: 'transparent',
      }}
    />
  );
};
