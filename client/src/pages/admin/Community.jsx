import React, { useEffect, useState } from 'react';
import { 
  Megaphone, 
  Plus, 
  X, 
  Loader2
} from 'lucide-react';
import { 
  getAnnouncements, 
  createAnnouncement
} from '../../utils/api';
import { toast } from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

const Community = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modals state
  const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] = useState(false);

  // Announcement Form State
  const [announceForm, setAnnounceForm] = useState({
    title: '',
    content: '',
    type: 'Global'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const annRes = await getAnnouncements();
      setAnnouncements(annRes.data);
    } catch {
      toast.error('Failed to load announcements.');
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

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-10 text-zinc-900 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black uppercase tracking-tighter italic text-zinc-900">
              Announcements <span className="text-primary not-italic">Manager</span>
           </h1>
           <p className="text-zinc-500 text-sm mt-1 font-bold">Broadcast global updates and notifications to students</p>
        </div>
        <button 
          onClick={() => setIsAddAnnouncementOpen(true)}
          className="flex items-center gap-2 px-8 py-4 bg-primary text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
        >
           <Plus size={16} /> Broadcast Update
        </button>
      </div>

      <div className="space-y-6">
         {announcements.length === 0 ? (
           <div className="py-20 text-center bg-white border border-zinc-100 border-dashed rounded-[2.5rem]">
              <Megaphone className="mx-auto text-zinc-300 mb-4 animate-bounce" size={48} />
              <p className="text-zinc-400 font-bold italic text-lg uppercase tracking-widest">No updates broadcasted yet</p>
              <button onClick={() => setIsAddAnnouncementOpen(true)} className="mt-4 text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:underline">Broadcast First Update</button>
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
    </div>
  );
};

export default Community;
