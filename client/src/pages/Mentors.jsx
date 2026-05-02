import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LogoScroll from '../components/LogoScroll';
import { 
  UserCheck, Cpu, Star, ShieldCheck, Award, 
  Briefcase, GraduationCap
} from 'lucide-react';

const Mentors = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mentors = [
    { 
      name: "Sr. Software Engineer", 
      company: "GOOGLE", 
      experience: "8+ Years", 
      focus: "Backend Architecture",
      desc: "Specialist in scalable systems and cloud infrastructure. Bringing Google's engineering standards to Glitch."
    },
    { 
      name: "Tech Lead", 
      company: "ACCENTURE", 
      experience: "6+ Years", 
      focus: "Full Stack Development",
      desc: "Expert in modern frontend frameworks and enterprise-grade Node.js applications."
    },
    { 
      name: "Principal Architect", 
      company: "TCS", 
      experience: "10+ Years", 
      focus: "System Design",
      desc: "Veteran architect with deep expertise in large-scale relational databases and microservices."
    },
    { 
      name: "Sr. Developer", 
      company: "COGNIZANT", 
      experience: "5+ Years", 
      focus: "Cloud Infrastructure",
      desc: "AWS Certified professional focusing on CI/CD pipelines and high-availability systems."
    },
    { 
      name: "Engineering Lead", 
      company: "TECH STARTUP", 
      experience: "7+ Years", 
      focus: "Scalable Apps",
      desc: "Driving innovation in fast-paced startup environments using Agile and Lean methodologies."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <section className="pt-56 pb-24 relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(250,204,21,0.1)_0%,transparent_50%)]"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="badge-modern mx-auto mb-8 border-white/10 text-white">
            <span></span> Elite Faculty
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-tight mb-8">
            Learn from the <br />
            <span className="text-primary italic">Best in Industry.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Our mentors are not just teachers; they are practicing senior engineers from top MNCs and high-growth startups.
          </p>
        </div>
      </section>

      {/* Mentor Grid */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {mentors.map((mentor, i) => (
                <div key={i} className="bento-card p-10 group hover:border-primary transition-all duration-500">
                   <div className="flex justify-between items-start mb-10">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors shadow-sm">
                        <UserCheck size={32} />
                      </div>
                      <div className="bg-slate-50 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {mentor.experience} Exp
                      </div>
                   </div>
                   
                   <h3 className="text-2xl font-bold mb-2">{mentor.name}</h3>
                   <div className="flex items-center gap-2 mb-8">
                      <Briefcase size={14} className="text-primary" />
                      <p className="text-slate-900 font-bold uppercase tracking-widest text-[10px]">{mentor.company}</p>
                   </div>
                   
                   <p className="text-slate-500 text-sm leading-relaxed mb-10">
                     {mentor.desc}
                   </p>

                   <div className="pt-8 border-t border-slate-100">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-4 text-slate-400">Focus Area</p>
                      <div className="flex items-center gap-3">
                         <Cpu size={18} className="text-primary" />
                         <span className="font-bold text-sm text-slate-900">{mentor.focus}</span>
                      </div>
                   </div>
                </div>
              ))}
              
              {/* Highlight Card */}
              <div className="bento-card bg-primary p-12 flex flex-col justify-center text-slate-900">
                 <Star size={48} className="mb-8" />
                 <h3 className="text-3xl font-bold leading-tight mb-6">MNC <br /> Engineering <br /> Standards.</h3>
                 <p className="text-slate-900/70 text-sm leading-relaxed">
                   We bring the exact technical workflows and quality standards from GOOGLE, ACCENTURE, and TCS directly to our students.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
           <div className="badge-modern mx-auto mb-8"><span></span> Network</div>
           <h2 className="section-title mb-20">Mentors From <span className="text-primary">Top Firms.</span></h2>
           <LogoScroll />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Mentors;
