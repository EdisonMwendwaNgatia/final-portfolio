import React, { useEffect, useRef, useState } from 'react';

/* ── Intersection observer hook ── */
const useInView = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
};

const FadeUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, style }) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style
      }}
    >
      {children}
    </div>
  );
};

/* ── Data ── */
const projects = [
  {
    title: 'BLOCKHOUSE KENYA',
    description: 'Blockchain-based property registry system presented to the President of Kenya. Provides immutable ownership records and tamper-proof asset transfer mechanisms, eliminating fraud inherent in centralized paper-based land administration systems. Built on Ethereum smart contracts with Truffle suite.',
    technologies: ['React', 'Node.js', 'Solidity', 'Truffle', 'Ganache', 'MetaMask'],
    year: '2025',
    imageUrl: 'https://i.pinimg.com/736x/6f/8c/fe/6f8cfe905f15ffbbaaa56b1c77952866.jpg',
    githubUrl: 'https://github.com/NgatiaEdison/BLOCKHOUSE_KE',
    featured: true
  },
  {
    title: 'NCPB HelpDesk System',
    description: 'Enterprise ticketing system deployed at National Cereals and Produce Board headquarters. Enables comprehensive issue tracking with ticket creation, assignment routing, status monitoring, escalation workflows, and closure reporting. Streamlines internal support operations across departments.',
    technologies: ['React', 'Node.js', 'Firebase', 'Express.js'],
    year: '2025',
    imageUrl: 'https://i.pinimg.com/736x/1c/0c/8f/1c0c8f87d54e6968a8116c9e5d099e55.jpg',
    githubUrl: 'https://github.com/EdisonMwendwaNgatia/HelpDesk-Command-Centre',
  },
  {
    title: 'WomenSafety',
    description: 'Mobile safety application that detects distress events via accelerometer-based shake detection or manual panic trigger. Captures precise GPS coordinates through Android Location API and broadcasts immediate alerts to configured emergency contacts. Notifications include real-time location data with Google Maps deep links for rapid response coordination.',
    technologies: ['Kotlin', 'Android Location API', 'SMS Gateway', 'Push Notifications'],
    year: '2023',
    imageUrl: 'https://i.pinimg.com/736x/96/08/03/96080379c0326bbd12a08b06c2dc175c.jpg',
    githubUrl: 'https://github.com/EdisonMwendwaNgatia/WomenSafetyKT'
  },
  {
    title: 'UMMA Visitors Management System',
    description: 'Comprehensive visitor registration portal for institutional premises security. Manages check-in/check-out workflows with real-time tracking, automated overstay detection via push notifications, and comprehensive reporting suite. Features role-based access control for administrative users and complete audit logging.',
    technologies: ['TypeScript', 'React', 'Firebase', 'Push Notifications'],
    year: '2025',
    imageUrl: 'https://i.pinimg.com/736x/f6/9d/b9/f69db9cc0722d401cfcd6cea9c78b81d.jpg',
    githubUrl: 'https://github.com/EdisonMwendwaNgatia/umma-visitor-app'
  },
  {
    title: 'Glowscan',
    description: 'AI-powered dermatological analysis platform that performs real-time facial skin assessment. Leverages on-device ML Kit and cloud-based TensorFlow models for multi-class skin type classification, concern detection (acne, pigmentation, wrinkles), and personalized product regimen recommendations. Implements hybrid inference architecture for offline capability.',
    technologies: ['Kotlin', 'ML Kit', 'TensorFlow Lite', 'face-api.js', 'Node.js'],
    year: '2025',
    imageUrl: 'https://i.pinimg.com/1200x/7c/e5/14/7ce514e5896c70ba7ea911374a82835e.jpg',
    githubUrl: 'https://github.com/EdisonMwendwaNgatia/Glowscan'
  },
  {
    title: 'Tvee E-commerce Platform',
    description: 'Full-featured digital commerce solution for retail operations. Implements product catalog management, secure shopping cart with5persistent wishlist functionality, and streamlined checkout processing. Administrative dashboard provides inventory oversight, order management, and sales analytics. Built with modern Next.js architecture and Supabase backend.',
    technologies: ['React', 'Next.js', 'Supabase', 'Payment Gateway Integration', 'REST APIs'],
    year: '2026',
    imageUrl: 'https://i.pinimg.com/736x/f7/27/e0/f727e0fac6dd17186bab055994495524.jpg',
    githubUrl: 'https://github.com/EdisonMwendwaNgatia/Ecommerce-Store'
  }
];

