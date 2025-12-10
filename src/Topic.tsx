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
  const [collapsed, setCollapsed] = useState(() => true);
  const [subSections, setSubSections] = useState<SubSection[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    /*DATA TO BE ACCESED */
    const url_parts = window.location.pathname.split("/").filter(Boolean);
    const subject = url_parts[1];
    const topic = url_parts[2];
    const jsonPath = `/data/${subject}.json`;

    console.log(subject , topic);

    /*DEV CYCLE CURRENT SUBSECTION*/
    if (["math"].includes(subject)) {
      fetch(jsonPath)
        .then((res) => res.json())
        .then((data) => {
          const section = data["Geometry"];
          if (!section) {
            console.warn("No data found for", jsonPath);
          }else{
            setSubSections(section);
          };
        })
        .catch(console.error);
    } else {
      fetch('/data/data.json')
      .then((res) => res.json())
      .then((data) => setSubSections(data.star))
      .catch(console.error);
    };

    const handleResize = () => {
      if (window.innerWidth > 600) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    };

    handleResize();


    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  useEffect(() => {
  if (!scrollRef.current || subSections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) setActiveSection(index);
        }
      });
    },
    {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // trigger when middle of card is in view
      threshold: 0,
    }
  );

  cardRefs.current.forEach(card => card && observer.observe(card));

  return () => {
    cardRefs.current.forEach(card => card && observer.unobserve(card));
  };
}, [subSections]);
  

const scrollToSection = (i: number) => {
  const card = cardRefs.current[i];
  if (card && scrollRef.current) {
    // Smooth scroll to the card
    scrollRef.current.scrollTo({
      top: card.offsetTop,
      behavior: 'smooth',
    });
    setActiveSection(i); // mark it active immediately
  }
};


  const goPrev = () => activeSection > 0 && scrollToSection(activeSection - 1);
  const goNext = () => activeSection < subSections.length - 1 && scrollToSection(activeSection + 1);

  return (
    <>
      <div className="topic-container">
        <div className="stars-bg">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>

        <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="logo-s">
              <Home size={22} /> Astrospasious
            </div>
            <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          <div className="nav-list">
            {subSections.map((s, i) => (
              <button
                key={s.id}
                /*onClick={() => scrollToSection(i)}*/
                className={`nav-item ${activeSection === i ? 'active' : ''}`}
              >
                <BookOpen size={16} /> {s.title}
              </button>
            ))}
          </div>
        </nav>

        <div className={`main centered ${collapsed ? '' : 'collapsed'}`} ref={scrollRef}>
          {subSections.map((s, i) => (
            <div key={s.id} ref={(el) => { cardRefs.current[i] = el }} className="subject-card">
              <div className="card-num">{i + 1}</div>
              <h2 className="card-title">{s.title}</h2>
              <div className="card-content">
                {s.content.split('\n\n').map((p, j) => (
                  <p key={j} style={{ marginBottom: '16px' }}>{p}</p>
                ))}
              </div>
            </div>
          ))}

          <div className="nav-controls">
            <button onClick={goPrev} disabled={activeSection === 0} className="nav-btn">
              Previous
            </button>
            <button onClick={goNext} disabled={activeSection === subSections.length - 1} className="nav-btn">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topic;
