import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Video, FileText, Calendar, TrendingUp, LogOut, ChevronRight, Layout, Zap, PlusCircle, MessageSquare } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MentorDashboard = () => {
  const { user, logout } = useAuth();

  const stats = [
    { label: "Total Students", value: "128", icon: Users },
    { label: "Active Batches", value: "4", icon: Calendar },
    { label: "Tests Conducted", value: "12", icon: FileText },
    { label: "Avg. Progress", value: "72%", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Mentor Portal, <span className="text-primary italic">{user?.name}</span></h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Employee ID: #GM-{user?._id?.slice(-6).toUpperCase()}</p>
          </div>
          <button onClick={logout} className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest text-red-500 shadow-sm border border-slate-100 hover:bg-red-50 transition-all">
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           {stats.map((stat, i) => (
              <div key={i} className="bento-card p-8 bg-white border border-slate-100 shadow-sm">
                 <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mb-6">
                    <stat.icon size={24} />
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{stat.label}</p>
                 <h3 className="text-3xl font-black italic">{stat.value}</h3>
              </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Actions Column */}
           <div className="lg:col-span-2 space-y-8">
              <div className="bento-card p-10 bg-slate-900 text-white">
                 <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-black uppercase tracking-tight">Active Batches</h2>
                    <button className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest">
                       <PlusCircle size={14} /> Schedule New
                    </button>
                 </div>
                 
                 <div className="space-y-4">
                    {[
                      { name: "Node.js Full Stack (Batch A)", time: "Live at 7:00 PM", status: "Ready" },
                      { name: "Frontend Mastery (Batch B)", time: "Live at 8:30 PM", status: "Ready" }
                    ].map((batch, i) => (
                       <div key={i} className="flex justify-between items-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                          <div>
                             <h3 className="text-lg font-bold">{batch.name}</h3>
                             <p className="text-slate-500 text-xs mt-1">{batch.time}</p>
                          </div>
                          <button className="bg-primary text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest group-hover:scale-105 transition-transform">
                             Start Class
                          </button>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bento-card bg-white p-10">
                    <FileText className="text-primary mb-6" size={32} />
                    <h3 className="text-xl font-black uppercase mb-4">Assessments</h3>
                    <p className="text-slate-500 text-sm mb-8">Review student submissions, assign scores, and provide feedback.</p>
                    <button className="text-[10px] font-black uppercase tracking-widest text-primary">Manage Tests →</button>
                 </div>
                 <div className="bento-card bg-white p-10">
                    <Layout className="text-primary mb-6" size={32} />
                    <h3 className="text-xl font-black uppercase mb-4">Curriculum</h3>
                    <p className="text-slate-500 text-sm mb-8">Update course modules, upload videos, and manage learning resources.</p>
                    <button className="text-[10px] font-black uppercase tracking-widest text-primary">Manage Content →</button>
                 </div>
              </div>
           </div>

           {/* Quick Sidebar */}
           <div className="space-y-8">
              <div className="bento-card bg-white p-10">
                 <h3 className="text-xl font-black uppercase mb-8 tracking-tight">Recent Insights</h3>
                 <div className="space-y-6">
                    {[
                      { student: "Rahul Verma", activity: "Completed Module 4", time: "2m ago" },
                      { student: "Sanjana K.", activity: "Submitted Test #3", time: "15m ago" }
                    ].map((insight, i) => (
                       <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <p className="font-black text-xs uppercase">{insight.student}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{insight.activity}</p>
                          <p className="text-[8px] text-slate-400 mt-2">{insight.time}</p>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="bento-card bg-slate-900 p-10 text-white">
                 <MessageSquare size={32} className="mb-6 text-primary" />
                 <h3 className="text-xl font-black uppercase mb-4 tracking-tight">Announcements</h3>
                 <p className="text-slate-400 text-sm mb-8">Broadcast important updates to all your students at once.</p>
                 <button className="bg-primary text-black w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest">Create Message</button>
              </div>
           </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MentorDashboard;
