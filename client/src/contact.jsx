// // src/components/ContactPage.jsx  (adjust path/filename to your project)
// import React, { useEffect, useRef,useState } from 'react';
// import { Send } from "lucide-react";
// import { Instagram, Youtube, Twitter } from 'lucide-react';
// import "./contact.css";

// // --- IMPORTANT: adjust this import to match your project structure ---
// // If api.js is at src/api.js use:
// import { sendContactMessage } from "./api";
// // If api.js is at src/services/api.js use:
// // import { sendContactMessage } from "../services/api";
// // If api.js is at src/features/api.js use:
// // import { sendContactMessage } from "../../features/api";
// // ---------------------------------------------------------------------

// // Import images (paths must be valid relative to this file)
// import lindsayImage from "./assets/images/img6.jpg";
// import kathleenImage from "./assets/images/img5.jpg";
// import robertImage from "./assets/images/img5.jpg";
// import murphyImage from "./assets/images/img5.jpg";
// import logoUrl from './assets/images/black.png';

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     message: ""
//   });
//   const [isHuman, setIsHuman] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Basic email regex (backend will still validate)
//   const isValidEmail = (email) =>
//     /^\S+@\S+\.\S+$/.test(email);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCheckbox = (e) => setIsHuman(e.target.checked);

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // important when using a <form>

//     // Frontend validation
//     const { firstName, lastName, email, message } = formData;
//     if (!firstName || !lastName || !email || !message) {
//       alert("Please fill in all fields");
//       return;
//     }
//     if (!isValidEmail(email)) {
//       alert("Please enter a valid email address");
//       return;
//     }
//     if (!isHuman) {
//       alert("Please confirm you are human");
//       return;
//     }

//     try {
//       setLoading(true);
//       console.log("Submitting contact:", formData);

//       const payload = {
//         ...formData,
//         submittedAt: new Date().toISOString()
//       };

//       const response = await sendContactMessage(payload);

//       // Axios success -> response.data usually holds the JSON returned by Flask
//       console.log("Server response:", response);
//       alert(response.data?.message || "Message sent successfully!");
//       setFormData({ firstName: "", lastName: "", email: "", message: "" });
//       setIsHuman(false);
//     } catch (err) {
//       // Better error logging for debugging
//       console.error("Error submitting contact form:", err);
//       // If axios, server errors are in err.response.data
//       const serverMsg = err?.response?.data?.error || err?.message || "Server error";
//       alert(serverMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const teamMembers = [
//     { name: "KATHLEEN", role: "Business Administrator", email: "kathleen@lindsayadler.com", image: kathleenImage },
//     { name: "ROBERT", role: "Brand Manager", email: "robert@lindsayadler.com", image: robertImage },
//     { name: "MURPHY", role: "Studio Dog Extraordinaire", email: "murphy@lindsayadler.com", image: murphyImage }
//   ];

//   return (
//     <div className="contact-page">
//        <header className="header">
//         <div className="header-container">
//           <div className="logo">
//             <img src={logoUrl} className="logo1" alt="Logo" />
//             BLACK<br/>BOX
//           </div>
//           <nav className="nav">
//             <a href="/" className="nav-link">HOME</a>
//             <a href="/Gallery" className="nav-link">GALLERY</a>
//             <a href="/services" className="nav-link ">PACKAGES</a>
//             <a href="/about" className="nav-link ">ABOUT</a>
//             <a href="/contact" className="nav-link active">CONTACT</a>
//           </nav>
//           <div className="social-icons">
//             <a href="#" className="social-link"><Instagram size={16} /></a>
//             <a href="#" className="social-link"><Youtube size={16} /></a>
//             <a href="#" className="social-link"><Twitter size={16} /></a>
//           </div>
//         </div>
//       </header>

//       <main className="main-content">
//         <div className="content-grid">
//           <div className="form-section">
//             <h1 className="title-main">CONTACT</h1>
//             <h2 className="title-sub">LINDSAY ADLER</h2>

//             <form className="form" onSubmit={handleSubmit}>
//               <div className="form-row">
//                 <input
//                   type="text"
//                   name="firstName"
//                   placeholder="First"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   className="input"
//                 />
//                 <input
//                   type="text"
//                   name="lastName"
//                   placeholder="Last"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   className="input"
//                 />
//               </div>

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="input input-full"
//               />

//               <textarea
//                 name="message"
//                 placeholder="Your message here"
//                 value={formData.message}
//                 onChange={handleChange}
//                 rows="6"
//                 className="textarea"
//               />

//               <div className="checkbox-group">
//                 <input
//                   type="checkbox"
//                   id="notRobot"
//                   className="checkbox"
//                   checked={isHuman}
//                   onChange={handleCheckbox}
//                 />
//                 <label htmlFor="notRobot" className="checkbox-label">I am human</label>
//               </div>

//               <button type="submit" className="submit-btn" disabled={loading}>
//                 {loading ? "Sending..." : (<><Send size={18} /> <span style={{ marginLeft: 8 }}>Send Message</span></>)}
//               </button>
//             </form>
//           </div>

