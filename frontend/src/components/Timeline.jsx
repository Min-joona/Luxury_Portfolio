import { motion } from 'framer-motion';
import { Rocket, Building2, Briefcase, GraduationCap, HeartPulse, Wrench, Award, MapPin, Sparkles } from 'lucide-react';

const milestones = [
  { 
    year: "2025", 
    title: "Full Stack Developer", 
    company: "NESAB Vehicle Oil", 
    desc: "Currently leading full stack development, designing database architectures and building responsive web tools to optimize company operations.",
    icon: Rocket,
    position: "top",
    type: "career"
  },
  { 
    year: "2025", 
    title: "Full Stack Developer Intern", 
    company: "JPII TVET Institute", 
    desc: "Assisted development team on the web project, integrating complex databases and optimizing site performance for users.",
    icon: Building2,
    position: "bottom",
    type: "career"
  },
  { 
    year: "2024", 
    title: "Web Development Certificate", 
    company: "St. John Paul II TVET Institute", 
    desc: "Completed intensive 160-hour technical program in web development.",
    icon: GraduationCap,
    position: "top",
    type: "career"
  },
  { 
    year: "2024", 
    title: "High School Diploma", 
    company: "Meweda General Secondary School", 
    desc: "Graduated with GPA 475/600. Gold Medal winner.",
    icon: GraduationCap,
    position: "bottom",
    type: "career"
  },
  {
    year: "2024",
    title: "Medical Volunteer",
    company: "Community Health",
    desc: "Volunteered in medical outreach, supporting patients and health workers — learning empathy, discipline, and grace under pressure.",
    icon: HeartPulse,
    position: "top",
    type: "skill"
  },
  {
    year: "2023",
    title: "Automotive Technician",
    company: "Learned & Worked",
    desc: "Trained and worked hands-on in automotive repair and maintenance — where precision, diagnostics, and patient problem-solving became second nature.",
    icon: Wrench,
    position: "bottom",
    type: "skill"
  },
  {
    year: "2023",
    title: "Business Studies",
    company: "Entrepreneurship",
    desc: "Completed a business class covering fundamentals of management, markets, and entrepreneurship — the mindset behind building things people need.",
    icon: Briefcase,
    position: "top",
    type: "skill"
  },
];

const scholarships = [
  {
    title: "Missouri University",
    place: "United States",
    year: "2024",
    status: "Declined",
    desc: "Awarded a scholarship offer; respectfully declined due to personal circumstances.",
  },
  {
    title: "University of Global Health Equity (UGHE)",
    place: "Rwanda",
    year: "2025",
    status: "Declined",
    desc: "Accepted into a competitive program; declined to pursue a different path.",
  },
  {
    title: "Russian Government Scholarship",
    place: "education-in-russia.com",
    year: "2025",
    status: "In Progress",
    desc: "Passed the second stage of selection — currently awaiting the university invitation to begin the visa process.",
  },
];

