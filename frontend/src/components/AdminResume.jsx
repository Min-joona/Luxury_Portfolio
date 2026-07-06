import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2, FileUser } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { api } from '../api';

const EMPTY = {
  title: '', summary: '',
  contact: { email: '', phone: '', location: '', website: '' },
  photo: '/profile.png', pdfUrl: '/Amar-Hassen-Mohammednur-Resume.pdf',
  technical: [], medical: [], languages: [], leadership: [], experience: [], education: [],
};

const AdminResume = ({ darkMode }) => {
  const navigate = useNavigate();
  const [r, setR] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) { navigate('/admin/login'); return; }
    (async () => {
      try {
        const d = await api('/api/resume/admin');
        if (d && Object.keys(d).length) setR({ ...EMPTY, ...d, contact: { ...EMPTY.contact, ...(d.contact || {}) } });
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await api('/api/resume', { method: 'PUT', body: JSON.stringify(r) });
      setSaved(true); setTimeout(() => setSaved(false), 2500);
    } catch (e) { alert('Save failed: ' + e.message); }
    setSaving(false);
  };

  // helpers
  const set = (k, v) => setR(p => ({ ...p, [k]: v }));
  const setContact = (k, v) => setR(p => ({ ...p, contact: { ...p.contact, [k]: v } }));
  const setListField = (list, i, k, v) => setR(p => ({ ...p, [list]: p[list].map((it, idx) => idx === i ? { ...it, [k]: v } : it) }));
  const addItem = (list, item) => setR(p => ({ ...p, [list]: [...p[list], item] }));
  const removeItem = (list, i) => setR(p => ({ ...p, [list]: p[list].filter((_, idx) => idx !== i) }));

  // styles
  const input = 'w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50';
  const label = 'block text-[11px] font-mono uppercase tracking-wider text-white/40 mb-1.5';
  const card = 'bg-[#1a1410] border border-white/10 rounded-xl p-5';
  const btnAdd = 'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 transition-all';

  const Section = ({ title, children }) => (
    <div className={card}>
      <h2 className="font-serif text-xl text-white mb-4">{title}</h2>
      {children}
    </div>
  );

  // For string-array fields (technical/medical): edit as one-per-line textarea
  const StringList = ({ list }) => (
    <textarea
      className={input + ' font-mono'} rows={5}
      value={(r[list] || []).join('\n')}
      onChange={e => set(list, e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
      placeholder="One item per line"
    />
  );

  const EntryList = ({ list }) => (
    <div className="space-y-4">
      {(r[list] || []).map((it, i) => (
        <div key={i} className="border border-white/10 rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input className={input} placeholder="Title" value={it.title || ''} onChange={e => setListField(list, i, 'title', e.target.value)} />
            <input className={input} placeholder="Organisation" value={it.org || ''} onChange={e => setListField(list, i, 'org', e.target.value)} />
            <input className={input} placeholder="Date (e.g. 2024 — Present)" value={it.date || ''} onChange={e => setListField(list, i, 'date', e.target.value)} />
          </div>
          <textarea className={input} rows={4} placeholder="Bullet points — one per line"
            value={(it.points || []).join('\n')}
            onChange={e => setListField(list, i, 'points', e.target.value.split('\n').map(s => s.trim()).filter(Boolean))} />
          <button onClick={() => removeItem(list, i)} className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300"><Trash2 size={14} /> Remove</button>
        </div>
      ))}
      <button onClick={() => addItem(list, { title: '', org: '', date: '', points: [] })} className={btnAdd}><Plus size={14} /> Add entry</button>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-[#0d0705] ml-64 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d0705]">
      <AdminSidebar darkMode={darkMode} />
      <main className="ml-64 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* header */}
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-3xl text-white flex items-center gap-3"><FileUser className="text-[#D4AF37]" /> Résumé</h1>
            <button onClick={save} disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#D4AF37] text-[#1a1410] font-mono text-sm font-bold hover:bg-[#D4AF37]/90 transition-all disabled:opacity-50">
              <Save size={16} /> {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save Changes'}
            </button>
          </div>

          <Section title="Header">
            <div className="space-y-3">
              <div>
                <label className={label}>Title / subtitle</label>
                <input className={input} value={r.title} onChange={e => set('title', e.target.value)} />
              </div>
              <div>
                <label className={label}>Summary</label>
                <textarea className={input} rows={4} value={r.summary} onChange={e => set('summary', e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><label className={label}>Email</label><input className={input} value={r.contact.email} onChange={e => setContact('email', e.target.value)} /></div>
                <div><label className={label}>Phone</label><input className={input} value={r.contact.phone} onChange={e => setContact('phone', e.target.value)} /></div>
                <div><label className={label}>Location</label><input className={input} value={r.contact.location} onChange={e => setContact('location', e.target.value)} /></div>
                <div><label className={label}>Website</label><input className={input} value={r.contact.website} onChange={e => setContact('website', e.target.value)} /></div>
              </div>
            </div>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Section title="Technical Skills"><StringList list="technical" /></Section>
            <Section title="Medical Skills"><StringList list="medical" /></Section>
          </div>

          <Section title="Languages">
            <div className="space-y-3">
              {(r.languages || []).map((l, i) => (
                <div key={i} className="flex flex-wrap items-center gap-3">
                  <input className={input + ' flex-1 min-w-[120px]'} placeholder="Language" value={l.name || ''} onChange={e => setListField('languages', i, 'name', e.target.value)} />
                  <input className={input + ' flex-1 min-w-[120px]'} placeholder="Level" value={l.level || ''} onChange={e => setListField('languages', i, 'level', e.target.value)} />
                  <input className={input + ' w-24'} type="number" min="0" max="100" placeholder="%" value={l.pct ?? ''} onChange={e => setListField('languages', i, 'pct', Number(e.target.value))} />
                  <button onClick={() => removeItem('languages', i)} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                </div>
              ))}
              <button onClick={() => addItem('languages', { name: '', level: '', pct: 50 })} className={btnAdd}><Plus size={14} /> Add language</button>
            </div>
          </Section>

          <Section title="Community & Clinical Leadership"><EntryList list="leadership" /></Section>
          <Section title="Professional Experience"><EntryList list="experience" /></Section>

          <Section title="Education">
            <div className="space-y-4">
              {(r.education || []).map((ed, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center border border-white/10 rounded-lg p-4">
                  <input className={input} placeholder="School" value={ed.school || ''} onChange={e => setListField('education', i, 'school', e.target.value)} />
                  <input className={input + ' md:col-span-2'} placeholder="Detail" value={ed.detail || ''} onChange={e => setListField('education', i, 'detail', e.target.value)} />
                  <div className="flex items-center gap-2">
                    <input className={input} placeholder="Date" value={ed.date || ''} onChange={e => setListField('education', i, 'date', e.target.value)} />
                    <button onClick={() => removeItem('education', i)} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                  </div>
                  <input className={input + ' md:col-span-4'} placeholder="Note (e.g. ESSLCE: 475/600)" value={ed.note || ''} onChange={e => setListField('education', i, 'note', e.target.value)} />
                </div>
              ))}
              <button onClick={() => addItem('education', { school: '', detail: '', date: '', note: '' })} className={btnAdd}><Plus size={14} /> Add education</button>
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
};

export default AdminResume;
