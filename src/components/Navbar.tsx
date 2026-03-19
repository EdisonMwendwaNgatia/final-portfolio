import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

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
          white-space: nowrap;
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

        /* Hamburger menu styles */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 24px;
          height: 18px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1002;
        }

        .hamburger-line {
          width: 100%;
          height: 2px;
          background: #1a1a2e;
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .hamburger-line.open:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        .hamburger-line.open:nth-child(2) {
          opacity: 0;
        }

        .hamburger-line.open:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        /* Mobile menu overlay */
        .mobile-menu-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.4s ease;
          padding: 5rem 2rem 2rem;
          overflow-y: auto;
        }

        .mobile-menu-overlay.open {
          opacity: 1;
          visibility: visible;
        }

        .mobile-nav-items {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          margin-top: 2rem;
        }

        .mobile-nav-link {
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #666;
          transition: color 0.3s ease;
          position: relative;
        }

        .mobile-nav-link.active {
          color: #1a1a2e;
        }

        .mobile-nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, #1a1a2e, #c9a96e);
          transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-nav-link.active::after,
        .mobile-nav-link:hover::after {
          width: 100%;
        }

        .mobile-status {
          margin-top: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          color: #888;
        }

        /* Media queries */
        @media (max-width: 768px) {
          .desktop-nav-items {
            display: none !important;
          }
          
          .desktop-status {
            display: none !important;
          }
          
          .hamburger {
            display: flex;
          }
          
          .mobile-menu-overlay {
            display: block;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu-overlay {
            display: none !important;
          }
        }

        /* Small mobile devices */
        @media (max-width: 480px) {
          .logo-mark {
            font-size: 1.2rem;
          }
          
          .nav-link {
            font-size: 0.8rem;
          }
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
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" className="logo-mark" onClick={() => setMobileMenuOpen(false)}>
            EM<span>.</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="desktop-nav-items" style={{
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

          {/* Desktop Status */}
          <div className="nav-status desktop-status">
            <span className="status-dot" />
            Available for work
          </div>

          {/* Hamburger Button */}
          <button 
            className="hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-items">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="mobile-status">
          <span className="status-dot" />
          Available for work
        </div>
      </div>
    </>
  );
};

export default Navbar;