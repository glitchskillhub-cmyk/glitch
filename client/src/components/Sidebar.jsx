import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, LayoutDashboard, Settings, ShieldCheck, LogOut, UserPlus, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { title: 'Add Student', icon: <UserPlus size={20} />, path: '/admin/add-student' },
    { title: 'Add Mentor', icon: <Users size={20} />, path: '/admin/add-mentor' },
    { title: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isSVAdmin');
    toast.success('Logged out securely.');
    navigate('/admin/login');
  };

  return (
    <aside className="w-64 bg-black h-full flex flex-col fixed left-0 top-0 border-r border-white/5 shadow-2xl z-50 transition-all duration-300">
      <div className="p-8 pb-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.3)]">
              <ShieldCheck className="text-black" size={24} />
            </div>
            <h2 className="text-white font-display font-black text-xl tracking-tighter uppercase italic">
              GLITCH
            </h2>
          </div>
          <p className="text-primary text-[10px] font-black tracking-[0.3em] uppercase ml-1">
            Skill Hub
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <div className="px-4 mb-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Main Menu</p>
        </div>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center space-x-3 px-5 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all duration-300 group ${
              location.pathname === item.path 
                ? 'bg-primary text-black shadow-[0_0_30px_rgba(255,215,0,0.2)]' 
                : 'text-zinc-500 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className={location.pathname === item.path ? 'scale-110' : 'group-hover:text-primary transition-all group-hover:scale-110'}>
              {item.icon}
            </span>
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5">
        <div className="bg-white/5 rounded-2xl p-4 mb-4 border border-white/5">
            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Registry Status</p>
            <div className="flex items-center gap-2 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-[10px] font-bold text-white uppercase italic">Live Encrypted</p>
            </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 px-5 py-4 rounded-2xl text-zinc-500 hover:bg-red-500/10 hover:text-red-500 transition-all w-full font-black uppercase tracking-widest text-[11px]"
        >
          <LogOut size={20} />
          <span>Security Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
