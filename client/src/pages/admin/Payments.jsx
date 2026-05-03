import React, { useEffect, useState } from 'react';
import { getAllStudents, getDashboardStats } from '../../utils/api';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  RefreshCw,
  MoreHorizontal,
  ExternalLink
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({ totalStudents: 0, totalPayments: 0, pendingPayments: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [studentsRes, statsRes] = await Promise.all([getAllStudents(), getDashboardStats()]);
      setPayments(studentsRes.data.filter(s => s.paymentStatus));
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Failed to load transaction data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = payments.filter(p => 
    (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const revenue = stats.totalPayments * 9999;

  return (
    <div className="space-y-10 text-zinc-900">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black uppercase tracking-tighter italic text-zinc-900">
              Transaction <span className="text-primary not-italic">Logs</span>
           </h1>
           <p className="text-zinc-500 text-sm mt-1 font-bold">Monitor and audit all hub financial activity</p>
        </div>
        <div className="flex items-center gap-3 bg-white border border-zinc-100 p-2 rounded-2xl shadow-sm">
           <div className="px-6 py-2.5 bg-primary/10 text-primary rounded-xl flex items-center gap-3">
              <p className="text-[10px] font-black uppercase tracking-widest leading-none">Gross Revenue</p>
              <p className="text-xl font-black italic tracking-tighter text-zinc-900">₹{revenue.toLocaleString()}</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white border border-zinc-100 p-8 rounded-[2rem] flex items-center gap-6 group hover:border-primary/30 transition-all shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
               <CheckCircle2 size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Successful</p>
               <h4 className="text-2xl font-black text-zinc-900">{stats.totalPayments}</h4>
            </div>
         </div>
         <div className="bg-white border border-zinc-100 p-8 rounded-[2rem] flex items-center gap-6 group hover:border-orange-500/30 transition-all shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
               <Clock size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Pending</p>
               <h4 className="text-2xl font-black text-zinc-900">{stats.pendingPayments}</h4>
            </div>
         </div>
         <div className="bg-white border border-zinc-100 p-8 rounded-[2rem] flex items-center gap-6 group hover:border-red-500/30 transition-all shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
               <AlertCircle size={24} />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Failed/Refunded</p>
               <h4 className="text-2xl font-black text-zinc-900">0</h4>
            </div>
         </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white border border-zinc-100 rounded-[2.5rem] overflow-hidden shadow-sm">
         <div className="p-8 border-b border-zinc-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-zinc-50">
            <div className="relative flex-1 max-w-md">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
               <input 
                 type="text" 
                 placeholder="Search by student or email..." 
                 className="w-full bg-white border border-zinc-200 rounded-2xl pl-12 pr-6 py-3.5 text-sm focus:border-primary transition-all outline-none text-zinc-900"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <div className="flex items-center gap-3">
               <button className="p-3.5 bg-white border border-zinc-200 rounded-2xl text-zinc-400 hover:text-zinc-900 transition-all"><Filter size={18} /></button>
               <button className="p-3.5 bg-white border border-zinc-200 rounded-2xl text-zinc-400 hover:text-zinc-900 transition-all"><Download size={18} /></button>
               <button onClick={fetchData} className="p-3.5 bg-white border border-zinc-200 rounded-2xl text-primary hover:bg-primary hover:text-black transition-all shadow-sm"><RefreshCw size={18} className={loading ? 'animate-spin' : ''} /></button>
            </div>
         </div>

         <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100">
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Transaction ID</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Student</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Amount</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Date</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Status</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 text-right">Receipt</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-zinc-50">
                  {loading ? (
                    [1,2,3,4,5].map(i => <tr key={i} className="animate-pulse"><td colSpan="6" className="px-8 py-10"></td></tr>)
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan="6" className="px-8 py-20 text-center text-zinc-500 italic uppercase font-black text-[10px] tracking-widest">No transaction records found</td></tr>
                  ) : filtered.map((p) => (
                    <tr key={p._id} className="group hover:bg-white/[0.02] transition-colors">
                       <td className="px-8 py-6">
                          <p className="text-[10px] font-black text-zinc-500 font-mono tracking-tighter uppercase group-hover:text-primary transition-colors">
                             TXN_{p._id.slice(-8).toUpperCase()}
                          </p>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-xs italic text-zinc-400">
                                {p.name.charAt(0)}
                             </div>
                             <div>
                                <p className="text-sm font-bold text-white leading-none mb-1">{p.name}</p>
                                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{p.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <p className="text-sm font-black text-white italic">₹9,999</p>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-2 text-zinc-500">
                             <Calendar size={14} className="text-zinc-600" />
                             <span className="text-[11px] font-bold uppercase tracking-tighter">
                                {new Date(p.createdAt || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                             </span>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <span className={`
                             inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider
                             ${p.paymentStatus === 'Paid' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}
                          `}>
                             {p.paymentStatus === 'Paid' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                             {p.paymentStatus}
                          </span>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <button className="p-2.5 bg-white/5 text-zinc-500 rounded-xl hover:text-primary hover:bg-primary/10 transition-all">
                             <ExternalLink size={16} />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default Payments;
