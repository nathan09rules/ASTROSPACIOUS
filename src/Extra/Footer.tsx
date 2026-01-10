import React from 'react';
import "font-awesome/css/font-awesome.min.css";


const Footer: React.FC = () => {
  const styles: Record<string, React.CSSProperties> = {
    footer: {
      background: '#000',
      padding: '30px 0px',
      fontFamily: "'Play', sans-serif",
      textAlign: 'center',
      position: 'relative',
      zIndex: 100,
    },
    row: {
      width: '100%',
      margin: '1% 0%',
      padding: '0.6% 0%',
      color: 'gray',
      fontSize: '0.8em',
    },
    link: {
      textDecoration: 'none',
      color: 'gray',
      transition: '0.5s',
    },
    ul: {
      width: '100%',
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    li: {
      display: 'inline-block',
      margin: '0px 30px',
    },
    icon: {
      fontSize: '2em',
      margin: '0% 1%',
    },
  };

  return (
    <footer>
      <div style={styles.footer}>
        <div style={styles.row}>
          <a
            href="#"
            style={styles.link}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'gray'}
          >
            <i className="fa fa-facebook" style={styles.icon}></i>
          </a>
          <a
            href="#"
            style={styles.link}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'gray'}
          >
            <i className="fa fa-instagram" style={styles.icon}></i>
          </a>
          <a
            href="#"
            style={styles.link}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'gray'}
          >
            <i className="fa fa-envelope" style={styles.icon}></i>
          </a>
          <a
            href="#"
            style={styles.link}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'gray'}
          >
            <i className="fa fa-twitter" style={styles.icon}></i>
          </a>
        </div>

        <div style={styles.row}>
          <ul style={styles.ul}>
            <li style={styles.li}>
              <a
                href="#"
                style={styles.link}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'gray'}
              >
                Contact us
              </a>
            </li>
            <li style={styles.li}>
              <a
                href="#"
                style={styles.link}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'gray'}
              >
                Our Services
              </a>
            </li>
            <li style={styles.li}>
              <a
                href="#"
                style={styles.link}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'gray'}
              >
                Privacy Policy
              </a>
            </li>
            <li style={styles.li}>
              <a
                href="#"
                style={styles.link}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'gray'}
              >
                Terms & Conditions
              </a>
            </li>
            <li style={styles.li}>
              <a
                href="#"
                style={styles.link}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'gray'}
              >
                Career
              </a>
            </li>
          </ul>
        </div>

        <div style={styles.row}>
          ASTROSPACIOUS Copyright © 2021 Inferno - All rights reserved || Designed By: Mahesh
        </div>
      </div>
    </footer>
  );
};

export default Footer;
