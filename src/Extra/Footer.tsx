import React from "react";
import { Mail, Phone, Instagram, MessageCircle } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <style>{`
        .footer { margin-top:50px; height:300px; padding:50px; background-color:#0a0e27; text-align:center; z-index:2}
        .links a { margin:10px; color:white; }
        .links { margin:20px; }
      `}</style>
      <h1>Get in Touch!</h1>
      <div className="links">
        <a href="https://wa.me/YOUR_NUMBER" target="_blank" rel="noopener noreferrer"><MessageCircle size={60} /></a>
        <a href="mailto:youremail@example.com"><Mail size={60} /></a>
        <a href="tel:+1234567890"><Phone size={60} /></a>
        <a href="https://instagram.com/YOUR_USERNAME" target="_blank" rel="noopener noreferrer">
          <Instagram size={60} />
        </a>
      </div>
      <p>© 2024 ASTROSPACIOUS. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
