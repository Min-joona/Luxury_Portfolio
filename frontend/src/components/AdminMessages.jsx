import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, ArrowLeft, Mail, User, Calendar } from 'lucide-react';
import { api } from '../api';

const AdminMessages = ({ darkMode }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchMessages();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/admin/login');
  };

  const fetchMessages = async () => {
    try {
      const data = await api('/api/admin/messages');
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api(`/api/admin/messages/${id}`, { method: 'DELETE' });
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (loading) return <div className="ml-64 p-8">Loading...</div>;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0d0705]' : 'bg-[#e8ddd4]'}`}>
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/admin" className={darkMode ? 'text-white/60 hover:text-white' : 'text-[#1a1410]/60 hover:text-[#1a1410]'}>
              <ArrowLeft size={24} />
            </Link>
            <h2 className={`font-serif text-3xl ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>Contact Messages ({messages.length})</h2>
          </div>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className={`text-center py-12 ${darkMode ? 'text-white/40' : 'text-[#1a1410]/40'}`}>No messages yet</p>
            ) : (
              messages.map((msg) => (
                <motion.div key={msg._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-6 rounded-xl border ${darkMode ? 'bg-[#1a1410]/50 border-white/10' : 'bg-white border-[#1a1410]/10'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-[#5D4037]' : 'bg-[#8D6E63]'}`}>
                        <User size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className={`font-serif text-lg ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>{msg.name}</h3>
                        <div className="flex items-center gap-4 text-sm font-mono">
                          <span className={darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}><Mail size={14} className="inline mr-1" />{msg.email}</span>
                          <span className={darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}><Calendar size={14} className="inline mr-1" />{new Date(msg.date).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(msg._id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10"><Trash2 size={18} /></button>
                  </div>
                  <p className={`pl-14 ${darkMode ? 'text-white/70' : 'text-[#1a1410]/70'}`}>{msg.message}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
