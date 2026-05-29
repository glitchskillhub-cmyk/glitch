import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  MapPin, 
  Phone, 
  ArrowUpRight,
  Globe
} from 'lucide-react';
import logo from '../assets/images/glitch-logo.webp';

const Footer = () => {
  return (
    <footer className="bg-white text-slate-900 relative overflow-hidden font-sans border-t border-slate-100">
      {/* Decorative Background Glows - Subtle for light mode */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Top Section: CTA / Banner */}
        <div className="pt-10 pb-16">
           <div className="bg-slate-950 rounded-[3rem] p-12 md:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_100%_0%,rgba(250,204,21,0.2)_0%,transparent_60%)] pointer-events-none"></div>
              
              <div className="max-w-3xl text-center lg:text-left relative z-10">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] tracking-tighter text-white">
                  Ready to <span className="text-primary italic">glitch</span> <br className="hidden md:block" /> the system?
                </h2>
                <p className="text-slate-400 text-xl font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Join the elite league of software engineers taught by industry legends. Build real-world projects and accelerate your career.
                </p>
              </div>
              <div className="flex relative z-10 w-full lg:w-auto justify-center shrink-0">
                <Link to="/contact" className="group py-6 px-10 text-lg bg-primary text-slate-950 rounded-[2.5rem] flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(250,204,21,0.3)]">
                  <span className="font-black uppercase tracking-widest text-sm">Start Your Journey</span>
                  <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
           </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 py-24">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block mb-8 group">
              <div className="bg-slate-950 px-8 py-4 rounded-2xl border border-slate-800 transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]">
                <img src={logo} alt="Glitch Logo" className="h-10 w-auto object-contain" />
              </div>
            </Link>
            <p className="text-slate-500 mb-10 leading-relaxed text-lg max-w-md">
              Bridging the gap between traditional education and high-performance software engineering with curriculum designed by MNC veterans.
            </p>
            <div className="flex gap-4">
              {[
                { name: 'Twitter', icon: 'fa-brands fa-x-twitter', link: '#' },
                { name: 'Linkedin', icon: 'fa-brands fa-linkedin-in', link: '#' },
                { name: 'Instagram', icon: 'fa-brands fa-instagram', link: '#' },
                { name: 'Youtube', icon: 'fa-brands fa-youtube', link: '#' }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.link} 
                  className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-slate-900 hover:border-primary transition-all duration-300 group"
                  aria-label={social.name}
                >
                  <i className={`${social.icon} text-lg transition-transform group-hover:scale-110`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-10">Exploration</h4>
            <ul className="space-y-6">
              {[
                { name: 'Start', path: '/' },
                { name: 'Programs', path: '/programs' },
                { name: 'Mentors', path: '/mentors' },
                { name: 'Our Story', path: '/about' },
                { name: 'Get in Touch', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-slate-500 hover:text-slate-900 transition-all text-lg font-bold flex items-center group"
                  >
                    <span className="relative">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5">
            <h4 className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-10">Direct Contact</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-10">
              <a href="mailto:info@glitchedu.online" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-all duration-300 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Email Us</p>
                  <p className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">info@glitchedu.online</p>
                </div>
              </a>
              
              <a href="tel:6300127932" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-all duration-300 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Call Us</p>
                  <p className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">6300127932</p>
                </div>
              </a>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Our Base</p>
                  <p className="text-lg font-bold text-slate-900">HiTech City, Hyderabad</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="py-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <p className="text-slate-500 font-medium">
            © 2026 <span className="text-slate-900 font-bold">Glitch Skill Hub</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <Link to="/privacy" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Terms of Service</Link>
            <Link to="/refund" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Refund Policy</Link>
            <Link to="/cookies" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
