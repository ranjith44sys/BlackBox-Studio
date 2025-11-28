// // import React, { useEffect, useRef } from 'react';
// import React, { useEffect, useRef } from 'react';
// import { Instagram, Youtube, Twitter } from 'lucide-react';
// import './packages.css';

// const PhotoStudioPackages = () => {
//   const heroRef = useRef(null);

//   useEffect(() => {
//     // Parallax effect on scroll
//     const handleScroll = () => {
//       const scrolled = window.pageYOffset;
//       if (heroRef.current) {
//         heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     // Intersection Observer for fade-in animations
//     const observerOptions = {
//       threshold: 0.1,
//       rootMargin: '0px 0px -100px 0px'
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.style.opacity = '1';
//           entry.target.style.transform = 'translateY(0)';
//         }
//       });
//     }, observerOptions);

//     document.querySelectorAll('.package-card').forEach(card => {
//       observer.observe(card);
//     });

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       observer.disconnect();
//     };
//   }, []);

//   const handleBooking = (packageName) => {
//     alert(`Thank you for your interest in the ${packageName} package! Please contact us at info@photostudio.com to complete your booking.`);
//   };

//   const packages = [
//     {
//       id: 1,
//       name: 'Wedding',
//       description: 'Complete coverage of your special day, from preparation to reception.',
//       price: '₹ 1,20,000',
//       featured: true,
//       icon: (
//         <svg viewBox="0 0 24 24" fill="white">
//           <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
//         </svg>
//       ),
//       features: [
//         'Traditional Photography',
//         'Traditional Videography',
//         'Candid photography',
//         'Candid videography',
//         'Drone Coverage',
//         'Outdoor Shoot (3Hours)',
//         '2 Premium Albums',
//         'Video Editing',
//         'Combo Items',

//       ]
//     },
//     {
//       id: 2,
//       name: 'Pre-Wedding & Post-Wedding',
//       description: 'Beautiful couple portraits at stunning locations before your big day.',
//       price: '₹ 38,000',
//       featured: false,
//       icon: (
//         <svg viewBox="0 0 24 24" fill="white">
//           <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/>
//         </svg>
//       ),
//       features: [
//         '3-hour photoshoot session',
//         '2 location changes',
//         'Photo Editing',
//         'Premium Album',
//         'Editied deliverable(Soft copy)'
//       ]
//     },
//     {
//       id: 3,
//       name: 'Birthday',
//       description: 'Celebrate life\'s milestones with professional party photography.',
//       price: '₹ 20,000',
//       featured: false,
//       icon: (
//         <svg viewBox="0 0 24 24" fill="white">
//           <path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2zm4.6 9.99l-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01zM18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12C21 10.34 19.66 9 18 9z"/>
//         </svg>
//       ),
//       features: [
//         '3-hour event coverage',
//         'Photo Editing',
//         'Candid shots',
//         'Premium Album',
//         'Editied deliverable(Soft copy)',
//       ]
//     },
//      {
//       id: 5,
//       name: 'Baby Shower',
//       description: 'Timeless portraits capturing the love and connection you share.',
//       price: '₹ 30,000',
//       featured: false,
//       icon: (
//         <svg viewBox="0 0 24 24" fill="white">
//           <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63C19.68 7.55 18.92 7 18.06 7h-.12c-.86 0-1.62.55-1.9 1.37L13.5 16H16v6h4zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h1.5v7h4zm6.5-18c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm1 17v-7h1.5V9c0-1.1-.9-2-2-2h-1c-1.1 0-2 .9-2 2v5H13v7h2z"/>
//         </svg>
//       ),
//       features: [
//         'Traditional Photography',
//         'Traditional Videography',
//         'Premium Album',
//         'Editied deliverable(Soft copy)',

//       ]
//     },
//     {
//       id: 4,
//       name: 'Photo Frame Works',
//       description: 'Framed prints of your favorite photos, perfect for home or office display.',
//       price: '₹ 150 - ₹ 10,000',
//       featured: false,
//       icon: (
//         <svg viewBox="0 0 24 24" fill="white">
//           <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
//         </svg>
//       ),
//       features: [
//         'Photo Frames',
//         'LED-Frames',
//         'Wooden Frames and Oil Paintings',
//         'Magic Coffee-Mugs',
//         'Gift-Items',
//         'Others'
//       ]
//     },

