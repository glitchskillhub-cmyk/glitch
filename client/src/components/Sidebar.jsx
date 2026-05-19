import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Layers, 
  BookOpen, 
  Target, 
  CheckCircle2, 
  CreditCard, 
  Award, 
  Users, 
  Settings, 
  LogOut,
  Lock,
  Zap,
  MessageSquare,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/glitch-logo.webp';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Mock enrollment status - in real app, this would come from user data or a context
  const isEnrolled = user?.isEnrolled || false;

  const navItems = [
    { name: 'Dashboard', icon: Layers, path: '/student/dashboard', locked: false },
    { name: 'Programs', icon: BookOpen, path: '/student/programs', locked: false },
    { name: 'Curriculum', icon: BookOpen, path: '/student/curriculum', locked: !isEnrolled },
    { name: 'Tasks', icon: CheckCircle2, path: '/student/tasks', locked: !isEnrolled },
    { name: 'Payments', icon: CreditCard, path: '/student/payments', locked: false },
    { name: 'Certificates', icon: Award, path: '/student/certificates', locked: false },
    { name: 'Career Hub', icon: Briefcase, path: '/student/career', locked: false },
    { name: 'Community', icon: MessageSquare, path: '/student/community', locked: false },
    { name: 'Settings', icon: Settings, path: '/student/settings', locked: false },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-sidebar border-r border-slate-800 flex flex-col z-50 transition-all duration-300">
      {/* Logo Section */}
      <div className="p-8">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Glitch Logo" className="h-9 w-auto object-contain" />
          <div className="border-l border-slate-800 pl-3 py-1">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] block leading-none">Student</span>
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] block leading-none mt-1">Portal</span>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto py-4 scrollbar-hide">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.locked ? '#' : item.path}
            className={({ isActive }) => 
              `sidebar-link group ${isActive && !item.locked ? 'active' : ''} ${item.locked ? 'locked' : ''}`
            }
            onClick={(e) => item.locked && e.preventDefault()}
          >
            <item.icon size={18} className="transition-transform group-hover:scale-110" />
            <span className="flex-1">{item.name}</span>
            {item.locked && <Lock size={14} className="text-slate-600" />}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-6 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-primary/50 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-xs font-black truncate uppercase">{user?.name}</p>
              <p className="text-slate-500 text-[10px] truncate">{user?.email}</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-xs uppercase tracking-widest"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
