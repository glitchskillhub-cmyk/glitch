import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ShieldCheck, Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Authenticate admin with the backend to retrieve signed JWT token
      const userData = await login(email, password);
      
      if (userData.role === 'admin') {
         localStorage.setItem('isSVAdmin', 'true'); // For client router compatibility
         toast.success('Access Granted');
         navigate('/admin');
      } else {
         toast.error('Security Breach: Access Denied. Not an Admin.');
         // Clean up session if they are not admin
         localStorage.removeItem('user');
         localStorage.removeItem('isSVAdmin');
      }
    } catch (error) {
      console.error('Admin Login Error:', error);
      toast.error(error.response?.data?.message || 'Security Breach: Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]"></div>

      <div className="max-w-md w-full glass-card rounded-[3rem] p-10 z-10 relative">
        <div className="text-center mb-10">
          <div className="bg-primary/10 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(255,215,0,0.2)] border border-primary/20">
            <ShieldCheck size={40} className="text-primary" />
          </div>
          <h2 className="text-3xl font-display font-black text-white tracking-tighter uppercase italic">
            Admin <span className="text-primary not-italic">Gate</span>
          </h2>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mt-2 italic text-center">Secure Registry Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Registry ID</label>
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="input-field pl-14 bg-white/5 border-white/10" 
                placeholder="admin@glitch.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Security Key</label>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="input-field pl-14 bg-white/5 border-white/10" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-yellow w-full py-4 shadow-[0_0_30px_rgba(255,215,0,0.1)]"
          >
            {loading ? 'Initializing...' : <><LogIn size={18} /> Authenticate</>}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-700">
            Glitch Skill Hub Security Protocol Active
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
