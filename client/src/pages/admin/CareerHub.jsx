import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  Briefcase, 
  Trash2, 
  X, 
  Building, 
  MapPin, 
  DollarSign, 
  ExternalLink,
  Users,
  CheckCircle,
  AlertCircle,
  Clock,
  Loader2
} from 'lucide-react';
import { 
  getJobs, 
  createJobByAdmin, 
  deleteJobByAdmin, 
  getAllJobApplications, 
  updateJobApplicationStatus 
} from '../../utils/api';
import { toast } from 'react-hot-toast';

const CareerHub = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' or 'applications'
  
  // Modals state
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);

  // Form state
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    requirements: '',
    link: '',
    type: 'Full-time'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [jobsRes, appsRes] = await Promise.all([
        getJobs(),
        getAllJobApplications()
      ]);
      setJobs(jobsRes.data);
      setApplications(appsRes.data);
    } catch {
      toast.error('Failed to load career hub resources.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    if (!jobForm.title.trim() || !jobForm.company.trim() || !jobForm.location.trim()) {
      return toast.error('Please fill in required fields.');
    }
    try {
      const requirementsArray = jobForm.requirements
        ? jobForm.requirements.split(',').map(r => r.trim()).filter(Boolean)
        : [];
      
      await createJobByAdmin({
        ...jobForm,
        requirements: requirementsArray
      });

      toast.success('Job listing published successfully!');
      setIsAddJobOpen(false);
      setJobForm({
        title: '', company: '', location: '', salary: '', description: '', requirements: '', link: '', type: 'Full-time'
      });
      fetchData();
    } catch {
      toast.error('Failed to create job listing.');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job listing?')) return;
    try {
      await deleteJobByAdmin(jobId);
      toast.success('Job listing deleted.');
      fetchData();
    } catch {
      toast.error('Failed to delete job.');
    }
  };

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      await updateJobApplicationStatus(appId, { status: newStatus });
      toast.success('Application status updated!');
      fetchData();
    } catch {
      toast.error('Failed to update status.');
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
    <div className="space-y-10 text-zinc-900">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black uppercase tracking-tighter italic text-zinc-900">
              Career Hub <span className="text-primary not-italic">Console</span>
           </h1>
           <p className="text-zinc-500 text-sm mt-1 font-bold">Manage corporate partnerships, publish job listings, and track student applications</p>
        </div>
        {activeTab === 'jobs' && (
          <button 
            onClick={() => setIsAddJobOpen(true)}
            className="flex items-center gap-2 px-8 py-4 bg-primary text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
          >
             <Plus size={16} /> Add Job Listing
          </button>
        )}
      </div>

      {/* Navigation tabs */}
      <div className="flex gap-4 border-b border-zinc-100 pb-2">
         <button 
           onClick={() => setActiveTab('jobs')}
           className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-all ${
             activeTab === 'jobs' ? 'border-b-2 border-primary text-zinc-950' : 'text-zinc-400 hover:text-zinc-600'
           }`}
         >
            Active Listings ({jobs.length})
         </button>
         <button 
           onClick={() => setActiveTab('applications')}
           className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-all ${
             activeTab === 'applications' ? 'border-b-2 border-primary text-zinc-950' : 'text-zinc-400 hover:text-zinc-600'
           }`}
         >
            Student Applications ({applications.length})
         </button>
      </div>

      {activeTab === 'jobs' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {jobs.length === 0 ? (
             <div className="col-span-full py-20 text-center bg-white border border-zinc-100 border-dashed rounded-[2.5rem]">
                <Briefcase className="mx-auto text-zinc-300 mb-4" size={48} />
                <p className="text-zinc-400 font-bold italic text-lg uppercase tracking-widest">No active career openings</p>
                <button onClick={() => setIsAddJobOpen(true)} className="mt-4 text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:underline">Publish first job</button>
             </div>
           ) : jobs.map((job) => (
             <div key={job._id} className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 flex flex-col h-full shadow-sm hover:shadow-lg transition-all group">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-14 h-14 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:text-primary transition-all shadow-inner">
                      <Briefcase size={22} />
                   </div>
                   <button 
                     onClick={() => handleDeleteJob(job._id)}
                     className="p-2 text-zinc-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                   >
                      <Trash2 size={16} />
                   </button>
                </div>

                <div className="space-y-4 flex-1">
                   <div>
                      <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900 group-hover:text-primary transition-colors leading-snug">{job.title}</h3>
                      <p className="text-zinc-500 text-xs font-bold flex items-center gap-1.5 mt-1"><Building size={14} /> {job.company}</p>
                   </div>

                   <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed">{job.description}</p>

                   <div className="pt-4 border-t border-zinc-50 space-y-2.5">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                         <MapPin size={12} /> {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                         <DollarSign size={12} /> {job.salary}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-zinc-400">
                         <Clock size={12} /> {job.type}
                      </div>
                   </div>
                </div>

                {job.link && (
                  <a 
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center justify-center gap-2 py-4 bg-zinc-50 border border-zinc-100 text-zinc-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-100 transition-all"
                  >
                     Review Source <ExternalLink size={12} />
                  </a>
                )}
             </div>
           ))}
        </div>
      ) : (
        <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 shadow-sm overflow-x-auto">
           <h3 className="text-xl font-black uppercase tracking-tighter italic mb-6">Student Application Tracking</h3>

           {applications.length === 0 ? (
             <div className="py-20 text-center">
                <Users className="mx-auto text-zinc-300 mb-4" size={48} />
                <p className="text-zinc-400 font-bold italic text-lg uppercase tracking-widest">No job applications submitted yet</p>
             </div>
           ) : (
             <table className="w-full text-left border-collapse">
                <thead>
                   <tr className="border-b border-zinc-100">
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Student</th>
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Role / Company</th>
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Applied Date</th>
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Contact Details</th>
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Status</th>
                      <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                   {applications.map((app) => (
                      <tr key={app._id} className="group hover:bg-zinc-50/50 transition-colors">
                         <td className="py-5">
                            <p className="font-black text-sm uppercase text-zinc-900">{app.student?.name || 'N/A'}</p>
                            <p className="text-[10px] text-zinc-400 font-bold">{app.student?.email || 'N/A'}</p>
                         </td>
                         <td className="py-5">
                            <p className="font-bold text-sm text-zinc-800">{app.job?.title || 'Unknown Role'}</p>
                            <p className="text-xs text-zinc-500 font-medium">{app.job?.company || 'Unknown Company'}</p>
                         </td>
                         <td className="py-5 text-xs text-zinc-500 font-medium">
                            {new Date(app.appliedAt).toLocaleDateString()}
                         </td>
                         <td className="py-5 text-xs text-zinc-500 font-bold font-mono">
                            {app.student?.phone || 'N/A'}
                         </td>
                         <td className="py-5">
                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                              app.status === 'Shortlisted'
                                ? 'bg-green-100 text-green-700'
                                : app.status === 'Rejected'
                                ? 'bg-red-100 text-red-700'
                                : app.status === 'Reviewing'
                                ? 'bg-blue-100 text-blue-700 animate-pulse'
                                : 'bg-zinc-100 text-zinc-500'
                            }`}>
                               {app.status}
                            </span>
                         </td>
                         <td className="py-5 text-right space-x-2">
                            <select 
                              value={app.status}
                              onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                              className="bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-1.5 text-[9px] font-black uppercase tracking-widest outline-none text-zinc-700"
                            >
                               <option value="Applied">Applied</option>
                               <option value="Reviewing">Reviewing</option>
                               <option value="Shortlisted">Shortlist</option>
                               <option value="Rejected">Reject</option>
                            </select>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
           )}
        </div>
      )}

      {/* Add Job Modal */}
      {isAddJobOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsAddJobOpen(false)}></div>
           <div className="relative w-full max-w-xl bg-white border border-zinc-200 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black">
                       <Briefcase size={24} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none text-zinc-900">Add Corporate Job</h3>
                       <p className="text-zinc-500 text-xs font-bold mt-1 uppercase tracking-widest">Publish career placements for students</p>
                    </div>
                 </div>
                 <button onClick={() => setIsAddJobOpen(false)} className="p-3 bg-zinc-100 text-zinc-400 hover:text-zinc-900 rounded-2xl transition-all">
                    <X size={20} />
                 </button>
              </div>

              <form onSubmit={handleCreateJob} className="space-y-5">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Job Title *</label>
                       <input 
                         required
                         type="text" 
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                         placeholder="Full Stack Intern"
                         value={jobForm.title}
                         onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Company Name *</label>
                       <input 
                         required
                         type="text" 
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                         placeholder="Google International"
                         value={jobForm.company}
                         onChange={(e) => setJobForm({...jobForm, company: e.target.value})}
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Location *</label>
                       <input 
                         required
                         type="text" 
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                         placeholder="Remote / Hyderabad"
                         value={jobForm.location}
                         onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Salary Offered</label>
                       <input 
                         type="text" 
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                         placeholder="₹6k - 8k LPA"
                         value={jobForm.salary}
                         onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Job Type</label>
                       <select 
                         value={jobForm.type}
                         onChange={(e) => setJobForm({...jobForm, type: e.target.value})}
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                       >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Internship">Internship</option>
                          <option value="Contract">Contract</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Job Description</label>
                    <textarea 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-600 min-h-[80px]"
                      placeholder="Write job description summary..."
                      value={jobForm.description}
                      onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                    ></textarea>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Requirements (Comma separated tags)</label>
                    <input 
                      type="text" 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-600"
                      placeholder="React, Node.js, AWS, MongoDB"
                      value={jobForm.requirements}
                      onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Application Link / Source URL</label>
                    <input 
                      type="text" 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-600"
                      placeholder="https://company.careers/job-url"
                      value={jobForm.link}
                      onChange={(e) => setJobForm({...jobForm, link: e.target.value})}
                    />
                 </div>

                 <button 
                   type="submit"
                   className="w-full bg-primary text-black py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
                 >
                    Publish Career Listing
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default CareerHub;
