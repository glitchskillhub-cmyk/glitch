import React, { useState, useEffect } from 'react';
import { Megaphone, Loader2 } from 'lucide-react';
import { getAnnouncements } from '../../utils/api';
import { formatDistanceToNow } from 'date-fns';

const Community = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAnnouncements();
      setAnnouncements(res.data);
    } catch (error) {
      console.error('Failed to fetch announcements', error);
    } finally {
      setLoading(false);
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
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Community & Announcements</h1>
          <p className="text-slate-500 font-medium mt-2">Stay updated with the latest batch schedules, events, and job drives.</p>
        </div>
      </div>

      {/* Announcements List */}
      <div className="bento-card bg-white p-10 border-slate-200 shadow-sm">
         <h3 className="text-xl font-black uppercase mb-8 flex items-center gap-3">
            <Megaphone size={24} className="text-primary" /> Latest Announcements
         </h3>
         {announcements.length === 0 ? (
           <div className="text-center py-16">
              <Megaphone className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-400 font-bold italic text-sm uppercase tracking-widest">No announcements posted yet</p>
           </div>
         ) : (
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
         )}
      </div>
    </div>
  );
};

export default Community;
