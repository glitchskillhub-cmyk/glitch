import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../../utils/api';
import { 
  Users, 
  CreditCard, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  UserCheck, 
  AlertCircle,
  Calendar
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
  <div className="bg-white border border-zinc-100 rounded-[2rem] p-8 group hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl">
    <div className="flex justify-between items-start mb-6">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} bg-opacity-10 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
          <ArrowUpRight size={12} /> {trend}
        </div>
      )}
    </div>
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">{label}</p>
    <h3 className="text-4xl font-black text-zinc-900 tracking-tighter">{value}</h3>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ totalStudents: 0, totalPayments: 0, pendingPayments: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (error) {
        toast.error('Failed to load portal stats.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const revenue = stats.totalPayments * 9999;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black uppercase tracking-tighter italic text-zinc-900">
              Portal <span className="text-primary not-italic">Overview</span>
           </h1>
           <p className="text-zinc-500 text-sm mt-1 font-bold">Real-time performance and system health</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-zinc-100 shadow-sm">
           <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest">
              <Calendar size={14} /> Today: {new Date().toLocaleDateString()}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Users} 
          label="Total Students" 
          value={stats.totalStudents} 
          trend="+12%" 
          color="bg-blue-500" 
        />
        <StatCard 
          icon={CreditCard} 
          label="Total Revenue" 
          value={`₹${revenue.toLocaleString()}`} 
          trend="+8.5%" 
          color="bg-primary" 
        />
        <StatCard 
          icon={UserCheck} 
          label="Paid Users" 
          value={stats.totalPayments} 
          trend="+5.2%" 
          color="bg-green-500" 
        />
        <StatCard 
          icon={Clock} 
          label="Pending Payments" 
          value={stats.pendingPayments} 
          color="bg-orange-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white border border-zinc-100 rounded-[2.5rem] p-10 shadow-sm">
           <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter italic text-zinc-900">Recent Activity</h3>
                <p className="text-zinc-400 text-xs font-bold mt-1">Global platform events log</p>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">View All Logs</button>
           </div>
           
           <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-6 p-5 rounded-[2rem] bg-zinc-50 border border-zinc-100 hover:bg-white hover:shadow-lg transition-all group cursor-pointer">
                   <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <TrendingUp size={20} />
                   </div>
                   <div className="flex-1">
                      <p className="text-sm font-bold text-zinc-900">New Enrollment - Node.js Full Stack</p>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">2 hours ago • Hyderabad Campus</p>
                   </div>
                   <div className="text-right">
                      <p className="text-xs font-black text-green-600">+₹9,999</p>
                      <p className="text-[9px] text-zinc-400 uppercase font-black tracking-widest">Verified</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* System Health */}
        <div className="space-y-8">
           <div className="bg-white border border-zinc-100 rounded-[2.5rem] p-10 overflow-hidden relative group shadow-sm">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"></div>
              <div className="relative z-10">
                <AlertCircle className="text-primary mb-6" size={32} />
                <h3 className="text-xl font-black uppercase tracking-tighter italic text-zinc-900">Platform Health</h3>
                <p className="text-zinc-400 text-xs font-bold mt-1 mb-8">System status & connectivity</p>
                
                <div className="space-y-6">
                   {[
                     { label: 'API Server', status: 'Optimal', color: 'text-green-600' },
                     { label: 'Database', status: 'Healthy', color: 'text-green-600' },
                     { label: 'File Storage', status: 'Active', color: 'text-primary' },
                     { label: 'Payment Gateway', status: 'Stable', color: 'text-green-600' },
                   ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{item.label}</span>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.status}</span>
                     </div>
                   ))}
                </div>
              </div>
           </div>

           <div className="bg-gradient-to-br from-primary to-yellow-600 rounded-[2.5rem] p-10 text-black shadow-2xl relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 opacity-20 group-hover:rotate-12 transition-transform duration-1000">
                <Users size={200} />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none mb-2">Grow Your Hub</h3>
                <p className="text-xs font-black uppercase tracking-widest opacity-70 mb-8">Management made simple</p>
                <button className="w-full bg-black text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform shadow-xl">
                   Go Pro Portal
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
