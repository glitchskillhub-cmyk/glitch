import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Globe, ChevronRight } from 'lucide-react';
import logo from '../assets/images/glitch-logo.webp';

const Footer = () => {
  return (
    <footer className="bg-white pt-32 pb-16 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-5">
            <Link to="/" className="group inline-block mb-10">
              <div className="bg-slate-950 px-8 py-4 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                <img src={logo} alt="Glitch Logo" className="h-10 w-auto object-contain" />
              </div>
            </Link>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-md">
              Bridging the gap between traditional education and high-performance software engineering. Taught by MNC experts.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Linkedin', 'Instagram', 'Youtube'].map((social) => (
                <a key={social} href="#" className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-black hover:border-primary transition-all">
                   <Globe size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10">Exploration</h4>
            <ul className="space-y-6">
              {[
                { name: 'Start', path: '/' },
                { name: 'Our Story', path: '/about' },
                { name: 'Mentors', path: '/services' },
                { name: 'Get in Touch', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-lg font-bold hover:text-primary transition-colors flex items-center gap-2 group">
                    <ChevronRight size={16} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10">Direct Contact</h4>
            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-primary transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Us</p>
                  <p className="text-lg font-bold">info@glitchskillhub.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-primary transition-colors">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Call Us</p>
                  <p className="text-lg font-bold">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-primary transition-colors">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Our Base</p>
                  <p className="text-lg font-bold">HiTech City, Hyderabad</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-400 text-sm font-medium">© 2026 Glitch Skill Hub. All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
