import React from 'react';

// Import Logos
import virtusa from '../assets/images/Virtusa_Logo.svg.png';
import wipro from '../assets/images/Wipro_new_logo.svg.png';
import accenture from '../assets/images/Accenture.svg.png';
import cognizant from '../assets/images/Cognizant_logo_2022.svg.png';
import google from '../assets/images/Google_2015_logo.svg.webp';
import hcl from '../assets/images/HCLTech-new-logo.svg.png';
import tcs from '../assets/images/Tata_Consultancy_Services_old_logo.svg.webp';
import techmahindra from '../assets/images/TM_Logo_Color_Pos_RGB.svg.png';

const LogoScroll = () => {
  const logos = [
    { src: google, name: "Google" },
    { src: accenture, name: "Accenture" },
    { src: tcs, name: "TCS" },
    { src: cognizant, name: "Cognizant" },
    { src: wipro, name: "Wipro" },
    { src: virtusa, name: "Virtusa" },
    { src: hcl, name: "HCL" },
    { src: techmahindra, name: "Tech Mahindra" }
  ];

  // Double the logos for infinite effect
  const displayLogos = [...logos, ...logos];

  return (
    <div className="logo-scroll-container">
      <div className="logo-scroll-track">
        {displayLogos.map((logo, index) => (
          <div key={index} className="logo-item">
            <img src={logo.src} alt={logo.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoScroll;
