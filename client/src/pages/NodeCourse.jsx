import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  CheckCircle2, Clock, Calendar, Zap, Rocket, Users, 
  Terminal, Code, Database, Layout, ShieldCheck, 
  ArrowRight, Phone, Mail, Play, Star, ChevronRight,
  BookOpen, Target, Award, Cpu
} from 'lucide-react';

// Import Assets
import courseImg from '../assets/images/Glitch SM Poster 1.jpg (1).jpeg';
// import demoVideo from '../assets/images/VN20260412_231437.mp4';
import LogoScroll from '../components/LogoScroll';

const NodeCourse = () => {
  const whatsappLink = "https://wa.me/916300127932?text=Hi%2C%20I%20am%20interested%20in%20the%20Node.js%20Full%20Stack%20Course.%20Please%20provide%20more%20details.";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const coursePath = [
    { 
      phase: "Phase 01", 
      title: "Frontend Foundations", 
      skills: ["HTML5 & Semantic UI", "Modern CSS & Flexbox/Grid", "React.js Framework", "Responsive Architecture"],
      icon: Layout
    },
    { 
      phase: "Phase 02", 
      title: "JavaScript Engine", 
      skills: ["ES6+ Syntax", "Asynchronous JS", "DOM Manipulation", "State Management"],
      icon: Code
    },
    { 
      phase: "Phase 03", 
      title: "Backend Core", 
      skills: ["Node.js Runtime", "Express.js Framework", "RESTful API Design", "Authentication (JWT)"],
      icon: Terminal
    },
    { 
      phase: "Phase 04", 
      title: "Data & Scaling", 
      skills: ["PostgreSQL Databases", "SQL Query Optimization", "Docker Basics", "System Deployment"],
      icon: Database
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Maximum Clarity */}
      <section className="pt-56 pb-24 relative bg-white overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full mb-8">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Only 20 Seats per Batch</span>
                </div>
                
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10 text-slate-900">
                  Become Full Stack <br />
                  <span className="text-primary italic">Developer.</span>
                </h1>
                
                <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-xl">
                  A 100% practical engineering program designed to make you job-ready for top-tier MNC roles. No boring slides, just raw code.
                </p>

                <div className="flex flex-wrap items-center gap-8 mb-12">
                   <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">One-time Investment</p>
                      <div className="text-5xl font-black text-slate-900">₹9,999</div>
                   </div>
                   <div className="h-12 w-px bg-slate-100 hidden sm:block"></div>
                   <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Duration</p>
                      <div className="text-2xl font-bold text-slate-900">16 Weeks</div>
                   </div>
                </div>

                <div className="flex flex-wrap gap-6">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-premium py-6 px-12 text-lg">
                    <span>Enroll Now</span>
                    <ArrowRight size={20} />
                  </a>
                  <button onClick={() => document.getElementById('syllabus').scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] hover:text-primary transition-all">
                    Explore Syllabus <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 relative">
                <div className="bento-card p-0 rounded-[4rem] overflow-hidden shadow-2xl border-none">
                   <img src={courseImg} alt="Node.js Course" className="w-full h-auto" />
                </div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary rounded-full blur-[80px] -z-10 opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights - Simplified Cards */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "100% Practical", desc: "Build & ship real apps." },
              { icon: Cpu, title: "MNC Engineers", desc: "Taught by Google & TCS Leads." },
              { icon: Target, title: "Job Ready", desc: "Resume & Interview mastery." },
              { icon: Users, title: "Batch of 20", desc: "Personal attention guaranteed." }
            ].map((h, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mb-8 group-hover:bg-primary transition-colors">
                  <h.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{h.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule - Minimalist */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bento-card bg-slate-950 text-white p-12 md:p-20 rounded-[4rem] flex flex-col md:flex-row items-center gap-16">
             <div className="flex-1">
                <div className="badge-modern mb-8 border-white/10 text-white"><span></span> Class Timing</div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">8:00 PM – <span className="text-primary">9:30 PM</span></h2>
                <p className="text-slate-400 text-lg mb-0">Monday to Friday. Every Friday industry-standard tasks will be assigned.</p>
             </div>
             <div className="w-full md:w-px h-px md:h-40 bg-white/10"></div>
             <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary"><CheckCircle2 size={20} /></div>
                   <span className="font-bold">Live Sessions</span>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary"><CheckCircle2 size={20} /></div>
                   <span className="font-bold">Recorded Access</span>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary"><CheckCircle2 size={20} /></div>
                   <span className="font-bold">Direct Mentor Chat</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Syllabus Roadmap - Step by Step */}
      <section id="syllabus" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
             <div className="badge-modern mx-auto mb-8"><span></span> Learning Path</div>
             <h2 className="section-title">The Engineering <span className="text-primary italic">Roadmap.</span></h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {coursePath.map((phase, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-10 group">
                <div className="w-full md:w-48 shrink-0">
                   <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 group-hover:border-primary group-hover:bg-primary/5 transition-all text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">{phase.phase}</p>
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-900 mx-auto shadow-sm group-hover:bg-primary">
                         <phase.icon size={24} />
                      </div>
                   </div>
                </div>
                <div className="flex-1 bento-card p-10 group-hover:border-primary transition-all">
                   <h3 className="text-2xl font-bold mb-6">{phase.title}</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {phase.skills.map((skill, j) => (
                        <div key={j} className="flex items-center gap-3">
                           <div className="w-2 h-2 bg-primary rounded-full"></div>
                           <span className="text-slate-600 font-medium">{skill}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section - Clean Focus */}
      <section className="py-32 bg-slate-50 overflow-hidden relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 order-2 lg:order-1">
               <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-white bg-slate-900 flex flex-col items-center justify-center text-center p-8 group">
                  <Play className="text-primary mb-6 animate-pulse" size={64} fill="currentColor" />
                  <h3 className="text-white text-xl font-bold mb-2">Live Demo Session</h3>
                  <p className="text-slate-400 text-sm">Experience our real-time MNC-style teaching methodology.</p>
               </div>
            </div>
            <div className="flex-1 order-1 lg:order-2">
               <div className="badge-modern mb-8"><span></span> Real Experience</div>
               <h2 className="section-title mb-8">Watch a <span className="text-primary">Demo</span> Session.</h2>
               <p className="text-lg text-slate-500 leading-relaxed mb-10">
                 See how we bridge the gap between "Tutorial Hell" and "Production Engineering". Witness our unique MNC-style teaching method.
               </p>
               <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-premium py-5 px-10">
                 <span>Start Learning Now</span>
                 <Zap size={18} fill="currentColor" />
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* MNC Network */}
      <section className="py-24 bg-white border-y border-slate-50">
         <div className="container mx-auto px-6 text-center mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Our Students are Hired By & Mentors are From</p>
         </div>
         <LogoScroll />
      </section>

      {/* Final Enrollment CTA */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 text-center">
           <div className="badge-modern mx-auto mb-8"><span></span> Next Batch Starting Soon</div>
           <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-12">
             Ready to <span className="text-primary italic">Transform?</span>
           </h2>
           <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-premium py-6 px-16 text-xl">
                 <span>Enroll on WhatsApp</span>
              </a>
              <Link to="/contact" className="py-6 px-16 border-2 border-slate-100 rounded-full font-bold uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center">
                 Speak to a Mentor
              </Link>
           </div>
           <p className="mt-12 text-slate-400 font-medium">Verified by top MNC Engineers from Google & Accenture.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NodeCourse;