//     {
//       id: 6,
//       name: 'Corporate',
//       description: 'Professional photography for business events and corporate shoots at your office or event location.',
//       price: '₹ 60,000',
//       featured: false,
//       icon: (
//         <svg viewBox="0 0 24 24" fill="white">
//           <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
//         </svg>
//       ),
//       features: [
//         'Photo Shoot ',
//         'Video Shoot',
//         'Photo Editing ',
//         'Video Editing',
//         'Animations and 3D,Templates and Advertisement Brouchers',
//         'Corporate Album',
//       ]
//     }
//   ];

//   return (
//     <div className="app">
//       <header className="header">
//         <div className="header-container">
//           <div className="logo">
//             <img src={black} className="logo1" alt="Logo"></img>
//             BLACK<br/>BOX
//           </div>
//           <nav className="nav">
//             {/* <a href="#" className="nav-link">PORTFOLIO</a> */}
//             <a href="/" className="nav-link">HOME</a>
//             <a href="/Gallery" className="nav-link">GALLERY</a>
//             <a href="/about" className="nav-link active">ABOUT</a>
//             <a href="/contact" className="nav-link">CONTACT</a>
//           </nav>
//           <div className="social-icons">
//             {/* <a href="#" className="social-link"><Facebook size={16} /></a> */}
//             <a href="#" className="social-link"><Instagram size={16} /></a>
//             <a href="#" className="social-link"><Youtube size={16} /></a>
//             <a href="#" className="social-link"><Twitter size={16} /></a>
//           </div>
//         </div>
//       </header>
//       <div className="floating-shapes">
//         <div className="shape"></div>
//         <div className="shape"></div>
//       </div>

//       <section className="hero" ref={heroRef}>
//         <div className="hero-content">
//           <h1>Our Packages</h1>
//           <p>Capturing Your Precious Moments</p>
//         </div>
//       </section>

//       <div className="container">
//         <h2 className="section-title" >Photography Packages</h2>

//         <div className="packages-grid">
//           {packages.map((pkg, index) => (
//             <div
//               key={pkg.id}
//               className={`package-card ${pkg.featured ? 'featured' : ''}`}
//               style={{ animationDelay: `${(index + 1) * 0.1}s` }}
//             >
//               <div className="package-image">
//                 {pkg.icon}
//               </div>
//               <div className="package-content">
//                 <h3 className="package-name">{pkg.name}</h3>
//                 <p className="package-description">{pkg.description}</p>
//                 <ul className="package-features" >
//                   {pkg.features.map((feature, idx) => (
//                     <li key={idx}>{feature}</li>
//                   ))}
//                 </ul>
//                 <div className="package-price">{pkg.price}</div>
//                 <button
//                   className="package-btn"
//                   onClick={() => handleBooking(pkg.name)}
//                 >
//                   <span>Book Now</span>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PhotoStudioPackages;

// import React, { useEffect, useRef } from 'react';
// import { Instagram, Youtube, Twitter } from 'lucide-react';
// import './packages1.css';

// import logoUrl from './assets/images/black.png';

// const PhotoStudioPackages = () => {
//   const heroRef = useRef(null);

//   // Replace this with your actual logo image path

//   useEffect(() => {
//     // Parallax effect on scroll
//     const handleScroll = () => {
//       const scrolled = window.pageYOffset;
//       if (heroRef.current) {
//         heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     // Intersection Observer for fade-in animations
//     const observerOptions = {
//       threshold: 0.1,
//       rootMargin: '0px 0px -100px 0px'
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.style.opacity = '1';
//           entry.target.style.transform = 'translateY(0)';
//         }
//       });
//     }, observerOptions);

//     document.querySelectorAll('.package-card').forEach(card => {
//       observer.observe(card);
//     });

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       observer.disconnect();
//     };
//   }, []);

