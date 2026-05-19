import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  Award, 
  X, 
  CheckCircle, 
  Calendar,
  AlertCircle,
  Users,
  ExternalLink,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { 
  getAllCertificates, 
  issueCertificateByAdmin, 
  getAllStudents,
  verifyCertificate
} from '../../utils/api';
import { toast } from 'react-hot-toast';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  
  // Verify state
  const [verifyId, setVerifyId] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);
  const [verifyLoading, setVerifyLoading] = useState(false);

  // Form state
  const [issueForm, setIssueForm] = useState({
    studentId: '',
    title: '',
    fileUrl: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [certsRes, studentsRes] = await Promise.all([
        getAllCertificates(),
        getAllStudents()
      ]);
      setCertificates(certsRes.data);
      setStudents(studentsRes.data);
      if (studentsRes.data.length > 0) {
        setIssueForm(prev => ({ ...prev, studentId: studentsRes.data[0]._id }));
      }
    } catch {
      toast.error('Failed to load certificates context.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIssueCertificate = async (e) => {
    e.preventDefault();
    if (!issueForm.studentId || !issueForm.title.trim()) {
      return toast.error('Please select a student and enter certificate title.');
    }
    try {
      await issueCertificateByAdmin(issueForm);
      toast.success('Certificate issued successfully!');
      setIsIssueModalOpen(false);
      setIssueForm({
        studentId: students[0]?._id || '',
        title: '',
        fileUrl: ''
      });
      fetchData();
    } catch {
      toast.error('Failed to issue certificate.');
    }
  };

  const handleVerifyCertificate = async (e) => {
    e.preventDefault();
    if (!verifyId.trim()) return;
    setVerifyLoading(true);
    setVerifyResult(null);
    try {
      const res = await verifyCertificate(verifyId);
      setVerifyResult({ verified: true, data: res.data.certificate });
      toast.success('Certificate is authentic!');
    } catch (err) {
      setVerifyResult({ verified: false, message: err.response?.data?.message || 'Certificate not found' });
      toast.error('Certificate verification failed.');
    } finally {
      setVerifyLoading(false);
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
              Credentials <span className="text-primary not-italic">Manager</span>
           </h1>
           <p className="text-zinc-500 text-sm mt-1 font-bold">Issue secure blockchain-ready credentials and verify certificate authenticity</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={() => setIsVerifyModalOpen(true)}
             className="px-6 py-4 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
           >
              Verify Credentials
           </button>
           <button 
             onClick={() => setIsIssueModalOpen(true)}
             className="flex items-center gap-2 px-8 py-4 bg-primary text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
           >
              <Plus size={16} /> Issue Certificate
           </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white border border-zinc-100 p-8 rounded-[2rem] flex items-center gap-6 shadow-sm">
            <div className="w-14 h-14 bg-zinc-50 text-zinc-600 rounded-[1.2rem] flex items-center justify-center border border-zinc-100 shadow-inner">
               <Award size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Total Issued</p>
               <h3 className="text-3xl font-black italic text-zinc-900">{certificates.length}</h3>
            </div>
         </div>
         <div className="bg-white border border-zinc-100 p-8 rounded-[2rem] flex items-center gap-6 shadow-sm">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-[1.2rem] flex items-center justify-center border border-green-100 shadow-inner">
               <CheckCircle size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Authenticity Status</p>
               <h3 className="text-3xl font-black italic text-green-600">100% SECURE</h3>
            </div>
         </div>
      </div>

      {/* Main Table log */}
      <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-8 shadow-sm overflow-x-auto">
         <h3 className="text-xl font-black uppercase tracking-tighter italic mb-6">Issued Certificates Log</h3>
         
         {certificates.length === 0 ? (
           <div className="py-20 text-center">
              <Award className="mx-auto text-zinc-300 mb-4 animate-bounce" size={48} />
              <p className="text-zinc-400 font-bold italic text-lg uppercase tracking-widest">No certificates issued yet</p>
              <button onClick={() => setIsIssueModalOpen(true)} className="mt-4 text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:underline">Issue first certificate</button>
           </div>
         ) : (
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="border-b border-zinc-100">
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">ID</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Student Name</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Program / Title</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Issue Date</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Status</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                 {certificates.map((cert) => (
                    <tr key={cert._id} className="group hover:bg-zinc-50/50 transition-colors">
                       <td className="py-5">
                          <span className="font-mono text-xs font-black uppercase text-zinc-800 tracking-wider">
                             {cert.certificateId}
                          </span>
                       </td>
                       <td className="py-5">
                          <p className="font-black text-sm uppercase text-zinc-900">{cert.student?.name || 'N/A'}</p>
                          <p className="text-[10px] text-zinc-400 font-bold">{cert.student?.email || 'N/A'}</p>
                       </td>
                       <td className="py-5">
                          <p className="font-bold text-sm text-zinc-800">{cert.title}</p>
                          <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{cert.issuer}</p>
                       </td>
                       <td className="py-5 text-xs text-zinc-500 font-medium">
                          {new Date(cert.issueDate).toLocaleDateString()}
                       </td>
                       <td className="py-5">
                          <span className="inline-flex items-center gap-1 text-[9px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest border border-green-100 shadow-sm">
                             <CheckCircle size={10} /> Verified
                          </span>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
         )}
      </div>

      {/* Issue Certificate Modal */}
      {isIssueModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsIssueModalOpen(false)}></div>
           <div className="relative w-full max-w-xl bg-white border border-zinc-200 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black">
                       <Award size={24} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none text-zinc-900">Issue Certificate</h3>
                       <p className="text-zinc-500 text-xs font-bold mt-1 uppercase tracking-widest">Assign certified program completion</p>
                    </div>
                 </div>
                 <button onClick={() => setIsIssueModalOpen(false)} className="p-3 bg-zinc-100 text-zinc-400 hover:text-zinc-900 rounded-2xl transition-all">
                    <X size={20} />
                 </button>
              </div>

              <form onSubmit={handleIssueCertificate} className="space-y-5">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Select Student</label>
                    <select 
                      required
                      value={issueForm.studentId}
                      onChange={(e) => setIssueForm({ ...issueForm, studentId: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                    >
                      {students.map(s => (
                        <option key={s._id} value={s._id}>{s.name} ({s.email})</option>
                      ))}
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Certificate Title / Program Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                      placeholder="MERN Stack Development Mastery"
                      value={issueForm.title}
                      onChange={(e) => setIssueForm({ ...issueForm, title: e.target.value })}
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Certificate File URL (Optional)</label>
                    <input 
                      type="text" 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-600"
                      placeholder="https://cloudinary.com/...pdf or image"
                      value={issueForm.fileUrl}
                      onChange={(e) => setIssueForm({ ...issueForm, fileUrl: e.target.value })}
                    />
                 </div>

                 <button 
                   type="submit"
                   className="w-full bg-primary text-black py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
                 >
                    Issue Secure Credentials
                 </button>
              </form>
           </div>
        </div>
      )}

      {/* Verify Certificate Modal */}
      {isVerifyModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { setIsVerifyModalOpen(false); setVerifyResult(null); setVerifyId(''); }}></div>
           <div className="relative w-full max-w-xl bg-white border border-zinc-200 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-950 rounded-2xl flex items-center justify-center text-primary">
                       <CheckCircle size={24} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none text-zinc-900">Verify Credential</h3>
                       <p className="text-zinc-500 text-xs font-bold mt-1 uppercase tracking-widest">Verify the authenticity of a issued document</p>
                    </div>
                 </div>
                 <button onClick={() => { setIsVerifyModalOpen(false); setVerifyResult(null); setVerifyId(''); }} className="p-3 bg-zinc-100 text-zinc-400 hover:text-zinc-900 rounded-2xl transition-all">
                    <X size={20} />
                 </button>
              </div>

              <form onSubmit={handleVerifyCertificate} className="flex gap-4 mb-8">
                 <input 
                   required
                   type="text" 
                   className="flex-grow bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-xs font-mono uppercase tracking-widest focus:border-primary outline-none font-bold"
                   placeholder="Enter Certificate ID (e.g. GSH-CERT-810921)"
                   value={verifyId}
                   onChange={(e) => setVerifyId(e.target.value)}
                 />
                 <button 
                   type="submit"
                   disabled={verifyLoading}
                   className="px-8 py-4 bg-zinc-950 text-white hover:bg-zinc-800 transition-all font-black text-xs uppercase tracking-widest rounded-2xl"
                 >
                    {verifyLoading ? 'Searching...' : 'Search'}
                 </button>
              </form>

              {verifyResult && (
                 verifyResult.verified ? (
                    <div className="p-8 bg-green-50 border border-green-200 rounded-[2rem] space-y-4 shadow-sm animate-in fade-in duration-300">
                       <div className="flex items-center gap-3 text-green-700">
                          <CheckCircle size={24} />
                          <h4 className="text-lg font-black uppercase tracking-tight italic">AUTHENTIC CREDENTIAL</h4>
                       </div>
                       <div className="space-y-2 pt-2 border-t border-green-200 text-xs font-bold text-green-800">
                          <p><span className="uppercase text-[9px] text-green-600 block mb-0.5 font-black">Document Title:</span> {verifyResult.data.title}</p>
                          <p><span className="uppercase text-[9px] text-green-600 block mb-0.5 font-black">Issued Student:</span> {verifyResult.data.student?.name}</p>
                          <p><span className="uppercase text-[9px] text-green-600 block mb-0.5 font-black">Credential ID:</span> <span className="font-mono">{verifyResult.data.certificateId}</span></p>
                          <p><span className="uppercase text-[9px] text-green-600 block mb-0.5 font-black">Issue Date:</span> {new Date(verifyResult.data.issueDate).toLocaleDateString()}</p>
                       </div>
                    </div>
                 ) : (
                    <div className="p-8 bg-red-50 border border-red-200 rounded-[2rem] flex items-center gap-4 text-red-700 shadow-sm animate-in fade-in duration-300">
                       <ShieldAlert size={36} />
                       <div>
                          <h4 className="text-lg font-black uppercase tracking-tight italic">VERIFICATION FAILED</h4>
                          <p className="text-xs font-bold mt-1 text-red-600/80">{verifyResult.message}</p>
                       </div>
                    </div>
                 )
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
