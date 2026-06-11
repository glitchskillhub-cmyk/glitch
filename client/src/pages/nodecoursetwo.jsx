import React, { useState, useEffect } from "react";
import brochurePdf from '../assets/MernFullStack-Brochure.pdf';
import logo from '../assets/images/glitch-logo.webp';

export default function NodeCourseTwo() {
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(46 * 60);

  useEffect(() => {
    let endTime = localStorage.getItem('nodeCourseTwoOfferEndTime');
    if (!endTime || Date.now() > parseInt(endTime, 10)) {
      endTime = Date.now() + 46 * 60 * 1000;
      localStorage.setItem('nodeCourseTwoOfferEndTime', endTime.toString());
    }

    const interval = setInterval(() => {
      const remaining = Math.floor((parseInt(endTime, 10) - Date.now()) / 1000);
      if (remaining <= 0) {
        const newEndTime = Date.now() + 46 * 60 * 1000;
        localStorage.setItem('nodeCourseTwoOfferEndTime', newEndTime.toString());
        setTimeLeft(46 * 60);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginLeft: '4px' }}>
        <span style={{ background: '#ef4444', color: 'white', padding: '2px 6px', borderRadius: '4px', fontWeight: '900', fontFamily: 'monospace', fontSize: '1rem', letterSpacing: '1px', boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)' }}>{m}</span>
        <span style={{ color: '#ef4444', fontWeight: '900' }}>:</span>
        <span style={{ background: '#ef4444', color: 'white', padding: '2px 6px', borderRadius: '4px', fontWeight: '900', fontFamily: 'monospace', fontSize: '1rem', letterSpacing: '1px', boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)' }}>{s}</span>
      </span>
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const alreadyDismissed = sessionStorage.getItem('zohoPopupDismissed');
      if (!alreadyDismissed) {
        setShowPopup(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem('zohoPopupDismissed', 'true');
  };

  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>
            Full Stack Node.js Course for Working Professionals |
            Glitch Skill Hub
          </title>
          <meta
            name="description"
            content="Join Glitch Skill Hub's 45-day Full Stack Node.js course for working professionals. Learn Node.js, APIs, PostgreSQL, TypeScript, Docker, GitHub, authentication, and real-time project development. Enroll now."
          />
          <link
            rel="canonical"
            href="https://www.glitchedu.online/node-js-course"
          />
          <meta name="robots" content="index, follow" />
          {/*  OG  */}
          <meta
            property="og:title"
            content="Full Stack Node.js Course for Working Professionals | Glitch Skill Hub"
          />
          <meta
            property="og:description"
            content="45-day live online Full Stack Node.js course for working IT professionals . Node.js, APIs, PostgreSQL, TypeScript, Docker. Enroll now."
          />
          <meta
            property="og:url"
            content="https://www.glitchedu.online/node-js-course"
          />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="[OG_IMAGE_URL_TO_BE_CONFIGURED]" />
          {/*  Fonts  */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          {/*  Configuration placeholders  */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
const CONFIG = {
  WHATSAPP_URL: "https://wa.me/916300127932?text=Hi%2C%20I%27m%20interested%20in%20the%20Full%20Stack%20Node.js%20course",
  PHONE_NUMBER: "+916300127932",
  PAYMENT_URL: "https://www.glitchedu.online/register",
  PRIVACY_POLICY_URL: "https://www.glitchedu.online/privacy-policy",
  TERMS_URL: "https://www.glitchedu.online/terms",
  REFUND_POLICY_URL: "https://www.glitchedu.online/refund-policy",
  CONTACT_URL: "https://www.glitchedu.online/contact",
  BROCHURE_PDF_URL: "[BROCHURE_PDF_URL_TO_BE_CONFIGURED]",
  BROCHURE_DOWNLOAD_ENDPOINT: "/api/brochure-download",
  GTM_CONTAINER_ID: "[GTM_CONTAINER_ID]",
  GA4_MEASUREMENT_ID: "[GA4_MEASUREMENT_ID]",
  GOOGLE_ADS_CONVERSION_ID: "[GOOGLE_ADS_CONVERSION_ID]",
  GOOGLE_ADS_CONVERSION_LABEL: "[GOOGLE_ADS_CONVERSION_LABEL]"
};
`,
            }}
          />

          <style
            dangerouslySetInnerHTML={{
              __html: `
/* ===================== DESIGN TOKENS ===================== */
:root {
  --yellow: #F5C200;
  --yellow-dark: #D4A800;
  --yellow-light: #FFF8DC;
  --yellow-pale: #FFFDF0;
  --black: #0D0D0D;
  --near-black: #1A1A1A;
  --dark: #2C2C2C;
  --mid: #555555;
  --muted: #888888;
  --border: #E8E8E8;
  --border-strong: #D0D0D0;
  --white: #FFFFFF;
  --off-white: #FAFAFA;
  --surface: #F7F7F5;
  --success: #1A7F4B;
  --error: #C0392B;

  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  --shadow-card: 0 1px 4px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04);
  --shadow-form: 0 2px 8px rgba(0,0,0,0.10), 0 8px 32px rgba(0,0,0,0.06);
  --max-w: 1140px;
}

/* ===================== RESET ===================== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.7;
  color: var(--dark);
  background: var(--white);
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4, h5 {
  font-family: var(--font-display);
  line-height: 1.25;
  color: var(--near-black);
  font-weight: 700;
}
h1 { font-size: clamp(28px, 5vw, 48px); }
h2 { font-size: clamp(22px, 3.5vw, 36px); }
h3 { font-size: clamp(17px, 2.5vw, 22px); }
p { color: var(--mid); }
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
ul { list-style: none; }

.container { max-width: var(--max-w); margin: 0 auto; padding: 0 24px; }
.section { padding: 72px 0; }
.section-alt { background: var(--surface); }
.section-dark { background: var(--near-black); }
.section-yellow { background: var(--yellow-light); }

/* ===================== ANNOUNCE BAR ===================== */
.announce-bar {
  background: var(--yellow);
  color: var(--near-black);
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  padding: 10px 24px;
  letter-spacing: 0.02em;
}
.announce-bar span { margin: 0 16px; opacity: 0.6; }

/* ===================== NAV ===================== */
.nav {
  background: var(--white);
  border-bottom: 1.5px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0 24px;
}
.nav-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 16px;
}
.nav-logo {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  color: var(--near-black);
  flex-shrink: 0;
}
.nav-logo strong { color: var(--yellow-dark); }
.nav-links {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.nav-links a {
  font-size: 14px;
  font-weight: 500;
  color: var(--mid);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  transition: color 0.2s;
  white-space: nowrap;
}
.nav-links a:hover { color: var(--near-black); }
.nav-cta {
  background: var(--yellow);
  color: var(--near-black) !important;
  font-weight: 700 !important;
  border-radius: var(--radius-sm) !important;
  padding: 8px 18px !important;
  transition: background 0.2s !important;
  white-space: nowrap;
}
.nav-cta:hover { background: var(--yellow-dark) !important; }

/* ===================== BUTTONS ===================== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-display);
  font-weight: 700;
  border: none;
  cursor: pointer;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  min-height: 48px;
  padding: 0 24px;
  font-size: 15px;
  line-height: 1;
  white-space: nowrap;
}
.btn:focus-visible {
  outline: 3px solid var(--yellow);
  outline-offset: 2px;
}
.btn-primary {
  background: var(--yellow);
  color: var(--near-black);
}
.btn-primary:hover { background: var(--yellow-dark); transform: translateY(-1px); }
.btn-primary:active { transform: translateY(0); }
.btn-secondary {
  background: var(--white);
  color: var(--near-black);
  border: 2px solid var(--border-strong);
}
.btn-secondary:hover { border-color: var(--near-black); background: var(--off-white); }
.btn-outline-dark {
  background: transparent;
  color: var(--white);
  border: 2px solid rgba(255,255,255,0.4);
}
.btn-outline-dark:hover { border-color: var(--yellow); color: var(--yellow); }
.btn-pay {
  background: var(--near-black);
  color: var(--yellow);
  font-size: 14px;
  padding: 0 20px;
  min-height: 44px;
}
.btn-pay:hover { background: var(--dark); }
.btn-lg { min-height: 56px; font-size: 17px; padding: 0 32px; }
.btn-sm { min-height: 40px; font-size: 14px; padding: 0 18px; }
.btn-full { width: 100%; }

/* ===================== HERO ===================== */
.hero {
  background: var(--white);
  padding: 64px 0 72px;
  border-bottom: 1.5px solid var(--border);
}
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 56px;
  align-items: start;
}
.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--yellow-light);
  border: 1.5px solid var(--yellow);
  color: var(--near-black);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 40px;
  margin-bottom: 20px;
  font-family: var(--font-display);
}
.hero-eyebrow::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--yellow-dark);
  flex-shrink: 0;
}
.hero h1 {
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}
.hero h1 em {
  font-style: normal;
  color: var(--yellow-dark);
}
.hero-sub {
  font-size: 17px;
  color: var(--mid);
  line-height: 1.7;
  margin-bottom: 20px;
}
.hero-qualify {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 28px;
}
.hero-qualify-good,
.hero-qualify-bad {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
}
.hero-qualify-good { color: var(--success); }
.hero-qualify-bad { color: var(--muted); }
.qualify-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  flex-shrink: 0;
}
.qualify-icon.yes { background: #D4EDDA; color: var(--success); }
.qualify-icon.no { background: #F0F0F0; color: var(--muted); }

.hero-details {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
}
.detail-chip {
  display: flex;
  align-items: center;
  gap: 7px;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 40px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--near-black);
  font-family: var(--font-display);
}
.detail-chip-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--yellow-dark);
  flex-shrink: 0;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
}
.hero-pay-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.hero-pay-micro {
  font-size: 13px;
  color: var(--muted);
}
.hero-trust {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--muted);
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}
.hero-trust-dot { color: var(--yellow-dark); font-size: 18px; line-height: 1; }

/* Hero Form Card */
.hero-form-card {
  background: var(--white);
  border: 2px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 36px 32px;
  box-shadow: var(--shadow-form);
  position: sticky;
  top: 80px;
}
.hero-form-card h3 {
  font-size: 20px;
  margin-bottom: 6px;
  color: var(--near-black);
}
.form-helper {
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 24px;
  line-height: 1.5;
}

/* ===================== FORMS ===================== */
.form-group {
  margin-bottom: 16px;
}
.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--near-black);
  margin-bottom: 6px;
  font-family: var(--font-display);
}
.form-label .req { color: var(--yellow-dark); }
.form-input,
.form-select {
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border: 1.5px solid var(--border-strong);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-family: var(--font-body);
  color: var(--near-black);
  background: var(--white);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  appearance: none;
  -webkit-appearance: none;
}
.form-select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
  cursor: pointer;
}
.form-input:focus,
.form-select:focus {
  border-color: var(--yellow-dark);
  box-shadow: 0 0 0 3px rgba(245,194,0,0.15);
}
.form-input.error,
.form-select.error { border-color: var(--error); }
.form-error {
  font-size: 12px;
  color: var(--error);
  margin-top: 4px;
  display: none;
}
.form-error.visible { display: block; }

.form-consent {
  background: var(--surface);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  font-size: 12px;
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 16px;
}
.form-consent a { color: var(--yellow-dark); text-decoration: underline; font-weight: 500; }

.form-policy-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 12px;
}
.form-policy-links a {
  font-size: 12px;
  color: var(--muted);
  text-decoration: underline;
}
.form-policy-links a:hover { color: var(--yellow-dark); }

.btn-submit {
  position: relative;
  overflow: hidden;
}
.btn-submit .btn-loading {
  display: none;
  position: absolute;
  inset: 0;
  background: var(--yellow-dark);
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
.btn-submit.loading .btn-loading { display: flex; }
.btn-submit.loading .btn-text { opacity: 0; }

/* ===================== PAIN SECTION ===================== */
.pain-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 48px;
}
.pain-card {
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  position: relative;
}
.pain-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 3px;
  background: var(--yellow);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}
.pain-icon {
  width: 44px; height: 44px;
  background: var(--yellow-light);
  border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
  margin-bottom: 16px;
}
.pain-card h3 { font-size: 16px; margin-bottom: 8px; color: var(--near-black); }
.pain-card p { font-size: 14px; color: var(--mid); line-height: 1.6; }

/* ===================== SECTION HEADER ===================== */
.section-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 48px;
}
.section-eyebrow {
  display: inline-block;
  background: var(--yellow-light);
  border: 1.5px solid var(--yellow);
  color: var(--near-black);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 40px;
  margin-bottom: 14px;
  font-family: var(--font-display);
}
.section-header h2 { margin-bottom: 14px; }
.section-header p { font-size: 17px; color: var(--mid); }

