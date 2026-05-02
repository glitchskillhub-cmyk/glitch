import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { registerMentorByAdmin } from '../utils/api';
import Sidebar from '../components/Sidebar';
import { User, Mail, Lock, Phone, Send, Loader2, ShieldCheck } from 'lucide-react';

const AddMentor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerMentorByAdmin(formData);
      toast.success('Mentor Created Successfully');
      navigate('/admin');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create mentor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-display font-black tracking-tighter uppercase italic">
            Mentor <span className="text-primary not-italic">Creation</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium italic">Administrative Faculty Registry</p>
        </header>

        <form onSubmit={handleSubmit} className="glass-card rounded-[2.5rem] border border-white/5 p-10 space-y-10 max-w-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 pointer-events-none">
             <ShieldCheck size={200} />
          </div>

          <section className="space-y-8 relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
              <User size={16} /> Mentor Identity
            </h3>
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors" size={18} />
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="input-field pl-14 bg-white/5 border-white/10" placeholder="Mentor Name" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors" size={18} />
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="input-field pl-14 bg-white/5 border-white/10" placeholder="mentor@glitch.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Temporary Password</label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors" size={18} />
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} required className="input-field pl-14 bg-white/5 border-white/10" placeholder="••••••••" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-primary transition-colors" size={18} />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="input-field pl-14 bg-white/5 border-white/10" placeholder="9876543210" />
                </div>
              </div>
            </div>
          </section>

          <button type="submit" disabled={loading} className="btn-yellow w-full py-5 shadow-[0_0_30px_rgba(255,215,0,0.1)]">
            {loading ? <><Loader2 className="animate-spin" size={18} /> Creating Mentor Account...</> : <><Send size={18} /> Register Mentor</>}
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddMentor;
