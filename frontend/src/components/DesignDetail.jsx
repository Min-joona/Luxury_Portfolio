import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, Figma } from 'lucide-react';
import { api } from '../api';

const brandSections = [
  'Primary Logo',
  'Secondary Mark',
  'Color Palette',
  'Typography',
  'Applications',
];

const BrandTemplate = ({ media, design, darkMode }) => {
  const hero = media[0];
  const rest = media.slice(1);

  return (
    <div className="space-y-12 pb-20">
      {hero && (
        <div className={`relative aspect-[16/9] rounded-2xl overflow-hidden ${darkMode ? 'bg-[#2a2018]' : 'bg-[#d0c5bc]'}`}>
          {hero.type === 'video' ? (
            <video src={hero.url} muted autoPlay loop playsInline className="w-full h-full object-cover" />
          ) : (
            <img src={hero.url} alt="" className="w-full h-full object-cover" />
          )}
        </div>
      )}

      {rest.length > 0 && (
        <div className="space-y-16">
          {rest.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="mb-4">
                <span className={`font-mono text-[9px] tracking-[0.3em] uppercase ${darkMode ? 'text-white/30' : 'text-[#1a1410]/30'}`}>
                  {brandSections[(i) % brandSections.length]}
                </span>
                <h3 className={`font-serif text-xl mt-1 ${darkMode ? 'text-white/70' : 'text-[#1a1410]/70'}`}>
                  0{i + 2}. {brandSections[(i) % brandSections.length]}
                </h3>
              </div>
              <div className={`relative aspect-[16/9] rounded-xl overflow-hidden ${darkMode ? 'bg-[#2a2018]' : 'bg-[#d0c5bc]'}`}>
                {item.type === 'video' ? (
                  <video src={item.url} muted autoPlay loop playsInline className="w-full h-full object-contain p-4" />
                ) : (
                  <img src={item.url} alt="" className="w-full h-full object-contain p-4" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const GalleryTemplate = ({ media, cur, setCur, stop, darkMode, active, togglePlay }) => {
  return (
    <>
      <div className={`relative aspect-[16/9] rounded-2xl overflow-hidden ${darkMode ? 'bg-[#2a2018]' : 'bg-[#d0c5bc]'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={cur}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {media[cur]?.type === 'video' ? (
              <video src={media[cur].url} muted autoPlay loop playsInline className="w-full h-full object-cover" />
            ) : (
              <img src={media[cur]?.url} alt="" className="w-full h-full object-cover" />
            )}
          </motion.div>
        </AnimatePresence>
        {media.length > 1 && (
          <div className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-mono backdrop-blur-sm ${
            darkMode ? 'bg-black/60 text-white/80' : 'bg-white/80 text-[#1a1410]/80'
          }`}>
            {cur + 1} / {media.length}
          </div>
        )}
      </div>

      {media.length > 1 && (
        <div className="mt-6">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {media.map((item, i) => (
              <button key={i} onClick={() => { stop(); setCur(i); }}
                className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all duration-200 ${
                  i === cur
                    ? 'ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-transparent opacity-100'
                    : 'opacity-50 hover:opacity-80'
                }`}>
                {item.type === 'video' ? (
                  <>
                    <video src={item.url} muted className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-black/40 flex items-center justify-center">
                        <div className="w-0 h-0 border-y-2 border-y-transparent border-l-4 border-l-white ml-0.5" />
                      </div>
                    </div>
                  </>
                ) : (
                  <img src={item.url} alt="" className="w-full h-full object-cover" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const DesignDetail = ({ darkMode }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(false);
  const [cur, setCur] = useState(0);

  const isBrand = design ? /brand|logo/i.test(design.category) : false;

  const media = useMemo(() => {
    if (!design) return [];
    const items = [];
    if (design.videos?.length) design.videos.forEach(v => items.push({ url: v, type: 'video' }));
    const imgs = design.images?.length ? design.images : (design.image ? [design.image] : []);
    imgs.forEach(i => items.push({ url: i, type: 'image' }));
    return items;
  }, [design]);

  useEffect(() => {
    (async () => {
      try {
        const data = await api(`/api/designs/${slug}`);
        setDesign(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const stop = useCallback(() => {
    setActive(false);
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  const togglePlay = useCallback(() => {
    if (active) { stop(); return; }
    if (media.length <= 1) return;
    setActive(true);
    intervalRef.current = setInterval(() => {
      setCur(i => (i + 1) % media.length);
    }, 2200);
  }, [active, media.length, stop]);

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  useEffect(() => {
    setCur(0);
    setActive(false);
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, [slug]);

  if (loading) return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0d0705]' : 'bg-[#e8ddd4]'} flex items-center justify-center`}>
      <div className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${darkMode ? 'border-white/30' : 'border-[#1a1410]/30'}`} />
    </div>
  );

  if (error || !design) return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0d0705] text-white' : 'bg-[#e8ddd4] text-[#1a1410]'} flex items-center justify-center`}>
      <div className="text-center">
        <p className="font-mono text-sm mb-6 opacity-50">Design not found</p>
        <button onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-5 py-3 font-mono text-[11px] tracking-[0.2em] border transition-all duration-300 border-current/20 hover:bg-current/10">
          <ArrowLeft size={13} /> BACK TO HOME
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#0d0705] text-white' : 'bg-[#e8ddd4] text-[#1a1410]'}`}>
      <div className={`sticky top-0 z-50 border-b transition-colors duration-300 ${darkMode ? 'bg-[#0d0705]/90 border-white/10 backdrop-blur-md' : 'bg-[#e8ddd4]/90 border-[#1a1410]/10 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/')}
            className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity">
            <ArrowLeft size={14} /> BACK
          </button>
          <div className="flex items-center gap-4">
            {design.link && (
              <a href={design.link} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity">
                <Figma size={12} /> FIGMA
              </a>
            )}
            {!isBrand && media.length > 1 && (
              <button onClick={togglePlay}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[10px] tracking-[0.15em] transition-all duration-300 ${
                  active
                    ? darkMode ? 'bg-white/10 text-white' : 'bg-[#1a1410]/10 text-[#1a1410]'
                    : 'bg-[#D4AF37] text-[#0d0705] hover:bg-[#D4AF37]/90'
                }`}>
                {active ? <Pause size={12} /> : <Play size={12} />}
                {active ? 'PAUSE' : 'PLAY ALL'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-10 pb-6">
        <div className="mb-2">
          <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${darkMode ? 'text-white/40' : 'text-[#1a1410]/40'}`}>
            {design.category}
          </span>
          <h1 className="font-serif text-3xl lg:text-4xl mt-1">{design.title}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 pb-4">
        {isBrand ? (
          <BrandTemplate media={media} design={design} darkMode={darkMode} />
        ) : (
          <GalleryTemplate media={media} cur={cur} setCur={setCur} stop={stop} darkMode={darkMode} active={active} togglePlay={togglePlay} />
        )}
      </div>

      {!isBrand && media.length <= 1 && <div className="pb-16" />}
    </div>
  );
};

export default DesignDetail;
