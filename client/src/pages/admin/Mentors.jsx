import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  GraduationCap, 
  ShieldCheck, 
  MoreHorizontal, 
  BookOpen, 
  Mail, 
  Phone,
  Trash2,
  Edit,
  X,
  UserPlus
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Mentors = () => {
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Mock data for now as we haven't implemented getMentors API
  const mentors = [
    { _id: '1', name: 'Dr. Ramesh Babu', email: 'ramesh@glitch.com', phone: '9848012345', expertise: 'Full Stack Architecture', status: 'Active' },
    { _id: '2', name: 'Sneha Reddy', email: 'sneha@glitch.com', phone: '9848054321', expertise: 'UI/UX Design Systems', status: 'Active' },
    { _id: '3', name: 'Kiran Kumar', email: 'kiran@glitch.com', phone: '9848099887', expertise: 'DevOps & Cloud', status: 'On Leave' },
  ];

  return (
    <div className="space-y-10 text-zinc-900">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black uppercase tracking-tighter italic text-zinc-900">
              Expert <span className="text-primary not-italic">Mentors</span>
           </h1>
           <p className="text-zinc-500 text-sm mt-1 font-bold">Manage teaching staff and course assignments</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-8 py-4 bg-primary text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
        >
           <UserPlus size={16} /> Add Mentor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mentors.map((mentor) => (
          <div key={mentor._id} className="bg-white border border-zinc-100 rounded-[2.5rem] p-10 group hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl">
             <div className="flex justify-between items-start mb-10">
                <div className="w-20 h-20 rounded-[2rem] bg-zinc-50 p-1 flex items-center justify-center border border-zinc-100 group-hover:border-primary/50 transition-all shadow-inner">
                   <div className="w-full h-full bg-white rounded-[2rem] flex items-center justify-center font-black text-2xl text-primary italic border border-zinc-100">
                      {mentor.name.charAt(0)}
                   </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider ${mentor.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                   {mentor.status}
                </div>
             </div>

             <div className="space-y-6">
                <div>
                   <h3 className="text-xl font-black uppercase tracking-tighter italic text-zinc-900 leading-none mb-2">{mentor.name}</h3>
                   <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">{mentor.expertise}</p>
                </div>

                <div className="space-y-3">
                   <div className="flex items-center gap-3 text-zinc-500">
                      <Mail size={14} className="text-zinc-400" />
                      <span className="text-xs font-medium">{mentor.email}</span>
                   </div>
                   <div className="flex items-center gap-3 text-zinc-500">
                      <Phone size={14} className="text-zinc-400" />
                      <span className="text-xs font-bold font-mono">{mentor.phone}</span>
                   </div>
                </div>

                <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
                   <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-primary transition-all">
                      <BookOpen size={14} /> Courses
                   </button>
                   <div className="flex items-center gap-2">
                      <button className="p-2.5 bg-zinc-50 text-zinc-400 rounded-xl hover:text-primary hover:bg-primary/10 transition-all border border-zinc-100"><Edit size={16} /></button>
                      <button className="p-2.5 bg-zinc-50 text-zinc-400 rounded-xl hover:text-red-500 hover:bg-red-500/10 transition-all border border-zinc-100"><Trash2 size={16} /></button>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Add Mentor Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
           <div className="relative w-full max-w-xl bg-white border border-zinc-200 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black">
                       <GraduationCap size={24} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none text-zinc-900">New Faculty</h3>
                       <p className="text-zinc-500 text-xs font-bold mt-1 uppercase tracking-widest">Enroll a new mentor into the hub</p>
                    </div>
                 </div>
                 <button onClick={() => setIsAddModalOpen(false)} className="p-3 bg-zinc-100 text-zinc-400 hover:text-zinc-900 rounded-2xl transition-all">
                    <X size={20} />
                 </button>
              </div>

              <form className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Full Name</label>
                       <input type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900" placeholder="Sneha Reddy" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Expertise</label>
                       <input type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900" placeholder="UI/UX Specialist" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Official Email</label>
                    <input type="email" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900" placeholder="faculty@glitch.com" />
                 </div>
                 
                 <div className="pt-6">
                    <button 
                      type="button"
                      onClick={() => { toast.success('Mentor application initialized!'); setIsAddModalOpen(false); }}
                      className="w-full bg-primary text-black py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
                    >
                       Initialize Staff
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Mentors;
