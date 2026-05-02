import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  ArrowRight, Clock, UserCheck, Terminal, Rocket, 
  Database, ShieldCheck, Zap, Star, ChevronRight
} from 'lucide-react';

const Programs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activePrograms = [
    {
      title: "Become Full Stack Developer (Node.js)",
      desc: "Comprehensive engineering for students and professionals. Build production-grade MERN applications with MNC standards.",
      icon: Terminal,
      duration: "16 Weeks",
      level: "Student/Pro",
      price: "₹9,999",
      seats: "Only 20 Seats per Batch",
      path: "/node-js-course"
    }
  ];

  const comingSoonPrograms = [
    {
      title: "DevOps Engineering",
      desc: "Learn CI/CD, Docker, Kubernetes, and Cloud infrastructure from AWS experts.",
      icon: Rocket
    },
    {
      title: "Data Analyst",
      desc: "Master data visualization, SQL, Python, and statistical modeling with industry projects.",
      icon: Database
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-56 pb-24 relative overflow-hidden bg-slate-50">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(250,204,21,0.1)_0%,transparent_50%)]"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="badge-modern mx-auto mb-8">
            <span></span> Practical Learning
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-8">
            Our <span className="text-primary">Premium</span> <br />
            Career Programs.
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Hands-on, project-based curriculum designed by practicing software engineers to get you job-ready in weeks, not years.
          </p>
        </div>
      </section>

      {/* Active Programs */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
             <div className="w-2 h-8 bg-primary rounded-full"></div>
             <h2 className="text-3xl font-bold tracking-tight">Open Enrollments</h2>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {activePrograms.map((course, i) => (
              <div key={i} className="bento-card bg-white flex flex-col lg:flex-row gap-12 group border-slate-200">
                <div className="w-full lg:w-2/5 bg-slate-900 rounded-2xl flex items-center justify-center p-16 text-primary relative overflow-hidden">
                   <div className="absolute top-6 left-6 bg-primary text-black text-[10px] font-bold uppercase px-3 py-1.5 rounded-full">ADMISSIONS OPEN</div>
                   <course.icon size={100} className="group-hover:scale-110 transition-transform duration-500" />
                   <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase px-4 py-2 rounded-full border border-primary/20">
                      {course.seats}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">{course.title}</h3>
                  <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-2xl">
                    {course.desc}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary">
                          <Clock size={20} />
                        </div>
                        <div className="text-left">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration</p>
                           <p className="font-bold text-sm">{course.duration}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary">
                          <UserCheck size={20} />
                        </div>
                        <div className="text-left">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Eligibility</p>
                           <p className="font-bold text-sm">{course.level}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          <Zap size={20} />
                        </div>
                        <div className="text-left">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</p>
                           <p className="font-bold text-sm">{course.price}</p>
                        </div>
                     </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-6">
                    <Link to={course.path} className="btn-premium py-5 px-10 group">
                      <span>Explore Details</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
             <div className="w-2 h-8 bg-slate-300 rounded-full"></div>
             <h2 className="text-3xl font-bold tracking-tight text-slate-400">Coming Next</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {comingSoonPrograms.map((course, i) => (
              <div key={i} className="bento-card bg-white border-dashed border-slate-200 group hover:border-primary/40 transition-all">
                <div className="flex items-start gap-8">
                   <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-slate-900 transition-all shadow-sm shrink-0">
                      <course.icon size={40} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6">{course.desc}</p>
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                        <Star size={12} fill="currentColor" /> Under Development
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Glitch Programs? */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
             <div className="badge-modern mx-auto mb-8"><span></span> Why Glitch</div>
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">Built for <span className="text-primary">Performance.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             {[
               { title: "Practical First", desc: "No boring slides. We start with code from day one.", icon: Terminal },
               { title: "MNC Workflow", desc: "Learn the exact processes used at Google and Accenture.", icon: ShieldCheck },
               { title: "Direct Referral", desc: "Access our exclusive network of hiring partners.", icon: Rocket }
             ].map((benefit, i) => (
               <div key={i} className="text-center p-8">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-primary mx-auto mb-8 shadow-sm">
                    <benefit.icon size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-4">{benefit.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{benefit.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;
