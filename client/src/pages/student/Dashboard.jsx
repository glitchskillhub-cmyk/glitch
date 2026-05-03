import React, { useState, useEffect } from 'react';
import { Zap, Target, Award, MessageSquare, ChevronRight, Clock, BookOpen, Briefcase, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getStudentStats } from '../../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getStudentStats();
        setStatsData(res.data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: "Course Progress", value: statsData?.progress || "0%", icon: Zap, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Tasks Completed", value: statsData?.tasks || "0/5", icon: Target, color: "text-green-500", bg: "bg-green-50" },
    { label: "Learning Hours", value: statsData?.learningHours || "0h", icon: Clock, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Certificates", value: statsData?.certificates || "0", icon: Award, color: "text-yellow-600", bg: "bg-yellow-50" },
  ];

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">
            Welcome back, <span className="text-primary italic">{user?.name?.split(' ')[0]}</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">You're making great progress! Keep pushing forward.</p>
        </div>
        <div className="badge-modern">
          <span></span> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bento-card bg-white p-6 flex items-center gap-5 group cursor-default">
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Course Card */}
          <div className="bento-card bg-white p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-primary/10 transition-all duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-primary shadow-xl">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">
                      {user?.isEnrolled ? "Active Program" : "Get Started"}
                    </h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {user?.isEnrolled ? "MERN Stack Engineering" : "Unlock Your Career"}
                    </p>
                  </div>
                </div>
                {user?.isEnrolled && (
                  <div className="text-right">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">
                      {statsData?.progress} Done
                    </p>
                    <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: statsData?.progress }}></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-bold mb-4">
                  {user?.isEnrolled ? "Node.js Full Stack Development" : "No Active Program Found"}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xl">
                  {user?.isEnrolled 
                    ? `Currently learning: Module 4 - Express.js Middleware & Security`
                    : "You haven't enrolled in any program yet. Complete your payment to unlock exclusive high-performance engineering courses."}
                </p>
                {user?.isEnrolled && (
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <Clock size={12} /> Last accessed: Just now
                  </div>
                )}
              </div>

              {user?.isEnrolled ? (
                <button className="btn-premium py-5 px-10 group w-full md:w-auto">
                  <span>Continue Learning</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button 
                  onClick={() => window.location.href = '/student/payments'}
                  className="btn-premium py-5 px-10 group w-full md:w-auto bg-primary text-black"
                >
                  <span>Enroll Now</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Actions / Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bento-card bg-slate-900 text-white p-8 group cursor-pointer hover:border-primary/50 transition-all">
              <Target className="text-primary mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-black uppercase mb-2">View Tasks</h3>
              <p className="text-slate-400 text-xs mb-8">You have 3 pending assignments for this week.</p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                Open Dashboard →
              </div>
            </div>
            <div className="bento-card bg-white p-8 group cursor-pointer hover:border-primary/50 transition-all">
              <Briefcase className="text-primary mb-6 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-black uppercase mb-2">Job Board</h3>
              <p className="text-slate-500 text-xs mb-8">5 new job openings match your current skill profile.</p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900">
                Browse Jobs →
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Style Column */}
        <div className="space-y-8">
          {/* Notifications / Feed */}
          <div className="bento-card bg-white p-8">
            <h3 className="text-lg font-black uppercase mb-6 tracking-tight flex items-center justify-between">
              Notifications
              <span className="w-5 h-5 bg-primary text-[10px] flex items-center justify-center rounded-full">3</span>
            </h3>
            <div className="space-y-6">
              {[
                { title: "New Assignment", time: "10m ago", desc: "Module 4 Task has been released." },
                { title: "Live Session", time: "2h ago", desc: "Mentor session recording is now available." },
                { title: "Badge Earned", time: "1d ago", desc: "You've earned the 'Code Ninja' badge!" }
              ].map((note, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-slate-100 hover:border-primary transition-colors pb-1">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-slate-200"></div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{note.title}</p>
                  <p className="text-xs font-bold text-slate-800 mb-1">{note.desc}</p>
                  <p className="text-[10px] text-slate-400">{note.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mentor Support Card */}
          <div className="bento-card bg-primary p-8 text-slate-900 premium-glow">
            <MessageSquare size={32} className="mb-6" />
            <h3 className="text-xl font-black uppercase mb-2 tracking-tight">Direct Support</h3>
            <p className="text-slate-800/80 text-xs mb-8 font-medium leading-relaxed">Stuck on a bug? Your mentor is active now. Start a discussion and get it resolved.</p>
            <button className="bg-slate-900 text-white w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
              Chat with Mentor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
