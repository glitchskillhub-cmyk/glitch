import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Code, Briefcase, GraduationCap, Globe, Terminal, Database, 
  Server, Smartphone, Layout, Search, ArrowRight, Zap, Target, 
  UserCheck, Award, CheckCircle2, ChevronRight, Star, Cpu, Clock, Rocket
} from 'lucide-react';

// Import Assets
import certImg from '../assets/images/cert.png';

const Services = () => {
  const activePrograms = [
    {
      title: "Become Full Stack Developer (Node.js)",
      desc: "Comprehensive engineering for students and professionals. Build production-grade MERN applications with MNC standards.",
      icon: Terminal,
      duration: "16 Weeks",
      level: "Student/Pro",
      price: "₹9,999",
      seats: "Only 20 Seats per Batch",
      color: "bg-primary",
      status: "Active"
    }
  ];

  const comingSoonPrograms = [
    {
      title: "DevOps Engineering",
      desc: "Learn CI/CD, Docker, Kubernetes, and Cloud infrastructure from AWS experts.",
      icon: Rocket,
      color: "bg-slate-100"
    },
    {
      title: "Data Analyst",
      desc: "Master data visualization, SQL, Python, and statistical modeling with industry projects.",
      icon: Database,
      color: "bg-slate-100"
    }
  ];

  const mentors = [
    { name: "Sr. Software Engineer", company: "GOOGLE", experience: "8+ Years", focus: "Backend Architecture" },
    { name: "Tech Lead", company: "ACCENTURE", experience: "6+ Years", focus: "Full Stack Development" },
    { name: "Principal Architect", company: "TCS", experience: "10+ Years", focus: "System Design" },
    { name: "Sr. Developer", company: "COGNIZANT", experience: "5+ Years", focus: "Cloud Infrastructure" },
    { name: "Engineering Lead", company: "TECH STARTUP", experience: "7+ Years", focus: "Scalable Apps" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <section className="pt-36 md:pt-48 pb-14 md:pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.05)_0%,transparent_50%)]"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="badge-modern mx-auto mb-8">
            <span></span> Elite Mentors
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-10">
            Our <span className="text-outline italic">Premium</span> <br />
            Programs.
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Practical, industry-vetted programs taught by practicing software engineers from Google, Accenture, and top startups.
          </p>
        </div>
      </section>

      {/* ACTIVE PROGRAMS */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
             <div className="w-2 h-8 bg-primary rounded-full"></div>
             <h2 className="text-3xl font-bold tracking-tight">Active Programs</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {activePrograms.map((course, i) => (
              <div key={i} className="bento-card bg-white flex flex-col md:flex-row gap-10 group overflow-hidden">
                <div className="w-full md:w-1/3 bg-slate-900 flex items-center justify-center p-12 text-primary relative overflow-hidden">
                   <div className="absolute top-4 left-4 bg-primary text-black text-[10px] font-bold uppercase px-2 py-1 rounded">ENROLLING</div>
                   <course.icon size={80} className="group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 p-8 md:p-0 md:py-12 md:pr-12">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-4xl font-bold tracking-tight">{course.title}</h3>
                  </div>
                  
                  <div className="flex gap-3 mb-6">
                    <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase px-3 py-1.5 rounded-full border border-primary/20">
                      {course.seats}
                    </span>
                  </div>

                  <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                    {course.desc}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-8 mb-10">
                     <div className="flex items-center gap-2">
                        <Clock size={16} className="text-primary" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{course.duration}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <UserCheck size={16} className="text-primary" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{course.level}</span>
                     </div>
                     <div className="ml-auto text-3xl font-bold text-black bg-primary/5 px-6 py-2 rounded-2xl border border-slate-100">
                        {course.price}
                     </div>
                  </div>
                  
                  <Link to="/node-js-course" className="btn-premium py-5 group w-full md:w-auto">
                    <span>Enroll Now</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMING SOON PROGRAMS */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
             <div className="w-2 h-8 bg-slate-200 rounded-full"></div>
             <h2 className="text-3xl font-bold tracking-tight text-slate-400">Coming Soon</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {comingSoonPrograms.map((course, i) => (
              <div key={i} className="bento-card bg-slate-50 border-dashed opacity-70 group hover:opacity-100 grayscale hover:grayscale-0">
                <div className="flex items-center gap-8">
                   <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-primary transition-colors shadow-sm">
                      <course.icon size={40} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                      <p className="text-slate-400 text-sm">{course.desc}</p>
                      <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">In Development</div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET YOUR MENTORS */}
      <section className="py-16 md:py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(255,215,0,0.05)_0%,transparent_50%)]"></div>
        <div className="container mx-auto px-6">
           <div className="text-center mb-10 md:mb-16">
              <div className="badge-modern mx-auto mb-8 border-white/10 text-white"><span></span> Expertise</div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Meet Your <span className="text-primary italic">Mentors.</span></h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mentors.map((mentor, i) => (
                <div key={i} className="bento-card bg-white/5 border-white/10 p-10 group hover:bg-primary hover:text-black transition-all duration-500">
                   <div className="flex justify-between items-start mb-10">
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-primary group-hover:text-black transition-colors">
                        <UserCheck size={32} />
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">{mentor.experience}</div>
                   </div>
                   <h3 className="text-2xl font-bold mb-2">{mentor.name}</h3>
                   <p className="text-slate-400 group-hover:text-black/70 font-bold mb-8 uppercase tracking-widest text-xs">{mentor.company}</p>
                   <div className="pt-6 border-t border-white/10 group-hover:border-black/10">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-50">Expertise</p>
                      <div className="flex items-center gap-3">
                         <Cpu size={16} className="text-primary group-hover:text-black" />
                         <span className="font-bold text-sm">{mentor.focus}</span>
                      </div>
                   </div>
                </div>
              ))}
              <div className="bento-card bg-primary p-10 flex flex-col justify-center text-black">
                 <Star size={48} className="mb-8" />
                 <h3 className="text-3xl font-bold leading-[1.1] mb-4">Professional <br /> Teaching <br /> Style.</h3>
                 <p className="text-black/70 text-sm">Mentors from GOOGLE, ACCENTURE, TCS, and COGNIZANT bringing professional engineering workflows to you.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Certification */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
           <div className="glass-card p-12 md:p-20 rounded-[4rem] bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
              
              <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
                 <div className="flex-1">
                    <Award size={64} className="text-primary mb-8" />
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-8">
                       Industry <span className="text-primary italic">Verified</span> Certificate.
                    </h2>
                    <p className="text-xl text-slate-400 mb-10">
                       Recognized by our network of 100+ hiring partners from top MNCs and Startups.
                    </p>
                 </div>
                 <div className="flex-1 w-full flex justify-center">
                    <div className="w-full max-w-md aspect-[4/3] bg-white rounded-2xl shadow-2xl relative overflow-hidden flex items-center justify-center border-8 border-slate-800">
                       <img src={certImg} alt="Glitch Certification" className="absolute inset-0 w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-linear-to-t from-slate-950/20 to-transparent"></div>
                       <div className="relative z-10 text-white font-display font-bold text-4xl uppercase opacity-20 rotate-12 pointer-events-none text-center">GLITCH HUB <br /> CERTIFIED</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
