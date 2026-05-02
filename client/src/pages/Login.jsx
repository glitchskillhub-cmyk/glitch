import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, Sparkles, ArrowRight, Loader2, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      toast.success(`Welcome back, ${user.name}!`);
      if (user.role === 'mentor') navigate('/mentor/dashboard');
      else navigate('/student/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-56 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px]"></div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
             <div className="text-center mb-12">
                <div className="badge-modern mx-auto mb-8"><span></span> Access Hub</div>
                <h1 className="text-4xl font-bold tracking-tight mb-4">Login to <br /> <span className="text-primary italic">Glitch.</span></h1>
                <p className="text-slate-500 font-medium">Continue your practical engineering journey.</p>
             </div>

             <div className="bento-card p-10 bg-white shadow-2xl relative overflow-hidden">
                <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="floating-label-group">
                      <input 
                        type="email" 
                        placeholder=" " 
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <label className="floating-label"><Mail size={14} /> Email Address</label>
                   </div>

                   <div className="floating-label-group">
                      <input 
                        type="password" 
                        placeholder=" " 
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label className="floating-label"><Lock size={14} /> Password</label>
                   </div>

                   <button 
                     type="submit" 
                     disabled={loading}
                     className="btn-premium w-full py-5 text-lg"
                   >
                     {loading ? (
                       <Loader2 className="animate-spin" />
                     ) : (
                       <><span>Sign In</span> <LogIn size={20} /></>
                     )}
                   </button>
                </form>

                <div className="mt-8 text-center pt-8 border-t border-slate-50">
                   <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                      New to the Hub? <Link to="/signup" className="text-primary hover:underline">Create Account</Link>
                   </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