/* ===================== OUTCOMES ===================== */
.outcomes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}
.outcome-card {
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.outcome-number {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 800;
  color: var(--yellow-dark);
  line-height: 1;
}
.outcome-card h3 { font-size: 16px; margin: 0; }
.outcome-card p { font-size: 14px; color: var(--mid); line-height: 1.6; margin: 0; }

/* ===================== WHO SHOULD JOIN ===================== */
.fit-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.fit-card {
  border-radius: var(--radius-lg);
  padding: 32px 28px;
}
.fit-card.yes { background: #F0FAF5; border: 2px solid #C3E8D3; }
.fit-card.no { background: var(--surface); border: 1.5px solid var(--border); }
.fit-card h3 { font-size: 18px; margin-bottom: 20px; }
.fit-card.yes h3 { color: var(--success); }
.fit-card.no h3 { color: var(--muted); }
.fit-list { display: flex; flex-direction: column; gap: 12px; }
.fit-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: var(--dark);
  line-height: 1.5;
}
.fit-badge {
  width: 22px; height: 22px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px;
  font-weight: 800;
  flex-shrink: 0;
  margin-top: 1px;
}
.fit-badge.yes-badge { background: #C3E8D3; color: var(--success); }
.fit-badge.no-badge { background: #E8E8E8; color: var(--muted); }

/* ===================== CURRICULUM ===================== */
.curriculum-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
}
.module-card {
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.module-header {
  padding: 20px 24px;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  user-select: none;
  transition: background 0.2s;
}
.module-header:hover { background: var(--yellow-pale); }
.module-badge {
  background: var(--yellow);
  color: var(--near-black);
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 40px;
  font-family: var(--font-display);
  white-space: nowrap;
  flex-shrink: 0;
}
.module-title-group { flex: 1; }
.module-title { font-size: 16px; font-weight: 700; color: var(--near-black); font-family: var(--font-display); margin-bottom: 4px; }
.module-sub { font-size: 13px; color: var(--muted); line-height: 1.4; }
.module-chevron {
  flex-shrink: 0;
  width: 24px; height: 24px;
  background: var(--surface);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.25s;
  font-size: 12px;
  color: var(--mid);
  margin-top: 2px;
}
.module-card.open .module-chevron { transform: rotate(180deg); }
.module-body {
  display: none;
  padding: 0 24px 20px;
  border-top: 1px solid var(--border);
}
.module-card.open .module-body { display: block; }
.module-topics {
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.module-topic {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--dark);
}
.topic-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--yellow-dark);
  flex-shrink: 0;
}
.module-why {
  background: var(--yellow-pale);
  border-left: 3px solid var(--yellow);
  padding: 12px 14px;
  margin-top: 14px;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: 13px;
  color: var(--dark);
  line-height: 1.6;
}
.module-why strong { color: var(--near-black); font-weight: 600; }
.curriculum-cta {
  text-align: center;
  margin-top: 36px;
}

/* ===================== PROCESS SECTION ===================== */
.process-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0;
  position: relative;
}
.process-step {
  text-align: center;
  padding: 32px 20px;
  position: relative;
}
.process-step:not(:last-child)::after {
  content: '→';
  position: absolute;
  right: -8px;
  top: 40px;
  font-size: 20px;
  color: var(--yellow-dark);
  font-weight: 700;
}
.step-num {
  width: 52px; height: 52px;
  border-radius: 50%;
  background: var(--yellow);
  color: var(--near-black);
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
}
.process-step h3 { font-size: 15px; margin-bottom: 8px; }
.process-step p { font-size: 13px; color: var(--mid); }

/* ===================== TRAINER SECTION ===================== */
.trainer-card {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 48px;
  align-items: start;
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 48px;
}
.trainer-avatar {
  width: 160px;
  height: 160px;
  border-radius: var(--radius-xl);
  background: var(--yellow-light);
  border: 3px solid var(--yellow);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 52px;
  font-weight: 800;
  color: var(--yellow-dark);
  flex-shrink: 0;
}
.trainer-name { font-size: 28px; margin-bottom: 4px; }
.trainer-role { font-size: 15px; color: var(--muted); margin-bottom: 24px; font-weight: 500; }
.trainer-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}
.trainer-stat {
  text-align: center;
  background: var(--surface);
  border-radius: var(--radius-md);
  padding: 14px 20px;
}
.trainer-stat-num {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 800;
  color: var(--yellow-dark);
  line-height: 1;
  margin-bottom: 4px;
}
.trainer-stat-label { font-size: 12px; color: var(--muted); font-weight: 500; }

/* ===================== PRICING CARD ===================== */
.pricing-card {
  background: var(--near-black);
  border-radius: var(--radius-xl);
  padding: 52px;
  color: var(--white);
  max-width: 800px;
  margin: 0 auto;
}
.pricing-card h2 { color: var(--white); margin-bottom: 8px; }
.pricing-card .section-eyebrow { background: rgba(245,194,0,0.15); border-color: rgba(245,194,0,0.4); color: var(--yellow); }
.pricing-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin: 32px 0;
  padding: 28px;
  background: rgba(255,255,255,0.05);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255,255,255,0.1);
}
.pricing-detail-item {
  text-align: center;
}
.pricing-detail-value {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 800;
  color: var(--yellow);
  line-height: 1;
  margin-bottom: 6px;
}
.pricing-detail-label { font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 500; }
.pricing-ctas {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.pricing-ctas-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.pricing-tbc {
  font-size: 13px;
  color: rgba(255,255,255,0.4);
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.1);
  line-height: 1.6;
}
.pricing-tbc a { color: var(--yellow); text-decoration: underline; }
.btn-ghost-yellow {
  background: transparent;
  border: 2px solid rgba(245,194,0,0.5);
  color: var(--yellow);
  font-family: var(--font-display);
  font-weight: 600;
}
.btn-ghost-yellow:hover { border-color: var(--yellow); background: rgba(245,194,0,0.1); }

/* ===================== CAREER SUPPORT ===================== */
.career-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
.career-card {
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px 20px;
  text-align: center;
}
.career-icon {
  width: 52px; height: 52px;
  background: var(--yellow-light);
  border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
  font-size: 24px;
  margin: 0 auto 14px;
}
.career-card h3 { font-size: 15px; margin-bottom: 6px; }
.career-card p { font-size: 13px; color: var(--mid); line-height: 1.5; }

/* ===================== TESTIMONIALS ===================== */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.testimonial-card {
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
}
.testimonial-stars {
  color: var(--yellow-dark);
  font-size: 16px;
  margin-bottom: 14px;
  letter-spacing: 2px;
}
.testimonial-text {
  font-size: 14px;
  color: var(--dark);
  line-height: 1.7;
  margin-bottom: 20px;
  font-style: italic;
}
.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.author-avatar {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--yellow-light);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  color: var(--yellow-dark);
  flex-shrink: 0;
}
.author-name { font-size: 14px; font-weight: 600; color: var(--near-black); font-family: var(--font-display); }
.author-role { font-size: 12px; color: var(--muted); }
.testimonial-disclaimer {
  text-align: center;
  font-size: 12px;
  color: var(--muted);
  margin-top: 32px;
  padding: 16px;
  background: var(--surface);
  border-radius: var(--radius-md);
}

/* ===================== FAQ ===================== */
.faq-list { display: flex; flex-direction: column; gap: 12px; max-width: 720px; margin: 0 auto; }
.faq-item {
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.faq-question {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 600;
  color: var(--near-black);
  transition: background 0.2s;
}
.faq-question:hover { background: var(--yellow-pale); }
.faq-chevron {
  width: 24px; height: 24px;
  background: var(--surface);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.25s;
  font-size: 12px;
  color: var(--mid);
  flex-shrink: 0;
}
.faq-item.open .faq-chevron { transform: rotate(180deg); background: var(--yellow-light); color: var(--yellow-dark); }
.faq-answer {
  display: none;
  padding: 0 24px 20px;
  font-size: 14px;
  color: var(--mid);
  line-height: 1.7;
  border-top: 1px solid var(--border);
  padding-top: 16px;
}
.faq-item.open .faq-answer { display: block; }
.faq-answer a { color: var(--yellow-dark); text-decoration: underline; }

/* ===================== FINAL CTA ===================== */
.final-cta {
  background: var(--yellow);
  padding: 80px 0;
}
.final-cta h2 { color: var(--near-black); text-align: center; margin-bottom: 14px; }
.final-cta p { text-align: center; color: var(--dark); margin-bottom: 36px; font-size: 17px; }
.final-cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.final-cta-pay {
  text-align: center;
  margin-top: 12px;
}
.final-cta-pay a {
  font-size: 14px;
  color: var(--dark);
  text-decoration: underline;
  font-weight: 600;
}
.final-cta-pay a:hover { color: var(--near-black); }
.final-disclaimer {
  text-align: center;
  font-size: 12px;
  color: rgba(0,0,0,0.5);
  margin-top: 24px;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

/* ===================== FOOTER ===================== */
footer {
  background: var(--near-black);
  color: var(--white);
  padding: 56px 0 28px;
}
.footer-inner {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}
.footer-brand { grid-column: span 1; }
.footer-logo {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 12px;
}
.footer-logo strong { color: var(--yellow); }
.footer-tagline { font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.6; margin-bottom: 20px; }
.footer-contact { display: flex; flex-direction: column; gap: 8px; }
.footer-contact a {
  font-size: 14px;
  color: rgba(255,255,255,0.7);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;
}
.footer-contact a:hover { color: var(--yellow); }
.footer-col h4 {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 16px;
}
.footer-links { display: flex; flex-direction: column; gap: 10px; }
.footer-links a {
  font-size: 14px;
  color: rgba(255,255,255,0.6);
  transition: color 0.2s;
}
.footer-links a:hover { color: var(--yellow); }
.footer-divider { border-color: rgba(255,255,255,0.1); margin-bottom: 20px; }
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.footer-bottom-left { font-size: 13px; color: rgba(255,255,255,0.4); }
.footer-bottom-right { display: flex; gap: 16px; flex-wrap: wrap; }
.footer-bottom-right a {
  font-size: 13px;
  color: rgba(255,255,255,0.4);
  transition: color 0.2s;
}
.footer-bottom-right a:hover { color: var(--yellow); }

/* ===================== MOBILE STICKY CTA ===================== */
.mobile-sticky {
  display: none;
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: var(--white);
  border-top: 2px solid var(--border);
  padding: 12px 16px;
  z-index: 200;
  gap: 10px;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.12);
}
.mobile-sticky a, .mobile-sticky button {
  flex: 1;
  min-height: 48px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  font-family: var(--font-display);
  font-weight: 700;
  text-decoration: none;
}
.mobile-sticky-wa {
  background: var(--surface);
  color: var(--near-black);
  border: 1.5px solid var(--border-strong);
}
.mobile-sticky-demo {
  background: var(--yellow);
  color: var(--near-black);
  border: none;
  cursor: pointer;
}

/* ===================== MODAL / BROCHURE ===================== */
.modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 300;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.modal-overlay.open { display: flex; }
.modal-box {
  background: var(--white);
  border-radius: var(--radius-xl);
  padding: 40px 36px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}
.modal-close {
  position: absolute;
  top: 16px; right: 16px;
  background: var(--surface);
  border: none;
  width: 36px; height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  color: var(--mid);
  transition: background 0.2s;
}
.modal-close:hover { background: var(--border); }
.modal-close:focus-visible { outline: 3px solid var(--yellow); outline-offset: 2px; }
.modal-eyebrow {
  display: inline-block;
  background: var(--yellow-light);
  color: var(--near-black);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 40px;
  margin-bottom: 12px;
  font-family: var(--font-display);
}
.modal-box h3 { font-size: 22px; margin-bottom: 8px; }
.modal-success {
  display: none;
  text-align: center;
  padding: 20px 0;
}
.modal-success.visible { display: block; }
.success-icon {
  width: 64px; height: 64px;
  background: #D4EDDA;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 28px;
  margin: 0 auto 20px;
  color: var(--success);
}
.modal-success h3 { font-size: 22px; margin-bottom: 8px; }
.modal-success p { font-size: 14px; color: var(--mid); margin-bottom: 24px; }
.modal-success-btns { display: flex; flex-direction: column; gap: 10px; }

/* ===================== TRUST STRIP ===================== */
.trust-strip {
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 20px 0;
}
.trust-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--dark);
  font-family: var(--font-display);
  white-space: nowrap;
}
.trust-item-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--yellow);
  flex-shrink: 0;
}
.trust-divider {
  width: 1px; height: 20px;
  background: var(--border-strong);
}

/* ===================== UTILITIES ===================== */
.text-center { text-align: center; }
.mt-8 { margin-top: 8px; }
.mt-12 { margin-top: 12px; }
.mt-16 { margin-top: 16px; }
.mt-24 { margin-top: 24px; }
.mt-32 { margin-top: 32px; }
.mb-24 { margin-bottom: 24px; }
.hidden { display: none; }

