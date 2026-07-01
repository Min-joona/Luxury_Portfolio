import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "Prime Pair Academy",
    category: "Gamified Learning Platform",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
    link: "https://github.com/Min-joona/prime-pair-academy",
    desc: "Khan-Academy-meets-Duolingo MERN platform with two original mascots (Ghefi & Lethe), XP/streaks, interactive quizzes, flashcards, scholarships and opportunities."
  },
  {
    title: "Eritrea Learn Academy",
    category: "Education / E-Learning",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    link: "https://github.com/Min-joona/eritrea-academy",
    desc: "Teach English, computer skills, and world languages in Tigrigna/English/Arabic. Placement tests, reading/listening/practice lessons, exams, and a live-WPM typing course."
  },
  {
    title: "Lumière E-Commerce Platform",
    category: "Full Stack E-Commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    link: "https://github.com/Min-joona/amar-ecommerce",
    desc: "Complete MERN store: product catalog with search/filter/sort, cart, JWT auth, checkout, order history, reviews, and an admin dashboard."
  },
  {
    title: "Pulse Analytics Dashboard",
    category: "Analytics Platform",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    link: "https://github.com/Min-joona/amar-analytics",
    desc: "MERN dashboard with KPI deltas, revenue trends, breakdowns and a live activity feed — powered by MongoDB aggregation pipelines and Recharts."
  },
  {
    title: "Ripple Real-Time Chat",
    category: "Real-Time / WebSockets",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop",
    link: "https://github.com/Min-joona/realtime-chat",
    desc: "Socket.io group chat with channels, online presence, and typing indicators. JWT-authenticated sockets and persisted message history."
  },
  {
    title: "TaskFlow Kanban Board",
    category: "Productivity / Project Management",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    link: "https://github.com/Min-joona/kanban-board",
    desc: "Trello-style MERN board with drag-and-drop cards and lists, labels, multiple boards, and debounced auto-save to MongoDB."
  },
  {
    title: "NESAB Vehicle Oil System",
    category: "Full Stack Web Application",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    link: "https://github.com/Min-joona",
    desc: "Leading development of responsive web tools for vehicle oil management with complex database architecture and optimized performance."
  },
  {
    title: "JPII Institute Portal",
    category: "Educational Platform",
    image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=600&fit=crop",
    link: "https://github.com/Min-joona",
    desc: "Assisted development team integrating complex databases and optimizing site performance for the TVET institute web project."
  }
];

const Projects = ({ darkMode }) => {
  return (
    <section id="projects" className="py-24 px-6 lg:px-12">
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
            Selected Work
          </span>
          <h2 className={`font-serif text-5xl lg:text-6xl mb-6 ${
            darkMode ? 'text-white' : 'text-[#1a1410]'
          }`}>
            Projects
          </h2>
          <p className={`text-sm max-w-lg font-mono ${
            darkMode ? 'text-white/60' : 'text-[#1a1410]/60'
          }`}>
            A collection of projects demonstrating MERN Stack development, database management, and responsive web design expertise. Winner of Gold Medal in academic excellence.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                {/* Image Container */}
                <div className={`relative aspect-[4/3] rounded-xl overflow-hidden mb-6 ${
                  darkMode ? 'bg-[#2a2018]' : 'bg-[#e0d5cc]'
                }`}>
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Hover Arrow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center"
                  >
                    <ArrowUpRight size={18} className="text-[#1a1410]" />
                  </motion.div>
                </div>

                {/* Content */}
                <div>
                  <span className={`text-[10px] tracking-[0.2em] font-mono uppercase mb-2 block ${
                    darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
                  }`}>
                    {project.category}
                  </span>
                  <div className="flex items-start justify-between">
                    <h3 className={`font-serif text-xl mb-2 ${
                      darkMode ? 'text-white' : 'text-[#1a1410]'
                    }`}>
                      {project.title}
                    </h3>
                    <ArrowUpRight 
                      size={18} 
                      className={`mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                        darkMode ? 'text-white' : 'text-[#1a1410]'
                      }`}
                    />
                  </div>
                  {project.desc && (
                    <p className={`text-xs font-mono leading-relaxed ${
                      darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
                    }`}>
                      {project.desc}
                    </p>
                  )}
                </div>

                {/* Bottom Line */}
                <div className={`mt-4 h-px w-full ${
                  darkMode ? 'bg-white/20' : 'bg-[#1a1410]/20'
                }`} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