const Projects: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  const featured = projects.find(p => p.featured)!;
  const rest = projects.filter(p => !p.featured);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');

        :root {
          --gold: #c9a96e;
          --dark: #1a1a2e;
          --grey: #666;
          --border: rgba(0,0,0,0.07);
          --card-bg: rgba(255,255,255,0.84);
        }

        .projects-page {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: linear-gradient(160deg, #ffffff 0%, #fafafa 55%, #f9f7f4 100%);
          position: relative;
          overflow-x: hidden;
        }

        .serif { font-family: 'Playfair Display', serif; }

        .s-label {
          display: flex; align-items: center; gap: 12px; margin-bottom: 1.4rem;
        }
        .s-label-line { width: 28px; height: 1px; background: var(--gold); flex-shrink: 0; }
        .s-label-text {
          font-size: 0.72rem; font-weight: 500;
          letter-spacing: 0.13em; text-transform: uppercase; color: var(--gold);
        }

        .gold-div {
          width: 48px; height: 1px;
          background: linear-gradient(90deg, var(--gold), transparent);
          margin: 1.4rem 0;
        }

        /* ── Featured card ── */
        .featured-card {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          border-radius: 8px;
          overflow: hidden;
          background: var(--card-bg);
          border: 1px solid var(--border);
          box-shadow: 0 8px 60px rgba(0,0,0,0.07);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: box-shadow 0.4s ease, transform 0.4s ease;
        }
        .featured-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 80px rgba(0,0,0,0.11);
        }

        .featured-img-wrap {
          position: relative;
          overflow: hidden;
          min-height: 380px;
        }
        .featured-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
          display: block;
        }
        .featured-card:hover .featured-img-wrap img { transform: scale(1.04); }

        .featured-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(26,26,46,0.15) 0%, transparent 60%);
        }

        .featured-badge {
          position: absolute; top: 18px; left: 18px;
          font-size: 0.67rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #fff;
          background: var(--dark);
          padding: 0.28rem 0.8rem;
          border-radius: 2px;
        }

        .featured-body {
          padding: 2.8rem 3rem;
          display: flex; flex-direction: column; justify-content: center;
        }

        /* ── Grid cards ── */
        .proj-card {
          display: flex; flex-direction: column;
          border-radius: 6px; overflow: hidden;
          background: var(--card-bg);
          border: 1px solid var(--border);
          box-shadow: 0 4px 32px rgba(0,0,0,0.04);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: transform 0.4s cubic-bezier(0.2,0,0,1), box-shadow 0.4s ease;
          height: 100%;
        }
        .proj-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 24px 64px rgba(0,0,0,0.1);
        }

        .proj-img-wrap {
          width: 100%; height: 210px;
          overflow: hidden; position: relative; flex-shrink: 0;
        }
        .proj-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.65s ease;
          display: block;
        }
        .proj-card:hover .proj-img-wrap img { transform: scale(1.06); }

        .proj-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 45%, rgba(26,26,46,0.18) 100%);
        }

        .proj-body {
          padding: 1.6rem 1.8rem 2rem;
          flex: 1; display: flex; flex-direction: column;
        }

        .proj-year {
          font-size: 0.74rem; font-weight: 500;
          color: var(--gold); letter-spacing: 0.08em;
          margin-bottom: 0.5rem; display: block;
        }

        /* ── Tech pills ── */
        .tech-pill {
          display: inline-block;
          font-size: 0.72rem; font-weight: 500;
          letter-spacing: 0.03em; color: var(--dark);
          border: 1px solid var(--border);
          padding: 0.3rem 0.75rem;
          border-radius: 2px;
          background: rgba(255,255,255,0.75);
          transition: border-color 0.2s;
        }
        .tech-pill:hover { border-color: var(--gold); }

        /* ── GitHub button ── */
        .gh-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; font-weight: 500;
          letter-spacing: 0.05em; text-transform: uppercase;
          color: var(--dark);
          text-decoration: none;
          border: 1px solid rgba(26,26,46,0.15);
          padding: 0.65rem 1.4rem;
          border-radius: 3px;
          background: rgba(255,255,255,0.6);
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
          width: fit-content;
          margin-top: auto;
        }
        .gh-btn:hover {
          border-color: var(--gold);
          background: rgba(201,169,110,0.06);
          transform: translateY(-1px);
        }

        /* ── Featured GH btn ── */
        .gh-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: #fff;
          text-decoration: none;
          background: var(--dark);
          padding: 0.85rem 2rem;
          border-radius: 3px;
          border: 1px solid transparent;
          transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
          width: fit-content;
        }
        .gh-btn-primary:hover {
          background: #2d2d4e;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(26,26,46,0.18);
        }

        /* ── Filter tabs ── */
        .filter-tab {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 0.5rem 1.4rem;
          border-radius: 2px;
          border: 1px solid var(--border);
          background: transparent;
          cursor: pointer;
          transition: all 0.25s ease;
          color: #aaa;
        }
        .filter-tab.active {
          background: var(--dark);
          color: #fff;
          border-color: var(--dark);
        }
        .filter-tab:not(.active):hover {
          border-color: var(--gold);
          color: var(--dark);
        }

        /* ── Bottom accent line on hover ── */
        .proj-accent-line {
          height: 2px;
          transition: background 0.4s ease;
        }

        @media (max-width: 900px) {
          .featured-card { grid-template-columns: 1fr !important; }
          .featured-img-wrap { min-height: 240px !important; }
          .proj-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .proj-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="projects-page">

        {/* Background orbs */}
        <div style={{
          position:'absolute', top:'5%', right:'-100px',
          width:'500px', height:'500px', borderRadius:'50%',
          background:'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)',
          filter:'blur(50px)', pointerEvents:'none'
        }}/>
        <div style={{
          position:'absolute', bottom:'10%', left:'-80px',
          width:'380px', height:'380px', borderRadius:'50%',
          background:'radial-gradient(circle, rgba(26,26,46,0.04) 0%, transparent 70%)',
          filter:'blur(50px)', pointerEvents:'none'
        }}/>
        {/* Top accent line */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:'2px',
          background:'linear-gradient(90deg, transparent 0%, #c9a96e 50%, transparent 100%)',
          opacity:0.5
        }}/>

        <div style={{ maxWidth:'1140px', margin:'0 auto', padding:'5rem 2.5rem 7rem' }}>

          {/* ════ PAGE HEADER ════ */}
          <FadeUp>
            <div className="s-label">
              <div className="s-label-line"/>
              <span className="s-label-text">Portfolio</span>
            </div>
            <h1 className="serif" style={{
              fontSize:'clamp(2.8rem,5vw,4.8rem)',
              fontWeight:700, color:'#1a1a2e',
              lineHeight:1.05, letterSpacing:'-0.02em',
              marginBottom:'0.4rem'
            }}>
              My Projects
            </h1>
            <p className="serif" style={{
              fontSize:'clamp(1rem,2vw,1.45rem)',
              fontStyle:'italic', color:'#aaa', fontWeight:400, margin:0
            }}>
              From university labs to the highest office
            </p>
          </FadeUp>

          {/* ════ FEATURED PROJECT ════ */}
          <FadeUp delay={0.1} style={{ marginTop:'4rem' }}>
            <div className="s-label">
              <div className="s-label-line"/>
              <span className="s-label-text">Featured Work</span>
            </div>

            <div className="featured-card">
              {/* Large image */}
              <div className="featured-img-wrap">
                <img src={featured.imageUrl} alt={featured.title} />
                <div className="featured-img-overlay"/>
                <span className="featured-badge">Featured</span>
              </div>

              {/* Body */}
              <div className="featured-body">
                <span style={{
                  fontSize:'0.74rem', fontWeight:500,
                  color:'var(--gold)', letterSpacing:'0.08em',
                  display:'block', marginBottom:'0.6rem'
                }}>
                  {featured.year}
                </span>

                <h2 className="serif" style={{
                  fontSize:'2rem', fontWeight:700,
                  color:'#1a1a2e', lineHeight:1.2, marginBottom:'1rem'
                }}>
                  {featured.title}
                </h2>

                <div className="gold-div" style={{ margin:'0 0 1.4rem' }}/>

                <p style={{
                  fontSize:'0.97rem', color:'#555',
                  lineHeight:1.8, fontWeight:300, marginBottom:'1.6rem'
                }}>
                  {featured.description}
                </p>

                <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', marginBottom:'2rem' }}>
                  {featured.technologies.map(t => (
                    <span key={t} className="tech-pill">{t}</span>
                  ))}
                </div>

                <a href={featured.githubUrl} target="_blank" rel="noopener noreferrer" className="gh-btn-primary">
                  <GitHubIcon />
                  View on GitHub
                  <ArrowIcon />
                </a>
              </div>
            </div>
          </FadeUp>

          {/* ════ ALL PROJECTS GRID ════ */}
          <FadeUp delay={0.05} style={{ marginTop:'5.5rem' }}>
            <div style={{
              display:'flex', alignItems:'flex-end',
              justifyContent:'space-between', flexWrap:'wrap', gap:'1rem',
              marginBottom:'2.5rem'
            }}>
              <div>
                <div className="s-label">
                  <div className="s-label-line"/>
                  <span className="s-label-text">All Work</span>
                </div>
                <h2 className="serif" style={{
                  fontSize:'clamp(1.6rem,3vw,2.4rem)',
                  color:'#1a1a2e', fontWeight:700, margin:0
                }}>
                  More Projects
                </h2>
              </div>

              {/* Count badge */}
              <div style={{
                fontFamily:"'DM Sans', sans-serif",
                fontSize:'0.78rem', color:'#aaa',
                letterSpacing:'0.06em', textTransform:'uppercase',
                padding:'0.4rem 0',
                borderBottom:'1px solid rgba(0,0,0,0.1)'
              }}>
                {rest.length} projects
              </div>
            </div>

            <div
              className="proj-grid"
              style={{
                display:'grid',
                gridTemplateColumns:'repeat(3, 1fr)',
                gap:'1.6rem'
              }}
            >
              {rest.map((project, i) => (
                <FadeUp key={project.title} delay={i * 0.08}>
                  <div
                    className="proj-card"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Image */}
                    <div className="proj-img-wrap">
                      <img src={project.imageUrl} alt={project.title} />
                      <div className="proj-img-overlay"/>
                    </div>

                    {/* Body */}
                    <div className="proj-body">
                      <span className="proj-year">{project.year}</span>
                      <h3 className="serif" style={{
                        fontSize:'1.12rem', fontWeight:700,
                        color:'#1a1a2e', lineHeight:1.3, marginBottom:'0.8rem'
                      }}>
                        {project.title}
                      </h3>
                      <p style={{
                        fontSize:'0.87rem', color:'#666',
                        lineHeight:1.75, fontWeight:300, marginBottom:'1.2rem', flex:1
                      }}>
                        {project.description}
                      </p>

                      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.45rem', marginBottom:'1.4rem' }}>
                        {project.technologies.map(t => (
                          <span key={t} className="tech-pill">{t}</span>
                        ))}
                      </div>

                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="gh-btn">
                        <GitHubIcon />
                        GitHub
                      </a>
                    </div>

                    {/* Gold hover accent */}
                    <div
                      className="proj-accent-line"
                      style={{
                        background: hovered === i
                          ? 'linear-gradient(90deg, #c9a96e, transparent)'
                          : 'transparent'
                      }}
                    />
                  </div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>

          {/* ════ BOTTOM CTA ════ */}
          <FadeUp delay={0.05} style={{ marginTop:'5rem' }}>
            <div style={{
              background:'rgba(255,255,255,0.82)',
              border:'1px solid rgba(0,0,0,0.07)',
              borderRadius:'6px',
              padding:'3rem',
              backdropFilter:'blur(16px)',
              WebkitBackdropFilter:'blur(16px)',
              boxShadow:'0 4px 40px rgba(0,0,0,0.04)',
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between',
              gap:'2rem',
              flexWrap:'wrap'
            }}>
              <div>
                <h3 className="serif" style={{ fontSize:'1.6rem', color:'#1a1a2e', fontWeight:700, marginBottom:'0.5rem' }}>
                  Let's build something together
                </h3>
                <p style={{ fontSize:'0.95rem', color:'#888', fontWeight:300, margin:0 }}>
                  Have a project in mind? I'd love to hear about it.
                </p>
              </div>
              <a
                href="/contact"
                style={{
                  fontFamily:"'DM Sans', sans-serif",
                  display:'inline-flex', alignItems:'center', gap:'10px',
                  background:'#1a1a2e', color:'#fff',
                  textDecoration:'none',
                  padding:'0.9rem 2.2rem',
                  borderRadius:'3px',
                  fontSize:'0.85rem', fontWeight:500,
                  letterSpacing:'0.06em', textTransform:'uppercase',
                  transition:'transform 0.25s, box-shadow 0.25s',
                  whiteSpace:'nowrap'
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(26,26,46,0.18)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                Get in Touch
                <ArrowIcon />
              </a>
            </div>
          </FadeUp>

        </div>
      </div>
    </>
  );
};

/* ── Icon helpers ── */
const GitHubIcon = () => (
  <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default Projects;