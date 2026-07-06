import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Download, Printer, Mail, Phone, MapPin, Globe,
  Code2, HeartPulse, Languages, Briefcase, GraduationCap, Users,
} from 'lucide-react';

// Resume data (sourced from Amar's CV).
const CONTACT = [
  { icon: Mail, label: 'amarshisheno@gmail.com', href: 'mailto:amarshisheno@gmail.com' },
  { icon: Phone, label: '+251 93 368 0059', href: 'tel:+251933680059' },
  { icon: MapPin, label: 'Addis Ababa, Ethiopia' },
  { icon: Globe, label: 'amar-shesheno-luxury.vercel.app', href: 'https://amar-shesheno-luxury.vercel.app' },
];

const TECHNICAL = ['MERN Stack', 'Python (OOP)', 'PHP', 'HTML / CSS', 'E-Commerce'];
const MEDICAL = ['Clinical Intake', 'Vital Measurement', 'BP & FBS', 'Health Education', 'Medical Interpretation'];
const LANGUAGES = [
  { name: 'English', level: 'Fluent', pct: 100 },
  { name: 'Amharic', level: 'Fluent', pct: 100 },
  { name: 'Arabic', level: 'Fluent · Interpreter', pct: 95 },
  { name: 'Korean', level: 'Intermediate', pct: 55 },
  { name: 'Russian', level: 'Beginner', pct: 25 },
];

const LEADERSHIP = [
  {
    title: 'Clinical Volunteer & Intake Specialist',
    org: 'Tesfa Medical Care Team & Rotaract Clubs',
    date: '2024 — Present',
    points: [
      'Managed logistics and clinical intake for large-scale Breast Cancer Screening events.',
      'Measured patient vitals, including Blood Pressure and Fasting Blood Sugar (FBS).',
      'Consulted elderly community members on minimizing risks of diabetes and strokes.',
      'Shadowed senior physicians during surgical procedures for womb cancer removal.',
    ],
  },
  {
    title: 'Refugee Education Advocate',
    org: 'Independent / Kepler Iteme Alumni',
    date: '2024 — Present',
    points: [
      'Mentored fellow refugees through the Kepler Iteme application and onboarding processes.',
      'Founded a Telegram channel providing academic materials to high-school students for ESSLCE.',
      "Designed and built 'The Learning Launchpad', a custom educational website for mentoring.",
    ],
  },
];

const EXPERIENCE = [
  {
    title: 'Co-Founder & Full Stack Developer',
    org: 'NESAB — Vehicle Lubricants Startup',
    date: '2024 — 2025',
    points: [
      'Co-founded a vehicle oil reseller company, competing in a national startup competition.',
      'Pitched and secured 400,700 ETB in startup funding.',
      "Designed, developed, and launched the company's e-commerce platform on the MERN stack and Python.",
    ],
  },
];

const EDUCATION = [
  { school: 'Kepler', detail: 'Iteme Program Alumnus · Intensive 2-Month Program', date: '2024', note: 'Web Development — Gold' },
  { school: 'St. John Paul II TVET', detail: 'Automotive Technician · TVET Program', date: '2024', note: '6-Month Program' },
  { school: 'Meweda General Secondary', detail: 'High School Diploma', date: '2024', note: 'ESSLCE: 475 / 600' },
];

