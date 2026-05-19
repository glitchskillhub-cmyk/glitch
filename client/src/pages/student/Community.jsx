import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, Megaphone, HelpCircle, ArrowRight, Loader2, X, Plus } from 'lucide-react';
import { getDoubts, getAnnouncements, createDoubt } from '../../utils/api';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../context/AuthContext';

const Community = () => {
  const { user } = useAuth();
  const [doubts, setDoubts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDoubtModal, setShowDoubtModal] = useState(false);
  const [newDoubt, setNewDoubt] = useState({ question: '', description: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [doubtsRes, announcementsRes] = await Promise.all([
        getDoubts(),
        getAnnouncements()
      ]);
      setDoubts(doubtsRes.data);
      setAnnouncements(announcementsRes.data);
    } catch (error) {
      console.error('Failed to fetch community data', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostDoubt = async (e) => {
    e.preventDefault();
    if (!newDoubt.question) return;
    try {
      setSubmitting(true);
      await createDoubt(newDoubt);
      setNewDoubt({ question: '', description: '' });
      setShowDoubtModal(false);
      fetchData(); // Refresh list
    } catch (error) {
      console.error('Failed to post doubt', error);
    } finally {
      setSubmitting(false);
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
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Community & Support</h1>
          <p className="text-slate-500 font-medium mt-2">Connect with peers and mentors.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bento-card bg-white p-10 border-slate-200 group hover:border-primary transition-all">
            <MessageSquare size={40} className="text-primary mb-8" />
            <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">Mentor Chat</h3>
            <p className="text-slate-500 text-sm mb-10 leading-relaxed">Direct 1:1 access to industry experts for doubt clearance and career guidance.</p>
            <button className="btn-premium w-full py-4 text-xs">
               <span>Start Discussion</span>
            </button>
         </div>

         <div className="bento-card bg-slate-900 text-white p-10 group hover:border-primary/50 transition-all">
            <Megaphone size={40} className="text-primary mb-8" />
            <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">Announcements</h3>
            <p className="text-slate-400 text-sm mb-10 leading-relaxed">
              {announcements.length > 0 
                ? `${announcements.length} new announcements` 
                : 'Stay updated with the latest batch schedules, events, and job drives.'}
            </p>
            <button className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-2">
               View Channel <ArrowRight size={14} />
            </button>
         </div>

         <div className="bento-card bg-white p-10 border-slate-200 group hover:border-primary transition-all">
            <HelpCircle size={40} className="text-primary mb-8" />
            <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">Doubt Section</h3>
            <p className="text-slate-500 text-sm mb-10 leading-relaxed">Browse through previously asked questions or post your own for community help.</p>
            <button onClick={() => setShowDoubtModal(true)} className="btn-premium w-full py-4 text-xs">
               <span>Ask Question</span>
            </button>
         </div>
      </div>

      {/* Announcements List */}
      {announcements.length > 0 && (
        <div className="bento-card bg-white p-10 border-slate-200">
           <h3 className="text-xl font-black uppercase mb-8 flex items-center gap-3">
              <Megaphone size={24} className="text-primary" /> Latest Announcements
           </h3>
           <div className="space-y-6">
              {announcements.map((ann, i) => (
                 <div key={ann._id || i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                       <h4 className="text-lg font-bold text-slate-900">{ann.title}</h4>
                       <span className="text-[10px] font-black text-slate-400 uppercase bg-slate-200 px-3 py-1 rounded-full">{ann.type}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">{ann.content}</p>
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>By {ann.author?.name || 'Admin'}</span>
                      <span>{ann.createdAt ? formatDistanceToNow(new Date(ann.createdAt), { addSuffix: true }) : 'Recently'}</span>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      )}

      {/* Doubts List */}
      <div className="bento-card bg-white p-10 border-slate-200">
         <h3 className="text-xl font-black uppercase mb-8 flex items-center gap-3">
            <Users size={24} className="text-primary" /> Recent Peer Activity
         </h3>
         <div className="space-y-6">
            {doubts.length > 0 ? doubts.map((doubt, i) => (
               <div key={doubt._id || i} className="flex items-start justify-between p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 overflow-hidden">
                       {doubt.student?.avatar ? (
                         <img src={doubt.student.avatar} alt={doubt.student.name} className="w-full h-full object-cover" />
                       ) : (
                         doubt.student?.name?.charAt(0) || 'U'
                       )}
                     </div>
                     <div>
                        <p className="text-sm font-bold text-slate-900 mb-1">{doubt.student?.name} <span className="font-medium text-slate-400">asked a question</span></p>
                        <p className="text-base font-semibold text-slate-800 mb-2">{doubt.question}</p>
                        {doubt.description && <p className="text-sm text-slate-500 mb-4">{doubt.description}</p>}
                        
                        {/* Answers preview */}
                        {doubt.answers && doubt.answers.length > 0 && (
                          <div className="mt-4 pl-4 border-l-2 border-primary/30">
                            <p className="text-xs font-bold text-slate-900 mb-1">{doubt.answers[0].user?.name} <span className="text-primary font-black uppercase tracking-widest text-[10px]">({doubt.answers[0].user?.role})</span></p>
                            <p className="text-sm text-slate-600">{doubt.answers[0].answer}</p>
                            {doubt.answers.length > 1 && (
                              <button className="text-[10px] font-black uppercase text-primary mt-2">View all {doubt.answers.length} answers</button>
                            )}
                          </div>
                        )}
                        {(!doubt.answers || doubt.answers.length === 0) && (
                           <button className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center gap-1 mt-2">
                             <Plus size={12} /> Add Answer
                           </button>
                        )}
                     </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase whitespace-nowrap">
                      {doubt.createdAt ? formatDistanceToNow(new Date(doubt.createdAt), { addSuffix: true }) : 'Just now'}
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${doubt.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {doubt.status || 'Open'}
                    </span>
                  </div>
               </div>
            )) : (
              <div className="text-center py-10">
                <HelpCircle size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-500">No doubts posted yet. Be the first to ask!</p>
              </div>
            )}
         </div>
      </div>

      {/* Modal for asking question */}
      {showDoubtModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl relative shadow-2xl">
            <button 
              onClick={() => setShowDoubtModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-black uppercase mb-2">Ask a Question</h2>
            <p className="text-slate-500 text-sm mb-8">Get help from mentors and fellow students.</p>
            
            <form onSubmit={handlePostDoubt} className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Question Title</label>
                <input 
                  type="text" 
                  value={newDoubt.question}
                  onChange={(e) => setNewDoubt({...newDoubt, question: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="e.g. How to connect MongoDB to Express?"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Details</label>
                <textarea 
                  value={newDoubt.description}
                  onChange={(e) => setNewDoubt({...newDoubt, description: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all h-32 resize-none"
                  placeholder="Provide more context, code snippets, or error messages..."
                ></textarea>
              </div>
              
              <div className="flex justify-end pt-4">
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="btn-premium py-3 px-8"
                >
                  <span>{submitting ? 'Posting...' : 'Post Question'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