/* ===================== RESPONSIVE ===================== */
@media (max-width: 900px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .hero-form-card { position: static; }
  .trainer-card {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 32px 24px;
  }
  .trainer-avatar { width: 100px; height: 100px; font-size: 36px; }
  .footer-inner { grid-template-columns: 1fr 1fr; }
  .fit-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .nav-cta { padding: 6px 12px !important; font-size: 13px; }
  .hero-form-card { padding: 20px 12px; }
  .section { padding: 52px 0; }
  .nav-links a { display: none; }
  .hero { padding: 40px 0 52px; }
  .pricing-card { padding: 32px 20px; }
  .pricing-ctas-row { flex-direction: column; }
  .footer-inner { grid-template-columns: 1fr; gap: 32px; }
  .footer-bottom { flex-direction: column; }
  .mobile-sticky { display: none; }
  body { padding-bottom: 0; }
  .process-step:not(:last-child)::after { display: none; }
  .process-steps { gap: 16px; }
  .modal-box { padding: 28px 20px; }
  .final-cta { padding: 56px 0; }
  .announce-bar { font-size: 12px; }
}
`,
            }}
          />
        </head>
        <body>
          {/*  ===================== ANNOUNCE BAR =====================  */}
          <div className="announce-bar" role="banner">
            <strong>Live Online</strong>
            <span>·</span>
            Full Stack Node.js Program
            <span>·</span>
            Max 20 Members per Batch
            <span>·</span>
            <strong>Live Online</strong>
          </div>

          {/*  ===================== NAV =====================  */}
          <nav className="nav" aria-label="Main navigation">
            <div className="nav-inner">
              <div className="nav-logo" style={{ background: '#0D0D0D', padding: '6px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="Glitch Skill Hub" style={{ height: '32px', width: 'auto' }} />
              </div>
              <div className="nav-links">
                <a href="#curriculum">Curriculum</a>
                <a href="#program">Program Details</a>
                <a href="#trainer">Trainer</a>
                <a href="#faq">FAQ</a>
                <button
                  className="nav-cta"
                  id="nav-demo-cta"
                  onClick={() => { setShowPopup(true); sessionStorage.removeItem('zohoPopupDismissed'); }}
                  style={{ cursor: 'pointer', border: 'none' }}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </nav>

          {/*  ===================== HERO =====================  */}
          <section className="hero" id="hero">
            <div className="container">
              <div className="hero-inner">
                {/*  Left: Copy  */}
                <div>
                  <div className="hero-eyebrow" style={{ marginBottom: '1rem' }}>
                    Full Stack Node.js Program
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff1f2', border: '1px solid #fecdd3', padding: '8px 16px', borderRadius: '12px', marginBottom: '1.5rem', boxShadow: '0 4px 12px rgba(225, 29, 72, 0.1)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#e11d48', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Offer Ends In:</span>
                    {formatTime(timeLeft)}
                  </div>
                  <h1>
                    Full Stack Node.js Course for{" "}
                    <em>Working Professionals</em>
                  </h1>
                  <p className="hero-sub">
                    Build production-ready backend skills in 45 days through
                    live online training, real-time projects, and practical
                    implementation.
                  </p>
                  <div className="hero-qualify">
                    <div className="hero-qualify-good">
                      <div className="qualify-icon yes" aria-hidden="true">
                        ✓
                      </div>
                      Best suited for working IT professionals with 2+ years of
                      experience.
                    </div>
                    <div className="hero-qualify-bad">
                      <div className="qualify-icon no" aria-hidden="true">
                        ✕
                      </div>
                      Not designed for freshers or college students.
                    </div>
                  </div>
                  <div
                    className="hero-details"
                    role="list"
                    aria-label="Program details"
                  >
                    <div className="detail-chip" role="listitem">
                      <div className="detail-chip-dot"></div>45 Days
                    </div>
                    <div className="detail-chip" role="listitem">
                      <div className="detail-chip-dot"></div>Live Online
                    </div>
                    <div className="detail-chip" role="listitem">
                      <div className="detail-chip-dot"></div>Max 20 Members
                    </div>
                    <div className="detail-chip" role="listitem">
                      <div className="detail-chip-dot"></div>₹9,999 Fee
                    </div>
                  </div>
                  <div className="hero-ctas">
                    <a
                      href="#" onClick={(e) => { e.preventDefault(); setShowPopup(true); sessionStorage.removeItem('zohoPopupDismissed'); }}
                      className="btn btn-primary btn-lg"
                      id="hero-demo-cta"
                      data-event="demo_cta_click"
                      data-location="hero"
                      data-cta="enroll-now"
                    >
                      Enroll Now
                    </a>
                    <a
                      href="https://wa.me/916300127932?text=Hi%2C+I%27m+interested+in+the+Node.js+course"
                      className="btn btn-secondary btn-lg"
                      id="hero-whatsapp-cta"
                      data-event="whatsapp_click"
                      data-location="hero"
                      data-cta="whatsapp"
                      target="_blank"
                      rel="noopener"
                      aria-label="Chat with us on WhatsApp"
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
  Chat on WhatsApp
</span>
                    </a>
                  </div>
                  <div className="hero-pay-row">
                    <a
                      href="https://www.glitchedu.online/register"
                      className="btn btn-pay"
                      id="hero-payment-cta"
                      data-event="payment_cta_click"
                      data-location="hero"
                      data-cta="enroll-pay-9999"
                    >
                      Enroll &amp; Pay ₹9,999
                    </a>
                    <span className="hero-pay-micro">
                      Already decided? Complete your registration online.
                    </span>
                  </div>
                  <div className="hero-trust">
                    <span className="hero-trust-dot">●</span>
                    Mentor support from experienced MNC software engineers
                    <span
                      className="hero-trust-dot"
                      style={{ marginLeft: "8px" }}
                    >
                      ●
                    </span>
                    
                  </div>
                </div>
                {/*  Right: Demo Form  */}
                <div>
                  <div className="hero-form-card" id="demo-form">
                    <iframe
                      title="Zoho Lead Form"
                      src="https://forms.zohopublic.in/glitchskillhubgm1/form/EmailSubscription/formperma/GueiYUHkjBHy5sVG8XovZiRspHcveDO2Os-mSlh1Ly0"
                      style={{ width: '100%', height: '750px', border: 'none' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/*  ===================== TRUST STRIP =====================  */}
          <div
            className="trust-strip"
            role="complementary"
            aria-label="Program highlights"
          >
            <div className="container">
              <div className="trust-inner">
                <div className="trust-item">
                  <div className="trust-item-dot"></div>1000+ Engineers Trained
                </div>
                <div className="trust-divider" aria-hidden="true"></div>
                <div className="trust-item">
                  <div className="trust-item-dot"></div>50+ Production Cohorts
                </div>
                <div className="trust-divider" aria-hidden="true"></div>
                <div className="trust-item">
                  <div className="trust-item-dot"></div>100+ Scalable Systems
                  Built
                </div>
                <div className="trust-divider" aria-hidden="true"></div>
                <div className="trust-item">
                  <div className="trust-item-dot"></div>95% Professional
                  Satisfaction
                </div>
                <div className="trust-divider" aria-hidden="true"></div>
                <div className="trust-item">
                  <div className="trust-item-dot"></div>MNC Mentor-Led Training
                </div>
              </div>
            </div>
          </div>

          {/*  ===================== PAIN POINTS =====================  */}
          <section
            className="section section-alt"
            id="pain-points"
            aria-labelledby="pain-heading"
          >
            <div className="container">
              <div className="section-header">
                <div className="section-eyebrow">The Real Problem</div>
                <h2 id="pain-heading">
                  You know the theory. But building production-ready systems is
                  a different challenge.
                </h2>
                <p>
                  Most working professionals hit a wall. The gap between knowing
                  Node.js syntax and confidently shipping backend systems to
                  production is wider than it should be.
                </p>
              </div>
              <div className="pain-grid">
                <div className="pain-card">
                  <div className="pain-icon" aria-hidden="true">
                    📚
                  </div>
                  <h3>Theory without implementation confidence</h3>
                  <p>
                    You've read the docs, watched tutorials, but struggle to
                    build or extend real backend systems under pressure.
                  </p>
                </div>
                <div className="pain-card">
                  <div className="pain-icon" aria-hidden="true">
                    🔄
                  </div>
                  <h3>Getting stuck on backend interviews</h3>
                  <p>
                    Node.js, REST APIs, authentication, and PostgreSQL questions
                    come up repeatedly — and the gap in practical exposure
                    shows.
                  </p>
                </div>
                <div className="pain-card">
                  <div className="pain-icon" aria-hidden="true">
                    🚫
                  </div>
                  <h3>No real project portfolio</h3>
                  <p>
                    Theoretical knowledge looks weak on your GitHub.
                    Interviewers expect production-grade project work, not
                    tutorial code.
                  </p>
                </div>
                <div className="pain-card">
                  <div className="pain-icon" aria-hidden="true">
                    ⏳
                  </div>
                  <h3>Self-study isn't working fast enough</h3>
                  <p>
                    You don't have two years to piece this together on your own.
                    You need a structured, time-bound program with real
                    guidance.
                  </p>
                </div>
                <div className="pain-card">
                  <div className="pain-icon" aria-hidden="true">
                    🏢
                  </div>
                  <h3>Courses built for students, not professionals</h3>
                  <p>
                    Most Node.js courses assume you're a fresher starting from
                    zero. You need a program that meets you where you are.
                  </p>
                </div>
                <div className="pain-card">
                  <div className="pain-icon" aria-hidden="true">
                    🔧
                  </div>
                  <h3>Weak command of scalable architecture</h3>
                  <p>
                    TypeScript, Docker, JWT auth, PostgreSQL optimization —
                    you've heard these terms but haven't built with them
                    confidently.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/*  ===================== OUTCOMES =====================  */}
          <section
            className="section"
            id="outcomes"
            aria-labelledby="outcomes-heading"
          >
            <div className="container">
              <div className="section-header">
                <div className="section-eyebrow">What You Build Toward</div>
                <h2 id="outcomes-heading">
                  45 days of practical implementation, not passive content
                  consumption.
                </h2>
                <p>
                  This program is structured around doing, not watching. You
                  build, debug, deploy, and iterate on real systems.
                </p>
              </div>
              <div className="outcomes-grid">
                <div className="outcome-card">
                  <div className="outcome-number">01</div>
                  <h3>Production-grade Node.js APIs</h3>
                  <p>
                    Build REST APIs that handle authentication, role-based
                    access, and real-world data flows using Node.js,
                    Express-style architecture, and PostgreSQL.
                  </p>
                </div>
                <div className="outcome-card">
                  <div className="outcome-number">02</div>
                  <h3>Backend interview readiness</h3>
                  <p>
                    Practise the questions that come up in senior backend and
                    full stack interviews. Mock sessions focused on Node.js,
                    databases, auth, and system design.
                  </p>
                </div>
                <div className="outcome-card">
                  <div className="outcome-number">03</div>
                  <h3>A stronger GitHub portfolio</h3>
                  <p>
                    Finish with real project work on your profile — not
                    tutorials or forks. Structured portfolio guidance included.
                  </p>
                </div>
                <div className="outcome-card">
                  <div className="outcome-number">04</div>
                  <h3>Scalable TypeScript and Docker workflows</h3>
                  <p>
                    Learn the tooling that production engineering teams use.
                    TypeScript for clean code, Docker for deployment, GitHub for
                    team workflows.
                  </p>
                </div>
                <div className="outcome-card">
                  <div className="outcome-number">05</div>
                  <h3>Practical PostgreSQL implementation</h3>
                  <p>
                    Go beyond simple SELECT queries. Joins, optimisation, and
                    real schema design as part of live project work.
                  </p>
                </div>
                <div className="outcome-card">
                  <div className="outcome-number">06</div>
                  <h3>Mentor access from MNC engineers</h3>
                  <p>
                    Learn directly from engineers who have built and shipped
                    production systems in enterprise environments.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/*  ===================== WHO SHOULD JOIN =====================  */}
          <section
            className="section section-alt"
            id="who-should-join"
            aria-labelledby="fit-heading"
          >
            <div className="container">
              <div className="section-header">
                <div className="section-eyebrow">
                  Is This Program Right For You?
                </div>
                <h2 id="fit-heading">
                  This program is built for working IT professionals — not for
                  students or freshers.
                </h2>
                <p>
                  Before you enroll, take a moment to confirm this program
                  is a fit for where you are now.
                </p>
              </div>
              <div className="fit-grid">
                <div className="fit-card yes" aria-label="Who this is for">
                  <h3>✓ This program is for you if…</h3>
                  <ul className="fit-list">
                    <li className="fit-item">
                      <div className="fit-badge yes-badge" aria-hidden="true">
                        ✓
                      </div>
                      You're a frontend developer moving toward backend or full
                      stack work
                    </li>
                    <li className="fit-item">
                      <div className="fit-badge yes-badge" aria-hidden="true">
                        ✓
                      </div>
                      You're a backend developer wanting stronger practical
                      implementation
                    </li>
                    <li className="fit-item">
                      <div className="fit-badge yes-badge" aria-hidden="true">
                        ✓
                      </div>
                      You're a full stack developer wanting more backend
                      confidence
                    </li>
                    <li className="fit-item">
                      <div className="fit-badge yes-badge" aria-hidden="true">
                        ✓
                      </div>
                      You're a QA or automation engineer moving into development
                    </li>
                    <li className="fit-item">
                      <div className="fit-badge yes-badge" aria-hidden="true">
                        ✓
                      </div>
                      You're in DevOps, cloud, or support and transitioning to
                      product engineering
                    </li>
                    <li className="fit-item">
                      <div className="fit-badge yes-badge" aria-hidden="true">
                        ✓
                      </div>
                      You're preparing for backend interviews and want
                      mock-session practice
                    </li>
                    <li className="fit-item">
                      <div className="fit-badge yes-badge" aria-hidden="true">
                        ✓
                      </div>
                      You have theory knowledge but lack real implementation
                      confidence
                    </li>
                    <li className="fit-item">
                      <div className="fit-badge yes-badge" aria-hidden="true">
                        ✓
                      </div>
                      You have at least 2 years of professional IT experience
                    </li>
                  </ul>
                </div>
                <div className="fit-card no" aria-label="Who this is not for">
                  <h3>✕ This program is not for…</h3>
                  <ul className="fit-list">
                    <li className="fit-item">
                      <div className="fit-badge no-badge" aria-hidden="true">
                        ✕
                      </div>
                      Freshers or final-year students
                    </li>
                    <li className="fit-item">
                      <div className="fit-badge no-badge" aria-hidden="true">
                        ✕
                      </div>
                      Recent graduates looking for campus-style placements
                    </li>
                    <li className="fit-item">
                      <div className="fit-badge no-badge" aria-hidden="true">
                        ✕
                      </div>
                      Internship seekers
                    </li>
                    <li className="fit-item">
                      <div className="fit-badge no-badge" aria-hidden="true">
                        ✕
                      </div>
                      People looking only for free tutorials or YouTube
                      alternatives
                    </li>
                    <li className="fit-item">
                      <div className="fit-badge no-badge" aria-hidden="true">
                        ✕
                      </div>
                      People looking only for a certificate without hands-on
                      practice
                    </li>
                    <li className="fit-item">
                      <div className="fit-badge no-badge" aria-hidden="true">
                        ✕
                      </div>
                      Anyone expecting guaranteed job placement or salary
                      outcomes
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-center mt-32">
                <a
                  href="#" onClick={(e) => { e.preventDefault(); setShowPopup(true); sessionStorage.removeItem('zohoPopupDismissed'); }}
                  className="btn btn-primary btn-lg"
                  id="fit-demo-cta"
                  data-event="demo_cta_click"
                  data-location="fit-section"
                  data-cta="enroll-now"
                >
                  Enroll Now
                </a>
              </div>
            </div>
          </section>

          {/*  ===================== CURRICULUM =====================  */}
          <section
            className="section"
            id="curriculum"
            aria-labelledby="curriculum-heading"
          >
            <div className="container">
              <div className="section-header">
                <div className="section-eyebrow">Full Syllabus</div>
                <h2 id="curriculum-heading">
                  What you'll build across 45 days.
                </h2>
                <p>
                  A hands-on curriculum built around practical implementation,
                  not passive content delivery.
                </p>
              </div>
              <div className="curriculum-grid" id="curriculum-accordion">
                <div className="module-card" id="mod-1">
                  <div
                    className="module-header"
                    role="button"
                    tabIndex="0"
                    aria-expanded="false"
                    aria-controls="mod-1-body"
                    onClick={(e) => { const card = e.currentTarget.closest(".module-card"); const isOpen = card.classList.contains("open"); card.classList.toggle("open", !isOpen); e.currentTarget.setAttribute("aria-expanded", String(!isOpen)); }}
                    onkeydown="handleModKey(event,this)"
                  >
                    <div className="module-title-group">
                      <div className="module-title">
                        Module 1 — Web Foundations
                      </div>
                      <div className="module-sub">
                        HTML · CSS · Responsive Design
                      </div>
                    </div>
                    <div className="module-badge">Week 1</div>
                    <div className="module-chevron" aria-hidden="true">
                      ▾
                    </div>
                  </div>
                  <div className="module-body" id="mod-1-body">
                    <div className="module-topics">
                      <div className="module-topic">
                        <div className="topic-dot"></div>HTML5 semantic
                        structure and document hierarchy
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>CSS layout systems —
                        Flexbox and Grid
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Responsive Design and
                        mobile-first patterns
                      </div>
                    </div>
                    <div className="module-why">
                      <strong>Why this matters:</strong> Even backend engineers
                      interact with frontend projects in team workflows.
                      Building a solid foundation prevents integration delays
                      and improves code review participation.
                    </div>
                  </div>
                </div>

                <div className="module-card" id="mod-2">
                  <div
                    className="module-header"
                    role="button"
                    tabIndex="0"
                    aria-expanded="false"
                    aria-controls="mod-2-body"
                    onClick={(e) => { const card = e.currentTarget.closest(".module-card"); const isOpen = card.classList.contains("open"); card.classList.toggle("open", !isOpen); e.currentTarget.setAttribute("aria-expanded", String(!isOpen)); }}
                    onkeydown="handleModKey(event,this)"
                  >
                    <div className="module-title-group">
                      <div className="module-title">
                        Module 2 — JavaScript and ES6+
                      </div>
                      <div className="module-sub">
                        Core JS · Modern Syntax · Async Patterns
                      </div>
                    </div>
                    <div className="module-badge">Week 1–2</div>
                    <div className="module-chevron" aria-hidden="true">
                      ▾
                    </div>
                  </div>
                  <div className="module-body" id="mod-2-body">
                    <div className="module-topics">
                      <div className="module-topic">
                        <div className="topic-dot"></div>JavaScript fundamentals
                        and execution model
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>ES6+ syntax —
                        destructuring, arrow functions, modules, spread
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Promises, async/await,
                        error handling patterns
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Closures, scope, and
                        practical function design
                      </div>
                    </div>
                    <div className="module-why">
                      <strong>Why this matters:</strong> JavaScript is the
                      language of Node.js. A strong command of modern JS
                      patterns directly affects API code quality,
                      maintainability, and interview performance.
                    </div>
                  </div>
                </div>

                <div className="module-card" id="mod-3">
                  <div
                    className="module-header"
                    role="button"
                    tabIndex="0"
                    aria-expanded="false"
                    aria-controls="mod-3-body"
                    onClick={(e) => { const card = e.currentTarget.closest(".module-card"); const isOpen = card.classList.contains("open"); card.classList.toggle("open", !isOpen); e.currentTarget.setAttribute("aria-expanded", String(!isOpen)); }}
                    onkeydown="handleModKey(event,this)"
                  >
                    <div className="module-title-group">
                      <div className="module-title">
                        Module 3 — Advanced Node.js
                      </div>
                      <div className="module-sub">
                        Event Loop · Streams · Performance
                      </div>
                    </div>
                    <div className="module-badge">Week 2–3</div>
                    <div className="module-chevron" aria-hidden="true">
                      ▾
                    </div>
                  </div>
                  <div className="module-body" id="mod-3-body">
                    <div className="module-topics">
                      <div className="module-topic">
                        <div className="topic-dot"></div>Node.js architecture
                        and the Event Loop in depth
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Streams and Buffer
                        handling
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Node.js performance
                        concepts and non-blocking I/O
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Module system and
                        dependency management
                      </div>
                    </div>
                    <div className="module-why">
                      <strong>Why this matters:</strong> Senior backend
                      engineers are expected to understand what happens under
                      the hood. Event loop questions and performance debugging
                      come up in almost every backend interview at mid to senior
                      level.
                    </div>
                  </div>
                </div>

                <div className="module-card" id="mod-4">
                  <div
                    className="module-header"
                    role="button"
                    tabIndex="0"
                    aria-expanded="false"
                    aria-controls="mod-4-body"
                    onClick={(e) => { const card = e.currentTarget.closest(".module-card"); const isOpen = card.classList.contains("open"); card.classList.toggle("open", !isOpen); e.currentTarget.setAttribute("aria-expanded", String(!isOpen)); }}
                    onkeydown="handleModKey(event,this)"
                  >
                    <div className="module-title-group">
                      <div className="module-title">
                        Module 4 — REST API Development
                      </div>
                      <div className="module-sub">
                        API Design · Authentication · JWT · RBAC
                      </div>
                    </div>
                    <div className="module-badge">Week 3–4</div>
                    <div className="module-chevron" aria-hidden="true">
                      ▾
                    </div>
                  </div>
                  <div className="module-body" id="mod-4-body">
                    <div className="module-topics">
                      <div className="module-topic">
                        <div className="topic-dot"></div>REST API design
                        principles and standards
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Authentication patterns
                        and session management
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>JWT — generation,
                        validation, refresh strategy
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Role-Based Access
                        Control implementation
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Middleware architecture
                        and error handling
                      </div>
                    </div>
                    <div className="module-why">
                      <strong>Why this matters:</strong> REST API development
                      and authentication implementation are core to every
                      backend engineering role. JWT and RBAC are standard
                      requirements in most production systems.
                    </div>
                  </div>
                </div>

                <div className="module-card" id="mod-5">
                  <div
                    className="module-header"
                    role="button"
                    tabIndex="0"
                    aria-expanded="false"
                    aria-controls="mod-5-body"
                    onClick={(e) => { const card = e.currentTarget.closest(".module-card"); const isOpen = card.classList.contains("open"); card.classList.toggle("open", !isOpen); e.currentTarget.setAttribute("aria-expanded", String(!isOpen)); }}
                    onkeydown="handleModKey(event,this)"
                  >
                    <div className="module-title-group">
                      <div className="module-title">Module 5 — PostgreSQL</div>
                      <div className="module-sub">
                        Database Design · Joins · Optimisation
                      </div>
                    </div>
                    <div className="module-badge">Week 4–5</div>
                    <div className="module-chevron" aria-hidden="true">
                      ▾
                    </div>
                  </div>
                  <div className="module-body" id="mod-5-body">
                    <div className="module-topics">
                      <div className="module-topic">
                        <div className="topic-dot"></div>Relational database
                        design and schema planning
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Complex SQL joins and
                        aggregate queries
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Database performance
                        optimisation and indexing
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>PostgreSQL integration
                        with Node.js applications
                      </div>
                    </div>
                    <div className="module-why">
                      <strong>Why this matters:</strong> PostgreSQL is the
                      preferred database in many production environments.
                      Engineers who can write optimised queries and understand
                      schema trade-offs are significantly more valuable to
                      teams.
                    </div>
                  </div>
                </div>

                <div className="module-card" id="mod-6">
                  <div
                    className="module-header"
                    role="button"
                    tabIndex="0"
                    aria-expanded="false"
                    aria-controls="mod-6-body"
                    onClick={(e) => { const card = e.currentTarget.closest(".module-card"); const isOpen = card.classList.contains("open"); card.classList.toggle("open", !isOpen); e.currentTarget.setAttribute("aria-expanded", String(!isOpen)); }}
                    onkeydown="handleModKey(event,this)"
                  >
                    <div className="module-title-group">
                      <div className="module-title">
                        Module 6 — GitHub and Team Workflows
                      </div>
                      <div className="module-sub">
                        Version Control · Collaboration · Code Review
                      </div>
                    </div>
                    <div className="module-badge">Week 5</div>
                    <div className="module-chevron" aria-hidden="true">
                      ▾
                    </div>
                  </div>
                  <div className="module-body" id="mod-6-body">
                    <div className="module-topics">
                      <div className="module-topic">
                        <div className="topic-dot"></div>Git internals —
                        commits, branches, merges, rebases
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>GitHub team workflows
                        and pull request practices
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Code review
                        participation and version control hygiene
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Portfolio project
                        structuring on GitHub
                      </div>
                    </div>
                    <div className="module-why">
                      <strong>Why this matters:</strong> Every engineering team
                      uses Git. A clean, well-documented GitHub profile with
                      real project work is one of the strongest signals you can
                      send to potential employers.
                    </div>
                  </div>
                </div>

                <div className="module-card" id="mod-7">
                  <div
                    className="module-header"
                    role="button"
                    tabIndex="0"
                    aria-expanded="false"
                    aria-controls="mod-7-body"
                    onClick={(e) => { const card = e.currentTarget.closest(".module-card"); const isOpen = card.classList.contains("open"); card.classList.toggle("open", !isOpen); e.currentTarget.setAttribute("aria-expanded", String(!isOpen)); }}
                    onkeydown="handleModKey(event,this)"
                  >
                    <div className="module-title-group">
                      <div className="module-title">Module 7 — TypeScript</div>
                      <div className="module-sub">
                        Type Safety · Scalable Code Patterns
                      </div>
                    </div>
                    <div className="module-badge">Week 6</div>
                    <div className="module-chevron" aria-hidden="true">
                      ▾
                    </div>
                  </div>
                  <div className="module-body" id="mod-7-body">
                    <div className="module-topics">
                      <div className="module-topic">
                        <div className="topic-dot"></div>TypeScript fundamentals
                        and type system
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Interfaces, generics,
                        and utility types
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Clean and scalable
                        coding patterns in TypeScript
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Integrating TypeScript
                        into Node.js projects
                      </div>
                    </div>
                    <div className="module-why">
                      <strong>Why this matters:</strong> TypeScript adoption in
                      production Node.js codebases has grown substantially. Most
                      new backend projects at scale now use TypeScript. It is
                      increasingly a baseline expectation in senior role job
                      descriptions.
                    </div>
                  </div>
                </div>

                <div className="module-card" id="mod-8">
                  <div
                    className="module-header"
                    role="button"
                    tabIndex="0"
                    aria-expanded="false"
                    aria-controls="mod-8-body"
                    onClick={(e) => { const card = e.currentTarget.closest(".module-card"); const isOpen = card.classList.contains("open"); card.classList.toggle("open", !isOpen); e.currentTarget.setAttribute("aria-expanded", String(!isOpen)); }}
                    onkeydown="handleModKey(event,this)"
                  >
                    <div className="module-title-group">
                      <div className="module-title">
                        Module 8 — Docker and Deployment
                      </div>
                      <div className="module-sub">
                        Containerisation · Deployment Basics
                      </div>
                    </div>
                    <div className="module-badge">Week 6</div>
                    <div className="module-chevron" aria-hidden="true">
                      ▾
                    </div>
                  </div>
                  <div className="module-body" id="mod-8-body">
                    <div className="module-topics">
                      <div className="module-topic">
                        <div className="topic-dot"></div>Docker concepts —
                        images, containers, and volumes
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Containerising Node.js
                        applications
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Deployment basics and
                        environment configuration
                      </div>
                    </div>
                    <div className="module-why">
                      <strong>Why this matters:</strong> Containerisation is now
                      standard in professional engineering teams. Understanding
                      Docker gives you the ability to participate meaningfully
                      in deployment discussions and CI/CD workflows.
                    </div>
                  </div>
                </div>

                <div className="module-card" id="mod-9">
                  <div
                    className="module-header"
                    role="button"
                    tabIndex="0"
                    aria-expanded="false"
                    aria-controls="mod-9-body"
                    onClick={(e) => { const card = e.currentTarget.closest(".module-card"); const isOpen = card.classList.contains("open"); card.classList.toggle("open", !isOpen); e.currentTarget.setAttribute("aria-expanded", String(!isOpen)); }}
                    onkeydown="handleModKey(event,this)"
                  >
                    <div className="module-title-group">
                      <div className="module-title">
                        Module 9 — Real-Time Projects and Mock Interviews
                      </div>
                      <div className="module-sub">
                        Capstone Projects · Portfolio · Interview Prep
                      </div>
                    </div>
                    <div className="module-badge">Week 6–7</div>
                    <div className="module-chevron" aria-hidden="true">
                      ▾
                    </div>
                  </div>
                  <div className="module-body" id="mod-9-body">
                    <div className="module-topics">
                      <div className="module-topic">
                        <div className="topic-dot"></div>Full project
                        implementation using the complete stack
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Portfolio project
                        review and GitHub documentation
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>Mock interview sessions
                        — technical and practical
                      </div>
                      <div className="module-topic">
                        <div className="topic-dot"></div>LinkedIn and Naukri
                        profile optimisation guidance
                      </div>
                    </div>
                    <div className="module-why">
                      <strong>Why this matters:</strong> Real implementation
                      that ships is how you demonstrate competence. Mock
                      interviews prepare you for the specific types of questions
                      backend engineers face in real interview settings.
                    </div>
                  </div>
                </div>
              </div>
              <div className="curriculum-cta">
                <p
                  style={{
                    marginBottom: "16px",
                    color: "var(--mid)",
                    fontSize: "14px",
                  }}
                >
                  Want the complete topic breakdown in PDF format?
                </p>
                <button
                  className="btn btn-secondary"
                  id="curriculum-brochure-cta"
                  data-event="brochure_gate_open"
                  data-location="curriculum"
                  data-cta="download-brochure"
                  onClick={() => {}}
                >
                  Download Course Brochure
                </button>
              </div>
            </div>
          </section>

          {/*  ===================== TRAINING PROCESS =====================  */}
          <section
            className="section section-alt"
            id="process"
            aria-labelledby="process-heading"
          >
            <div className="container">
              <div className="section-header">
                <div className="section-eyebrow">How It Works</div>
                <h2 id="process-heading">
                  From your first demo to your final project.
                </h2>
                <p>
                  A clear five-step process designed for working professionals
                  managing full-time jobs alongside training.
                </p>
              </div>
              <div className="process-steps" role="list">
                <div className="process-step" role="listitem">
                  <div className="step-num" aria-label="Step 1">
                    1
                  </div>
                  <h3>Enroll Now</h3>
                  <p>
                    Attend a live session to see the training format, ask
                    questions, and assess fit before committing.
                  </p>
                </div>
                <div className="process-step" role="listitem">
                  <div className="step-num" aria-label="Step 2">
                    2
                  </div>
                  <h3>Enroll and Confirm</h3>
                  <p>
                    Complete registration and payment online. Your batch
                    position is confirmed after enrollment.
                  </p>
                </div>
                <div className="process-step" role="listitem">
                  <div className="step-num" aria-label="Step 3">
                    3
                  </div>
                  <h3>Live Training Begins</h3>
                  <p>
                    Join live online sessions in a cohort of maximum 20
                    professionals. Interact, ask questions, and work through
                    problems together.
                  </p>
                </div>
                <div className="process-step" role="listitem">
                  <div className="step-num" aria-label="Step 4">
                    4
                  </div>
                  <h3>Build Real Projects</h3>
                  <p>
                    Implement real-time projects using the full stack covered in
                    the program. Build and commit production-grade code.
                  </p>
                </div>
                <div className="process-step" role="listitem">
                  <div className="step-num" aria-label="Step 5">
                    5
                  </div>
                  <h3>Mock Interviews and Portfolio</h3>
                  <p>
                    Practice mock interviews, complete your GitHub portfolio,
                    and get LinkedIn and Naukri profile guidance.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/*  ===================== TRAINER =====================  */}
          <section
            className="section"
            id="trainer"
            aria-labelledby="trainer-heading"
          >
            <div className="container">
              <div className="section-header">
                <div className="section-eyebrow">Your Mentor</div>
                <h2 id="trainer-heading">
                  Learn from someone actively building in production
                  environments.
                </h2>
              </div>
              <div className="trainer-card">
                <div
                  className="trainer-avatar"
                  aria-label="Trainer avatar for S. Rajesh"
                >
                  SR
                </div>
                <div>
                  <h2 className="trainer-name">S. Rajesh</h2>
                  <p className="trainer-role">
                    Senior Software Engineer, Accenture · Lead Trainer, Glitch
                    Skill Hub
                  </p>
                  <div className="trainer-stats">
                    <div className="trainer-stat">
                      <div className="trainer-stat-num">1000+</div>
                      <div className="trainer-stat-label">
                        Engineers Trained
                      </div>
                    </div>
                    <div className="trainer-stat">
                      <div className="trainer-stat-num">50+</div>
                      <div className="trainer-stat-label">
                        Production Cohorts
                      </div>
                    </div>
                    <div className="trainer-stat">
                      <div className="trainer-stat-num">100+</div>
                      <div className="trainer-stat-label">
                        Scalable Systems Built
                      </div>
                    </div>
                    <div className="trainer-stat">
                      <div className="trainer-stat-num">95%</div>
                      <div className="trainer-stat-label">
                        Professional Satisfaction
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "var(--mid)",
                      lineHeight: "1.8",
                      marginBottom: "20px",
                    }}
                  >
                    Rajesh brings real production engineering experience to
                    every session. Training at Glitch Skill Hub is mentor-led,
                    not pre-recorded content delivery. You get direct access to
                    someone who is actively working in large-scale enterprise
                    engineering environments — not someone who completed a
                    course and then started teaching it.
                  </p>
                  <a
                    href="#" onClick={(e) => { e.preventDefault(); setShowPopup(true); sessionStorage.removeItem('zohoPopupDismissed'); }}
                    className="btn btn-primary"
                    id="trainer-demo-cta"
                    data-event="demo_cta_click"
                    data-location="trainer"
                    data-cta="enroll-now"
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/*  ===================== PROGRAM DETAILS + PRICING =====================  */}
          <section
            className="section section-alt"
            id="program"
            aria-labelledby="program-heading"
          >
            <div className="container">
              <div className="section-header">
                <div className="section-eyebrow">Program Details</div>
                <h2 id="program-heading">
                  Everything you need to know before you enroll.
                </h2>
              </div>
              <div className="pricing-card">
                <div className="section-eyebrow">
                  Full Stack Node.js Upskilling Program
                </div>
                <h2 style={{ color: "var(--white)", marginTop: "8px" }}>
                  One program. 45 focused days. Production-ready skills.
                </h2>
                <div className="pricing-details">
                  <div className="pricing-detail-item">
                    <div className="pricing-detail-value">45</div>
                    <div className="pricing-detail-label">Days Duration</div>
                  </div>
                  <div className="pricing-detail-item">
                    <div className="pricing-detail-value">Live</div>
                    <div className="pricing-detail-label">
                      Online Training Mode
                    </div>
                  </div>
                  <div className="pricing-detail-item">
                    <div className="pricing-detail-value">20</div>
                    <div className="pricing-detail-label">
                      Max Batch Members
                    </div>
                  </div>
                  <div className="pricing-detail-item">
                    <div className="pricing-detail-value">₹9,999</div>
                    <div className="pricing-detail-label">
                      Total Program Fee
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fef2f2', color: '#ef4444', padding: '6px 12px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 800 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Offer ends in {formatTime(timeLeft)}
                  </div>
                </div>
                <div className="pricing-ctas">
                  <div className="pricing-ctas-row">
                    <a
                      href="#" onClick={(e) => { e.preventDefault(); setShowPopup(true); sessionStorage.removeItem('zohoPopupDismissed'); }}
                      className="btn btn-primary btn-lg"
                      id="program-demo-cta"
                      data-event="demo_cta_click"
                      data-location="program-details"
                      data-cta="enroll-now"
                    >
                      Enroll Now
                    </a>
                    <a
                      href="https://wa.me/916300127932?text=Hi%2C+I%27m+interested+in+the+Node.js+course"
                      className="btn btn-outline-dark btn-lg"
                      id="program-whatsapp-cta"
                      data-event="whatsapp_click"
                      data-location="program-details"
                      data-cta="whatsapp"
                      target="_blank"
                      rel="noopener"
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
  Chat on WhatsApp
</span>
                    </a>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      flexWrap: "wrap",
                      marginTop: "4px",
                    }}
                  >
                    <a
                      href="https://www.glitchedu.online/register"
                      className="btn btn-pay"
                      id="program-details-payment-cta"
                      data-event="payment_cta_click"
                      data-location="program-details"
                      data-cta="enroll-pay-9999"
                    >
                      Enroll &amp; Pay ₹9,999
                    </a>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      Already reviewed the program? Complete your registration
                      online.
                    </span>
                  </div>
                  <div style={{ marginTop: "8px" }}>
                    <button
                      className="btn btn-ghost-yellow btn-sm"
                      id="program-details-brochure-cta"
                      data-event="brochure_gate_open"
                      data-location="program-details"
                      data-cta="download-brochure"
                      onClick={() => {}}
                    >
                      Download Course Brochure
                    </button>
                  </div>
                </div>
                <div className="pricing-tbc">
                  <strong style={{ color: "rgba(255,255,255,0.7)" }}>
                    Items to be confirmed by Glitch Skill Hub before go-live:
                  </strong>
                  <br />
                  Daily session hours · Recorded session access policy ·
                  Certificate of completion · Refund policy details · Batch
                  start dates · EMI availability
                  <br />
                  <span style={{ marginTop: "8px", display: "block" }}>
                    Review the course details before completing your
                    registration.{" "}
                    <a href="https://www.glitchedu.online/refund-policy">
                      Refund Policy
                    </a>{" "}
                    ·{" "}
                    <a href="https://www.glitchedu.online/terms">
                      Terms &amp; Conditions
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/*  ===================== CAREER SUPPORT =====================  */}
          <section
            className="section"
            id="career-support"
            aria-labelledby="career-heading"
          >
            <div className="container">
              <div className="section-header">
                <div className="section-eyebrow">Beyond the Curriculum</div>
                <h2 id="career-heading">
                  Support that extends beyond the last session.
                </h2>
                <p>
                  We focus on practical upskilling, portfolio development, and
                  interview preparation. We do not promise guaranteed jobs or
                  salary outcomes.
                </p>
              </div>
              <div className="career-grid">
                <div className="career-card">
                  <div className="career-icon" aria-hidden="true">
                    🎯
                  </div>
                  <h3>Mock Interviews</h3>
                  <p>
                    Structured sessions that mirror real backend and full stack
                    interview formats.
                  </p>
                </div>
                <div className="career-card">
                  <div className="career-icon" aria-hidden="true">
                    💼
                  </div>
                  <h3>LinkedIn Optimisation</h3>
                  <p>
                    Guidance on strengthening your LinkedIn profile to reflect
                    your new backend skills.
                  </p>
                </div>
                <div className="career-card">
                  <div className="career-icon" aria-hidden="true">
                    📋
                  </div>
                  <h3>Naukri Profile Guidance</h3>
                  <p>
                    Practical tips on improving your Naukri profile for backend
                    and full stack roles.
                  </p>
                </div>
                <div className="career-card">
                  <div className="career-icon" aria-hidden="true">
                    📁
                  </div>
                  <h3>Portfolio Review</h3>
                  <p>
                    Mentor guidance on structuring and presenting your GitHub
                    project portfolio effectively.
                  </p>
                </div>
                <div className="career-card">
                  <div className="career-icon" aria-hidden="true">
                    🔍
                  </div>
                  <h3>Career Guidance</h3>
                  <p>
                    Direction on positioning yourself for backend, full stack,
                    or senior engineering roles based on your background.
                  </p>
                </div>
                <div className="career-card">
                  <div className="career-icon" aria-hidden="true">
                    👨‍💻
                  </div>
                  <h3>Mentor Access</h3>
                  <p>
                    Direct support from experienced MNC software engineers
                    throughout the program.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/*  ===================== TESTIMONIALS =====================  */}
          <section
            className="section section-alt"
            id="testimonials"
            aria-labelledby="testimonials-heading"
          >
            <div className="container">
              <div className="section-header">
                <div className="section-eyebrow">From Past Participants</div>
                <h2 id="testimonials-heading">
                  What working professionals say after completing the program.
                </h2>
              </div>
              <div className="testimonials-grid">
                <div className="testimonial-card">
                  <div
                    className="testimonial-stars"
                    aria-label="5 out of 5 stars"
                  >
                    ★★★★★
                  </div>
                  <p className="testimonial-text">
                    "The Node.js event loop sessions finally made
                    production-level debugging click for me. I had been copying
                    patterns without understanding them. Coming out of this I
                    could defend my architecture decisions in interviews."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar" aria-hidden="true">
                      AK
                    </div>
                    <div>
                      <div className="author-name">A. Kumar</div>
                      <div className="author-role">
                        Backend Developer, 4 years experience
                      </div>
                    </div>
                  </div>
                </div>
                <div className="testimonial-card">
                  <div
                    className="testimonial-stars"
                    aria-label="5 out of 5 stars"
                  >
                    ★★★★★
                  </div>
                  <p className="testimonial-text">
                    "I had been a frontend developer for three years and felt
                    stuck. The PostgreSQL and authentication modules built the
                    backend confidence I was missing. The batch size of 20 meant
                    questions actually got answered."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar" aria-hidden="true">
                      PR
                    </div>
                    <div>
                      <div className="author-name">P. Reddy</div>
                      <div className="author-role">
                        Frontend to Full Stack, 3 years experience
                      </div>
                    </div>
                  </div>
                </div>
                <div className="testimonial-card">
                  <div
                    className="testimonial-stars"
                    aria-label="5 out of 5 stars"
                  >
                    ★★★★★
                  </div>
                  <p className="testimonial-text">
                    "As a QA engineer trying to move into development, I needed
                    structured implementation practice — not another tutorial.
                    The mock interviews and real project work gave me the
                    portfolio I was missing."
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar" aria-hidden="true">
                      SM
                    </div>
                    <div>
                      <div className="author-name">S. Mehta</div>
                      <div className="author-role">
                        QA Engineer transitioning to development
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="testimonial-disclaimer">
                We focus on practical upskilling, portfolio development, and
                interview preparation. We do not promise guaranteed jobs or
                salary outcomes. Participant experiences vary based on
                background, effort, and market conditions.
              </div>
            </div>
          </section>

          {/*  ===================== BROCHURE SECTION =====================  */}
          <section
            className="section section-yellow"
            id="brochure-section"
            aria-labelledby="brochure-heading"
          >
            <div className="container text-center">
              <div className="section-eyebrow">Detailed Program Document</div>
              <h2 id="brochure-heading">
                Want the complete syllabus and program details?
              </h2>
              <p
                style={{
                  marginBottom: "32px",
                  maxWidth: "480px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontSize: "17px",
                }}
              >
                Download the full course brochure after sharing your details.
                Our team will also reach out to answer any questions.
              </p>
              <button
                className="btn btn-primary btn-lg"
                id="hero-brochure-cta"
                data-event="brochure_gate_open"
                data-location="brochure-section"
                data-cta="download-brochure"
                onClick={() => {}}
              >
                Download Course Brochure
              </button>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--muted)",
                  marginTop: "16px",
                }}
              >
                We'll ask for your contact details before the download. No
                unsolicited messages unrelated to the program.
              </p>
            </div>
          </section>

          {/*  ===================== FAQ =====================  */}
          <section className="section" id="faq" aria-labelledby="faq-heading">
            <div className="container">
              <div className="section-header">
                <div className="section-eyebrow">Common Questions</div>
                <h2 id="faq-heading">Frequently asked questions.</h2>
              </div>
              <div className="faq-list" id="faq-accordion">
                <div className="faq-item" id="faq-1">
                  <button
                    className="faq-question"
                    aria-expanded="false"
                    aria-controls="faq-1-ans"
                    onClick={(e) => { const item = e.currentTarget.closest(".faq-item"); const wasOpen = item.classList.contains("open"); document.querySelectorAll(".faq-item.open").forEach(i => { i.classList.remove("open"); i.querySelector(".faq-question").setAttribute("aria-expanded","false"); }); if (!wasOpen) { item.classList.add("open"); e.currentTarget.setAttribute("aria-expanded","true"); } }}
                  >
                    Is this program suitable for freshers or recent graduates?
                    <div className="faq-chevron" aria-hidden="true">
                      ▾
                    </div>
                  </button>
                  <div className="faq-answer" id="faq-1-ans" role="region">
                    No. This program is designed specifically for working IT
                    professionals with at least 2 years of professional
                    experience. It is not a beginner or fresher program. If you
                    are a fresher, this is not the right fit for you at this
                    stage.
                  </div>
                </div>

                <div className="faq-item" id="faq-2">
                  <button
                    className="faq-question"
                    aria-expanded="false"
                    aria-controls="faq-2-ans"
                    onClick={(e) => { const item = e.currentTarget.closest(".faq-item"); const wasOpen = item.classList.contains("open"); document.querySelectorAll(".faq-item.open").forEach(i => { i.classList.remove("open"); i.querySelector(".faq-question").setAttribute("aria-expanded","false"); }); if (!wasOpen) { item.classList.add("open"); e.currentTarget.setAttribute("aria-expanded","true"); } }}
                  >
                    I'm a frontend developer. Can I join this program?
                    <div className="faq-chevron" aria-hidden="true">
                      ▾
                    </div>
                  </button>
                  <div className="faq-answer" id="faq-2-ans" role="region">
                    Yes. Frontend developers with professional experience who
                    want to build backend skills and transition toward full
                    stack or backend roles are a strong fit for this program.
                    You will build the backend implementation confidence that is
                    often missing when you primarily work on the frontend.
                  </div>
                </div>

                <div className="faq-item" id="faq-3">
                  <button
                    className="faq-question"
                    aria-expanded="false"
                    aria-controls="faq-3-ans"
                    onClick={(e) => { const item = e.currentTarget.closest(".faq-item"); const wasOpen = item.classList.contains("open"); document.querySelectorAll(".faq-item.open").forEach(i => { i.classList.remove("open"); i.querySelector(".faq-question").setAttribute("aria-expanded","false"); }); if (!wasOpen) { item.classList.add("open"); e.currentTarget.setAttribute("aria-expanded","true"); } }}
                  >
                    What is the program fee and how do I pay?
                    <div className="faq-chevron" aria-hidden="true">
                      ▾
                    </div>
                  </button>
                  <div className="faq-answer" id="faq-3-ans" role="region">
                    The program fee is ₹9,999. You can complete payment and
                    registration online at{" "}
                    <a href="https://www.glitchedu.online/register">
                      glitchedu.online/register
                    </a>
                    . If you have questions about payment, contact us at{" "}
                    <a href="tel:+916300127932">+91 6300127932</a> or{" "}
                    <a href="mailto:info@glitchedu.online">
                      info@glitchedu.online
                    </a>
                    .
                  </div>
                </div>

                <div className="faq-item" id="faq-4">
                  <button
                    className="faq-question"
                    aria-expanded="false"
                    aria-controls="faq-4-ans"
                    onClick={(e) => { const item = e.currentTarget.closest(".faq-item"); const wasOpen = item.classList.contains("open"); document.querySelectorAll(".faq-item.open").forEach(i => { i.classList.remove("open"); i.querySelector(".faq-question").setAttribute("aria-expanded","false"); }); if (!wasOpen) { item.classList.add("open"); e.currentTarget.setAttribute("aria-expanded","true"); } }}
                  >
                    How many members are in each batch?
                    <div className="faq-chevron" aria-hidden="true">
                      ▾
                    </div>
                  </button>
                  <div className="faq-answer" id="faq-4-ans" role="region">
                    Each batch is capped at a maximum of 20 members. This is
                    intentional — it ensures every participant can ask
                    questions, get real-time feedback, and have direct mentor
                    interaction during sessions.
                  </div>
                </div>

                <div className="faq-item" id="faq-5">
                  <button
                    className="faq-question"
                    aria-expanded="false"
                    aria-controls="faq-5-ans"
                    onClick={(e) => { const item = e.currentTarget.closest(".faq-item"); const wasOpen = item.classList.contains("open"); document.querySelectorAll(".faq-item.open").forEach(i => { i.classList.remove("open"); i.querySelector(".faq-question").setAttribute("aria-expanded","false"); }); if (!wasOpen) { item.classList.add("open"); e.currentTarget.setAttribute("aria-expanded","true"); } }}
                  >
                    Does this program cover MongoDB, React, or the MERN stack?
                    <div className="faq-chevron" aria-hidden="true">
                      ▾
                    </div>
                  </button>
                  <div className="faq-answer" id="faq-5-ans" role="region">
                    No. This is a Full Stack Node.js program, not a MERN stack
                    program. The confirmed stack is Node.js, PostgreSQL,
                    TypeScript, Docker, and GitHub. MongoDB, React, and
                    Express.js are not part of this curriculum. This focus is
                    intentional — deeper implementation with fewer technologies
                    is more valuable than shallow coverage of many.
                  </div>
                </div>

                <div className="faq-item" id="faq-6">
                  <button
                    className="faq-question"
                    aria-expanded="false"
                    aria-controls="faq-6-ans"
                    onClick={(e) => { const item = e.currentTarget.closest(".faq-item"); const wasOpen = item.classList.contains("open"); document.querySelectorAll(".faq-item.open").forEach(i => { i.classList.remove("open"); i.querySelector(".faq-question").setAttribute("aria-expanded","false"); }); if (!wasOpen) { item.classList.add("open"); e.currentTarget.setAttribute("aria-expanded","true"); } }}
                  >
                    Do you provide job guarantees or placement services?
                    <div className="faq-chevron" aria-hidden="true">
                      ▾
                    </div>
                  </button>
                  <div className="faq-answer" id="faq-6-ans" role="region">
                    No. We do not provide job guarantees, guaranteed placements,
                    guaranteed recruiter views, or guaranteed salary outcomes.
                    We focus on practical upskilling, portfolio development, and
                    interview preparation. Career support — including mock
                    interviews, LinkedIn and Naukri profile guidance, and mentor
                    access — is included as part of the program.
                  </div>
                </div>

                <div className="faq-item" id="faq-7">
                  <button
                    className="faq-question"
                    aria-expanded="false"
                    aria-controls="faq-7-ans"
                    onClick={(e) => { const item = e.currentTarget.closest(".faq-item"); const wasOpen = item.classList.contains("open"); document.querySelectorAll(".faq-item.open").forEach(i => { i.classList.remove("open"); i.querySelector(".faq-question").setAttribute("aria-expanded","false"); }); if (!wasOpen) { item.classList.add("open"); e.currentTarget.setAttribute("aria-expanded","true"); } }}
                  >
                    Where can I download the full course brochure?
                    <div className="faq-chevron" aria-hidden="true">
                      ▾
                    </div>
                  </button>
                  <div className="faq-answer" id="faq-7-ans" role="region">
                    You can download the full brochure by submitting your
                    details using the{" "}
                    <button
                      onClick={() => {}}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--yellow-dark)",
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontSize: "inherit",
                        padding: "0",
                        fontWeight: "600",
                      }}
                    >
                      Download Course Brochure
                    </button>{" "}
                    form on this page. Our team will also reach out to answer
                    any questions after you submit.
                  </div>
                </div>

                <div className="faq-item" id="faq-8">
                  <button
                    className="faq-question"
                    aria-expanded="false"
                    aria-controls="faq-8-ans"
                    onClick={(e) => { const item = e.currentTarget.closest(".faq-item"); const wasOpen = item.classList.contains("open"); document.querySelectorAll(".faq-item.open").forEach(i => { i.classList.remove("open"); i.querySelector(".faq-question").setAttribute("aria-expanded","false"); }); if (!wasOpen) { item.classList.add("open"); e.currentTarget.setAttribute("aria-expanded","true"); } }}
                  >
                    How do I enroll?
                    <div className="faq-chevron" aria-hidden="true">
                      ▾
                    </div>
                  </button>
                  <div className="faq-answer" id="faq-8-ans" role="region">
                    Use the <a href="#" onClick={(e) => { e.preventDefault(); setShowPopup(true); sessionStorage.removeItem('zohoPopupDismissed'); }}>Enroll Now</a> form at
                    the top of this page. Share your name, phone number, current
                    role, experience level, and preferred demo slot. Our team
                    will contact you on WhatsApp to confirm the session details.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/*  ===================== FINAL CTA =====================  */}
          <section
            className="final-cta"
            id="final-cta"
            aria-labelledby="final-cta-heading"
          >
            <div className="container">
              <h2 id="final-cta-heading">
                Ready to build production-ready backend skills?
              </h2>
              <p>
                Enroll now and see the program format before
                committing.
              </p>
              <div className="final-cta-buttons">
                <a
                  href="#" onClick={(e) => { e.preventDefault(); setShowPopup(true); sessionStorage.removeItem('zohoPopupDismissed'); }}
                  className="btn btn-secondary btn-lg"
                  id="final-demo-cta"
                  data-event="demo_cta_click"
                  data-location="final-cta"
                  data-cta="enroll-now"
                >
                  Enroll Now
                </a>
                <a
                  href="https://wa.me/916300127932?text=Hi%2C+I%27m+interested+in+the+Node.js+course"
                  className="btn btn-pay btn-lg"
                  id="final-whatsapp-cta"
                  data-event="whatsapp_click"
                  data-location="final-cta"
                  data-cta="whatsapp"
                  target="_blank"
                  rel="noopener"
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
  Chat on WhatsApp
</span>
                </a>
              </div>
              <div className="final-cta-pay">
                <a
                  href="https://www.glitchedu.online/register"
                  id="final-payment-cta"
                  data-event="payment_cta_click"
                  data-location="final-cta"
                  data-cta="enroll-pay-9999"
                >
                  Already reviewed everything? Enroll &amp; Pay ₹9,999 →
                </a>
              </div>
              <div className="final-disclaimer">
                We focus on practical upskilling, portfolio development, and
                interview preparation. We do not promise guaranteed jobs or
                salary outcomes. Review{" "}
                <a
                  href="https://www.glitchedu.online/terms"
                  style={{
                    color: "rgba(0,0,0,0.6)",
                    textDecoration: "underline",
                  }}
                >
                  Terms &amp; Conditions
                </a>{" "}
                and{" "}
                <a
                  href="https://www.glitchedu.online/refund-policy"
                  style={{
                    color: "rgba(0,0,0,0.6)",
                    textDecoration: "underline",
                  }}
                >
                  Refund Policy
                </a>{" "}
                before enrolling.
              </div>
            </div>
          </section>

          {/*  ===================== FOOTER =====================  */}
          <footer id="footer" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="hidden">
              Footer
            </h2>
            <div className="container">
              <div className="footer-inner">
                <div className="footer-brand">
                  <div className="footer-logo" style={{ display: 'inline-flex', background: '#0D0D0D', padding: '8px 16px', borderRadius: '10px' }}>
                    <img src={logo} alt="Glitch Skill Hub" style={{ height: '36px', width: 'auto' }} />
                  </div>
                  <p className="footer-tagline">
                    Practical software training for working IT professionals in
                    No theory-only content. No freshers. No generic
                    courses.
                  </p>
                  <div className="footer-contact">
                    <a
                      href="tel:+916300127932"
                      id="footer-phone-cta"
                      data-event="phone_click"
                      data-location="footer"
                    >
                      📞 +91 6300127932
                    </a>
                    <a href="mailto:info@glitchedu.online">
                      ✉ info@glitchedu.online
                    </a>
                    <a
                      href="https://www.glitchedu.online"
                      target="_blank"
                      rel="noopener"
                    >
                      🌐 glitchedu.online
                    </a>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.4)",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      📍 
                    </span>
                  </div>
                </div>
                <div className="footer-col">
                  <h4>Program</h4>
                  <nav className="footer-links" aria-label="Program links">
                    <a href="#curriculum">Full Syllabus</a>
                    <a href="#program">Program Details &amp; Pricing</a>
                    <a href="#who-should-join">Who Should Join</a>
                    <a href="#trainer">Our Trainer</a>
                    <a href="#career-support">Career Support</a>
                    <a href="#faq">FAQ</a>
                  </nav>
                </div>
                <div className="footer-col">
                  <h4>Get Started</h4>
                  <nav className="footer-links" aria-label="Get started links">
                    <a
                      href="#" onClick={(e) => { e.preventDefault(); setShowPopup(true); sessionStorage.removeItem('zohoPopupDismissed'); }}
                      id="footer-demo-cta"
                      data-event="demo_cta_click"
                      data-location="footer"
                      data-cta="enroll-now"
                    >
                      Enroll Now
                    </a>
                    <a
                      href="https://wa.me/916300127932?text=Hi%2C+I%27m+interested+in+the+Node.js+course"
                      id="footer-whatsapp-cta"
                      data-event="whatsapp_click"
                      data-location="footer"
                      target="_blank"
                      rel="noopener"
                    ><span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
  <svg viewBox="0 0 24 24" width="20" height="20" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
  Chat on WhatsApp
</span></a>
                  </nav>
                </div>
              </div>
              <hr className="footer-divider" />
              <div className="footer-bottom">
                <div className="footer-bottom-left">
                  © 2025 Glitch Skill Hub · All rights reserved.
                </div>
              </div>
            </div>
          </footer>

          {/*  ===================== MOBILE STICKY CTA =====================  */}
          <div
            className="mobile-sticky"
            id="mobile-sticky"
            role="navigation"
            aria-label="Mobile quick actions"
          >
            <a
              href="https://wa.me/916300127932?text=Hi%2C+I%27m+interested+in+the+Node.js+course"
              className="mobile-sticky-wa"
              id="mobile-wa-cta"
              data-event="whatsapp_click"
              data-location="mobile-sticky"
              target="_blank"
              rel="noopener"
              aria-label="Chat with us on WhatsApp"
            >
              💬 WhatsApp Us
            </a>
            <button
              className="mobile-sticky-demo"
              id="mobile-demo-cta"
              data-event="demo_cta_click"
              data-location="mobile-sticky"
              data-cta="enroll-now"
              onclick="scrollToDemo()"
              aria-label="Enroll now"
            >
              Enroll Now
            </button>
          </div>

          {/*  ===================== BROCHURE MODAL =====================  */}
          <div
            className="modal-overlay"
            id="brochure-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="brochure-modal-title"
          >
            <div className="modal-box">
              <button
                className="modal-close"
                onClick={() => {}}
                aria-label="Close brochure download form"
              >
                ✕
              </button>
              {/*  Form State  */}
              <div id="brochure-form-state">
                <div className="modal-eyebrow">Course Brochure</div>
                <h3 id="brochure-modal-title">Get the Full Course Brochure</h3>
                <p className="form-helper">
                  Share your details to download the detailed Full Stack Node.js
                  program brochure.
                </p>
                <form
                  id="brochure-gate-form"
                  data-event-success="brochure_lead_submit"
                  data-form-context="brochure_download"
                  novalidate
                >
                  <input type="hidden" name="utm_source" id="b_utm_source" />
                  <input type="hidden" name="utm_medium" id="b_utm_medium" />
                  <input
                    type="hidden"
                    name="utm_campaign"
                    id="b_utm_campaign"
                  />
                  <input type="hidden" name="utm_term" id="b_utm_term" />
                  <input type="hidden" name="utm_content" id="b_utm_content" />
                  <input type="hidden" name="gclid" id="b_gclid" />
                  <input
                    type="hidden"
                    name="lead_source"
                    value="landing_page"
                  />
                  <input
                    type="hidden"
                    name="form_context"
                    value="brochure_download"
                  />
                  <input
                    type="hidden"
                    name="landing_page_url"
                    id="b_landing_url"
                  />
                  <input
                    type="hidden"
                    name="submission_timestamp"
                    id="b_timestamp"
                  />

                  <div className="form-group">
                    <label className="form-label" htmlFor="b_name">
                      Full Name{" "}
                      <span className="req" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      id="b_name"
                      name="name"
                      required
                      placeholder="Your full name"
                      aria-required="true"
                    />
                    <div className="form-error" id="b_name-err" role="alert">
                      Please enter your full name.
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="b_phone">
                      Phone Number{" "}
                      <span className="req" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      className="form-input"
                      type="tel"
                      id="b_phone"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      aria-required="true"
                    />
                    <div className="form-error" id="b_phone-err" role="alert">
                      Please enter a valid 10-digit phone number.
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="b_role">
                      Current Role{" "}
                      <span className="req" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <select
                      className="form-select"
                      id="b_role"
                      name="role"
                      required
                      aria-required="true"
                    >
                      <option value="">Select your current role</option>
                      <option value="frontend-dev">Frontend Developer</option>
                      <option value="backend-dev">Backend Developer</option>
                      <option value="fullstack-dev">
                        Full Stack Developer
                      </option>
                      <option value="qa-engineer">QA Engineer</option>
                      <option value="support-engineer">Support Engineer</option>
                      <option value="devops-cloud">
                        DevOps or Cloud Engineer
                      </option>
                      <option value="other-it">Other IT Professional</option>
                    </select>
                    <div className="form-error" id="b_role-err" role="alert">
                      Please select your current role.
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="b_exp">
                      Years of Experience{" "}
                      <span className="req" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <select
                      className="form-select"
                      id="b_exp"
                      name="experience"
                      required
                      aria-required="true"
                    >
                      <option value="">Select years of experience</option>
                      <option value="less-than-1">Less than 1 year</option>
                      <option value="1-2">1 to 2 years</option>
                      <option value="2-4">2 to 4 years</option>
                      <option value="4-6">4 to 6 years</option>
                      <option value="more-than-6">More than 6 years</option>
                    </select>
                    <div className="form-error" id="b_exp-err" role="alert">
                      Please select your experience level.
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="b_slot">
                      Preferred Demo Slot{" "}
                      <span className="req" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <select
                      className="form-select"
                      id="b_slot"
                      name="slot"
                      required
                      aria-required="true"
                    >
                      <option value="">Select your preferred slot</option>
                      <option value="weekday-evening">Weekday Evening</option>
                      <option value="saturday-morning">Saturday Morning</option>
                      <option value="saturday-evening">Saturday Evening</option>
                      <option value="sunday-morning">Sunday Morning</option>
                      <option value="sunday-evening">Sunday Evening</option>
                    </select>
                    <div className="form-error" id="b_slot-err" role="alert">
                      Please select a preferred demo slot.
                    </div>
                  </div>
                  <div className="form-consent">
                    By submitting this form, you agree to receive a call or
                    WhatsApp message from Glitch Skill Hub regarding the course
                    and demo session.
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-full btn-submit"
                    id="brochure-submit-btn"
                  >
                    <span className="btn-text">Get Brochure</span>
                    <span className="btn-loading" aria-hidden="true">
                      Submitting...
                    </span>
                  </button>
                  <div className="form-policy-links">
                    <a
                      href="https://www.glitchedu.online/privacy-policy"
                      target="_blank"
                      rel="noopener"
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="https://www.glitchedu.online/terms"
                      target="_blank"
                      rel="noopener"
                    >
                      Terms &amp; Conditions
                    </a>
                  </div>
                </form>
              </div>
              {/*  Success State  */}
              <div
                className="modal-success"
                id="brochure-success"
                aria-live="polite"
              >
                <div className="success-icon" aria-hidden="true">
                  ✓
                </div>
                <h3>Your brochure is ready.</h3>
                <p>
                  Thank you. Your details have been received. Download the
                  brochure using the button below, or chat with us on WhatsApp
                  for questions.
                </p>
                <div className="modal-success-btns">
                  <a
                    href={brochurePdf}
                    className="btn btn-primary btn-full"
                    id="brochure-download-button"
                    data-event="brochure_download"
                    data-location="brochure-success"
                    data-cta="download-brochure-pdf"
                    download="MernFullStack-Brochure.pdf"
                    aria-label="Download the course brochure PDF"
                  >
                    Download Brochure PDF
                  </a>
                  <a
                    href="#" onClick={(e) => { e.preventDefault(); setShowPopup(true); sessionStorage.removeItem('zohoPopupDismissed'); }}
                    className="btn btn-secondary btn-full"
                    id="brochure-demo-cta"
                    data-event="brochure_demo_cta_click"
                    data-location="brochure-success"
                    onClick={() => {}}
                  >
                    Enroll Now
                  </a>
                  {/*  Developer note: The brochure URL above (#) must be replaced by a server-generated
             signed URL returned from /api/brochure-download after form success.
             Frontend-only URL reveal is weaker — users can inspect source.
             Preferred implementation: POST form → backend validates → returns signed URL → set href here.  */}
                </div>
              </div>
            </div>
          </div>

          {/*  ===================== STRUCTURED DATA =====================  */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Glitch Skill Hub",
  "url": "https://www.glitchedu.online",
  "telephone": "+916300127932",
  "email": "info@glitchedu.online",
  "address": {
    "@type": "PostalAddress",
    
    
    "addressCountry": "IN"
  }
}
`,
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Full Stack Node.js Upskilling Program",
  "description": "45-day live online Full Stack Node.js course for working IT professionals. Covers Node.js, REST APIs, PostgreSQL, TypeScript, Docker, JWT, GitHub, and real-time projects.",
  "provider": {
    "@type": "Organization",
    "name": "Glitch Skill Hub",
    "url": "https://www.glitchedu.online"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "Online",
    "courseWorkload": "PT45D",
    "offers": {
      "@type": "Offer",
      "price": "9999",
      "priceCurrency": "INR"
    }
  }
}
`,
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is this program suitable for freshers or recent graduates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. This program is designed specifically for working IT professionals with at least 2 years of professional experience."
      }
    },
    {
      "@type": "Question",
      "name": "What is the program fee?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The program fee is ₹9,999 for the 45-day live online program."
      }
    },
    {
      "@type": "Question",
      "name": "Does this program cover the MERN stack?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. This is a Full Stack Node.js program covering Node.js, PostgreSQL, TypeScript, Docker, and GitHub. MongoDB, React, and Express.js are not part of this curriculum."
      }
    }
  ]
}
`,
            }}
          />

          {/*  ===================== JAVASCRIPT =====================  */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
/* ─── ATTRIBUTION CAPTURE ─── */
(function() {
  function getParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name) || '';
  }
  const params = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid'];
  const stored = {};
  params.forEach(function(p) {
    const val = getParam(p);
    if (val) {
      sessionStorage.setItem('ft_' + p, sessionStorage.getItem('ft_' + p) || val);
      sessionStorage.setItem('lt_' + p, val);
      stored[p] = val;
    }
  });

  function populateHiddenFields(prefix) {
    const map = { utm_source:'_source', utm_medium:'_medium', utm_campaign:'_campaign', utm_term:'_term', utm_content:'_content', gclid:'_gclid' };
    params.forEach(function(p) {
      const el = document.getElementById(prefix + p);
      if (el) el.value = sessionStorage.getItem('lt_' + p) || getParam(p);
    });
    const lu = document.getElementById(prefix + 'landing_url');
    if (lu) lu.value = window.location.href;
    const ts = document.getElementById(prefix + 'timestamp');
    if (ts) ts.value = new Date().toISOString();
  }

  window.populateAttribution = function(prefix) { populateHiddenFields(prefix); };

  /* Preserve UTM on payment links */
  document.addEventListener('DOMContentLoaded', function() {
    const payLinks = document.querySelectorAll('[href*="/register"]');
    payLinks.forEach(function(link) {
      const url = new URL(link.href);
      params.forEach(function(p) {
        const v = sessionStorage.getItem('lt_' + p) || getParam(p);
        if (v) url.searchParams.set(p, v);
      });
      url.searchParams.set('originating_page', window.location.pathname);
      url.searchParams.set('cta_location', link.getAttribute('data-location') || '');
      link.href = url.toString();
    });
  });
})();

