import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, FileText, FolderKanban, Palette, Clock,
  MessageSquare, Settings, LogOut, Eye, Heart, Share2,
  MessageCircle, Mail,
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';
import { api } from '../api';

const GOLD = '#D4AF37';
const GOLD_DIM = 'rgba(212,175,55,0.1)';
const GOLD_BORDER = 'rgba(212,175,55,0.25)';
const COLORS = ['#D4AF37', '#C49B2E', '#B8860B', '#A0762C', '#8B6914', '#DAA520', '#CD9B1D'];

const AdminDashboard = ({ darkMode = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) { navigate('/admin/login'); return; }
    }
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await api('/api/admin/analytics');
      setData(res);
      const { stats, pageViews, topBlogs, categoryBreakdown, viewsOverTime, recentMessages } = res;
      setStats(stats);
      setPageViews(pageViews || []);
      setTopBlogs(topBlogs || []);
      setCategoryBreakdown(categoryBreakdown || []);
      setViewsOverTime(viewsOverTime || []);
      setRecentMessages(recentMessages || []);
      setLoading(false);
    } catch (error) {
      if (error.message === 'HTTP 401' || error.message === 'HTTP 403') {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
        return;
      }
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0705] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-10 h-10 mx-auto mb-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          <p className="font-mono text-xs text-white/30 tracking-[0.2em] uppercase">
            Loading dashboard
          </p>
        </motion.div>
      </div>
    );
  }

  if (!data) return null;

  const { stats = {}, topBlogs = [], categoryBreakdown = [], viewsOverTime = [], pageViews = [], recentMessages = [] } = data;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <div className="min-h-screen bg-[#0d0705] flex">
      <AdminSidebar />

      <main className="flex-1 ml-64 p-8 lg:p-10">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-10">
            <h1 className="font-serif text-3xl text-white mb-1 tracking-wide">
              Dashboard
            </h1>
            <p className="font-mono text-xs text-white/20 tracking-[0.2em] uppercase">
              Overview &amp; Analytics
            </p>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">
            <motion.div variants={fadeUp}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <StatCard title="Total Blogs" value={stats.totalBlogs ?? 0} icon={FileText} delay={0} />
                <StatCard title="Total Views" value={stats.totalViews ?? 0} icon={Eye} delay={0.05} />
                <StatCard title="Total Likes" value={stats.totalLikes ?? 0} icon={Heart} delay={0.1} />
                <StatCard title="Total Messages" value={stats.totalMessages ?? 0} icon={Mail} delay={0.15} />
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <StatCard title="Total Projects" value={stats.totalProjects ?? 0} icon={FolderKanban} delay={0.2} />
                <StatCard title="Total Designs" value={stats.totalDesigns ?? 0} icon={Palette} delay={0.25} />
                <StatCard title="Total Shares" value={stats.totalShares ?? 0} icon={Share2} delay={0.3} />
                <StatCard title="Total Comments" value={stats.totalComments ?? 0} icon={MessageCircle} delay={0.35} />
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Views Over Time" subtitle="Last 30 days">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={viewsOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="date" stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }} />
                      <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }} />
                      <Tooltip
                        contentStyle={{ background: '#1a1410', border: `1px solid ${GOLD_BORDER}`, borderRadius: 8, color: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
                        labelStyle={{ color: GOLD, fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}
                        itemStyle={{ fontSize: 12 }}
                      />
                      <Bar dataKey="views" fill={GOLD} radius={[4, 4, 0, 0]} maxBarSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Category Breakdown" subtitle="Content distribution">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryBreakdown}
                        cx="50%" cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={3}
                        dataKey="count"
                        nameKey="name"
                      >
                        {categoryBreakdown.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: '#1a1410', border: `1px solid ${GOLD_BORDER}`, borderRadius: 8, color: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
                        labelStyle={{ color: GOLD, fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}
                        itemStyle={{ fontSize: 12 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {categoryBreakdown.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-4">
                      {categoryBreakdown.map((item, i) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                          <span className="font-mono text-xs text-white/50">
                            {item.name} <span className="text-white/30">({item.count})</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </ChartCard>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <ChartCard title="Page Views" subtitle="Traffic over time">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={pageViews} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }} />
                    <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }} />
                    <Tooltip
                      contentStyle={{ background: '#1a1410', border: `1px solid ${GOLD_BORDER}`, borderRadius: 8, color: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
                      labelStyle={{ color: GOLD, fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}
                      itemStyle={{ fontSize: 12 }}
                    />
                    <Line type="monotone" dataKey="count" stroke={GOLD} strokeWidth={2} dot={{ fill: GOLD, r: 3 }} activeDot={{ r: 5, fill: GOLD }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </motion.div>

            <motion.div variants={fadeUp}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#1a1410]/80 border border-white/[0.06] rounded-xl overflow-hidden backdrop-blur-sm">
                  <div className="px-6 py-5 border-b border-white/[0.06]">
                    <h3 className="font-serif text-lg text-white tracking-wide">Top Performing Blogs</h3>
                  </div>
                  <div className="p-6">
                    {topBlogs.length > 0 ? (
                      <div className="space-y-2">
                        {topBlogs.map((blog, i) => (
                          <div
                            key={blog._id}
                            className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="shrink-0 w-7 h-7 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center text-xs font-mono font-bold">
                                {i + 1}
                              </span>
                              <div className="min-w-0">
                                <p className="text-sm text-white/85 font-medium truncate max-w-[200px]">
                                  {blog.title}
                                </p>
                                <p className="text-xs text-white/35 font-mono mt-0.5">
                                  {blog.views} views &middot; {blog.likes} likes &middot; {blog.shares} shares
                                </p>
                              </div>
                            </div>
                            <Eye size={14} className="shrink-0 text-white/15" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-10 text-white/25 font-mono text-sm">
                        No blog data available
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-[#1a1410]/80 border border-white/[0.06] rounded-xl overflow-hidden backdrop-blur-sm">
                  <div className="px-6 py-5 border-b border-white/[0.06]">
                    <h3 className="font-serif text-lg text-white tracking-wide">Recent Messages</h3>
                  </div>
                  <div className="p-6 max-h-[420px] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
                    {recentMessages.length > 0 ? (
                      <div className="space-y-2">
                        {recentMessages.map((msg, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm text-white/85 font-medium truncate">{msg.name}</p>
                              <p className="text-xs text-white/30 font-mono shrink-0 ml-3">
                                {new Date(msg.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </p>
                            </div>
                            <p className="text-xs text-white/40 font-mono mb-1.5 truncate">{msg.email}</p>
                            <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{msg.message}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-10 text-white/25 font-mono text-sm">
                        No messages yet
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};



const StatCard = ({ title, value, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="bg-[#1a1410]/80 border border-white/[0.06] rounded-xl p-5 lg:p-6 backdrop-blur-sm hover:border-[#D4AF37]/20 transition-colors duration-300 group"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
        <Icon size={20} className="text-[#D4AF37]" strokeWidth={1.5} />
      </div>
    </div>
    <p className="font-mono text-xs text-white/35 tracking-wider uppercase mb-1">
      {title}
    </p>
    <p className="font-serif text-3xl text-white tracking-wide">
      {typeof value === 'number' ? value.toLocaleString() : value}
    </p>
  </motion.div>
);

const ChartCard = ({ title, subtitle, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="bg-[#1a1410]/80 border border-white/[0.06] rounded-xl p-6 backdrop-blur-sm"
  >
    <div className="mb-5">
      <h3 className="font-serif text-lg text-white tracking-wide">{title}</h3>
      {subtitle && (
        <p className="font-mono text-xs text-white/30 tracking-wider uppercase mt-1">{subtitle}</p>
      )}
    </div>
    {children}
  </motion.div>
);

export default AdminDashboard;
