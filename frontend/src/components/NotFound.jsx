import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = ({ darkMode }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#0d0705]' : 'bg-[#e8ddd4]'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className={`font-serif text-9xl mb-4 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>404</h1>
        <p className={`font-mono text-xl mb-8 ${darkMode ? 'text-white/60' : 'text-[#1a1410]/60'}`}>Page not found</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => window.history.back()} className={`flex items-center gap-2 px-6 py-3 rounded-lg border font-mono text-sm ${darkMode ? 'border-white/20 text-white hover:bg-white/10' : 'border-[#1a1410]/20 text-[#1a1410] hover:bg-[#1a1410]/10'}`}>
            <ArrowLeft size={18} /> Go Back
          </button>
          <Link to="/" className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm ${darkMode ? 'bg-white text-[#1a1410] hover:bg-white/90' : 'bg-[#1a1410] text-white hover:bg-[#1a1410]/90'}`}>
            <Home size={18} /> Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