/* ─── ANALYTICS EVENT DISPATCHER ─── */
function dispatchEvent(eventName, payload) {
  /* GTM dataLayer push */
  if (window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...payload });
  }
  /* GA4 gtag */
  if (window.gtag) {
    window.gtag('event', eventName, payload);
  }
  /* Debug */
  console.log('[Analytics]', eventName, payload);
}

/* CTA click tracking */
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-event]').forEach(function(el) {
    el.addEventListener('click', function() {
      const ev = el.getAttribute('data-event');
      if (ev && ev !== 'lead_submit' && ev !== 'brochure_lead_submit') {
        dispatchEvent(ev, {
          cta_location: el.getAttribute('data-location') || '',
          cta_label: el.getAttribute('data-cta') || ''
        });
      }
    });
  });
});

/* ─── MODULE ACCORDION ─── */
function toggleModule(header) {
  const card = header.closest('.module-card');
  const isOpen = card.classList.contains('open');
  card.classList.toggle('open', !isOpen);
  header.setAttribute('aria-expanded', String(!isOpen));
}
function handleModKey(e, header) {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleModule(header); }
}

/* ─── FAQ ACCORDION ─── */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(i) {
    i.classList.remove('open');
    i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

/* ─── SCROLL TO DEMO ─── */
function scrollToDemo() {
  const form = document.getElementById('demo-form');
  if (form) {
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const first = form.querySelector('input, select');
    if (first) setTimeout(function() { first.focus(); }, 600);
  }
}

/* ─── DEMO FORM VALIDATION & SUBMISSION ─── */
function validateRequired(id, errId) {
  const el = document.getElementById(id);
  const err = document.getElementById(errId);
  const val = el ? el.value.trim() : '';
  if (!val) {
    if (el) el.classList.add('error');
    if (err) err.classList.add('visible');
    return false;
  }
  if (el) el.classList.remove('error');
  if (err) err.classList.remove('visible');
  return true;
}
function validatePhone(id, errId) {
  const el = document.getElementById(id);
  const err = document.getElementById(errId);
  const val = el ? el.value.replace(/\D/g,'') : '';
  if (!val || val.length < 10) {
    if (el) el.classList.add('error');
    if (err) err.classList.add('visible');
    return false;
  }
  if (el) el.classList.remove('error');
  if (err) err.classList.remove('visible');
  return true;
}

document.addEventListener('DOMContentLoaded', function() {
  /* Populate attribution */
  window.populateAttribution('f_');
  window.populateAttribution('b_');
  document.getElementById('f_landing_url') && (document.getElementById('f_landing_url').value = window.location.href);
  document.getElementById('b_landing_url') && (document.getElementById('b_landing_url').value = window.location.href);
  document.getElementById('f_timestamp') && (document.getElementById('f_timestamp').value = new Date().toISOString());
  document.getElementById('b_timestamp') && (document.getElementById('b_timestamp').value = new Date().toISOString());

  /* Demo Form */
  const demoForm = document.getElementById('hero-demo-form');
  if (demoForm) {
    let submitted = false;
    demoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (submitted) return;
      const valid = [
        validateRequired('name','name-err'),
        validatePhone('phone','phone-err'),
        validateRequired('role','role-err'),
        validateRequired('experience','exp-err'),
        validateRequired('slot','slot-err')
      ].every(Boolean);
      if (!valid) return;

      submitted = true;
      const btn = document.getElementById('demo-submit-btn');
      if (btn) btn.classList.add('loading');

      /* DEVELOPER NOTE: Replace this timeout with a real fetch/POST to your lead endpoint */
      setTimeout(function() {
        dispatchEvent('lead_submit', { form_context: 'demo_booking', form_location: 'hero' });
        demoForm.style.display = 'none';
        const success = document.getElementById('demo-success');
        if (success) {
          success.classList.remove('hidden');
          success.focus();
        }
        /* Redirect to thank-you page */
        /* window.location.href = '/node-js-course/thank-you'; */
      }, 1200);
    });
    /* Real-time validation on blur */
    ['name','role','experience','slot'].forEach(function(id) {
      const el = document.getElementById(id);
      if (el) el.addEventListener('blur', function() { validateRequired(id, id === 'name' ? 'name-err' : id + '-err'); });
    });
    const phoneEl = document.getElementById('phone');
    if (phoneEl) phoneEl.addEventListener('blur', function() { validatePhone('phone','phone-err'); });
  }
});

