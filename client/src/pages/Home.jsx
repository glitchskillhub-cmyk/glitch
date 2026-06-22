import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import {
  Sparkles, Code, Users, Monitor, Rocket, Layers, GraduationCap,
  ArrowRight, CheckCircle2, ChevronRight, Zap, Target, ShieldCheck,
  Star, Trophy, Heart, UserCheck
} from 'lucide-react';
// Import Assets
import imageeeImg from '../assets/images/imageee.png';
import mentorsImg from '../assets/images/mentors.png';
import practicalImg from '../assets/images/practical_learning.png';
import mentorshipImg from '../assets/images/mentorship.png';

// Import Logos
import googleLogo from '../assets/images/Google_2015_logo.svg.webp';
import accentureLogo from '../assets/images/Accenture.svg.png';
import tcsLogo from '../assets/images/Tata_Consultancy_Services_old_logo.svg.webp';
import cognizantLogo from '../assets/images/Cognizant_logo_2022.svg.png';
import wiproLogo from '../assets/images/Wipro_new_logo.svg.png';
import virtusaLogo from '../assets/images/Virtusa_Logo.svg.png';
import hclLogo from '../assets/images/HCLTech-new-logo.svg.png';
import techmahindraLogo from '../assets/images/TM_Logo_Color_Pos_RGB.svg.png';
import LogoScroll from '../components/LogoScroll';

