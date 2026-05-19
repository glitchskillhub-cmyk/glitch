import React, { useEffect, useState } from 'react';
import { 
  Megaphone, 
  HelpCircle, 
  MessageSquare,
  Plus, 
  X, 
  CheckCircle,
  Clock, 
  AlertCircle,
  Send,
  Loader2
} from 'lucide-react';
import { 
  getAnnouncements, 
  createAnnouncement, 
  getDoubts, 
  answerDoubt 
} from '../../utils/api';
import { toast } from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

const Community = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('announcements'); // 'announcements' or 'doubts'
  
  // Modals state
  const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] = useState(false);
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  
  // Answer Doubt Form
  const [answerText, setAnswerText] = useState('');

  // Announcement Form State
  const [announceForm, setAnnounceForm] = useState({
    title: '',
    content: '',
    type: 'Global'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [annRes, doubtsRes] = await Promise.all([
        getAnnouncements(),
        getDoubts()
      ]);
      setAnnouncements(annRes.data);
      setDoubts(doubtsRes.data);
    } catch {
      toast.error('Failed to load community resources.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    if (!announceForm.title.trim() || !announceForm.content.trim()) {
      return toast.error('Please enter all details.');
    }
    try {
      await createAnnouncement(announceForm);
      toast.success('Announcement broadcasted successfully!');
      setIsAddAnnouncementOpen(false);
      setAnnounceForm({ title: '', content: '', type: 'Global' });
      fetchData();
    } catch {
      toast.error('Failed to dispatch announcement.');
    }
  };

  const handleAnswerDoubt = async (e) => {
    e.preventDefault();
    if (!answerText.trim()) return;
    try {
      await answerDoubt(selectedDoubt._id, { content: answerText });
      toast.success('Reply submitted successfully!');
      setAnswerText('');
      setSelectedDoubt(null);
      fetchData();
    } catch {
      toast.error('Failed to submit answer.');
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  const unresolvedDoubts = doubts.filter(d => d.status === 'Open');

  return (
    <div className="space-y-10 text-zinc-900">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black uppercase tracking-tighter italic text-zinc-900">
              Community <span className="text-primary not-italic">Manager</span>
           </h1>
           <p className="text-zinc-500 text-sm mt-1 font-bold">Broadcast global announcements and resolve student technical doubts</p>
        </div>
        {activeTab === 'announcements' && (
          <button 
            onClick={() => setIsAddAnnouncementOpen(true)}
            className="flex items-center gap-2 px-8 py-4 bg-primary text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
          >
             <Plus size={16} /> Broadcast Update
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-zinc-100 pb-2">
         <button 
           onClick={() => setActiveTab('announcements')}
           className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-all ${
             activeTab === 'announcements' ? 'border-b-2 border-primary text-zinc-950' : 'text-zinc-400 hover:text-zinc-600'
           }`}
         >
            Global Announcements ({announcements.length})
         </button>
         <button 
           onClick={() => setActiveTab('doubts')}
           className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-all ${
             activeTab === 'doubts' ? 'border-b-2 border-primary text-zinc-950' : 'text-zinc-400 hover:text-zinc-600'
           }`}
         >
            Student Doubts ({unresolvedDoubts.length} Open)
         </button>
      </div>

      {activeTab === 'announcements' ? (
        <div className="space-y-6">
           {announcements.length === 0 ? (
             <div className="py-20 text-center bg-white border border-zinc-100 border-dashed rounded-[2.5rem]">
                <Megaphone className="mx-auto text-zinc-300 mb-4" size={48} />
                <p className="text-zinc-400 font-bold italic text-lg uppercase tracking-widest">No global updates dispatched</p>
                <button onClick={() => setIsAddAnnouncementOpen(true)} className="mt-4 text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:underline">Create update</button>
             </div>
           ) : announcements.map((ann) => (
             <div key={ann._id} className="bg-white border border-zinc-100 rounded-[2rem] p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-primary/20 transition-all">
                <div className="space-y-3 flex-1">
                   <div className="flex items-center gap-3">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
                         {ann.type} Announcement
                      </span>
                      <span className="text-[10px] text-zinc-400 font-bold">
                         {formatDistanceToNow(new Date(ann.createdAt), { addSuffix: true })}
                      </span>
                   </div>
                   <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 group-hover:text-primary transition-colors leading-tight">
                      {ann.title}
                   </h3>
                   <p className="text-zinc-600 text-xs font-medium leading-relaxed">{ann.content}</p>
                </div>
             </div>
           ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {doubts.length === 0 ? (
             <div className="col-span-full py-20 text-center bg-white border border-zinc-100 border-dashed rounded-[2.5rem]">
                <HelpCircle className="mx-auto text-zinc-300 mb-4" size={48} />
                <p className="text-zinc-400 font-bold italic text-lg uppercase tracking-widest">No doubts registered</p>
             </div>
           ) : doubts.map((doubt) => (
             <div key={doubt._id} className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 flex flex-col h-full shadow-sm hover:shadow-lg transition-all group">
                <div className="flex justify-between items-start mb-6">
                   <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                     doubt.status === 'Resolved' 
                       ? 'bg-green-100 text-green-700' 
                       : 'bg-yellow-100 text-yellow-700 animate-pulse'
                   }`}>
                      {doubt.status}
                   </span>
                   <span className="text-[10px] text-zinc-400 font-bold">
                      {formatDistanceToNow(new Date(doubt.createdAt), { addSuffix: true })}
                   </span>
                </div>

                <div className="space-y-4 flex-1">
                   <div>
                      <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">{doubt.student?.name || 'Student'}</h4>
                      <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 group-hover:text-primary transition-colors leading-snug mt-1">{doubt.title}</h3>
                   </div>
                   
                   <p className="text-xs text-zinc-600 leading-relaxed font-medium">{doubt.description}</p>
                </div>

                {doubt.answers && doubt.answers.length > 0 && (
                   <div className="mt-6 pt-4 border-t border-zinc-50 space-y-3">
                      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">Previous Replies</p>
                      {doubt.answers.map((ans, idx) => (
                         <div key={idx} className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                            <p className="text-[9px] font-bold text-zinc-400">{ans.repliedBy?.name || 'Mentor/Admin'}</p>
                            <p className="text-xs text-zinc-700 font-semibold mt-1">{ans.content}</p>
                         </div>
                      ))}
                   </div>
                )}

                {doubt.status === 'Open' && (
                  <button 
                    onClick={() => setSelectedDoubt(doubt)}
                    className="mt-6 flex items-center justify-center gap-2 py-4 bg-zinc-950 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-md"
                  >
                     Submit Solution
                  </button>
                )}
             </div>
           ))}
        </div>
      )}

      {/* Broadcast Announcement Modal */}
      {isAddAnnouncementOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsAddAnnouncementOpen(false)}></div>
           <div className="relative w-full max-w-xl bg-white border border-zinc-200 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black">
                       <Megaphone size={24} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none text-zinc-900">Broadcast Update</h3>
                       <p className="text-zinc-500 text-xs font-bold mt-1 uppercase tracking-widest">Publish instant notification to everyone</p>
                    </div>
                 </div>
                 <button onClick={() => setIsAddAnnouncementOpen(false)} className="p-3 bg-zinc-100 text-zinc-400 hover:text-zinc-900 rounded-2xl transition-all">
                    <X size={20} />
                 </button>
              </div>

              <form onSubmit={handleCreateAnnouncement} className="space-y-5">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Update Category</label>
                    <select 
                      value={announceForm.type}
                      onChange={(e) => setAnnounceForm({...announceForm, type: e.target.value})}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                    >
                       <option value="Global">Global Platform Update</option>
                       <option value="Batch">Batch Alert</option>
                       <option value="Course">Program Special</option>
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Announcement Title</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                      placeholder="Live Q&A Session Scheduled"
                      value={announceForm.title}
                      onChange={(e) => setAnnounceForm({...announceForm, title: e.target.value})}
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Body Content</label>
                    <textarea 
                      required
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-600 min-h-[120px]"
                      placeholder="Detail the update, schedules, and important links..."
                      value={announceForm.content}
                      onChange={(e) => setAnnounceForm({...announceForm, content: e.target.value})}
                    ></textarea>
                 </div>

                 <button 
                   type="submit"
                   className="w-full bg-primary text-black py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
                 >
                    Broadcast Now
                 </button>
              </form>
           </div>
        </div>
      )}

      {/* Answer Doubt Modal */}
      {selectedDoubt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedDoubt(null)}></div>
           <div className="relative w-full max-w-xl bg-white border border-zinc-200 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black">
                       <MessageSquare size={24} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none text-zinc-900">Resolve Student Doubt</h3>
                       <p className="text-zinc-500 text-xs font-bold mt-1 uppercase tracking-widest">{selectedDoubt.student?.name}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedDoubt(null)} className="p-3 bg-zinc-100 text-zinc-400 hover:text-zinc-900 rounded-2xl transition-all">
                    <X size={20} />
                 </button>
              </div>

              <div className="p-6 bg-zinc-50 rounded-2xl mb-6 space-y-2">
                 <h4 className="font-black text-sm uppercase text-zinc-800">{selectedDoubt.title}</h4>
                 <p className="text-xs text-zinc-500 font-medium">{selectedDoubt.description}</p>
              </div>

              <form onSubmit={handleAnswerDoubt} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Your Answer Solution</label>
                    <textarea 
                      required
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-600 min-h-[120px]"
                      placeholder="Write your explanation or code solution detail..."
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                    ></textarea>
                 </div>

                 <button 
                   type="submit"
                   className="w-full bg-primary text-black py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
                 >
                    Publish Resolution Reply
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Community;