/* ─── BROCHURE MODAL ─── */
let brochureFormSubmitted = false;
let lastBrochureOpener = null;

function openBrochureModal() {
  const modal = document.getElementById('brochure-modal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    lastBrochureOpener = document.activeElement;
    const firstInput = modal.querySelector('input, select, button.modal-close');
    if (firstInput) setTimeout(function() { firstInput.focus(); }, 50);
    dispatchEvent('brochure_gate_open', { location: 'modal' });
  }
}

function closeBrochureModal() {
  const modal = document.getElementById('brochure-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastBrochureOpener) lastBrochureOpener.focus();
  }
}

/* Close on overlay click */
document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('brochure-modal');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeBrochureModal();
    });
  }
  /* Escape key */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const modal = document.getElementById('brochure-modal');
      if (modal && modal.classList.contains('open')) closeBrochureModal();
    }
  });

  /* Brochure Form */
  const brochureForm = document.getElementById('brochure-gate-form');
  if (brochureForm) {
    brochureForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (brochureFormSubmitted) return;
      const valid = [
        validateRequired('b_name','b_name-err'),
        validatePhone('b_phone','b_phone-err'),
        validateRequired('b_role','b_role-err'),
        validateRequired('b_exp','b_exp-err'),
        validateRequired('b_slot','b_slot-err')
      ].every(Boolean);
      if (!valid) return;

      brochureFormSubmitted = true;
      const btn = document.getElementById('brochure-submit-btn');
      if (btn) btn.classList.add('loading');

      /* DEVELOPER NOTE: POST to your lead endpoint with form_context='brochure_download'.
         On success, the backend should return a signed/temporary brochure URL.
         Set that URL as the href of #brochure-download-button before showing success state.
         This prevents direct URL discovery from page source.
         Example:
           const data = await response.json();
           document.getElementById('brochure-download-button').href = data.brochure_url;
      */
      setTimeout(function() {
        dispatchEvent('brochure_lead_submit', { form_context: 'brochure_download' });
        /* TEMPORARY: Set brochure URL from CONFIG - replace with backend-gated URL */
        const dlBtn = document.getElementById('brochure-download-button');
        if (dlBtn) {
          dlBtn.href = CONFIG.BROCHURE_PDF_URL;
          /* DEVELOPER NOTE: The above is frontend-only gating (weaker).
             Users can inspect page source to find the URL.
             Replace with a server-returned signed URL for stronger gating. */
        }
        document.getElementById('brochure-form-state').style.display = 'none';
        const successEl = document.getElementById('brochure-success');
        if (successEl) {
          successEl.classList.add('visible');
          successEl.focus();
        }
        /* Track once */
        const dlBtnFinal = document.getElementById('brochure-download-button');
        if (dlBtnFinal) {
          dlBtnFinal.addEventListener('click', function() {
            dispatchEvent('brochure_download', { location: 'brochure-success' });
          }, { once: true });
        }
      }, 1200);
    });
  }
});