//   const handleBooking = (packageName) => {
//     alert(`Thank you for your interest in the ${packageName} package! Please contact us at info@photostudio.com to complete your booking.`);
//   };

//   const packages = [
//     {
//       id: 1,
//       name: 'Wedding',
//       description: 'Complete coverage of your special day, from preparation to reception.',
//       price: '₹ 1,20,000',
//       featured: true,
//       icon: (
//         <svg viewBox="0 0 24 24" fill="white">
//           <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
//         </svg>
//         // <img src={logoUrl} alt="Wedding Icon" style={{ width: '420px', height: '320px' }} />
//       ),
//       features: [
//         'Traditional Photography',
//         'Traditional Videography',
//         'Candid photography',
//         'Candid videography',
//         'Drone Coverage',
//         'Outdoor Shoot (3Hours)',
//         '2 Premium Albums',
//         'Video Editing',
//         'Combo Items',
//       ]
//     },
//     {
//       id: 2,
//       name: 'Pre-Wedding & Post-Wedding',
//       description: 'Beautiful couple portraits at stunning locations before your big day.',
//       price: '₹ 38,000',
//       featured: false,
//       icon: (
//         <svg viewBox="0 0 24 24" fill="white">
//           <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/>
//         </svg>
//       ),
//       features: [
//         '3-hour photoshoot session',
//         '2 location changes',
//         'Photo Editing',
//         'Premium Album',
//         'Editied deliverable(Soft copy)'
//       ]
//     },
//     {
//       id: 3,
//       name: 'Birthday',
//       description: 'Celebrate life\'s milestones with professional party photography.',
//       price: '₹ 20,000',
//       featured: false,
//       icon: (
//         <svg viewBox="0 0 24 24" fill="white">
//           <path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2zm4.6 9.99l-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01zM18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12C21 10.34 19.66 9 18 9z"/>
//         </svg>
//       ),
//       features: [
//         '3-hour event coverage',
//         'Photo Editing',
//         'Candid shots',
//         'Premium Album',
//         'Editied deliverable(Soft copy)',
//       ]
//     },
//     {
//       id: 5,
//       name: 'Baby Shower',
//       description: 'Timeless portraits capturing the love and connection you share.',
//       price: '₹ 30,000',
//       featured: false,
//       icon: (
//         <svg viewBox="0 0 24 24" fill="white">
//           <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63C19.68 7.55 18.92 7 18.06 7h-.12c-.86 0-1.62.55-1.9 1.37L13.5 16H16v6h4zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h1.5v7h4zm6.5-18c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm1 17v-7h1.5V9c0-1.1-.9-2-2-2h-1c-1.1 0-2 .9-2 2v5H13v7h2z"/>
//         </svg>
//       ),
//       features: [
//         'Traditional Photography',
//         'Traditional Videography',
//         'Premium Album',
//         'Editied deliverable(Soft copy)',
//       ]
//     },
//     {
//       id: 4,
//       name: 'Photo Frame Works',
//       description: 'Framed prints of your favorite photos, perfect for home or office display.',
//       price: '₹ 150 - ₹ 10,000',
//       featured: false,
//       icon: (
//         <svg viewBox="0 0 24 24" fill="white">
//           <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
//         </svg>
//       ),
//       features: [
//         'Photo Frames',
//         'LED-Frames',
//         'Wooden Frames and Oil Paintings',
//         'Magic Coffee-Mugs',
//         'Gift-Items',
//         'Others'
//       ]
//     },
//     {
//       id: 6,
//       name: 'Corporate',
//       description: 'Professional photography for business events and corporate shoots at your office or event location.',
//       price: '₹ 60,000',
//       featured: false,
//       icon: (
//         <svg viewBox="0 0 24 24" fill="white">
//           <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
//         </svg>
//       ),
//       features: [
//         'Photo Shoot',
//         'Video Shoot',
//         'Photo Editing',
//         'Video Editing',
//         'Animations and 3D,Templates and Advertisement Brouchers',
//         'Corporate Album',
//       ]
//     }
//   ];

