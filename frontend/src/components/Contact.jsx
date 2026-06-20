import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Twitter, Send, Phone } from 'lucide-react';
import API_URL from '../api';

const Contact = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error(error);
      alert('Failed to send message. Please try again later.');
    }
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/Min-joona/" },
    { icon: Linkedin, href: "http://www.linkedin.com/in/amar-mohammednur-01aa32343" },
    { icon: Twitter, href: "https://x.com/AmarHassen32" }
  ];

  return (
    <section id="contact" className="py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Side: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className={`text-[10px] tracking-[0.3em] font-mono uppercase mb-4 block ${
              darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
            }`}>
              Get In Touch
            </span>
            <h2 className={`font-serif text-5xl lg:text-6xl mb-6 ${
              darkMode ? 'text-white' : 'text-[#1a1410]'
            }`}>
              Contact
            </h2>
            <p className={`text-sm leading-relaxed mb-12 max-w-md font-mono ${
              darkMode ? 'text-white/60' : 'text-[#1a1410]/60'
            }`}>
              Open to discussing new projects, creative ideas, or opportunities to be part of your visions. Let's create something extraordinary together.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${
                  darkMode ? 'border-white/20' : 'border-[#1a1410]/20'
                }`}>
                  <Mail size={16} className={darkMode ? 'text-white' : 'text-[#1a1410]'} />
                </div>
                <span className={`font-mono text-sm ${
                  darkMode ? 'text-white' : 'text-[#1a1410]'
                }`}>
                  amarshisheno@gmail.com
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${
                  darkMode ? 'border-white/20' : 'border-[#1a1410]/20'
                }`}>
                  <Phone size={16} className={darkMode ? 'text-white' : 'text-[#1a1410]'} />
                </div>
                <span className={`font-mono text-sm ${
                  darkMode ? 'text-white/70' : 'text-[#1a1410]/70'
                }`}>
                  +251 93 368 0059
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${
                  darkMode ? 'border-white/20' : 'border-[#1a1410]/20'
                }`}>
                  <MapPin size={16} className={darkMode ? 'text-white' : 'text-[#1a1410]'} />
                </div>
                <span className={`font-mono text-sm ${
                  darkMode ? 'text-white/70' : 'text-[#1a1410]/70'
                }`}>
                  Girar Condominium, Addis Ababa, Ethiopia
                </span>
              </div>
            </div>

            {/* Social Links - all platforms */}
            <div className="flex gap-3 flex-wrap">
              <a href="https://github.com/Min-joona/" className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${
                darkMode ? 'border-white/20 text-white hover:bg-white hover:text-[#1a1410]' : 'border-[#1a1410]/20 text-[#1a1410] hover:bg-[#1a1410] hover:text-white'
              }`}>
                <Github size={16} />
              </a>
              <a href="http://www.linkedin.com/in/amar-mohammednur-01aa32343" className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${
                darkMode ? 'border-white/20 text-white hover:bg-white hover:text-[#1a1410]' : 'border-[#1a1410]/20 text-[#1a1410] hover:bg-[#1a1410] hover:text-white'
              }`}>
                <Linkedin size={16} />
              </a>
              <a href="https://x.com/AmarHassen32" className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${
                darkMode ? 'border-white/20 text-white hover:bg-white hover:text-[#1a1410]' : 'border-[#1a1410]/20 text-[#1a1410] hover:bg-[#1a1410] hover:text-white'
              }`}>
                <Twitter size={16} />
              </a>
              <a href="https://t.me/kimsabu32" className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${
                darkMode ? 'border-white/20 text-white hover:bg-white hover:text-[#1a1410]' : 'border-[#1a1410]/20 text-[#1a1410] hover:bg-[#1a1410] hover:text-white'
              }`}>
                <Send size={16} />
              </a>
              <a href="https://www.instagram.com/gimsabu32" className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${
                darkMode ? 'border-white/20 text-white hover:bg-white hover:text-[#1a1410]' : 'border-[#1a1410]/20 text-[#1a1410] hover:bg-[#1a1410] hover:text-white'
              }`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://medium.com/@amarshisheno" className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${
                darkMode ? 'border-white/20 text-white hover:bg-white hover:text-[#1a1410]' : 'border-[#1a1410]/20 text-[#1a1410] hover:bg-[#1a1410] hover:text-white'
              }`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.794 4.728-11.794h6.633v.403l-1.916 1.837c-.165.126-.247.345-.213.538v13.5c-.034.193.048.411.213.537l1.871 1.837v.403h-9.41v-.403l1.939-1.882c.19-.19.19-.246.19-.537v-10.91l-5.389 13.688h-.728l-6.275-13.688v9.174c-.052.385.076.774.347 1.052l2.521 3.06v.404h-7.148v-.404l2.521-3.06c.27-.279.39-.67.325-1.052v-10.608z"/></svg>
              </a>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <div>
                <label className={`text-[10px] tracking-[0.2em] font-mono uppercase mb-3 block ${
                  darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
                }`}>
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className={`w-full bg-transparent border-b pb-3 text-sm font-mono focus:outline-none transition-colors placeholder:opacity-40 ${
                    darkMode 
                      ? 'border-white/20 text-white focus:border-white/40 placeholder:text-white' 
                      : 'border-[#1a1410]/20 text-[#1a1410] focus:border-[#1a1410]/40 placeholder:text-[#1a1410]'
                  }`}
                />
              </div>

              {/* Email Field */}
              <div>
                <label className={`text-[10px] tracking-[0.2em] font-mono uppercase mb-3 block ${
                  darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
                }`}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className={`w-full bg-transparent border-b pb-3 text-sm font-mono focus:outline-none transition-colors placeholder:opacity-40 ${
                    darkMode 
                      ? 'border-white/20 text-white focus:border-white/40 placeholder:text-white' 
                      : 'border-[#1a1410]/20 text-[#1a1410] focus:border-[#1a1410]/40 placeholder:text-[#1a1410]'
                  }`}
                />
              </div>

              {/* Message Field */}
              <div>
                <label className={`text-[10px] tracking-[0.2em] font-mono uppercase mb-3 block ${
                  darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
                }`}>
                  Message
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  rows="4"
                  className={`w-full bg-transparent border-b pb-3 text-sm font-mono focus:outline-none transition-colors resize-none placeholder:opacity-40 ${
                    darkMode 
                      ? 'border-white/20 text-white focus:border-white/40 placeholder:text-white' 
                      : 'border-[#1a1410]/20 text-[#1a1410] focus:border-[#1a1410]/40 placeholder:text-[#1a1410]'
                  }`}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full py-4 font-mono text-[11px] tracking-[0.2em] border transition-all duration-300 ${
                  darkMode 
                    ? 'border-white/20 text-white hover:bg-white hover:text-[#1a1410]' 
                    : 'border-[#1a1410]/20 text-[#1a1410] hover:bg-[#1a1410] hover:text-white'
                }`}
              >
                SEND MESSAGE
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
