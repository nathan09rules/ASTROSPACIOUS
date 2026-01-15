import { useState, useEffect } from 'react';
import './css/Select.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Topic from "./Topic.tsx";
import Space_bg from './Extra/Space-bg.tsx';

interface TopicCard {
  title: string;
  content: string;
  gradient: string;
  url?: string;
}

function Select() {
  const [activeCard, setActiveCard] = useState(0);
  const [topicCards, setTopicCards] = useState<TopicCard[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/new.json')
      .then(res => res.json())
      .then(data => setTopicCards(data.sunday || []))
      .catch(console.error);
  }, []);

  const redirect = (loc: string) => {
    navigate(loc);
  };

  const handleSaveForLater = () => {
    if (topicCards.length > 0) {
      setActiveCard((prev) => (prev + 1) % topicCards.length);
    }
  };

  if (topicCards.length === 0) {
    return <div className="app-container">Loading...</div>;
  }

  return (
    <main className="app-container">
      <Space_bg />

      <div className="main-content">
        <div className="content-header">
          <h1 className="main-title">Stellar Knowledge Base</h1>
          <p className="main-subtitle">Navigate through the cosmos of knowledge</p>
        </div>

        <div className="cards-stack centered">
          {topicCards.map((card, index) => {
            const offset = index - activeCard;
            const isActive = index === activeCard;

            return (
              <div
                key={index}
                className={`card-wrapper ${isActive ? 'active' : ''}`}
                style={{
                  background: card.gradient, // CHANGE 1: Apply JSON gradient
                  transform: `translateY(${offset * 30}px) scale(${1 - Math.abs(offset) * 0.2}) rotateX(${offset * 2}deg)`,
                  opacity: offset < 0 ? 0 : 1,
                  zIndex: 100 - index,
                  pointerEvents: offset > 2 ? 'none' : 'auto',
                }}
              >
                <div className="select-card">
                  <div className="card-header">
                    <div className="card-number">{index + 1}</div>
                    <h2 className="card-title">{card.title}</h2>
                  </div>
                  <p className="card-contents">{card.content}</p>

                  {isActive && (
                    <div className="card-actions">
                      <button
                        className="btn-primary"
                        onClick={() => redirect('/Topic' + card.url)}
                      >
                        Explore Topic
                      </button>
                      <button
                        className="btn-secondary"
                        onClick={handleSaveForLater}
                      >
                        Save for Later
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="card-nav">
          {topicCards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCard(index)}
              className={`nav-dot ${index === activeCard ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      <Routes>
        <Route path="/Topic/*" element={<Topic />} /> {/* CHANGE 3: Catch-all for dynamic paths */}
      </Routes>
    </main>
  );
}

export default Select;
