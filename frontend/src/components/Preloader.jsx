import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Claude-style preloader: the logo mark breathing softly on a calm
// background, with three gentle "thinking" dots below. No progress ring,
// no percentages — just a quiet pulse until the app is ready.
const Preloader = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => onLoadingComplete(), 2200);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0d0705]"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Breathing logo mark */}
        <motion.div
          animate={{ scale: [1, 1.07, 1], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-10"
        >
          <img
            src="/apple-touch-icon.png"
            alt=""
            className="h-20 w-20 rounded-3xl shadow-[0_0_60px_rgba(255,255,255,0.08)]"
          />
        </motion.div>

        {/* Thinking dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-white/70"
              animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
