import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { Bell, Search, Menu } from 'lucide-react';

const StudentLayout = ({ children }) => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      {/* Sidebar - Persistent */}
      <Sidebar isMobileOpen={isMobileMenuOpen} setIsMobileOpen={setIsMobileMenuOpen} />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 min-h-screen flex flex-col transition-all duration-300 w-full overflow-hidden">
        {/* Top Header / Bar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 md:px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 -ml-2 text-slate-400 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-xl w-96 border border-slate-200/50">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search curriculum, tasks, mentors..."
                className="bg-transparent border-none outline-none text-sm w-full font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Notification Bell with Badge */}
            <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>



            {/* User Profile Mini */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
              <div className="text-right hidden md:block">
                <p className="text-xs font-black uppercase tracking-tight">{user?.name}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student ID: #GS-{(user?._id || user?.id)?.slice(-6).toUpperCase()}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-sm">
                {user?.name?.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <div className="p-4 md:p-10 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
