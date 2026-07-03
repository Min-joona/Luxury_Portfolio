const Footer = ({ darkMode }) => {
  return (
    <footer className={`py-8 px-6 lg:px-12 border-t ${
      darkMode ? 'border-white/10' : 'border-[#1a1410]/10'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Copyright */}
        <p className={`text-[10px] font-mono tracking-widest ${
          darkMode ? 'text-white/40' : 'text-[#1a1410]/40'
        }`}>
          © 2026 Amar Hassen Mohammednur. Crafted with precision.
        </p>

        {/* Center: Logo */}
        <a href="#home" className="flex items-center gap-2">
          <img src="/favicon.png" alt="Amar Hassen" className="h-7 w-7 rounded-lg" />
          <span className={`font-serif text-base tracking-tight ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>
            Amar Hassen
          </span>
        </a>

        {/* Right: Role */}
        <p className={`text-[10px] font-mono tracking-widest uppercase ${
          darkMode ? 'text-white/40' : 'text-[#1a1410]/40'
        }`}>
          Full Stack Developer
        </p>
      </div>
    </footer>
  );
};

export default Footer;
