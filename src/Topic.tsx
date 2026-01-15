import { useState, useRef, useEffect } from 'react';
import { Home, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

import './css/Topic.css';
import './css/base.css';

interface SubSection {
  id: string;
  title: string;
  content: string;
}

const Topic = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [collapsed, setCollapsed] = useState(window.innerWidth < 900); // Initial check
  const [subSections, setSubSections] = useState<SubSection[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  // --- NEW: Resize Listener for Auto-Collapse ---
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const url_parts = window.location.pathname.split("/").filter(Boolean);
    let [subject, topic] = url_parts.slice(-2);
    const cleanTopic = topic.replace('.json', '');
    const jsonPath = `/data/${subject}/${cleanTopic}.json`;

    fetch(jsonPath)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: any) => {
        if (!data.sections) throw new Error("Missing sections field");
        setSubSections(data.sections);
      })
      .catch(err => {
        setSubSections([{
          id: "error",
          title: "Content Not Found",
          content: `<p>Could not load <code>${jsonPath}</code></p><p>Error: ${err.message}</p>`
        }]);
      });
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
      // Auto-collapse sidebar on mobile after clicking a link
      if (window.innerWidth < 900) setCollapsed(true);
    }
  };

  const goPrev = () => activeSection > 0 && scrollToSection(activeSection - 1);
  const goNext = () => activeSection < subSections.length - 1 && scrollToSection(activeSection + 1);

  return (
    <main>
      <div className="topic-container">
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
              <div className="card-contents" dangerouslySetInnerHTML={{ __html: s.content }} />
            </div>
          ))}

          <div className="nav-controls">
            <button onClick={goPrev} disabled={activeSection === 0} className="nav-btn">Previous</button>
            <button onClick={goNext} disabled={activeSection === subSections.length - 1} className="nav-btn">Next</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Topic;