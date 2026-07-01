import { motion } from 'framer-motion';
import { HeartPulse, Wrench, Briefcase, GraduationCap, Award, MapPin } from 'lucide-react';

const experiences = [
  {
    icon: HeartPulse,
    title: 'Medical Volunteer',
    meta: 'Community Health',
    desc: 'Volunteered in medical outreach, supporting patients and health workers — learning empathy, discipline, and grace under pressure.',
  },
  {
    icon: Wrench,
    title: 'Automotive Technician',
    meta: 'Learned & Worked',
    desc: 'Trained and worked hands-on in automotive repair and maintenance — where precision, diagnostics, and patient problem-solving became second nature.',
  },
  {
    icon: Briefcase,
    title: 'Business Studies',
    meta: 'Entrepreneurship',
    desc: 'Completed a business class covering fundamentals of management, markets, and entrepreneurship — the mindset behind building things people need.',
  },
];

const scholarships = [
  {
    title: 'Missouri University',
    place: 'United States',
    year: '2024',
    status: 'Declined',
    desc: 'Awarded a scholarship offer; respectfully declined due to personal circumstances.',
  },
  {
    title: 'University of Global Health Equity (UGHE)',
    place: 'Rwanda',
    year: '2025',
    status: 'Declined',
    desc: 'Accepted into a competitive program; declined to pursue a different path.',
  },
  {
    title: 'Russian Government Scholarship',
    place: 'education-in-russia.com',
    year: '2025',
    status: 'In Progress',
    desc: 'Passed the second stage of selection — currently awaiting the university invitation to begin the visa process. The one I accepted.',
  },
];

const statusStyle = (darkMode, status) => {
  if (status === 'In Progress') return darkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-600/15 text-green-800';
  return darkMode ? 'bg-white/10 text-white/60' : 'bg-[#1a1410]/10 text-[#1a1410]/60';
};

const Experience = ({ darkMode }) => {
  return (
    <section id="experience" className="py-24 px-6 lg:px-12">
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
            Beyond the Code
          </span>
          <h2 className={`font-serif text-5xl lg:text-6xl mb-6 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>
            Experience
          </h2>
          <p className={`text-sm max-w-lg font-mono ${darkMode ? 'text-white/60' : 'text-[#1a1410]/60'}`}>
            Development is only part of the story. Here are the other worlds I've lived in —
            each one shaping how I think, build, and persevere.
          </p>
        </motion.div>

        {/* Experience cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-8 rounded-xl border ${
                  darkMode ? 'bg-[#1a1410]/60 border-white/10' : 'bg-[#f5ebe3]/80 border-[#1a1410]/10'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
                  darkMode ? 'bg-[#5D4037] text-[#FFF8E1]' : 'bg-[#8D6E63] text-white'
                }`}>
                  <Icon size={20} />
                </div>
                <span className={`text-[10px] tracking-[0.2em] font-mono uppercase mb-2 block ${
                  darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
                }`}>
                  {exp.meta}
                </span>
                <h3 className={`font-serif text-xl mb-3 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>
                  {exp.title}
                </h3>
                <p className={`text-xs font-mono leading-relaxed ${darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}`}>
                  {exp.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Scholarships */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 flex items-center gap-3"
        >
          <Award size={20} className={darkMode ? 'text-white/60' : 'text-[#1a1410]/60'} />
          <h3 className={`font-serif text-2xl ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>
            Scholarships & Recognition
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scholarships.map((s, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-6 rounded-xl border ${
                darkMode ? 'bg-[#1a1410]/60 border-white/10' : 'bg-[#f5ebe3]/80 border-[#1a1410]/10'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-[#5D4037] text-[#FFF8E1]' : 'bg-[#8D6E63] text-white'
                }`}>
                  <GraduationCap size={18} />
                </div>
                <span className={`text-[10px] font-mono tracking-wider uppercase px-3 py-1 rounded-full ${statusStyle(darkMode, s.status)}`}>
                  {s.status}
                </span>
              </div>
              <h4 className={`font-serif text-lg mb-1 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>
                {s.title}
              </h4>
              <p className={`flex items-center gap-1 text-[10px] tracking-[0.15em] font-mono uppercase mb-3 ${
                darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
              }`}>
                <MapPin size={11} /> {s.place} · {s.year}
              </p>
              <p className={`text-xs font-mono leading-relaxed ${darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}`}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
