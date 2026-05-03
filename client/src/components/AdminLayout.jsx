import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
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
        ? 'bg-primary text-black font-black shadow-[0_10px_20px_rgba(255,215,0,0.2)]' 
        : 'text-zinc-500 hover:text-white hover:bg-white/5'}
    `}
  >
    <Icon size={22} className={({ isActive }) => isActive ? 'text-black' : 'group-hover:scale-110 transition-transform'} />
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
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`
          fixed md:relative z-50 bg-[#0a0a0a] border-r border-white/5 transition-all duration-500 flex flex-col
          ${collapsed ? 'w-20' : 'w-72'}
          ${mobileMenu ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-6 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-black text-xl italic">G</div>
              <span className="font-display font-black text-lg tracking-tighter uppercase italic">
                Glitch <span className="text-primary not-italic">Hub</span>
              </span>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-white/5 rounded-xl text-zinc-500 md:block hidden"
          >
            {collapsed ? <ChevronRight size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-8 scrollbar-hide">
          {menuItems.map((group, idx) => (
            <div key={idx} className="space-y-2">
              {!collapsed && (
                <p className="px-4 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-4">{group.section}</p>
              )}
              {group.items.map((item, i) => (
                <SidebarItem key={i} {...item} collapsed={collapsed} />
              ))}
            </div>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-4 text-red-500 hover:bg-red-500/5 rounded-2xl transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            {!collapsed && <span className="text-[10px] font-black uppercase tracking-widest">Logout Portal</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Topbar */}
        <header className="h-20 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 px-8 flex items-center justify-between z-40 sticky top-0">
          <div className="flex items-center gap-6">
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 text-zinc-400">
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 className="text-xl font-black uppercase tracking-tighter italic hidden sm:block">
               {currentPathLabel}
            </h2>
          </div>

          <div className="flex items-center gap-6">
             <div className="relative hidden lg:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Universal search..." 
                  className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-2.5 text-sm focus:outline-none focus:border-primary/50 w-64 transition-all"
                />
             </div>
             <button className="relative p-2.5 bg-white/5 rounded-2xl text-zinc-400 hover:text-primary hover:bg-primary/5 transition-all">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
             </button>
             <div className="h-10 w-px bg-white/10 mx-2"></div>
             <div className="flex items-center gap-4 group cursor-pointer">
                <div className="text-right hidden sm:block">
                   <p className="text-xs font-black uppercase tracking-widest text-white">Tarun</p>
                   <p className="text-[10px] font-bold text-primary uppercase">Root Admin</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-yellow-600 p-[1px]">
                   <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center font-black text-primary text-sm italic border border-black/50">
                      T
                   </div>
                </div>
             </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#050505]">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
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
