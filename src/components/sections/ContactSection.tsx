import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, BookOpen } from 'lucide-react';

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
    <section className="py-12 md:py-16 px-6 relative overflow-hidden bg-transparent">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-300 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-purple-200 to-transparent rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 rounded-3xl glass-effect p-6 md:p-8">
        <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight" style={{ color: '#2d1b2e' }}>
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-base font-light" style={{ color: '#5a4a5c' }}>
            Interested in collaborating? I'm always open to discussing new challenges and building something impactful together.
          </p>
        </motion.div>

        {/* CTA Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-4 gap-4 mb-10"
        >
          {/* Email CTA */}
          <motion.a
            href="mailto:grant.e.hopkins@gmail.com"
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="group block"
          >
            <div className="p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 card-hover cursor-pointer h-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderColor: 'rgba(79, 1, 71, 0.2)' }}>
              <Mail className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" style={{ color: '#4F0147' }} />
              <h3 className="text-base font-bold mb-1" style={{ color: '#2d1b2e' }}>Email</h3>
              <p className="mb-3 leading-relaxed font-light text-xs" style={{ color: '#5a4a5c' }}>
                Let's discuss your project.
              </p>
            </div>
          </motion.a>

          {/* LinkedIn CTA */}
          <motion.a
            href="https://www.linkedin.com/in/grant-hopkins-computer-science"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="group block"
          >
            <div className="p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 card-hover cursor-pointer h-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderColor: 'rgba(79, 1, 71, 0.2)' }}>
              <Linkedin className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" style={{ color: '#4F0147' }} />
              <h3 className="text-base font-bold mb-1" style={{ color: '#2d1b2e' }}>LinkedIn</h3>
              <p className="mb-3 leading-relaxed font-light text-xs" style={{ color: '#5a4a5c' }}>
                Connect professionally.
              </p>
            </div>
          </motion.a>

          {/* GitHub CTA */}
          <motion.a
            href="https://github.com/grant0315"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="group block"
          >
            <div className="p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 card-hover cursor-pointer h-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderColor: 'rgba(79, 1, 71, 0.2)' }}>
              <Github className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" style={{ color: '#4F0147' }} />
              <h3 className="text-base font-bold mb-1" style={{ color: '#2d1b2e' }}>GitHub</h3>
              <p className="mb-3 leading-relaxed font-light text-xs" style={{ color: '#5a4a5c' }}>
                View my code.
              </p>
            </div>
          </motion.a>

          {/* Blog CTA */}
          <motion.a
            href="https://medium.com/@granthopkins0315"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="group block"
          >
            <div className="p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 card-hover cursor-pointer h-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderColor: 'rgba(79, 1, 71, 0.2)' }}>
              <BookOpen className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" style={{ color: '#4F0147' }} />
              <h3 className="text-base font-bold mb-1" style={{ color: '#2d1b2e' }}>Blog</h3>
              <p className="mb-3 leading-relaxed font-light text-xs" style={{ color: '#5a4a5c' }}>
                Read my articles.
              </p>
            </div>
          </motion.a>
        </motion.div>

          {/* Footer tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center pt-6 border-t"
            style={{ borderColor: 'rgba(79, 1, 71, 0.1)' }}
          >
            <p className="text-xs font-light mb-1" style={{ color: '#5a4a5c' }}>
              © 2025 Grant Hopkins
            </p>
            <p className="text-xs" style={{ color: '#8a7a8c' }}>
              Built with Next.js, React & Framer Motion
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
