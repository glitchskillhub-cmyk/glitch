import React, { useState } from 'react';
import { 
  User, 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  Database, 
  Key, 
  Mail, 
  Save,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Platform configurations synced! 🚀');
    }, 1000);
  };

  const TabButton = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`
        flex items-center gap-4 px-8 py-4 rounded-2xl transition-all duration-300 text-left
        ${activeTab === id 
          ? 'bg-primary text-black font-black shadow-lg shadow-primary/20' 
          : 'text-zinc-500 hover:text-white hover:bg-white/5'}
      `}
    >
      <Icon size={18} />
      <span className="text-[10px] font-black uppercase tracking-widest leading-none">{label}</span>
    </button>
  );

  return (
    <div className="space-y-10 max-w-5xl">
      <div>
         <h1 className="text-4xl font-black uppercase tracking-tighter italic">
            Portal <span className="text-primary not-italic">Settings</span>
         </h1>
         <p className="text-zinc-500 text-sm mt-1 font-bold">Configure system core and security protocols</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         <div className="md:col-span-1 space-y-3">
            <TabButton id="profile" icon={User} label="Admin Profile" />
            <TabButton id="system" icon={SettingsIcon} label="System Config" />
            <TabButton id="security" icon={Shield} label="Security" />
            <TabButton id="notifications" icon={Bell} label="Notifications" />
            <TabButton id="logs" icon={Activity} label="Activity Logs" />
         </div>
    <div className="space-y-10 text-zinc-900 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black uppercase tracking-tighter italic text-zinc-900">
              Portal <span className="text-primary not-italic">Settings</span>
           </h1>
           <p className="text-zinc-500 text-sm mt-1 font-bold">Configure your administrative environment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-1 space-y-2">
            {tabs.map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300
                  ${activeTab === tab.id 
                    ? 'bg-primary text-black shadow-lg shadow-primary/20 font-black italic' 
                    : 'text-zinc-400 hover:bg-zinc-100 font-bold'}
                `}
              >
                <tab.icon size={18} />
                <span className="text-[10px] uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}
         </div>

         <div className="lg:col-span-3 bg-white border border-zinc-100 rounded-[2.5rem] p-10 shadow-sm">
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="flex items-center gap-8">
                    <div className="w-24 h-24 rounded-[2rem] bg-zinc-100 border border-zinc-200 flex items-center justify-center relative group">
                       <div className="w-full h-full rounded-[2rem] bg-white flex items-center justify-center font-black text-3xl text-primary italic border border-zinc-100 shadow-inner">T</div>
                       <button className="absolute -bottom-2 -right-2 p-3 bg-primary text-black rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all"><Camera size={16} /></button>
                    </div>
                    <div>
                       <h3 className="text-xl font-black uppercase tracking-tighter italic text-zinc-900">Tarun</h3>
                       <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-1">Root Administrator</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Full Name</label>
                       <input type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold" defaultValue="Tarun" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Email Address</label>
                       <input type="email" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold" defaultValue="admin@glitch.com" />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Bio / Admin Notes</label>
                    <textarea className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-600 min-h-[120px]" placeholder="Administrative bio..."></textarea>
                 </div>

                 <div className="pt-6 border-t border-zinc-100 flex justify-end">
                    <button className="px-10 py-4 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all shadow-lg">Save Changes</button>
                 </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="space-y-2">
                    <h3 className="text-xl font-black uppercase tracking-tighter italic text-zinc-900">Password</h3>
                    <p className="text-zinc-400 text-xs font-bold">Update your administrative credentials</p>
                 </div>

                 <div className="space-y-6 max-w-md">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Current Password</label>
                       <input type="password" placeholder="••••••••" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">New Password</label>
                       <input type="password" placeholder="••••••••" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900" />
                    </div>
                 </div>

                 <div className="pt-6 border-t border-zinc-100">
                    <button className="px-10 py-4 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all shadow-lg">Update Password</button>
                 </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-3xl">
                    <div className="flex items-center gap-4 mb-6">
                       <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center"><CreditCard size={20} /></div>
                       <h4 className="text-sm font-black uppercase tracking-widest text-zinc-900">Payment Integration</h4>
                    </div>
                    <div className="space-y-4">
                       <div className="flex items-center gap-3">
                          <Key size={16} className="text-zinc-500" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-white">Razorpay Integration</p>
                       </div>
                       <div className="space-y-3">
                          <input type="password" placeholder="Key ID: rzp_test_..." className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-xs focus:border-primary transition-all outline-none font-mono" />
                          <input type="password" placeholder="Key Secret: ••••••••••••••••" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-xs focus:border-primary transition-all outline-none font-mono" />
                       </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                       <div className="flex items-center gap-3">
                          <Mail size={16} className="text-zinc-500" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-white">SMTP Mail Server</p>
                       </div>
                       <input type="text" placeholder="Server: smtp.gmail.com" className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-xs focus:border-primary transition-all outline-none" />
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="flex items-center gap-4 mb-10">
                    <Activity size={24} className="text-primary" />
                    <div>
                       <h3 className="text-xl font-black uppercase tracking-tighter italic">Audit Logs</h3>
                       <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Track all administrative changes</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    {[
                      { type: 'Update', msg: 'Updated course price for Node.js Full Stack', user: 'Tarun', time: '10 mins ago', icon: CheckCircle2, color: 'text-green-500' },
                      { type: 'Auth', msg: 'New admin login detected from 192.168.1.1', user: 'System', time: '1 hour ago', icon: Shield, color: 'text-primary' },
                      { type: 'Delete', msg: 'Deleted student record: STU_8291', user: 'Tarun', time: '3 hours ago', icon: AlertCircle, color: 'text-red-500' },
                    ].map((log, i) => (
                      <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                         <div className="flex items-center gap-4">
                            <log.icon size={18} className={log.color} />
                            <div>
                               <p className="text-xs font-bold text-white leading-none">{log.msg}</p>
                               <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 mt-1.5">Action by {log.user} • {log.time}</p>
                            </div>
                         </div>
                         <button className="text-[9px] font-black uppercase tracking-widest text-zinc-600 hover:text-white">Details</button>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            <div className="flex justify-end">
               <button 
                 onClick={handleSave}
                 disabled={loading}
                 className="flex items-center gap-3 px-10 py-5 bg-primary text-black rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
               >
                  {loading ? 'Syncing...' : <><Save size={18} /> Update Configurations</>}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Settings;
