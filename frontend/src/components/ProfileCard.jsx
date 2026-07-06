import { useState } from 'react';
import { motion } from 'framer-motion';

// Tiny blurred placeholder (LQIP) generated from the real photo. Shown instantly
// so slow connections see a thumbnail that matches the final image, which then
// fades in on top. Replaced with the real base64 once the photo is added.
const LQIP = 'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAeABgDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQFBv/EACQQAAEEAQMEAwEAAAAAAAAAAAEAAgMFBBEhMQYSE0EVIlGR/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgED/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAEREgL/2gAMAwEAAhEDEQA/AM509StsHGSU6MHpad9FXNiLSwDblQanNGBhhsZD5HevxOxyz5Hc/Jc7T0As+qacqmdta52HkvDPtHrsQhO3M4gHjj4dzqhNOoDUZLr45ZMlviBOh3W9qn4zR25RaNuSmqbp/GroCdA95G5US4xQM7wtcQxx/ik0y6yoSOrpsaWwDcXQtaNyEJS8rPjpwBJ3hw1QkE//2Q==';

const ProfileCard = ({ darkMode }) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* soft glow */}
      <div
        className="absolute -inset-6 rounded-[2rem] blur-3xl opacity-40"
        style={{ background: darkMode
          ? 'radial-gradient(circle at 50% 40%, rgba(212,175,55,0.35), transparent 70%)'
          : 'radial-gradient(circle at 50% 40%, rgba(141,110,99,0.35), transparent 70%)' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className={`relative aspect-[4/5] rounded-[2rem] overflow-hidden border shadow-2xl ${
          darkMode ? 'border-white/10 bg-[#1a1410]' : 'border-[#1a1410]/10 bg-[#f5ebe3]'
        }`}
      >
        {/* Blur-up placeholder — matches the image while it loads */}
        {!loaded && !failed && (
          <div
            className="absolute inset-0"
            style={LQIP
              ? { backgroundImage: `url(${LQIP})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(18px)', transform: 'scale(1.1)' }
              : { background: darkMode
                  ? 'linear-gradient(160deg, #2a2018, #1a1410 60%, #0d0705)'
                  : 'linear-gradient(160deg, #f5ebe3, #e0d5cc 60%, #d8c9bd)' }}
          />
        )}

        {/* Elegant fallback if the photo isn't present yet */}
        {failed && (
          <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 ${
            darkMode ? 'bg-[#1a1410]' : 'bg-[#f5ebe3]'
          }`}>
            <span className={`font-serif text-7xl ${darkMode ? 'text-white/90' : 'text-[#1a1410]/90'}`}>AH</span>
            <span className={`font-mono text-[10px] tracking-[0.3em] uppercase ${darkMode ? 'text-white/40' : 'text-[#1a1410]/40'}`}>
              Amar Hassen
            </span>
          </div>
        )}

        {/* Real image, fades in over the placeholder */}
        <motion.img
          src="/profile.png"
          alt="Amar Hassen Mohammednur"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          initial={false}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-full object-cover"
        />

        {/* subtle bottom gradient + name badge */}
        {!failed && (
          <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/50 to-transparent">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/80">
              Full Stack Developer
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileCard;
