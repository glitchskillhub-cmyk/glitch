import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Zap, 
  Target, 
  MessageSquare, 
  Code,
  FileText,
  ExternalLink
} from 'lucide-react';

const Tasks = () => {
  const tasks = [
    {
      id: "T-8901",
      title: "Express.js REST API Challenge",
      module: "Module 4",
      deadline: "Friday, May 8",
      status: "Pending",
      type: "Coding",
      points: 100
    },
    {
      id: "T-8902",
      title: "React State Management Quiz",
      module: "Module 3",
      deadline: "Completed",
      status: "Reviewed",
      grade: "A+",
      type: "Quiz",
      points: 50
    },
    {
      id: "T-8903",
      title: "UI Design Portfolio Page",
      module: "Module 2",
      deadline: "Completed",
      status: "Submitted",
      type: "Design",
      points: 150
    }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'Submitted': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Reviewed': return 'bg-green-50 text-green-600 border-green-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="space-y-10 animate-in slide-in-from-right-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Tasks & Challenges</h1>
          <p className="text-slate-500 font-medium mt-2">Submit your work and get expert feedback.</p>
        </div>
        <div className="badge-modern">
          <span></span> 2 Pending Tasks
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Task Summary */}
        <div className="lg:col-span-3 space-y-6">
          {tasks.map((task, i) => (
            <div key={i} className="bento-card bg-white p-8 group hover:shadow-xl hover:shadow-slate-200/50 transition-all border-slate-200">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-slate-900 transition-all shadow-sm shrink-0">
                    {task.type === 'Coding' ? <Code size={28} /> : task.type === 'Quiz' ? <FileText size={28} /> : <FileText size={28} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-[10px] font-black bg-slate-100 px-2 py-1 rounded text-slate-500 uppercase tracking-widest">{task.id}</span>
                       <span className={`text-[10px] font-black px-2 py-1 rounded border uppercase tracking-widest ${getStatusStyle(task.status)}`}>{task.status}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">{task.title}</h3>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                       <span className="flex items-center gap-1"><Clock size={14} /> {task.deadline}</span>
                       <span className="flex items-center gap-1"><CheckCircle2 size={14} /> {task.points} Points</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 md:self-center">
                  {task.status === 'Pending' ? (
                    <button className="btn-premium py-4 px-8 text-xs whitespace-nowrap">
                      <span>Submit Solution</span>
                    </button>
                  ) : task.status === 'Reviewed' ? (
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Final Grade</p>
                       <p className="text-2xl font-black text-green-500">{task.grade}</p>
                    </div>
                  ) : (
                    <button className="bg-slate-100 text-slate-400 py-4 px-8 rounded-xl text-xs font-bold uppercase tracking-widest cursor-default">
                      Awaiting Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
           <div className="bento-card bg-slate-900 text-white p-8">
              <Zap className="text-primary mb-6" size={32} />
              <h3 className="text-xl font-black uppercase mb-4">Friday Tasks</h3>
              <p className="text-slate-400 text-xs mb-8 leading-relaxed">
                Every Friday, we release a major coding challenge that simulates MNC interview problems. Don't skip these!
              </p>
              <div className="bg-slate-800 rounded-xl p-4 flex items-center justify-between border border-slate-700">
                 <div>
                   <p className="text-[10px] font-black text-primary uppercase">Next Release</p>
                   <p className="text-sm font-bold">This Friday, 9:00 AM</p>
                 </div>
                 <Clock className="text-slate-500" size={20} />
              </div>
           </div>

           <div className="bento-card bg-white p-8 border-slate-200">
              <h3 className="text-lg font-black uppercase mb-6 tracking-tight">Leaderboard</h3>
              <div className="space-y-4">
                 {[
                   { name: "Tarun K.", points: 1250, rank: 1 },
                   { name: "Sneha R.", points: 1180, rank: 2 },
                   { name: "Arjun V.", points: 1120, rank: 3 }
                 ].map((user, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <span className="text-xs font-black text-slate-300 w-4">{user.rank}</span>
                         <span className="text-sm font-bold text-slate-700">{user.name}</span>
                      </div>
                      <span className="text-xs font-black text-slate-900">{user.points} XP</span>
                   </div>
                 ))}
                 <button className="w-full mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">View All →</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
