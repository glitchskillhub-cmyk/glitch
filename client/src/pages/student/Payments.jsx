import React, { useState, useEffect } from 'react';
import { Layers, Download, ExternalLink, ShieldCheck, Clock, Zap, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getStudentPayments, getMyEnrollments, createRazorpayOrder, verifyRazorpayPayment, getStudentStats } from '../../utils/api';
import { toast } from 'react-hot-toast';

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_Skseh7l3ljLVO7';

const Payments = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [activePlan, setActivePlan] = useState('');
  const [totalPaid, setTotalPaid] = useState(0);
  const [coursePrice, setCoursePrice] = useState(0);
  const [dueAmount, setDueAmount] = useState(0);
  const [studentIdState, setStudentIdState] = useState(null);
  const [courseTitleState, setCourseTitleState] = useState('');
  const [loading, setLoading] = useState(true);
  const [payingDue, setPayingDue] = useState(false);

  useEffect(() => {
    const fetchPaymentsAndEnrollments = async () => {
      try {
        const studentId = user?._id || user?.id;
        const [payRes, enrollRes, statsRes] = await Promise.all([
          getStudentPayments(studentId),
          getMyEnrollments(),
          getStudentStats()
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

        // Fetch statsData from stats backend endpoint
        if (statsRes.data) {
          setCoursePrice(statsRes.data.coursePrice || 0);
          setDueAmount(statsRes.data.dueAmount || 0);
          setStudentIdState(statsRes.data.studentId);
          setCourseTitleState(statsRes.data.courseTitle);
        }

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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-script')) return resolve(true);
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayDue = async () => {
    if (!studentIdState || !courseTitleState) {
      toast.error('Could not find enrollment details.');
      return;
    }
    
    setPayingDue(true);
    const payToast = toast.loading('Opening payment gateway...');
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.dismiss(payToast);
        toast.error('Payment gateway failed to load.');
        setPayingDue(false);
        return;
      }
      
      const orderRes = await createRazorpayOrder({ 
        studentId: studentIdState, 
        course: courseTitleState, 
        paymentType: 'due' 
      });
      toast.dismiss(payToast);
      
      const order = orderRes.data.order;
      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: 'Glitch Skill Hub',
        description: `Remaining Balance - ${courseTitleState}`,
        order_id: order.id,
        handler: async (response) => {
          const verifyingToast = toast.loading('Verifying payment... Please wait.');
          try {
            await verifyRazorpayPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              studentId: studentIdState
            });
            toast.dismiss(verifyingToast);
            toast.success('Payment Verified! Balance cleared successfully 🎉', { duration: 5000 });
            window.location.reload();
          } catch (err) {
            toast.dismiss(verifyingToast);
            console.error('Verification Error:', err);
            toast.error(err.response?.data?.message || 'Payment verification failed. Please contact support.');
          } finally {
            setPayingDue(false);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone
        },
        theme: { color: '#FFD700' },
      };
      
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        toast.error(`Payment Failed: ${response.error.description}`);
        setPayingDue(false);
      });
      rzp.open();
    } catch (error) {
      toast.dismiss(payToast);
      toast.error(error.response?.data?.message || 'Failed to initialize payment.');
      setPayingDue(false);
    }
  };

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
                 <div className="flex flex-wrap items-center gap-8 mb-10">
                    <div>
                       <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Total Course Price</p>
                       <p className="text-xl font-bold">₹{coursePrice.toLocaleString()}</p>
                    </div>
                    <div>
                       <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Total Paid</p>
                       <p className="text-xl font-bold">₹{totalPaid.toLocaleString()}</p>
                    </div>
                    <div>
                       <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Remaining Due</p>
                       <p className={`text-xl font-bold ${dueAmount > 0 ? 'text-primary' : 'text-green-400'}`}>
                         ₹{dueAmount.toLocaleString()}
                       </p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <button className="bg-white/10 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-colors">
                      Download All Receipts
                   </button>
                   {dueAmount > 0 && (
                     <button 
                       onClick={handlePayDue}
                       disabled={payingDue}
                       className="bg-primary text-slate-900 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
                     >
                        {payingDue && <Loader2 className="animate-spin" size={12} />}
                        Pay Due Amount
                     </button>
                   )}
                 </div>
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
