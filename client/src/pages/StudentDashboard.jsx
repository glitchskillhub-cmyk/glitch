import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, GraduationCap, Briefcase, Award, MessageSquare, User, LogOut, ChevronRight, Layout, Zap, Target } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const StudentDashboard = () => {
  const { user, logout } = useAuth();

  const activePrograms = [
    { title: "Node.js Full Stack", progress: 65, status: "Ongoing" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Welcome Back, <span className="text-primary italic">{user?.name}</span></h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Student ID: #GS-{user?._id?.slice(-6).toUpperCase()}</p>
          </div>
          <button onClick={logout} className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest text-red-500 shadow-sm border border-slate-100 hover:bg-red-50 transition-all">
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Progress Column */}
           <div className="lg:col-span-2 space-y-8">
              {/* Active Courses */}
              <div className="bento-card p-10 bg-white">
                 <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black">
                       <Zap size={24} />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">Active Programs</h2>
                 </div>
                 
                 {activePrograms.map((course, i) => (
                    <div key={i} className="group">
                       <div className="flex justify-between items-end mb-4">
                          <h3 className="text-xl font-black">{course.title}</h3>
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary">{course.progress}% Completed</span>
                       </div>
                       <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-8">
                          <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                       </div>
                       <button className="btn-premium w-full py-4 group">
                          <span>Continue Learning</span>
                          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                       </button>
                    </div>
                 ))}
              </div>

              {/* Roadmap Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bento-card bg-slate-900 text-white p-10">
                    <Target className="text-primary mb-6" size={32} />
                    <h3 className="text-xl font-black uppercase mb-4">Learning Path</h3>
                    <p className="text-slate-400 text-sm mb-8">Follow your personalized road map to become a production-grade engineer.</p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                       <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div> 3 Modules Remaining
                    </div>
                 </div>
                 <div className="bento-card bg-white p-10">
                    <Award className="text-primary mb-6" size={32} />
                    <h3 className="text-xl font-black uppercase mb-4">Certificates</h3>
                    <p className="text-slate-500 text-sm mb-8">Download your verified certificates and share them on LinkedIn.</p>
                    <button className="text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">View All Certificates →</button>
                 </div>
              </div>
           </div>

           {/* Sidebar Column */}
           <div className="space-y-8">
              <div className="bento-card bg-white p-10">
                 <h3 className="text-xl font-black uppercase mb-8 tracking-tight">Career Hub</h3>
                 <div className="space-y-6">
                    {[
                      { role: "Jr. Backend Dev", co: "TechCorp", pay: "6-8 LPA" },
                      { role: "Full Stack Intern", co: "InnovateX", pay: "Stipend: 20k" }
                    ].map((job, i) => (
                       <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary transition-colors cursor-pointer">
                          <p className="font-black text-sm uppercase">{job.role}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{job.co} • {job.pay}</p>
                       </div>
                    ))}
                    <button className="w-full py-4 border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">Browse Job Board</button>
                 </div>
              </div>

              <div className="bento-card bg-primary p-10 text-black">
                 <MessageSquare size={32} className="mb-6" />
                 <h3 className="text-xl font-black uppercase mb-4 tracking-tight">Mentor Support</h3>
                 <p className="text-black/70 text-sm mb-8">Got a doubt? Reach out to your MNC mentors directly.</p>
                 <button className="bg-black text-white w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest">Start Discussion</button>
              </div>
           </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
