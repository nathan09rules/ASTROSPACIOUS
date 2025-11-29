import React, { useState, useEffect, useRef } from 'react';
import Space_bg from './Extra/Space-bg.tsx';

import './css/Home.css';
import './css/base.css';  

// The original ShowcaseItem component, updated with classNames
const ShowcaseItem = ({ title, description, gradient }) => (
  <div className="showcaseItem">
    <div className="showcaseGradient" style={{ background: gradient }} />
    <h3 className="showcaseTitle">{title}</h3>
    <p className="showcaseDescription">{description}</p>
  </div>
);

// The original FeatureCard component, updated with classNames
// Not used in Home component, but included for completeness
const FeatureCard = ({ icon, title, description }) => (
  <div className="featureCard">
    <div className="featureIcon">{icon}</div>
    <h3 className="featureTitle">{title}</h3>
    <p className="featureDescription">{description}</p>
  </div>
);


const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef(null);
  const heroCanvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero section space background with nebulae (UNMODIFIED JS LOGIC)
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate stars
    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.01
    }));

    // Generate nebulae
    const nebulae = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 300 + 200,
      color: ['rgba(139, 92, 246, 0.15)', 'rgba(6, 182, 212, 0.12)', 'rgba(236, 72, 153, 0.1)'][Math.floor(Math.random() * 3)],
      drift: { x: (Math.random() - 0.5) * 0.1, y: (Math.random() - 0.5) * 0.1 }
    }));

    let animationFrame;
    const animate = () => {
      ctx.fillStyle = 'rgb(5, 8, 20)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebulae
      nebulae.forEach(nebula => {
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        );
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        nebula.x += nebula.drift.x;
        nebula.y += nebula.drift.y;
        
        if (nebula.x < -nebula.radius) nebula.x = canvas.width + nebula.radius;
        if (nebula.x > canvas.width + nebula.radius) nebula.x = -nebula.radius;
        if (nebula.y < -nebula.radius) nebula.y = canvas.height + nebula.radius;
        if (nebula.y > canvas.height + nebula.radius) nebula.y = -nebula.radius;
      });
      
      // Draw stars
      stars.forEach(star => {
        star.opacity += (Math.random() - 0.5) * star.twinkleSpeed;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Background stars for scrolling sections (UNMODIFIED JS LOGIC)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random() * 0.5 + 0.3
    }));

    const drawStars = () => {
      ctx.fillStyle = 'rgb(10, 15, 35)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
    };

    drawStars();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
      drawStars();
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 800);
  const scale = Math.max(0.8, 1 - scrollY / 2000);
  const translateY = scrollY * 0.5;

  return (
    <main className="container">
      <canvas ref={canvasRef} className="backgroundCanvas" />
      {/* Hero Section */}
      <section className="hero">
        <canvas ref={heroCanvasRef} className="heroCanvas" />
        <div 
          className="heroContent"
          style={{ // Inline styles needed for dynamic scrolling effects
            opacity,
            transform: `scale(${scale}) translateY(${translateY}px)`
          }}
        >
          <div className="logoContainer">
            <img className='logo-text' src="astrospacious.png"></img>
          </div>
          <p className="heroSubtitle">Explore the Universe Within</p>
          <div className="heroTagline">
            Where cosmic wonder meets infinite learning
          </div>
        </div>
    </section>

      {/* Introduction Section */}
      <section className="introSection">
        {/* Content goes here */}
      </section>

      {/* Features Showcase */}
      <section className="showcaseSection">
        <div className="contentWrapper">
          <h2 className="sectionTitle gradient-text centered">Why Choose ASTROSPACIOUS</h2>
          <div className="showcaseGrid">
            <ShowcaseItem 
              title="Visual Excellence"
              description="Excellet writing , visuals and explainations to make learning engaging"
              gradient="#8b5cf6"
            />
            <ShowcaseItem 
              title="Interactive Discovery"
              description="Engage with content through student driven exploration"
              gradient="#06b6d4"
            />
            <ShowcaseItem 
              title="Seamless Experience"
              description="Navigate through sources easily"
              gradient=" #ec4899"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="finalCTA">
        <div className="ctaContent">
          <h2 className="ctaTitle gradient textclip">Ready to Explore?</h2>
          <p className="ctaSubtitle">
            Your journey through the universe of knowledge begins now
          </p>
          <button 
            className="ctaButtonLarge gradient"
            onClick={() => window.location.href = '/Subject'}
            // Keep dynamic onMouseEnter/onMouseLeave logic as inline event handlers
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 25px 70px rgba(139, 92, 246, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 15px 50px rgba(139, 92, 246, 0.5)';
            }}
          >
            Start Exploring
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;