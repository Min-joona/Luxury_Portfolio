import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Upload, Palette, Image as ImageIcon } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { api, uploadImage } from '../api';

const ToggleSwitch = ({ checked, onChange }) => (
  <button type="button" onClick={() => onChange(!checked)}
    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${checked ? 'bg-[#D4AF37]' : 'bg-white/10'}`}>
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);

const AdminDesigns = ({ darkMode }) => {
  const navigate = useNavigate();
  const fileRef = useRef();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: '', category: '', images: [], link: '', published: true });

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) { navigate('/admin/login'); return; }
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try { const d = await api('/api/admin/designs'); setDesigns(d); } catch (e) { console.error(e); }
    setLoading(false);
  };

  const uploadToCloudinary = async (file) => {
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm(f => ({ ...f, images: [...f.images, url] }));
    } catch (e) { console.error('Upload failed', e); alert('Image upload failed: ' + e.message); }
    setUploading(false);
  };

  const removeImage = (index) => {
    setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.images.length === 0) { alert('Add at least one image'); return; }
    try {
      const endpoint = editing ? `/api/admin/designs/${editing._id}` : '/api/admin/designs';
      await api(endpoint, { method: editing ? 'PUT' : 'POST', body: JSON.stringify(form) });
      resetForm(); fetchDesigns();
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this design?')) return;
    try { await api(`/api/admin/designs/${id}`, { method: 'DELETE' }); fetchDesigns(); } catch (e) { console.error(e); }
  };

  const openNewForm = () => { setForm({ title: '', category: '', images: [], link: '', published: true }); setEditing(null); setShowForm(true); };
  const startEdit = (d) => {
    setEditing(d);
    setForm({ ...d, images: d.images && d.images.length ? d.images : (d.image ? [d.image] : []) });
    setShowForm(true);
  };
  const resetForm = () => { setShowForm(false); setEditing(null); setForm({ title: '', category: '', images: [], link: '', published: true }); };

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
              <h2 className="font-serif text-3xl text-white">Designs</h2>
              <p className="font-mono text-xs mt-1 text-white/40">{designs.length} designs</p>
            </div>
            <button onClick={openNewForm}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D4AF37] text-[#0d0705] font-mono text-sm hover:bg-[#D4AF37]/90 transition-all">
              <Plus size={18} /> New Design
            </button>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-6 rounded-xl bg-[#1a1410] border border-white/10 overflow-hidden">
                <h3 className="font-serif text-xl text-white mb-6">{editing ? 'Edit' : 'New'} Design</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" required />
                  <input placeholder="Category (e.g. Branding, UI/UX)" value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" required />

                  <div>
                    <label className="block text-white/50 font-mono text-xs uppercase tracking-wider mb-2">Images</label>
                    <div className="flex flex-wrap gap-3 mb-3">
                      {form.images.map((url, i) => (
                        <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/10 group">
                          <img src={url} alt="" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => removeImage(i)}
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <X size={12} />
                          </button>
                          {i === 0 && <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-[#D4AF37] text-[8px] font-mono text-[#0d0705]">Cover</span>}
                        </div>
                      ))}
                      <button type="button" onClick={() => fileRef.current.click()} disabled={uploading}
                        className="w-24 h-24 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center hover:border-white/30 transition-all text-white/30 hover:text-white/60">
                        {uploading ? <div className="w-5 h-5 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" /> : <Upload size={20} />}
                      </button>
                    </div>
                    <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={e => e.target.files[0] && uploadToCloudinary(e.target.files[0])} />
                  </div>

                  <input placeholder="Figma Link (optional)" value={form.link} onChange={e => setForm({...form, link: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {designs.map(d => (
              <motion.div key={d._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-[#1a1410] border border-white/5 hover:border-white/10 transition-all group">
                <div className="relative">
                  <img src={d.images?.[0] || d.image} alt={d.title} className="w-full aspect-[4/3] rounded-lg object-cover mb-3" />
                  {(d.images?.length || (d.image ? 1 : 0)) > 1 && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white/80 text-[9px] font-mono">
                      {(d.images?.length || (d.image ? 1 : 0))} images
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-white">{d.title}</h3>
                    <p className="text-white/40 text-xs font-mono">{d.category}</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(d)} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-all"><Edit2 size={14} /></button>
                    <button onClick={() => handleDelete(d._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-all"><Trash2 size={14} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {designs.length === 0 && (
            <div className="text-center py-16 text-white/30">
              <Palette size={48} className="mx-auto mb-4 opacity-30" />
              <p className="font-mono text-sm">No designs yet</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDesigns;
