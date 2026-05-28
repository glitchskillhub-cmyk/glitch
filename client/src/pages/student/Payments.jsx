import React, { useState, useEffect } from 'react';
import { Layers, Download, ExternalLink, ShieldCheck, Clock, Zap, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getStudentPayments, getMyEnrollments, createRazorpayOrder, verifyRazorpayPayment, getStudentStats } from '../../utils/api';
import { toast } from 'react-hot-toast';

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_SufPL6VwSvSJOW';

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

  const handleDownloadReceipt = (pay) => {
    if (pay.status !== 'Paid') {
      toast.error('Receipt is only available for successful payments.');
      return;
    }
    const receiptWindow = window.open('', '_blank');
    if (!receiptWindow) {
      toast.error('Please allow popups to download receipts');
      return;
    }
    
    const htmlContent = `
      <html>
        <head>
          <title>Receipt - ${pay.id}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #0f172a; max-width: 800px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; }
            .logo { font-size: 28px; font-weight: 900; margin-bottom: 5px; color: #0f172a; }
            .logo span { color: #facc15; }
            .title { font-size: 18px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
            .details { margin-bottom: 40px; background: #f8fafc; padding: 20px; border-radius: 8px; }
            .row { display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; }
            .row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
            .label { font-weight: 600; color: #64748b; }
            .value { font-weight: 700; color: #0f172a; }
            .total { font-size: 24px; font-weight: bold; margin-top: 20px; background: #0f172a; color: white; padding: 20px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
            .total .label { color: #cbd5e1; }
            .total .value { color: #facc15; }
            .footer { margin-top: 50px; text-align: center; font-size: 14px; color: #94a3b8; border-top: 2px solid #f1f5f9; padding-top: 20px; }
            .status { background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Glitch <span>Skill Hub</span></div>
            <div class="title">Payment Receipt</div>
          </div>
          <div class="details">
            <div class="row"><span class="label">Receipt ID:</span> <span class="value">${pay.id}</span></div>
            <div class="row"><span class="label">Date:</span> <span class="value">${pay.date}</span></div>
            <div class="row"><span class="label">Student:</span> <span class="value">${user?.name} (${user?.email})</span></div>
            <div class="row"><span class="label">Course / Plan:</span> <span class="value">${courseTitleState || activePlan || 'Glitch Program'}</span></div>
            <div class="row"><span class="label">Payment Method:</span> <span class="value">${pay.method}</span></div>
            <div class="row"><span class="label">Status:</span> <span class="status">${pay.status}</span></div>
          </div>
          <div class="total">
            <span class="label">Amount Paid:</span> <span class="value">${pay.amount}</span>
          </div>
          <div class="footer">
            <p>Thank you for your payment!</p>
            <p>This is a computer-generated receipt and does not require a physical signature.</p>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;
    receiptWindow.document.write(htmlContent);
    receiptWindow.document.close();
  };

  const handleDownloadAllReceipts = () => {
    const paidReceipts = history.filter(p => p.status === 'Paid');
    if (paidReceipts.length === 0) {
      toast.error('No successful payments found to download.');
      return;
    }
    
    const receiptWindow = window.open('', '_blank');
    if (!receiptWindow) {
      toast.error('Please allow popups to download receipts');
      return;
    }
    
    const receiptsHtml = paidReceipts.map(pay => `
      <div class="receipt-card">
        <div class="details">
          <div class="row"><span class="label">Receipt ID:</span> <span class="value">${pay.id}</span></div>
          <div class="row"><span class="label">Date:</span> <span class="value">${pay.date}</span></div>
          <div class="row"><span class="label">Amount:</span> <span class="value" style="color:#0f172a;">${pay.amount}</span></div>
          <div class="row"><span class="label">Method:</span> <span class="value">${pay.method}</span></div>
        </div>
      </div>
    `).join('');

    const htmlContent = `
      <html>
        <head>
          <title>All Receipts - ${user?.name}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #0f172a; max-width: 800px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; }
            .logo { font-size: 28px; font-weight: 900; margin-bottom: 5px; color: #0f172a; }
            .logo span { color: #facc15; }
            .title { font-size: 18px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
            .student-info { background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px; font-weight: 600;}
            .receipt-card { border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px; padding: 20px; page-break-inside: avoid; }
            .row { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 8px; }
            .row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
            .label { font-weight: 600; color: #64748b; }
            .value { font-weight: 700; color: #0f172a; }
            .footer { margin-top: 50px; text-align: center; font-size: 14px; color: #94a3b8; border-top: 2px solid #f1f5f9; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Glitch <span>Skill Hub</span></div>
            <div class="title">Complete Payment History</div>
          </div>
          <div class="student-info">
            <p style="margin:0 0 10px 0;">Student: ${user?.name}</p>
            <p style="margin:0 0 10px 0;">Email: ${user?.email}</p>
            <p style="margin:0;">Total Paid: ₹${totalPaid.toLocaleString()}</p>
          </div>
          
          <h3>Transaction Details</h3>
          ${receiptsHtml}
          
          <div class="footer">
            <p>Thank you for choosing Glitch Skill Hub!</p>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;
    receiptWindow.document.write(htmlContent);
    receiptWindow.document.close();
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Payments & Billing</h1>
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
                       <p className="text-sm font-semibold text-primary tracking-wide mb-2">Active Plan</p>
                       <h2 className="text-2xl font-bold tracking-tight text-white">{activePlan}</h2>
                    </div>
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-slate-900 shadow-lg shadow-primary/20">
                       <Zap size={24} fill="currentColor" />
                    </div>
                 </div>
                 <div className="flex flex-wrap items-center gap-8 mb-10">
                    <div>
                       <p className="text-slate-400 text-sm font-medium tracking-wide">Total Course Price</p>
                       <p className="text-xl font-bold">₹{coursePrice.toLocaleString()}</p>
                    </div>
                    <div>
                       <p className="text-slate-400 text-sm font-medium tracking-wide">Total Paid</p>
                       <p className="text-xl font-bold">₹{totalPaid.toLocaleString()}</p>
                    </div>
                    <div>
                       <p className="text-slate-400 text-sm font-medium tracking-wide">Remaining Due</p>
                       <p className={`text-xl font-bold ${dueAmount > 0 ? 'text-primary' : 'text-green-400'}`}>
                         ₹{dueAmount.toLocaleString()}
                       </p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <button onClick={handleDownloadAllReceipts} className="bg-white/10 text-white px-6 py-3 rounded-xl font-semibold text-sm tracking-wide hover:bg-white hover:text-slate-900 transition-colors">
                      Download All Receipts
                   </button>
                   {dueAmount > 0 && (
                     <button 
                       onClick={handlePayDue}
                       disabled={payingDue}
                       className="bg-primary text-slate-900 px-6 py-3 rounded-xl font-semibold text-sm tracking-wide hover:bg-white transition-colors flex items-center gap-2"
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
              <h3 className="text-lg font-bold mb-6 tracking-tight">Transaction History</h3>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="border-b border-slate-100">
                          <th className="pb-4 text-sm font-semibold text-slate-500 tracking-wide">ID</th>
                          <th className="pb-4 text-sm font-semibold text-slate-500 tracking-wide">Date</th>
                          <th className="pb-4 text-sm font-semibold text-slate-500 tracking-wide">Amount</th>
                          <th className="pb-4 text-sm font-semibold text-slate-500 tracking-wide">Status</th>
                          <th className="pb-4 text-sm font-semibold text-slate-500 tracking-wide text-right">Receipt</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {history.map((pay, i) => (
                         <tr key={i} className="group hover:bg-slate-50 transition-colors">
                            <td className="py-4 text-xs font-bold text-slate-900">{pay.id}</td>
                            <td className="py-4 text-xs font-medium text-slate-500">{pay.date}</td>
                            <td className="py-4 text-xs font-black text-slate-900">{pay.amount}</td>
                            <td className="py-4">
                               <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${
                                 pay.status === 'Paid' 
                                   ? 'text-green-500 bg-green-50 border-green-100' 
                                   : pay.status === 'Pending'
                                   ? 'text-amber-500 bg-amber-50 border-amber-100'
                                   : 'text-red-500 bg-red-50 border-red-100'
                               }`}>{pay.status}</span>
                            </td>
                            <td className="py-4 text-right">
                               <button onClick={() => handleDownloadReceipt(pay)} className="p-2 text-slate-400 hover:text-primary transition-colors">
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
              <h3 className="text-xl font-bold mb-4 tracking-tight">Secure Payments</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                All our transactions are encrypted and processed through Razorpay for maximum security.
              </p>
              <div className="flex items-center gap-4 grayscale opacity-50">
                 <div className="h-6 w-auto bg-slate-200 rounded px-3 flex items-center text-xs font-semibold">VISA</div>
                 <div className="h-6 w-auto bg-slate-200 rounded px-3 flex items-center text-xs font-semibold">UPI</div>
                 <div className="h-6 w-auto bg-slate-200 rounded px-3 flex items-center text-xs font-semibold">PAYTM</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
