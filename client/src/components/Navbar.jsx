import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, ChevronRight, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Import Logo
import logo from '../assets/images/glitch-logo.webp';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Mentors', path: '/mentors' },
    { name: 'Our Story', path: '/about' },
    { name: 'Get in Touch', path: '/contact' },
  ];

  const getDashboardPath = () => {
    if (!user) return '/login';
    return user.role === 'mentor' ? '/mentor/dashboard' : '/student/dashboard';
  };

  const getProfilePath = () => {
    if (!user) return '/login';
    return user.role === 'mentor' ? '/mentor/dashboard' : '/student/settings';
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    navigate(getProfilePath());
  };

  const handleHubClick = (e) => {
    e.preventDefault();
    navigate(getDashboardPath());
  };

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 transition-all duration-500 ${isScrolled ? 'top-4' : 'top-8'}`}>
      <div className={`flex items-center justify-between px-8 py-3 rounded-[2rem] border transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-2xl shadow-2xl border-slate-100' : 'bg-white border-transparent shadow-lg'}`}>
        
        {/* Logo Container */}
        <Link to="/" className="group flex items-center">
          <div className="bg-slate-950 px-6 py-3 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <img src={logo} alt="Glitch Logo" className="h-8 w-auto object-contain" />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-xs font-bold uppercase tracking-[0.15em] transition-all relative group/link ${location.pathname === link.path ? 'text-primary' : 'text-slate-400 hover:text-black'}`}
            >
              {link.name}
              <div className={`absolute -bottom-1 left-0 h-1 bg-primary transition-all duration-300 rounded-full ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover/link:w-1/2'}`}></div>
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <Link to="/login" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">
              Login
            </Link>
          ) : (
            <button 
              onClick={handleProfileClick}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-colors cursor-pointer"
            >
              <User size={16} /> Profile
            </button>
          )}
          <button 
            onClick={handleHubClick}
            className="btn-premium py-2 px-6 text-xs group cursor-pointer"
          >
            <span>{user ? 'My Hub' : 'Join Hub'}</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-black"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full mt-4 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xl transition-all duration-500 origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-2xl font-bold uppercase tracking-tighter ${location.pathname === link.path ? 'text-primary' : 'text-slate-900'}`}
            >
              {link.name}
            </Link>
          ))}
          <button 
            onClick={() => { setIsMobileMenuOpen(false); navigate(getDashboardPath()); }}
            className="btn-premium py-5 mt-4"
          >
            <span>{user ? 'My Dashboard' : 'Join The Hub'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
