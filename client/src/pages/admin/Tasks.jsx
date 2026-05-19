import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  CheckCircle2, 
  X, 
  GraduationCap, 
  ExternalLink, 
  ClipboardList, 
  UserCheck, 
  Calendar,
  AlertCircle,
  FileText,
  Clock,
  Loader2,
  Layers
} from 'lucide-react';
import { 
  getAllTaskSubmissions, 
  createTaskByAdmin, 
  reviewTaskSubmission,
  getAllStudents,
  getAllBatches
} from '../../utils/api';
import { toast } from 'react-hot-toast';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  
  // Selected task to review
  const [selectedTask, setSelectedTask] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [grade, setGrade] = useState('A');

  // Assign Task Form
  const [assignForm, setAssignForm] = useState({
    targetType: 'student', // 'student' or 'batch'
    studentId: '',
    batchId: '',
    title: '',
    description: '',
    points: 100,
    type: 'Coding',
    deadline: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tasksRes, studentsRes, batchesRes] = await Promise.all([
        getAllTaskSubmissions(),
        getAllStudents(),
        getAllBatches()
      ]);
      setTasks(tasksRes.data);
      setStudents(studentsRes.data);
      setBatches(batchesRes.data);
      
      setAssignForm(prev => ({ 
        ...prev, 
        studentId: studentsRes.data[0]?._id || '',
        batchId: batchesRes.data[0]?._id || ''
      }));
    } catch {
      toast.error('Failed to load dashboard task context.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssignTask = async (e) => {
    e.preventDefault();
    if (!assignForm.title.trim()) {
      return toast.error('Please fill in required fields.');
    }
    if (assignForm.targetType === 'student' && !assignForm.studentId) {
      return toast.error('Please select a student.');
    }
    if (assignForm.targetType === 'batch' && !assignForm.batchId) {
      return toast.error('Please select a batch.');
    }

    try {
      const payload = {
        title: assignForm.title,
        description: assignForm.description,
        points: assignForm.points,
        type: assignForm.type,
        deadline: assignForm.deadline || undefined
      };
      if (assignForm.targetType === 'batch') {
        payload.batchId = assignForm.batchId;
      } else {
        payload.studentId = assignForm.studentId;
      }

      await createTaskByAdmin(payload);
      toast.success(assignForm.targetType === 'batch' ? 'Tasks assigned to batch successfully!' : 'Task assigned successfully!');
      setIsAssignModalOpen(false);
      setAssignForm({
        targetType: 'student',
        studentId: students[0]?._id || '',
        batchId: batches[0]?._id || '',
        title: '',
        description: '',
        points: 100,
        type: 'Coding',
        deadline: ''
      });
      fetchData();
    } catch {
      toast.error('Failed to assign task.');
    }
  };

  const handleReviewSubmission = async (e) => {
    e.preventDefault();
    try {
      await reviewTaskSubmission(selectedTask._id, { grade, feedback });
      toast.success('Submission graded successfully!');
      setIsReviewModalOpen(false);
      setSelectedTask(null);
      setFeedback('');
      setGrade('A');
      fetchData();
    } catch {
      toast.error('Failed to grade submission.');
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  const pendingSubmissions = tasks.filter(t => t.status === 'Submitted');

  return (
    <div className="space-y-10 text-zinc-900">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black uppercase tracking-tighter italic text-zinc-900">
              Task <span className="text-primary not-italic">Control</span>
           </h1>
           <p className="text-zinc-500 text-sm mt-1 font-bold">Assign tasks, track submissions, and grade student work</p>
        </div>
        <button 
          onClick={() => setIsAssignModalOpen(true)}
          className="flex items-center gap-2 px-8 py-4 bg-primary text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
        >
           <Plus size={16} /> Assign Task
        </button>
      </div>

      {/* Task stats and summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white border border-zinc-100 p-8 rounded-[2rem] flex items-center gap-6 shadow-sm">
            <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-[1.2rem] flex items-center justify-center border border-yellow-100 shadow-inner">
               <Clock size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Needs Review</p>
               <h3 className="text-3xl font-black italic text-zinc-900">{pendingSubmissions.length}</h3>
            </div>
         </div>
         <div className="bg-white border border-zinc-100 p-8 rounded-[2rem] flex items-center gap-6 shadow-sm">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-[1.2rem] flex items-center justify-center border border-green-100 shadow-inner">
               <CheckCircle2 size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Reviewed Tasks</p>
               <h3 className="text-3xl font-black italic text-zinc-900">{tasks.filter(t => t.status === 'Reviewed').length}</h3>
            </div>
         </div>
         <div className="bg-white border border-zinc-100 p-8 rounded-[2rem] flex items-center gap-6 shadow-sm">
            <div className="w-14 h-14 bg-zinc-50 text-zinc-600 rounded-[1.2rem] flex items-center justify-center border border-zinc-100 shadow-inner">
               <ClipboardList size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Total Tasks Issued</p>
               <h3 className="text-3xl font-black italic text-zinc-900">{tasks.length}</h3>
            </div>
         </div>
      </div>

      {/* Table grid of tasks/submissions */}
      <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 shadow-sm overflow-x-auto">
         <h3 className="text-xl font-black uppercase tracking-tighter italic mb-6">Student Submissions Log</h3>
         
         {tasks.length === 0 ? (
           <div className="py-20 text-center">
              <AlertCircle className="mx-auto text-zinc-300 mb-4 animate-bounce" size={48} />
              <p className="text-zinc-400 font-bold italic text-lg uppercase tracking-widest">No student tasks issued yet</p>
              <button onClick={() => setIsAssignModalOpen(true)} className="mt-4 text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:underline">Assign task now</button>
           </div>
         ) : (
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="border-b border-zinc-100">
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Student</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Task Details</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Type / Points</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Deadline</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Status</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                 {tasks.map((task) => (
                    <tr key={task._id} className="group hover:bg-zinc-50/50 transition-colors">
                       <td className="py-5">
                          <p className="font-black text-sm uppercase text-zinc-900">{task.student?.name || 'Manual Assignment'}</p>
                          <p className="text-[10px] text-zinc-400 font-bold">{task.student?.email || 'N/A'}</p>
                       </td>
                       <td className="py-5">
                          <p className="font-bold text-sm text-zinc-800">{task.title}</p>
                          <p className="text-xs text-zinc-500 line-clamp-1 max-w-xs">{task.description}</p>
                       </td>
                       <td className="py-5">
                          <span className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider mr-2">
                             {task.type}
                          </span>
                          <span className="text-xs font-bold text-zinc-950">{task.points} pts</span>
                       </td>
                       <td className="py-5 text-xs text-zinc-500 font-medium">
                          {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No Deadline'}
                       </td>
                       <td className="py-5">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                            task.status === 'Reviewed' 
                              ? 'bg-green-100 text-green-700'
                              : task.status === 'Submitted'
                              ? 'bg-yellow-100 text-yellow-700 animate-pulse'
                              : 'bg-zinc-100 text-zinc-500'
                          }`}>
                             {task.status}
                          </span>
                       </td>
                       <td className="py-5 text-right">
                          {task.status === 'Submitted' ? (
                             <button 
                               onClick={() => {
                                 setSelectedTask(task);
                                 setIsReviewModalOpen(true);
                               }}
                               className="px-5 py-2.5 bg-primary text-black rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-md shadow-primary/10"
                             >
                                Review
                             </button>
                          ) : task.status === 'Reviewed' ? (
                             <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center justify-end gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span> Grade: {task.submission?.grade}
                             </div>
                          ) : (
                             <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">Pending Student</span>
                          )}
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
         )}
      </div>

      {/* Assign Task Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsAssignModalOpen(false)}></div>
           <div className="relative w-full max-w-xl bg-white border border-zinc-200 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black">
                       <ClipboardList size={24} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none text-zinc-900">Assign New Task</h3>
                       <p className="text-zinc-500 text-xs font-bold mt-1 uppercase tracking-widest">Issue a learning exercise to a student</p>
                    </div>
                 </div>
                 <button onClick={() => setIsAssignModalOpen(false)} className="p-3 bg-zinc-100 text-zinc-400 hover:text-zinc-900 rounded-2xl transition-all">
                    <X size={20} />
                 </button>
              </div>

              <form onSubmit={handleAssignTask} className="space-y-5">
                 {/* Target selection tabs */}
                 <div className="grid grid-cols-2 gap-2 bg-zinc-100 p-1.5 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setAssignForm({ ...assignForm, targetType: 'student' })}
                      className={`py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${assignForm.targetType === 'student' ? 'bg-primary text-black' : 'text-zinc-500 hover:text-zinc-900'}`}
                    >
                      Single Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setAssignForm({ ...assignForm, targetType: 'batch' })}
                      className={`py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${assignForm.targetType === 'batch' ? 'bg-primary text-black' : 'text-zinc-500 hover:text-zinc-900'}`}
                    >
                      Batch Assignment
                    </button>
                 </div>

                 {assignForm.targetType === 'student' ? (
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Select Student</label>
                       <select 
                         required={assignForm.targetType === 'student'}
                         value={assignForm.studentId}
                         onChange={(e) => setAssignForm({ ...assignForm, studentId: e.target.value })}
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                       >
                         <option value="">-- Choose Student --</option>
                         {students.map(s => (
                           <option key={s._id} value={s._id}>{s.name} ({s.email})</option>
                         ))}
                       </select>
                    </div>
                 ) : (
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Select Batch</label>
                       <select 
                         required={assignForm.targetType === 'batch'}
                         value={assignForm.batchId}
                         onChange={(e) => setAssignForm({ ...assignForm, batchId: e.target.value })}
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                       >
                         <option value="">-- Choose Batch --</option>
                         {batches.map(b => (
                           <option key={b._id} value={b._id}>{b.name} ({b.students?.length || 0} members)</option>
                         ))}
                       </select>
                    </div>
                 )}

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Task Title</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                      placeholder="Build a MongoDB CRUD Application"
                      value={assignForm.title}
                      onChange={(e) => setAssignForm({ ...assignForm, title: e.target.value })}
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Task Description</label>
                    <textarea 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-600 min-h-[80px]"
                      placeholder="Write exercise details and requirements..."
                      value={assignForm.description}
                      onChange={(e) => setAssignForm({ ...assignForm, description: e.target.value })}
                    ></textarea>
                 </div>

                 <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Points</label>
                       <input 
                         type="number"
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                         value={assignForm.points}
                         onChange={(e) => setAssignForm({ ...assignForm, points: Number(e.target.value) })}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Task Type</label>
                       <select 
                         value={assignForm.type}
                         onChange={(e) => setAssignForm({ ...assignForm, type: e.target.value })}
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-950 font-bold"
                       >
                          <option value="Coding">Coding</option>
                          <option value="Quiz">Quiz</option>
                          <option value="Design">Design</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Deadline</label>
                       <input 
                         type="date"
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-600"
                         value={assignForm.deadline}
                         onChange={(e) => setAssignForm({ ...assignForm, deadline: e.target.value })}
                       />
                    </div>
                 </div>

                 <button 
                   type="submit"
                   className="w-full bg-primary text-black py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
                 >
                    Issue Task Assignment
                 </button>
              </form>
           </div>
        </div>
      )}

      {/* Review Submission Modal */}
      {isReviewModalOpen && selectedTask && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { setIsReviewModalOpen(false); setSelectedTask(null); }}></div>
           <div className="relative w-full max-w-xl bg-white border border-zinc-200 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black">
                       <UserCheck size={24} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none text-zinc-900">Review Submission</h3>
                       <p className="text-zinc-500 text-xs font-bold mt-1 uppercase tracking-widest">{selectedTask.student?.name}</p>
                    </div>
                 </div>
                 <button onClick={() => { setIsReviewModalOpen(false); setSelectedTask(null); }} className="p-3 bg-zinc-100 text-zinc-400 hover:text-zinc-900 rounded-2xl transition-all">
                    <X size={20} />
                 </button>
              </div>

              <div className="p-6 bg-zinc-50 rounded-2xl mb-6 space-y-4">
                 <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Assigned Task</p>
                    <p className="text-sm font-bold text-zinc-950">{selectedTask.title}</p>
                 </div>
                 {selectedTask.submission?.link && (
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1">Student Submission Link</p>
                       <a 
                         href={selectedTask.submission.link} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="inline-flex items-center gap-1 text-xs text-primary font-black uppercase tracking-widest hover:underline"
                       >
                          Open Workspace URL <ExternalLink size={12} />
                       </a>
                    </div>
                 )}
              </div>

              <form onSubmit={handleReviewSubmission} className="space-y-6">
                 <div className="grid grid-cols-3 gap-6 items-center">
                    <label className="col-span-1 text-[10px] font-black uppercase tracking-widest text-zinc-400">Assign Grade:</label>
                    <select 
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="col-span-2 bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest outline-none text-zinc-900"
                    >
                       <option value="A+">A+ Excellent</option>
                       <option value="A">A Great</option>
                       <option value="B">B Good</option>
                       <option value="C">C Satisfactory</option>
                       <option value="F">F Needs Improvement</option>
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Feedback Notes</label>
                    <textarea 
                      required
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-600 min-h-[100px]"
                      placeholder="Add guidance or reviewer remarks..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    ></textarea>
                 </div>

                 <button 
                   type="submit"
                   className="w-full bg-primary text-black py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
                 >
                    Submit Performance Review
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
