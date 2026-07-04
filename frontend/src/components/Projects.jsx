import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../api';

const Projects = ({ darkMode }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api('/api/projects');
        setProjects(data);
      } catch (err) {
        setError(err.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
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
              Loading projects...
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className={`aspect-[4/3] rounded-xl mb-6 ${
                  darkMode ? 'bg-[#2a2018]' : 'bg-[#e0d5cc]'
                }`} />
                <div className={`h-3 w-1/3 rounded mb-2 ${
                  darkMode ? 'bg-white/10' : 'bg-[#1a1410]/10'
                }`} />
                <div className={`h-5 w-2/3 rounded mb-2 ${
                  darkMode ? 'bg-white/10' : 'bg-[#1a1410]/10'
                }`} />
                <div className={`h-3 w-full rounded ${
                  darkMode ? 'bg-white/10' : 'bg-[#1a1410]/10'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
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
              Something went wrong loading projects. Please try again later.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
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
              No projects to display yet. Check back soon.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

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
            A collection of MERN Stack applications, from gamified learning to real-time chat. Click any project for a full case study.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/projects/${project.slug}`} className="group block">
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
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#1a1410]/0 group-hover:bg-[#1a1410]/40 transition-colors duration-300 flex items-center justify-center">
                    <span className={`px-4 py-2 rounded-full text-[10px] font-mono tracking-wider border backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      darkMode ? 'border-white/30 text-white bg-white/10' : 'border-white/30 text-white bg-black/20'
                    }`}>
                      View Case Study
                    </span>
                  </div>
                  
                  {/* Demo Badge */}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-[9px] font-mono tracking-wider border backdrop-blur-md flex items-center gap-1.5 transition-all hover:scale-105 ${
                        darkMode ? 'border-white/20 text-white bg-white/10' : 'border-[#1a1410]/20 text-[#1a1410] bg-white/80'
                      }`}
                    >
                      <ExternalLink size={10} />
                      Live Demo
                    </a>
                  )}
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
                  <p className={`text-xs font-mono leading-relaxed line-clamp-2 ${
                    darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
                  }`}>
                    {project.overview}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map((t, i) => (
                    <span key={i} className={`px-2 py-0.5 rounded text-[9px] font-mono ${
                      darkMode ? 'bg-white/5 text-white/50' : 'bg-[#1a1410]/5 text-[#1a1410]/50'
                    }`}>
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono ${
                      darkMode ? 'bg-white/5 text-white/40' : 'bg-[#1a1410]/5 text-[#1a1410]/40'
                    }`}>
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Bottom Line */}
                <div className={`mt-4 h-px w-full ${
                  darkMode ? 'bg-white/20' : 'bg-[#1a1410]/20'
                }`} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
