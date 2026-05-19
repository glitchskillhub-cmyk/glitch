import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Plus, HelpCircle, ChevronRight } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const faqs = [
    {
      q: "Are the classes really taught by MNC engineers?",
      a: "Yes, 100%. All our trainers are currently working as Software Engineers, Leads, or Architects in top tech companies like Google, Microsoft, and Amazon."
    },
    {
      q: "Is it suitable for complete beginners?",
      a: "Absolutely. We have a 'Zero to Pro' track that starts from the absolute fundamentals of programming before moving into high-performance engineering."
    },
    {
      q: "Can working professionals join the batches?",
      a: "Yes, we have specialized evening and weekend batches specifically designed for working professionals looking to upskill or switch companies."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-36 md:pt-48 pb-14 md:pb-20 relative overflow-hidden bg-white text-slate-900 border-b border-slate-100">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px]"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="badge-modern mx-auto mb-8"><span></span> Get in Touch</div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-slate-900">
            Let's Start Your <br /> <span className="text-primary italic">Journey.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about our programs, trainers, or admissions? Our team is here to help you navigate your practical tech career path.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50/50 border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="section-title mb-12">Contact <span className="text-primary">Info.</span></h2>

              <div className="space-y-8">
                {[
                  { icon: MapPin, title: "Our Base", detail: "HiTech City, Hyderabad, India.", sub: "100% Online Classes Across India" },
                  { icon: Mail, title: "Email Us", detail: "info@glitchskillhub.com", sub: "admissions@glitchskillhub.com" },
                  { icon: Phone, title: "Call Us", detail: "+91 98765 43210", sub: "+91 91234 56789" },
                  { icon: Clock, title: "Working Hours", detail: "Mon - Sat: 9:00 AM - 7:00 PM", sub: "Sunday: Closed" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className="w-16 h-16 bg-white border border-slate-100 shadow-xs rounded-2xl flex items-center justify-center text-slate-900 shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors">
                      <item.icon size={28} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase mb-1 tracking-tight">{item.title}</h4>
                      <p className="text-slate-600 font-bold">{item.detail}</p>
                      <p className="text-slate-400 text-sm">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bento-card p-10 md:p-16 bg-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <MessageSquare size={100} />
              </div>

              <form className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="floating-label-group m-0">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=" "
                      className="input-field bg-slate-50/50 border-slate-100 hover:border-slate-300 focus:bg-white"
                    />
                    <label className="floating-label">Full Name</label>
                  </div>
                  <div className="floating-label-group m-0">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=" "
                      className="input-field bg-slate-50/50 border-slate-100 hover:border-slate-300 focus:bg-white"
                    />
                    <label className="floating-label">Email Address</label>
                  </div>
                </div>

                <div className="floating-label-group m-0">
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`input-field bg-slate-50/50 border-slate-100 hover:border-slate-300 focus:bg-white appearance-none ${formData.subject ? 'select-active' : ''}`}
                  >
                    <option value="" disabled selected hidden></option>
                    <option>Admission Inquiry</option>
                    <option>Course Details</option>
                    <option>Placement Support</option>
                    <option>Corporate Training</option>
                  </select>
                  <label className="floating-label">Subject</label>
                </div>

                <div className="floating-label-group m-0">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder=" "
                    className="input-field bg-slate-50/50 border-slate-100 hover:border-slate-300 focus:bg-white min-h-[150px]"
                  ></textarea>
                  <label className="floating-label">Your Message</label>
                </div>

                <button type="submit" className="btn-premium w-full py-6 text-lg">
                  <span>Send Message</span>
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10 md:mb-16">
            <div className="badge-modern mx-auto mb-8"><span></span> FAQ</div>
            <h2 className="section-title">Common <span className="text-primary italic">Questions.</span></h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bento-card bg-slate-50/50 border-slate-100/50 p-8 group hover:border-primary cursor-pointer">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">{faq.q}</h3>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-black transition-all">
                    <Plus size={20} />
                  </div>
                </div>
                <p className="text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="bento-card bg-slate-900 text-white p-0 overflow-hidden relative min-h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 grayscale scale-110">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.2)_0%,transparent_70%)]"></div>
            </div>
            <div className="relative z-10 text-center p-12">
              <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center text-black mx-auto mb-8 floating shadow-2xl">
                <MapPin size={48} />
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">Our Base In <span className="text-primary italic">HiTech City.</span></h2>
              <p className="text-slate-400 text-xl max-w-xl mx-auto mb-10">We operate from the heart of Hyderabad's tech hub, but our classes are 100% online across India.</p>
              <a href="#" className="flex items-center gap-2 font-display font-black text-sm uppercase tracking-widest text-primary hover:text-white transition-colors justify-center">
                Get Directions <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
