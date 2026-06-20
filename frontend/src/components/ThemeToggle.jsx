import { motion } from 'framer-motion';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <motion.button
      onClick={() => setDarkMode(!darkMode)}
      className={`fixed top-8 right-12 z-[60] px-4 py-2 rounded-full border backdrop-blur-md font-mono text-[10px] tracking-widest transition-all duration-500 ${darkMode ? 'border-white/10 text-white bg-obsidian/40 hover:bg-white hover:text-obsidian' : 'border-obsidian/10 text-obsidian bg-white/40 hover:bg-obsidian hover:text-white'
        }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {darkMode ? 'DARK MODE' : 'LIGHT MODE'}
    </motion.button>
  );
};

export default ThemeToggle;