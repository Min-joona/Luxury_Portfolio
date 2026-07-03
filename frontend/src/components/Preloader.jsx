import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const starVertices = Array.from({ length: 10 }, (_, i) => {
  const angle = (i * Math.PI * 2) / 10 - Math.PI / 2;
  const r = i % 2 === 0 ? 36 : 14;
  return { x: Math.cos(angle) * r, y: Math.sin(angle) * r, outer: i % 2 === 0 };
});

const Preloader = ({ onLoadingComplete }) => {
  const [formed, setFormed] = useState(false);

  useEffect(() => {
    const formTimer = setTimeout(() => setFormed(true), 700);
    return () => clearTimeout(formTimer);
  }, []);

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
        {/* Star formation */}
        <motion.div
          className="relative mb-10"
          style={{ width: 80, height: 80 }}
          animate={formed ? { rotate: 360 } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        >
          {starVertices.map((v, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: 40, top: 40 }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{
                x: v.x, y: v.y,
                scale: 1, opacity: 1
              }}
              transition={{
                delay: i * 0.06,
                type: 'spring', stiffness: 150, damping: 12
              }}
            >
              <motion.div
                className="rounded-full"
                style={{
                  width: v.outer ? 6 : 3,
                  height: v.outer ? 6 : 3,
                  background: v.outer
                    ? 'linear-gradient(135deg, #D4AF37, #FFF8E1)'
                    : '#D4AF37',
                  boxShadow: v.outer
                    ? '0 0 12px rgba(212,175,55,0.5)'
                    : '0 0 4px rgba(212,175,55,0.3)',
                }}
                animate={formed ? {
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                } : {}}
                transition={{
                  duration: 2 + i * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.05,
                }}
              />
            </motion.div>
          ))}
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
