import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  CreditCard, 
  Camera, 
  Save,
  Shield,
  Activity,
  CheckCircle2,
  AlertCircle,
  Mail,
  Key
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'security', icon: Lock, label: 'Security' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'billing', icon: CreditCard, label: 'Billing & API' },
  ];

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Settings updated successfully! 🚀');
    }, 1000);
  };

  return (
    <div className="space-y-10 text-zinc-900">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black uppercase tracking-tighter italic text-zinc-900">
              Portal <span className="text-primary not-italic">Settings</span>
           </h1>
           <p className="text-zinc-500 text-sm mt-1 font-bold">Configure your administrative environment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Navigation */}
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

         {/* Content Area */}
         <div className="lg:col-span-3 bg-white border border-zinc-100 rounded-[2.5rem] p-10 shadow-sm min-h-[600px] flex flex-col">
            <div className="flex-1">
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
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="space-y-2">
                      <h3 className="text-xl font-black uppercase tracking-tighter italic text-zinc-900">Security Credentials</h3>
                      <p className="text-zinc-400 text-xs font-bold">Update your administrative access keys</p>
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
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-3xl">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center"><CreditCard size={20} /></div>
                         <h4 className="text-sm font-black uppercase tracking-widest text-zinc-900">Payment Gateway</h4>
                      </div>
                      <div className="space-y-4">
                         <div className="p-5 bg-white border border-zinc-200 rounded-2xl flex items-center justify-between">
                            <div>
                               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-900">Razorpay Live Status</p>
                               <p className="text-[10px] font-bold text-green-600 uppercase mt-1 flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Connected
                               </p>
                            </div>
                            <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Manage Keys</button>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="space-y-2">
                      <h3 className="text-xl font-black uppercase tracking-tighter italic text-zinc-900">Global Alerts</h3>
                      <p className="text-zinc-400 text-xs font-bold">Configure system-wide broadcast settings</p>
                   </div>
                   <div className="p-12 text-center bg-zinc-50 border border-zinc-100 border-dashed rounded-3xl">
                      <Bell className="mx-auto text-zinc-300 mb-4" size={32} />
                      <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">No active notification rules</p>
                   </div>
                </div>
              )}
            </div>

            <div className="pt-10 border-t border-zinc-100 mt-10">
               <button 
                 onClick={handleSave}
                 disabled={loading}
                 className="flex items-center gap-3 px-10 py-5 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-black transition-all shadow-xl"
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