//   return (
//     <div className="app">
//       <header className="header">
//         <div className="header-container">
//           <div className="logo">
//             <img src={logoUrl} className="logo1" alt="Logo" />
//             BLACK<br/>BOX
//           </div>
//           <nav className="nav">
//             <a href="/" className="nav-link">HOME</a>
//             <a href="/Gallery" className="nav-link">GALLERY</a>
//             <a href="/services" className="nav-link active">PACKAGES</a>
//             <a href="/about" className="nav-link ">ABOUT</a>
//             <a href="/contact" className="nav-link">CONTACT</a>
//           </nav>
//           <div className="social-icons">
//             <a href="#" className="social-link"><Instagram size={16} /></a>
//             <a href="#" className="social-link"><Youtube size={16} /></a>
//             <a href="#" className="social-link"><Twitter size={16} /></a>
//           </div>
//         </div>
//       </header>

//       <div className="floating-shapes">
//         <div className="shape"></div>
//         <div className="shape"></div>
//       </div>

//       <section className="hero" ref={heroRef}>
//         <div className="hero-content">
//           <h1>Our Packages</h1>
//           <p>Capturing Your Precious Moments</p>
//         </div>
//       </section>

//       <div className="container">
//         <h2 className="section-title">Photography Packages</h2>

//         <div className="packages-grid">
//           {packages.map((pkg, index) => (
//             <div
//               key={pkg.id}
//               className={`package-card ${pkg.featured ? 'featured' : ''}`}
//               style={{ animationDelay: `${(index + 1) * 0.1}s` }}
//             >
//               <div className="package-image">
//                 {pkg.icon}
//               </div>
//               <div className="package-content">
//                 <h3 className="package-name">{pkg.name}</h3>
//                 <p className="package-description">{pkg.description}</p>
//                 <ul className="package-features">
//                   {pkg.features.map((feature, idx) => (
//                     <li key={idx}>{feature}</li>
//                   ))}
//                 </ul>
//                 <div className="package-price">{pkg.price}</div>
//                 <button
//                   className="package-btn"
//                   onClick={() => handleBooking(pkg.name)}
//                 >
//                   <span>Book Now</span>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PhotoStudioPackages;

import React, { useEffect, useRef, useState } from "react";
import { Instagram, Youtube, Twitter } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import "./packages2.css";

import logoUrl from "./assets/Logo.png";

