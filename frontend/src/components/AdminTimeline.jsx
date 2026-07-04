import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Clock, Rocket, Award, Sparkles, Building2, Briefcase, GraduationCap, HeartPulse, Wrench } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { api } from '../api';

const ICON_OPTIONS = ['Rocket', 'Building2', 'Briefcase', 'GraduationCap', 'HeartPulse', 'Wrench', 'Award', 'Sparkles'];

const iconMap = { Rocket, Award, Sparkles, Clock };

const ToggleSwitch = ({ checked, onChange }) => (
  <button type="button" onClick={() => onChange(!checked)}
    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${checked ? 'bg-[#D4AF37]' : 'bg-white/10'}`}>
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);

const AdminTimeline = ({ darkMode }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({
    type: 'milestone', year: '', title: '', company: '', desc: '',
    icon: 'Award', position: 'top', milestoneType: 'career',
    place: '', status: 'Declined', sortOrder: 0
  });

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) { navigate('/admin/login'); return; }
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try { const d = await api('/api/timeline/admin'); setItems(d); } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = editing ? `/api/timeline/${editing._id}` : '/api/timeline';
      await api(endpoint, { method: editing ? 'PUT' : 'POST', body: JSON.stringify(form) });
      resetForm(); fetchItems();
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this timeline item?')) return;
    try { await api(`/api/timeline/${id}`, { method: 'DELETE' }); fetchItems(); } catch (e) { console.error(e); }
  };

  const startEdit = (item) => { setEditing(item); setForm(item); setShowForm(true); };

  const resetForm = () => {
    setShowForm(false); setEditing(null);
    setForm({ type: 'milestone', year: '', title: '', company: '', desc: '', icon: 'Award', position: 'top', milestoneType: 'career', place: '', status: 'Declined', sortOrder: 0 });
  };

  const filtered = filter === 'all' ? items : items.filter(i => i.type === filter);

  const getTypeColor = (item) => {
    if (item.type === 'scholarship') return '#D4AF37';
    return item.milestoneType === 'career' ? '#8D6E63' : '#2a5f7a';
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
              <h2 className="font-serif text-3xl text-white">Timeline</h2>
              <p className="font-mono text-xs mt-1 text-white/40">{items.length} items</p>
            </div>
            <button onClick={resetForm}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D4AF37] text-[#0d0705] font-mono text-sm hover:bg-[#D4AF37]/90 transition-all">
              <Plus size={18} /> New Item
            </button>
          </div>

          <div className="flex gap-2 mb-6">
            {['all', 'milestone', 'scholarship'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${filter === f ? 'bg-[#D4AF37] text-[#0d0705]' : 'bg-white/5 text-white/50 hover:text-white'}`}>
                {f === 'all' ? 'All' : f === 'milestone' ? 'Milestones' : 'Scholarships'}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-6 rounded-xl bg-[#1a1410] border border-white/10 overflow-hidden">
                <h3 className="font-serif text-xl text-white mb-6">{editing ? 'Edit' : 'New'} Timeline Item</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-white/40 font-mono text-xs uppercase tracking-wider mb-1">Type</label>
                      <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#D4AF37]/50 focus:outline-none transition-colors">
                        <option value="milestone">Milestone</option>
                        <option value="scholarship">Scholarship</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-white/40 font-mono text-xs uppercase tracking-wider mb-1">Year</label>
                      <input value={form.year} onChange={e => setForm({...form, year: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-white/40 font-mono text-xs uppercase tracking-wider mb-1">Sort Order</label>
                      <input type="number" value={form.sortOrder} onChange={e => setForm({...form, sortOrder: +e.target.value})}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                    </div>
                  </div>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Title"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" required />

                  {form.type === 'milestone' ? (
                    <>
                      <input value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="Company / Organization"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                      <textarea value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} placeholder="Description" rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-white/40 font-mono text-xs uppercase tracking-wider mb-1">Milestone Type</label>
                          <select value={form.milestoneType} onChange={e => setForm({...form, milestoneType: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#D4AF37]/50 focus:outline-none transition-colors">
                            <option value="career">Career</option>
                            <option value="skill">Skill</option>
                          </select>
                        </div>
                        <div className="flex-1">
                          <label className="block text-white/40 font-mono text-xs uppercase tracking-wider mb-1">Position</label>
                          <select value={form.position} onChange={e => setForm({...form, position: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#D4AF37]/50 focus:outline-none transition-colors">
                            <option value="top">Top</option>
                            <option value="bottom">Bottom</option>
                          </select>
                        </div>
                        <div className="flex-1">
                          <label className="block text-white/40 font-mono text-xs uppercase tracking-wider mb-1">Icon</label>
                          <select value={form.icon} onChange={e => setForm({...form, icon: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#D4AF37]/50 focus:outline-none transition-colors">
                            {ICON_OPTIONS.map(io => <option key={io} value={io}>{io}</option>)}
                          </select>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <input value={form.place} onChange={e => setForm({...form, place: e.target.value})} placeholder="Place / Country"
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                      <textarea value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} placeholder="Description" rows={3}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37]/50 focus:outline-none transition-colors" />
                      <div className="flex-1">
                        <label className="block text-white/40 font-mono text-xs uppercase tracking-wider mb-1">Status</label>
                        <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#D4AF37]/50 focus:outline-none transition-colors">
                          <option value="In Progress">In Progress</option>
                          <option value="Declined">Declined</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>
                    </>
                  )}

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
            {filtered.map(item => {
              const color = getTypeColor(item);
              const Icon = iconMap[item.icon] || Award;
              return (
                <motion.div key={item._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-xl bg-[#1a1410] border border-white/5 hover:border-white/10 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="font-serif text-lg text-white">{item.title}</h3>
                        <span className="text-white/30 font-mono text-xs">{item.year}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                          item.type === 'scholarship' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' :
                          item.milestoneType === 'career' ? 'bg-[#8D6E63]/20 text-[#8D6E63]' : 'bg-[#2a5f7a]/20 text-[#2a5f7a]'
                        }`}>{item.type}{item.type === 'milestone' ? ` · ${item.milestoneType}` : ''}</span>
                      </div>
                      <p className="text-white/40 text-sm">{item.desc?.slice(0, 100)}{item.desc?.length > 100 ? '...' : ''}</p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEdit(item)} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-all"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-all"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            {filtered.length === 0 && (
              <div className="text-center py-16 text-white/30">
                <Clock size={48} className="mx-auto mb-4 opacity-30" />
                <p className="font-mono text-sm">No timeline items</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminTimeline;
