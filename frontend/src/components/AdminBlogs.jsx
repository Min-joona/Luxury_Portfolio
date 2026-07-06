import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Upload, Eye, Calendar, FileText } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { api, uploadImage } from '../api';

const ToggleSwitch = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
      checked ? 'bg-[#D4AF37]' : 'bg-white/10'
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md ${
        checked ? 'translate-x-6' : 'translate-x-0'
      }`}
    />
  </button>
);

const AdminBlogs = ({ darkMode }) => {
  const navigate = useNavigate();
  const fileRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    image: '',
    readTime: '',
    published: false
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
      setBlogs(Array.isArray(data) ? data : data.blogs || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingBlog(null);
    setFormData({ title: '', slug: '', excerpt: '', content: '', category: '', image: '', readTime: '', published: false });
  };

  const startEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      category: blog.category || '',
      image: blog.image || '',
      readTime: blog.readTime || '',
      published: blog.published ?? false
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const endpoint = editingBlog
        ? `/api/admin/blogs/${editingBlog._id}`
        : '/api/admin/blogs';
      const method = editingBlog ? 'PUT' : 'POST';

      await api(endpoint, { method, body: JSON.stringify(formData) });
      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) return;
    try {
      await api(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleTogglePublish = async (blog) => {
    const updated = { ...formData, published: !blog.published };
    try {
      await api(`/api/admin/blogs/${blog._id}`, {
        method: 'PUT',
        body: JSON.stringify({ published: !blog.published })
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  const uploadToCloudinary = async (file) => {
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setFormData(f => ({ ...f, image: url }));
    } catch (e) { console.error('Upload failed', e); alert('Image upload failed: ' + e.message); }
    setUploading(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0705] flex">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full animate-pulse bg-white/10" />
            <p className="font-mono text-sm text-white/40">Loading blogs...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0705] flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-3xl text-white">Blogs</h2>
              <p className="font-mono text-xs mt-1 text-white/40">{blogs.length} {blogs.length === 1 ? 'entry' : 'entries'}</p>
            </div>
            <button
              onClick={() => { setShowForm(true); setEditingBlog(null); setFormData({ title: '', slug: '', excerpt: '', content: '', category: '', image: '', readTime: '', published: false }); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm transition-all duration-300 ${
                darkMode
                  ? 'bg-white text-[#0d0705] hover:bg-white/90 shadow-lg shadow-white/5'
                  : 'bg-[#1a1410] text-white hover:bg-[#1a1410]/90'
              }`}
            >
              <Plus size={16} />
              Add Blog
            </button>
          </div>

          {/* Blog Table */}
          <div className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-[#1a1410]/30 border-white/10' : 'bg-white border-[#1a1410]/10'}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${darkMode ? 'border-white/10' : 'border-[#1a1410]/10'}`}>
                    <th className={`text-left px-5 py-4 font-mono text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-[#1a1410]/40'}`}>Article</th>
                    <th className={`text-left px-5 py-4 font-mono text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-[#1a1410]/40'}`}>Category</th>
                    <th className={`text-center px-5 py-4 font-mono text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-[#1a1410]/40'}`}>
                      <div className="flex items-center justify-center gap-1"><Eye size={12} /> Views</div>
                    </th>
                    <th className={`text-center px-5 py-4 font-mono text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-[#1a1410]/40'}`}>
                      <div className="flex items-center justify-center gap-1"><Heart size={12} /> Likes</div>
                    </th>
                    <th className={`text-left px-5 py-4 font-mono text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-[#1a1410]/40'}`}>
                      <div className="flex items-center gap-1"><Calendar size={12} /> Date</div>
                    </th>
                    <th className={`text-center px-5 py-4 font-mono text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-[#1a1410]/40'}`}>Status</th>
                    <th className={`text-right px-5 py-4 font-mono text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white/40' : 'text-[#1a1410]/40'}`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className={`px-5 py-16 text-center ${darkMode ? 'text-white/30' : 'text-[#1a1410]/30'}`}>
                        <div className="flex flex-col items-center gap-2">
                          <FileText size={32} className="opacity-40" />
                          <p className="font-mono text-sm">No blogs yet</p>
                          <button
                            onClick={() => { setShowForm(true); setEditingBlog(null); setFormData({ title: '', slug: '', excerpt: '', content: '', category: '', image: '', readTime: '', published: false }); }}
                            className="text-[#D4AF37] hover:text-[#D4AF37]/80 font-mono text-sm mt-2 transition-colors"
                          >
                            Create your first blog
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    blogs.map((blog, i) => (
                      <tr
                        key={blog._id}
                        className={`border-b transition-colors ${
                          darkMode
                            ? 'border-white/5 hover:bg-white/[0.02]'
                            : 'border-[#1a1410]/5 hover:bg-[#1a1410]/[0.02]'
                        }`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border ${darkMode ? 'border-white/10' : 'border-[#1a1410]/10'}`}>
                              {blog.image ? (
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                              ) : (
                                <div className={`w-full h-full flex items-center justify-center ${darkMode ? 'bg-white/5' : 'bg-[#1a1410]/5'}`}>
                                  <FileText size={16} className={darkMode ? 'text-white/20' : 'text-[#1a1410]/20'} />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className={`font-medium text-sm truncate max-w-[280px] ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>{blog.title}</p>
                              {blog.readTime && (
                                <p className={`font-mono text-xs mt-0.5 ${darkMode ? 'text-white/30' : 'text-[#1a1410]/30'}`}>{blog.readTime}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          {blog.category ? (
                            <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-mono ${
                              darkMode
                                ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                                : 'bg-[#D4AF37]/10 text-[#B8960F]'
                            }`}>
                              {blog.category}
                            </span>
                          ) : (
                            <span className={`font-mono text-xs ${darkMode ? 'text-white/20' : 'text-[#1a1410]/20'}`}>—</span>
                          )}
                        </td>
                        <td className={`px-5 py-4 text-center font-mono text-sm ${darkMode ? 'text-white/60' : 'text-[#1a1410]/60'}`}>{blog.views ?? 0}</td>
                        <td className={`px-5 py-4 text-center font-mono text-sm ${darkMode ? 'text-white/60' : 'text-[#1a1410]/60'}`}>{blog.likes ?? 0}</td>
                        <td className={`px-5 py-4 font-mono text-sm ${darkMode ? 'text-white/60' : 'text-[#1a1410]/60'}`}>{formatDate(blog.date || blog.createdAt)}</td>
                        <td className="px-5 py-4 text-center">
                          <button
                            onClick={() => handleTogglePublish(blog)}
                            className="inline-flex"
                            title={blog.published ? 'Published' : 'Draft'}
                          >
                            <ToggleSwitch
                              checked={blog.published ?? false}
                              onChange={() => {}}
                            />
                          </button>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => startEdit(blog)}
                              className={`p-2 rounded-lg transition-all ${
                                darkMode
                                  ? 'text-white/40 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
                                  : 'text-[#1a1410]/40 hover:text-[#B8960F] hover:bg-[#D4AF37]/10'
                              }`}
                              title="Edit"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              onClick={() => handleDelete(blog._id)}
                              className={`p-2 rounded-lg transition-all text-red-400/60 hover:text-red-400 hover:bg-red-500/10`}
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-start justify-center pt-12 pb-12 overflow-y-auto ${darkMode ? 'bg-black/70 backdrop-blur-sm' : 'bg-black/40 backdrop-blur-sm'}`}
            onClick={(e) => { if (e.target === e.currentTarget) resetForm(); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
              className={`w-full max-w-3xl mx-4 rounded-2xl border shadow-2xl ${
                darkMode ? 'bg-[#1a1410] border-white/10' : 'bg-white border-[#1a1410]/10'
              }`}
            >
              <div className={`flex items-center justify-between px-8 py-6 border-b ${darkMode ? 'border-white/10' : 'border-[#1a1410]/10'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${darkMode ? 'bg-[#D4AF37]/10' : 'bg-[#D4AF37]/10'}`}>
                    {editingBlog ? <Edit2 size={18} className="text-[#D4AF37]" /> : <Plus size={18} className="text-[#D4AF37]" />}
                  </div>
                  <div>
                    <h3 className={`font-serif text-xl ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>{editingBlog ? 'Edit Blog' : 'New Blog'}</h3>
                    <p className={`font-mono text-xs mt-0.5 ${darkMode ? 'text-white/40' : 'text-[#1a1410]/40'}`}>{editingBlog ? 'Update the blog details below' : 'Fill in the details for your new blog'}</p>
                  </div>
                </div>
                <button
                  onClick={resetForm}
                  className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-white/40 hover:bg-white/10 hover:text-white' : 'text-[#1a1410]/40 hover:bg-[#1a1410]/10 hover:text-[#1a1410]'}`}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className={`block font-mono text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}`}>Title</label>
                    <input
                      type="text"
                      placeholder="Enter blog title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl border bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 ${
                        darkMode ? 'border-white/10 text-white placeholder-white/20' : 'border-[#1a1410]/10 text-[#1a1410] placeholder-[#1a1410]/20'
                      }`}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={`block font-mono text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}`}>Slug</label>
                    <input
                      type="text"
                      placeholder="url-friendly-slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl border bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 ${
                        darkMode ? 'border-white/10 text-white placeholder-white/20' : 'border-[#1a1410]/10 text-[#1a1410] placeholder-[#1a1410]/20'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className={`block font-mono text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}`}>Category</label>
                    <input
                      type="text"
                      placeholder="e.g. Technology, Design"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl border bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 ${
                        darkMode ? 'border-white/10 text-white placeholder-white/20' : 'border-[#1a1410]/10 text-[#1a1410] placeholder-[#1a1410]/20'
                      }`}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={`block font-mono text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}`}>Read Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 5 min read"
                      value={formData.readTime}
                      onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                      className={`w-full px-4 py-3 rounded-xl border bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 ${
                        darkMode ? 'border-white/10 text-white placeholder-white/20' : 'border-[#1a1410]/10 text-[#1a1410] placeholder-[#1a1410]/20'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={`block font-mono text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}`}>Featured Image</label>
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Paste image URL or upload"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl border bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 ${
                          darkMode ? 'border-white/10 text-white placeholder-white/20' : 'border-[#1a1410]/10 text-[#1a1410] placeholder-[#1a1410]/20'
                        }`}
                      />
                      {formData.image && (
                        <div className={`absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md overflow-hidden border ${darkMode ? 'border-white/10' : 'border-[#1a1410]/10'}`}>
                          <img src={formData.image} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileRef.current.click()}
                      disabled={uploading}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-sm border transition-all ${
                        darkMode
                          ? 'border-white/10 text-white/70 hover:bg-white/5 hover:text-white disabled:opacity-50'
                          : 'border-[#1a1410]/10 text-[#1a1410]/70 hover:bg-[#1a1410]/5 hover:text-[#1a1410] disabled:opacity-50'
                      }`}
                    >
                      <Upload size={16} className={uploading ? 'animate-bounce' : ''} />
                      {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                  </div>
                  <input
                    type="file"
                    ref={fileRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files[0] && uploadToCloudinary(e.target.files[0])}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={`block font-mono text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}`}>Excerpt</label>
                  <textarea
                    placeholder="Short description or summary of the blog post"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 resize-none ${
                      darkMode ? 'border-white/10 text-white placeholder-white/20' : 'border-[#1a1410]/10 text-[#1a1410] placeholder-[#1a1410]/20'
                    }`}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={`block font-mono text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-white/50' : 'text-[#1a1410]/50'}`}>Content (Markdown supported)</label>
                  <textarea
                    placeholder="Write your blog content here... Markdown formatting is supported."
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows={14}
                    className={`w-full px-4 py-3 rounded-xl border bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 font-mono text-sm resize-none ${
                      darkMode ? 'border-white/10 text-white placeholder-white/20' : 'border-[#1a1410]/10 text-[#1a1410] placeholder-[#1a1410]/20'
                    }`}
                    required
                  />
                </div>

                <div className={`flex items-center justify-between p-5 rounded-xl border ${darkMode ? 'border-white/10 bg-white/[0.02]' : 'border-[#1a1410]/10 bg-[#1a1410]/[0.02]'}`}>
                  <div>
                    <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-[#1a1410]'}`}>Published</p>
                    <p className={`font-mono text-xs mt-0.5 ${darkMode ? 'text-white/40' : 'text-[#1a1410]/40'}`}>{formData.published ? 'Visible to the public' : 'Hidden from visitors'}</p>
                  </div>
                  <ToggleSwitch
                    checked={formData.published}
                    onChange={(v) => setFormData({...formData, published: v})}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className={`px-6 py-3 rounded-xl font-mono text-sm border transition-all ${
                      darkMode
                        ? 'border-white/10 text-white/60 hover:bg-white/5 hover:text-white'
                        : 'border-[#1a1410]/10 text-[#1a1410]/60 hover:bg-[#1a1410]/5 hover:text-[#1a1410]'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm transition-all disabled:opacity-50 ${
                      darkMode
                        ? 'bg-[#D4AF37] text-[#0d0705] hover:bg-[#D4AF37]/90 shadow-lg shadow-[#D4AF37]/10'
                        : 'bg-[#D4AF37] text-white hover:bg-[#D4AF37]/90 shadow-lg shadow-[#D4AF37]/10'
                    }`}
                  >
                    <Save size={16} />
                    {saving ? 'Saving...' : editingBlog ? 'Update Blog' : 'Create Blog'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBlogs;
