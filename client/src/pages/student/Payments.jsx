import React, { useState, useEffect } from 'react';
import { Layers, Download, ExternalLink, ShieldCheck, Clock, Zap, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getStudentPayments, getMyEnrollments } from '../../utils/api';

const Payments = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [activePlan, setActivePlan] = useState('');
  const [totalPaid, setTotalPaid] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentsAndEnrollments = async () => {
      try {
        const studentId = user?._id || user?.id;
        const [payRes, enrollRes] = await Promise.all([
          getStudentPayments(studentId),
          getMyEnrollments()
        ]);
        
        const paymentsData = payRes.data || [];
        setHistory(paymentsData.map(p => ({
          id: p.razorpayPaymentId || p._id.slice(-6).toUpperCase(),
          date: new Date(p.createdAt).toLocaleDateString(),
          amount: `₹${p.amount}`,
          status: p.status,
          method: p.razorpayPaymentId ? 'Razorpay' : 'Other'
        })));

        // Calculate sum of Paid status payments
        const paidSum = paymentsData
          .filter(p => p.status === 'Paid')
          .reduce((sum, p) => sum + Number(p.amount), 0);
        setTotalPaid(paidSum);

        // Fetch enrolled course names
        if (enrollRes.data && enrollRes.data.length > 0) {
          const courseNames = enrollRes.data.map(e => e.course?.title || e.title);
          setActivePlan(courseNames.join(', '));
        } else {
          setActivePlan('No Active Plan');
        }
      } catch (error) {
        console.error("Failed to fetch payments or enrollments", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user?._id || user?.id) fetchPaymentsAndEnrollments();
    else setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Payments & Billing</h1>
          <p className="text-slate-500 font-medium mt-2">Manage your subscriptions and receipts.</p>
        </div>
        <div className="badge-modern">
          <span></span> Status: Account Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           {/* Active Plan */}
           <div className="bento-card bg-slate-900 text-white p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="relative z-10">
                 <div className="flex justify-between items-start mb-10">
                    <div>
                       <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Active Plan</p>
                       <h2 className="text-3xl font-black uppercase tracking-tight text-white">{activePlan}</h2>
                    </div>
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-slate-900 shadow-lg shadow-primary/20">
                       <Zap size={24} fill="currentColor" />
                    </div>
                 </div>
                 <div className="flex items-center gap-8 mb-10">
                    <div>
                       <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Next Payment</p>
                       <p className="text-xl font-bold">N/A (One-time)</p>
                    </div>
                    <div>
                       <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Total Paid</p>
                       <p className="text-xl font-bold">₹{totalPaid.toLocaleString()}</p>
                    </div>
                 </div>
                 <button className="bg-primary text-slate-900 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white transition-colors">
                    Download All Receipts
                 </button>
              </div>
           </div>

           {/* History Table */}
           <div className="bento-card bg-white p-8 border-slate-200">
              <h3 className="text-lg font-black uppercase mb-6 tracking-tight">Transaction History</h3>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="border-b border-slate-100">
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                          <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Receipt</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {history.map((pay, i) => (
                         <tr key={i} className="group hover:bg-slate-50 transition-colors">
                            <td className="py-4 text-xs font-bold text-slate-900">{pay.id}</td>
                            <td className="py-4 text-xs font-medium text-slate-500">{pay.date}</td>
                            <td className="py-4 text-xs font-black text-slate-900">{pay.amount}</td>
                            <td className="py-4">
                               <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest border ${
                                 pay.status === 'Paid' 
                                   ? 'text-green-500 bg-green-50 border-green-100' 
                                   : pay.status === 'Pending'
                                   ? 'text-amber-500 bg-amber-50 border-amber-100'
                                   : 'text-red-500 bg-red-50 border-red-100'
                               }`}>{pay.status}</span>
                            </td>
                            <td className="py-4 text-right">
                               <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                  <Download size={16} />
                               </button>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bento-card bg-white p-8 border-slate-200">
              <ShieldCheck className="text-green-500 mb-6" size={32} />
              <h3 className="text-xl font-black uppercase mb-4 tracking-tight">Secure Payments</h3>
              <p className="text-slate-500 text-xs mb-8 leading-relaxed">
                All our transactions are encrypted and processed through Razorpay for maximum security.
              </p>
              <div className="flex items-center gap-4 grayscale opacity-50">
                 <div className="h-6 w-auto bg-slate-200 rounded px-3 flex items-center text-[8px] font-bold">VISA</div>
                 <div className="h-6 w-auto bg-slate-200 rounded px-3 flex items-center text-[8px] font-bold">UPI</div>
                 <div className="h-6 w-auto bg-slate-200 rounded px-3 flex items-center text-[8px] font-bold">PAYTM</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
