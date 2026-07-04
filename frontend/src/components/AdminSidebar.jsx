import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, FileText, FolderKanban, Palette, Clock, MessageSquare, Settings, LogOut } from 'lucide-react';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/blogs', label: 'Blogs', icon: FileText },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/designs', label: 'Designs', icon: Palette },
  { to: '/admin/timeline', label: 'Timeline', icon: Clock },
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

const AdminSidebar = ({ darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#1a1410] border-r border-white/5 z-50 flex flex-col">
      <div className="p-6 flex-1">
        <h1 className="font-serif text-2xl text-white mb-8 tracking-tight">
          <span className="text-[#D4AF37]">✦</span> Admin
        </h1>
        <nav className="space-y-1">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all ${
                  active
                    ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20'
                    : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
                }`}>
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-6 border-t border-white/5">
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg font-mono text-sm text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
