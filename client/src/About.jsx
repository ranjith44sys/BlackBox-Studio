import React, { useState, useEffect } from "react";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import "./About1.css";

// Import images - place your images in src/assets/images/
import profileImage from "./assets/images/AR1.jpg";
import book1 from "./assets/images/img5.jpg";
import book2 from "./assets/images/img5.jpg";
import book3 from "./assets/images/img5.jpg";
import book4 from "./assets/images/img5.jpg";
import book5 from "./assets/images/img5.jpg";
import black from "./assets/Logo.png";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at top
        setIsVisible(true);
      } else {
        // Scrolling down
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const books = [
    { id: 1, image: book1, alt: "Book 1" },
    { id: 2, image: book2, alt: "Book 2" },
    { id: 3, image: book3, alt: "Book 3" },
    { id: 4, image: book4, alt: "Book 4" },
    { id: 5, image: book5, alt: "Book 5" },
  ];

  const bookLinks = [
    { text: "Photography Companion Series", url: "#" },
    { text: "The Posing Playbook", url: "#" },
    { text: "Dramatic Poise A Light", url: "#" },
    { text: "Fashion Flair for Portrait and Fashion Photography", url: "#" },
    { text: "Lindsay Adler's Studio Lighting Guide", url: "#" },
  ];

  const editorials = [
    { name: "marie claire", logo: "PHOTOSHOP" },
    { name: "L'OFFICIEL", logo: "PREMERPRO" },
    { name: "Numéro", logo: "AFTEREFFECTS" },
    { name: "ELLE", logo: "BLENDER" },
    { name: "VANITY FAIR", logo: "SMARTALBUMS" },
    { name: "BAZAAR", logo: "DA VINCI" },
  ];

  return (
    <div className="about-page">
      {/* Header */}
      <header
        className={`header ${isVisible ? "header-visible" : "header-hidden"}`}
      >
        <div className="header-container">
          <div
            className="logo"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={black}
              className="logo1"
              alt="Logo"
              style={{ width: "60px", height: "60px", margin: "0px" }}
            ></img>
            BLACK
            <br />
            BOX
          </div>
          <nav className="nav">
            {/* <a href="#" className="nav-link">PORTFOLIO</a> */}
            <a href="/" className="nav-link">
              HOME
            </a>
            <a href="/Gallery" className="nav-link">
              GALLERY
            </a>
            <a href="/services" className="nav-link ">
              PACKAGES
            </a>
            <a href="/about" className="nav-link active">
              ABOUT
            </a>
            <a href="/contact" className="nav-link">
              CONTACT
            </a>
          </nav>
          <div className="social-icons">
            {/* <a href="#" className="social-link"><Facebook size={16} /></a> */}
            <a href="#" className="social-link">
              <Instagram size={16} />
            </a>
            <a href="https://wa.me/6374109624" className="social-link">
              <FaWhatsapp size={16} />
            </a>

            <a href="#" className="social-link">
              <Youtube size={16} />
            </a>
            {/* <a href="#" className="social-link"><FaWhatsapp className='iconw' /></a> */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              PHOTOGRAPHER,
              <br />
              STORYTELLER,
              <br />
              AND
              <br />
              WEDDING FLIMS
            </h1>
            <p className="hero-text">
              Aravindh, I am a fashion photographer and Videographer based in
              TamilNadu .I am a passionate photographer dedicated to capturing
              meaningful moments through the lens. I specialize in transforming
              everyday scenes into stunning visual stories that evoke emotions
              and preserve memories. With expertise in portrait, wedding,
              commercial, and creative photography, I focus on lighting,
              composition, and detail to deliver high-quality results. My goal
              is not just to take photos — but to create timeless images that
              speak for themselves and connect with people on a deeper level.
            </p>
            {/* <p className="hero-text">
              Lindsay has written five books on photography and lighting. She is
              a Nikon Ambassador, and has created educational content for
              platforms like KelbyOne and CreativeLive.
            </p> */}
          </div>
          <div className="hero-image-wrapper">
            <div className="hero-image-frame">
              <img
                src={profileImage}
                alt="Lindsay Adler"
                className="hero-image"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.classList.add("placeholder");
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section">
        <div className="video-container">
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Lindsay Adler Photography Reel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-iframe"
            ></iframe>
          </div>
          <div className="video-info">
            <p className="video-source">
              Watch on <span className="youtube-text">YouTube</span>
            </p>
          </div>
        </div>
      </section>

      {/* Editorials Section */}
      <section className="editorials-section">
        <h2 className="editorials-title">EDTITING TOOLS</h2>
        <div className="editorials-grid">
          {editorials.map((editorial, index) => (
            <div key={index} className="editorial-item">
              <span className="editorial-logo">{editorial.logo}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 BlackBox Studio. All rights reserved.</p>
          <p>Unauthorized use is prohibited.</p>
        </div>
      </footer>
    </div>
  );
}
