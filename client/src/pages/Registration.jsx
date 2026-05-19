import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { createStudent, createRazorpayOrder, verifyRazorpayPayment, getAllCourses } from '../utils/api';
import { useAuth } from '../context/AuthContext';
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
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', course: '',
    rollNumber: '', collegeName: '', location: '', branch: '',
    presentRole: '', experience: '', companyName: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [courses, setCourses] = useState([]);
  const [paymentType, setPaymentType] = useState('full'); // 'full' or 'slot'

  // Fetch courses and handle url params on load
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getAllCourses();
        setCourses(res.data);
        
        const queryParams = new URLSearchParams(window.location.search);
        const courseParam = queryParams.get('course');
        
        if (courseParam) {
          setFormData(prev => ({ ...prev, course: courseParam }));
        } else if (res.data.length > 0) {
          setFormData(prev => ({ ...prev, course: res.data[0].title }));
        }
        console.log('Courses fetched for registration selection!');
      } catch (e) {
        console.error('Error fetching courses:', e);
      }
    };
    fetchCourses();
  }, []);

  // Pre-fill student info if they are already logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone
      }));
    }
  }, [user]);

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

    // Map fields to user-friendly label names
    const requiredFields = [
      { key: 'name', label: 'Full Name' },
      { key: 'phone', label: 'Phone Number' },
      { key: 'email', label: 'Gmail ID' },
      { key: 'course', label: 'Course' },
      { key: 'rollNumber', label: 'Passout Year' },
      { key: 'collegeName', label: 'Fresher / Employee' },
      { key: 'location', label: 'City' },
      { key: 'branch', label: 'Graduation' }
    ];

    let validationErrors = {};
    let missingLabels = [];

    requiredFields.forEach(field => {
      const val = formData[field.key];
      const err = validateField(field.key, val);
      if (err || !val || val.toString().trim() === '') {
        validationErrors[field.key] = err || 'This field is required.';
        missingLabels.push(field.label);
      }
    });

    if (missingLabels.length > 0) {
      setErrors(prev => ({ ...prev, ...validationErrors }));
      
      // Auto-scroll to the first invalid field for maximum convenience
      const firstMissingKey = requiredFields.find(f => validationErrors[f.key])?.key;
      const element = document.getElementsByName(firstMissingKey)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }

      toast.error(`Please fill out all mandatory fields: ${missingLabels.join(', ')}`);
      return;
    }

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

      const orderRes = await createRazorpayOrder({ studentId, course: formData.course, paymentType });
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

  // Find currently selected course to display its dynamic price
  const selectedCourseObj = courses.find(c => c.title === formData.course);
  const currentPrice = selectedCourseObj && selectedCourseObj.price ? Number(selectedCourseObj.price) : 9999;
  const currentSlotPrice = selectedCourseObj && selectedCourseObj.slotPrice ? Number(selectedCourseObj.slotPrice) : 3000;
  const displayPrice = paymentType === 'full' ? currentPrice : currentSlotPrice;

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-primary selection:text-black">
      <SEO title="Registration" description="Enroll in Glitch Skill Hub's premium career programs and start building your real-world portfolio today." path="/register" />
      <Navbar />

      <section className="pt-36 md:pt-48 pb-14 md:pb-20 relative overflow-hidden">
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
                        {user ? (
                          <p className="text-[10px] text-green-500 font-black uppercase tracking-[0.2em] flex items-center gap-1.5 mt-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Logged in as: <span className="text-slate-900 font-black">{user.name} ({user.email})</span>
                          </p>
                        ) : (
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-1">
                            Fill the details below. Already registered? <Link to="/login" className="text-primary hover:underline font-black">Login here</Link>
                          </p>
                        )}
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
                            options={courses.map(c => c.title)} 
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

                      {/* Payment Option Selector */}
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <label className="block text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Select Payment Option</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div 
                             onClick={() => setPaymentType('full')}
                             className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                               paymentType === 'full' 
                                 ? 'border-primary bg-primary/5 text-slate-900 shadow-md' 
                                 : 'border-slate-200 hover:border-slate-300 bg-white text-slate-500'
                             }`}
                           >
                             <div className="flex justify-between items-center mb-2">
                               <span className="text-sm font-black uppercase tracking-wider">Full Payment</span>
                               <input type="radio" checked={paymentType === 'full'} onChange={() => {}} className="accent-primary" />
                             </div>
                             <p className="text-2xl font-black text-slate-950">₹{currentPrice.toLocaleString()}</p>
                             <p className="text-[10px] mt-1 text-slate-400 font-bold uppercase tracking-wider">Pay once and get full course access</p>
                           </div>
                           
                           <div 
                             onClick={() => setPaymentType('slot')}
                             className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                               paymentType === 'slot' 
                                 ? 'border-primary bg-primary/5 text-slate-900 shadow-md' 
                                 : 'border-slate-200 hover:border-slate-300 bg-white text-slate-500'
                             }`}
                           >
                             <div className="flex justify-between items-center mb-2">
                               <span className="text-sm font-black uppercase tracking-wider">Secure Your Slot</span>
                               <input type="radio" checked={paymentType === 'slot'} onChange={() => {}} className="accent-primary" />
                             </div>
                             <p className="text-2xl font-black text-slate-950">₹{currentSlotPrice.toLocaleString()}</p>
                             <p className="text-[10px] mt-1 text-slate-400 font-bold uppercase tracking-wider">Book your seat now & pay the rest later</p>
                           </div>
                        </div>
                      </div>

                      {/* Dynamic Payment Card */}
                      <div className="mt-12 p-8 md:p-12 bg-gradient-to-br from-slate-900 via-slate-950 to-black rounded-[3rem] text-white relative overflow-hidden group border border-zinc-800 shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
                           <Zap size={140} className="text-primary" />
                        </div>
                        <div className="relative z-10">
                           <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10">
                              <div className="text-center md:text-left">
                                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-3">Total Amount Due</p>
                                 <div className="inline-flex items-center gap-2 bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10 backdrop-blur-sm">
                                    <h3 className="text-4xl md:text-5xl font-black tracking-tight text-primary drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">₹{displayPrice.toLocaleString()}</h3>
                                 </div>
                                 <p className="text-zinc-500 text-[9px] mt-4 font-bold uppercase tracking-[0.25em]">Inclusive of all taxes & hub access</p>
                              </div>
                              <button
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-auto px-10 py-5 bg-primary text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl flex items-center justify-center gap-3 hover:bg-white hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/25 whitespace-nowrap border border-primary hover:border-white"
                              >
                                {loading ? (
                                  <><Loader2 className="animate-spin text-black" size={16} /> Processing</>
                                ) : (
                                  <><Send size={16} /> Join The Glitch Hub</>
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
