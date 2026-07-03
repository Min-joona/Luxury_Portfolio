import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        {/* CSS Star */}
        <div className="star-container mb-10">
          <div className="star" />
        </div>

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

        <style>{`
          .star-container {
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: starSpin 4s linear infinite;
          }
          .star {
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #D4AF37, #FFF8E1);
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            animation: starPulse 2s ease-in-out infinite;
            box-shadow: 0 0 60px rgba(212, 175, 55, 0.25);
          }
          @keyframes starSpin {
            to { transform: rotate(360deg); }
          }
          @keyframes starPulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.08); opacity: 1; }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;