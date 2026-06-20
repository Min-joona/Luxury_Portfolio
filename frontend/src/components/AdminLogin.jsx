import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle } from 'lucide-react';
import { api } from '../api';

const AdminLogin = ({ darkMode }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });

      // Save token to localStorage
      localStorage.setItem('adminToken', data.token);
      
      // Redirect to admin dashboard
      navigate('/admin');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      darkMode ? 'bg-[#0d0705]' : 'bg-[#e8ddd4]'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md p-8 rounded-2xl border ${
          darkMode 
            ? 'bg-[#1a1410] border-white/10' 
            : 'bg-white border-[#1a1410]/10'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            darkMode ? 'bg-[#5D4037]' : 'bg-[#8D6E63]'
          }`}>
            <Lock size={28} className="text-white" />
          </div>
          <h1 className={`font-serif text-3xl mb-2 ${
            darkMode ? 'text-white' : 'text-[#1a1410]'
          }`}>
            Admin Login
          </h1>
          <p className={`text-sm font-mono ${
            darkMode ? 'text-white/60' : 'text-[#1a1410]/60'
          }`}>
            Enter your credentials to access the admin panel
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              darkMode 
                ? 'bg-red-500/10 border border-red-500/30 text-red-400' 
                : 'bg-red-50 border border-red-200 text-red-600'
            }`}
          >
            <AlertCircle size={20} />
            <span className="text-sm font-mono">{error}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className={`block text-xs font-mono uppercase tracking-wider mb-2 ${
              darkMode ? 'text-white/60' : 'text-[#1a1410]/60'
            }`}>
              Username
            </label>
            <div className="relative">
              <User size={20} className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                darkMode ? 'text-white/40' : 'text-[#1a1410]/40'
              }`} />
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className={`w-full pl-12 pr-4 py-4 rounded-lg border text-sm font-mono bg-transparent focus:outline-none focus:ring-2 transition-all ${
                  darkMode 
                    ? 'border-white/20 text-white placeholder:text-white/30 focus:ring-white/20' 
                    : 'border-[#1a1410]/20 text-[#1a1410] placeholder:text-[#1a1410]/30 focus:ring-[#1a1410]/20'
                }`}
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className={`block text-xs font-mono uppercase tracking-wider mb-2 ${
              darkMode ? 'text-white/60' : 'text-[#1a1410]/60'
            }`}>
              Password
            </label>
            <div className="relative">
              <Lock size={20} className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                darkMode ? 'text-white/40' : 'text-[#1a1410]/40'
              }`} />
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className={`w-full pl-12 pr-4 py-4 rounded-lg border text-sm font-mono bg-transparent focus:outline-none focus:ring-2 transition-all ${
                  darkMode 
                    ? 'border-white/20 text-white placeholder:text-white/30 focus:ring-white/20' 
                    : 'border-[#1a1410]/20 text-[#1a1410] placeholder:text-[#1a1410]/30 focus:ring-[#1a1410]/20'
                }`}
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-lg font-mono text-sm tracking-wider transition-all ${
              loading 
                ? 'opacity-50 cursor-not-allowed' 
                : ''
            } ${
              darkMode 
                ? 'bg-white text-[#1a1410] hover:bg-white/90' 
                : 'bg-[#1a1410] text-white hover:bg-[#1a1410]/90'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Back to Site */}
        <div className="mt-6 text-center">
          <a 
            href="/" 
            className={`text-sm font-mono underline ${
              darkMode ? 'text-white/50 hover:text-white' : 'text-[#1a1410]/50 hover:text-[#1a1410]'
            }`}
          >
            Back to Portfolio
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
