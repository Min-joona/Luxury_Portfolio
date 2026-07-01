import { motion } from 'framer-motion';
import { Figma, ArrowUpRight } from 'lucide-react';

// Placeholder design entries — replace `image` with your Figma preview exports
// and `link` with the Figma share URLs when ready.
const designs = [
  {
    title: 'Mobile App UI Kit',
    category: 'Product Design',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    link: '',
  },
  {
    title: 'E-Commerce Web Concept',
    category: 'Web Design',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    link: '',
  },
  {
    title: 'Brand & Landing Page',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&h=600&fit=crop',
    link: '',
  },
  {
    title: 'Dashboard Design System',
    category: 'UI/UX',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop',
    link: '',
  },
];

const Designs = ({ darkMode }) => {
  return (
    <section id="designs" className="py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className={`text-[10px] tracking-[0.3em] font-mono uppercase mb-4 block ${
              darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
            }`}>
              Figma & Visuals
            </span>
            <h2 className={`font-serif text-5xl lg:text-6xl mb-6 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>
              Designs
            </h2>
            <p className={`text-sm max-w-lg font-mono ${darkMode ? 'text-white/60' : 'text-[#1a1410]/60'}`}>
              Interface and brand explorations crafted in Figma — a look at how I think
              through layout, hierarchy, and feel before a single line of code.
            </p>
          </div>
          <a
            href="https://figma.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-3 font-mono text-[11px] tracking-[0.2em] border transition-all duration-300 self-start ${
              darkMode ? 'border-white/20 text-white hover:bg-white hover:text-[#1a1410]'
                       : 'border-[#1a1410]/20 text-[#1a1410] hover:bg-[#1a1410] hover:text-white'
            }`}
          >
            <Figma size={13} /> VIEW FIGMA
          </a>
        </motion.div>

        {/* Designs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {designs.map((design, index) => {
            const Wrapper = design.link ? 'a' : 'div';
            const wrapperProps = design.link
              ? { href: design.link, target: '_blank', rel: 'noopener noreferrer' }
              : {};
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group"
              >
                <Wrapper {...wrapperProps} className="block cursor-pointer">
                  <div className={`relative aspect-[4/3] rounded-xl overflow-hidden mb-4 ${
                    darkMode ? 'bg-[#2a2018]' : 'bg-[#e0d5cc]'
                  }`}>
                    <img
                      src={design.image}
                      alt={design.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#1a1410]/0 group-hover:bg-[#1a1410]/20 transition-colors duration-300" />
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={16} className="text-[#1a1410]" />
                    </div>
                  </div>
                  <span className={`text-[10px] tracking-[0.2em] font-mono uppercase mb-1 block ${
                    darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
                  }`}>
                    {design.category}
                  </span>
                  <h3 className={`font-serif text-lg ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>
                    {design.title}
                  </h3>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>

        <p className={`mt-8 text-[10px] font-mono tracking-wider ${darkMode ? 'text-white/30' : 'text-[#1a1410]/30'}`}>
          ⓘ Placeholder previews — swap in your Figma exports & share links anytime.
        </p>
      </div>
    </section>
  );
};

export default Designs;
