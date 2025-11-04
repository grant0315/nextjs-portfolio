'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FixedBackground } from '@/components/FixedBackground';
import { BlogNavigation } from '@/components/BlogNavigation';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

const gradients = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-orange-500 to-red-500',
  'from-green-500 to-emerald-500',
  'from-indigo-500 to-purple-500',
  'from-pink-500 to-rose-500',
];

function BlogCard({ post, index }: { post: MediumPost; index: number }) {
  const gradient = gradients[index % gradients.length];
  const postDate = new Date(post.pubDate);
  const formattedDate = format(postDate, 'MMM d, yyyy');
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  // Extract excerpt from content snippet
  const excerpt = post.contentSnippet?.substring(0, 150) || 
                  post.content?.replace(/<[^>]*>/g, '').substring(0, 150) || 
                  'Read more...';
  
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
        whileHover={!isButtonHovered ? { y: -8 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {/* Thumbnail */}
        {post.thumbnail && (
          <div className="relative w-full h-48 overflow-hidden">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        )}

        <div className="h-full p-6 flex flex-col">
          {/* Date and categories */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2 text-sm" style={{ color: '#5a4a5c' }}>
              <Calendar className="w-4 h-4" />
              <span className="font-light">{formattedDate}</span>
            </div>
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.categories.slice(0, 2).map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 text-xs font-medium rounded-full border"
                    style={{
                      backgroundColor: 'rgba(79, 1, 71, 0.08)',
                      color: '#4F0147',
                      borderColor: 'rgba(79, 1, 71, 0.2)'
                    }}
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold leading-tight mb-3 group-hover:text-[#4F0147] transition-colors" style={{ color: '#2d1b2e' }}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-4 grow leading-relaxed font-light text-sm" style={{ color: '#5a4a5c' }}>
            {excerpt}...
          </p>

          {/* Read more button */}
          <motion.a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative z-10 inline-flex items-center justify-center gap-2 px-4 py-2.5 mt-auto rounded-lg font-semibold transition-all group/link text-sm cursor-pointer select-none hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            style={{ 
              color: '#4F0147',
              backgroundColor: 'rgba(79, 1, 71, 0.08)',
              border: '1px solid rgba(79, 1, 71, 0.2)',
            }}
            onMouseEnter={(e) => {
              setIsButtonHovered(true);
              e.currentTarget.style.backgroundColor = 'rgba(79, 1, 71, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(79, 1, 71, 0.4)';
            }}
            onMouseLeave={(e) => {
              setIsButtonHovered(false);
              e.currentTarget.style.backgroundColor = 'rgba(79, 1, 71, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(79, 1, 71, 0.2)';
            }}
            onClick={(e) => {
              // Ensure link opens even if there are any event propagation issues
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
            <span>Read on Medium</span>
            <ExternalLink className="w-3 h-3 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/medium');
        const data = await response.json();
        
        console.log('API Response:', data);
        
        if (data.error) {
          setError(data.error + (data.details ? ` (${data.details})` : ''));
        } else {
          setPosts(data.posts || []);
          if (data.posts && data.posts.length === 0) {
            setError('No blog posts found. Make sure you have published posts on Medium.');
          }
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load blog posts';
        setError(errorMsg);
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <>
      <FixedBackground />
      <BlogNavigation />
      <main className="w-full overflow-hidden relative z-10 pt-20 min-h-screen">
        <section className="py-20 px-6 relative overflow-hidden bg-transparent">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-300 to-transparent rounded-full filter blur-3xl"></div>
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-purple-200 to-transparent rounded-full filter blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10 rounded-3xl glass-effect p-8 md:p-12">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight" style={{ color: '#2d1b2e' }}>
                Blog <span className="gradient-text">Articles</span>
              </h1>
              <p className="text-base md:text-lg font-light max-w-2xl mx-auto" style={{ color: '#5a4a5c' }}>
                Thoughts on software engineering, AI/ML, real estate tech, and building data-driven products.
              </p>
            </motion.div>

            {/* Loading state */}
            {loading && (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                <p className="mt-4 text-sm" style={{ color: '#5a4a5c' }}>Loading articles...</p>
              </div>
            )}

            {/* Error state */}
            {error && !loading && (
              <div className="text-center py-20">
                <p className="text-lg mb-4 font-semibold" style={{ color: '#4F0147' }}>{error}</p>
                <div className="text-sm space-y-2 max-w-xl mx-auto" style={{ color: '#8b7a8d' }}>
                  <p>Troubleshooting steps:</p>
                  <ul className="list-disc list-inside text-left space-y-1">
                    <li>Make sure your dev server was restarted after creating .env.local</li>
                    <li>Verify MEDIUM_USERNAME is set correctly in .env.local</li>
                    <li>Check that your Medium username is correct (try visiting: https://medium.com/@granthopkins0315)</li>
                    <li>Check the browser console and server logs for detailed error messages</li>
                  </ul>
                  <p className="mt-4 text-xs">
                    Make sure .env.local is in the root directory and contains: MEDIUM_USERNAME=@granthopkins0315
                  </p>
                </div>
              </div>
            )}

            {/* Posts grid */}
            {!loading && !error && posts.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {posts.map((post, index) => (
                  <BlogCard key={post.guid || post.link} post={post} index={index} />
                ))}
              </motion.div>
            )}

            {/* Empty state */}
            {!loading && !error && posts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-lg mb-4" style={{ color: '#5a4a5c' }}>No blog posts found.</p>
                <p className="text-sm" style={{ color: '#8b7a8d' }}>
                  Check your Medium RSS feed configuration.
                </p>
              </div>
            )}

            {/* Back to portfolio link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center pt-12 mt-12 border-t"
              style={{ borderColor: 'rgba(79, 1, 71, 0.1)' }}
            >
              <motion.a
                href="https://www.granthopkins.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(79, 1, 71, 0.2)',
                  color: '#4F0147',
                }}
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Portfolio
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
