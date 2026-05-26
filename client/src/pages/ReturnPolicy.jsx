import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-black">
      <SEO title="Return & Refund Policy" description="Return and Refund Policy for Glitch Skill Hub" />
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="badge-modern mb-8"><span></span> Legal</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Return & <span className="text-primary">Refund Policy</span></h1>
          <p className="text-slate-500 mb-12">Effective Date: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
            <p className="text-lg">
              At Glitch Skill Hub, our primary goal is to provide high-quality education and practical skills. We understand that circumstances may change, and we have outlined our refund and return policy below to ensure transparency.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Refund Eligibility</h2>
              <p>
                We offer a conditional refund policy: 
                <strong> Refund requests are strictly valid only if initiated up to 5 days before the official course start date.</strong>
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>If you request a refund at least 5 days prior to the start of your batch, your refund will be processed (deducting applicable processing or payment gateway fees).</li>
                <li>Once the course begins, or if the request is made within the 5-day window prior to starting, <strong>no refunds</strong> will be provided under any circumstances.</li>
              </ul>
            </section>
            
            <section>
              <div className="bg-yellow-50 border-l-4 border-primary p-6 rounded-r-lg my-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Important Disclaimers</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-800">
                  <li><strong>Practical Skills:</strong> We will teach you the real-time skills only. Our curriculum is entirely focused on practical, industry-ready knowledge.</li>
                  <li><strong>Mentorship:</strong> All our mentors are experienced professionals, including MNC employees and startup employees.</li>
                  <li><strong>Skills Training Only:</strong> We are a <strong>skills training platform only</strong>. We teach real-time, practical engineering skills. We do NOT provide any job placement, hiring assistance, or guaranteed employment.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Request a Refund</h2>
              <p>
                If you have any doubts, or if you meet the eligibility criteria and wish to request a refund, please reach out directly to our official email address.
              </p>
              <p className="mt-4">
                📧 <strong><a href="mailto:info@glitchedu.online" className="text-primary hover:underline">info@glitchedu.online</a></strong>
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Please include your full name, registration details, and the reason for the refund in your email. We aim to respond to all inquiries within 48 hours.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ReturnPolicy;
