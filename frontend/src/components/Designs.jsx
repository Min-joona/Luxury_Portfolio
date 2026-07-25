import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Figma, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../api';

const DesignCard = ({ design, darkMode }) => {
  const images = design.images?.length ? design.images : (design.image ? [design.image] : []);
  const intervalRef = useRef(null);
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);

  const stop = useCallback(() => {
    setActive(false);
    setIndex(0);
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  const toggle = useCallback(() => {
    if (active) { stop(); return; }
    if (images.length <= 1) {
      if (design.link) window.open(design.link, '_blank');
      return;
    }
    setActive(true);
    intervalRef.current = setInterval(() => {
      setIndex(i => (i + 1) % images.length);
    }, 1800);
  }, [active, images.length, design.link, stop]);

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <div className="group">
      <div onClick={toggle} className="block cursor-pointer">
        <div className={`relative aspect-[4/3] rounded-xl overflow-hidden mb-4 ${
          darkMode ? 'bg-[#2a2018]' : 'bg-[#e0d5cc]'
        }`}>
          <div className="w-full h-full relative">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={design.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                style={{ opacity: i === index ? 1 : 0, transform: i === index ? 'translateX(0)' : 'translateX(-30px)' }}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-[#1a1410]/0 hover:bg-[#1a1410]/20 transition-colors duration-300" />
          {images.length > 1 && (
            <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-[9px] font-mono transition-opacity duration-300 ${
              darkMode ? 'bg-black/50 text-white/80' : 'bg-white/80 text-[#1a1410]/80'
            }`}>
              {index + 1}/{images.length}
            </div>
          )}
          {images.length <= 1 && design.link && (
            <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={16} className="text-[#1a1410]" />
            </div>
          )}
        </div>
        <span className={`text-[10px] tracking-[0.2em] font-mono uppercase mb-1 block ${
          darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
        }`}>
          {design.category}
        </span>
        <h3 className={`font-serif text-lg ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>
          {design.title}
        </h3>
      </div>
    </div>
  );
};

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
              Interface and brand explorations crafted in Figma — click any card to cycle through the full set.
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

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${
              darkMode ? 'border-white/30' : 'border-[#1a1410]/30'
            }`} />
          </div>
        )}

        {error && (
          <p className={`text-center text-sm font-mono py-24 ${darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}`}>
            Unable to load designs at this time.
          </p>
        )}

        {!loading && !error && designs.length === 0 && (
          <p className={`text-center text-sm font-mono py-24 ${darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}`}>
            No designs to show yet.
          </p>
        )}

        {!loading && !error && designs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {designs.map((design, index) => (
              <motion.div
                key={design._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <DesignCard design={design} darkMode={darkMode} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Designs;
