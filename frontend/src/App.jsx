import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import FullPageSkeleton from './components/FullPageSkeleton';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogPost from './components/BlogPost';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminBlogs from './components/AdminBlogs';
import AdminMessages from './components/AdminMessages';
import NotFound from './components/NotFound';

// Home component for the main page
const Home = ({ darkMode, setDarkMode }) => {
  return (
    <motion.div
      className={`min-h-screen font-mono transition-colors duration-500 ${
        darkMode 
          ? 'bg-[#0d0705] text-white' 
          : 'bg-[#e8ddd4] text-[#1a1410]'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main>
        <Hero darkMode={darkMode} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Projects darkMode={darkMode} />
          <Timeline darkMode={darkMode} />
          <Blogs darkMode={darkMode} />
          <Contact darkMode={darkMode} />
        </motion.div>
      </main>

      <Footer darkMode={darkMode} />

      {/* Subtle Noise Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.015] z-[100]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
    </motion.div>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Simulate content loading after 3D is ready
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setContentReady(true), 800);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Preloader key="preloader" onLoadingComplete={() => setLoading(false)} />
      ) : !contentReady ? (
        // Show skeleton after preloader, before content loads
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FullPageSkeleton darkMode={darkMode} />
        </motion.div>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/blog/:slug" element={<BlogPost darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/admin/login" element={<AdminLogin darkMode={darkMode} />} />
            <Route path="/admin" element={<AdminDashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/admin/blogs" element={<AdminBlogs darkMode={darkMode} />} />
            <Route path="/admin/messages" element={<AdminMessages darkMode={darkMode} />} />
            <Route path="*" element={<NotFound darkMode={darkMode} />} />
          </Routes>
        </Router>
      )}
    </AnimatePresence>
  );
}

export default App;
