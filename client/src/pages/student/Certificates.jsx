import React, { useEffect, useState } from 'react';
import { Award, Download, ExternalLink, Users, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { getMyCertificates } from '../../utils/api';
import { toast } from 'react-hot-toast';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCerts();
  }, []);

  const fetchCerts = async () => {
    setLoading(true);
    try {
      const res = await getMyCertificates();
      setCertificates(res.data);
    } catch {
      toast.error('Failed to load certificates.');
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
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Certificates</h1>
          <p className="text-slate-500 font-medium mt-2">Verified credentials for your professional career.</p>
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="py-20 text-center bg-white border border-slate-100 border-dashed rounded-[2.5rem] shadow-sm">
           <Award className="mx-auto text-slate-300 mb-4 animate-bounce" size={48} />
           <p className="text-slate-400 font-bold italic text-lg uppercase tracking-widest">No credentials issued yet</p>
           <p className="text-slate-400 text-xs mt-2">Your certificates will automatically populate here upon graduation!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((cert) => (
            <div key={cert._id} className="bento-card bg-white p-0 overflow-hidden group border-slate-200 shadow-sm hover:shadow-xl transition-all">
              <div className="bg-slate-900 p-10 flex flex-col items-center justify-center relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.2)_0%,transparent_70%)]"></div>
                 <Award size={80} className="text-primary mb-4 z-10 group-hover:scale-110 transition-transform duration-500" />
                 <p className="text-white font-black uppercase tracking-[0.3em] text-center z-10 text-[10px]">Glitch Skill Hub</p>
              </div>
              <div className="p-8">
                 <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-1 leading-snug">{cert.title}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cert.certificateId} • Issued {new Date(cert.issueDate).toLocaleDateString()}</p>
                    </div>
                    {cert.verified && (
                      <div className="flex items-center gap-1 text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest border border-green-100">
                         <CheckCircle2 size={12} /> Verified
                      </div>
                    )}
                 </div>
                 <div className="flex gap-4">
                    {cert.fileUrl ? (
                      <a 
                        href={cert.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 text-center btn-premium py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
                      >
                         <Download size={16} /> <span>Download / View</span>
                      </a>
                    ) : (
                      <button 
                        onClick={() => toast.success('Blockchain credential generated. Contact Admin for download copy.')}
                        className="flex-1 btn-premium py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
                      >
                         <Download size={16} /> <span>Download Certificate</span>
                      </button>
                    )}
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificates;
