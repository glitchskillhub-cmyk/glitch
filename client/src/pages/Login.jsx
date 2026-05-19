import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, Sparkles, ArrowRight, Loader2, User, KeyRound, ShieldCheck, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-hot-toast';
import { forgotPassword, resetPassword } from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Forgot Password / Reset states
  const [mode, setMode] = useState('login'); // 'login', 'forgot', 'reset'
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    setForgotLoading(true);
    try {
      const res = await forgotPassword({ email });
      toast.success(res.data?.message || 'OTP sent to your email!');
      setMode('reset');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setForgotLoading(true);
    try {
      const res = await resetPassword({ email, otp, password: newPassword });
      toast.success(res.data?.message || 'Password reset successfully!');
      // Reset state and transition back to login
      setMode('login');
      setPassword('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-36 md:pt-48 pb-14 md:pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px]"></div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
             <div className="text-center mb-12">
                <div className="badge-modern mx-auto mb-8"><span></span> Access Hub</div>
                <h1 className="text-4xl font-bold tracking-tight mb-4">Login to <br /> <span className="text-primary italic">Glitch.</span></h1>
                <p className="text-slate-500 font-medium">Continue your practical engineering journey.</p>
             </div>

             <div className="bento-card p-10 bg-white shadow-2xl relative overflow-hidden">
                {mode === 'login' && (
                  <>
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

                       <div className="flex justify-end pt-1">
                          <button 
                            type="button"
                            onClick={() => setMode('forgot')}
                            className="text-xs font-bold text-slate-400 hover:text-primary tracking-wide uppercase transition-colors"
                          >
                            Forgot Password?
                          </button>
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

                    <div className="mt-8 text-center pt-8 border-t border-slate-100">
                       <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                          New to the Hub? <Link to="/signup" className="text-primary hover:underline">Create Account</Link>
                       </p>
                    </div>
                  </>
                )}

                {mode === 'forgot' && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold tracking-tight text-slate-800">Forgot Password?</h3>
                      <p className="text-slate-400 text-sm mt-2">
                        Enter your registered email address to receive a 6-digit OTP code.
                      </p>
                    </div>

                    <form onSubmit={handleForgotPassword} className="space-y-6">
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

                       <button 
                         type="submit" 
                         disabled={forgotLoading}
                         className="btn-premium w-full py-5 text-lg"
                       >
                         {forgotLoading ? (
                           <Loader2 className="animate-spin" />
                         ) : (
                           <><span>Send OTP Code</span> <ArrowRight size={20} /></>
                         )}
                       </button>
                    </form>

                    <div className="mt-8 text-center pt-8 border-t border-slate-100">
                       <button 
                         type="button" 
                         onClick={() => setMode('login')}
                         className="text-slate-400 hover:text-slate-600 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 mx-auto transition-colors"
                       >
                         <ArrowLeft size={14} /> Back to Login
                       </button>
                    </div>
                  </div>
                )}

                {mode === 'reset' && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold tracking-tight text-slate-800">Verify & Reset</h3>
                      <p className="text-slate-400 text-sm mt-2">
                        We sent a 6-digit OTP code to <br /><span className="font-semibold text-slate-600">{email}</span>.
                      </p>
                    </div>

                    <form onSubmit={handleResetPassword} className="space-y-6">
                       <div className="floating-label-group">
                          <input 
                            type="text" 
                            maxLength="6"
                            placeholder=" " 
                            className="input-field tracking-[0.25em] font-mono text-center text-lg"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            required
                          />
                          <label className="floating-label left-0 right-0 text-center"><ShieldCheck size={14} className="inline mr-1" /> Enter 6-Digit OTP</label>
                       </div>

                       <div className="floating-label-group">
                          <input 
                            type="password" 
                            placeholder=" " 
                            className="input-field"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                          <label className="floating-label"><Lock size={14} /> New Password</label>
                       </div>

                       <div className="floating-label-group">
                          <input 
                            type="password" 
                            placeholder=" " 
                            className="input-field"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                          <label className="floating-label"><KeyRound size={14} /> Confirm New Password</label>
                       </div>

                       <button 
                         type="submit" 
                         disabled={forgotLoading}
                         className="btn-premium w-full py-5 text-lg"
                       >
                         {forgotLoading ? (
                           <Loader2 className="animate-spin" />
                         ) : (
                           <><span>Reset Password</span> <ShieldCheck size={20} /></>
                         )}
                       </button>
                    </form>

                    <div className="mt-8 text-center pt-8 border-t border-slate-100 flex flex-col gap-3">
                       <button 
                         type="button" 
                         onClick={() => setMode('forgot')}
                         className="text-primary hover:underline font-semibold text-xs transition-colors uppercase tracking-wider"
                       >
                         Resend OTP / Change Email
                       </button>
                       <button 
                         type="button" 
                         onClick={() => setMode('login')}
                         className="text-slate-400 hover:text-slate-600 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 mx-auto transition-colors"
                       >
                         <ArrowLeft size={14} /> Back to Login
                       </button>
                    </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
