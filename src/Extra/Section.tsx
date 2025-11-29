import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, BookOpen } from 'lucide-react';
import "./css/Section.css"
// Define the structure for our data
interface SubSection {
  id: string;
  title: string;
  content: string;
}

declare global {
interface Window {
  fs: {
    readFile: (filename: string, options: { encoding: string }) => Promise<string>;
  };
}
}


interface TopicData {
  title: string;
  subSections: SubSection[];
}

const Topic = () => {
  // State management
  const [activeSection, setActiveSection] = useState(0);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [topicData, setTopicData] = useState<TopicData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');
  
  // Refs for scroll functionality
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const isScrollingRef = useRef(false);

  // Function to load topic from JSON file
  const loadTopic = async (topicName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Convert input to lowercase and create filename
      // Example: "ASTROSPACIOUS" or "astrospacious" becomes "astrospacious.json"
      const filename = `${topicName.toLowerCase()}.json`;
      
      // Try to read the file using window.fs.readFile
      const fileData = await window.fs.readFile(filename, { encoding: 'utf8' });
      
      // Parse the JSON data
      const parsedData: TopicData = JSON.parse(fileData);
      
      // Set the topic data
      setTopicData(parsedData);
      setActiveSection(0);
      
      // Reset scroll position
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      
    } catch (err) {
      console.error('Error loading topic:', err);
      setError(`Could not load topic "${topicName}". Make sure ${topicName.toLowerCase()}.json exists.`);
    } finally {
      setLoading(false);
    }
  };

  // Handle search button click
  const handleSearch = () => {
    if (searchInput.trim()) {
      loadTopic(searchInput.trim());
    }
  };

  // Handle Enter key in input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Scroll to a specific section
  const scrollToSection = (index: number) => {
    const card = cardsRef.current[index];
    if (card && scrollContainerRef.current) {
      isScrollingRef.current = true;
      const container = scrollContainerRef.current;
      const cardTop = card.offsetTop;
      const containerHeight = container.clientHeight;
      const scrollTo = cardTop - containerHeight * 0.15;
      
      container.scrollTo({
        top: scrollTo,
        behavior: 'smooth'
      });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  // Update active section based on scroll position
  const updateActiveSection = () => {
    if (isScrollingRef.current || !scrollContainerRef.current || !topicData) return;

    const container = scrollContainerRef.current;
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const threshold = containerHeight * 0.3;

    for (let i = cardsRef.current.length - 1; i >= 0; i--) {
      const card = cardsRef.current[i];
      if (card) {
        const cardTop = card.offsetTop;
        if (scrollTop >= cardTop - threshold) {
          setActiveSection(i);
          break;
        }
      }
    }
  };

  // Handle scroll events
  const handleScroll = () => {
    requestAnimationFrame(updateActiveSection);
  };

  // Navigation functions
  const goToNext = () => {
    if (topicData && activeSection < topicData.subSections.length - 1) {
      scrollToSection(activeSection + 1);
    }
  };

  const goToPrevious = () => {
    if (activeSection > 0) {
      scrollToSection(activeSection - 1);
    }
  };

  // Set up scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [topicData]);

  return (
    <>

      <div className="topic-container">
        {/* Navigation Sidebar */}
        <nav className={`sidebar ${isNavCollapsed ? 'collapsed' : 'expanded'}`}>
          <div className="sidebar-header">
            <div className="logo-container">
              <Home size={24} className="logo-icon" />
              {!isNavCollapsed && <span className="logo-text">Astrospasious</span>}
            </div>
            <button 
              onClick={() => setIsNavCollapsed(!isNavCollapsed)}
              className="collapse-btn"
            >
              {isNavCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          {/* Search Section */}
          {!isNavCollapsed && (
            <div className="search-section">
              <div className="search-container">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter topic name..."
                  className="search-input"
                />
                <button onClick={handleSearch} className="search-btn" disabled={loading}>
                  {loading ? 'Loading...' : 'Load'}
                </button>
              </div>
            </div>
          )}

          {topicData && (
            <>
              <div className="topic-header">
                <BookOpen size={20} className="topic-icon" />
                {!isNavCollapsed && <h2 className="topic-title">{topicData.title}</h2>}
              </div>

              <div className="nav-list">
                {topicData.subSections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(index)}
                    className={`nav-item ${activeSection === index ? 'active' : ''}`}
                  >
                    <span className="nav-number">{index + 1}</span>
                    {!isNavCollapsed && <span className="nav-title">{section.title}</span>}
                  </button>
                ))}
              </div>
            </>
          )}
        </nav>

        {/* Main Content Area */}
        <div className={`main-content ${isNavCollapsed ? 'collapsed' : 'expanded'}`}>
          <div className="scroll-container" ref={scrollContainerRef}>
            {error && (
              <div className="error-message">{error}</div>
            )}
            
            {loading && (
              <div className="loading-message">Loading topic data...</div>
            )}

            {!topicData && !loading && !error && (
              <div className="empty-state">
                <h2>Welcome to Topic Viewer</h2>
                <p>
                  Enter a topic name (like "astrospacious") in the search box above to load content.
                  Make sure the corresponding JSON file exists in your files.
                </p>
              </div>
            )}

            {topicData && !loading && (
              <div className="cards-wrapper">
                {topicData.subSections.map((section, index) => (
                  <div
                    key={section.id}
                    ref={(el) => {
                      if (el) cardsRef.current[index] = el;
                    }}
                    className="card"
                  >
                    <div className="card-header">
                      <span className="card-number">{index + 1}</span>
                      <h2 className="card-title">{section.title}</h2>
                    </div>
                    <div className="card-content">
                      {section.content.split('\n\n').map((paragraph, pIndex) => (
                        <p key={pIndex} className="paragraph">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="spacer" />
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          {topicData && (
            <div className="nav-buttons">
              <button
                onClick={goToPrevious}
                disabled={activeSection === 0}
                className="nav-btn"
              >
                <ChevronLeft size={20} />
                <span>Previous</span>
              </button>
              <span className="page-indicator">
                {activeSection + 1} / {topicData.subSections.length}
              </span>
              <button
                onClick={goToNext}
                disabled={activeSection === topicData.subSections.length - 1}
                className="nav-btn"
              >
                <span>Next</span>
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Topic;