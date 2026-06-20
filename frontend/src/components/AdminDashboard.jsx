import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  FolderKanban, 
  MessageSquare, 
  LogOut,
  TrendingUp,
  Eye,
  Heart,
  Share2,
  Users
} from 'lucide-react';

const AdminDashboard = ({ darkMode }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topBlogs, setTopBlogs] = useState([]);

  useEffect(() => {
    checkAuth();
    fetchAnalytics();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/analytics', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
          return;
        }
        throw new Error('Failed to fetch analytics');
      }
      
      const data = await response.json();
      setStats(data.stats);
      setTopBlogs(data.topBlogs);
      setLoading(false);
    } catch (error) {
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
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-[#0d0705]' : 'bg-[#e8ddd4]'
      }`}>
        <div className="text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full animate-pulse ${
            darkMode ? 'bg-white/20' : 'bg-[#1a1410]/20'
          }`} />
          <p className={darkMode ? 'text-white/60' : 'text-[#1a1410]/60'}>
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0d0705]' : 'bg-[#e8ddd4]'}`}>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 border-r ${
        darkMode 
          ? 'bg-[#1a1410] border-white/10' 
          : 'bg-white border-[#1a1410]/10'
      }`}>
        <div className="p-6">
          <h1 className={`font-serif text-2xl mb-8 ${
            darkMode ? 'text-white' : 'text-[#1a1410]'
          }`}>
            Admin Panel
          </h1>
          
          <nav className="space-y-2">
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-white/70 hover:bg-white/10 hover:text-white' 
                  : 'text-[#1a1410]/70 hover:bg-[#1a1410]/10 hover:text-[#1a1410]'
              }`}
            >
              <LayoutDashboard size={20} />
              <span className="font-mono text-sm">Dashboard</span>
            </Link>
            
            <Link
              to="/admin/blogs"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-white/70 hover:bg-white/10 hover:text-white' 
                  : 'text-[#1a1410]/70 hover:bg-[#1a1410]/10 hover:text-[#1a1410]'
              }`}
            >
              <FileText size={20} />
              <span className="font-mono text-sm">Blogs</span>
            </Link>
            
            <Link
              to="/admin/projects"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-white/70 hover:bg-white/10 hover:text-white' 
                  : 'text-[#1a1410]/70 hover:bg-[#1a1410]/10 hover:text-[#1a1410]'
              }`}
            >
              <FolderKanban size={20} />
              <span className="font-mono text-sm">Projects</span>
            </Link>
            
            <Link
              to="/admin/messages"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-white/70 hover:bg-white/10 hover:text-white' 
                  : 'text-[#1a1410]/70 hover:bg-[#1a1410]/10 hover:text-[#1a1410]'
              }`}
            >
              <MessageSquare size={20} />
              <span className="font-mono text-sm">Messages</span>
            </Link>
          </nav>
        </div>
        
        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors ${
              darkMode 
                ? 'text-red-400 hover:bg-red-500/10' 
                : 'text-red-600 hover:bg-red-500/10'
            }`}
          >
            <LogOut size={20} />
            <span className="font-mono text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className={`font-serif text-3xl mb-8 ${
            darkMode ? 'text-white' : 'text-[#1a1410]'
          }`}>
            Dashboard Overview
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Blogs"
              value={stats?.totalBlogs || 0}
              icon={FileText}
              trend="+2 this week"
              darkMode={darkMode}
            />
            <StatCard
              title="Total Views"
              value={stats?.totalViews || 0}
              icon={Eye}
              trend="+124 today"
              darkMode={darkMode}
            />
            <StatCard
              title="Total Likes"
              value={stats?.totalLikes || 0}
              icon={Heart}
              trend="+18 today"
              darkMode={darkMode}
            />
            <StatCard
              title="Messages"
              value={stats?.totalMessages || 0}
              icon={MessageSquare}
              trend="3 unread"
              darkMode={darkMode}
            />
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className={`p-6 rounded-xl border ${
              darkMode 
                ? 'bg-[#1a1410]/50 border-white/10' 
                : 'bg-white border-[#1a1410]/10'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-[#5D4037]' : 'bg-[#8D6E63]'
                }`}>
                  <Share2 size={24} className="text-white" />
                </div>
                <div>
                  <p className={`text-sm font-mono ${
                    darkMode ? 'text-white/60' : 'text-[#1a1410]/60'
                  }`}>
                    Total Shares
                  </p>
                  <p className={`text-3xl font-serif ${
                    darkMode ? 'text-white' : 'text-[#1a1410]'
                  }`}>
                    {stats?.totalShares || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl border ${
              darkMode 
                ? 'bg-[#1a1410]/50 border-white/10' 
                : 'bg-white border-[#1a1410]/10'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-[#5D4037]' : 'bg-[#8D6E63]'
                }`}>
                  <TrendingUp size={24} className="text-white" />
                </div>
                <div>
                  <p className={`text-sm font-mono ${
                    darkMode ? 'text-white/60' : 'text-[#1a1410]/60'
                  }`}>
                    Views This Week
                  </p>
                  <p className={`text-3xl font-serif ${
                    darkMode ? 'text-white' : 'text-[#1a1410]'
                  }`}>
                    {stats?.recentViews || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performing Blogs */}
          <div className={`rounded-xl border ${
            darkMode 
              ? 'bg-[#1a1410]/50 border-white/10' 
              : 'bg-white border-[#1a1410]/10'
          }`}>
            <div className="p-6 border-b border-white/10">
              <h3 className={`font-serif text-xl ${
                darkMode ? 'text-white' : 'text-[#1a1410]'
              }`}>
                Top Performing Blogs
              </h3>
            </div>
            <div className="p-6">
              {topBlogs.length > 0 ? (
                <div className="space-y-4">
                  {topBlogs.map((blog, index) => (
                    <div
                      key={blog._id}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        darkMode ? 'bg-white/5' : 'bg-[#1a1410]/5'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono ${
                          darkMode ? 'bg-white/10 text-white' : 'bg-[#1a1410]/10 text-[#1a1410]'
                        }`}>
                          {index + 1}
                        </span>
                        <div>
                          <p className={`font-medium ${
                            darkMode ? 'text-white' : 'text-[#1a1410]'
                          }`}>
                            {blog.title}
                          </p>
                          <p className={`text-sm ${
                            darkMode ? 'text-white/50' : 'text-[#1a1410]/50'
                          }`}>
                            {blog.views} views • {blog.likes} likes • {blog.shares} shares
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={`text-center py-8 ${
                  darkMode ? 'text-white/40' : 'text-[#1a1410]/40'
                }`}>
                  No blog data available
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, trend, darkMode }) => (
  <div className={`p-6 rounded-xl border ${
    darkMode 
      ? 'bg-[#1a1410]/50 border-white/10' 
      : 'bg-white border-[#1a1410]/10'
  }`}>
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
        darkMode ? 'bg-[#5D4037]' : 'bg-[#8D6E63]'
      }`}>
        <Icon size={24} className="text-white" />
      </div>
      <span className={`text-xs font-mono ${
        darkMode ? 'text-green-400' : 'text-green-600'
      }`}>
        {trend}
      </span>
    </div>
    <p className={`text-sm font-mono mb-1 ${
      darkMode ? 'text-white/60' : 'text-[#1a1410]/60'
    }`}>
      {title}
    </p>
    <p className={`text-3xl font-serif ${
      darkMode ? 'text-white' : 'text-[#1a1410]'
    }`}>
      {value.toLocaleString()}
    </p>
  </div>
);

export default AdminDashboard;
