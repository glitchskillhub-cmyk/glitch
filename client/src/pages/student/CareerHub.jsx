import React, { useState, useEffect } from 'react';
import { Briefcase, Target, Zap, ExternalLink, Search, Rocket, FileText, Loader2, CheckCircle2 } from 'lucide-react';
import { getJobs, applyJob } from '../../utils/api';
import toast from 'react-hot-toast';

const CareerHub = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyingTo, setApplyingTo] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJobs();
        setJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    if (appliedJobs.has(jobId)) return;
    try {
      setApplyingTo(jobId);
      await applyJob(jobId);
      toast.success('Successfully applied to job!');
      setAppliedJobs(new Set([...appliedJobs, jobId]));
    } catch (error) {
      console.error("Failed to apply", error);
      toast.error(error.response?.data?.message || 'Failed to apply');
    } finally {
      setApplyingTo(null);
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
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Career Hub</h1>
          <p className="text-slate-500 font-medium mt-2">Exclusive job opportunities for Glitch students.</p>
        </div>
        <div className="flex items-center gap-4">
           <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg">
             <FileText size={16} /> Resume Builder
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm">
             <Search size={20} className="text-slate-400" />
             <input type="text" placeholder="Search by role, company or skills..." className="bg-transparent border-none outline-none w-full text-sm font-medium" />
           </div>

           <div className="space-y-4">
              {jobs.map((job, i) => (
                <div key={i} className="bento-card bg-white p-8 group hover:border-primary transition-all border-slate-200">
                  <div className="flex justify-between items-start mb-6">
                     <div className="flex gap-4">
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-primary transition-all shadow-sm">
                           <Briefcase size={24} />
                        </div>
                        <div>
                           <h3 className="text-xl font-black text-slate-900 mb-1">{job.title}</h3>
                           <p className="text-sm font-bold text-slate-500">{job.company}</p>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        {job.tags.map((tag, j) => (
                          <span key={j} className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest">{tag}</span>
                        ))}
                     </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-6 mb-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
                     <span className="flex items-center gap-1.5"><Target size={14} /> {job.location}</span>
                     <span className="flex items-center gap-1.5"><Zap size={14} /> {job.salary}</span>
                  </div>
                  <div className="flex gap-4">
                     {appliedJobs.has(job._id || i) ? (
                        <button className="btn-premium flex-1 py-4 text-xs bg-green-500 hover:bg-green-600 text-white shadow-green-500/20" disabled>
                           <span className="flex items-center gap-2 justify-center"><CheckCircle2 size={16} /> Applied</span>
                        </button>
                     ) : (
                        <button 
                          onClick={() => handleApply(job._id || i)} 
                          disabled={applyingTo === (job._id || i)}
                          className="btn-premium flex-1 py-4 text-xs"
                        >
                           <span>{applyingTo === (job._id || i) ? 'Applying...' : 'Apply Now'}</span>
                        </button>
                     )}
                     <button className="p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors text-slate-400">
                        <ExternalLink size={18} />
                     </button>
                  </div>
                </div>
              ))}
           </div>
        </div>

        <div className="space-y-8">
           <div className="bento-card bg-primary p-8 text-slate-900">
              <Rocket className="mb-6" size={32} />
              <h3 className="text-xl font-black uppercase mb-4 tracking-tight">Placement Cell</h3>
              <p className="text-slate-800/80 text-xs mb-8 font-medium leading-relaxed">
                Connect with our dedicated placement team for mock interviews and referral support.
              </p>
              <button className="bg-slate-900 text-white w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest">
                 Book a Session
              </button>
           </div>

           <div className="bento-card bg-white p-8 border-slate-200">
              <h3 className="text-lg font-black uppercase mb-6 tracking-tight">Quick Resources</h3>
              <div className="space-y-4">
                 {[
                   "Coding Interview Patterns",
                   "MNC Portfolio Templates",
                   "LinkedIn Optimization Guide",
                   "System Design Basics"
                 ].map((res, i) => (
                   <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform"></div>
                      <span className="text-xs font-bold text-slate-700">{res}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CareerHub;
