import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Upload, Eye, FolderKanban } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { api, uploadImage } from '../api';

const ToggleSwitch = ({ checked, onChange }) => (
  <button type="button" onClick={() => onChange(!checked)}
    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${checked ? 'bg-[#D4AF37]' : 'bg-white/10'}`}>
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);

const AdminProjects = ({ darkMode }) => {
  const navigate = useNavigate();
  const fileRef = useRef();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    slug: '', title: '', category: '', image: '', demo: '', github: '',
    overview: '', challenge: '', outcome: '', tech: '', features: '', client: '', duration: '', published: true
  });

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) { navigate('/admin/login'); return; }
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try { const d = await api('/api/admin/projects'); setProjects(d); } catch (e) { console.error(e); }
    setLoading(false);
  };

  const uploadToCloudinary = async (file) => {
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm(f => ({ ...f, image: url }));
    } catch (e) { console.error('Upload failed', e); alert('Image upload failed: ' + e.message); }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, tech: form.tech.split(',').map(t => t.trim()).filter(Boolean), features: form.features.split('\n').map(f => f.trim()).filter(Boolean) };
    try {
      const endpoint = editing ? `/api/admin/projects/${editing._id}` : '/api/admin/projects';
      await api(endpoint, { method: editing ? 'PUT' : 'POST', body: JSON.stringify(payload) });
      resetForm(); fetchProjects();
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try { await api(`/api/admin/projects/${id}`, { method: 'DELETE' }); fetchProjects(); } catch (e) { console.error(e); }
  };

  const startEdit = (p) => {
    setEditing(p);
    setForm({ ...p, tech: p.tech?.join(', ') || '', features: p.features?.join('\n') || '' });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false); setEditing(null);
    setForm({ slug: '', title: '', category: '', image: '', demo: '', github: '', overview: '', challenge: '', outcome: '', tech: '', features: '', client: '', duration: '', published: true });
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0d0705] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d0705] flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-3xl text-white">Projects</h2>
              <p className="font-mono text-xs mt-1 text-white/40">{projects.length} projects</p>
            </div>
            <button onClick={resetForm}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D4AF37] text-[#0d0705] font-mono text-sm hover:bg-[#D4AF37]/90 transition-all">
              <Plus size={18} /> New Project
            </button>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-6 rounded-xl bg-[#1a1410] border border-white/10 overflow-hidden">
                <h3 className="font-serif text-xl text-white mb-6">{editing ? 'Edit' : 'New'} Project</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                      className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" required />
                    <input placeholder="Slug" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})}
                      className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                      className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" required />
                    <input placeholder="Duration (e.g. 3 Months)" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})}
                      className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                  </div>
                  <div className="flex gap-4">
                    <input placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})}
                      className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                    <button type="button" onClick={() => fileRef.current.click()} disabled={uploading}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all">
                      <Upload size={16} /> {uploading ? '...' : 'Upload'}
                    </button>
                  </div>
                  <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={e => e.target.files[0] && uploadToCloudinary(e.target.files[0])} />
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Demo URL" value={form.demo} onChange={e => setForm({...form, demo: e.target.value})}
                      className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                    <input placeholder="GitHub URL" value={form.github} onChange={e => setForm({...form, github: e.target.value})}
                      className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Client" value={form.client} onChange={e => setForm({...form, client: e.target.value})}
                      className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                    <input placeholder="Tech Stack (comma separated)" value={form.tech} onChange={e => setForm({...form, tech: e.target.value})}
                      className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                  </div>
                  <textarea placeholder="Overview" value={form.overview} onChange={e => setForm({...form, overview: e.target.value})} rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                  <textarea placeholder="Challenge" value={form.challenge} onChange={e => setForm({...form, challenge: e.target.value})} rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                  <textarea placeholder="Outcome" value={form.outcome} onChange={e => setForm({...form, outcome: e.target.value})} rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                  <textarea placeholder="Features (one per line)" value={form.features} onChange={e => setForm({...form, features: e.target.value})} rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-sm placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-white/50 font-mono text-xs uppercase tracking-wider">Published</span>
                    <ToggleSwitch checked={form.published} onChange={v => setForm({...form, published: v})} />
                  </div>
                  <div className="flex gap-4 pt-2">
                    <button type="submit"
                      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#D4AF37] text-[#0d0705] font-mono text-sm hover:bg-[#D4AF37]/90 transition-all">
                      <Save size={18} /> {editing ? 'Update' : 'Create'}
                    </button>
                    <button type="button" onClick={resetForm}
                      className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-white/70 hover:text-white transition-all">
                      <X size={18} /> Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-3">
            {projects.map(p => (
              <motion.div key={p._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-xl bg-[#1a1410] border border-white/5 flex items-center gap-4 hover:border-white/10 transition-all group">
                <img src={p.image} alt={p.title} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-lg text-white truncate">{p.title}</h3>
                    <button onClick={() => {
                      const newVal = !p.published;
                      api(`/api/admin/projects/${p._id}`, { method: 'PUT', body: JSON.stringify({ published: newVal }) }).then(fetchProjects);
                    }}><ToggleSwitch checked={p.published} onChange={() => {}} /></button>
                  </div>
                  <p className="text-white/40 text-sm font-mono truncate">{p.category} · {p.slug}</p>
                </div>
                <div className="flex items-center gap-3 text-white/30">
                  {p.views ? <span className="flex items-center gap-1 text-xs"><Eye size={14} />{p.views}</span> : null}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(p)} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-all"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(p._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-all"><Trash2 size={16} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
            {projects.length === 0 && (
              <div className="text-center py-16 text-white/30">
                <FolderKanban size={48} className="mx-auto mb-4 opacity-30" />
                <p className="font-mono text-sm">No projects yet</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminProjects;
