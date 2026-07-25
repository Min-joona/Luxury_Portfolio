import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, CheckCircle } from 'lucide-react';
import projects from '../data/projectData';

const ProjectDetail = ({ darkMode }) => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-[#0d0705]' : 'bg-[#e8ddd4]'}`}>
        <div className="text-center">
          <p className={`text-xl mb-4 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>Project not found</p>
          <Link to="/#projects" className={`text-sm font-mono underline ${darkMode ? 'text-white/70' : 'text-[#1a1410]/70'}`}>
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0d0705]' : 'bg-[#e8ddd4]'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b backdrop-blur-xl ${
        darkMode ? 'bg-[#0d0705]/80 border-white/10' : 'bg-[#e8ddd4]/80 border-[#1a1410]/10'
      }`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/#projects" className={`flex items-center gap-2 text-sm font-mono transition-colors ${darkMode ? 'text-white/70 hover:text-white' : 'text-[#1a1410]/70 hover:text-[#1a1410]'}`}>
            <ArrowLeft size={18} />
            Back to Projects
          </Link>
          <div className="flex items-center gap-4">
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-sm font-mono transition-colors ${darkMode ? 'text-white/70 hover:text-white' : 'text-[#1a1410]/70 hover:text-[#1a1410]'}`}>
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-sm font-mono transition-colors ${darkMode ? 'text-white/70 hover:text-white' : 'text-[#1a1410]/70 hover:text-[#1a1410]'}`}>
              <Github size={16} />
              Star on GitHub
            </a>
          </div>
        </div>
      </nav>

      <article className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-8">
              <img src={project.images?.[0] || project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0705]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-wider mb-3 ${darkMode ? 'bg-white/10 text-white' : 'bg-[#1a1410]/10 text-[#1a1410]'}`}>
                  {project.category}
                </span>
                <h1 className="font-serif text-4xl lg:text-5xl text-white">{project.title}</h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              {project.client && (
                <div className={`flex items-center gap-2 ${darkMode ? 'text-white/60' : 'text-[#1a1410]/60'}`}>
                  <span className="text-xs font-mono uppercase tracking-wider">Client:</span>
                  <span className={`font-mono ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>{project.client}</span>
                </div>
              )}
              <div className={`flex items-center gap-2 ${darkMode ? 'text-white/60' : 'text-[#1a1410]/60'}`}>
                <Calendar size={14} />
                <span className="font-mono">{project.date}</span>
              </div>
              <div className={`flex items-center gap-2 ${darkMode ? 'text-white/60' : 'text-[#1a1410]/60'}`}>
                <Clock size={14} />
                <span className="font-mono">{project.duration}</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className={`font-serif text-2xl mb-4 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>Overview</h2>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-white/70' : 'text-[#1a1410]/70'}`}>{project.overview}</p>
              </motion.section>

              {/* Challenge */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className={`font-serif text-2xl mb-4 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>The Challenge</h2>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-white/70' : 'text-[#1a1410]/70'}`}>{project.challenge}</p>
              </motion.section>

              {/* Outcome */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className={`font-serif text-2xl mb-4 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>The Outcome</h2>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-white/70' : 'text-[#1a1410]/70'}`}>{project.outcome}</p>
              </motion.section>

              {/* Features */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className={`font-serif text-2xl mb-4 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle size={16} className="mt-0.5 text-[#D4AF37]" />
                      <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#1a1410]/70'}`}>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Tech Stack */}
              <div className={`p-6 rounded-xl border ${darkMode ? 'bg-[#1a1410]/50 border-white/10' : 'bg-white border-[#1a1410]/10'}`}>
                <h3 className={`font-serif text-lg mb-4 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className={`px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-wider border ${darkMode ? 'border-white/10 text-white/80 bg-white/5' : 'border-[#1a1410]/10 text-[#1a1410]/80 bg-[#1a1410]/5'}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className={`p-6 rounded-xl border ${darkMode ? 'bg-[#1a1410]/50 border-white/10' : 'bg-white border-[#1a1410]/10'}`}>
                <h3 className={`font-serif text-lg mb-4 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>Links</h3>
                <div className="space-y-3">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 text-sm font-mono transition-colors ${darkMode ? 'text-white/70 hover:text-white' : 'text-[#1a1410]/70 hover:text-[#1a1410]'}`}>
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 text-sm font-mono transition-colors ${darkMode ? 'text-white/70 hover:text-white' : 'text-[#1a1410]/70 hover:text-[#1a1410]'}`}>
                    ⭐ <Github size={16} />
                    Star on GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProjectDetail;