import { motion } from 'framer-motion';
import FlipCard from './FlipCard';

const Hero = ({ darkMode }) => {
  return (
    <section id="home" className="min-h-screen pt-32 pb-20 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className={`text-[11px] tracking-[0.3em] font-mono uppercase ${
              darkMode ? 'text-white/60' : 'text-[#1a1410]/60'
            }`}>
              Full Stack Developer
            </span>
            
            <h1 className={`font-serif text-7xl lg:text-8xl font-normal leading-[0.9] ${
              darkMode ? 'text-white' : 'text-[#1a1410]'
            }`}>
              Amar Hassen<br />Mohammednur
            </h1>

            <p className={`text-sm leading-relaxed max-w-md font-mono ${
              darkMode ? 'text-white/60' : 'text-[#1a1410]/60'
            }`}>
              Dedicated Full Stack Developer with a strong foundation in building web interfaces and managing databases. Efficiency-driven developer focused on creating tools that solve real-world problems reliably.
            </p>

            <div className="flex gap-4 pt-4">
              <a
                href="#projects"
                className={`group px-8 py-4 font-mono text-[11px] tracking-[0.2em] border transition-all duration-300 ${
                  darkMode 
                    ? 'border-white/20 text-white hover:bg-white hover:text-[#1a1410]' 
                    : 'border-[#1a1410]/20 text-[#1a1410] hover:bg-[#1a1410] hover:text-white'
                }`}
              >
                VIEW PROJECTS
              </a>
              <a
                href="#contact"
                className={`group px-8 py-4 font-mono text-[11px] tracking-[0.2em] underline underline-offset-4 transition-all duration-300 ${
                  darkMode 
                    ? 'text-white hover:text-white/70' 
                    : 'text-[#1a1410] hover:text-[#1a1410]/70'
                }`}
              >
                GET IN TOUCH
              </a>
            </div>
          </motion.div>

          {/* Right Column: 3D Chocolate Molecule Flip Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <FlipCard darkMode={darkMode} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
