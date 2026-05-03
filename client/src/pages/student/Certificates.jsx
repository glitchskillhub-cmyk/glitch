import React from 'react';
import { Award, Download, ExternalLink, Users, CheckCircle2 } from 'lucide-react';

const Certificates = () => {
  const certificates = [
    { 
      title: "Full Stack Development Internship", 
      issuer: "Glitch Skill Hub", 
      date: "March 2026", 
      id: "GSH-CERT-890", 
      verified: true 
    },
    { 
      title: "UI/UX Fundamentals", 
      issuer: "Glitch Skill Hub", 
      date: "Feb 2026", 
      id: "GSH-CERT-721", 
      verified: true 
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Certificates</h1>
          <p className="text-slate-500 font-medium mt-2">Verified credentials for your professional career.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certificates.map((cert, i) => (
          <div key={i} className="bento-card bg-white p-0 overflow-hidden group border-slate-200">
            <div className="bg-slate-900 p-10 flex flex-col items-center justify-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.2)_0%,transparent_70%)]"></div>
               <Award size={80} className="text-primary mb-4 z-10 group-hover:scale-110 transition-transform duration-500" />
               <p className="text-white font-black uppercase tracking-[0.3em] text-center z-10 text-[10px]">Glitch Skill Hub</p>
            </div>
            <div className="p-8">
               <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-1">{cert.title}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cert.id} • Issued {cert.date}</p>
                  </div>
                  {cert.verified && (
                    <div className="flex items-center gap-1 text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest border border-green-100">
                       <CheckCircle2 size={12} /> Verified
                    </div>
                  )}
               </div>
               <div className="flex gap-4">
                  <button className="flex-1 btn-premium py-4 text-xs">
                     <Download size={16} /> <span>Download</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors text-slate-600">
                     <Users size={18} />
                  </button>
                  <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors text-slate-600">
                     <ExternalLink size={18} />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
