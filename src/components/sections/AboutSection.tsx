import { motion } from 'framer-motion';
import { Code2, Brain, Building2 } from 'lucide-react';

export const AboutSection = () => {

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
    <section className="py-12 md:py-16 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto relative z-10 rounded-3xl glass-effect p-6 md:p-8">
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
            className="text-center mb-8"
          >
            <h2 
              className="text-3xl md:text-4xl font-bold mb-2 tracking-tight"
              style={{ color: '#2d1b2e' }}
            >
              About <span className="gradient-text">Me</span>
            </h2>
          </motion.div>

          {/* Main about text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-10 max-w-3xl mx-auto"
          >
            <p className="text-base leading-relaxed mb-3 font-light" style={{ color: '#5a4a5c' }}>
              Full-stack engineer and product builder specializing in data-driven systems. I combine software engineering rigor with strategic thinking to create intelligent platforms that solve complex business problems.
            </p>
          </motion.div>

          {/* Specialties grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-3 gap-4 mb-8"
          >
            {specialties.map((specialty) => {
              const Icon = specialty.icon;
              return (
                <motion.div
                  key={specialty.title}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="group relative"
                >
                  <div className="relative w-full text-left p-5 rounded-xl border backdrop-blur-sm transition-all duration-300 card-hover"
                    style={{ background: 'rgba(255, 255, 255, 0.5)', borderColor: 'rgba(79, 1, 71, 0.2)' }}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="w-6 h-6 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" style={{ color: '#4F0147' }} />
                      <div className="flex-1">
                        <h3 className="font-bold text-base mb-1.5" style={{ color: '#2d1b2e' }}>
                          {specialty.title}
                        </h3>
                        <p className="leading-relaxed font-light text-sm" style={{ color: '#5a4a5c' }}>
                          {specialty.description}
                        </p>
                      </div>
                    </div>
                  </div>
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
            <div className="flex flex-wrap justify-center gap-2">
              {['Python', 'FastAPI', 'React', 'Next.js', 'Azure', 'SQL', 'ML', 'LLMs', 'Data Viz', 'Supabase'].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  viewport={{ once: true }}
                  className="px-3 py-1.5 text-xs font-medium rounded-full border hover:shadow-md transition-all"
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
