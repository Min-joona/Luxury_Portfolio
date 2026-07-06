import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Building2, Briefcase, GraduationCap, HeartPulse, Wrench, Award, MapPin, Sparkles } from 'lucide-react';
import { api } from '../api';

// Map the icon name stored in the database to a lucide component.
const ICONS = { Rocket, Building2, Briefcase, GraduationCap, HeartPulse, Wrench, Award, MapPin, Sparkles };

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
  {
    year: "2024",
    title: "Python & Data Structures",
    company: "Self-Taught",
    desc: "Built a strong foundation in Python, data structures, and algorithms — solving 100+ coding challenges across multiple platforms.",
    icon: Award,
    position: "bottom",
    type: "skill"
  },
  {
    year: "2024",
    title: "JavaScript & React",
    company: "Self-Taught",
    desc: "Mastered modern JavaScript (ES6+) and React — building interactive UIs, managing state, and integrating RESTful APIs.",
    icon: Award,
    position: "top",
    type: "skill"
  },
  {
    year: "2024",
    title: "Web Design & UI/UX",
    company: "Self-Taught",
    desc: "Learned responsive design principles, Figma prototyping, and accessibility — crafting interfaces that are both beautiful and usable.",
    icon: Award,
    position: "bottom",
    type: "skill"
  },
  {
    year: "2025",
    title: "Full Stack Development",
    company: "MERN Stack",
    desc: "Built production-grade full stack applications with MongoDB, Express, React, Node.js — from authentication to deployment on Vercel.",
    icon: Award,
    position: "top",
    type: "skill"
  },
  {
    year: "2025",
    title: "Problem Solving & Algorithms",
    company: "Ongoing",
    desc: "Continuously sharpening analytical thinking and algorithmic problem-solving through real-world projects and coding practice.",
    icon: Award,
    position: "bottom",
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
  {
    title: "DAAD Scholarship",
    place: "Germany",
    year: "2025",
    status: "Declined",
    desc: "Invited to apply for the DAAD EPOS program; declined due to preference for Russian Government program.",
  },
  {
    title: "Turkish Government Scholarship",
    place: "Turkey",
    year: "2024",
    status: "Declined",
    desc: "Received an acceptance letter from a Turkish university through the Türkiye Bursları program; declined due to personal reasons.",
  },
  {
    title: "Ethiopian Ministry Scholarship",
    place: "Ethiopia",
    year: "2023",
    status: "Declined",
    desc: "Awarded a national merit-based scholarship for university; declined to pursue international opportunities.",
  },
  {
    title: "AFS Intercultural Exchange",
    place: "USA",
    year: "2022",
    status: "Declined",
    desc: "Selected as a finalist for a year-long cultural exchange program in the United States; ultimately not placed.",
  },
  {
    title: "Mastercard Foundation Scholarship",
    place: "Multiple Countries",
    year: "2024",
    status: "Declined",
    desc: "Reached the final round of the competitive Mastercard Foundation scholars program; not selected for the final cohort.",
  },
];

const statusStyle = (darkMode, status) => {
  if (status === 'In Progress') return darkMode ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-green-600/15 text-green-800 border-green-600/30';
  return darkMode ? 'bg-white/10 text-white/60 border-white/10' : 'bg-[#1a1410]/10 text-[#1a1410]/60 border-[#1a1410]/10';
};

