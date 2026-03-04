import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About' },
    { path: '/projects', name: 'Projects' },
    { path: '/contact', name: 'Contact' }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@700&display=swap');

        .nav-link {
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          position: relative;
          padding-bottom: 4px;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1px;
          width: 0%;
          background: linear-gradient(90deg, #1a1a2e, #c9a96e);
          transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .logo-mark {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #1a1a2e;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .logo-mark span {
          color: #c9a96e;
        }

        .logo-mark:hover {
          opacity: 0.75;
        }

        .nav-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          color: #888;
          letter-spacing: 0.03em;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse-dot 2.5s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>

      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: scrolled
          ? 'rgba(255,255,255,0.92)'
          : 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(0,0,0,0.06)'
          : '1px solid rgba(0,0,0,0.04)',
        boxShadow: scrolled
          ? '0 2px 32px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.8) inset'
          : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1.1rem 2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" className="logo-mark">
            EM<span>.</span>
          </Link>

          <ul style={{
            display: 'flex',
            gap: '2.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  style={{
                    color: location.pathname === item.path ? '#1a1a2e' : '#666'
                  }}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-status">
            <span className="status-dot" />
            Available for work
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;