/* ─── SMOOTH SCROLL FOR #demo-form LINKS ─── */
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href="#" onClick={(e) => { e.preventDefault(); setShowPopup(true); sessionStorage.removeItem('zohoPopupDismissed'); }}]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      scrollToDemo();
    });
  });
});
`,
            }}
          />
        </body>
      </html>

      {/* ===================== ZOHO FORM POPUP ===================== */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'popupFadeIn 0.3s ease-out',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) closePopup(); }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '32px 28px',
              maxWidth: '520px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
              animation: 'popupSlideUp 0.35s ease-out',
            }}
          >
            <button
              onClick={closePopup}
              aria-label="Close popup"
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                background: '#F7F7F5',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: '#555',
                transition: 'background 0.2s',
                zIndex: 1,
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#E8E8E8'}
              onMouseOut={(e) => e.currentTarget.style.background = '#F7F7F5'}
            >
              ✕
            </button>
            <iframe
              title="Zoho Lead Form Popup"
              src="https://forms.zohopublic.in/glitchskillhubgm1/form/EmailSubscription/formperma/GueiYUHkjBHy5sVG8XovZiRspHcveDO2Os-mSlh1Ly0"
              style={{ width: '100%', height: '650px', border: 'none' }}
            />
          </div>
        </div>
      )}

      {/* Popup animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes popupFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popupSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />
    </>
  );
}
