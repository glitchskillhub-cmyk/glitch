import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  ShieldCheck, Target, Lightbulb, Users, Eye, Rocket, 
  Award, Globe, Heart, Zap, CheckCircle2 
} from 'lucide-react';

// Import Assets
import codingImg from '../assets/images/coding.png';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <section className="pt-56 pb-24 relative overflow-hidden bg-slate-50/50">
        <div className="container mx-auto px-6 text-center">
          <div className="badge-modern mx-auto mb-8">
            <span></span> Our Identity
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
            Our <span className="text-primary italic">Story.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            We are a collective of elite software engineers from top-tier MNCs and tech startups, committed to teaching the next generation of students and professionals what colleges won't.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="bento-card aspect-square bg-slate-900 overflow-hidden relative p-0 group border-none shadow-2xl">
                 <img src={codingImg} alt="Practical Coding" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" />
                 <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent"></div>
                 <div className="absolute bottom-10 left-10">
                   <h3 className="text-4xl text-white font-bold mb-2">Practical <br /> DNA.</h3>
                   <div className="h-1 w-20 bg-primary"></div>
                 </div>
              </div>
              <div className="absolute -bottom-10 -right-10 bento-card p-10 bg-white border-slate-100 hidden md:block">
                <h4 className="text-5xl font-bold text-primary">0%</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Theory-Only Classes</p>
              </div>
            </div>

            <div>
              <h2 className="section-title mb-10">Beyond <span className="text-primary">Textbooks.</span></h2>
              <div className="space-y-8">
                 <p className="text-lg text-slate-600 leading-relaxed">
                   At Glitch Skill Hub, we've identified a massive gap in the Indian tech education system. Students graduate with degrees but struggle to build production-grade software. Working professionals want to upskill but find theoretical bootcamps useless.
                 </p>
                 <p className="text-lg text-slate-600 leading-relaxed">
                   Our identity is built on <span className="text-black font-black underline decoration-primary">Real-time Knowledge</span>. Every trainer at Glitch is a currently practicing engineer at an MNC. We don't teach from slides; we teach from actual codebases and industry tasks.
                 </p>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
                    {[
                      "MNC Software Engineers",
                      "Students & Pros Focused",
                      "Job-Ready Practicality",
                      "Upskilling Specialist"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                          <ShieldCheck size={20} />
                        </div>
                        <span className="font-bold text-slate-700 uppercase text-xs tracking-widest">{item}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="bento-card bg-white p-12">
               <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-black mb-8">
                  <Rocket size={28} />
               </div>
               <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
               <p className="text-slate-600 text-lg leading-relaxed">
                 To empower 100,000 students and professionals with raw engineering skills that are directly applicable in the modern tech ecosystem. We aim to replace outdated curriculum with industry-ready practice.
               </p>
            </div>
            <div className="bento-card bg-slate-900 text-white p-12">
               <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-8">
                  <Eye size={28} />
               </div>
               <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
               <p className="text-slate-400 text-lg leading-relaxed">
                 To become the world's most trusted practical training hub where learning is synonymous with building. We envision a future where every developer is a problem-solver, not just a certificate holder.
               </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
