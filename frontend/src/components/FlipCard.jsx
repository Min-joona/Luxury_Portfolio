import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const FlipCard = ({ darkMode }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto" style={{ perspective: '1200px' }}>
      <motion.div
        className="relative w-full aspect-[4/3] cursor-pointer rounded-2xl"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 200, damping: 20 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front - Decorative gradient */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            background: darkMode
              ? 'radial-gradient(ellipse at 30% 30%, #4A3728 0%, #2C1B14 40%, #1A0F0A 100%)'
              : 'radial-gradient(ellipse at 30% 30%, #8D6E63 0%, #5D4037 40%, #3E2723 100%)',
            boxShadow: darkMode
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 0 60px rgba(93, 64, 55, 0.3)'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.3), inset 0 0 60px rgba(93, 64, 55, 0.1)'
          }}
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 30% 30%, rgba(212,175,55,0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 70% 70%, rgba(212,175,55,0.15) 0%, transparent 50%)',
                'radial-gradient(circle at 30% 30%, rgba(212,175,55,0.15) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Ambient lighting effect */}
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.08) 0%, transparent 50%)'
            }}
          />

          {/* Center decorative element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <motion.div
                className={`w-24 h-24 rounded-full border-2 ${
                  darkMode ? 'border-white/10' : 'border-white/20'
                }`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className={`absolute inset-4 rounded-full ${
                  darkMode ? 'bg-white/5' : 'bg-white/10'
                }`}
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute inset-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8D6E63] opacity-30"
                animate={{ scale: [1, 0.8, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>

          {/* Gradient overlay for depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(93,64,55,0.2) 0%, transparent 50%, rgba(62,39,35,0.3) 100%)'
            }}
          />

          {/* Flip hint */}
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md text-[10px] font-mono tracking-wider border"
            style={{
              backgroundColor: darkMode ? 'rgba(93, 64, 55, 0.6)' : 'rgba(141, 110, 99, 0.6)',
              borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.3)',
              color: '#FFF8E1'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <Sparkles size={12} />
            Click to flip
          </motion.div>
        </div>

        {/* Back - Photo */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: darkMode
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.3)'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=face"
            alt="Developer Portrait"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)' }}
          />
          <motion.div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full backdrop-blur-md text-[10px] font-mono tracking-wider border"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              color: '#FFF'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Click to flip back
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
