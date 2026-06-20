import { motion } from 'framer-motion';
import { Rocket, Building2, Briefcase, GraduationCap } from 'lucide-react';

const milestones = [
  { 
    year: "2025", 
    title: "Full Stack Developer", 
    company: "NESAB Vehicle Oil", 
    desc: "Currently leading full stack development, designing database architectures and building responsive web tools to optimize company operations.",
    icon: Rocket,
    position: "top"
  },
  { 
    year: "2025", 
    title: "Full Stack Developer Intern", 
    company: "JPII TVET Institute", 
    desc: "Assisted development team on the web project, integrating complex databases and optimizing site performance for users.",
    icon: Building2,
    position: "bottom"
  },
  { 
    year: "2024", 
    title: "Web Development Certificate", 
    company: "St. John Paul II TVET Institute", 
    desc: "Completed intensive 160-hour technical program in web development.",
    icon: GraduationCap,
    position: "top"
  },
  { 
    year: "2024", 
    title: "High School Diploma", 
    company: "Meweda General Secondary School", 
    desc: "Graduated with GPA 475/600. Gold Medal winner.",
    icon: GraduationCap,
    position: "bottom"
  }
];

const Timeline = ({ darkMode }) => {
  return (
    <section id="timeline" className="py-24 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className={`text-[10px] tracking-[0.3em] font-mono uppercase mb-4 block ${
            darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
          }`}>
            Career Path
          </span>
          <h2 className={`font-serif text-5xl lg:text-6xl ${
            darkMode ? 'text-white' : 'text-[#1a1410]'
          }`}>
            Timeliness
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Scroll hint */}
          <div className={`text-center mb-6 text-[10px] font-mono tracking-widest ${
            darkMode ? 'text-white/40' : 'text-[#1a1410]/40'
          }`}>
            ← Scroll horizontally →
          </div>

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Timeline Line - Behind cards */}
            <div className={`absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 ${
              darkMode ? 'bg-white/20' : 'bg-[#1a1410]/20'
            }`} />

            {/* Scrollable Container */}
            <div className="overflow-x-auto pb-12 pt-8 no-scrollbar cursor-grab active:cursor-grabbing">
              <div className="flex items-center gap-8 min-w-max px-4">
                {milestones.map((item, index) => {
                  const Icon = item.icon;
                  const isTop = item.position === 'top';
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: isTop ? -30 : 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative flex-shrink-0 w-[300px]"
                    >
                      {/* Card */}
                      <div 
                        className={`p-6 rounded-xl border ${
                          isTop ? 'mb-16' : 'mt-16'
                        } ${
                          darkMode 
                            ? 'bg-[#1a1410]/60 border-white/10 backdrop-blur-sm' 
                            : 'bg-[#f5ebe3]/80 border-[#1a1410]/10 backdrop-blur-sm'
                        }`}
                      >
                        {/* Year with Icon */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            darkMode 
                              ? 'bg-[#5D4037] text-[#FFF8E1]' 
                              : 'bg-[#8D6E63] text-white'
                          }`}>
                            <Icon size={18} />
                          </div>
                          {/* Year - Using serif font for numbers */}
                          <span className={`text-3xl font-serif tracking-tight ${
                            darkMode ? 'text-white' : 'text-[#1a1410]'
                          }`}>
                            {item.year}
                          </span>
                        </div>

                        <h3 className={`font-serif text-xl mb-1 ${
                          darkMode ? 'text-white' : 'text-[#1a1410]'
                        }`}>
                          {item.title}
                        </h3>
                        <p className={`text-[10px] tracking-[0.15em] font-mono uppercase mb-3 ${
                          darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
                        }`}>
                          {item.company}
                        </p>
                        <p className={`text-sm leading-relaxed ${
                          darkMode ? 'text-white/70' : 'text-[#1a1410]/70'
                        }`}>
                          {item.desc}
                        </p>
                      </div>

                      {/* Connector Line to Timeline */}
                      <div 
                        className={`absolute left-1/2 -translate-x-1/2 w-[2px] h-8 ${
                          darkMode ? 'bg-white/30' : 'bg-[#1a1410]/30'
                        } ${isTop ? 'top-full' : 'bottom-full'}`}
                      />

                      {/* Connector Dot */}
                      <div 
                        className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 ${
                          darkMode 
                            ? 'bg-[#0d0705] border-white/50' 
                            : 'bg-[#e8ddd4] border-[#1a1410]/50'
                        } ${isTop ? 'top-full mt-8' : 'bottom-full mb-8'}`}
                      >
                        <div className={`absolute inset-1 rounded-full ${
                          darkMode ? 'bg-[#5D4037]' : 'bg-[#8D6E63]'
                        }`} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
