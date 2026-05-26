import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LogoScroll from '../components/LogoScroll';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import {
  UserCheck, Cpu, Star, ShieldCheck, Award,
  Code, Monitor, Server, Database,
  CheckCircle2, ArrowRight, Zap, Target,
  BookOpen, Layers, GitBranch, Globe, ChevronRight,
  Lightbulb, Users, Rocket, Wrench
} from 'lucide-react';

// Import assets
import mentorsTeamImg from '../assets/images/mentors_team.png';
import mentorshipImg from '../assets/images/mentorship.png';

const Mentors = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const whyEngineers = [
    {
      icon: Code,
      title: "They Write Code Every Day",
      desc: "Unlike traditional trainers who only teach theory, our mentors are actively building production software at top MNCs. They teach what they practice daily."
    },
    {
      icon: Wrench,
      title: "Real Debugging, Real Problems",
      desc: "Software engineers face and solve real bugs, performance issues, and scaling challenges every day. They bring these live scenarios into your classroom."
    },
    {
      icon: GitBranch,
      title: "Industry Workflows & Tools",
      desc: "Git workflows, code reviews, CI/CD pipelines, Agile sprints — our mentors teach you the exact processes used inside Google, TCS, and Accenture."
    },
    {
      icon: Layers,
      title: "Architecture & System Thinking",
      desc: "Only engineers who've built large-scale systems can teach you how to think in terms of architecture, scalability, and clean code patterns."
    },
    {
      icon: Lightbulb,
      title: "Current Tech, Not Outdated Syllabus",
      desc: "College professors teach from textbooks written 10 years ago. Our engineers teach the latest frameworks, tools, and best practices being used right now."
    },
    {
      icon: Target,
      title: "Practical Feedback on Your Code",
      desc: "Get your code reviewed by professionals who review production pull requests daily. Learn to write code that meets MNC-quality standards."
    }
  ];

  const teachingApproach = [
    { number: "01", title: "Live Coding Sessions", desc: "Every class is a live coding session. Mentors build features in real-time while explaining every decision.", icon: Monitor },
    { number: "02", title: "Code Reviews & Feedback", desc: "Submit your assignments and get line-by-line feedback from engineers who review production code daily.", icon: Code },
    { number: "03", title: "Real-World Project Guidance", desc: "Build production-grade projects with mentor guidance. Learn architecture patterns used at top companies.", icon: Server },
    { number: "04", title: "1-on-1 Doubt Sessions", desc: "Stuck on a concept? Book a 1-on-1 session with your mentor. No doubt goes unresolved at Glitch.", icon: Users }
  ];

  const stats = [
    { value: "30+", label: "Combined Years of Industry Experience" },
    { value: "5+", label: "MNC Companies Represented" },
    { value: "100%", label: "Practicing Software Engineers" },
    { value: "0%", label: "Theory-Only Trainers" }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-black">
      <SEO title="Our Mentors" description="Learn directly from practicing senior software engineers from Google, Accenture, TCS and top startups. Real engineers teaching real-time skills at Glitch Skill Hub." path="/mentors" />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="pt-36 md:pt-48 pb-14 md:pb-20 relative overflow-hidden bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-primary/5 blur-[150px]"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="badge-modern mx-auto mb-8">
            <span></span> Our Mentors
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-900">
            Real Engineers. <br />
            <span className="text-primary italic">Real Skills.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed mb-12">
            At Glitch, you don't learn from trainers who read slides. You learn from practicing software engineers who write production code at top MNCs every single day.
          </p>

        </div>
      </section>

      {/* ===== MEET OUR MENTORS — Image Left + Content Right ===== */}
      <section className="py-16 md:py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
            {/* Left — Image */}
            <div className="flex-1 relative">
              <div className="bento-card p-0 overflow-hidden aspect-[4/5] max-w-lg mx-auto shadow-2xl group border-none">
                <img src={mentorsTeamImg} alt="Glitch Skill Hub Mentors" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent flex items-end p-8">
                  <div>
                    <p className="text-white font-bold text-xl mb-1">Our Engineering Team</p>
                    <p className="text-white/70 text-sm">Practicing Engineers from Top MNCs</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary rounded-3xl -z-1 rotate-12 opacity-50"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 border-2 border-slate-200 rounded-full -z-1"></div>
            </div>

            {/* Right — Content */}
            <div className="flex-1">
              <div className="badge-modern mb-8"><span></span> The Team</div>
              <h2 className="section-title mb-8">Meet Our <span className="text-primary">Mentors.</span></h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Every mentor at Glitch is a <strong className="text-slate-900">currently practicing software engineer</strong> — not a retired professional, not a full-time trainer. They build production-grade software at top MNCs by day and teach you by night.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                What makes us different? Our mentors don't just know the theory — they <strong className="text-slate-900">live and breathe engineering every day</strong>. They bring real MNC workflows, coding standards, and engineering practices directly into your classroom, so you learn exactly how software is built at the highest level.
              </p>

              {/* Key Highlights */}
              <div className="space-y-5 mb-10">
                {[
                  { icon: ShieldCheck, text: "Engineers from Google, Accenture, TCS & top startups" },
                  { icon: Code, text: "They write production code daily — not just teach it" },
                  { icon: Zap, text: "5–10+ years of hands-on engineering experience each" },
                  { icon: Users, text: "1-on-1 mentorship & live doubt-clearing sessions" },
                  { icon: Star, text: "100% practical teaching — zero slides, zero theory" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-slate-900 transition-all shadow-sm">
                      <item.icon size={20} />
                    </div>
                    <span className="font-medium text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* MNC Tag Row */}
              <div className="flex flex-wrap gap-3">
                {["Google", "Accenture", "TCS", "Cognizant", "Startups"].map((company, i) => (
                  <span key={i} className="bg-primary/10 text-primary text-[10px] font-bold uppercase px-4 py-2 rounded-full tracking-widest border border-primary/10">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY SOFTWARE ENGINEERS AS TRAINERS? ===== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 md:mb-16">
            <div className="badge-modern mx-auto mb-8"><span></span> The Difference</div>
            <h2 className="section-title mb-6">Why <span className="text-primary">Software Engineers</span> as Trainers?</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Most coding institutes hire "trainers" — people who learned to teach. At Glitch, we hire <strong className="text-slate-900">engineers who learned to code at the best companies in the world.</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyEngineers.map((item, i) => (
              <div key={i} className="bento-card bg-white p-8 md:p-10 group hover:border-primary transition-all duration-300">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-slate-900 transition-colors shadow-sm">
                  <item.icon size={28} />
                </div>
                <h3 className="text-lg font-bold mb-3 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ===== HOW OUR MENTORS TEACH ===== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 md:mb-16">
            <div className="badge-modern mx-auto mb-8"><span></span> Teaching Method</div>
            <h2 className="section-title mb-6">How Our Mentors <span className="text-primary">Teach.</span></h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              No slides. No boring lectures. Our mentors follow a structured, practical-first approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {teachingApproach.map((step, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-all shadow-sm">
                    <step.icon size={28} />
                  </div>
                  <span className="absolute -top-2 -left-2 w-7 h-7 bg-slate-900 text-white text-[10px] font-black rounded-full flex items-center justify-center">{step.number}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MENTORSHIP EXPERIENCE ===== */}
      <section className="py-16 md:py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1 order-2 lg:order-1 relative">
              <div className="bento-card p-0 overflow-hidden aspect-[4/3] shadow-2xl group">
                <img src={mentorshipImg} alt="1-on-1 Mentorship" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-8">
                  <p className="text-white font-bold text-xl">Direct 1-on-1 Guidance</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            </div>
            <div className="flex-1 order-1 lg:order-2">
              <div className="badge-modern mb-8"><span></span> Beyond Classes</div>
              <h2 className="section-title mb-8">More Than Just <br /><span className="text-primary">Teaching.</span></h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Our mentors go beyond the classroom. They review your code, debug your projects, and share insights from their daily work at MNCs — things no textbook will ever teach you.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Line-by-line code reviews on every assignment",
                  "Live debugging sessions on real-world issues",
                  "Architecture decisions explained from experience",
                  "Industry best practices & coding standards",
                  "Unlimited doubt-clearing support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium text-slate-700">
                    <CheckCircle2 size={20} className="text-primary shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/programs" className="flex items-center gap-2 font-display font-bold text-sm tracking-widest hover:text-primary transition-colors">
                Explore Our Programs <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MENTOR NETWORK (Logo Scroll) ===== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="badge-modern mx-auto mb-8"><span></span> Our Network</div>
          <h2 className="section-title mb-10 md:mb-16">Mentors From <span className="text-primary">Top Firms.</span></h2>
          <LogoScroll />
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-12">
              Learn From People <br /> Who <span className="text-primary">Build Software.</span>
            </h2>
            <div className="absolute top-0 -right-20 hidden md:block opacity-20 rotate-12">
              <Rocket size={100} />
            </div>
          </div>
          <p className="text-xl text-slate-500 mb-16 max-w-3xl mx-auto">
            Stop learning from people who only teach. Start learning from people who build real products at Google, Accenture, and TCS.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/register" className="btn-premium py-6 px-12 text-xl">
              <span>Start Learning Today</span>
            </Link>
            <Link to="/contact" className="py-6 px-12 border-2 border-slate-100 rounded-full font-bold uppercase tracking-widest hover:bg-slate-100 transition-all">
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Mentors;
