import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, UserPlus, Sparkles, Loader2, Phone, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
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
      <SEO title="Create Account" description="Join Glitch Skill Hub and start your practical engineering career." path="/signup" />
      <Navbar />
      
      <section className="pt-32 md:pt-40 pb-14 md:pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px]"></div>
        
        <div className="container mx-auto px-6 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 xl:gap-32 items-center">
             
             {/* Left Side: Image & Text */}
             <div className="hidden lg:flex flex-col space-y-10 lg:pr-10 xl:pr-16">
                <div>
                   <div className="badge-modern mb-6"><span></span> Join The Hub</div>
                   <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
                     Start Your <br /> <span className="text-primary italic">Career.</span>
                   </h1>
                   <p className="text-xl text-slate-500 font-medium max-w-md leading-relaxed">
                     Create your account to unlock hands-on training and mentorship from industry experts.
                   </p>
                </div>
                
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 group h-80 w-full max-w-md border border-slate-100">
                   <img 
                     src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80" 
                     alt="Student learning" 
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                   <div className="absolute bottom-8 left-8 right-8">
                      <div className="flex items-center gap-4 mb-3">
                         <div className="flex -space-x-3">
                            <img src="https://i.pravatar.cc/100?img=3" alt="student" className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" />
                            <img src="https://i.pravatar.cc/100?img=4" alt="student" className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" />
                            <div className="w-10 h-10 rounded-full bg-primary border-2 border-slate-900 flex items-center justify-center text-[10px] font-black text-slate-900">+50</div>
                         </div>
                         <div>
                            <p className="text-white text-xs font-black uppercase tracking-widest">Expert Mentors</p>
                            <div className="flex text-primary mt-1">
                               <ShieldCheck size={12} fill="currentColor" />
                               <ShieldCheck size={12} fill="currentColor" />
                               <ShieldCheck size={12} fill="currentColor" />
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Right Side: Signup Form */}
             <div className="max-w-md mx-auto w-full">
                {/* Mobile Header */}
                <div className="text-center mb-12 lg:hidden">
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Signup;
