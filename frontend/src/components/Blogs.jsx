import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import API_URL from '../api';

const INITIAL_DISPLAY_COUNT = 6;

const Blogs = ({ darkMode }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blogs`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const displayedBlogs = showAll ? blogs : blogs.slice(0, INITIAL_DISPLAY_COUNT);
  const featuredBlog = displayedBlogs[0];
  const gridBlogs = displayedBlogs.slice(1);

  if (loading) {
    return (
      <section id="blogs" className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className={`w-24 h-3 rounded mb-4 ${darkMode ? 'bg-white/10' : 'bg-[#1a1410]/10'}`} />
            <div className={`w-32 h-14 rounded mb-6 ${darkMode ? 'bg-white/10' : 'bg-[#1a1410]/10'}`} />
            <div className={`w-80 h-4 rounded ${darkMode ? 'bg-white/10' : 'bg-[#1a1410]/10'}`} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`aspect-[16/10] rounded-xl ${darkMode ? 'bg-white/5' : 'bg-[#1a1410]/5'}`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!blogs.length) {
    return (
      <section id="blogs" className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className={`text-sm font-mono ${darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}`}>
            No articles yet. Check back soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="blogs" className="py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className={`text-[10px] tracking-[0.3em] font-mono uppercase mb-4 block ${
            darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
          }`}>
            Latest Articles
          </span>
          <h2 className={`font-serif text-5xl lg:text-6xl mb-6 ${
            darkMode ? 'text-white' : 'text-[#1a1410]'
          }`}>
            Blog
          </h2>
          <p className={`text-sm max-w-lg font-mono ${
            darkMode ? 'text-white/60' : 'text-[#1a1410]/60'
          }`}>
            Thoughts, insights, and perspectives on software development, design, and technology.
          </p>
        </motion.div>

        {/* Featured Blog (First Item - Large) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <a href={`/blog/${featuredBlog.slug}`} className="group block">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 rounded-2xl border transition-all duration-300 ${
              darkMode 
                ? 'bg-[#1a1410]/30 border-white/10 hover:border-white/20' 
                : 'bg-[#f5ebe3]/50 border-[#1a1410]/10 hover:border-[#1a1410]/20'
            }`}>
              {/* Image */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider ${
                  darkMode ? 'bg-white/10 text-white' : 'bg-[#1a1410]/10 text-[#1a1410]'
                }`}>
                  {featuredBlog.category}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <div className={`flex items-center gap-4 mb-4 text-[10px] font-mono ${
                  darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
                }`}>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(featuredBlog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {featuredBlog.readTime}
                  </span>
                </div>

                <h3 className={`font-serif text-3xl lg:text-4xl mb-4 group-hover:opacity-80 transition-opacity ${
                  darkMode ? 'text-white' : 'text-[#1a1410]'
                }`}>
                  {featuredBlog.title}
                </h3>

                <p className={`text-sm leading-relaxed mb-6 ${
                  darkMode ? 'text-white/60' : 'text-[#1a1410]/60'
                }`}>
                  {featuredBlog.excerpt}
                </p>

                <div className={`flex items-center gap-2 text-[11px] font-mono tracking-wider ${
                  darkMode ? 'text-white' : 'text-[#1a1410]'
                }`}>
                  <span>Read Article</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          </a>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {gridBlogs.map((blog, index) => (
              <motion.article
                key={blog.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                layout
              >
                <a href={`/blog/${blog.slug}`} className="group block">
                  {/* Image */}
                  <div className={`relative aspect-[16/10] rounded-xl overflow-hidden mb-4 ${
                    darkMode ? 'bg-[#2a2018]' : 'bg-[#e0d5cc]'
                  }`}>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-[9px] font-mono tracking-wider ${
                      darkMode ? 'bg-white/10 text-white' : 'bg-[#1a1410]/10 text-[#1a1410]'
                    }`}>
                      {blog.category}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className={`flex items-center gap-3 mb-3 text-[9px] font-mono ${
                    darkMode ? 'text-white/40' : 'text-[#1a1410]/40'
                  }`}>
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />
                      {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {blog.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-serif text-xl mb-2 group-hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-white' : 'text-[#1a1410]'
                  }`}>
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className={`text-xs leading-relaxed line-clamp-2 ${
                    darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
                  }`}>
                    {blog.excerpt}
                  </p>

                  {/* Read More */}
                  <div className={`mt-4 flex items-center gap-1 text-[10px] font-mono tracking-wider transition-colors ${
                    darkMode ? 'text-white/70 group-hover:text-white' : 'text-[#1a1410]/70 group-hover:text-[#1a1410]'
                  }`}>
                    <span>Read More</span>
                    <ArrowUpRight size={12} />
                  </div>
                </a>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* View More/Less Button */}
        {blogs.length > INITIAL_DISPLAY_COUNT && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className={`inline-flex items-center gap-2 px-8 py-4 font-mono text-[11px] tracking-[0.2em] border transition-all duration-300 ${
                darkMode 
                  ? 'border-white/20 text-white hover:bg-white hover:text-[#1a1410]' 
                  : 'border-[#1a1410]/20 text-[#1a1410] hover:bg-[#1a1410] hover:text-white'
              }`}
            >
              {showAll ? (
                <>
                  Show Less Articles
                  <ChevronUp size={14} />
                </>
              ) : (
                <>
                  View More Articles
                  <ChevronDown size={14} />
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blogs;