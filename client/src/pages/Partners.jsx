import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import {
  Users, BookOpen, MapPin, CheckCircle2, TrendingUp, Presentation,
  Briefcase, Code, GraduationCap, MonitorPlay, FileText, Award,
  Headphones, Building2, User, Mail, Phone, Map, Send, Zap, ShieldCheck
} from 'lucide-react';

// Import Assets (using same as Home for consistency if needed, or placeholder)
import mentorsImg from '../assets/images/mentors.png';
import collaborationImg from '../assets/images/institute_collaboration.png';

const Partners = () => {
  const [formData, setFormData] = useState({
    instituteName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format the message for WhatsApp
    const text = `*New Partnership Inquiry*%0A%0A*Institute Name:* ${formData.instituteName}%0A*Contact Person:* ${formData.contactName}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email}%0A*Location:* ${formData.location}%0A*Message:* ${formData.message}`;
    
    // WhatsApp URL (replace with actual number)
    const whatsappUrl = `https://wa.me/916300127402?text=${text}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-primary selection:text-black">
      <SEO 
        title="Partner With Us | Glitch Skill Hub" 
        description="Empowering Training Institutes with AI-Powered Learning, Internships & Career Success Programs." 
        path="/partners" 
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 md:pt-48 pb-14 md:pb-20 relative overflow-hidden bg-slate-50">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(250,204,21,0.1)_0%,transparent_50%)]"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="badge-modern mx-auto mb-8">
            <span></span> AI-Powered Learning Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-8">
            Partner With <br /> <span className="text-primary">Glitch Skill Hub.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Empowering Training Institutes with AI-Powered Learning, Internships & Career Success Programs.
          </p>
        </div>
      </section>

      {/* Introduction / Collaboration Section */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -z-10 pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -z-10 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 relative w-full">
              <div className="bento-card p-0 overflow-hidden aspect-[4/3] bg-slate-100 shadow-2xl rounded-[2rem] group">
                <img src={collaborationImg} alt="Institute Collaboration" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10"></div>
            </div>
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-slate-50 text-sm font-bold tracking-widest uppercase mb-8 text-slate-600">
                 <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Open Collaboration
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-slate-900 mb-6">
                Empowering IT Institutes Across India.
              </h2>
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
                Glitch Skill Hub is an online learning platform helping institutes deliver practical, industry-focused, and AI-powered education through live classes, recorded sessions, internships, and placement guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="p-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-2">100<span className="text-primary">+</span></h3>
              <p className="text-sm font-bold tracking-widest text-slate-500 uppercase">Working Professionals Associated</p>
            </div>
            <div className="p-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                <BookOpen size={32} />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-2">20<span className="text-primary">+</span></h3>
              <p className="text-sm font-bold tracking-widest text-slate-500 uppercase">Top IT Courses</p>
            </div>
            <div className="p-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                <MapPin size={32} />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-2">Pan India</h3>
              <p className="text-sm font-bold tracking-widest text-slate-500 uppercase">Institute Partnerships</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Institutes Partner With Us */}
      <section className="py-16 md:py-24 overflow-hidden relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="badge-modern mb-8"><span></span> Strategic Growth</div>
              <h2 className="section-title mb-8">Why Institutes <br /><span className="text-primary">Partner With Us.</span></h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Become the first AI-enabled training institute in your region. Deliver next-generation training powered by industry experts and cutting-edge tools.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Add AI Training Without Hiring AI Experts",
                  "Upgrade Existing Courses Instantly",
                  "Increase Student Enrollments",
                  "Stay Ahead Of Competitors",
                  "Access Industry Mentors",
                  "AI Workshops & Faculty Development"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-100 hover:border-primary/30 transition-colors shadow-sm">
                    <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                    <span className="font-bold text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 relative hidden lg:block">
               <div className="bento-card p-0 overflow-hidden aspect-[4/5] bg-slate-200 shadow-2xl relative z-10">
                 <img src={mentorsImg} alt="Institute Partnership" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end p-8">
                   <p className="text-white font-bold text-2xl leading-tight">Transforming Futures Together.</p>
                 </div>
               </div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 rounded-full blur-[100px] -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="badge-modern mx-auto mb-8"><span></span> Value Proposition</div>
            <h2 className="section-title mb-6">Partnership <span className="text-primary">Benefits.</span></h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Comprehensive programs and support to help institutes deliver exceptional outcomes for students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Presentation, title: "Industry Expert Sessions", desc: "Live sessions by working professionals from top companies." },
              { icon: Briefcase, title: "Internship Programs", desc: "Real-world project exposure and practical experience." },
              { icon: TrendingUp, title: "Placement Readiness", desc: "Resume building, LinkedIn optimization, mock interviews." },
              { icon: Code, title: "Project-Based Learning", desc: "Industry-standard projects and hands-on implementation." },
              { icon: Zap, title: "Technology Workshops", desc: "AI, Full Stack, Data Analytics, UI/UX and emerging technologies." },
              { icon: GraduationCap, title: "Career Guidance", desc: "Roadmaps, mentoring and professional development support." }
            ].map((benefit, i) => (
              <div key={i} className="bento-card group hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <benefit.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-primary/10 border border-primary/20 rounded-2xl p-6 md:p-8 flex items-center gap-6 justify-center text-center">
             <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-black shrink-0 hidden sm:flex">
               <ShieldCheck size={24} />
             </div>
             <p className="text-lg font-bold text-slate-800">
               We integrate AI tools and mindset into every learning path to create <span className="text-primary">future-ready professionals.</span>
             </p>
          </div>
        </div>
      </section>

      {/* Platform Highlights */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title mb-6">Our Platform <span className="text-primary">Highlights.</span></h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: MonitorPlay, title: "Online Platform", desc: "Access anytime, anywhere." },
              { icon: Presentation, title: "Recording Classes", desc: "Missed a class? Re-watch anytime." },
              { icon: Code, title: "Task Based Training", desc: "Hands-on tools & assignments." },
              { icon: FileText, title: "Study Resources", desc: "Notes, materials, templates 24/7." },
              { icon: Award, title: "Certificate of Completion", desc: "Industry-recognized certificates." },
              { icon: Headphones, title: "Dedicated Support", desc: "Get doubt support & guidance." }
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 text-center hover:border-primary transition-colors shadow-sm">
                <div className="w-12 h-12 mx-auto bg-slate-50 rounded-full flex items-center justify-center text-primary mb-4">
                  <feature.icon size={24} />
                </div>
                <h4 className="font-bold text-sm mb-2">{feature.title}</h4>
                <p className="text-xs text-slate-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-8">
                Let's Build The <br/><span className="text-primary">Future</span> Together.
              </h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                Join our growing network of training institutes across India. Empowering Institutes. Creating Careers.
              </p>
              
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">Stronger Partnerships.</h3>
                <h3 className="text-2xl font-bold mb-0 text-white">Better Futures.</h3>
              </div>
            </div>

            <div className="flex-1 w-full max-w-lg">
              <div className="bg-white text-slate-900 rounded-3xl p-8 md:p-10 shadow-2xl relative">
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary rounded-full blur-xl opacity-50"></div>
                
                <h3 className="text-2xl font-bold mb-8">Ready to Collaborate?</h3>
                
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <Building2 size={16} className="text-primary"/> Institute Name
                    </label>
                    <input 
                      type="text" 
                      name="instituteName"
                      required
                      value={formData.instituteName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="e.g. Apex Tech Academy"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <User size={16} className="text-primary"/> Contact Person
                      </label>
                      <input 
                        type="text" 
                        name="contactName"
                        required
                        value={formData.contactName}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Phone size={16} className="text-primary"/> Phone Number
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Mail size={16} className="text-primary"/> Email Address
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="contact@institute.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Map size={16} className="text-primary"/> City/Location
                      </label>
                      <input 
                        type="text" 
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Hyderabad, Telangana"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Message (Optional)</label>
                    <textarea 
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your institute and partnership goals..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full btn-premium py-4 flex items-center justify-center gap-2 text-lg shadow-lg"
                  >
                    Connect via WhatsApp <Send size={20} />
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-4">
                    You will be redirected to WhatsApp to send these details securely.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partners;