//           <div className="profile-section">
//             <div className="profile-frame">
//               <div className="profile-content">
//                 <img
//                   src={lindsayImage}
//                   alt="Lindsay Adler"
//                   className="profile-image"
//                   onError={(e) => {
//                     e.target.style.display = "none";
//                     const fallback = e.target.nextSibling;
//                     if (fallback) fallback.style.display = "flex";
//                   }}
//                 />
//                 <div className="profile-inner" style={{ display: "none" }}>
//                   <div className="profile-avatar"></div>
//                   <p className="profile-name">Lindsay Adler</p>
//                   <p className="profile-title">Fashion Photographer</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="team-section">
//           <div className="team-grid">
//             {teamMembers.map((member, idx) => (
//               <div className="team-member" key={idx}>
//                 <div className="team-image">
//                   <img
//                     src={member.image}
//                     alt={member.name}
//                     className="team-photo"
//                     onError={(e) => {
//                       e.target.style.display = "none";
//                       const fallback = e.target.nextSibling;
//                       if (fallback) fallback.style.display = "flex";
//                     }}
//                   />
//                   <div className="team-avatar-wrapper" style={{ display: "none" }}>
//                     <div className="team-avatar"></div>
//                     <p className="team-placeholder-name">{member.name}</p>
//                   </div>
//                 </div>
//                 <h3 className="team-name">{member.name}</h3>
//                 <p className="team-role">{member.role}</p>
//                 <a href={`mailto:${member.email}`} className="team-email">{member.email}</a>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>

//       <footer className="footer">
//         <div className="footer-content">
//           <p>© 2025 LINDSAY ADLER PHOTOGRAPHY</p>
//           <p className="footer-credit">Empowered Site by FLOTHEMES</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Instagram, Youtube, Twitter } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import "./contact1.css";

import { sendContactMessage } from "./api";

// Import images
import lindsayImage from "./assets/images/AR2.jpg";
import kathleenImage from "./assets/images/img5.jpg";
import robertImage from "./assets/images/img5.jpg";
import murphyImage from "./assets/images/img5.jpg";
import logoUrl from "./assets/Logo.png";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [isHuman, setIsHuman] = useState(false);
  const [loading, setLoading] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);

  // Scroll behavior for navbar
  useEffect(() => {
    let lastScrollTop = 0;
    const scrollThreshold = 5;

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

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
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Basic email regex
  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => setIsHuman(e.target.checked);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    const { firstName, lastName, email, message } = formData;
    if (!firstName || !lastName || !email || !message) {
      alert("Please fill in all fields");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (!isHuman) {
      alert("Please confirm you are human");
      return;
    }

    try {
      setLoading(true);
      console.log("Submitting contact:", formData);

      const payload = {
        ...formData,
        submittedAt: new Date().toISOString(),
      };

      const response = await sendContactMessage(payload);

      console.log("Server response:", response);
      alert(response.data?.message || "Message sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
      setIsHuman(false);
    } catch (err) {
      console.error("Error submitting contact form:", err);
      const serverMsg =
        err?.response?.data?.error || err?.message || "Server error";
      alert(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  const teamMembers = [
    {
      name: "KATHLEEN",
      role: "Business Administrator",
      email: "kathleen@lindsayadler.com",
      image: kathleenImage,
    },
    {
      name: "ROBERT",
      role: "Brand Manager",
      email: "robert@lindsayadler.com",
      image: robertImage,
    },
    {
      name: "MURPHY",
      role: "Studio Dog Extraordinaire",
      email: "murphy@lindsayadler.com",
      image: murphyImage,
    },
  ];

  return (
    <div className="contact-page">
      <header className={`header ${!headerVisible ? "header-hidden" : ""}`}>
        <div className="header-container">
          <div
            className="logo"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={logoUrl}
              className="logo1"
              alt="Logo"
              style={{ width: "60px", height: "60px" }}
            />
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
            <a href="/services" className="nav-link">
              PACKAGES
            </a>
            <a href="/about" className="nav-link">
              ABOUT
            </a>
            <a href="/contact" className="nav-link active">
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

      <main className="main-content">
        <div className="content-grid">
          <div className="form-section">
            <h1 className="title-main">CONTACT</h1>
            <h2 className="title-sub">ARAVINDH</h2>

            <form className="form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input input-full"
              />

              <textarea
                name="message"
                placeholder="Your message here"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="textarea"
              />

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="notRobot"
                  className="checkbox"
                  checked={isHuman}
                  onChange={handleCheckbox}
                />
                <label htmlFor="notRobot" className="checkbox-label">
                  I Agree
                </label>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={18} />{" "}
                    <span style={{ marginLeft: 8 }}>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="profile-section">
            <div className="profile-frame">
              <div className="profile-content">
                <img
                  src={lindsayImage}
                  alt="Lindsay Adler"
                  className="profile-image"
                  onError={(e) => {
                    e.target.style.display = "none";
                    const fallback = e.target.nextSibling;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div className="profile-inner" style={{ display: "none" }}>
                  <div className="profile-avatar"></div>
                  <p className="profile-name">Lindsay Adler</p>
                  <p className="profile-title">Fashion Photographer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="team-section">
          <div className="team-grid">
            {teamMembers.map((member, idx) => (
              <div className="team-member" key={idx}>
                <div className="team-image">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-photo"
                    onError={(e) => {
                      e.target.style.display = "none";
                      const fallback = e.target.nextSibling;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div
                    className="team-avatar-wrapper"
                    style={{ display: "none" }}
                  >
                    <div className="team-avatar"></div>
                    <p className="team-placeholder-name">{member.name}</p>
                  </div>
                </div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <a href={`mailto:${member.email}`} className="team-email">
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div> */}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 BlackBox Studio. All rights reserved.</p>
          <p>Unauthorized use is prohibited.</p>
        </div>
      </footer>
    </div>
  );
}
