import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Home, Sparkles, Send, ArrowRight, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Success = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="flex flex-col items-center justify-center pt-36 md:pt-48 pb-14 md:pb-20 px-6 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 blur-[120px] -z-0 rounded-full"></div>
        
        <div className="max-w-xl w-full glass-card rounded-[3rem] p-10 md:p-16 text-center relative z-10 bg-white shadow-2xl">
          <div className="mb-10 flex justify-center">
            <div className="bg-primary p-6 rounded-full shadow-2xl shadow-primary/30 animate-bounce">
              <CheckCircle2 size={64} className="text-black" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-6 tracking-tighter uppercase">Registration <span className="text-primary">Successful</span> 🎉</h1>
          <p className="text-slate-500 text-lg font-medium mb-10 leading-relaxed">
            Welcome to <span className="font-black text-slate-900">Glitch Skill Hub</span>. Your enrollment has been securely verified and logged on our official registry.
          </p>
          
          <div className="space-y-4 mb-12">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center justify-between text-left">
              <div>
                <p className="text-xs font-black text-primary-dark uppercase tracking-widest mb-1">Enrollment Status</p>
                <p className="font-bold text-slate-900">Verified & Registered</p>
              </div>
              <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_#FFD700] animate-pulse"></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-yellow flex items-center justify-center gap-2 py-4 px-8 group">
               <Home size={18} /> Back Home
            </Link>
            <Link to="/programs" className="px-8 py-4 rounded-xl border-2 border-slate-100 font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
              <ChevronRight size={18} /> View More Programs
            </Link>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-50">
             <p className="text-xs text-slate-400 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                <Sparkles size={14} className="text-primary" /> 100% Practical Skill Hub
             </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Success;