const PhotoStudioPackages = () => {
  const heroRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    // Scroll behavior for navbar
    let lastScrollTop = 0;
    const scrollThreshold = 5;

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Navbar hide/show logic
      if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          // Scrolling down & past 100px
          setHeaderVisible(false);
        } else {
          // Scrolling up
          setHeaderVisible(true);
        }
        lastScrollTop = scrollTop;
      }

      // Parallax effect on hero
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollTop * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    document.querySelectorAll(".package-card").forEach((card) => {
      observer.observe(card);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleBooking = (packageName) => {
    alert(
      `Thank you for your interest in the ${packageName} package! Please contact us at info@photostudio.com to complete your booking.`
    );
  };

  const packages = [
    {
      id: 1,
      name: "Wedding",
      description:
        "Complete coverage of your special day, from preparation to reception.",
      price: "₹ 1,20,000",
      featured: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="white">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
      features: [
        "Traditional Photography",
        "Traditional Videography",
        "Candid photography",
        "Candid videography",
        "Drone Coverage",
        "Outdoor Shoot (3Hours)",
        "2 Premium Albums",
        "Video Editing",
        "Combo Items",
      ],
    },
    {
      id: 2,
      name: "Pre-Wedding & Post-Wedding",
      description:
        "Beautiful couple portraits at stunning locations before your big day.",
      price: "₹ 38,000",
      featured: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="white">
          <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z" />
        </svg>
      ),
      features: [
        "3-hour photoshoot session",
        "2 location changes",
        "Photo Editing",
        "Premium Album",
        "Editied deliverable(Soft copy)",
      ],
    },
    {
      id: 3,
      name: "Birthday",
      description:
        "Celebrate life's milestones with professional party photography.",
      price: "₹ 20,000",
      featured: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="white">
          <path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2zm4.6 9.99l-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01zM18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12C21 10.34 19.66 9 18 9z" />
        </svg>
      ),
      features: [
        "3-hour event coverage",
        "Photo Editing",
        "Candid shots",
        "Premium Album",
        "Editied deliverable(Soft copy)",
      ],
    },
    {
      id: 5,
      name: "Baby Shower",
      description:
        "Timeless portraits capturing the love and connection you share.",
      price: "₹ 30,000",
      featured: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="white">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63C19.68 7.55 18.92 7 18.06 7h-.12c-.86 0-1.62.55-1.9 1.37L13.5 16H16v6h4zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h1.5v7h4zm6.5-18c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm1 17v-7h1.5V9c0-1.1-.9-2-2-2h-1c-1.1 0-2 .9-2 2v5H13v7h2z" />
        </svg>
      ),
      features: [
        "Traditional Photography",
        "Traditional Videography",
        "Premium Album",
        "Editied deliverable(Soft copy)",
      ],
    },
    {
      id: 4,
      name: "Photo Frame Works",
      description:
        "Framed prints of your favorite photos, perfect for home or office display.",
      price: "₹ 150 - ₹ 10,000",
      featured: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="white">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
      features: [
        "Photo Frames",
        "LED-Frames",
        "Wooden Frames and Oil Paintings",
        "Magic Coffee-Mugs",
        "Gift-Items",
        "Others",
      ],
    },
    {
      id: 6,
      name: "Corporate",
      description:
        "Professional photography for business events and corporate shoots at your office or event location.",
      price: "₹ 60,000",
      featured: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="white">
          <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
        </svg>
      ),
      features: [
        "Photo Shoot",
        "Video Shoot",
        "Photo Editing",
        "Video Editing",
        "Animations and 3D,Templates and Advertisement Brouchers",
        "Corporate Album",
      ],
    },
  ];

  return (
    <div className="app">
      <header className={`header ${!headerVisible ? "header-hidden" : ""}`}>
        <div className="header-container">
          <div className="logo"  style={{ display: "flex", alignItems: "center" }}>
            <img src={logoUrl} className="logo1" alt="Logo" style={{width:"60px",height:"60px"}} />
            BLACK
            <br />
            BOX
          </div>
          <nav className="nav">
            <a href="/" className="nav-link">
              HOME
            </a>
            <a href="/Gallery" className="nav-link">
              GALLERY
            </a>
            <a href="/services" className="nav-link active">
              PACKAGES
            </a>
            <a href="/about" className="nav-link">
              ABOUT
            </a>
            <a href="/contact" className="nav-link">
              CONTACT
            </a>
          </nav>
          <div className="social-icons">
            <a href="#" className="social-link">
              <Instagram size={16} />
            </a>
            <a href="https://wa.me/6374109624" className="social-link">
              <FaWhatsapp size={16} />
            </a>

            <a href="#" className="social-link">
              <Youtube size={16} />
            </a>
          </div>
        </div>
      </header>

      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <section className="hero" ref={heroRef}>
        <div className="hero-content">
          <h1>Our Packages</h1>
          <p>Capturing Your Precious Moments</p>
        </div>
      </section>

      <div className="container">
        <h2 className="section-title">Photography Packages</h2>

        <div className="packages-grid">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`package-card ${pkg.featured ? "featured" : ""}`}
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="package-image">{pkg.icon}</div>
              <div className="package-content">
                <h3 className="package-name">{pkg.name}</h3>
                <p className="package-description">{pkg.description}</p>
                <ul className="package-features">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <div className="package-price">{pkg.price}</div>
                <button
                  className="package-btn"
                  onClick={() => handleBooking(pkg.name)}
                >
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <p>
            © 2025 BlackBox Studio. All rights reserved. 
          </p>
          <p>Unauthorized use is
            prohibited.</p>
        </div>
      </footer>
    </div>
  );
};

export default PhotoStudioPackages;
