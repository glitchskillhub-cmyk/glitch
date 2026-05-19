import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/glitch-logo.webp';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  GraduationCap, 
  BookOpen, 
  CheckSquare, 
  CreditCard, 
  Award, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label, collapsed }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => `
      flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group
      ${isActive 
        ? 'bg-primary text-black font-black shadow-[0_10px_20px_rgba(255,215,0,0.2)] italic' 
        : 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 font-bold'}
    `}
  >
    <Icon size={22} className="group-hover:scale-110 transition-transform" />
    {!collapsed && <span className="text-[11px] uppercase tracking-widest leading-none">{label}</span>}
  </NavLink>
);

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isSVAdmin');
    navigate('/admin/login');
  };

  const menuItems = [
    { section: 'Main', items: [
      { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/admin/students', icon: Users, label: 'Students' },
      { to: '/admin/mentors', icon: GraduationCap, label: 'Mentors' },
    ]},
    { section: 'Content', items: [
      { to: '/admin/programs', icon: BookOpen, label: 'Programs' },
      { to: '/admin/curriculum', icon: BookOpen, label: 'Curriculum' },
      { to: '/admin/tasks', icon: CheckSquare, label: 'Tasks' },
    ]},
    { section: 'Finance', items: [
      { to: '/admin/payments', icon: CreditCard, label: 'Payments' },
    ]},
    { section: 'Career & More', items: [
      { to: '/admin/certificates', icon: Award, label: 'Certificates' },
      { to: '/admin/career', icon: Briefcase, label: 'Career Hub' },
      { to: '/admin/community', icon: MessageSquare, label: 'Community' },
    ]},
    { section: 'System', items: [
      { to: '/admin/settings', icon: Settings, label: 'Settings' },
    ]}
  ];

  const currentPathLabel = location.pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard';

  return (
    <div className="flex h-screen bg-[#f8fafc] text-zinc-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`
          fixed md:relative z-50 bg-white border-r border-zinc-200 transition-all duration-500 flex flex-col shadow-xl md:shadow-none
          ${collapsed ? 'w-20' : 'w-72'}
          ${mobileMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-6 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="bg-slate-950 px-4 py-2.5 rounded-2xl flex items-center justify-center">
                <img src={logo} alt="Glitch Logo" className="h-6 w-auto object-contain" />
              </div>
              <div className="border-l border-zinc-200 pl-3 py-1">
                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] block leading-none">Admin</span>
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] block leading-none mt-1">Portal</span>
              </div>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-zinc-100 rounded-xl text-zinc-400 md:block hidden"
          >
            {collapsed ? <ChevronRight size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-8 scrollbar-hide">
          {menuItems.map((group, idx) => (
            <div key={idx} className="space-y-2">
              {!collapsed && (
                <p className="px-4 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">{group.section}</p>
              )}
              {group.items.map((item, i) => (
                <SidebarItem key={i} {...item} collapsed={collapsed} />
              ))}
            </div>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-zinc-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-4 text-red-600 hover:bg-red-50 rounded-2xl transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            {!collapsed && <span className="text-[10px] font-black uppercase tracking-widest">Logout Portal</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Topbar */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-zinc-200 px-8 flex items-center justify-between z-40 sticky top-0 shadow-sm">
          <div className="flex items-center gap-6">
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 text-zinc-600">
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 className="text-xl font-black uppercase tracking-tighter italic hidden sm:block text-zinc-900">
               {currentPathLabel}
            </h2>
          </div>

          <div className="flex items-center gap-6">
             <div className="relative hidden lg:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Universal search..." 
                  className="bg-zinc-100 border border-zinc-200 rounded-2xl pl-12 pr-6 py-2.5 text-sm focus:outline-none focus:border-primary w-64 transition-all text-zinc-900"
                />
             </div>
             <button className="relative p-2.5 bg-zinc-100 rounded-2xl text-zinc-500 hover:text-primary hover:bg-primary/10 transition-all">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse border-2 border-white"></span>
             </button>
             <div className="h-10 w-px bg-zinc-200 mx-2"></div>
             <div className="flex items-center gap-4 group cursor-pointer">
                <div className="text-right hidden sm:block">
                   <p className="text-xs font-black uppercase tracking-widest text-zinc-900">Tarun</p>
                   <p className="text-[10px] font-bold text-primary uppercase">Root Admin</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-yellow-600 p-[1px]">
                   <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center font-black text-primary text-sm italic border border-zinc-100">
                      T
                   </div>
                </div>
             </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 text-zinc-900">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {mobileMenu && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
