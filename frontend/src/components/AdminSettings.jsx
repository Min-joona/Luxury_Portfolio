import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, Upload, User, Camera } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { api, uploadImage } from '../api';

const AdminSettings = ({ darkMode }) => {
  const navigate = useNavigate();
  const fileRef = useRef();
  const [settings, setSettings] = useState({
    name: 'Amar Hassen Mohammednur',
    email: 'amarshisheno@gmail.com',
    title: 'Full Stack Developer',
    bio: 'Building impactful web experiences with the MERN stack.',
    avatar: '',
    location: '',
    social_github: '',
    social_linkedin: '',
    social_twitter: '',
    social_instagram: '',
    social_telegram: ''
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) navigate('/admin/login');
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await api('/api/admin/settings');
      if (data.name) setSettings(prev => ({ ...prev, ...data }));
    } catch (e) { console.error(e); }
  };

  const uploadToCloudinary = async (file) => {
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setSettings(s => ({ ...s, avatar: url }));
    } catch (e) { console.error('Upload failed', e); alert('Image upload failed: ' + e.message); }
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api('/api/admin/settings', { method: 'PUT', body: JSON.stringify(settings) });
      alert('Settings saved!');
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  const update = (key, value) => setSettings(s => ({ ...s, [key]: value }));

  return (
    <div className="min-h-screen bg-[#0d0705] flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="font-serif text-3xl text-white">Settings</h2>
            <p className="font-mono text-xs mt-1 text-white/40">Profile &amp; Social Links</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-xl border ${darkMode ? 'bg-[#1a1410]/50 border-white/10' : 'bg-white border-[#1a1410]/10'}`}>
            {/* Avatar */}
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <div className={`w-24 h-24 rounded-full overflow-hidden ${darkMode ? 'bg-[#2a2018]' : 'bg-[#e0d5cc]'}`}>
                  {settings.avatar ? (
                    <img src={settings.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={40} className={darkMode ? 'text-white/40' : 'text-[#1a1410]/40'} />
                    </div>
                  )}
                </div>
                <button type="button" onClick={() => fileRef.current.click()} className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border ${darkMode ? 'bg-[#1a1410] border-white/20 text-white' : 'bg-white border-[#1a1410]/20 text-[#1a1410]'}`}>
                  {uploading ? <div className="w-3 h-3 rounded-full border-2 border-t-transparent animate-spin" /> : <Camera size={14} />}
                </button>
              </div>
              <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={e => e.target.files[0] && uploadToCloudinary(e.target.files[0])} />
              <div>
                <h3 className={`font-serif text-xl ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>Profile Picture</h3>
                <p className={`text-sm font-mono ${darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}`}>Upload a square image (recommended: 400x400)</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${darkMode ? 'text-white/60' : 'text-[#1a1410]/60'}`}>Name</label>
                  <input value={settings.name} onChange={e => update('name', e.target.value)} className={`w-full px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} />
                </div>
                <div>
                  <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${darkMode ? 'text-white/60' : 'text-[#1a1410]/60'}`}>Email</label>
                  <input value={settings.email} onChange={e => update('email', e.target.value)} className={`w-full px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${darkMode ? 'text-white/60' : 'text-[#1a1410]/60'}`}>Title / Role</label>
                <input value={settings.title} onChange={e => update('title', e.target.value)} className={`w-full px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} />
              </div>

              <div>
                <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${darkMode ? 'text-white/60' : 'text-[#1a1410]/60'}`}>Bio</label>
                <textarea value={settings.bio} onChange={e => update('bio', e.target.value)} rows={3} className={`w-full px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} />
              </div>

              <div>
                <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${darkMode ? 'text-white/60' : 'text-[#1a1410]/60'}`}>Location</label>
                <input value={settings.location} onChange={e => update('location', e.target.value)} className={`w-full px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} />
              </div>

              <div className="border-t border-white/10 pt-4 mt-6">
                <h4 className={`font-serif text-lg mb-4 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>Social Links</h4>
                <div className="space-y-3">
                  {[
                    ['social_github', 'GitHub URL'],
                    ['social_linkedin', 'LinkedIn URL'],
                    ['social_twitter', 'X (Twitter) URL'],
                    ['social_instagram', 'Instagram URL'],
                    ['social_telegram', 'Telegram URL'],
                  ].map(([key, label]) => (
                    <div key={key}>
                      <label className={`block text-xs font-mono uppercase tracking-wider mb-1 ${darkMode ? 'text-white/60' : 'text-[#1a1410]/60'}`}>{label}</label>
                      <input value={settings[key] || ''} onChange={e => update(key, e.target.value)} className={`w-full px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={handleSave} disabled={saving}
              className="mt-8 flex items-center gap-2 px-8 py-4 rounded-lg bg-[#D4AF37] text-[#0d0705] font-mono text-sm hover:bg-[#D4AF37]/90 transition-all disabled:opacity-50">
              <Save size={18} /> {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;
