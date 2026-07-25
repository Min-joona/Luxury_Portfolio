import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Figma } from 'lucide-react';
import { api } from '../api';
import DesignWheel from './DesignWheel';

const Designs = ({ darkMode }) => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api('/api/designs');
        if (!cancelled) setDesigns(data);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="designs" className="py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className={`text-[10px] tracking-[0.3em] font-mono uppercase mb-4 block ${
              darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
            }`}>
              Figma & Visuals
            </span>
            <h2 className={`font-serif text-5xl lg:text-6xl mb-6 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>
              Designs
            </h2>
            <p className={`text-sm max-w-lg font-mono ${darkMode ? 'text-white/60' : 'text-[#1a1410]/60'}`}>
              Interface and brand explorations crafted in Figma — drag to spin the wheel.
            </p>
          </div>
          <a
            href="https://figma.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-3 font-mono text-[11px] tracking-[0.2em] border transition-all duration-300 self-start ${
              darkMode ? 'border-white/20 text-white hover:bg-white hover:text-[#1a1410]'
                       : 'border-[#1a1410]/20 text-[#1a1410] hover:bg-[#1a1410] hover:text-white'
            }`}
          >
            <Figma size={13} /> VIEW FIGMA
          </a>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${
              darkMode ? 'border-white/30' : 'border-[#1a1410]/30'
            }`} />
          </div>
        )}

        {/* Error state */}
        {error && (
          <p className={`text-center text-sm font-mono py-24 ${darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}`}>
            Unable to load designs at this time.
          </p>
        )}

        {/* Empty state */}
        {!loading && !error && designs.length === 0 && (
          <p className={`text-center text-sm font-mono py-24 ${darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}`}>
            No designs to show yet.
          </p>
        )}

        {/* Designs 3D Tunnel */}
        {!loading && !error && designs.length > 0 && (
          <DesignWheel designs={designs} darkMode={darkMode} />
        )}

      </div>
    </section>
  );
};

export default Designs;
