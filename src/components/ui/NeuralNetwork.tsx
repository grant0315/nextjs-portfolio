import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
}

export const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const isMobileRef = useRef(false);
  const skipFrameRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobileScreen = () => window.innerWidth <= 768;
    
    // Desktop version should NOT render on mobile - let FixedBackground handle it
    if (checkIsMobileScreen()) {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.style.display = 'none';
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false });
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking for interactivity
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const centerX = canvas.width / (2 * window.devicePixelRatio);
      const centerY = canvas.height / (2 * window.devicePixelRatio);
      
      for (let i = 0; i < 120; i++) {
        const angle = (i / 120) * Math.PI * 2;
        const radius = Math.random() * 400 + 150;
        
        particlesRef.current.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          vx: 0,
          vy: 0,
          radius: Math.random() * 5 + 2.5,
          angle: angle,
          speed: Math.random() * 0.02 + 0.01,
          opacity: Math.random() * 0.8 + 0.2,
          hue: 280 + Math.random() * 40, // Deep purple range
        });
      }
    };

    initParticles();

    const animate = () => {
      // Performance throttling on mobile
      if (isMobileRef.current) {
        skipFrameRef.current++;
        if (skipFrameRef.current < 2) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }
        skipFrameRef.current = 0;
      }

      const rect = canvas.getBoundingClientRect();
      const displayWidth = rect.width / window.devicePixelRatio;
      const displayHeight = rect.height / window.devicePixelRatio;
      
      ctx.clearRect(0, 0, displayWidth, displayHeight);
      
      timeRef.current += 0.016;
      
      const centerX = displayWidth / 2;
      const centerY = displayHeight / 2;

      // Create spiral connections with glow effect on hover
      particlesRef.current.forEach((particle, index) => {
        // Update particle position in spiral
        particle.angle += particle.speed * 0.4; // Slower spiral rotation
        const spiralRadius = 280 + Math.sin(timeRef.current * 0.3 + index * 0.1) * 150;
        const spiralOffset = timeRef.current * 0.15 + index * 0.2;
        
        particle.x = centerX + Math.cos(particle.angle + spiralOffset) * spiralRadius;
        particle.y = centerY + Math.sin(particle.angle + spiralOffset) * spiralRadius;
        
        // Mouse interaction - particles respond to cursor
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 200 - distance) / 200;
          
          particle.vx += dx * influence * 0.002;
          particle.vy += dy * influence * 0.002;
          
          // Damping
          particle.vx *= 0.92;
          particle.vy *= 0.92;
          
          particle.x += particle.vx;
          particle.y += particle.vy;
        }
        
        // Pulsing opacity
        particle.opacity = 0.3 + Math.sin(timeRef.current * 2 + index * 0.1) * 0.4;
        
        // Draw connections to nearby particles with glow on interaction
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 240) {
              const baseOpacity = (240 - distance) / 240 * 0.3;
              
              // Enhance glow when particles are near mouse
              let glowOpacity = baseOpacity;
              if (mouseRef.current.active) {
                const toMouseDist1 = Math.sqrt(
                  Math.pow(particle.x - mouseRef.current.x, 2) + 
                  Math.pow(particle.y - mouseRef.current.y, 2)
                );
                const toMouseDist2 = Math.sqrt(
                  Math.pow(otherParticle.x - mouseRef.current.x, 2) + 
                  Math.pow(otherParticle.y - mouseRef.current.y, 2)
                );
                
                if (toMouseDist1 < 150 || toMouseDist2 < 150) {
                  glowOpacity = baseOpacity * 2;
                }
              }
              
              ctx.strokeStyle = `rgba(79, 1, 71, ${glowOpacity})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });
      });

      // Draw particles with GPU acceleration hint
      particlesRef.current.forEach((particle) => {
        // Create gradient for each particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 3
        );
        
        const primaryColor = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
        const secondaryColor = `hsla(${particle.hue + 20}, 70%, 70%, 0)`;
        
        gradient.addColorStop(0, primaryColor);
        gradient.addColorStop(1, secondaryColor);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Core particle
        ctx.fillStyle = `hsla(${particle.hue}, 80%, 70%, ${particle.opacity * 1.5})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw central energy core
      const coreOpacity = 0.1 + Math.sin(timeRef.current * 3) * 0.05;
      const coreGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 120
      );
      coreGradient.addColorStop(0, `rgba(79, 1, 71, ${coreOpacity})`);
      coreGradient.addColorStop(0.5, `rgba(58, 1, 92, ${coreOpacity * 0.5})`);
      coreGradient.addColorStop(1, 'rgba(58, 1, 92, 0)');
      
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
      ctx.fill();

      // Draw orbital rings with varied colors and pulsing
      const ringConfigs = [
        { radius: 100, color: [79, 1, 71], intensity: 0.6 },
        { radius: 200, color: [58, 1, 92], intensity: 0.5 },
        { radius: 300, color: [53, 1, 44], intensity: 0.4 }
      ];
      
      ringConfigs.forEach((ring, i) => {
        const ringOpacity = ring.intensity + Math.sin(timeRef.current * (0.5 + i * 0.1)) * ring.intensity * 0.5;
        ctx.strokeStyle = `rgba(${ring.color[0]}, ${ring.color[1]}, ${ring.color[2]}, ${ringOpacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw diagonal grid lines for visual interest (like mobile version)
      const gridSpacing = 150;
      const gridLines = [];
      
      // Generate diagonal lines across the canvas
      for (let i = -3; i < 4; i++) {
        for (let j = -3; j < 4; j++) {
          gridLines.push({
            x1: centerX + i * gridSpacing - 400,
            y1: centerY + j * gridSpacing - 400,
            x2: centerX + i * gridSpacing + 400,
            y2: centerY + j * gridSpacing + 400,
          });
        }
      }
      
      // Draw grid lines with fading opacity
      gridLines.forEach((line) => {
        const fadeOpacity = 0.12 + Math.sin(timeRef.current * 0.2) * 0.06;
        ctx.strokeStyle = `rgba(79, 1, 71, ${fadeOpacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden will-change-transform">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          background: 'transparent', 
          opacity: 0.3,
          cursor: 'default',
          transform: 'translate3d(0, 0, 0)' // GPU acceleration hint
        }}
      />
    </div>
  );
};
