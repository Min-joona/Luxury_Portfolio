import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, ArrowLeft, Save, X } from 'lucide-react';
import { api } from '../api';

const AdminBlogs = ({ darkMode }) => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    image: '',
    readTime: ''
  });

  useEffect(() => {
    checkAuth();
    fetchBlogs();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/admin/login');
  };

  const fetchBlogs = async () => {
    try {
      const data = await api('/api/admin/blogs');
      setBlogs(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = editingBlog
        ? `/api/admin/blogs/${editingBlog._id}`
        : '/api/admin/blogs';
      const method = editingBlog ? 'PUT' : 'POST';

      await api(endpoint, { method, body: JSON.stringify(formData) });
      setShowForm(false);
      setEditingBlog(null);
      setFormData({ title: '', slug: '', excerpt: '', content: '', category: '', image: '', readTime: '' });
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await api(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const startEdit = (blog) => {
    setEditingBlog(blog);
    setFormData(blog);
    setShowForm(true);
  };

  if (loading) return <div className="ml-64 p-8">Loading...</div>;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0d0705]' : 'bg-[#e8ddd4]'}`}>
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin" className={darkMode ? 'text-white/60 hover:text-white' : 'text-[#1a1410]/60 hover:text-[#1a1410]'}>
                <ArrowLeft size={24} />
              </Link>
              <h2 className={`font-serif text-3xl ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>Manage Blogs</h2>
            </div>
            <button
              onClick={() => { setShowForm(true); setEditingBlog(null); setFormData({ title: '', slug: '', excerpt: '', content: '', category: '', image: '', readTime: '' }); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm ${
                darkMode ? 'bg-white text-[#1a1410] hover:bg-white/90' : 'bg-[#1a1410] text-white hover:bg-[#1a1410]/90'
              }`}
            >
              <Plus size={18} /> Add New Blog
            </button>
          </div>

          {showForm && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className={`mb-8 p-6 rounded-xl border ${darkMode ? 'bg-[#1a1410]/50 border-white/10' : 'bg-white border-[#1a1410]/10'}`}>
              <h3 className={`font-serif text-xl mb-6 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className={`px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} required />
                  <input type="text" placeholder="Slug (URL-friendly name)" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className={`px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} required />
                </div>
                <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className={`w-full px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} required />
                <input type="text" placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className={`w-full px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} required />
                <input type="text" placeholder="Read Time (e.g., 5 min read)" value={formData.readTime} onChange={(e) => setFormData({...formData, readTime: e.target.value})} className={`w-full px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} required />
                <textarea placeholder="Excerpt (short description)" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} rows={3} className={`w-full px-4 py-3 rounded-lg border bg-transparent ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} required />
                <textarea placeholder="Full Content (Markdown supported)" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} rows={10} className={`w-full px-4 py-3 rounded-lg border bg-transparent font-mono text-sm ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`} required />
                <div className="flex gap-4">
                  <button type="submit" className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm ${darkMode ? 'bg-white text-[#1a1410]' : 'bg-[#1a1410] text-white'}`}><Save size={18} /> {editingBlog ? 'Update' : 'Create'}</button>
                  <button type="button" onClick={() => setShowForm(false)} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm border ${darkMode ? 'border-white/20 text-white' : 'border-[#1a1410]/20 text-[#1a1410]'}`}><X size={18} /> Cancel</button>
                </div>
              </form>
            </motion.div>
          )}

          <div className="space-y-4">
            {blogs.map((blog) => (
              <div key={blog._id} className={`p-6 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-[#1a1410]/50 border-white/10' : 'bg-white border-[#1a1410]/10'}`}>
                <div>
                  <h3 className={`font-serif text-xl mb-1 ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>{blog.title}</h3>
                  <p className={`text-sm font-mono ${darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}`}>{blog.category} • {blog.views} views • {new Date(blog.date).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(blog)} className={`p-2 rounded-lg ${darkMode ? 'text-white/60 hover:bg-white/10' : 'text-[#1a1410]/60 hover:bg-[#1a1410]/10'}`}><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(blog._id)} className={`p-2 rounded-lg text-red-400 hover:bg-red-500/10`}><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;
