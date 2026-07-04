import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Mail, User, Calendar, MessageSquare } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { api } from '../api';

const AdminMessages = ({ darkMode }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) { navigate('/admin/login'); return; }
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try { const d = await api('/api/admin/messages'); setMessages(d); } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try { await api(`/api/admin/messages/${id}`, { method: 'DELETE' }); fetchMessages(); } catch (e) { console.error(e); }
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="font-serif text-3xl text-white">Messages</h2>
            <p className="font-mono text-xs mt-1 text-white/40">{messages.length} messages</p>
          </div>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-16 text-white/30">
                <MessageSquare size={48} className="mx-auto mb-4 opacity-30" />
                <p className="font-mono text-sm">No messages yet</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <motion.div key={msg._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                  className="p-6 rounded-xl bg-[#1a1410] border border-white/5 hover:border-white/10 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                        <User size={20} className="text-[#D4AF37]" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg text-white">{msg.name}</h3>
                        <div className="flex items-center gap-4 text-sm font-mono text-white/40">
                          <span><Mail size={14} className="inline mr-1" />{msg.email}</span>
                          <span><Calendar size={14} className="inline mr-1" />{new Date(msg.date).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(msg._id)}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="pl-14 text-white/70 leading-relaxed">{msg.message}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminMessages;
