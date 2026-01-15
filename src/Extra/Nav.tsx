import React, { useState, useEffect } from "react";
import "../css/main.css";

type SubjectType = {
  id: string | number;
  name: string;
  url: string;
  subtopics: string[];
};

function Nav() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth > 600 : false
  );

  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [showSubjects, setShowSubjects] = useState(false);

  useEffect(() => {
    let mounted = true;

    fetch('/data/subjects.json')
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.json();
      })
      .then((data: SubjectType[]) => {
        if (mounted) setSubjects(data);
      })
      .catch(err => console.error('Error loading subjects:', err));

    return () => { mounted = false };
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth > 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🟦 CLICK HANDLER — scroll to section on Subject page
  const scrollToSection = (id: string | number) => {
    window.location.href = `/Subject#section-${id}`;
  };

  return (
    <nav>
      <div className="nav-container">
        <a className="navbar-brand" href="#">
          <img src="/logo.jpg" alt="Logo" />
          {isMobile && <span>ASTROSPACIOUS</span>}
        </a>

        <div className="menu-btn" id="menu-btn">
          <span></span><span></span><span></span>
        </div>

        <div className="nav-links" id="nav-links">
          <a href="/">Home</a>
          <a href="/About">About</a>

          {/* HOVER WRAPPER
          <div
            className="subject-wrapper"
            onMouseEnter={() => setShowSubjects(true)}
            onMouseLeave={() => setShowSubjects(false)}
          >

          /*
            <a href="/Subject">Subject</a>

            <div className={`NavSubject ${showSubjects ? "visible" : "hidden"}`}>
              {subjects.map(subject => (
                <p
                  key={subject.id}
                  onClick={() => scrollToSection(subject.id)}
                  className="nav-subtopic"
                >
                  {subject.name}
                </p>
              ))}
            </div>
          </div>
          */}

          <a href="/Select" className="btn">New</a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
