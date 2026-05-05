import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  ArrowUpRight,
  Globe
} from 'lucide-react';
import logo from '../assets/images/glitch-logo.webp';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden font-sans">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Top Section: CTA / Banner */}
        <div className="pt-24 pb-20 border-b border-white/10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-bold font-display mb-6 leading-tight tracking-tight">
              Ready to <span className="text-primary italic">glitch</span> the system?
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl mx-auto lg:mx-0">
              Join the elite league of software engineers taught by industry legends.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 w-full lg:w-auto">
            <Link to="/contact" className="btn-premium group py-5 px-10 text-lg">
              <span>Start Your Journey</span>
              <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 py-24">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block mb-8 group">
              <div className="bg-white px-8 py-4 rounded-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <img src={logo} alt="Glitch Logo" className="h-10 w-auto object-contain" />
              </div>
            </Link>
            <p className="text-slate-400 mb-10 leading-relaxed text-lg max-w-md">
              Bridging the gap between traditional education and high-performance software engineering with curriculum designed by MNC veterans.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Twitter, link: '#' },
                { icon: Linkedin, link: '#' },
                { icon: Instagram, link: '#' },
                { icon: Youtube, link: '#' }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.link} 
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-slate-900 hover:border-primary transition-all duration-300"
                >
                  <social.icon size={20} />
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
                    className="text-slate-400 hover:text-white transition-all text-lg font-bold flex items-center group"
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
              <a href="mailto:info@glitchskillhub.com" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-all duration-300 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Email Us</p>
                  <p className="text-lg font-bold text-white group-hover:text-primary transition-colors">info@glitchskillhub.com</p>
                </div>
              </a>
              
              <a href="tel:+919876543210" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-all duration-300 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Call Us</p>
                  <p className="text-lg font-bold text-white group-hover:text-primary transition-colors">+91 98765 43210</p>
                </div>
              </a>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Our Base</p>
                  <p className="text-lg font-bold text-white">HiTech City, Hyderabad</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="py-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <p className="text-slate-500 font-medium">
            © 2026 <span className="text-white">Glitch Skill Hub</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <Link to="/privacy" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
;
