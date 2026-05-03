import React from 'react';
import { Users, MessageSquare, Megaphone, HelpCircle, ArrowRight } from 'lucide-react';

const Community = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Community & Support</h1>
          <p className="text-slate-500 font-medium mt-2">Connect with peers and mentors.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bento-card bg-white p-10 border-slate-200 group hover:border-primary transition-all">
            <MessageSquare size={40} className="text-primary mb-8" />
            <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">Mentor Chat</h3>
            <p className="text-slate-500 text-sm mb-10 leading-relaxed">Direct 1:1 access to industry experts for doubt clearance and career guidance.</p>
            <button className="btn-premium w-full py-4 text-xs">
               <span>Start Discussion</span>
            </button>
         </div>

         <div className="bento-card bg-slate-900 text-white p-10 group hover:border-primary/50 transition-all">
            <Megaphone size={40} className="text-primary mb-8" />
            <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">Announcements</h3>
            <p className="text-slate-400 text-sm mb-10 leading-relaxed">Stay updated with the latest batch schedules, events, and job drives.</p>
            <button className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2">
               View Channel <ArrowRight size={14} />
            </button>
         </div>

         <div className="bento-card bg-white p-10 border-slate-200 group hover:border-primary transition-all">
            <HelpCircle size={40} className="text-primary mb-8" />
            <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">Doubt Section</h3>
            <p className="text-slate-500 text-sm mb-10 leading-relaxed">Browse through previously asked questions or post your own for community help.</p>
            <button className="btn-premium w-full py-4 text-xs">
               <span>Ask Question</span>
            </button>
         </div>
      </div>

      <div className="bento-card bg-white p-10 border-slate-200">
         <h3 className="text-xl font-black uppercase mb-8 flex items-center gap-3">
            <Users size={24} className="text-primary" /> Recent Peer Activity
         </h3>
         <div className="space-y-6">
            {[1, 2, 3].map((_, i) => (
               <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                     <div>
                        <p className="text-sm font-bold text-slate-900">Anjali Sharma <span className="font-medium text-slate-400">posted a new doubt</span></p>
                        <p className="text-xs text-slate-500">"How to optimize MongoDB aggregation for large datasets?"</p>
                     </div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase">2h ago</span>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Community;
