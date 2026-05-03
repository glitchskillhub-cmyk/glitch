import React from 'react';
import { User, ShieldCheck, Bell, Layers, Mail, Target, Users, Code, Zap } from 'lucide-react';

const Settings = () => {
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Full Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-sm font-bold" defaultValue="Tarun Kumar" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Address</label>
                    <input type="email" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-sm font-bold" defaultValue="tarun@example.com" disabled />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Phone Number</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-sm font-bold" defaultValue="+91 98765 43210" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Student ID</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-sm font-bold" defaultValue="#GS-894980" disabled />
                 </div>
              </div>
              <button className="btn-premium mt-10 py-4 px-10 text-xs">
                 <span>Save Changes</span>
              </button>
           </div>

           <div className="bento-card bg-white p-10 border-slate-200">
              <h3 className="text-xl font-black uppercase mb-8 flex items-center gap-3">
                 <Layers size={24} className="text-primary" /> Professional Links
              </h3>
              <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <Users className="text-slate-400" />
                    <input type="text" className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-sm font-bold" placeholder="LinkedIn URL" />
                 </div>
                 <div className="flex items-center gap-4">
                    <Code className="text-slate-400" />
                    <input type="text" className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-sm font-bold" placeholder="GitHub URL" />
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bento-card bg-white p-8 border-slate-200 text-center">
              <div className="w-24 h-24 bg-slate-900 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white text-3xl font-black border-4 border-white shadow-xl shadow-slate-200">
                 T
              </div>
              <button className="text-[10px] font-black uppercase text-primary tracking-widest hover:underline">Change Avatar</button>
           </div>

           <div className="bento-card bg-white p-8 border-slate-200">
              <h3 className="text-lg font-black uppercase mb-6 tracking-tight">Security</h3>
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-all group">
                 <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-slate-400 group-hover:text-primary" />
                    <span className="text-xs font-bold">Change Password</span>
                 </div>
                 <span className="text-slate-300">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-all group">
                 <div className="flex items-center gap-3">
                    <Bell size={18} className="text-slate-400 group-hover:text-primary" />
                    <span className="text-xs font-bold">Notifications</span>
                 </div>
                 <span className="text-slate-300">→</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