const Home = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-black">
      <SEO title="Home" description="Glitch Skill Hub provides real-time knowledge for students and working professionals. Upskill with classes taught by top MNC software engineers" path="/" />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 md:pt-40 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>

        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-left">
              <div className="badge-modern mb-8 floating">
                <span></span> Skill Hub for Students & Professionals
              </div>
              <h1 className="unique-title mb-8">
                Master <span className="text-primary">Practical</span> <br />
                Engineering.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
                Glitch Skill Hub provides real-time knowledge for students and working professionals.
                Upskill with classes taught by top MNC software engineers
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                <Link to="/register" className="btn-premium group py-4 px-6 sm:py-5 sm:px-10">
                  <span>Start Your Upskill Journey</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/mentors" className="flex items-center gap-2 font-display font-bold text-sm tracking-widest hover:text-primary transition-colors">
                  Meet Our Mentors <ChevronRight size={18} />
                </Link>
              </div>

            </div>

            <div className="flex-1 relative hidden lg:block">
              <div className="relative z-10 bento-card p-0 overflow-hidden aspect-[4/5] max-w-md mx-auto floating shadow-2xl border-none bg-transparent">
                <img src={imageeeImg} alt="100% Practical Tech Training" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary rounded-3xl -z-0 rotate-12 opacity-50"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 border-2 border-slate-100 rounded-full -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Elite Mentor Panel + Logo Scroll */}
      <section className="py-16 md:py-24 bg-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="badge-modern mx-auto mb-8"><span></span> Professional Mentors</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
              Taught By <span className="text-primary">MNC</span> Engineers.
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Direct learning from professionals working at Google, Accenture, TCS, and Cognizant.
            </p>
          </div>
        </div>

        {/* MNC Logo Scroll */}
        <LogoScroll />
      </section>

      {/* Our Story (Who We Are) */}
      <section className="py-16 md:py-24 overflow-hidden bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1 order-2 lg:order-1 relative">
              <div className="bento-card p-0 overflow-hidden aspect-video bg-slate-200 shadow-2xl">
                <img src={mentorsImg} alt="Our Mentors" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all"></div>
              </div>

            </div>
            <div className="flex-1 order-1 lg:order-2">
              <div className="badge-modern mb-8"><span></span> Our Story</div>
              <h2 className="section-title mb-8">Our <span className="text-primary">Story.</span></h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                Glitch Skill Hub isn't just a school; it's a bridge. We were founded by a group of MNC engineers who realized that traditional education was failing to keep up with the rapid pace of today's tech.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-10 font-bold">
                Today, we help hundreds of students and working professionals master real-time skills through raw, practical exposure.
              </p>
              <Link to="/about" className="flex items-center gap-2 font-display font-bold text-sm tracking-widest hover:text-primary transition-colors">
                Read Full Story <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Glitch */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="badge-modern mx-auto mb-8"><span></span> Why Us</div>
          <h2 className="section-title mb-10 md:mb-16">Why Choose <span className="text-primary">Glitch?</span></h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Zero Theory", desc: "We skip the fluff. 100% of our focus is on building and shipping code." },
              { icon: ShieldCheck, title: "MNC Network", desc: "Direct mentoring and learning opportunities with engineers from top firms." },
              { icon: Trophy, title: "Industry Ready", desc: "Our students don't just learn; they master real-time skills used in top MNCs." },
              { icon: Heart, title: "Lifetime Support", desc: "Once a Glitcher, always a Glitcher. Get learning support whenever you need it." }
            ].map((item, i) => (
              <div key={i} className="bento-card group flex flex-col items-center p-10 hover:border-primary">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mb-8 group-hover:bg-primary transition-colors">
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 20+ Top IT Courses Section */}
      <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-sm text-sm font-bold tracking-widest uppercase mb-8 text-slate-300">
               <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> AI-Powered Learning
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6 text-white">
              20+ Top IT Courses with <br/><span className="text-primary">AI Integration.</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-4">
              Industry-relevant. Future-ready. AI-powered.
            </p>
            <p className="text-md text-slate-500 max-w-3xl mx-auto">
               We focus on doing AI right. Glitch AI integrated curriculum teaches the most in-demand IT courses to make you future-proof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              "Full Stack Development with AI",
              "Python Programming with AI",
              "Digital Marketing with AI",
              "UI/UX Design with AI",
              "Power BI & Advanced Analytics",
              "React JS Development",
              "Node JS Development",
              "Database Management",
              "Java Development with AI",
              "Data Science & Machine Learning",
              "Generative AI & Prompt Engineering",
              "Data Analytics & Visualization",
              "Web Development",
              "Mobile App Development",
              "Software Testing with AI",
              "DevOps & Cloud Computing",
              "Cyber Security & Ethical Hacking",
              "AI for Productivity",
              "Excel & Advanced Excel with AI",
              "Interview Preparation & Soft Skills"
            ].map((course, i) => (
              <div key={i} className="group flex items-start gap-4 p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-primary/50 transition-all hover:-translate-y-1 backdrop-blur-sm">
                <div className="w-12 h-12 shrink-0 bg-slate-900/50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary/20 group-hover:text-primary transition-colors border border-slate-700/50">
                  {course.includes('AI') ? <Sparkles size={24} /> : <Code size={24} />}
                </div>
                <div className="flex items-center h-full pt-1">
                  <h3 className="text-lg font-bold leading-tight text-slate-200 group-hover:text-white transition-colors">{course}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      </section>

      {/* Practical Learning Section */}
      <section className="py-16 md:py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1">
              <div className="badge-modern mb-8"><span></span> Practical First</div>
              <h2 className="section-title mb-8">Build <span className="text-primary">Real</span> Products, <br />Not Just Tutorials.</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Most platforms teach you 'how' to code, but they don't teach you 'why' or 'where'. At Glitch, you'll work on industry-standard architecture, building scalable applications that mirror what's happening in top MNCs.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Microservices Architecture",
                  "Cloud-Native Development",
                  "Agile & DevOps Workflows",
                  "Enterprise Grade Security"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium text-slate-700">
                    <CheckCircle2 size={20} className="text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="bento-card p-0 overflow-hidden aspect-[4/3] shadow-2xl group">
                <img src={practicalImg} alt="Practical Learning" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-8">
                  <p className="text-white font-bold text-xl">Hands-on Experience</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentorship Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1 order-2 lg:order-1 relative">
              <div className="bento-card p-0 overflow-hidden aspect-[4/3] shadow-2xl group">
                <img src={mentorshipImg} alt="Mentorship" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-8">
                  <p className="text-white font-bold text-xl">1-on-1 Guidance</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            </div>
            <div className="flex-1 order-1 lg:order-2">
              <div className="badge-modern mb-8"><span></span> Expert Guidance</div>
              <h2 className="section-title mb-8">Mentorship from <br /><span className="text-primary">MNC Legends.</span></h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Don't just learn from videos. Get direct feedback on your code, participate in mock interviews, and learn the unspoken rules of the tech industry from seniors at Google, Amazon, and more.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <Users className="text-primary mb-4" size={28} />
                  <h4 className="font-bold mb-2">Code Reviews</h4>
                  <p className="text-sm text-slate-500">Professional feedback on every pull request.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <Target className="text-primary mb-4" size={28} />
                  <h4 className="font-bold mb-2">Career Roadmap</h4>
                  <p className="text-sm text-slate-500">Personalized path to your dream company.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-12">
              Stop Dreaming. <br /> Start <span className="text-primary">Building.</span>
            </h2>
            <div className="absolute top-0 -right-20 hidden md:block opacity-20 rotate-12">
              <Rocket size={100} />
            </div>
          </div>
          <p className="text-xl text-slate-500 mb-16 max-w-3xl mx-auto">
            Join the most intensive software engineering program in HiTech City, Hyderabad. 100% Online across India.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/register" className="btn-premium py-6 px-12 text-xl">
              <span>Reserve Your Seat</span>
            </Link>
            <Link to="/contact" className="py-6 px-12 border-2 border-slate-100 rounded-full font-bold uppercase tracking-widest hover:bg-slate-50 transition-all">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
