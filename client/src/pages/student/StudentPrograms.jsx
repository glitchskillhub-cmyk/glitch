import React, { useState, useEffect } from 'react';
import { Play, Rocket, Star, BookOpen, Clock, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getMyEnrollments } from '../../utils/api';

const StudentPrograms = () => {
  const [activePrograms, setActivePrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await getMyEnrollments();
        setActivePrograms(res.data);
      } catch (error) {
        console.error("Failed to fetch programs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const upcomingPrograms = [
    { title: "DevOps & Cloud", icon: Rocket, status: "Coming Soon" },
    { title: "Data Science", icon: Star, status: "Under Development" }
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
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">My Programs</h1>
          <p className="text-slate-500 font-medium mt-2">Continue your learning journey.</p>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="space-y-6">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
          Active Enrollments
        </h2>
        
        {activePrograms.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {activePrograms.map((program, i) => (
              <div key={i} className="bento-card bg-white flex flex-col md:flex-row gap-10 p-10 border-slate-200 group">
                <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden relative shadow-lg">
                  <img src={program.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="program" />
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                     <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-slate-900 shadow-xl">
                        <Play size={24} fill="currentColor" />
                     </div>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{program.title}</h3>
                  <div className="space-y-6 mb-10">
                     <div className="flex justify-between items-end mb-2">
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">Progress: {program.progress}%</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target: Completion by June</p>
                     </div>
                     <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${program.progress}%` }}></div>
                     </div>
                     <p className="text-xs font-bold text-slate-500 italic">
                       Next up: <span className="text-slate-900 not-italic">{program.nextLesson}</span>
                     </p>
                  </div>
                  <Link to="/student/curriculum" className="btn-premium py-5 px-10 self-start group">
                    <span>Continue Learning</span>
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bento-card bg-white p-16 text-center border-dashed border-slate-200">
            <BookOpen size={48} className="mx-auto text-slate-200 mb-6" />
            <h3 className="text-xl font-black uppercase mb-4">No Active Programs</h3>
            <p className="text-slate-500 mb-10 max-w-sm mx-auto">You haven't enrolled in any program yet. Enroll now to start your high-performance career journey.</p>
            <Link to="/student/payments" className="btn-premium py-4 px-10">
               <span>Browse All Programs</span>
            </Link>
          </div>
        )}
      </div>

      {/* Upcoming */}
      <div className="space-y-6 pt-10">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
          Coming Soon
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {upcomingPrograms.map((program, i) => (
             <div key={i} className="bento-card bg-slate-50 border-dashed border-slate-200 p-8 flex items-center gap-6 grayscale opacity-60">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
                   <program.icon size={32} />
                </div>
                <div>
                   <h3 className="text-lg font-black text-slate-900 mb-1">{program.title}</h3>
                   <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{program.status}</span>
                </div>
                <button className="ml-auto bg-white border border-slate-200 text-slate-400 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-slate-900 hover:border-primary transition-all">Notify Me</button>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default StudentPrograms;
