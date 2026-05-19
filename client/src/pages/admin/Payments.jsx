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
  ExternalLink,
  Calendar,
  X,
  FileText,
  GraduationCap,
  Phone,
  Mail,
  Layers,
  Award
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({ totalStudents: 0, totalPayments: 0, pendingPayments: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

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

  const handleExportExcel = () => {
    if (filtered.length === 0) {
      toast.error("No transactions to export");
      return;
    }
    const headers = [
      "Transaction ID",
      "Student Name",
      "Email",
      "Phone",
      "College Name",
      "Roll Number",
      "Course",
      "Batch",
      "Amount (INR)",
      "Status",
      "Date"
    ];
    
    const rows = filtered.map(p => [
      `TXN_${p._id.slice(-8).toUpperCase()}`,
      p.name,
      p.email,
      p.phone || 'N/A',
      p.collegeName || 'N/A',
      p.rollNumber || 'N/A',
      p.course || 'N/A',
      p.batch || 'N/A',
      9999,
      p.paymentStatus,
      new Date(p.createdAt || Date.now()).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `glitch_transactions_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Transactions exported successfully!");
  };

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
               <button onClick={handleExportExcel} title="Export to Excel (CSV)" className="p-3.5 bg-white border border-zinc-200 rounded-2xl text-zinc-600 hover:bg-primary hover:text-black hover:border-primary transition-all flex items-center gap-2">
                  <Download size={18} />
                  <span className="text-[10px] font-black uppercase tracking-wider hidden md:inline">Export Excel</span>
               </button>
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
                                <p className="text-sm font-bold text-zinc-900 leading-none mb-1">{p.name}</p>
                                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{p.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <p className="text-sm font-black text-zinc-900 italic">₹9,999</p>
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
                           <button 
                             onClick={() => setSelectedStudent(p)}
                             title="View Student Details"
                             className="p-2.5 bg-zinc-50 border border-zinc-150 text-zinc-500 rounded-xl hover:text-primary hover:bg-primary/10 hover:border-primary/20 transition-all"
                           >
                              <ExternalLink size={16} />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Student/Transaction Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedStudent(null)}></div>
           <div className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-[3rem] p-10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black">
                       <FileText size={22} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none text-zinc-900">Student Details</h3>
                       <p className="text-zinc-500 text-xs font-bold mt-1 uppercase tracking-widest">Transaction & Academic Records</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedStudent(null)} className="p-3 bg-zinc-100 text-zinc-400 hover:text-zinc-900 rounded-2xl transition-all">
                    <X size={20} />
                 </button>
              </div>

              <div className="space-y-8">
                 {/* Student Header Card */}
                 <div className="flex items-center gap-6 bg-zinc-50 p-6 rounded-[2rem] border border-zinc-100">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-primary/20 text-primary flex items-center justify-center font-black text-2xl italic border border-primary/20">
                       {selectedStudent.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-xl font-black text-zinc-900">{selectedStudent.name}</h4>
                       <div className="flex flex-wrap items-center gap-2">
                         <span className="bg-zinc-200 text-zinc-850 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                           {selectedStudent.status || 'Fresher'}
                         </span>
                         {selectedStudent.batch && (
                           <span className="bg-yellow-100 border border-yellow-300 text-yellow-800 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md flex items-center gap-1">
                             <Layers size={10} /> {selectedStudent.batch}
                           </span>
                         )}
                       </div>
                    </div>
                 </div>

                 {/* Information Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Academic Information */}
                    <div className="bg-white border border-zinc-150 p-6 rounded-[2rem] space-y-4">
                       <div className="flex items-center gap-2 text-zinc-400 border-b border-zinc-100 pb-3">
                          <GraduationCap size={16} className="text-primary" />
                          <h5 className="text-[10px] font-black uppercase tracking-widest">Academic Info</h5>
                       </div>
                       <div className="space-y-3">
                          <div>
                             <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">College Name</p>
                             <p className="text-sm font-bold text-zinc-800">{selectedStudent.collegeName || 'Not Specified'}</p>
                          </div>
                          <div>
                             <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Roll Number</p>
                             <p className="text-sm font-bold text-zinc-800">{selectedStudent.rollNumber || 'Not Specified'}</p>
                          </div>
                          <div>
                             <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Course & Branch</p>
                             <p className="text-sm font-bold text-zinc-800">
                               {selectedStudent.course || 'N/A'} {selectedStudent.branch ? `• ${selectedStudent.branch}` : ''}
                             </p>
                          </div>
                          <div>
                             <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Year of Study</p>
                             <p className="text-sm font-bold text-zinc-800">{selectedStudent.yearOfStudy || 'N/A'}</p>
                          </div>
                       </div>
                    </div>

                    {/* Contact & Payment Info */}
                    <div className="bg-white border border-zinc-150 p-6 rounded-[2rem] space-y-4">
                       <div className="flex items-center gap-2 text-zinc-400 border-b border-zinc-100 pb-3">
                          <CreditCard size={16} className="text-primary" />
                          <h5 className="text-[10px] font-black uppercase tracking-widest">Contact & Payment</h5>
                       </div>
                       <div className="space-y-3">
                          <div>
                             <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Email ID</p>
                             <div className="flex items-center gap-1.5 mt-0.5 text-zinc-800">
                                <Mail size={12} className="text-zinc-400" />
                                <span className="text-sm font-bold">{selectedStudent.email}</span>
                             </div>
                          </div>
                          <div>
                             <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Phone Number</p>
                             <div className="flex items-center gap-1.5 mt-0.5 text-zinc-800">
                                <Phone size={12} className="text-zinc-400" />
                                <span className="text-sm font-bold">{selectedStudent.phone || 'Not Specified'}</span>
                             </div>
                          </div>
                          <div>
                             <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Payment Status</p>
                             <span className={`
                                inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider mt-1
                                ${selectedStudent.paymentStatus === 'Paid' ? 'bg-green-500/10 text-green-500 border border-green-200' : 'bg-orange-500/10 text-orange-500 border border-orange-200'}
                             `}>
                                {selectedStudent.paymentStatus === 'Paid' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                                {selectedStudent.paymentStatus}
                             </span>
                          </div>
                          <div>
                             <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Registered On</p>
                             <div className="flex items-center gap-1.5 mt-0.5 text-zinc-800">
                                <Calendar size={12} className="text-zinc-400" />
                                <span className="text-sm font-bold">
                                  {new Date(selectedStudent.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'long', year: 'numeric' })}
                                </span>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Receipt Notice */}
                 <div className="bg-primary/5 border border-primary/20 p-6 rounded-[2rem] flex items-center justify-between">
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Transaction Identification</p>
                       <p className="text-xs font-mono font-bold text-zinc-800 mt-0.5">TXN_{selectedStudent._id.toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Amount Paid</p>
                       <p className="text-xl font-black italic tracking-tighter text-zinc-950">₹9,999</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
