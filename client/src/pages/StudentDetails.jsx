import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getStudentDetails, updateStudentStatus, deleteStudent } from '../utils/api';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-hot-toast';
import { ArrowLeft, IndianRupee, CreditCard, User, Phone, Mail, GraduationCap, MapPin, Building, CheckCircle2, XCircle, Trash2, Loader2, ShieldCheck, Clock } from 'lucide-react';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => { fetchData(); }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getStudentDetails(id);
      setData(res.data);
    } catch { toast.error('Failed to load student.'); }
    finally { setLoading(false); }
  };

  const handleStatusUpdate = async (status) => {
    setUpdating(true);
    try {
      await updateStudentStatus(id, status);
      setData({ ...data, student: { ...data.student, status } });
      toast.success(`Status updated to ${status}`);
    } catch { toast.error('Update failed.'); }
    finally { setUpdating(false); }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this record permanently?')) return;
    try { await deleteStudent(id); toast.success('Deleted.'); navigate('/admin'); }
    catch { toast.error('Delete failed.'); }
  };

  if (loading) return (
    <div className="flex bg-black min-h-screen text-zinc-500"><Sidebar /><div className="flex-1 flex items-center justify-center ml-64"><Loader2 className="animate-spin text-primary" size={40} /></div></div>
  );

  if (!data) return (
    <div className="flex bg-black min-h-screen text-zinc-500"><Sidebar /><div className="flex-1 flex flex-col items-center justify-center ml-64 gap-4"><p className="text-zinc-400 font-bold">Record not found.</p><Link to="/admin" className="text-primary hover:underline text-sm">Back to Dashboard</Link></div></div>
  );

  const { student, payment } = data;

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10 glass-card p-6 rounded-3xl border border-white/5">
          <Link to="/admin" className="flex items-center gap-2 text-zinc-500 hover:text-primary transition-all text-[10px] font-black uppercase tracking-widest"><ArrowLeft size={16} /> Back to Registry</Link>
          <div className="flex gap-4">
            {student.status === 'Pending' && (<>
              <button disabled={updating} onClick={() => handleStatusUpdate('Approved')} className="bg-green-500 hover:bg-green-600 text-black px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-all disabled:opacity-50"><CheckCircle2 size={14} /> Approve</button>
              <button disabled={updating} onClick={() => handleStatusUpdate('Rejected')} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-all disabled:opacity-50"><XCircle size={14} /> Reject</button>
            </>)}
            <button onClick={handleDelete} className="p-3 bg-white/5 text-zinc-400 hover:text-red-500 rounded-2xl border border-white/5 transition-all outline-none"><Trash2 size={18} /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            <div className="glass-card rounded-[3rem] border border-white/5 overflow-hidden">
              <div className="bg-gradient-to-b from-primary/20 to-transparent p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/30"></div>
                <div className="w-24 h-24 rounded-3xl bg-primary text-black flex items-center justify-center font-display text-4xl font-black mx-auto mb-6 shadow-[0_0_40px_rgba(255,215,0,0.3)]">{student.name.charAt(0)}</div>
                <h2 className="text-3xl font-black">{student.name}</h2>
                <div className="mt-4 inline-flex items-center gap-2 px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10">
                  <span className={`w-2 h-2 rounded-full ${student.status === 'Approved' ? 'bg-green-500' : student.status === 'Rejected' ? 'bg-red-500' : 'bg-primary animate-pulse'}`}></span>
                  {student.status}
                </div>
              </div>
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <InfoRow icon={<Phone size={18} />} label="Phone Number" value={student.phone} />
                <InfoRow icon={<Mail size={18} />} label="Email Address" value={student.email} />
                <InfoRow icon={<GraduationCap size={18} />} label="Enrolled Course" value={student.course} />
                <InfoRow icon={<Clock size={18} />} label="Passout Year" value={student.rollNumber || '—'} />
                <InfoRow icon={<Building size={18} />} label="Candidate Type" value={student.collegeName || '—'} />
                <InfoRow icon={<GraduationCap size={18} />} label="Graduation" value={student.branch || '—'} />
                <InfoRow icon={<MapPin size={18} />} label="City" value={student.location || '—'} />
              </div>
            </div>
          </div>

          {/* Right Column - Payment */}
          <div className="space-y-10">
            <div className="glass-card rounded-[3rem] p-10 border border-white/5">
              <h3 className="text-sm font-black text-white mb-8 uppercase tracking-widest flex items-center gap-2"><CreditCard className="text-primary" size={20} /> Registry Payment</h3>
              <div className="p-8 bg-white/5 rounded-3xl text-center mb-8 border border-white/5 backdrop-blur-md">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3">Verified Amount</p>
                <p className="text-5xl font-black text-white flex items-center justify-center italic">₹{payment?.amount || 0}</p>
              </div>
              <div className="space-y-4">
                <DetailRow label="Protocol Status" value={
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${payment?.status === 'Paid' ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}`}>{payment?.status || 'Pending'}</span>
                } />
                <DetailRow label="Transaction Ref" value={<span className="text-[10px] font-mono text-zinc-500">{payment?.razorpayPaymentId || 'N/A'}</span>} />
                <DetailRow label="Log Date" value={payment?.createdAt ? new Date(payment.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Pending Log'} />
              </div>
            </div>

            <div className="bg-primary/5 rounded-[2rem] p-8 text-center border border-primary/20">
               <ShieldCheck className="text-primary mx-auto mb-4" size={32} />
               <p className="font-mono text-[9px] text-primary bg-primary/10 py-2 px-3 rounded-lg truncate select-all">{student._id}</p>
               <p className="text-[10px] text-zinc-600 mt-4 font-black uppercase tracking-widest leading-relaxed">
                  Data Encrypted &<br/>Stored Securely
               </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 p-5 bg-white/5 rounded-3xl border border-white/5 group hover:bg-white/[0.08] transition-all">
    <div className="text-primary mt-1 group-hover:scale-110 transition-transform">{icon}</div>
    <div><p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">{label}</p><p className="text-sm font-bold text-white tracking-tight">{value}</p></div>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-4 border-b border-white/5">
    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</span>
    <span className="text-xs font-bold text-white">{value}</span>
  </div>
);

export default StudentDetails;
