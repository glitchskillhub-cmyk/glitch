import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const BdeTerms = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-black">
      <SEO title="BDE Terms & Conditions" description="Terms and Conditions for Business Development Executive" />
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="badge-modern mb-8"><span></span> Legal</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">BUSINESS Development Executive (Freelance)</h1>
          <p className="text-xl text-slate-600 mb-8 font-semibold">Terms and Conditions</p>
          
          <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Nature of Association</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>This is a freelance opportunity and does not constitute full-time employment.</li>
                <li>Compensation will be based on performance, incentives, and profit-sharing terms.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Roles and Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Identify and connect with prospective clients and training institutes.</li>
                <li>Generate leads and maintain regular follow-ups.</li>
                <li>Build relationships with partners and clients.</li>
                <li>Represent Glitch Skill Hub professionally.</li>
                <li>Support business growth and partnership activities.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Performance Expectations</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Active participation in lead generation and follow-up activities is expected.</li>
                <li>Minimum target expectations will be discussed by the management.</li>
                <li>Performance will be reviewed periodically.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Initial Evaluation Period</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>The first month will be considered an evaluation period.</li>
                <li>Performance will be assessed based on communication, lead generation, follow-ups, and overall contribution.</li>
                <li>Continuation of the association will depend on performance and business requirements.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Compensation</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>This opportunity follows a performance-based incentive and profit-sharing model.</li>
                <li>Payouts will be processed based on successful conversions and mutually agreed terms.</li>
                <li>No fixed salary or employee benefits are applicable.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Professional Conduct</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Candidates are expected to maintain professionalism while representing Glitch Skill Hub.</li>
                <li>Misrepresentation, false commitments, or unethical practices are strictly prohibited.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Confidentiality</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>All company information, pricing, strategies, and client details are confidential.</li>
                <li>Sharing company information with third parties without authorization is prohibited.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Termination of Association</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Glitch Skill Hub reserves the right to discontinue the association at any time based on performance, misconduct, or business requirements.</li>
                <li>The candidate may also discontinue the association by providing prior notice.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Acceptance</h2>
              <p>By joining Glitch Skill Hub, I acknowledge that I have read and understood the above terms and conditions and agree to comply with them.</p>
              <p className="font-semibold mt-4">Glitch HR Team.</p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BdeTerms;
