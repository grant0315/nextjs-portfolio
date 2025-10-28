import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { NeuralNetwork } from '@/components/ui/NeuralNetwork';
import Image from 'next/image';

export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1, 
        ease: [0.34, 1.56, 0.64, 1]
      },
    },
  };

  // Page load animation sequence
  const nameRevealVariants = {
    hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { 
        duration: 1.2, 
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.3
      },
    },
  };

  const headshotVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { 
        duration: 1, 
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.1
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.6
      },
    },
  };

  const floatingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1, 
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.1
      },
    },
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-start px-6 py-20 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full z-20 relative"
      >
        {/* Main flex container for headshot + name */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-24">
          {/* Headshot - shows on all screens */}
          <motion.div
            variants={headshotVariants}
            animate={["visible", "float"]}
            className="flex shrink-0 relative will-change-transform"
          >
            {/* Animated glow background */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-3xl will-change-transform"
              style={{
                background: 'linear-gradient(135deg, rgba(79, 1, 71, 0.4), rgba(58, 1, 92, 0.2))',
                filter: 'blur(30px)',
                zIndex: -1,
              }}
            />

            {/* Image container with enhanced glassmorphism */}
            <motion.div
              whileHover={{ scale: 1.03, y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              className="relative rounded-3xl overflow-hidden backdrop-blur-xl will-change-transform md:w-[380px] md:h-[380px] w-[280px] h-[280px]"
              style={{
                border: '1.5px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 20px 60px rgba(79, 1, 71, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                flexShrink: 0,
              }}
            >
              <Image
                src="/headshot.png"
                alt="Grant Hopkins"
                fill
                className="object-cover"
                priority
              />
              {/* Premium overlay gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(79, 1, 71, 0.08), rgba(58, 1, 92, 0.03))',
                }}
              />
            </motion.div>
          </motion.div>

          {/* Name - Right side, enhanced typography with page load sequence */}
          <div className="flex-1 flex items-center pt-2">
            {/* Main name heading - Bold, All Caps, Enhanced */}
            <motion.h1
              variants={nameRevealVariants}
              initial="hidden"
              animate="visible"
              className="font-black leading-none tracking-tighter text-5xl md:text-7xl lg:text-9xl xl:text-[160px] 2xl:text-[200px] will-change-transform"
              style={{ 
                color: '#2d1b2e', 
                fontFamily: 'var(--font-playfair)',
                letterSpacing: '-0.04em',
                lineHeight: '0.95',
              }}
            >
              <span className="block">GRANT</span>
              <motion.span 
                className="block gradient-text"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                HOPKINS
              </motion.span>
            </motion.h1>
          </div>
        </div>

        {/* Bottom section: Subheading + Description (Left side, under headshot + name) */}
        <motion.div
          variants={descriptionVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 lg:mt-20 max-w-2xl"
        >
          {/* Subheading - Elegant, refined */}
          <motion.div
            variants={itemVariants}
            className="mb-10"
          >
            <p
              className="text-base md:text-lg font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#4F0147', opacity: 0.8 }}
            >
              What I Do
            </p>
            <p
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
              style={{ color: '#3d2a3e' }}
            >
              Builder of{' '}
              <span className="gradient-text">Data-Driven</span>
              {' '}Software &{' '}
              <span className="gradient-text">AI Systems</span>
            </p>
          </motion.div>

          {/* Description - Refined and elegant */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-lg lg:text-lg leading-relaxed font-light max-w-2xl mb-16"
            style={{ color: '#5a4a5c', letterSpacing: '0.3px' }}
          >
            I design, build, and deploy intelligent platforms that connect data, decision-making, and product experience — from real estate analytics to culture intelligence systems.
          </motion.p>

          {/* Scroll indicator - Sophisticated */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3 mt-20 pt-8"
          >
            <p className="text-sm uppercase tracking-widest" style={{ color: '#4F0147', opacity: 0.6 }}>
              Scroll to explore
            </p>
            <div 
              className="w-6 h-10 rounded-full flex justify-center p-2 transition-all"
              style={{ 
                borderColor: 'rgba(79, 1, 71, 0.5)', 
                borderWidth: '2px',
              }}
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-0.5 h-2 rounded-full"
                style={{ background: 'linear-gradient(to bottom, #4F0147, #3A015C)' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
