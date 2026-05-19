import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Zap, 
  Target, 
  MessageSquare, 
  Code,
  FileText,
  ExternalLink,
  Loader2,
  X
} from 'lucide-react';
import { getMyTasks, submitTask } from '../../utils/api';
import toast from 'react-hot-toast';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [submissionLink, setSubmissionLink] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getMyTasks();
      setTasks(res.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSubmit = (task) => {
    setSelectedTask(task);
    setShowSubmitModal(true);
    setSubmissionLink('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!submissionLink) {
      toast.error('Please provide a submission link');
      return;
    }

    try {
      setSubmitting(true);
      await submitTask(selectedTask._id || selectedTask.id, { link: submissionLink });
      toast.success('Task submitted successfully');
      setShowSubmitModal(false);
      fetchTasks();
    } catch (error) {
      console.error('Failed to submit task', error);
      toast.error('Failed to submit task');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'Submitted': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Reviewed': return 'bg-green-50 text-green-600 border-green-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in slide-in-from-right-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Tasks & Challenges</h1>
          <p className="text-slate-500 font-medium mt-2">Submit your work and get expert feedback.</p>
        </div>
        <div className="badge-modern">
          <span></span> {tasks.filter(t => t.status === 'Pending').length} Pending Tasks
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Task Summary */}
        <div className="lg:col-span-3 space-y-6">
          {tasks.length > 0 ? tasks.map((task, i) => (
            <div key={task._id || i} className="bento-card bg-white p-8 group hover:shadow-xl hover:shadow-slate-200/50 transition-all border-slate-200">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-slate-900 transition-all shadow-sm shrink-0">
                    {task.type === 'Coding' ? <Code size={28} /> : <FileText size={28} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-[10px] font-black bg-slate-100 px-2 py-1 rounded text-slate-500 uppercase tracking-widest">
                         {task.course?.title || 'General'}
                       </span>
                       <span className={`text-[10px] font-black px-2 py-1 rounded border uppercase tracking-widest ${getStatusStyle(task.status)}`}>{task.status}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">{task.title}</h3>
                    {task.description && <p className="text-sm text-slate-500 mb-3">{task.description}</p>}
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                       {task.deadline && (
                         <span className="flex items-center gap-1"><Clock size={14} /> {new Date(task.deadline).toLocaleDateString()}</span>
                       )}
                       <span className="flex items-center gap-1"><CheckCircle2 size={14} /> {task.points} Points</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 md:self-center">
                  {task.status === 'Pending' ? (
                    <button 
                      onClick={() => handleOpenSubmit(task)}
                      className="btn-premium py-4 px-8 text-xs whitespace-nowrap"
                    >
                      <span>Submit Solution</span>
                    </button>
                  ) : task.status === 'Reviewed' ? (
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Final Grade</p>
                       <p className="text-2xl font-black text-green-500">{task.submission?.grade || task.grade}</p>
                    </div>
                  ) : (
                    <button className="bg-slate-100 text-slate-400 py-4 px-8 rounded-xl text-xs font-bold uppercase tracking-widest cursor-default whitespace-nowrap">
                      Awaiting Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          )) : (
            <div className="bento-card bg-white p-16 text-center border-dashed border-slate-200">
               <Target size={48} className="mx-auto text-slate-200 mb-6" />
               <h3 className="text-xl font-black uppercase mb-4">No Tasks Assigned</h3>
               <p className="text-slate-500 max-w-sm mx-auto">You don't have any tasks assigned right now. Check back later or start working on your curriculum.</p>
            </div>
          )}
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

      {/* Submit Modal */}
      {showSubmitModal && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md relative shadow-2xl">
            <button 
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-black uppercase mb-2">Submit Task</h2>
            <p className="text-slate-500 text-sm mb-6">{selectedTask.title}</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Submission Link (GitHub, Drive, etc)</label>
                <input 
                  type="url" 
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="https://github.com/your-username/repo"
                  required
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                 <ExternalLink className="text-blue-500 shrink-0 mt-0.5" size={16} />
                 <p className="text-xs text-blue-700 font-medium">Make sure your link is publicly accessible so mentors can review your work.</p>
              </div>
              
              <button 
                type="submit" 
                disabled={submitting}
                className="btn-premium py-4 w-full"
              >
                <span>{submitting ? 'Submitting...' : 'Confirm Submission'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
