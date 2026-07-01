import { Moon, Sun } from 'lucide-react';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className={`fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-7xl z-50 px-8 py-4 rounded-xl border backdrop-blur-xl transition-all duration-500 ${
      darkMode 
        ? 'bg-[#1a1410]/80 border-white/10' 
        : 'bg-[#e8ddd4]/80 border-[#1a1410]/10'
    }`}>
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <div className={`font-serif text-xl tracking-tight ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>
          Portfolio
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 font-mono text-[11px] tracking-[0.2em]">
          {['HOME', 'PROJECTS', 'EXPERIENCE', 'DESIGNS', 'TIMELINE', 'CONTACT'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`hover:opacity-70 transition-opacity duration-300 ${
                darkMode ? 'text-white/70' : 'text-[#1a1410]/70'
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-mono tracking-widest transition-all duration-300 ${
            darkMode 
              ? 'border-white/20 text-white hover:bg-white/10' 
              : 'border-[#1a1410]/20 text-[#1a1410] hover:bg-[#1a1410]/10'
          }`}
        >
          {darkMode ? (
            <>
              <Moon size={12} />
              <span>DARK</span>
            </>
          ) : (
            <>
              <Sun size={12} />
              <span>BRIGHT</span>
            </>
          )}
        </button>
      </nav>
    </header>
  );
};

export default Header;
