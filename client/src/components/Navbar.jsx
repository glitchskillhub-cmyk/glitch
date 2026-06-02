import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, ChevronRight, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import AuthModal from './AuthModal';

// Import Logo
import logo from '../assets/images/glitch-logo.webp';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const { user, logout } = useAuth();
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

  // Verify session is still valid before navigating to protected routes
  const handleProtectedNavigation = (path) => {
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    if (loginTimestamp) {
      const elapsed = Date.now() - parseInt(loginTimestamp, 10);
      if (elapsed >= 60 * 60 * 1000) {
        // Session expired — force logout via AuthContext
        logout();
        toast('Your session has expired. Please log in again.', { icon: '⏰', duration: 5000 });
        return;
      }
    }
    navigate(path);
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
            <>
              <button 
                onClick={() => { setAuthModalMode('login'); setIsAuthModalOpen(true); }}
                className="py-2 px-6 text-xs font-bold uppercase tracking-widest border-2 border-slate-900 rounded-xl hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
              >
                Login
              </button>
              <button 
                onClick={() => { setAuthModalMode('signup'); setIsAuthModalOpen(true); }}
                className="btn-premium py-2 px-6 text-xs group cursor-pointer"
              >
                <span>Sign Up</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          ) : (
            <>
              <div 
                onClick={() => handleProtectedNavigation(getProfilePath())}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-colors cursor-pointer select-none"
                role="button"
                tabIndex={0}
              >
                <User size={16} /> Profile
              </div>
              {location.pathname === '/' ? (
                <div 
                  onClick={() => { logout(); toast.success('Logged out successfully'); }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-2 text-xs font-semibold tracking-wide text-white hover:bg-red-700 transition-all duration-200 cursor-pointer select-none group"
                  role="button"
                  tabIndex={0}
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </div>
              ) : (
                <div 
                  onClick={() => handleProtectedNavigation(getDashboardPath())}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-2 text-xs font-semibold tracking-wide text-white hover:bg-primary hover:text-slate-900 transition-all duration-200 cursor-pointer select-none group"
                  role="button"
                  tabIndex={0}
                >
                  <span>My Hub</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </>
          )}
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
          {!user ? (
            <>
              <button 
                onClick={() => { setAuthModalMode('login'); setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }}
                className="w-full py-5 mt-2 border-2 border-slate-900 rounded-2xl text-center font-bold uppercase tracking-widest text-sm hover:bg-slate-900 hover:text-white transition-all"
              >
                Login
              </button>
              <button 
                onClick={() => { setAuthModalMode('signup'); setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }}
                className="btn-premium py-5 w-full"
              >
                <span>Sign Up</span>
              </button>
            </>
          ) : (
            <>
              <Link 
                to={getDashboardPath()}
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-premium py-5 mt-4"
              >
                <span>My Dashboard</span>
              </Link>
              {location.pathname === '/' && (
                <button 
                  onClick={() => { logout(); toast.success('Logged out successfully'); setIsMobileMenuOpen(false); }}
                  className="w-full py-5 border-2 border-red-500 text-red-600 rounded-2xl text-center font-bold uppercase tracking-widest text-sm hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authModalMode} 
      />
    </nav>
  );
};

export default Navbar;
