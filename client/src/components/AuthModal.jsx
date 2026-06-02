import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Loader2, X, UserPlus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [modalMode, setModalMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register, user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setModalMode(initialMode);
    }
  }, [initialMode, isOpen]);

  // If already logged in or not open, don't render
  if (!isOpen || user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let loggedInUser;
      if (modalMode === 'login') {
        loggedInUser = await login(email, password);
        toast.success('Successfully logged in!');
      } else {
        loggedInUser = await register({
          name,
          email,
          password,
          phone,
          role: 'student'
        });
        toast.success(`Welcome to the Glitch Hub, ${name}!`);
      }
      onClose(); // Close modal on success
      
      // Navigate to dashboard
      if (loggedInUser && loggedInUser.role === 'mentor') {
        navigate('/mentor/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || `${modalMode === 'login' ? 'Login' : 'Registration'} failed`);
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white rounded-[2rem] max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors z-10"
        >
          <X size={16} />
        </button>
        <div className="p-8 md:p-10 max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
              {modalMode === 'login' ? <Lock size={28} /> : <UserPlus size={28} />}
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-2">
              {modalMode === 'login' ? 'Welcome to Glitch' : 'Create Account'}
            </h3>
            <p className="text-slate-500 text-sm">
              {modalMode === 'login' ? 'Please log in to continue.' : 'Sign up to get started.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {modalMode === 'signup' && (
              <div className="floating-label-group">
                <div className="relative group">
                  <input
                    type="text"
                    required
                    placeholder=" "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field pr-12 focus:z-0"
                  />
                  <label className="floating-label"><User size={14} className="text-slate-400" /> Full Name *</label>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors pointer-events-none">
                    <User size={18} />
                  </div>
                </div>
              </div>
            )}

            <div className="floating-label-group">
              <div className="relative group">
                <input
                  type="email"
                  required
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pr-12 focus:z-0"
                />
                <label className="floating-label"><Mail size={14} className="text-slate-400" /> Email Address *</label>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors pointer-events-none">
                  <Mail size={18} />
                </div>
              </div>
            </div>

            <div className="floating-label-group">
              <div className="relative group">
                <input
                  type="password"
                  required
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-12 focus:z-0"
                />
                <label className="floating-label"><Lock size={14} className="text-slate-400" /> Password *</label>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors pointer-events-none">
                  <Lock size={18} />
                </div>
              </div>
            </div>

            {modalMode === 'signup' && (
              <div className="floating-label-group">
                <div className="relative group">
                  <input
                    type="text"
                    required
                    placeholder=" "
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field pr-12 focus:z-0"
                  />
                  <label className="floating-label"><Phone size={14} className="text-slate-400" /> Phone Number *</label>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors pointer-events-none">
                    <Phone size={18} />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-premium w-full py-4 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> {modalMode === 'login' ? 'Logging in...' : 'Creating Account...'}</>
              ) : (
                <>{modalMode === 'login' ? 'Log In' : 'Create Account'}</>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            {modalMode === 'login' ? (
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Don't have an account? <button type="button" onClick={() => setModalMode('signup')} className="text-primary hover:underline cursor-pointer uppercase font-bold tracking-widest ml-1">Sign up</button>
              </p>
            ) : (
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Already have an account? <button type="button" onClick={() => setModalMode('login')} className="text-primary hover:underline cursor-pointer uppercase font-bold tracking-widest ml-1">Sign in</button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default AuthModal;
