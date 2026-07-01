import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Heart, Share2, MessageCircle, Send, Moon, Sun } from 'lucide-react';
import API_URL from '../api';

const BlogPost = ({ darkMode, setDarkMode }) => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', email: '', comment: '' });
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blogs/${slug}`);
      if (!response.ok) {
        setLoading(false);
        return;
      }
      const data = await response.json();
      setBlog(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blogs/${slug}/comments`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setComments(data);
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    }
  };

  const handleLike = async () => {
    if (liked) return;
    try {
      const response = await fetch(`${API_URL}/api/blogs/${slug}/like`, {
        method: 'POST'
      });
      const data = await response.json();
      setBlog({ ...blog, likes: data.likes });
      setLiked(true);
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const handleShare = async () => {
    try {
      await fetch(`${API_URL}/api/blogs/${slug}/share`, {
        method: 'POST'
      });
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    } catch (error) {
      console.error('Error sharing blog:', error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/blogs/${slug}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment)
      });
      const data = await response.json();
      setComments(data);
      setNewComment({ name: '', email: '', comment: '' });
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-[#0d0705]' : 'bg-[#e8ddd4]'
      }`}>
        <div className="animate-pulse text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${
            darkMode ? 'bg-white/10' : 'bg-[#1a1410]/10'
          }`} />
          <p className={darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}>Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-[#0d0705]' : 'bg-[#e8ddd4]'
      }`}>
        <div className="text-center">
          <p className={`text-xl mb-4 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>Blog not found</p>
          <Link 
            to="/#blogs" 
            className={`text-sm font-mono underline ${
              darkMode ? 'text-white/70' : 'text-[#1a1410]/70'
            }`}
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0d0705]' : 'bg-[#e8ddd4]'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b backdrop-blur-xl ${
        darkMode 
          ? 'bg-[#0d0705]/80 border-white/10' 
          : 'bg-[#e8ddd4]/80 border-[#1a1410]/10'
      }`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            to="/#blogs" 
            className={`flex items-center gap-2 text-sm font-mono transition-colors ${
              darkMode ? 'text-white/70 hover:text-white' : 'text-[#1a1410]/70 hover:text-[#1a1410]'
            }`}
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
          
          <div className="flex items-center gap-4">
            <span className={`font-serif text-xl ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>
              Portfolio
            </span>
            
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-mono tracking-widest transition-all duration-300 ${
                darkMode 
                  ? 'border-white/20 text-white hover:bg-white/10' 
                  : 'border-[#1a1410]/20 text-[#1a1410] hover:bg-[#1a1410]/10'
              }`}
            >
              {darkMode ? (
                <>
                  <Moon size={12} />
                  <span>DARK</span>
                </>
              ) : (
                <>
                  <Sun size={12} />
                  <span>BRIGHT</span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      <article className="pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category & Meta */}
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider ${
                darkMode 
                  ? 'bg-[#5D4037] text-[#FFF8E1]' 
                  : 'bg-[#8D6E63] text-white'
              }`}>
                {blog.category}
              </span>
              <div className={`flex items-center gap-4 text-[11px] font-mono ${
                darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
              }`}>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(blog.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {blog.readTime}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className={`font-serif text-4xl lg:text-5xl mb-6 leading-tight ${
              darkMode ? 'text-white' : 'text-[#1a1410]'
            }`}>
              {blog.title}
            </h1>

            {/* Featured Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`max-w-none mb-12 ${
              darkMode ? 'text-white/80' : 'text-[#1a1410]/80'
            }`}
          >
            <p className={`text-lg leading-relaxed mb-6 ${
              darkMode ? 'text-white/90' : 'text-[#1a1410]/90'
            }`}>
              {blog.excerpt}
            </p>
            <div className={`whitespace-pre-wrap leading-relaxed ${
              darkMode ? 'text-white/80' : 'text-[#1a1410]/80'
            }`}>
              {blog.content}
            </div>
          </motion.div>

          {/* Engagement Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`flex items-center gap-6 py-6 border-t border-b ${
              darkMode 
                ? 'border-white/10' 
                : 'border-[#1a1410]/10'
            }`}
          >
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 transition-colors ${
                liked 
                  ? 'text-red-500' 
                  : darkMode 
                    ? 'text-white/60 hover:text-red-400' 
                    : 'text-[#1a1410]/60 hover:text-red-600'
              }`}
            >
              <Heart size={20} fill={liked ? "currentColor" : "none"} />
              <span className="text-sm font-mono">{blog.likes || 0}</span>
            </button>

            <button
              onClick={handleShare}
              className={`flex items-center gap-2 transition-colors ${
                darkMode 
                  ? 'text-white/60 hover:text-blue-400' 
                  : 'text-[#1a1410]/60 hover:text-blue-600'
              }`}
            >
              <Share2 size={20} />
              <span className="text-sm font-mono">{blog.shares || 0}</span>
            </button>

            <div className={`flex items-center gap-2 ${
              darkMode ? 'text-white/60' : 'text-[#1a1410]/60'
            }`}>
              <MessageCircle size={20} />
              <span className="text-sm font-mono">{comments.length}</span>
            </div>

            <div className={`ml-auto text-xs font-mono ${
              darkMode ? 'text-white/40' : 'text-[#1a1410]/40'
            }`}>
              {blog.views || 0} views
            </div>
          </motion.div>

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <h3 className={`font-serif text-2xl mb-6 ${
              darkMode ? 'text-white' : 'text-[#1a1410]'
            }`}>
              Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="mb-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={newComment.name}
                  onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                  className={`px-4 py-3 rounded-lg border text-sm font-mono bg-transparent focus:outline-none focus:ring-2 ${
                    darkMode 
                      ? 'border-white/20 text-white focus:ring-white/20' 
                      : 'border-[#1a1410]/20 text-[#1a1410] focus:ring-[#1a1410]/20'
                  }`}
                  required
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={newComment.email}
                  onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                  className={`px-4 py-3 rounded-lg border text-sm font-mono bg-transparent focus:outline-none focus:ring-2 ${
                    darkMode 
                      ? 'border-white/20 text-white focus:ring-white/20' 
                      : 'border-[#1a1410]/20 text-[#1a1410] focus:ring-[#1a1410]/20'
                  }`}
                  required
                />
              </div>
              <textarea
                placeholder="Write a comment..."
                value={newComment.comment}
                onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border text-sm font-mono bg-transparent focus:outline-none focus:ring-2 resize-none ${
                  darkMode 
                    ? 'border-white/20 text-white focus:ring-white/20' 
                    : 'border-[#1a1410]/20 text-[#1a1410] focus:ring-[#1a1410]/20'
                }`}
                required
              />
              <button
                type="submit"
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-mono transition-colors ${
                  darkMode 
                    ? 'bg-white text-[#1a1410] hover:bg-white/90' 
                    : 'bg-[#1a1410] text-white hover:bg-[#1a1410]/90'
                }`}
              >
                <Send size={16} />
                Post Comment
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 rounded-lg ${
                      darkMode 
                        ? 'bg-white/5 border border-white/10' 
                        : 'bg-[#1a1410]/5 border border-[#1a1410]/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-medium ${
                        darkMode ? 'text-white' : 'text-[#1a1410]'
                      }`}>
                        {comment.name}
                      </span>
                      <span className={`text-xs font-mono ${
                        darkMode ? 'text-white/40' : 'text-[#1a1410]/40'
                      }`}>
                        {comment.date ? new Date(comment.date).toLocaleDateString() : 'Just now'}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      darkMode ? 'text-white/70' : 'text-[#1a1410]/70'
                    }`}>
                      {comment.comment}
                    </p>
                  </motion.div>
                ))
              ) : (
                <p className={`text-center text-sm ${darkMode ? 'text-white/40' : 'text-[#1a1410]/40'}`}>
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
