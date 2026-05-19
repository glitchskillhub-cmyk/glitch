import React, { useState, useEffect } from 'react';
import { User, ShieldCheck, Bell, Layers, Target, Users, Code, Zap, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { updateProfile } from '../../utils/api';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    linkedin: '',
    github: ''
  });
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        linkedin: user.socialLinks?.linkedin || '',
        github: user.socialLinks?.github || ''
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await updateProfile({
        name: formData.name,
        phone: formData.phone,
        socialLinks: {
          linkedin: formData.linkedin,
          github: formData.github
        }
      });
      updateUser(res.data);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error('Passwords do not match');
    }
    if (passwords.newPassword.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }
    try {
      setPasswordLoading(true);
      const res = await updateProfile({ password: passwords.newPassword });
      updateUser(res.data);
      toast.success('Password updated successfully');
      setPasswords({ newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to update password');
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Profile Settings</h1>
          <p className="text-slate-500 font-medium mt-2">Manage your account and preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
           <div className="bento-card bg-white p-10 border-slate-200">
              <h3 className="text-xl font-black uppercase mb-8 flex items-center gap-3">
                 <User size={24} className="text-primary" /> Personal Information
              </h3>
              <form onSubmit={handleUpdateProfile}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-sm font-bold focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                        required
                      />
                  </div>
                  <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        value={user.email}
                        className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold text-slate-500" 
                        disabled 
                      />
                  </div>
                  <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Phone Number</label>
                      <input 
                        type="text" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-sm font-bold focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                      />
                  </div>
                  <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">User ID</label>
                      <input 
                        type="text" 
                        value={user._id?.substring(0, 8).toUpperCase()}
                        className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold text-slate-500" 
                        disabled 
                      />
                  </div>
                </div>
                
                <h3 className="text-xl font-black uppercase mt-10 mb-8 flex items-center gap-3">
                   <Layers size={24} className="text-primary" /> Professional Links
                </h3>
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <Users className="text-slate-400" />
                      <input 
                        type="url" 
                        value={formData.linkedin}
                        onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                        className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-sm font-bold focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                        placeholder="LinkedIn URL" 
                      />
                   </div>
                   <div className="flex items-center gap-4">
                      <Code className="text-slate-400" />
                      <input 
                        type="url" 
                        value={formData.github}
                        onChange={(e) => setFormData({...formData, github: e.target.value})}
                        className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-sm font-bold focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                        placeholder="GitHub URL" 
                      />
                   </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-premium mt-10 py-4 px-10 text-xs"
                >
                   <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </form>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bento-card bg-white p-8 border-slate-200 text-center">
              <div className="w-24 h-24 bg-slate-900 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white text-3xl font-black border-4 border-white shadow-xl shadow-slate-200 overflow-hidden">
                 {user.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" /> : user.name.charAt(0)}
              </div>
              <button className="text-[10px] font-black uppercase text-primary tracking-widest hover:underline cursor-not-allowed opacity-50">Change Avatar (Soon)</button>
           </div>

           <div className="bento-card bg-white p-8 border-slate-200">
              <h3 className="text-lg font-black uppercase mb-6 tracking-tight flex items-center gap-2">
                <ShieldCheck size={20} className="text-slate-900" /> Security
              </h3>
              
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">New Password</label>
                    <input 
                      type="password" 
                      value={passwords.newPassword}
                      onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-sm font-bold focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                      required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Confirm Password</label>
                    <input 
                      type="password" 
                      value={passwords.confirmPassword}
                      onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-sm font-bold focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                      required
                    />
                </div>
                <button 
                  type="submit"
                  disabled={passwordLoading}
                  className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
                >
                   {passwordLoading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
