import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-black">
      <SEO title="Terms & Conditions" description="Terms and Conditions for Glitch Skill Hub" />
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="badge-modern mb-8"><span></span> Legal</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Terms & <span className="text-primary">Conditions</span></h1>
          <p className="text-slate-500 mb-12">Effective Date: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
            <p className="text-lg">
              Welcome to Glitch Skill Hub. By enrolling in our bootcamp programs, learners agree to comply with the following Terms & Conditions, policies, and guidelines.
              These terms are designed to maintain a professional, productive, and industry-focused learning environment for all participants.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Enrollment & Admission</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Admission is confirmed only after successful payment of the program fee.</li>
                <li>Seats are limited and allocated on a first-come, first-served basis.</li>
                <li>Glitch Skill Hub reserves the right to deny or cancel admission in case of: incomplete payment, misconduct, violation of policies, or providing false information.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Program Structure</h2>
              <p className="mb-2">The bootcamp includes live practical sessions, real-world project development, assignments & coding tasks, mock interviews, resume & LinkedIn guidance, and internship / completion certification.</p>
              <div className="bg-yellow-50 border-l-4 border-primary p-4 rounded-r-lg my-4 font-semibold text-slate-900 shadow-sm">
                Note: We focus heavily on practical application. We will teach you the real-time skills only.
              </div>
              <p>The curriculum and schedule may be updated periodically to improve learning outcomes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Attendance & Participation</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Maintain regular attendance and submit assignments on time.</li>
                <li>Participate actively in sessions and follow mentor instructions professionally.</li>
              </ul>
              <p className="mt-2">Repeated inactivity or non-participation may affect certification eligibility.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Refund Policy</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Refund requests are accepted only within <strong>5 calendar days</strong> before the official batch start date.</li>
                <li>After the refund eligibility period, no refunds or cancellations will be processed.</li>
                <li>Refund requests must be submitted through official support communication channels.</li>
                <li>Processing charges, payment gateway fees, or EMI charges (if applicable) may be deducted.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Batch Transfer / Deferral</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>One batch transfer may be allowed based on availability.</li>
                <li>Requests must be submitted before the course completion period. Additional administrative charges may apply.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Certification Policy</h2>
              <p>Certificates will be issued digitally only to learners who complete required assignments, attend regularly, successfully complete projects, and clear pending dues.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Skills Training Disclaimer</h2>
              <p className="mb-2">Glitch Skill Hub provides real-time practical skills training, mock interviews, resume optimization, and portfolio building support.</p>
              <div className="bg-yellow-50 border-l-4 border-primary p-4 rounded-r-lg my-4 font-semibold text-slate-900 shadow-sm">
                Please note: We are a skills training platform only. We teach real-time, practical engineering skills. We do NOT provide any job placement, hiring assistance, or guaranteed employment.
              </div>
              <p>Career outcomes depend entirely on learner effort, skills acquired, and market conditions.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Code of Conduct</h2>
              <p>Learners must maintain professional behavior throughout the program. Misconduct may result in suspension or removal.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Instructors and Mentors</h2>
              <p>Mentors at Glitch Skill Hub are industry professionals, including MNC employees and startup employees, providing real-world insights.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Brand & Legal Notice</h2>
              <div className="bg-yellow-50 border-l-4 border-primary p-4 rounded-r-lg my-4 font-semibold text-slate-900 shadow-sm">
                “Glitch Skill Hub” is currently operating as an educational and training brand and is NOT a registered company. Trademark registration and related intellectual property processes, if applicable, may be under progress.
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Contact Information</h2>
              <p>📧 <a href="mailto:info@glitchedu.online" className="text-primary hover:underline">info@glitchedu.online</a></p>
              <p>🌐 <a href="https://www.glitchedu.online" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Glitch Skill Hub</a></p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;