const Timeline = ({ darkMode }) => {
  const [items, setItems] = useState(null);
  const skillsRef = useRef(null);

  // Pull timeline from the API; fall back to the built-in data if empty/unreachable.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api('/api/timeline');
        if (!cancelled && Array.isArray(data) && data.length) setItems(data);
      } catch { /* keep fallback */ }
    })();
    return () => { cancelled = true; };
  }, []);

  const dbMilestones = items
    ? items.filter(i => i.type === 'milestone').map(i => ({ ...i, type: i.milestoneType, icon: ICONS[i.icon] || Award }))
    : null;
  const dbScholarships = items ? items.filter(i => i.type === 'scholarship') : null;

  const useMilestones = dbMilestones && dbMilestones.length ? dbMilestones : milestones;
  const useScholarships = dbScholarships && dbScholarships.length ? dbScholarships : scholarships;

  const careerMilestones = useMilestones.filter(m => m.type === 'career');
  const skillMilestones = useMilestones.filter(m => m.type === 'skill');

  useEffect(() => {
    if (skillsRef.current) {
      requestAnimationFrame(() => {
        skillsRef.current.scrollLeft = skillsRef.current.scrollWidth;
      });
    }
  }, []);

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

        {/* === SECTION 1: CAREER PATH (LTR) === */}
        <div className="relative mb-24">
          <div className={`absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 z-0 ${
            darkMode ? 'bg-white/20' : 'bg-[#1a1410]/20'
          }`} />
          <div className={`text-center mb-4 text-[10px] font-mono tracking-widest ${
            darkMode ? 'text-white/40' : 'text-[#1a1410]/40'
          }`}>
            → Scroll →
          </div>
          <div className="overflow-x-auto pb-12 pt-4 no-scrollbar">
            <div className="flex items-center gap-8 min-w-max px-4 relative z-10">
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
              {careerMilestones.map((item, index) => {
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
                    <div className={`p-6 rounded-xl border ${
                      isTop ? 'mb-16' : 'mt-16'
                    } ${
                      darkMode ? 'bg-[#1a1410]/60 border-white/10 backdrop-blur-sm' : 'bg-[#f5ebe3]/80 border-[#1a1410]/10 backdrop-blur-sm'
                    }`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-[#5D4037] text-[#FFF8E1]' : 'bg-[#8D6E63] text-white'
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
                    <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] h-8 ${
                      darkMode ? 'bg-white/30' : 'bg-[#1a1410]/30'
                    } ${isTop ? 'top-full' : 'bottom-full'}`} />
                    <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 ${
                      darkMode ? 'bg-[#0d0705] border-white/50' : 'bg-[#e8ddd4] border-[#1a1410]/50'
                    } ${isTop ? 'top-full mt-8' : 'bottom-full mb-8'}`}>
                      <div className={`absolute inset-1 rounded-full ${
                        darkMode ? 'bg-[#5D4037]' : 'bg-[#8D6E63]'
                      }`} />
                    </div>
                  </motion.div>
                );
              })}
              <div className="flex-shrink-0 w-8" />
            </div>
          </div>
          <div className="absolute right-12 top-full w-[2px] h-24">
            <div className={`w-full h-full ${darkMode ? 'bg-white/15' : 'bg-[#1a1410]/15'}`} />
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 ${
              darkMode ? 'bg-[#0d0705] border-white/20' : 'bg-[#e8ddd4] border-[#1a1410]/20'
            }`}>
              <div className={`absolute inset-0.5 rounded-full ${darkMode ? 'bg-white/30' : 'bg-[#1a1410]/30'}`} />
            </div>
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 ${
              darkMode ? 'bg-[#0d0705] border-white/20' : 'bg-[#e8ddd4] border-[#1a1410]/20'
            }`}>
              <div className={`absolute inset-0.5 rounded-full ${darkMode ? 'bg-white/30' : 'bg-[#1a1410]/30'}`} />
            </div>
          </div>
        </div>

        {/* === SECTION 2: SKILLS (RTL) === */}
        <div className="relative mb-24">
          <div className={`absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 z-0 ${
            darkMode ? 'bg-[#2a5f7a]/30' : 'bg-[#2a5f7a]/20'
          }`} />
          <div className={`text-center mb-4 text-[10px] font-mono tracking-widest ${
            darkMode ? 'text-white/40' : 'text-[#1a1410]/40'
          }`}>
            ← Scroll ←
          </div>
          <div className="overflow-x-auto pb-12 pt-4 no-scrollbar" ref={skillsRef}>
            <div className="flex flex-row-reverse items-center gap-8 min-w-max px-4 relative z-10">
              <div className={`flex-shrink-0 w-32 flex flex-col items-center justify-center ${
                darkMode ? 'text-[#2a5f7a]' : 'text-[#2a5f7a]'
              }`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                  darkMode ? 'bg-[#2a5f7a]/20' : 'bg-[#2a5f7a]/15'
                }`}>
                  <Sparkles size={24} />
                </div>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-center leading-relaxed">
                  Skills
                </span>
              </div>
              {skillMilestones.map((item, index) => {
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
                    <div className={`p-6 rounded-xl border ${
                      isTop ? 'mb-16' : 'mt-16'
                    } ${
                      darkMode
                        ? 'bg-[#1a1410]/60 border-[#2a5f7a]/30 backdrop-blur-sm'
                        : 'bg-[#f0f7fa]/80 border-[#2a5f7a]/20 backdrop-blur-sm'
                    }`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-[#1a5f7a] text-[#e0f7fa]' : 'bg-[#2a5f7a] text-white'
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
                    <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] h-8 ${
                      darkMode ? 'bg-[#2a5f7a]/50' : 'bg-[#2a5f7a]/30'
                    } ${isTop ? 'top-full' : 'bottom-full'}`} />
                    <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 ${
                      darkMode ? 'bg-[#0d0705] border-[#2a5f7a]/50' : 'bg-[#e8ddd4] border-[#2a5f7a]/50'
                    } ${isTop ? 'top-full mt-8' : 'bottom-full mb-8'}`}>
                      <div className={`absolute inset-1 rounded-full ${
                        darkMode ? 'bg-[#1a5f7a]' : 'bg-[#2a5f7a]'
                      }`} />
                    </div>
                  </motion.div>
                );
              })}
              <div className="flex-shrink-0 w-8" />
            </div>
          </div>
          <div className="absolute left-12 top-full w-[2px] h-24">
            <div className={`w-full h-full ${darkMode ? 'bg-[#2a5f7a]/20' : 'bg-[#2a5f7a]/15'}`} />
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 ${
              darkMode ? 'bg-[#0d0705] border-[#2a5f7a]/30' : 'bg-[#e8ddd4] border-[#2a5f7a]/20'
            }`}>
              <div className={`absolute inset-0.5 rounded-full ${darkMode ? 'bg-[#2a5f7a]/30' : 'bg-[#2a5f7a]/20'}`} />
            </div>
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 ${
              darkMode ? 'bg-[#0d0705] border-[#2a5f7a]/30' : 'bg-[#e8ddd4] border-[#2a5f7a]/20'
            }`}>
              <div className={`absolute inset-0.5 rounded-full ${darkMode ? 'bg-[#2a5f7a]/30' : 'bg-[#2a5f7a]/20'}`} />
            </div>
          </div>
        </div>

        {/* === SECTION 3: SCHOLARSHIPS (LTR) === */}
        <div className="relative">
          <div className={`absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 z-0 ${
            darkMode ? 'bg-[#D4AF37]/30' : 'bg-[#D4AF37]/20'
          }`} />
          <div className={`text-center mb-4 text-[10px] font-mono tracking-widest ${
            darkMode ? 'text-white/40' : 'text-[#1a1410]/40'
          }`}>
            → Scroll →
          </div>
          <div className="overflow-x-auto pb-12 pt-4 no-scrollbar">
            <div className="flex items-center gap-8 min-w-max px-4 relative z-10">
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
              {useScholarships.map((s, index) => {
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
                    <div className={`p-6 rounded-xl border ${
                      isTop ? 'mb-16' : 'mt-16'
                    } ${
                      darkMode 
                        ? 'bg-[#1a1410]/60 border-[#D4AF37]/20 backdrop-blur-sm' 
                        : 'bg-[#fdf8f0]/80 border-[#D4AF37]/30 backdrop-blur-sm'
                    }`}>
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
                    <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] h-8 ${
                      darkMode ? 'bg-[#D4AF37]/40' : 'bg-[#D4AF37]/30'
                    } ${isTop ? 'top-full' : 'bottom-full'}`} />
                    <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 ${
                      darkMode ? 'bg-[#0d0705] border-[#D4AF37]/50' : 'bg-[#e8ddd4] border-[#D4AF37]/50'
                    } ${isTop ? 'top-full mt-8' : 'bottom-full mb-8'}`}>
                      <div className={`absolute inset-1 rounded-full ${
                        darkMode ? 'bg-[#D4AF37]' : 'bg-[#8D6E63]'
                      }`} />
                    </div>
                  </motion.div>
                );
              })}
              <div className="flex-shrink-0 w-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
