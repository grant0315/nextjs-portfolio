import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github, ArrowRight, Send, BookOpen } from 'lucide-react';
import Image from 'next/image';

export const ContactSection = () => {
  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:grant.e.hopkins@gmail.com',
      color: 'text-purple-700',
      bgColor: 'rgba(79, 1, 71, 0.08)',
      borderColor: 'rgba(79, 1, 71, 0.2)',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/grant-hopkins-computer-science',
      color: 'text-purple-600',
      bgColor: 'rgba(79, 1, 71, 0.08)',
      borderColor: 'rgba(79, 1, 71, 0.2)',
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/grant0315',
      color: 'text-purple-700',
      bgColor: 'rgba(79, 1, 71, 0.08)',
      borderColor: 'rgba(79, 1, 71, 0.2)',
    },
    {
      icon: BookOpen,
      label: 'Blog',
      href: 'https://www.bytebite.blog',
      color: 'text-purple-700',
      bgColor: 'rgba(79, 1, 71, 0.08)',
      borderColor: 'rgba(79, 1, 71, 0.2)',
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

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-transparent">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-300 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-purple-200 to-transparent rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 rounded-3xl glass-effect p-8 md:p-12">
        <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: '#2d1b2e' }}>
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-base md:text-lg font-light" style={{ color: '#5a4a5c' }}>
            Interested in collaborating on data-driven products? I'm always open to discussing new challenges and building something impactful together.
          </p>
        </motion.div>

        {/* CTA Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          {/* Email CTA */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="group"
          >
            <div className="p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 card-hover" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderColor: 'rgba(79, 1, 71, 0.2)' }}>
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mb-3"
              >
                <Mail className="w-8 h-8 group-hover:scale-110 transition-transform" style={{ color: '#4F0147' }} />
              </motion.div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#2d1b2e' }}>Send an Email</h3>
              <p className="mb-4 leading-relaxed font-light text-sm" style={{ color: '#5a4a5c' }}>
                Have a project in mind? Let's discuss how we can build something great together.
              </p>
              <a
                href="mailto:grant.e.hopkins@gmail.com"
                className="inline-flex items-center font-semibold hover:gap-2 transition-all group/link text-sm"
                style={{ color: '#4F0147' }}
              >
                Email Me
                <Send className="w-3 h-3 ml-2 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* LinkedIn CTA */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="group"
          >
            <div className="p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 card-hover" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderColor: 'rgba(79, 1, 71, 0.2)' }}>
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.1 }}
                className="mb-3"
              >
                <Linkedin className="w-8 h-8 group-hover:scale-110 transition-transform" style={{ color: '#4F0147' }} />
              </motion.div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#2d1b2e' }}>LinkedIn</h3>
              <p className="mb-4 leading-relaxed font-light text-sm" style={{ color: '#5a4a5c' }}>
                Follow my professional journey and latest insights.
              </p>
              <a
                href="https://www.linkedin.com/in/grant-hopkins-computer-science"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-semibold hover:gap-2 transition-all group/link text-sm"
                style={{ color: '#4F0147' }}
              >
                LinkedIn
                <ArrowRight className="w-3 h-3 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* GitHub CTA */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="group"
          >
            <div className="p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 card-hover" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderColor: 'rgba(79, 1, 71, 0.2)' }}>
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                className="mb-3"
              >
                <Github className="w-8 h-8 group-hover:scale-110 transition-transform" style={{ color: '#4F0147' }} />
              </motion.div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#2d1b2e' }}>GitHub</h3>
              <p className="mb-4 leading-relaxed font-light text-sm" style={{ color: '#5a4a5c' }}>
                Check out my open-source projects and code.
              </p>
              <a
                href="https://github.com/grant0315"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-semibold hover:gap-2 transition-all group/link text-sm"
                style={{ color: '#4F0147' }}
              >
                GitHub
                <ArrowRight className="w-3 h-3 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Blog CTA */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="group"
          >
            <div className="p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 card-hover" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderColor: 'rgba(79, 1, 71, 0.2)' }}>
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                className="mb-3"
              >
                <BookOpen className="w-8 h-8 group-hover:scale-110 transition-transform" style={{ color: '#4F0147' }} />
              </motion.div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#2d1b2e' }}>Read My Blog</h3>
              <p className="mb-4 leading-relaxed font-light text-sm" style={{ color: '#5a4a5c' }}>
                Insights on data engineering, AI/ML systems, and building scalable products.
              </p>
              <a
                href="https://www.bytebite.blog"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-semibold hover:gap-2 transition-all group/link text-sm"
                style={{ color: '#4F0147' }}
              >
                Visit ByteBite
                <ArrowRight className="w-3 h-3 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 py-8 border-t border-b"
          style={{ borderColor: 'rgba(79, 1, 71, 0.2)' }}
        >
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-16 h-16 rounded-full border-2 transition-all duration-300 shadow-md hover:shadow-lg group"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderColor: 'rgba(79, 1, 71, 0.3)',
                }}
                title={link.label}
              >
                <Icon className="w-7 h-7 group-hover:scale-125 transition-transform" style={{ color: link.color }} />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Footer tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center">
            <Image 
              src="/byte-bite-logo.png" 
              alt="ByteBite Logo" 
              width={100} 
              height={200}
              className="w-auto h-auto"
            />
          </div>
          <p className="text-sm font-light mb-2" style={{ color: '#5a4a5c' }}>
            © 2025 Grant Hopkins — Culture, measured and mastered.
          </p>
          <p className="text-xs" style={{ color: '#8a7a8c' }}>
            Built with Next.js 16, React 19, Framer Motion & Tailwind CSS
          </p>
        </motion.div>
        </div>
      </div>
    </section>
  );
};
