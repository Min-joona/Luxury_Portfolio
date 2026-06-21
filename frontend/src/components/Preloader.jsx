import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 600);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0d0705]"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="relative">
          {/* Animated SVG */}
          <motion.svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            className="mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
            <motion.circle
              cx="50" cy="50" r="45"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * Math.min(progress, 100)) / 100}
            />
          </motion.svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-serif text-2xl text-white">AH</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-32 h-px bg-white/10 relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
