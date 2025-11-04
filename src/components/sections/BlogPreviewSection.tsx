'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  guid: string;
  categories?: string[];
  author?: string;
  thumbnail?: string;
}

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

// Get blog URL based on environment
const getBlogUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('localhost')) {
      return 'http://blog.localhost:3000';
    }
  }
  return 'https://blog.granthopkins.com';
};

function BlogPreviewCard({ post, formattedDate, excerpt }: { post: MediumPost; formattedDate: string; excerpt: string }) {
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="group h-full"
    >
      <motion.div 
        className="relative h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 card-hover" 
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.6)', 
          border: '1px solid rgba(79, 1, 71, 0.1)' 
        }}
        whileHover={!isLinkHovered ? { y: -8 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {/* Thumbnail */}
        {post.thumbnail && (
          <div className="relative w-full h-40 overflow-hidden">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        )}

        <div className="h-full p-6 flex flex-col">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: '#5a4a5c' }}>
            <Calendar className="w-4 h-4" />
            <span className="font-light">{formattedDate}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold leading-tight mb-2 group-hover:text-[#4F0147] transition-colors" style={{ color: '#2d1b2e' }}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-4 grow leading-relaxed font-light text-sm" style={{ color: '#5a4a5c' }}>
            {excerpt}...
          </p>

          {/* Read more link */}
          <motion.a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative z-10 inline-flex items-center gap-1 text-sm font-semibold transition-all group/link cursor-pointer"
            style={{ color: '#4F0147' }}
            onMouseEnter={() => setIsLinkHovered(true)}
            onMouseLeave={() => setIsLinkHovered(false)}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.open(post.link, '_blank', 'noopener,noreferrer');
            }}
            role="button"
            aria-label={`Read "${post.title}" on Medium`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                window.open(post.link, '_blank', 'noopener,noreferrer');
              }
            }}
          >
            Read Article
            <ExternalLink className="w-3 h-3 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export const BlogPreviewSection = () => {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/medium');
        const data = await response.json();
        
        if (data.posts && data.posts.length > 0) {
          // Get only the latest 3 posts for preview
          setPosts(data.posts.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading || posts.length === 0) {
    return null; // Don't show section if loading or no posts
  }

  return (
    <section className="py-12 md:py-16 px-6 relative overflow-hidden bg-transparent">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-300 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-purple-200 to-transparent rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 rounded-3xl glass-effect p-6 md:p-8">
        <div className="relative z-10">
          {/* Section title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight" style={{ color: '#2d1b2e' }}>
              Latest <span className="gradient-text">Articles</span>
            </h2>
            <p className="text-base font-light max-w-2xl mx-auto" style={{ color: '#5a4a5c' }}>
              Thoughts on software engineering, AI/ML, and building data-driven products.
            </p>
          </motion.div>

          {/* Blog posts preview */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            {posts.map((post) => {
              const postDate = new Date(post.pubDate);
              const formattedDate = format(postDate, 'MMM d, yyyy');
              const excerpt = post.contentSnippet?.substring(0, 100) || 
                             post.content?.replace(/<[^>]*>/g, '').substring(0, 100) || 
                             'Read more...';
              
              return <BlogPreviewCard key={post.guid || post.link} post={post} formattedDate={formattedDate} excerpt={excerpt} />;
            })}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center pt-6 border-t"
            style={{ borderColor: 'rgba(79, 1, 71, 0.1)' }}
          >
            <motion.a
              href={getBlogUrl()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(79, 1, 71, 0.2)',
                color: '#4F0147',
              }}
            >
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
