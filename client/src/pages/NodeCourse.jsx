import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  CheckCircle2, Clock, Calendar, Zap, Rocket, Users, 
  Terminal, Code, Database, Layout, ShieldCheck, 
  ArrowRight, Phone, Mail, Play, Star, ChevronRight,
  BookOpen, Target, Award, Cpu, Monitor, Globe,
  MessageSquare, FileCode, Briefcase, TrendingUp,
  ChevronDown, Layers, GitBranch, Server, Cloud
} from 'lucide-react';

import courseImg from '../assets/images/Glitch SM Poster 1.jpg (1).jpeg';
import codingImg from '../assets/images/coding.png';
import LogoScroll from '../components/LogoScroll';
import './NodeCourse.css';

const NodeCourse = () => {
  const whatsappLink = "https://wa.me/916300127932?text=Hi%2C%20I%20am%20interested%20in%20the%20Node.js%20Full%20Stack%20Course.%20Please%20provide%20more%20details.";
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const highlights = [
    { icon: Terminal, title: "Real-World Projects", desc: "Build 5+ production-grade apps from scratch — not toy demos." },
    { icon: Users, title: "MNC-Trained Engineers", desc: "Learn from engineers at Google, TCS, Accenture & more." },
    { icon: Target, title: "Resume & Job Prep", desc: "Mock interviews, portfolio building & direct referrals." },
    { icon: ShieldCheck, title: "Live Doubt Solving", desc: "Unlimited doubt sessions with 1-on-1 mentor support." }
  ];

  const routine = [
    { time: "8:00 PM", label: "Live Class Begins", icon: Monitor, desc: "Join the live session with your mentor. Concepts + live coding." },
    { time: "9:00 PM", label: "Hands-on Practice", icon: Code, desc: "Work on real tasks with mentor guidance in real-time." },
    { time: "9:30 PM", label: "Doubt Clearing", icon: MessageSquare, desc: "Get every question answered before the session ends." },
    { time: "Friday", label: "Weekly Project Task", icon: FileCode, desc: "Industry-standard assignments graded by MNC engineers." }
  ];

  const differentiators = [
    { icon: Zap, title: "100% Practical Training", desc: "Zero slides. Every session is live coding on real-world scenarios." },
    { icon: Cpu, title: "MNC-Standard Codebase", desc: "Learn to write code the way top companies actually build software." },
    { icon: Briefcase, title: "Resume & Portfolio", desc: "We build your GitHub, LinkedIn & portfolio to get noticed by recruiters." },
    { icon: TrendingUp, title: "Job Support + Referrals", desc: "Mock interviews, career coaching & direct referrals to hiring partners." }
  ];

  const syllabus = [
    { 
      phase: "Phase 01", title: "HTML & CSS Mastery", weeks: "Week 1-3", icon: Layout,
      topics: ["HTML5 Semantic Elements", "CSS Flexbox & Grid", "Responsive Design", "Animations & Transitions"]
    },
    { 
      phase: "Phase 02", title: "JavaScript Deep Dive", weeks: "Week 4-6", icon: Code,
      topics: ["ES6+ Modern Syntax", "Async/Await & Promises", "DOM Manipulation", "Error Handling & Debugging"]
    },
    { 
      phase: "Phase 03", title: "React.js Framework", weeks: "Week 7-9", icon: Layers,
      topics: ["Component Architecture", "State & Props", "React Router & Hooks", "Context API & Redux"]
    },
    { 
      phase: "Phase 04", title: "Node.js & Express", weeks: "Week 10-12", icon: Server,
      topics: ["Node.js Runtime", "Express.js RESTful APIs", "Middleware & Routing", "Authentication (JWT/OAuth)"]
    },
    { 
      phase: "Phase 05", title: "Database & SQL", weeks: "Week 13-14", icon: Database,
      topics: ["PostgreSQL / MongoDB", "Schema Design & Relations", "CRUD Operations", "Query Optimization"]
    },
    { 
      phase: "Phase 06", title: "Deployment & DevOps", weeks: "Week 15-16", icon: Cloud,
      topics: ["Git & GitHub Workflows", "Docker Basics", "CI/CD Pipelines", "Cloud Deployment (AWS/Render)"]
    }
  ];

  const projects = [
    { title: "E-Commerce Platform", desc: "Full-stack store with payments, cart, auth & admin panel." },
    { title: "Social Media Dashboard", desc: "Real-time feed, notifications, chat & user profiles." },
    { title: "Project Management Tool", desc: "Kanban boards, team collaboration & task tracking." },
    { title: "Portfolio Website", desc: "Your personal brand site — deployed & interview-ready." }
  ];

  const faqs = [
    { q: "Who is this course for?", a: "This course is for complete beginners, students, and working professionals who want to become job-ready full stack developers. No prior coding experience is needed." },
    { q: "What is the class schedule?", a: "Live classes run Monday to Friday, 8:00 PM – 9:30 PM IST. Fridays include a weekly project task. All sessions are recorded for later review." },
    { q: "Will I get a certificate?", a: "Yes! You'll receive an industry-recognized certificate upon completion, along with a fully built portfolio showcasing your projects." },
    { q: "What if I miss a class?", a: "Every session is recorded. You get lifetime access to all recordings, notes, and resources. You can also attend doubt-clearing sessions any time." },
    { q: "Is there placement support?", a: "Absolutely. We provide resume building, mock interviews, LinkedIn optimization, and direct referrals to our hiring partner network." },
    { q: "What tech stack will I learn?", a: "HTML, CSS, JavaScript, React.js, Node.js, Express.js, PostgreSQL/MongoDB, Git, Docker, and cloud deployment — the complete MERN/PERN stack." }
  ];

  return (
    <div className="nc-page">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="nc-hero">
        <div className="nc-container">
          <div className="nc-hero-grid">
            <div className="nc-hero-text">
              <div className="nc-badge-glow">
                <span className="nc-dot pulse" /> Only 20 Seats per Batch
              </div>
              <h1 className="nc-hero-title">
                Become a<br />Full Stack<br />
                <span className="nc-yellow italic">Developer</span>
              </h1>
              <p className="nc-hero-sub">
                A 100% practical engineering program designed to make you job-ready for top-tier MNC roles. No boring slides — just raw code.
              </p>
              <div className="nc-hero-meta">
                <div>
                  <span className="nc-meta-label">One-time Investment</span>
                  <span className="nc-meta-value big">₹9,999</span>
                </div>
                <div className="nc-divider" />
                <div>
                  <span className="nc-meta-label">Total Duration</span>
                  <span className="nc-meta-value">16 Weeks</span>
                </div>
                <div className="nc-divider" />
                <div>
                  <span className="nc-meta-label">Mode</span>
                  <span className="nc-meta-value">100% Online</span>
                </div>
              </div>
              <div className="nc-hero-actions">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="nc-btn-primary">
                  Enroll Now <ArrowRight size={18} />
                </a>
                <button onClick={() => document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth' })} className="nc-btn-ghost">
                  Explore Syllabus <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <div className="nc-hero-img">
              <img src={courseImg} alt="Full Stack Node.js Course" />
              <div className="nc-glow-orb" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== BUILT FOR JOB-READY DEVELOPERS ===== */}
      <section className="nc-section">
        <div className="nc-container">
          <div className="nc-section-header">
            <div className="nc-badge-dark"><span className="nc-dot" /> Why This Course</div>
            <h2 className="nc-section-title">Built for <span className="nc-yellow italic">Job-Ready</span> Developers</h2>
            <p className="nc-section-sub">
              This isn't another tutorial playlist. It's a structured, mentor-led engineering bootcamp 
              that mirrors how real MNC teams build software.
            </p>
          </div>
          <div className="nc-highlights-grid">
            {highlights.map((h, i) => (
              <div key={i} className="nc-highlight-card">
                <div className="nc-icon-box">
                  <h.icon size={24} />
                </div>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== YOUR DAILY LEARNING ROUTINE ===== */}
      <section className="nc-section nc-section-alt">
        <div className="nc-container">
          <div className="nc-section-header">
            <div className="nc-badge-dark"><span className="nc-dot" /> Daily Schedule</div>
            <h2 className="nc-section-title">YOUR DAILY LEARNING <span className="nc-yellow italic">ROUTINE</span></h2>
            <p className="nc-section-sub">
              Every day follows a structured pattern — live teaching, hands-on coding, 
              and doubt clearing. No passive watching.
            </p>
          </div>
          <div className="nc-routine-grid">
            {routine.map((r, i) => (
              <div key={i} className="nc-routine-card">
                <div className="nc-routine-time">{r.time}</div>
                <div className="nc-routine-icon">
                  <r.icon size={28} />
                </div>
                <h3>{r.label}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT MAKES THIS COURSE DIFFERENT ===== */}
      <section className="nc-section">
        <div className="nc-container">
          <div className="nc-section-header">
            <div className="nc-badge-dark"><span className="nc-dot" /> Our Edge</div>
            <h2 className="nc-section-title">What Makes This Course <span className="nc-yellow italic">Different</span></h2>
          </div>
          <div className="nc-diff-grid">
            {differentiators.map((d, i) => (
              <div key={i} className="nc-diff-card">
                <div className="nc-diff-icon">
                  <d.icon size={28} />
                </div>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FULL STACK SYLLABUS ===== */}
      <section id="syllabus" className="nc-section nc-section-alt">
        <div className="nc-container">
          <div className="nc-section-header">
            <div className="nc-badge-dark"><span className="nc-dot" /> Curriculum</div>
            <h2 className="nc-section-title">FULL STACK <span className="nc-yellow">NODE.JS</span> SYLLABUS</h2>
            <p className="nc-section-sub">
              Every module is built around real deliverables. You'll ship code every week.
            </p>
          </div>
          <div className="nc-syllabus-grid">
            {syllabus.map((s, i) => (
              <div key={i} className="nc-syllabus-card">
                <div className="nc-syllabus-phase">{s.phase}</div>
                <div className="nc-syllabus-icon">
                  <s.icon size={28} />
                </div>
                <h3>{s.title}</h3>
                <span className="nc-syllabus-weeks">{s.weeks}</span>
                <ul>
                  {s.topics.map((t, j) => (
                    <li key={j}><CheckCircle2 size={14} /> {t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SEE WHAT YOU'LL BUILD ===== */}
      <section className="nc-section">
        <div className="nc-container">
          <div className="nc-build-layout">
            <div className="nc-build-text">
              <div className="nc-badge-dark"><span className="nc-dot" /> Portfolio Projects</div>
              <h2 className="nc-section-title">See What You'll <span className="nc-yellow italic">Build</span></h2>
              <p className="nc-section-sub" style={{ textAlign: 'left' }}>
                By the end of this program, you'll have 4+ production-ready projects in your portfolio — 
                enough to impress any recruiter.
              </p>
              <div className="nc-build-list">
                {projects.map((p, i) => (
                  <div key={i} className="nc-build-item">
                    <div className="nc-build-num">0{i + 1}</div>
                    <div>
                      <h4>{p.title}</h4>
                      <p>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="nc-btn-primary" style={{ marginTop: '2rem' }}>
                Start Building Now <ArrowRight size={18} />
              </a>
            </div>
            <div className="nc-build-img">
              <img src={codingImg} alt="Projects you'll build" />
              <div className="nc-glow-orb" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="nc-cta">
        <div className="nc-container" style={{ textAlign: 'center' }}>
          <h2 className="nc-cta-title">
            READY TO <span className="nc-yellow">LEVEL UP?</span><br />
            DON'T MISS THIS BATCH.
          </h2>
          <p className="nc-cta-sub">
            Only 20 seats. Once filled, you'll have to wait for the next batch.
          </p>
          <div className="nc-cta-actions">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="nc-btn-primary large">
              Enroll Now — ₹9,999 <ArrowRight size={20} />
            </a>
            <Link to="/contact" className="nc-btn-outline">
              Speak to a Mentor
            </Link>
          </div>
          <p className="nc-cta-trust">Verified by top MNC Engineers from Google & Accenture.</p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="nc-section nc-section-alt">
        <div className="nc-container">
          <div className="nc-section-header">
            <div className="nc-badge-dark"><span className="nc-dot" /> Got Questions?</div>
            <h2 className="nc-section-title">Frequently Asked <span className="nc-yellow italic">Questions</span></h2>
          </div>
          <div className="nc-faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`nc-faq-item ${openFaq === i ? 'open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="nc-faq-q">
                  <span>{faq.q}</span>
                  <ChevronDown size={20} className={`nc-faq-arrow ${openFaq === i ? 'rotated' : ''}`} />
                </div>
                {openFaq === i && <div className="nc-faq-a">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MNC NETWORK ===== */}
      <section className="nc-logos-section">
        <div className="nc-container" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <p className="nc-logos-label">OUR STUDENTS ARE HIRED BY & MENTORS ARE FROM</p>
        </div>
        <LogoScroll />
      </section>

      <Footer />
    </div>
  );
};

export default NodeCourse;
