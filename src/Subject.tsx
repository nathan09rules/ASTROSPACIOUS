import React, { useEffect, useState } from 'react';
import Space_bg from './Extra/Space-bg.tsx';

import './css/Subject.css';
import './css/base.css';

type SubjectType = {
  id: string | number;
  name: string;
  url: string;
  subtopics: string[];
};

export function Subject() {
  const [subjects, setSubjects] = useState<SubjectType[]>([]);

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
      .catch(err => {
        console.error('Error loading subjects:', err);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubjectClick = (url: string) => {
    window.location.href = url;
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [subjects]);

  return (
    <main>
      <header className='subject-header'>
        <h1 className='gradient-text centered'>ASTROSPACIOUS</h1>
        <p className='subtitle centered'>Exploring Knowledge Beyond Limits</p>
      </header>

      <div className='margin-vertical' />

      {subjects.map(subject => (
        <section
          key={subject.id}
          id={`section-${subject.id}`}
          className={`subject-section black`}
        >
          <h2 className='subject-name gradient centered'>{subject.name}</h2>
          <div className='margin-vertical' />
          <div className='subtopics'>
            {subject.subtopics.map((topic, idx) => (
              <div
                key={idx}
                onClick={() => handleSubjectClick(subject.url + '/' + topic)}
                className='subtopic-card centered glow glow-hover'
              >
                {topic}
              </div>
            ))}
          </div>
          <div className='margin-vertical' /><br />
        </section>
      ))}
      <Space_bg></Space_bg>
    </main>
  );
}

export default Subject;