const Resume = ({ darkMode }) => {
  const t = {
    bg: darkMode ? 'bg-[#0d0705]' : 'bg-[#e8ddd4]',
    card: darkMode ? 'bg-[#1a1410]/60 border-white/10' : 'bg-white/70 border-[#1a1410]/10',
    text: darkMode ? 'text-white' : 'text-[#1a1410]',
    sub: darkMode ? 'text-white/60' : 'text-[#1a1410]/60',
    faint: darkMode ? 'text-white/40' : 'text-[#1a1410]/40',
    line: darkMode ? 'border-white/10' : 'border-[#1a1410]/10',
    chip: darkMode ? 'bg-white/5 border-white/10 text-white/80' : 'bg-[#1a1410]/5 border-[#1a1410]/10 text-[#1a1410]/80',
    gold: darkMode ? 'text-[#D4AF37]' : 'text-[#8D6E63]',
  };

  const SectionTitle = ({ icon: Icon, children }) => (
    <div className="flex items-center gap-3 mb-5">
      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
        darkMode ? 'bg-[#5D4037] text-[#FFF8E1]' : 'bg-[#8D6E63] text-white'
      }`}>
        <Icon size={16} />
      </div>
      <h2 className={`font-serif text-2xl ${t.text}`}>{children}</h2>
    </div>
  );

  const Entry = ({ title, org, date, points }) => (
    <div className="mb-7 last:mb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className={`font-serif text-lg ${t.text}`}>{title}</h3>
        <span className={`text-[11px] font-mono tracking-wider ${t.gold}`}>{date}</span>
      </div>
      <p className={`text-[11px] tracking-[0.15em] font-mono uppercase mb-3 ${t.sub}`}>{org}</p>
      <ul className="space-y-2">
        {points.map((p, i) => (
          <li key={i} className={`flex gap-3 text-sm leading-relaxed ${t.sub}`}>
            <span className={`mt-2 h-1 w-1 rounded-full shrink-0 ${darkMode ? 'bg-[#D4AF37]' : 'bg-[#8D6E63]'}`} />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={`min-h-screen ${t.bg}`}>
      {/* Top nav (hidden when printing) */}
      <nav className={`no-print fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b backdrop-blur-xl ${
        darkMode ? 'bg-[#0d0705]/80 border-white/10' : 'bg-[#e8ddd4]/80 border-[#1a1410]/10'
      }`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className={`flex items-center gap-2 text-sm font-mono transition-colors ${t.sub} hover:${t.text}`}>
            <ArrowLeft size={18} /> Back to Portfolio
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-mono tracking-widest transition-all ${
                darkMode ? 'border-white/20 text-white hover:bg-white/10' : 'border-[#1a1410]/20 text-[#1a1410] hover:bg-[#1a1410]/10'
              }`}
            >
              <Printer size={13} /> PRINT
            </button>
            <a
              href="/Amar-Hassen-Mohammednur-Resume.pdf"
              download
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-mono tracking-widest transition-all ${
                darkMode ? 'bg-white text-[#1a1410] hover:bg-white/90' : 'bg-[#1a1410] text-white hover:bg-[#1a1410]/90'
              }`}
            >
              <Download size={13} /> DOWNLOAD PDF
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-6 print:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <header className={`flex flex-col sm:flex-row sm:items-center gap-6 pb-8 mb-10 border-b ${t.line}`}>
            <img
              src="/profile.png"
              alt="Amar Hassen Mohammednur"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              className={`w-24 h-24 rounded-2xl object-cover border ${t.line}`}
            />
            <div className="flex-1">
              <h1 className={`font-serif text-4xl lg:text-5xl mb-1 ${t.text}`}>Amar Hassen Mohammednur</h1>
              <p className={`text-[12px] font-mono tracking-[0.25em] uppercase mb-4 ${t.gold}`}>
                Full Stack Developer &amp; Medical Advocate
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {CONTACT.map(({ icon: Icon, label, href }) => {
                  const inner = (
                    <span className={`inline-flex items-center gap-1.5 text-[12px] font-mono ${t.sub}`}>
                      <Icon size={13} className={t.gold} /> {label}
                    </span>
                  );
                  return href ? (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">{inner}</a>
                  ) : <span key={label}>{inner}</span>;
                })}
              </div>
            </div>
          </header>

          {/* Brief */}
          <p className={`text-[15px] leading-relaxed mb-12 max-w-3xl ${t.sub}`}>
            An adaptable professional bridging community health, software development, and refugee advocacy.
            As an alumnus of Kepler Iteme, I mentor displaced youth and facilitate access to higher education —
            building high-impact digital tools, securing funding for entrepreneurial ventures, and providing
            clinical and logistical support in medical outreach programs.
          </p>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-10">
              <section>
                <SectionTitle icon={Code2}>Technical</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {TECHNICAL.map((s) => (
                    <span key={s} className={`px-3 py-1.5 rounded-lg text-[11px] font-mono border ${t.chip}`}>{s}</span>
                  ))}
                </div>
              </section>

              <section>
                <SectionTitle icon={HeartPulse}>Medical</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {MEDICAL.map((s) => (
                    <span key={s} className={`px-3 py-1.5 rounded-lg text-[11px] font-mono border ${t.chip}`}>{s}</span>
                  ))}
                </div>
              </section>

              <section>
                <SectionTitle icon={Languages}>Languages</SectionTitle>
                <div className="space-y-4">
                  {LANGUAGES.map((l) => (
                    <div key={l.name}>
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className={`font-serif text-base ${t.text}`}>{l.name}</span>
                        <span className={`text-[10px] font-mono tracking-wider uppercase ${t.faint}`}>{l.level}</span>
                      </div>
                      <div className={`h-1 rounded-full overflow-hidden ${darkMode ? 'bg-white/10' : 'bg-[#1a1410]/10'}`}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${l.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: 'easeOut' }}
                          className={`h-full rounded-full ${darkMode ? 'bg-[#D4AF37]' : 'bg-[#8D6E63]'}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </aside>

            {/* Main column */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <SectionTitle icon={Users}>Community &amp; Clinical Leadership</SectionTitle>
                {LEADERSHIP.map((e) => <Entry key={e.title} {...e} />)}
              </section>

              <section>
                <SectionTitle icon={Briefcase}>Professional Experience</SectionTitle>
                {EXPERIENCE.map((e) => <Entry key={e.title} {...e} />)}
              </section>

              <section>
                <SectionTitle icon={GraduationCap}>Education</SectionTitle>
                <div className="space-y-5">
                  {EDUCATION.map((ed) => (
                    <div key={ed.school} className={`p-5 rounded-xl border ${t.card}`}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className={`font-serif text-lg ${t.text}`}>{ed.school}</h3>
                        <span className={`text-[11px] font-mono tracking-wider ${t.gold}`}>{ed.date}</span>
                      </div>
                      <p className={`text-[11px] tracking-[0.15em] font-mono uppercase mt-1 mb-2 ${t.sub}`}>{ed.detail}</p>
                      <p className={`text-sm ${t.text}`}>{ed.note}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Resume;
