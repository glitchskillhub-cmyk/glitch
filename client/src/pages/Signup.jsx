import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, UserPlus, Sparkles, Loader2, Phone, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
      toast.success(`Welcome to the Glitch Hub, ${formData.name}!`);
      navigate('/student/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-36 md:pt-48 pb-14 md:pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-primary/5 blur-[150px]"></div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
             <div className="text-center mb-12">
                <div className="badge-modern mx-auto mb-8"><span></span> Join The Hub</div>
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Start Your <br /> <span className="text-primary italic">Career.</span></h1>
                <p className="text-slate-500 font-medium">Create your role-based account.</p>
             </div>

             <div className="bento-card p-10 bg-white shadow-2xl relative overflow-hidden">
                <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="floating-label-group">
                      <input 
                        type="text" 
                        name="name"
                        placeholder=" " 
                        className="input-field"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <label className="floating-label"><User size={14} /> Full Name</label>
                   </div>

                   <div className="floating-label-group">
                      <input 
                        type="email" 
                        name="email"
                        placeholder=" " 
                        className="input-field"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label className="floating-label"><Mail size={14} /> Email Address</label>
                   </div>

                   <div className="floating-label-group">
                      <input 
                        type="password" 
                        name="password"
                        placeholder=" " 
                        className="input-field"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <label className="floating-label"><Lock size={14} /> Password</label>
                   </div>

                   <div className="floating-label-group">
                      <input 
                        type="text" 
                        name="phone"
                        placeholder=" " 
                        className="input-field"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                      <label className="floating-label"><Phone size={14} /> Phone Number</label>
                   </div>

                   {/* Role is defaulted to student in the state, removed dropdown as per request */}

                   <button 
                     type="submit" 
                     disabled={loading}
                     className="btn-premium w-full py-5 text-lg"
                   >
                     {loading ? (
                       <Loader2 className="animate-spin" />
                     ) : (
                       <><span>Create Account</span> <UserPlus size={20} /></>
                     )}
                   </button>
                </form>

                <div className="mt-8 text-center pt-8 border-t border-slate-50">
                   <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                      Already have an account? <Link to="/login" className="text-primary hover:underline">Sign In</Link>
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

export default Signup;
