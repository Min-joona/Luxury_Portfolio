import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const allBlogs = [
  {
    title: "Building Scalable React Applications",
    excerpt: "Learn the best practices for architecting large-scale React applications with proper state management and component composition.",
    category: "React",
    date: "Jan 15, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop",
    slug: "building-scalable-react-applications",
    content: "Full article content here..."
  },
  {
    title: "The Art of Minimalist UI Design",
    excerpt: "Exploring how less is more in modern web design. Creating elegant interfaces that prioritize user experience.",
    category: "Design",
    date: "Jan 08, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
    slug: "art-of-minimalist-ui-design",
    content: "Full article content here..."
  },
  {
    title: "Mastering TypeScript in 2024",
    excerpt: "A comprehensive guide to TypeScript features that will level up your development workflow and catch bugs early.",
    category: "TypeScript",
    date: "Dec 28, 2023",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop",
    slug: "mastering-typescript-2024",
    content: "Full article content here..."
  },
  {
    title: "Performance Optimization Techniques",
    excerpt: "Deep dive into web performance optimization strategies that can improve your site's loading speed by 300%.",
    category: "Performance",
    date: "Dec 20, 2023",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    slug: "performance-optimization-techniques",
    content: "Full article content here..."
  },
  {
    title: "The Future of Web Development",
    excerpt: "Exploring emerging technologies and trends that will shape the future of web development in the coming years.",
    category: "Future",
    date: "Dec 15, 2023",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
    slug: "future-of-web-development",
    content: "Full article content here..."
  },
  {
    title: "Creating Accessible Web Experiences",
    excerpt: "Why accessibility matters and how to implement WCAG guidelines in your projects from the ground up.",
    category: "Accessibility",
    date: "Dec 10, 2023",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=500&fit=crop",
    slug: "creating-accessible-web-experiences",
    content: "Full article content here..."
  },
  // Additional blogs that show on "View More"
  {
    title: "Advanced CSS Grid Layouts",
    excerpt: "Master CSS Grid with complex layouts, responsive designs, and practical examples for modern web applications.",
    category: "CSS",
    date: "Dec 05, 2023",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=500&fit=crop",
    slug: "advanced-css-grid-layouts",
    content: "Full article content here..."
  },
  {
    title: "Serverless Architecture Guide",
    excerpt: "Complete guide to building scalable applications with serverless functions and cloud infrastructure.",
    category: "Backend",
    date: "Nov 28, 2023",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
    slug: "serverless-architecture-guide",
    content: "Full article content here..."
  },
  {
    title: "GraphQL vs REST APIs",
    excerpt: "Comparing GraphQL and REST to help you choose the right API architecture for your next project.",
    category: "API",
    date: "Nov 20, 2023",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop",
    slug: "graphql-vs-rest-apis",
    content: "Full article content here..."
  },
  {
    title: "Docker for Developers",
    excerpt: "Getting started with Docker containerization for consistent development and deployment environments.",
    category: "DevOps",
    date: "Nov 15, 2023",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=500&fit=crop",
    slug: "docker-for-developers",
    content: "Full article content here..."
  },
  {
    title: "State Management in 2024",
    excerpt: "Redux, Zustand, Jotai, or Context? A comprehensive comparison of state management solutions.",
    category: "React",
    date: "Nov 08, 2023",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop",
    slug: "state-management-2024",
    content: "Full article content here..."
  }
];

const INITIAL_DISPLAY_COUNT = 6;

const Blogs = ({ darkMode }) => {
  const [showAll, setShowAll] = useState(false);
  
  const displayedBlogs = showAll ? allBlogs : allBlogs.slice(0, INITIAL_DISPLAY_COUNT);
  const featuredBlog = displayedBlogs[0];
  const gridBlogs = displayedBlogs.slice(1);

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
                    {featuredBlog.date}
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
                      {blog.date}
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
      </div>
    </section>
  );
};

export default Blogs;