const statusStyle = (darkMode, status) => {
  if (status === 'In Progress') return darkMode ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-green-600/15 text-green-800 border-green-600/30';
  return darkMode ? 'bg-white/10 text-white/60 border-white/10' : 'bg-[#1a1410]/10 text-[#1a1410]/60 border-[#1a1410]/10';
};

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
            My Journey
          </span>
          <h2 className={`font-serif text-5xl lg:text-6xl mb-6 ${
            darkMode ? 'text-white' : 'text-[#1a1410]'
          }`}>
            Timeline
          </h2>
          <p className={`text-sm max-w-lg font-mono ${
            darkMode ? 'text-white/60' : 'text-[#1a1410]/60'
          }`}>
            From the workshop to the web — every chapter shaped the developer I am today.
          </p>
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
            {/* Timeline Line */}
            <div className={`absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 ${
              darkMode ? 'bg-white/20' : 'bg-[#1a1410]/20'
            }`} />

            {/* Scrollable Container */}
            <div className="overflow-x-auto pb-12 pt-8 no-scrollbar cursor-grab active:cursor-grabbing">
              <div className="flex items-center gap-8 min-w-max px-4">
                
                {/* === CAREER PATH LABEL === */}
                <div className={`flex-shrink-0 w-32 flex flex-col items-center justify-center ${
                  darkMode ? 'text-[#D4AF37]' : 'text-[#8D6E63]'
                }`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                    darkMode ? 'bg-[#D4AF37]/20' : 'bg-[#8D6E63]/20'
                  }`}>
                    <Briefcase size={24} />
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-center leading-relaxed">
                    Career<br />Path
                  </span>
                </div>

                {milestones.map((item, index) => {
                  const Icon = item.icon;
                  const isTop = item.position === 'top';
                  const isSkill = item.type === 'skill';
                  
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
                          isSkill
                            ? darkMode
                              ? 'bg-[#1a1410]/60 border-[#2a5f7a]/30 backdrop-blur-sm'
                              : 'bg-[#f0f7fa]/80 border-[#2a5f7a]/20 backdrop-blur-sm'
                            : darkMode
                              ? 'bg-[#1a1410]/60 border-white/10 backdrop-blur-sm'
                              : 'bg-[#f5ebe3]/80 border-[#1a1410]/10 backdrop-blur-sm'
                        }`}
                      >
                        {/* Year with Icon */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isSkill
                              ? darkMode ? 'bg-[#1a5f7a] text-[#e0f7fa]' : 'bg-[#2a5f7a] text-white'
                              : darkMode ? 'bg-[#5D4037] text-[#FFF8E1]' : 'bg-[#8D6E63] text-white'
                          }`}>
                            <Icon size={18} />
                          </div>
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

                      {/* Connector */}
                      <div 
                        className={`absolute left-1/2 -translate-x-1/2 w-[2px] h-8 ${
                          isSkill
                            ? darkMode ? 'bg-[#2a5f7a]/50' : 'bg-[#2a5f7a]/30'
                            : darkMode ? 'bg-white/30' : 'bg-[#1a1410]/30'
                        } ${isTop ? 'top-full' : 'bottom-full'}`}
                      />
                      <div 
                        className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 ${
                          isSkill
                            ? darkMode ? 'bg-[#0d0705] border-[#2a5f7a]/50' : 'bg-[#e8ddd4] border-[#2a5f7a]/50'
                            : darkMode ? 'bg-[#0d0705] border-white/50' : 'bg-[#e8ddd4] border-[#1a1410]/50'
                        } ${isTop ? 'top-full mt-8' : 'bottom-full mb-8'}`}
                      >
                        <div className={`absolute inset-1 rounded-full ${
                          isSkill
                            ? darkMode ? 'bg-[#1a5f7a]' : 'bg-[#2a5f7a]'
                            : darkMode ? 'bg-[#5D4037]' : 'bg-[#8D6E63]'
                        }`} />
                      </div>
                    </motion.div>
                  );
                })}

                {/* === SCHOLARSHIPS LABEL === */}
                <div className={`flex-shrink-0 w-32 flex flex-col items-center justify-center ${
                  darkMode ? 'text-[#D4AF37]' : 'text-[#8D6E63]'
                }`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                    darkMode ? 'bg-[#D4AF37]/20' : 'bg-[#8D6E63]/20'
                  }`}>
                    <Award size={24} />
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-center leading-relaxed">
                    Scholar-<br />ships
                  </span>
                </div>

                {scholarships.map((s, index) => {
                  const isTop = index % 2 === 0;
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
                            ? 'bg-[#1a1410]/60 border-[#D4AF37]/20 backdrop-blur-sm' 
                            : 'bg-[#fdf8f0]/80 border-[#D4AF37]/30 backdrop-blur-sm'
                        }`}
                      >
                        {/* Award Icon + Status */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            darkMode ? 'bg-[#D4AF37]/20' : 'bg-[#D4AF37]/20'
                          }`}>
                            <Award size={18} className={darkMode ? 'text-[#D4AF37]' : 'text-[#8D6E63]'} />
                          </div>
                          <span className={`text-[10px] font-mono tracking-wider uppercase px-3 py-1 rounded-full border ${statusStyle(darkMode, s.status)}`}>
                            {s.status}
                          </span>
                        </div>

                        <h3 className={`font-serif text-lg mb-1 ${
                          darkMode ? 'text-white' : 'text-[#1a1410]'
                        }`}>
                          {s.title}
                        </h3>
                        <div className={`flex items-center gap-1 text-[10px] tracking-[0.15em] font-mono uppercase mb-3 ${
                          darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
                        }`}>
                          <MapPin size={11} /> {s.place} · {s.year}
                        </div>
                        <p className={`text-sm leading-relaxed ${
                          darkMode ? 'text-white/70' : 'text-[#1a1410]/70'
                        }`}>
                          {s.desc}
                        </p>
                      </div>

                      {/* Connector */}
                      <div 
                        className={`absolute left-1/2 -translate-x-1/2 w-[2px] h-8 ${
                          darkMode ? 'bg-[#D4AF37]/40' : 'bg-[#D4AF37]/30'
                        } ${isTop ? 'top-full' : 'bottom-full'}`}
                      />
                      <div 
                        className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 ${
                          darkMode ? 'bg-[#0d0705] border-[#D4AF37]/50' : 'bg-[#e8ddd4] border-[#D4AF37]/50'
                        } ${isTop ? 'top-full mt-8' : 'bottom-full mb-8'}`}
                      >
                        <div className={`absolute inset-1 rounded-full ${
                          darkMode ? 'bg-[#D4AF37]' : 'bg-[#8D6E63]'
                        }`} />
                      </div>
                    </motion.div>
                  );
                })}

                {/* End spacer */}
                <div className="flex-shrink-0 w-8" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;