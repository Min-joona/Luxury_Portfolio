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
          © 2025 Amar Mohammednur. Crafted with precision.
        </p>

        {/* Center: Line decoration */}
        <div className={`hidden md:block w-16 h-px ${
          darkMode ? 'bg-white/20' : 'bg-[#1a1410]/20'
        }`} />

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
