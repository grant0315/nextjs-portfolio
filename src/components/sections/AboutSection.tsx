import { motion } from 'framer-motion';
import { Code2, Brain, Building2 } from 'lucide-react';
import { useState } from 'react';

export const AboutSection = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const specialties = [
    {
      icon: Code2,
      title: 'Full-Stack Development',
      description: 'Python, FastAPI, React, Next.js — end-to-end product engineering',
      fullDescription: 'I build complete applications from database architecture to user interfaces. Experienced with Python backends, FastAPI microservices, React frontends, and Next.js full-stack solutions. Expertise in API design, database optimization, and deployment pipelines.',
      delay: 0,
    },
    {
      icon: Brain,
      title: 'AI/ML Integration',
      description: 'LLM integration, embeddings, predictive analytics, and intelligent systems',
      fullDescription: 'Specialized in integrating cutting-edge AI/ML solutions into production systems. Experience with LLM APIs (OpenAI, Anthropic), embeddings for semantic search, predictive analytics, and building intelligent agents that enhance user experience.',
      delay: 0.1,
    },
    {
      icon: Building2,
      title: 'Real Estate Tech',
      description: 'Specialized domain expertise in multifamily, analytics, and operations',
      fullDescription: 'Deep expertise in real estate technology, with focus on multifamily operations. Built systems for lease analytics, pricing optimization, and operational intelligence. Understand market dynamics, compliance requirements, and operational workflows.',
      delay: 0.2,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto relative z-10 rounded-3xl glass-effect p-8 md:p-12">
        {/* Gradient background accent */}
        <div className="absolute inset-0 opacity-20 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-300 to-transparent rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Section title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
              style={{ color: '#2d1b2e' }}
            >
              About <span className="gradient-text">Me</span>
            </h2>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 max-w-md mx-auto rounded-full origin-center"
              style={{ background: 'linear-gradient(to right, #4F0147, #3A015C, #35012C)' }}
            ></motion.div>
          </motion.div>

          {/* Main about text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-16 max-w-3xl mx-auto"
          >
            <p className="text-base md:text-lg leading-relaxed mb-4 font-light" style={{ color: '#5a4a5c' }}>
              Full-stack engineer and product builder specializing in data-driven systems. I combine software engineering rigor with strategic thinking to create intelligent platforms that solve complex business problems. My expertise spans real estate analytics, AI/ML integration, and scalable backend architectures.
            </p>
            <p className="text-base md:text-lg leading-relaxed italic" style={{ color: '#6b5a6d' }}>
              Philosophy: superior tools become invisible in the workflow, transforming complex systems into understandable, measurable, actionable intelligence.
            </p>
          </motion.div>

          {/* Specialties grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {specialties.map((specialty) => {
              const Icon = specialty.icon;
              const isExpanded = expandedCard === specialty.title;
              return (
                <motion.div
                  key={specialty.title}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="group relative"
                >
                  {/* Card - Button for interactivity */}
                  <motion.button
                    onClick={() => setExpandedCard(isExpanded ? null : specialty.title)}
                    className="relative w-full h-full text-left p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 card-hover stagger-item focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                    style={{ background: 'rgba(255, 255, 255, 0.5)', borderColor: 'rgba(79, 1, 71, 0.2)' }}
                    aria-expanded={isExpanded}
                    aria-label={`${specialty.title} - click to expand`}
                  >
                    {/* Animated icon background */}
                    <motion.div
                      animate={{ 
                        boxShadow: [
                          '0 0 20px rgba(79, 1, 71, 0)',
                          '0 0 40px rgba(79, 1, 71, 0.3)',
                          '0 0 20px rgba(79, 1, 71, 0)',
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute top-4 right-4 w-10 h-10 bg-linear-to-br from-purple-400 to-purple-600 rounded-xl opacity-10 group-hover:opacity-20 transition-opacity"
                    ></motion.div>

                    {/* Icon with rotation animation on expand */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 360 : 0 }}
                      transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
                      className="mb-3"
                    >
                      <Icon className="w-8 h-8 group-hover:scale-110 transition-transform" style={{ color: '#4F0147' }} />
                    </motion.div>

                    <h3 className="font-bold text-lg mb-2" style={{ color: '#2d1b2e' }}>
                      {specialty.title}
                    </h3>

                    {/* Main description */}
                    <p className="leading-relaxed font-light text-sm" style={{ color: '#5a4a5c' }}>
                      {specialty.description}
                    </p>

                    {/* Expandable full description */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: isExpanded ? 1 : 0,
                        height: isExpanded ? 'auto' : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      className="mt-4 pt-4 border-t border-purple-200 overflow-hidden"
                    >
                      <p className="leading-relaxed font-light text-xs" style={{ color: '#5a4a5c' }}>
                        {specialty.fullDescription}
                      </p>
                    </motion.div>

                    {/* "Read More" indicator */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="mt-3 flex items-center gap-1 text-xs font-semibold"
                      style={{ color: '#4F0147' }}
                    >
                      <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </motion.div>
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Tech skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center"
          >
            <p className="text-sm font-semibold mb-6 uppercase tracking-widest" style={{ color: '#5a4a5c' }}>
              ✨ Core Technologies ✨
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Python', 'FastAPI', 'React', 'Next.js', 'Azure', 'SQL', 'Machine Learning', 'LLM Integration', 'Data Visualization', 'Supabase'].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 text-sm font-medium rounded-full border hover:shadow-lg transition-all cursor-pointer stagger-item"
                  style={{ 
                    backgroundColor: 'rgba(79, 1, 71, 0.08)',
                    color: '#4F0147',
                    borderColor: 'rgba(79, 1, 71, 0.3)',
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
