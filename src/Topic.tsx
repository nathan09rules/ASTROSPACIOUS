import { useState, useRef, useEffect } from 'react';
import { Home, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

import './css/Topic.css';
import './css/base.css';

import Space_bg from './Extra/Space-bg.tsx';

interface SubSection {
  id: string;
  title: string;
  content: string; // now supports HTML with formatting and images
}

const Topic = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [collapsed, setCollapsed] = useState(true);
  const [subSections, setSubSections] = useState<SubSection[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const url_parts = window.location.pathname.split("/").filter(Boolean);
    const subject = url_parts[1] || "default";
    const topic = url_parts[2] || "default";

    // Construct Worker KV fetch URL with subdomain-style key
    const workerUrl = `https://astrospacious.dsouzanathan09.workers.dev/?topic=${subject}/${topic}`;

    fetch(workerUrl)
      .then(res => {
        if (!res.ok) throw new Error("KV JSON not found");
        return res.json();
      })
      .catch(() => {
        console.warn("Falling back to default topic from KV");
        return fetch(`https://astrospacious.dsouzanathan09.workers.dev/?topic=default`)
          .then(res => res.json());
      })
      .then(data => {
        const section = data.sections;
        if (!section) console.warn("No data found in KV for", workerUrl);
        else setSubSections(section);
      })
      .catch(console.error);

    const handleResize = () => setCollapsed(window.innerWidth <= 600);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    if (!scrollRef.current || subSections.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { root: null, rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    cardRefs.current.forEach(card => card && observer.observe(card));
    return () => cardRefs.current.forEach(card => card && observer.unobserve(card));
  }, [subSections]);

  const scrollToSection = (i: number) => {
    const card = cardRefs.current[i];
    if (card && scrollRef.current) {
      scrollRef.current.scrollTo({ top: card.offsetTop, behavior: 'smooth' });
      setActiveSection(i);
    }
  };

  const goPrev = () => activeSection > 0 && scrollToSection(activeSection - 1);
  const goNext = () => activeSection < subSections.length - 1 && scrollToSection(activeSection + 1);

  return (
    <div className="topic-container">
      <Space_bg />
      <div className="stars-bg">
        {[...Array(80)].map((_, i) => (
          <div key={i} className="star" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }} />
        ))}
      </div>

      <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-s"><Home size={22} /> Astrospasious</div>
          <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <div className="nav-list">
          {subSections.map((s, i) => (
            <button
              key={s.id}
              className={`nav-item ${activeSection === i ? 'active' : ''}`}
              onClick={() => scrollToSection(i)}
            >
              <BookOpen size={16} /> {s.title}
            </button>
          ))}
        </div>
      </nav>


      <div className={`main centered ${collapsed ? '' : 'collapsed'}`} ref={scrollRef}>
        {subSections.map((s, i) => (
          <div key={s.id} className="subject-card" ref={(el) => { if (el) cardRefs.current[i] = el;}}>
            <div className="header-row">
              <div className="card-num">{i + 1}</div>
              <h2 className="card-title centered">{s.title}</h2>
            </div>

            <div className="card-content" dangerouslySetInnerHTML={{ __html: s.content }} />
          </div>
        ))}

        <div className="nav-controls">
          <button onClick={goPrev} disabled={activeSection === 0} className="nav-btn">Previous</button>
          <button onClick={goNext} disabled={activeSection === subSections.length - 1} className="nav-btn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Topic;
