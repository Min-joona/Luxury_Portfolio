import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, ArrowLeft, Save, X, Upload } from 'lucide-react';
import { api } from '../api';

const CLOUD_NAME = 'dxvvpresa';
const UPLOAD_PRESET = 'portfolio_uploads';

const AdminDesigns = ({ darkMode }) => {
  const navigate = useNavigate();
  const fileRef = useRef();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: '', category: '', image: '', link: '' });

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) navigate('/admin/login');
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try { const d = await api('/api/admin/designs'); setDesigns(d); setLoading(false); }
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
    try {
      const endpoint = editing ? `/api/admin/designs/${editing._id}` : '/api/admin/designs';
      const method = editing ? 'PUT' : 'POST';
      await api(endpoint, { method, body: JSON.stringify(form) });
      resetForm();
      fetchDesigns();
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this design?')) return;
    try { await api(`/api/admin/designs/${id}`, { method: 'DELETE' }); fetchDesigns(); }
    catch (e) { console.error(e); }
  };

  const startEdit = (d) => { setEditing(d); setForm(d); setShowForm(true); };
  const resetForm = () => { setShowForm(false); setEditing(null); setForm({ title: '', category: '', image: '', link: '' }); };

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
              <h2 className={`font-serif text-3xl ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>Manage Designs</h2>
            </div>
            <button onClick={resetForm} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm ${darkMode ? 'bg-white text-[#1a1410]' : 'bg-[#1a1410] text-white'}`}>
              <Plus size={18} /> Add Design
            </button>
          </div>

          {showForm && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className={`mb-8 p-6 rounded-xl border ${darkMode ? 'bg-[#1a1410]/50 border-white/10' : 'bg-white border-[#1a1410]/10'}`}>
              <h3 className={`font-serif text-xl mb-6 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>{editing ? 'Edit' : 'New'} Design</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={`w-full px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} required />
                <input placeholder="Category (e.g. Product Design, UI/UX)" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className={`w-full px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} required />

                <div className="flex gap-4">
                  <input placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className={`flex-1 px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} />
                  <button type="button" onClick={() => fileRef.current.click()} disabled={uploading} className={`flex items-center gap-2 px-4 py-3 rounded-lg font-mono text-sm border ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`}>
                    <Upload size={16} /> {uploading ? '...' : 'Upload'}
                  </button>
                </div>
                <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={e => e.target.files[0] && uploadToCloudinary(e.target.files[0])} />

                <input placeholder="Figma Link (optional)" value={form.link} onChange={e => setForm({...form, link: e.target.value})} className={`w-full px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} />

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {designs.map(d => (
              <div key={d._id} className={`p-4 rounded-xl border ${darkMode ? 'bg-[#1a1410]/50 border-white/10' : 'bg-white border-[#1a1410]/10'}`}>
                <img src={d.image} alt={d.title} className="w-full aspect-[4/3] rounded-lg object-cover mb-3" />
                <h3 className={`font-serif text-lg mb-1 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>{d.title}</h3>
                <p className={`text-xs font-mono mb-3 ${darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}`}>{d.category}</p>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(d)} className={`px-3 py-1.5 rounded-lg text-xs font-mono ${darkMode ? 'text-white/60 hover:bg-white/10' : 'text-[#1a1410]/60 hover:bg-[#1a1410]/10'}`}>
                    <Edit2 size={14} className="inline mr-1" /> Edit
                  </button>
                  <button onClick={() => handleDelete(d._id)} className="px-3 py-1.5 rounded-lg text-xs font-mono text-red-400 hover:bg-red-500/10">
                    <Trash2 size={14} className="inline mr-1" /> Delete
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

export default AdminDesigns;
