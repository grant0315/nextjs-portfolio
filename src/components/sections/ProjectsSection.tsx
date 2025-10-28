import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { SwipeableCarousel } from '@/components/ui/SwipeableCarousel';
import { ArrowUpRight, Zap } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  tech: string[];
  status?: 'live' | 'in-progress';
  link?: string;
  gradient: string;
}

const projects: Project[] = [
  {
    name: 'LeaseIQ',
    description: 'AI-powered lease analytics and dynamic pricing engine. Delivers real-time rent prediction, occupancy forecasting, and market intelligence for multifamily operators.',
    tech: ['React', 'AG Grid', 'Azure SQL', 'Python', 'OpenAI'],
    status: 'live',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'TrueNorth',
    description: 'Culture measurement platform built on axiology principles. Transforms qualitative organizational culture into quantifiable metrics for strategic decision-making.',
    tech: ['FastAPI', 'OpenAI API', 'Survey Engine', 'Data Viz'],
    status: 'live',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Knowledge Store',
    description: 'Intelligent document indexing and retrieval system. Generates semantic embeddings for property insights and LLM context enrichment at scale.',
    tech: ['Python', 'Embeddings', 'SQL', 'Document Processing'],
    status: 'live',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    name: 'RuneRock',
    description: 'Knowledge management platform with relational linking and local knowledge graphs. Combines Obsidian-like simplicity with advanced graph capabilities.',
    tech: ['SvelteKit', 'Supabase', 'Knowledge Graphs'],
    status: 'in-progress',
    gradient: 'from-green-500 to-emerald-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Project card component for reusability
const ProjectCard = ({ project }: { project: Project }) => (
  <motion.div
    whileHover={{ y: -8 }}
    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    className="group h-full"
  >
    <div className="relative h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 card-hover" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', border: '1px solid rgba(79, 1, 71, 0.1)' }}>
      {/* Gradient top border */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>

      <div className="h-full p-6 flex flex-col">
        {/* Header with status badge */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl md:text-2xl font-bold leading-tight" style={{ color: '#2d1b2e' }}>
            {project.name}
          </h3>
          {project.status && (
            <motion.span
              whileHover={{ scale: 1.1 }}
              className={`px-2 py-1 text-xs font-bold rounded-full whitespace-nowrap ml-4 flex items-center gap-1 ${
                project.status === 'live'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              {project.status === 'live' ? (
                <>
                  <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                  Live
                </>
              ) : (
                <>
                  <Zap className="w-3 h-3" />
                  In Progress
                </>
              )}
            </motion.span>
          )}
        </div>

        {/* Description */}
        <p className="mb-4 grow leading-relaxed font-light text-sm" style={{ color: '#5a4a5c' }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.05 }}
              className="px-2 py-1 text-xs font-medium rounded-full border hover:border-purple-400 transition-all"
              style={{
                backgroundColor: 'rgba(79, 1, 71, 0.08)',
                color: '#4F0147',
                borderColor: 'rgba(79, 1, 71, 0.2)'
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Footer link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-semibold hover:gap-3 transition-all group/link text-sm"
            style={{ color: '#4F0147' }}
          >
            View Project
            <ArrowUpRight className="w-3 h-3 ml-2 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

export const ProjectsSection = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden bg-transparent">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-purple-300 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-linear-to-l from-purple-200 to-transparent rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 rounded-3xl glass-effect p-8 md:p-12">
        <div className="relative z-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: '#2d1b2e' }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-base md:text-lg font-light" style={{ color: '#5a4a5c' }}>
            Data-driven platforms that deliver measurable business impact through intelligent engineering.
          </p>
          <p className="text-lg max-w-2xl mx-auto font-light" style={{ color: '#5a4a5c' }}>
            A selection of products I've built that combine technical excellence with real-world impact
          </p>
        </motion.div>

        {/* Projects grid (desktop) and carousel (mobile) */}
        {/* Desktop: Grid layout */}
        <div className="hidden md:block">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-2 gap-8 mb-16"
          >
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </motion.div>
        </div>

        {/* Mobile: Swipeable carousel */}
        <div className="md:hidden mb-8">
          <SwipeableCarousel
            items={projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
            itemsPerView={1}
            gap={16}
            autoPlay={false}
            showIndicators={true}
            showArrows={true}
          />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6 font-light">
            Want to explore more projects? Check out my GitHub for additional work and contributions.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-900 dark:text-white hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all shadow-md hover:shadow-lg"
          >
            Explore More on GitHub
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
        </div>
      </div>
    </section>
  );
};
