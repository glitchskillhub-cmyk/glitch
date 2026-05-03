import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { createStudent, createRazorpayOrder, verifyRazorpayPayment } from '../utils/api';
import { Loader2, User, CreditCard, ShieldCheck, MapPin, Building, GraduationCap, Phone, Mail, BookOpen, Send, Sparkles, ChevronRight, Zap, Briefcase, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_Skseh7l3ljLVO7';

const InputField = ({ label, name, type = 'text', placeholder, icon: Icon, required = true, value, onChange, error }) => (
  <div className="floating-label-group">
    <div className="relative group">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={`input-field pr-12 focus:z-0 ${error ? 'border-red-500' : ''}`}
      />
      <label className="floating-label">
        <Icon size={14} className="text-slate-400" /> {label} {required && <span className="text-primary">*</span>}
      </label>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors pointer-events-none">
        <Icon size={18} />
      </div>
    </div>
    {error && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider px-4 mt-1">{error}</p>}
  </div>
);

const SelectField = ({ label, name, options, icon: Icon, required = true, value, onChange, error }) => (
  <div className="floating-label-group">
    <div className="relative group">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`input-field pr-12 appearance-none cursor-pointer group-focus:z-0 ${value ? 'select-active' : ''} ${error ? 'border-red-500' : ''}`}
      >
        <option value="" disabled hidden></option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <label className="floating-label">
        <Icon size={14} className="text-slate-400" /> {label} {required && <span className="text-primary">*</span>}
      </label>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary pointer-events-none">
        <Icon size={18} />
      </div>
    </div>
    {error && <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider px-4 mt-1">{error}</p>}
  </div>
);

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', course: 'Node.js Full Stack',
    rollNumber: '', collegeName: '', location: '', branch: '',
    presentRole: '', experience: '', companyName: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027'];
  const employmentTypes = ['Fresher', 'Employee'];

  const validateField = (name, value) => {
    let error = '';
    if (!value) {
      error = `This field is required.`;
    } else if (name === 'phone' && value && !/^\d{10}$/.test(value)) {
      error = 'Enter a valid 10-digit number.';
    } else if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Enter a valid Gmail ID.';
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  useEffect(() => {
    const requiredFields = ['name', 'phone', 'email', 'course', 'rollNumber', 'collegeName', 'location', 'branch'];
    const isAllFilled = requiredFields.every(field => formData[field] && formData[field].toString().trim() !== '');
    const hasNoErrors = Object.values(errors).every(err => !err);
    setIsFormValid(isAllFilled && hasNoErrors);
  }, [formData, errors]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return toast.error('Please complete the form correctly.');
    setLoading(true);

    try {
      const res1 = await createStudent(formData);
      const studentId = res1.data.studentId;

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error('Payment gateway failed to load.');
        setLoading(false);
        return;
      }

      const orderRes = await createRazorpayOrder({ studentId, course: formData.course });
      const order = orderRes.data.order;

      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: 'Glitch Skill Hub',
        description: `Admission - ${formData.course}`,
        order_id: order.id,
        handler: async (response) => {
          const verifyingToast = toast.loading('Verifying payment... Please wait.');
          try {
            await verifyRazorpayPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              studentId: studentId
            });
            toast.dismiss(verifyingToast);
            toast.success('Payment Verified! Registration Complete 🎉', { duration: 5000 });
            navigate('/success');
          } catch (err) {
            toast.dismiss(verifyingToast);
            console.error('Verification Error:', err);
            toast.error(err.response?.data?.message || 'Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: { color: '#FFD700' },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        toast.error(`Payment Failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (error) {
      console.error('Registration Error:', error);
      const serverMessage = error.response?.data?.message;
      const errorMessage = serverMessage || error.message || 'Submission failed.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-primary selection:text-black">
      <Navbar />

      <section className="pt-56 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/10 blur-[150px] -z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
             <div className="flex-1 lg:sticky lg:top-40">
                <div className="badge-modern mb-8">
                  <span></span> Admissions 2026
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-10">
                   Your Future <br />
                   Starts <span className="text-primary italic">Here.</span>
                </h1>
                <p className="text-2xl text-slate-500 leading-relaxed mb-10 max-w-xl">
                   Join the most practical engineering hub in India. High performance, no theory, just skills.
                </p>
                <div className="flex items-center gap-6 grayscale opacity-30">
                   <div className="font-display font-bold text-sm tracking-widest">Powered by</div>
                   <div className="flex gap-4">
                      <CreditCard size={32} />
                      <ShieldCheck size={32} />
                   </div>
                </div>
             </div>

             <div className="flex-1 w-full">
                <div className="bento-card p-10 md:p-16 bg-white shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-5 rotate-45 translate-x-16 -translate-y-16"></div>
                   
                   <div className="flex items-center gap-6 mb-12">
                      <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-primary">
                        <User size={32} />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold tracking-tight">Candidate Info</h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">Fill the details below</p>
                      </div>
                   </div>

                   <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 gap-8">
                        <InputField label="Full Name" name="name" icon={User} value={formData.name} onChange={handleInputChange} error={errors.name} />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <InputField label="Phone Number" name="phone" icon={Phone} type="number" value={formData.phone} onChange={handleInputChange} error={errors.phone} />
                          <InputField label="Gmail ID" name="email" icon={Mail} type="email" value={formData.email} onChange={handleInputChange} error={errors.email} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <SelectField 
                            label="Course" 
                            name="course" 
                            icon={BookOpen} 
                            options={['Node.js Full Stack']} 
                            value={formData.course} 
                            onChange={handleInputChange} 
                            error={errors.course} 
                          />
                          <SelectField 
                            label="Passout Year" 
                            name="rollNumber" 
                            icon={GraduationCap} 
                            options={years} 
                            value={formData.rollNumber} 
                            onChange={handleInputChange} 
                            error={errors.rollNumber} 
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <SelectField 
                            label="Fresher / Employee" 
                            name="collegeName" 
                            icon={Building} 
                            options={employmentTypes} 
                            value={formData.collegeName} 
                            onChange={handleInputChange} 
                            error={errors.collegeName} 
                          />
                          <InputField label="City" name="location" icon={MapPin} value={formData.location} onChange={handleInputChange} error={errors.location} />
                        </div>

                        {formData.collegeName === 'Employee' && (
                          <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-8 pt-4">
                            <div className="flex items-center gap-4 mb-2">
                               <div className="h-px flex-1 bg-slate-100"></div>
                               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Work Details</span>
                               <div className="h-px flex-1 bg-slate-100"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                               <InputField label="Present Role" name="presentRole" icon={Briefcase} value={formData.presentRole} onChange={handleInputChange} />
                               <InputField label="Experience (Years)" name="experience" icon={Clock} value={formData.experience} onChange={handleInputChange} />
                            </div>
                            <InputField label="Company Name (Optional)" name="companyName" icon={Building} value={formData.companyName} onChange={handleInputChange} required={false} />
                          </div>
                        )}

                        <InputField label="Graduation" name="branch" icon={GraduationCap} value={formData.branch} onChange={handleInputChange} error={errors.branch} />
                      </div>

                      {/* Dynamic Payment Card */}
                      <div className="mt-12 p-10 bg-slate-950 rounded-[3rem] text-white relative overflow-hidden group border border-white/5 shadow-2xl">
                        <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:rotate-12 transition-transform duration-700">
                           <Zap size={100} className="text-primary" />
                        </div>
                        <div className="relative z-10">
                           <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                              <div>
                                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3">Total Amount Due</p>
                                 <h3 className="text-6xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">₹9,999</h3>
                                 <p className="text-slate-400 text-[10px] mt-6 font-bold uppercase tracking-[0.2em]">Inclusive of all taxes & hub access</p>
                              </div>
                              <button
                                type="submit"
                                disabled={loading || !isFormValid}
                                className="btn-premium py-6 px-12 bg-white text-black hover:bg-primary"
                              >
                                {loading ? (
                                  <><Loader2 className="animate-spin" size={20} /> Processing</>
                                ) : (
                                  <><Send size={20} /> Join The Glitch Hub</>
                                )}
                              </button>
                           </div>
                        </div>
                      </div>
                   </form>
                </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Registration;
