import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, ArrowLeft, Save, X, Upload, Github, ExternalLink } from 'lucide-react';
import { api } from '../api';

const CLOUD_NAME = 'dxvvpresa';
const UPLOAD_PRESET = 'portfolio_uploads';

const AdminProjects = ({ darkMode }) => {
  const navigate = useNavigate();
  const fileRef = useRef();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    slug: '', title: '', category: '', image: '', demo: '', github: '',
    overview: '', challenge: '', outcome: '', tech: '', features: '', client: '', duration: ''
  });

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) navigate('/admin/login');
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try { const d = await api('/api/admin/projects'); setProjects(d); setLoading(false); }
    catch (e) { console.error(e); setLoading(false); }
  };

  const uploadToCloudinary = async (file) => {
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', UPLOAD_PRESET);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: 'POST', body: fd });
      const data = await res.json();
      setForm(f => ({ ...f, image: data.secure_url }));
    } catch (e) { console.error('Upload failed', e); }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, tech: form.tech.split(',').map(t => t.trim()), features: form.features.split('\n').map(f => f.trim()).filter(Boolean) };
    try {
      const endpoint = editing ? `/api/admin/projects/${editing._id}` : '/api/admin/projects';
      const method = editing ? 'PUT' : 'POST';
      await api(endpoint, { method, body: JSON.stringify(payload) });
      resetForm();
      fetchProjects();
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try { await api(`/api/admin/projects/${id}`, { method: 'DELETE' }); fetchProjects(); }
    catch (e) { console.error(e); }
  };

  const startEdit = (p) => {
    setEditing(p);
    setForm({ ...p, tech: p.tech?.join(', ') || '', features: p.features?.join('\n') || '' });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm({ slug: '', title: '', category: '', image: '', demo: '', github: '', overview: '', challenge: '', outcome: '', tech: '', features: '', client: '', duration: '' });
  };

  if (loading) return <div className={`ml-64 p-8 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>Loading...</div>;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0d0705]' : 'bg-[#e8ddd4]'}`}>
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin" className={darkMode ? 'text-white/60 hover:text-white' : 'text-[#1a1410]/60 hover:text-[#1a1410]'}>
                <ArrowLeft size={24} />
              </Link>
              <h2 className={`font-serif text-3xl ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>Manage Projects</h2>
            </div>
            <button onClick={resetForm} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm ${darkMode ? 'bg-white text-[#1a1410]' : 'bg-[#1a1410] text-white'}`}>
              <Plus size={18} /> Add Project
            </button>
          </div>

          {showForm && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className={`mb-8 p-6 rounded-xl border ${darkMode ? 'bg-[#1a1410]/50 border-white/10' : 'bg-white border-[#1a1410]/10'}`}>
              <h3 className={`font-serif text-xl mb-6 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>{editing ? 'Edit' : 'New'} Project</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={`px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} required />
                  <input placeholder="Slug" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className={`px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className={`px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} required />
                  <input placeholder="Duration (e.g. 3 Months)" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} className={`px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} />
                </div>

                <div>
                  <div className="flex gap-4 mb-2">
                    <input placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className={`flex-1 px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} />
                    <button type="button" onClick={() => fileRef.current.click()} disabled={uploading} className={`flex items-center gap-2 px-4 py-3 rounded-lg font-mono text-sm border ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`}>
                      <Upload size={16} /> {uploading ? '...' : 'Upload'}
                    </button>
                  </div>
                  <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={e => e.target.files[0] && uploadToCloudinary(e.target.files[0])} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Demo URL" value={form.demo} onChange={e => setForm({...form, demo: e.target.value})} className={`px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} />
                  <input placeholder="GitHub URL" value={form.github} onChange={e => setForm({...form, github: e.target.value})} className={`px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Client" value={form.client} onChange={e => setForm({...form, client: e.target.value})} className={`px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} />
                  <input placeholder="Tech Stack (comma separated)" value={form.tech} onChange={e => setForm({...form, tech: e.target.value})} className={`px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} />
                </div>

                <textarea placeholder="Overview" value={form.overview} onChange={e => setForm({...form, overview: e.target.value})} rows={3} className={`w-full px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} />
                <textarea placeholder="Challenge" value={form.challenge} onChange={e => setForm({...form, challenge: e.target.value})} rows={3} className={`w-full px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} />
                <textarea placeholder="Outcome" value={form.outcome} onChange={e => setForm({...form, outcome: e.target.value})} rows={3} className={`w-full px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} />
                <textarea placeholder="Features (one per line)" value={form.features} onChange={e => setForm({...form, features: e.target.value})} rows={4} className={`w-full px-4 py-3 rounded-lg border bg-transparent font-mono text-sm ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} />

                <div className="flex gap-4">
                  <button type="submit" className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm ${darkMode ? 'bg-white text-[#1a1410]' : 'bg-[#1a1410] text-white'}`}>
                    <Save size={18} /> {editing ? 'Update' : 'Create'}
                  </button>
                  <button type="button" onClick={resetForm} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm border ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`}>
                    <X size={18} /> Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          <div className="space-y-4">
            {projects.map(p => (
              <div key={p._id} className={`p-6 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-[#1a1410]/50 border-white/10' : 'bg-white border-[#1a1410]/10'}`}>
                <div className="flex items-center gap-4">
                  <img src={p.image} alt={p.title} className="w-16 h-12 rounded-lg object-cover" />
                  <div>
                    <h3 className={`font-serif text-xl ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>{p.title}</h3>
                    <p className={`text-sm font-mono ${darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}`}>{p.category} · {p.slug}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(p)} className={`p-2 rounded-lg ${darkMode ? 'text-white/60 hover:bg-white/10' : 'text-[#1a1410]/60 hover:bg-[#1a1410]/10'}`}>
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;
