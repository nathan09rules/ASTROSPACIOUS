import React, { useState, useEffect } from "react";
import "../css/main.css";

function Nav() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth > 600 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth > 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav>
      <div className="nav-container">
        <a className="navbar-brand" href="#">
          <img src="/logo.jpg" alt="Logo" />
          {isMobile && <span>ASTROSPACIOUS</span>}
        </a>

        <div className="menu-btn" id="menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="nav-links" id="nav-links">
          <a href="/">Home</a>
          <a href="/About">About</a>
          <a href="/Subject">Subject</a>
          <a href="/Select" className="btn">New</a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
