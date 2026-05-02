import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { createStudent, savePayment } from '../utils/api';
import Sidebar from '../components/Sidebar';
import { User, ShieldCheck, GraduationCap, MapPin, Building, Send, Loader2, CreditCard, Mail, Phone, BookOpen, Clock } from 'lucide-react';

const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', course: 'Node.js Full Stack',
    rollNumber: '', collegeName: '', location: '', branch: '',
    paymentAmount: '2', paymentStatus: 'Paid'
  });
  const [loading, setLoading] = useState(false);

  const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027'];
  const employmentTypes = ['Fresher', 'Employee'];

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res1 = await createStudent({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        branch: formData.branch,
        rollNumber: formData.rollNumber,
        collegeName: formData.collegeName,
        location: formData.location,
        course: formData.course,
      });
      const studentId = res1.data.studentId;

      if (formData.paymentAmount) {
        await savePayment(studentId, {
          amount: formData.paymentAmount,
          status: formData.paymentStatus,
          paymentMethod: 'Manual Entry',
          transactionId: `ADMIN-${Date.now()}`
        });
      }

      toast.success('Student Added Successfully');
      navigate('/admin');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add student.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-display font-black tracking-tighter uppercase italic">
            Manual <span className="text-primary not-italic">Enrollment</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-1 font-medium italic">Administrative Bypass Portal</p>
        </header>

        <form onSubmit={handleSubmit} className="glass-card rounded-[2.5rem] border border-white/5 p-10 space-y-10 max-w-4xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 pointer-events-none">
             <User size={200} />
          </div>

          <section className="space-y-8 relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
              <User size={16} /> Identity Registry
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Full Name</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="input-field" placeholder="John Doe" /></div>
              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Phone Number</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="input-field" placeholder="9876543210" /></div>
              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Gmail ID</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="input-field" placeholder="john@gmail.com" /></div>
              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Course</label>
                <select name="course" value={formData.course} onChange={handleInputChange} required className="input-field cursor-pointer">
                  <option value="Node.js Full Stack">Node.js Full Stack</option>
                </select>
              </div>
              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Passout Year</label>
                <select name="rollNumber" value={formData.rollNumber} onChange={handleInputChange} required className="input-field cursor-pointer">
                   <option value="">Select Year</option>
                   {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Fresher / Employee</label>
                <select name="collegeName" value={formData.collegeName} onChange={handleInputChange} required className="input-field cursor-pointer">
                   <option value="">Select Type</option>
                   {employmentTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">City</label><input type="text" name="location" value={formData.location} onChange={handleInputChange} required className="input-field" placeholder="Hyderabad" /></div>
              <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Graduation</label><input type="text" name="branch" value={formData.branch} onChange={handleInputChange} required className="input-field" placeholder="B.Tech" /></div>
            </div>
          </section>

          <section className="space-y-8 relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white flex items-center gap-2">
              <CreditCard size={16} /> Financial Record
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white/5 rounded-3xl border border-white/5">
               <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Paid Amount (₹)</label><input type="number" name="paymentAmount" value={formData.paymentAmount} onChange={handleInputChange} className="input-field" /></div>
               <div className="space-y-2"><label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Payment Status</label>
                 <select name="paymentStatus" value={formData.paymentStatus} onChange={handleInputChange} className="input-field cursor-pointer"><option value="Paid">Paid</option><option value="Pending">Pending</option></select>
               </div>
            </div>
          </section>

          <button type="submit" disabled={loading} className="btn-yellow w-full py-5 shadow-[0_0_30px_rgba(255,215,0,0.1)]">
            {loading ? <><Loader2 className="animate-spin" size={18} /> Processing...</> : <><Send size={18} /> Add to Registry</>}
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddStudent;
