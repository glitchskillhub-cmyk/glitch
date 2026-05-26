import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-black">
      <SEO title="Privacy Policy" description="Privacy Policy for Glitch Skill Hub" />
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="badge-modern mb-8"><span></span> Legal</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacy <span className="text-primary">Policy</span></h1>
          <p className="text-slate-500 mb-12">Effective Date: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
            <p className="text-lg">
              At Glitch Skill Hub, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our platform and services.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
              <p>We may collect the following types of information when you register for our courses or use our services:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and professional background.</li>
                <li><strong>Usage Data:</strong> Information about how you navigate and interact with our website.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
              <p>Your information is primarily used to provide and improve our educational services, specifically to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Process your enrollment and manage your account.</li>
                <li>Communicate important updates regarding courses, schedules, and learning progress.</li>
                <li>Improve and personalize your learning experience on our platform.</li>
                <li>Enhance our curriculum and user experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Sharing and Protection</h2>
              <p>We do not sell or rent your personal information to third parties. We may share your data with trusted partners solely for the purpose of facilitating our services, such as payment processing or email communications. We implement industry-standard security measures to protect your data from unauthorized access or disclosure.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Media and Promotional Consent</h2>
              <p>As part of our programs, we may use testimonials, project showcases, success stories, or session photographs for educational and promotional purposes, as detailed in our Terms & Conditions.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Contact Us</h2>
              <p>If you have any questions or concerns about our Privacy Policy, please contact us at:</p>
              <p className="mt-2">📧 <a href="mailto:info@glitchedu.online" className="text-primary hover:underline font-semibold">info@glitchedu.online</a></p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
