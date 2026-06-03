import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { createStudent, createRazorpayOrder, verifyRazorpayPayment, getAllCourses } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Loader2, User, CreditCard, ShieldCheck, MapPin, Building, GraduationCap, Phone, Mail, BookOpen, Send, Sparkles, ChevronRight, Zap, Briefcase, Clock, Lock, X, AlertTriangle, CheckCircle2, UserPlus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import AuthModal from '../components/AuthModal';

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_SufPL6VwSvSJOW';

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
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSlotTerms, setShowSlotTerms] = useState(false);
  const [slotTermsAccepted, setSlotTermsAccepted] = useState(false);

  // Login/Signup Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  useEffect(() => {
    if (!user) {
      setIsAuthModalOpen(true);
      setAuthModalMode('login');
    } else {
      setIsAuthModalOpen(false);
    }
  }, [user]);

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

  const handleSlotSelect = () => {
    setPaymentType('slot');
    setShowSlotTerms(true);
    setSlotTermsAccepted(false);
  };

  const handleSlotTermsConfirm = () => {
    setSlotTermsAccepted(true);
    setShowSlotTerms(false);
  };

  const handleSlotTermsCancel = () => {
    setShowSlotTerms(false);
    setSlotTermsAccepted(false);
    setPaymentType('full');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check terms acceptance
    if (!termsAccepted) {
      toast.error('Please agree to the Terms & Conditions, Privacy Policy, and Refund Policy before proceeding.');
      const termsEl = document.getElementById('terms-checkbox-section');
      if (termsEl) termsEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Check slot terms if slot payment selected
    if (paymentType === 'slot' && !slotTermsAccepted) {
      setShowSlotTerms(true);
      toast.error('Please accept the Slot Booking Terms before proceeding.');
      return;
    }

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
  const basePrice = selectedCourseObj && selectedCourseObj.price ? Number(selectedCourseObj.price) : 9999;
  const currentSlotPrice = selectedCourseObj 
    ? (selectedCourseObj.slotPrice ? Number(selectedCourseObj.slotPrice) : null) 
    : 3000;

  const [couponInput, setCouponInput] = useState('');
  
  const isCouponValid = selectedCourseObj && selectedCourseObj.couponCode 
    && couponInput.trim().toUpperCase() === selectedCourseObj.couponCode.toUpperCase();

  let finalPrice = basePrice;
  if (isCouponValid) {
    if (selectedCourseObj.discountType === 'flat') {
      finalPrice = Math.max(0, basePrice - (selectedCourseObj.discountValue || 0));
    } else {
      finalPrice = Math.max(0, basePrice - (basePrice * (selectedCourseObj.discountValue || 0) / 100));
    }
  }

  const currentPrice = finalPrice;
  const displayPrice = paymentType === 'full' ? currentPrice : currentSlotPrice;

  // Make sure payment type resets to 'full' if slot booking isn't available for this course
  useEffect(() => {
    if (paymentType === 'slot' && currentSlotPrice === null) {
      setPaymentType('full');
    }
  }, [currentSlotPrice, paymentType]);

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

                   {user ? (
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
                          <InputField 
                            label="Passout Year" 
                            name="rollNumber" 
                            icon={GraduationCap} 
                            type="text" 
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
                        
                        {/* Coupon Code Section */}
                        <div className="pt-2">
                          <div className="flex gap-4 items-start">
                             <div className="flex-1">
                               <InputField 
                                 label="Coupon Code (Optional)" 
                                 name="couponCode" 
                                 icon={Sparkles} 
                                 required={false}
                                 value={couponInput} 
                                 onChange={(e) => setCouponInput(e.target.value.toUpperCase())} 
                               />
                             </div>
                          </div>
                          {couponInput && isCouponValid && (
                             <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-2 px-4 flex items-center gap-1.5"><CheckCircle2 size={12}/> Coupon applied successfully! Discount applied to Full Payment.</p>
                          )}
                          {couponInput && !isCouponValid && (
                             <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2 px-4 flex items-center gap-1.5"><AlertTriangle size={12}/> Invalid coupon code.</p>
                          )}
                        </div>
                      </div>

                      {/* Payment Option Selector */}
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <label className="block text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Select Payment Option</label>
                        <div className={`grid grid-cols-1 ${currentSlotPrice !== null ? 'md:grid-cols-2' : ''} gap-6`}>
                           <div 
                             onClick={() => { setPaymentType('full'); setSlotTermsAccepted(false); }}
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
                           
                           {currentSlotPrice !== null && (
                             <div 
                               onClick={handleSlotSelect}
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
                           )}
                        </div>
                      </div>

                      {/* Terms & Conditions Checkbox */}
                      <div id="terms-checkbox-section" className="pt-6">
                        <label className="flex items-start gap-4 cursor-pointer group">
                          <div className="relative mt-0.5">
                            <input
                              type="checkbox"
                              checked={termsAccepted}
                              onChange={(e) => setTermsAccepted(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                              termsAccepted
                                ? 'bg-primary border-primary shadow-md shadow-primary/20'
                                : 'border-slate-300 group-hover:border-primary/50'
                            }`}>
                              {termsAccepted && (
                                <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className="text-xs text-slate-600 leading-relaxed font-medium">
                            I agree to the{' '}
                            <Link to="/terms" target="_blank" className="text-primary font-bold hover:underline">Terms & Conditions</Link>,{' '}
                            <Link to="/privacy" target="_blank" className="text-primary font-bold hover:underline">Privacy Policy</Link>, and{' '}
                            <Link to="/refund" target="_blank" className="text-primary font-bold hover:underline">Refund Policy</Link> of Glitch Skill Hub.
                          </span>
                        </label>
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
                                disabled={loading || !termsAccepted}
                                className={`w-full md:w-auto px-10 py-5 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl whitespace-nowrap border ${
                                  termsAccepted
                                    ? 'bg-primary text-black hover:bg-white hover:scale-[1.02] active:scale-95 shadow-primary/25 border-primary hover:border-white cursor-pointer'
                                    : 'bg-slate-200 text-slate-400 border-slate-200 shadow-none cursor-not-allowed'
                                }`}
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
                   ) : (
                     <div className="py-16 text-center flex flex-col items-center justify-center border-t border-slate-100 mt-8">
                       <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6 shadow-sm">
                         <Lock size={32} />
                       </div>
                       <h3 className="text-2xl font-bold tracking-tight mb-3">Authentication Required</h3>
                       <p className="text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
                         To ensure a secure checkout and to assign this course to you, please log in or create an account first.
                       </p>
                       <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                         <button 
                           type="button"
                           onClick={() => { setAuthModalMode('login'); setIsAuthModalOpen(true); }}
                           className="btn-premium py-4 px-10 text-sm cursor-pointer"
                         >
                           Log In
                         </button>
                         <button 
                           type="button"
                           onClick={() => { setAuthModalMode('signup'); setIsAuthModalOpen(true); }}
                           className="py-4 px-10 rounded-full border-2 border-slate-100 font-bold uppercase tracking-widest text-xs text-slate-600 hover:border-primary hover:text-slate-900 transition-colors cursor-pointer"
                         >
                           Create Account
                         </button>
                       </div>
                     </div>
                   )}
                </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Slot Booking Terms Popup Modal */}
      {showSlotTerms && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
          <div className="bg-white rounded-[2rem] max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <AlertTriangle size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white tracking-tight">Slot Booking Terms</h3>
                  <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Please read carefully</p>
                </div>
              </div>
              <button onClick={handleSlotTermsCancel} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 space-y-5">
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <X size={12} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-red-900 mb-1">Non-Refundable Payment</p>
                  <p className="text-xs text-red-700 leading-relaxed">The slot booking amount is <strong>strictly non-refundable</strong> under any circumstances. Once paid, this amount cannot be reversed or transferred.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={12} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-amber-900 mb-1">Complete Payment Before Course Starts</p>
                  <p className="text-xs text-amber-700 leading-relaxed">You must pay the <strong>remaining course balance at least 5 days before</strong> the course start date. Failure to complete the payment may result in loss of your reserved slot.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck size={12} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-900 mb-1">Slot Reservation Guarantee</p>
                  <p className="text-xs text-blue-700 leading-relaxed">Your seat in the upcoming batch will be reserved upon successful slot payment. You will receive a confirmation via email and WhatsApp.</p>
                </div>
              </div>

              <p className="text-[10px] text-slate-500 font-semibold leading-relaxed text-center pt-2">
                By clicking "I Agree & Continue", you acknowledge that you have read and understood all the slot booking terms mentioned above.
              </p>
            </div>

            {/* Actions */}
            <div className="px-6 md:px-8 pb-6 md:pb-8 flex gap-3">
              <button
                onClick={handleSlotTermsCancel}
                className="flex-1 py-4 rounded-xl border-2 border-slate-200 text-slate-600 font-bold uppercase tracking-widest text-[10px] hover:border-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSlotTermsConfirm}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold uppercase tracking-widest text-[10px] hover:from-amber-600 hover:to-orange-600 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={14} />
                I Agree & Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Auth Modal Popup for Registration Flow */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authModalMode} 
      />
    </div>
  );
};

export default Registration;
