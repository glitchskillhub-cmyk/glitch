import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import {
  CheckCircle2, Clock, Calendar, Zap, Users,
  Terminal, Code, Database, Layout, ShieldCheck,
  ArrowRight, Phone, Mail, Play, Star, ChevronRight,
  BookOpen, Target, Award, Cpu, Monitor, Globe,
  MessageSquare, FileCode, Briefcase, TrendingUp,
  ChevronDown, Layers, Server, Cloud,
  LineChart, FileText, X, Check, ArrowUpRight, PlayCircle
} from 'lucide-react';

import mentorImg from '../assets/images/mentor_rajesh.png';
import aaradhyaImg from '../assets/images/student_aaradhya.png';
import rohitImg from '../assets/images/student_rohit.png';
import mehakImg from '../assets/images/student_mehak.png';
import learningImg from '../assets/images/online_training.png';
import codingVisualImg from '../assets/images/coding.png';
import softwareWomanImg from '../assets/images/software_woman.png';
import toolsImg from '../assets/images/tools.png';
import LogoScroll from '../components/LogoScroll';
import brochurePdf from '../assets/MernFullStack-Brochure.pdf';
import './NodeCourse.css';

const NodeCourse = () => {
  const whatsappLink = "https://wa.me/916300127932?text=Hi%2C%20I%20checked%20the%20Node.js%20course%20and%20I%20am%20interested%20in%20it.";

  const [openFaq, setOpenFaq] = useState(null);
  const [activeWeek, setActiveWeek] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4500);
  };

  const handleDownloadBrochure = () => {
    const link = document.createElement('a');
    link.href = brochurePdf;
    link.download = 'MernFullStack-Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("📄 Your MERN 45-Day Engineering Brochure is downloading!");
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const trustPills = [
    "Production-Grade Architectures",
    "Automated Deployment Workflows",
    "Live System Code Reviews",
    "System Design & Scaling"
  ];

  const includesList = [
    "Recorded Code Walkthroughs",
    "Verifiable Project Certification",
    "Weekend & Weekday Slots",
    "1-on-1 Debugging Channels"
  ];

  const stats = [
    { count: "1000+", label: "Engineers Trained" },
    { count: "50+", label: "Production Cohorts" },
    { count: "100+", label: "Scalable Systems Built" },
    { count: "95%", label: "Professional Satisfaction" }
  ];

  const problemsSolutions = [
    {
      prob: "Getting stuck in generic tutorial hell.",
      sol: "Structured codebase roadmaps focusing on live backend execution."
    },
    {
      prob: "No production-grade projects on GitHub.",
      sol: "Build containerized MERN applications with live DB pooling."
    },
    {
      prob: "Learning legacy syntax and outdated concepts.",
      sol: "Write optimized modular ES6+ and automated containerized workflows."
    },
    {
      prob: "No code reviews or system feedback.",
      sol: "Direct architecture audits and code refactoring from senior mentors."
    }
  ];

  const testimonials = [
    {
      author: "Aaradhya M.",
      role: "Frontend Engineer",
      text: "“I refactored our company's state rendering patterns after mastering React hooks and component models here.”",
      img: aaradhyaImg
    },
    {
      author: "Rohit K.",
      role: "Full Stack Developer",
      text: "“Learning how to configure Docker containers and write database pools directly boosted my code shipping speed.”",
      img: rohitImg
    },
    {
      author: "Mehak S.",
      role: "Backend Specialist",
      text: "“The lessons on modular Express middleware and JWT security gave me the confidence to design our system APIs.”",
      img: mehakImg
    }
  ];

  const curriculumData = [
    {
      week: "Week 1",
      title: "Week 1 — Git Workflow & Advanced JavaScript",
      bullets: ["Git & GitHub Workflows", "ES6+ Functional Paradigms", "DOM Lifecycle Operations", "Async JavaScript Lifecycle", "Native API Promises & Pools"],
      desc: "Architect a solid programming core. Master advanced command line workflows, modular ES6+ execution trees, lifecycle DOM manipulations, thread-safe asynchronous handlers, and database connections."
    },
    {
      week: "Week 2",
      title: "Week 2 — Express.js Backend Architecture",
      bullets: ["Node.js Event Loop", "Express REST Standards", "Middleware Chain Design", "Data Schemas & Validators", "Global Exception Boundaries"],
      desc: "Build highly performant server architectures. Dive deep into the Node runtime event loop, design expressive API layers, write complex security middlewares, and configure server validations."
    },
    {
      week: "Week 3",
      title: "Week 3 — Database Modeling & Security Protocols",
      bullets: ["MongoDB Performance Schema", "JWT Authorization Layers", "Role-Based ACL Security", "Encryption & Hashing Cycles", "Data Indexing Strategies"],
      desc: "Implement rock-solid security structures. Design fast, index-optimized database document schemas, scale data models, establish state-of-the-art JWT session tokens, and build secure access control lists."
    },
    {
      week: "Week 4",
      title: "Week 4 — React.js Component Engineering",
      bullets: ["Modern React Hooks", "Dynamic Routing Architecture", "State Rendering Cycles", "Reusability Patterns", "Performance Optimization"],
      desc: "Develop slick, highly responsive user interfaces. Write clean React architectures, manage advanced hooks state, model custom routing systems, and resolve rendering bottlenecks."
    },
    {
      week: "Week 5",
      title: "Week 5 — State Management & DevOps Workflows",
      bullets: ["Context API & Redux Toolkit", "API Integration Systems", "Docker Containerization", "GitHub CI/CD Automation", "Production Server Hosting"],
      desc: "Orchestrate high-scale, connected platforms. Configure robust Redux data stores, build efficient server data fetching adapters, containerize platforms with Docker, and configure automated pipelines."
    },
    {
      week: "Week 6",
      title: "Week 6 — Advanced Refactoring & Capstone Deployments",
      bullets: ["Automated Debugging Systems", "Load Testing & Optimization", "Docker Cloud Deployments", "System Audits & Profiling", "Portfolio Refactoring"],
      desc: "Synthesize all skills to construct live, production-grade applications. Isolate runtime exceptions, perform system load tests, profile database query metrics, and launch cloud-native products."
    }
  ];

  const foundationSteps = [
    "Production Codebase Standards",
    "Continuous Live Code Audits",
    "Real-World Cloud Deployment",
    "Advanced System Design",
    "Interactive Peer Code Reviews"
  ];

  const projects = [
    {
      title: "E-Commerce Microservices",
      desc: "Scalable shopping platform with payment gateways, token sessions, and structured database models."
    },
    {
      title: "LMS Portal System",
      desc: "Interactive course engine with dashboard visualizations and customizable user permission roles."
    },
    {
      title: "Socket-Based Chat Engine",
      desc: "Real-time, persistent chat server supporting full web socket pipelines and active connection states."
    },
    {
      title: "Corporate Admin Console",
      desc: "High-performance analytics console featuring complex DB lookups, charts, and clean management grids."
    },
    {
      title: "Automated Invoice Engine",
      desc: "High-performance documentation builder running background PDF generation worker processes."
    },
    {
      title: "Modular Job Platform",
      desc: "Structured full-stack board featuring complex filters, user state caches, and secure credential parsing."
    }
  ];

  const mentors = [
    {
      name: "S. Rajesh",
      role: "Senior Software Engineer, Accenture",
      tag: "5+ Years Experience",
      desc: "Enterprise developer specializing in high-performance node architectures, cloud-native deployments, and advanced full-stack systems design."
    },
    {
      name: "Startup Core Engineers",
      role: "MNC Systems Specialists",
      tag: "Code Architects",
      desc: "Active engineers focused on shipping modular, clean, and highly scalable codebases under industry tight timelines."
    },
    {
      name: "DevOps Specialists",
      role: "Cloud & Automation Experts",
      tag: "Deployment Masters",
      desc: "Specialists training developers in Docker containerization, automated continuous integration systems, and cloud architecture."
    }
  ];

  const comparisonRows = [
    { feature: "Live Mentorship", glitch: true, other: false },
    { feature: "Daily Code Challenges", glitch: true, other: false },
    { feature: "Real Code Reviews", glitch: true, other: false },
    { feature: "DevOps & Cloud Pipelines", glitch: true, other: false },
    { feature: "System Design Deep-Dives", glitch: true, other: false },
    { feature: "Production DevOps", glitch: true, other: false },
    { feature: "Structured Roadmap", glitch: true, other: "Partial" },
    { feature: "Direct Accountability", glitch: true, other: false }
  ];

  const certifications = [
    { title: "Course Completion Certificate", desc: "Verifiable credentials confirming your proficiency in MERN architecture and modular application engineering." },
    { title: "Project Completion Certificate", desc: "Endorsement details validating that your deployed microservices and database configurations match MNC standards." },
    { title: "Mentor Endorsement", desc: "Technical skill validations and professional reviews from S. Rajesh on your portfolio files." },
    { title: "Portfolio Audit Seal", desc: "Direct validation that your GitHub codebase has been reviewed, refactored, and is ready for technical screenings." }
  ];

  const videoTestimonials = [
    { title: "Modular Architecture Review", desc: "Refactoring legacy React code to reusable functional components.", length: "4:12" },
    { title: "Database Pooling Insights", desc: "Scaling connection limits and query indices inside MongoDB.", length: "3:45" },
    { title: "Docker Deployment Session", desc: "Containerizing MERN projects and launching them on cloud nodes.", length: "5:20" },
    { title: "API Performance Scaling", desc: "Optimizing database queries and express servers for real-time load.", length: "4:05" }
  ];

  const pricingIncludes = [
    "45 Days Intensive Cohort",
    "Recorded Code Deep-Dives",
    "Live Interaction Classes",
    "6 Production Project Builds",
    "DevOps & Cloud Pipeline Toolkits",
    "Verifiable Project Seals",
    "Continuous Code Auditing"
  ];

  const faqs = [
    { q: "Do I need prior coding experience?", a: "No. The program starts from modern JS fundamentals and systematically transitions into high-level, production-grade system designs." },
    { q: "Will class recordings be provided?", a: "Yes. Every single live lecture is recorded and placed immediately in your archive directory for lifetime reference." },
    { q: "Will I learn architectural design patterns?", a: "Yes, absolutely. We skip basic toy demos. You will build actual microservices, database pools, MVC routing structures, middleware layers, and DevOps configurations." },
    { q: "Will I build real projects?", a: "Yes. You will design, build, containerize, and deploy 6 industrial MERN applications with live databases." },
    { q: "Is this suitable for working professionals?", a: "100%. We have tailored the schedules exclusively for working individuals, offering evening and weekend classes that fit clean code review timelines." },
    { q: "Will I learn automated testing?", a: "Yes. You will learn how to write unit and integration tests using Jest and Supertest, ensuring your APIs are robust and fail-safe before deployment." }
  ];

  // Code IDE Highlight Preview inside Hero
  const codeSnippet = `// Production Express Middleware
const checkAuthToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Unauthorized');
    
    // JWT Verification & Role Parse
    const userPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(userPayload.id).select('-password');
    
    next();
  } catch (error) {
    res.status(401).json({ success: false, msg: error.message });
  }
};`;

  return (
    <div className="nc-page">
      <SEO
        title="MERN Stack Developer 45-Day Engineering Cohort"
        description="Master scalable MERN stacks, DevOps containers, and advanced backend systems. High-contrast, no-fluff skills academy."
        path="/node-js-course"
      />
      <Navbar />

      {/* ===== 1. HERO SECTION ===== */}
      <section className="nc-hero">
        <div className="nc-container">
          <div className="nc-hero-grid">

            <div className="nc-hero-text">
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <div className="nc-badge-glow" style={{ marginBottom: 0 }}>
                  <span className="nc-dot pulse" /> DESIGNED FOR WORKING PROFESSIONALS
                </div>
                <div className="nc-badge-glow" style={{ background: 'rgba(15, 23, 42, 0.05)', color: '#0f172a', borderColor: 'rgba(15, 23, 42, 0.1)', marginBottom: 0 }}>
                  <span className="nc-dot" style={{ background: '#0f172a' }} /> MENTOR FROM ACCENTURE
                </div>
              </div>
              <h1 className="nc-hero-title">
                Become a <br />
                <span className="nc-yellow italic">MERN Stack</span> Developer <br />
                in 45 Days
              </h1>
              <p className="nc-hero-sub">
                <strong>Designed for Working Professionals.</strong> Master MongoDB, Express.js, React.js, Node.js, and automated deployment workflows through live practical training from an Accenture Senior Software Engineer.
              </p>

              {/* Hero Trust List Grid */}
              <div className="nc-hero-trust-list">
                {trustPills.map((pill, i) => (
                  <div key={i} className="nc-hero-trust-item">
                    <CheckCircle2 size={16} className="nc-yellow" style={{ flexShrink: 0 }} />
                    <span>{pill}</span>
                  </div>
                ))}
              </div>

              <div className="nc-hero-actions">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="nc-btn-primary">
                  ENROLL NOW <ArrowRight size={18} />
                </a>
                <button onClick={handleDownloadBrochure} className="nc-btn-outline">
                  DOWNLOAD BROCHURE <FileText size={18} className="nc-yellow" />
                </button>
              </div>
            </div>

            {/* HERO RIGHT: Crispy IDE code preview + pricing badge */}
            <div className="nc-hero-sidebar-bento">
              {/* Mock IDE Code Panel */}
              <div className="nc-ide-panel">
                <div className="nc-ide-header">
                  <div className="nc-ide-dots">
                    <span className="nc-ide-dot red" />
                    <span className="nc-ide-dot yellow" />
                    <span className="nc-ide-dot green" />
                  </div>
                  <span className="nc-ide-file-title">authMiddleware.js</span>
                </div>
                <div className="nc-ide-body">
                  <pre><code>{codeSnippet}</code></pre>
                </div>
              </div>

              {/* Connected Pricing Card */}
              <div className="nc-pricing-card-hero">
                <div className="nc-pricing-card-hero-header">
                  <div>
                    <span className="nc-p-tag">PROGRAM FEE</span>
                    <h3 className="nc-p-huge">₹9,999</h3>
                  </div>
                  <div className="nc-p-features">
                    {includesList.slice(0, 2).map((item, i) => (
                      <div key={i} className="nc-p-f-item">
                        <Check size={14} className="nc-yellow" /> <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="nc-pricing-card-hero-footer">
                  <img src={mentorImg} alt="S. Rajesh" className="nc-p-avatar" />
                  <div>
                    <h5 className="nc-p-name">S. Rajesh</h5>
                    <p className="nc-p-title">Senior Software Engineer, Accenture</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== TOOLS WE USE SECTION ===== */}
      <section className="nc-section nc-tools-section">
        <div className="nc-container">
          <div className="nc-section-header">
            <div className="nc-badge-dark"><span className="nc-dot" /> TOOLCHAIN</div>
            <h2 className="nc-section-title">Production Tools We Master In This Course</h2>
            <p className="nc-section-sub">
              Get hands-on command over the exact technology stack, libraries, database systems, and cloud environments used by high-performance engineering teams.
            </p>
          </div>
          <div className="nc-tools-visual-wrap">
            <img src={toolsImg} alt="Tools we master in the MERN course" className="nc-tools-img" />
          </div>
        </div>
      </section>

      {/* ===== 2. STATS SECTION ===== */}
      <section className="nc-section nc-section-alt">
        <div className="nc-container">
          <div className="nc-section-header">
            <h2 className="nc-section-title">Helping Students Build Real Software Careers</h2>
          </div>

          <div className="nc-stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="nc-stat-card-crisp">
                <h3 className="nc-stat-value-crisp">{stat.count}</h3>
                <p className="nc-stat-label-crisp">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Scrolling Logos */}
          <div className="nc-logos-strip-section">
            <p className="nc-logos-strip-lbl">VERIFIED MENTOR NETWORK FROM LEADING SAAS & PRODUCT CORPS</p>
            <LogoScroll />
          </div>
        </div>
      </section>

      {/* ===== 3. PROBLEM → SOLUTION SECTION ===== */}
      <section className="nc-section">
        <div className="nc-container">
          <div className="nc-section-header">
            <div className="nc-badge-dark"><span className="nc-dot" /> WHY GLITCH</div>
            <h2 className="nc-section-title">Turning Learning Confusion Into Career Progress</h2>
          </div>

          <div className="nc-build-layout" style={{ alignItems: 'stretch' }}>
            {/* Left High-Impact Bento Panel with Practical Learning Image */}
            <div className="nc-bento-visual-panel">
              <img src={learningImg} alt="MERN Practical Coding Workflows" className="nc-bento-card-image" />
              <div className="nc-quote-symbol" style={{ top: '150px' }}>“</div>
              <h3 className="nc-bento-heading" style={{ marginTop: '1.5rem' }}>
                Write production-grade APIs. Bypass simplistic toy code.
              </h3>
              <p className="nc-bento-desc">
                Recruiters scan portfolios for actual system details: connection pools, middleware authorization limits, clean models, and Docker deployments. Glitch gets you shipping clean systems immediately.
              </p>

              {/* System Developer Demand block */}
              <div className="nc-bento-stat-card">
                <span className="nc-bento-stat-val">82%</span>
                <div>
                  <h4 className="nc-bento-stat-title">Companies Seek Complete MERN Developers</h4>
                  <p className="nc-bento-stat-sub">Teams recruit engineers who manage complete features from DB pooling to client rendering.</p>
                </div>
              </div>
            </div>

            {/* Right Problems vs. Solutions */}
            <div className="nc-problems-solutions-box">
              {problemsSolutions.map((item, i) => (
                <div key={i} className="nc-prob-sol-card">
                  <div className="nc-prob-row">
                    <span className="nc-prob-tag">PROBLEM</span>
                    <p className="nc-prob-text">{item.prob}</p>
                  </div>
                  <div className="nc-sol-row">
                    <span className="nc-sol-tag">SOLUTION</span>
                    <p className="nc-sol-text">{item.sol}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. STUDENT SUCCESS STORIES (WITH IMAGE MARQUEE SCROLLER) ===== */}
      <section className="nc-section nc-section-alt" style={{ overflow: 'hidden' }}>
        <div className="nc-container">
          <div className="nc-section-header">
            <div className="nc-badge-dark"><span className="nc-dot" /> SUCCESS STORIES</div>
            <h2 className="nc-section-title">Real Student Career Transformations</h2>
          </div>
        </div>

        {/* Horizontal Infinite Marquee Scroller */}
        <div className="nc-marquee-container">
          <div className="nc-marquee-track">
            {/* First Set */}
            {testimonials.map((t, i) => (
              <div key={`marquee-1-${i}`} className="nc-testimonial-card-marquee">
                <div className="nc-quote-symbol-card" style={{ fontSize: '3rem', top: '0.2rem' }}>“</div>
                <p className="nc-testimonial-text-crisp" style={{ fontSize: '0.88rem', minHeight: '90px' }}>{t.text}</p>
                <div className="nc-testimonial-divider-crisp" />
                <div className="nc-testimonial-user-row">
                  <img src={t.img} alt={t.author} className="nc-testimonial-user-avatar" />
                  <div>
                    <h4 className="nc-testimonial-author-crisp" style={{ fontSize: '0.85rem' }}>{t.author}</h4>
                    <p className="nc-testimonial-role-crisp" style={{ fontSize: '0.68rem' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Second Set for seamless looping */}
            {testimonials.map((t, i) => (
              <div key={`marquee-2-${i}`} className="nc-testimonial-card-marquee">
                <div className="nc-quote-symbol-card" style={{ fontSize: '3rem', top: '0.2rem' }}>“</div>
                <p className="nc-testimonial-text-crisp" style={{ fontSize: '0.88rem', minHeight: '90px' }}>{t.text}</p>
                <div className="nc-testimonial-divider-crisp" />
                <div className="nc-testimonial-user-row">
                  <img src={t.img} alt={t.author} className="nc-testimonial-user-avatar" />
                  <div>
                    <h4 className="nc-testimonial-author-crisp" style={{ fontSize: '0.85rem' }}>{t.author}</h4>
                    <p className="nc-testimonial-role-crisp" style={{ fontSize: '0.68rem' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Third Set to guarantee no white spaces on large monitors */}
            {testimonials.map((t, i) => (
              <div key={`marquee-3-${i}`} className="nc-testimonial-card-marquee">
                <div className="nc-quote-symbol-card" style={{ fontSize: '3rem', top: '0.2rem' }}>“</div>
                <p className="nc-testimonial-text-crisp" style={{ fontSize: '0.88rem', minHeight: '90px' }}>{t.text}</p>
                <div className="nc-testimonial-divider-crisp" />
                <div className="nc-testimonial-user-row">
                  <img src={t.img} alt={t.author} className="nc-testimonial-user-avatar" />
                  <div>
                    <h4 className="nc-testimonial-author-crisp" style={{ fontSize: '0.85rem' }}>{t.author}</h4>
                    <p className="nc-testimonial-role-crisp" style={{ fontSize: '0.68rem' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


      </section>

      {/* ===== 5. CURRICULUM SECTION ===== */}
      <section id="curriculum" className="nc-section">
        <div className="nc-container">
          <div className="nc-section-header">
            <div className="nc-badge-dark"><span className="nc-dot" /> FULL CURRICULUM</div>
            <h2 className="nc-section-title">Advanced MERN Curriculum Designed for Real Product Development</h2>
          </div>

          <div className="nc-interactive-curriculum-grid">
            {/* Left week selector */}
            <div className="nc-week-selector">
              {curriculumData.map((data, idx) => (
                <button
                  key={idx}
                  className={`nc-week-tab-btn-crisp ${activeWeek === idx ? 'active' : ''}`}
                  onClick={() => setActiveWeek(idx)}
                >
                  <span className="nc-week-tab-num-crisp">0{idx + 1}</span>
                  <span className="nc-week-tab-lbl-crisp">{data.week}</span>
                </button>
              ))}
            </div>

            {/* Right details box */}
            <div className="nc-week-details-card-crisp">
              <span className="nc-week-badge-crisp">MODULE 0{activeWeek + 1}</span>
              <h3 className="nc-week-title-crisp">{curriculumData[activeWeek].title}</h3>
              <p className="nc-week-desc-crisp">{curriculumData[activeWeek].desc}</p>

              <div className="nc-week-divider-crisp" />

              <h4 className="nc-week-topics-title-crisp">Concepts Covered:</h4>
              <div className="nc-week-topics-grid-crisp">
                {curriculumData[activeWeek].bullets.map((bullet, idx) => (
                  <div key={idx} className="nc-week-topic-item-crisp">
                    <CheckCircle2 size={14} className="nc-yellow" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </div>
      </section>




      {/* ===== 10. CERTIFICATION SECTION (WITH PREVIEW IMAGE) ===== */}
      <section className="nc-section nc-section-alt">
        <div className="nc-container">
          <div className="nc-section-header">
            <div className="nc-badge-dark"><span className="nc-dot" /> CERTIFICATIONS</div>
            <h2 className="nc-section-title">Industry-Recognized Completion Credentials</h2>
          </div>

          <div className="nc-build-layout nc-cert-layout">

            {/* Left Certificates list */}
            <div className="nc-week-selector" style={{ gap: '1rem' }}>
              {certifications.map((cert, i) => (
                <div key={i} className="nc-cert-card-crisp" style={{ padding: '1.5rem 2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <Award size={18} className="nc-yellow" />
                    <h3 className="nc-cert-title" style={{ margin: 0, fontSize: '1rem' }}>{cert.title}</h3>
                  </div>
                  <p className="nc-cert-desc" style={{ margin: 0, fontSize: '0.85rem' }}>{cert.desc}</p>
                </div>
              ))}
            </div>

            {/* Right Software Woman Visual */}
            <div className="nc-cert-visual-container">
              <img src={softwareWomanImg} alt="Glitch Professional MERN Software Engineering" className="nc-cert-preview-img" />
              <div className="nc-cert-visual-glow" />
            </div>

          </div>

          <div className="nc-cert-footer-note" style={{ marginTop: '4rem' }}>
            * Certificates are issued after successful technical assessment and project completion audits.
          </div>
        </div>
      </section>



      {/* ===== 12. FINAL CTA BANNER ===== */}
      <section className="nc-section nc-section-alt" style={{ padding: '5rem 0' }}>
        <div className="nc-container">
          <div className="nc-cta-box-card-crisp">

            <div className="nc-cta-left-crisp">
              <span className="nc-badge-tag-crisp">GET STARTED</span>
              <h2 className="nc-cta-card-title-crisp">Don’t Wait to Start Your Growth Journey</h2>
              <p className="nc-cta-card-desc-crisp">
                Build job-ready MERN stack skills with practical projects, containerized DevOps, and live mentor guidance.
              </p>

              <div className="nc-cta-card-actions-crisp">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="nc-btn-primary large">
                  Reserve Your Seat <ArrowRight size={18} />
                </a>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="nc-btn-outline" style={{ border: '2px solid #ca8a04', color: '#ca8a04' }}>
                  WhatsApp Us <Phone size={16} />
                </a>
              </div>
            </div>

            <div className="nc-cta-right-crisp">
              <h4 className="nc-cta-features-title">Engineered Capabilities Covered:</h4>
              <ul className="nc-cta-features-list">
                <li><CheckCircle2 size={16} className="nc-yellow" /> Beginner Friendly Systems</li>
                <li><CheckCircle2 size={16} className="nc-yellow" /> Live Practical Debugging</li>
                <li><CheckCircle2 size={16} className="nc-yellow" /> Continuous Integration CI/CD</li>
                <li><CheckCircle2 size={16} className="nc-yellow" /> Production Server Scaling</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ===== 13. PRICING SECTION ===== */}
      <section id="pricing" className="nc-section">
        <div className="nc-container">
          <div className="nc-section-header">
            <div className="nc-badge-dark"><span className="nc-dot" /> PROGRAMME FEES</div>
            <h2 className="nc-section-title">Simple Pricing. Complete Access.</h2>
          </div>

          <div className="nc-pricing-card-standalone-crisp">
            <div className="nc-pricing-left-crisp">
              <span className="nc-pricing-tag-crisp">MERN 45-DAY ENGINE</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '1rem 0' }}>
                <span className="nc-pricing-huge-price-crisp">₹9,999</span>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 800 }}>One-time payment</span>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                Access fully interactive sessions, code review structures, containerization configurations, and lifetime video folders.
              </p>

              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="nc-btn-primary large" style={{ width: '100%', justifyContent: 'center' }}>
                RESERVE YOUR SEAT NOW
              </a>
              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8', marginTop: '1rem' }}>
                * Limited seats available for the upcoming cohort.
              </p>
            </div>

            <div className="nc-pricing-right-crisp">
              <h4 className="nc-pricing-includes-title">What is Included:</h4>
              <div className="nc-pricing-includes-grid">
                {pricingIncludes.map((item, i) => (
                  <div key={i} className="nc-pricing-includes-item">
                    <CheckCircle2 size={16} className="nc-yellow" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ===== 15. FOOTER SECTION ===== */}
      <footer className="nc-footer-block-crisp">
        <div className="nc-container">
          <div className="nc-footer-grid-crisp">

            <div className="nc-footer-brand-crisp">
              <h3 className="nc-footer-logo-title-crisp">Glitch Skill Hub</h3>
              <p className="nc-footer-logo-desc-crisp">
                Premium practical training platform focused on modern software engineering and cloud-native MERN development.
              </p>
            </div>

            <div className="nc-footer-links-crisp">
              <h4 className="nc-footer-header-lbl-crisp">Quick Links</h4>
              <ul className="nc-footer-ul-crisp">
                <li><button onClick={() => scrollToSection('curriculum')}>Curriculum</button></li>
                <li><button onClick={() => scrollToSection('curriculum')}>Projects</button></li>
                <li><button onClick={() => scrollToSection('curriculum')}>Testimonials</button></li>
                <li><button onClick={() => scrollToSection('pricing')}>Pricing</button></li>
              </ul>
            </div>

            <div className="nc-footer-contact-crisp">
              <h4 className="nc-footer-header-lbl-crisp">Contact Info</h4>
              <ul className="nc-footer-ul-crisp text-slate-300">
                <li>📞 Phone: <strong>+91 6300 127932</strong></li>
                <li>✉️ Email: <strong>info@glitchedu.online</strong></li>
              </ul>
            </div>

          </div>

          <div className="nc-footer-bottom-crisp">
            <p>© {new Date().getFullYear()} Glitch Skill Hub. All rights reserved. Designed for Working Professionals & Developers.</p>
          </div>
        </div>
      </footer>

      {/* Video Modal Player (mock state) */}
      {activeVideoModal && (
        <div className="nc-video-modal-backdrop" onClick={() => setActiveVideoModal(null)}>
          <div className="nc-video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="nc-video-modal-close" onClick={() => setActiveVideoModal(null)}>
              <X size={20} />
            </button>
            <div className="nc-mock-player-box">
              <div className="nc-mock-player-spinner">
                <PlayCircle size={64} className="nc-yellow animate-pulse" />
                <h3>Simulating Student Skill Review</h3>
                <p>"{activeVideoModal.title} — {activeVideoModal.desc}"</p>
                <span className="nc-video-length">Video Length: {activeVideoModal.length} mins</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Toast Feedback Notification */}
      {showToast && (
        <div className="nc-toast-notification">
          <span>{toastMessage}</span>
          <button className="nc-toast-close" onClick={() => setShowToast(false)}><X size={14} /></button>
        </div>
      )}
    </div>
  );
};

export default NodeCourse;
