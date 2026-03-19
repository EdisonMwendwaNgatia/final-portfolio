import React, { useEffect, useRef, useState } from 'react';

/* ── Intersection observer hook ── */
const useInView = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold, rootMargin: '50px' }
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
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(22px)',
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
};

/* ── Icons ── */
const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.39-1.335-1.76-1.335-1.76-1.09-.746.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.306.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.696.825.578C20.565 21.795 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e?: React.SyntheticEvent) => {
    e?.preventDefault?.();
    setSubmitStatus({ type: null, message: '' });

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please fill in name, email and message before sending.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const to = 'ryanedinson@gmail.com';
      const subject = `Contact from ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
      const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;

      setSubmitStatus({ type: 'success', message: "Opening your email client..." });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setSubmitStatus({ type: 'error', message: 'Unable to open email client. Please copy your message and email manually.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadResume = () => {
    (async () => {
      const publicPath = `${process.env.PUBLIC_URL || ''}/resume/edison-mwendwa-resume.pdf`;
      
      try {
        // Quick HEAD check to ensure file exists and avoid fetching large payload unnecessarily
        const head = await fetch(publicPath, { method: 'HEAD' });
        if (head.ok) {
          const link = document.createElement('a');
          link.href = publicPath;
          link.download = 'Edison_Mwendwa_Resume.pdf';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return;
        }
      } catch (err) {
        // If HEAD request fails, try full fetch
        try {
          const res = await fetch(publicPath);
          if (res.ok) {
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Edison_Mwendwa_Resume.pdf';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            return;
          }
        } catch (err) {
          // Final fallback: open the file in a new tab so the user can manually save it.
          window.open(publicPath, '_blank', 'noopener,noreferrer');
        }
      }
    })();
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 'clamp(0.85rem, 3vw, 0.93rem)',
    fontWeight: 300,
    color: '#1a1a2e',
    background: focusedField === field ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.6)',
    border: `1px solid ${focusedField === field ? '#c9a96e' : 'rgba(0,0,0,0.08)'}`,
    borderRadius: '3px',
    padding: '0.75rem 1rem',
    outline: 'none',
    transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
    boxSizing: 'border-box',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(201,169,110,0.1)' : 'none',
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');

        :root {
          --gold: #c9a96e;
          --dark: #1a1a2e;
          --border: rgba(0,0,0,0.07);
          --card-bg: rgba(255,255,255,0.84);
        }

        .contact-page {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: linear-gradient(160deg, #ffffff 0%, #fafafa 55%, #f9f7f4 100%);
          position: relative;
          overflow-x: hidden;
        }

        .serif { font-family: 'Playfair Display', serif; }

        .s-label { 
          display: flex; 
          align-items: center; 
          gap: 12px; 
          margin-bottom: 1rem; 
        }
        .s-label-line { 
          width: 28px; 
          height: 1px; 
          background: var(--gold); 
          flex-shrink: 0; 
        }
        .s-label-text {
          font-size: 0.7rem; 
          font-weight: 500;
          letter-spacing: 0.13em; 
          text-transform: uppercase; 
          color: var(--gold);
        }

        .gold-div {
          width: 48px; 
          height: 1px;
          background: linear-gradient(90deg, var(--gold), transparent);
          margin: 1.2rem 0;
        }

        .glass-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 4px 40px rgba(0,0,0,0.04), 0 1px 0 rgba(255,255,255,0.9) inset;
          transition: transform 0.3s ease;
        }
        
        .glass-card:active {
          transform: scale(0.99);
        }

        /* Profile image */
        .profile-img-ring {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(135deg, #c9a96e, rgba(201,169,110,0.2));
          margin: 0 auto 1rem;
        }
        
        @media (min-width: 768px) {
          .profile-img-ring {
            width: 100px;
            height: 100px;
          }
        }
        
        .profile-img-ring img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          border: 2px solid white;
        }

        /* Contact items */
        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0.8rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          transition: padding-left 0.2s ease;
          cursor: default;
        }
        .contact-item:last-of-type { border-bottom: none; }
        
        @media (hover: hover) {
          .contact-item:hover { padding-left: 4px; }
        }
        
        .contact-item:active { padding-left: 4px; }

        .contact-icon-wrap {
          width: 32px; 
          height: 32px;
          border-radius: 3px;
          border: 1px solid rgba(201,169,110,0.25);
          background: rgba(201,169,110,0.06);
          display: flex; 
          align-items: center; 
          justify-content: center;
          color: var(--gold); 
          flex-shrink: 0;
        }

        /* Social icons */
        .social-btn {
          display: flex; 
          align-items: center; 
          justify-content: center;
          width: 38px; 
          height: 38px;
          border-radius: 3px;
          border: 1px solid rgba(0,0,0,0.08);
          background: rgba(255,255,255,0.7);
          color: #555;
          text-decoration: none;
          transition: border-color 0.25s, color 0.25s, transform 0.2s, background 0.25s;
          -webkit-tap-highlight-color: transparent;
        }
        
        @media (hover: hover) {
          .social-btn:hover {
            border-color: var(--gold);
            color: var(--dark);
            background: rgba(201,169,110,0.06);
            transform: translateY(-2px);
          }
        }
        
        .social-btn:active {
          border-color: var(--gold);
          color: var(--dark);
          background: rgba(201,169,110,0.06);
          transform: translateY(-1px);
        }

        /* Resume btn */
        .resume-btn {
          display: inline-flex; 
          align-items: center; 
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem; 
          font-weight: 500;
          letter-spacing: 0.08em; 
          text-transform: uppercase;
          color: var(--dark);
          background: transparent;
          border: 1px solid rgba(26,26,46,0.15);
          padding: 0.6rem 1.2rem;
          border-radius: 3px;
          cursor: pointer;
          width: 100%;
          justify-content: center;
          transition: border-color 0.25s, background 0.25s, transform 0.2s;
          margin-top: 1rem;
          -webkit-tap-highlight-color: transparent;
        }
        
        @media (hover: hover) {
          .resume-btn:hover {
            border-color: var(--gold);
            background: rgba(201,169,110,0.05);
            transform: translateY(-1px);
          }
        }
        
        .resume-btn:active {
          border-color: var(--gold);
          background: rgba(201,169,110,0.05);
          transform: translateY(-1px);
        }

        /* Form label */
        .form-label {
          display: block;
          font-size: 0.72rem; 
          font-weight: 500;
          letter-spacing: 0.08em; 
          text-transform: uppercase;
          color: #aaa; 
          margin-bottom: 0.4rem;
        }

        /* Submit btn */
        .submit-btn {
          display: inline-flex; 
          align-items: center; 
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; 
          font-weight: 500;
          letter-spacing: 0.06em; 
          text-transform: uppercase;
          color: #fff; 
          background: var(--dark);
          border: none; 
          border-radius: 3px;
          padding: 0.85rem 1.8rem;
          cursor: pointer; 
          width: 100%;
          justify-content: center;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
          -webkit-tap-highlight-color: transparent;
        }
        
        @media (hover: hover) {
          .submit-btn:hover:not(:disabled) {
            background: #2d2d4e;
            transform: translateY(-2px);
            box-shadow: 0 8px 28px rgba(26,26,46,0.18);
          }
        }
        
        .submit-btn:active:not(:disabled) {
          background: #2d2d4e;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(26,26,46,0.18);
        }
        
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Spinner */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 14px; 
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        /* Success / error banner */
        .status-banner {
          display: flex; 
          align-items: center; 
          gap: 10px;
          padding: 0.8rem 1rem;
          border-radius: 3px;
          font-size: 0.85rem; 
          font-weight: 400;
          margin-bottom: 1.4rem;
        }
        .status-success {
          background: rgba(74,197,138,0.08);
          border: 1px solid rgba(74,197,138,0.25);
          color: #2d8a5e;
        }
        .status-error {
          background: rgba(220,53,69,0.06);
          border: 1px solid rgba(220,53,69,0.2);
          color: #b02a37;
        }

        /* Mobile responsive */
        @media (max-width: 860px) {
          .contact-grid { 
            grid-template-columns: 1fr !important; 
            gap: 1.5rem !important;
          }
        }

        @media (max-width: 640px) {
          .glass-card {
            padding: 1.5rem 1.5rem !important;
          }
          
          .form-row {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>

      <div className="contact-page">

        {/* Background orbs - responsive */}
        <div style={{
          position:'absolute', top:'5%', right:'-80px',
          width:'clamp(280px, 70vw, 450px)', 
          height:'clamp(280px, 70vw, 450px)', 
          borderRadius:'50%',
          background:'radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)',
          filter:'blur(50px)', 
          pointerEvents:'none'
        }}/>
        <div style={{
          position:'absolute', bottom:'10%', left:'-100px',
          width:'clamp(240px, 60vw, 380px)', 
          height:'clamp(240px, 60vw, 380px)', 
          borderRadius:'50%',
          background:'radial-gradient(circle, rgba(26,26,46,0.04) 0%, transparent 70%)',
          filter:'blur(50px)', 
          pointerEvents:'none'
        }}/>
        {/* Top gold accent */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:'2px',
          background:'linear-gradient(90deg, transparent 0%, #c9a96e 50%, transparent 100%)',
          opacity:0.5
        }}/>

        <div style={{ 
          maxWidth:'1140px', 
          margin:'0 auto', 
          padding:'3rem 1.5rem 5rem' 
        }}>

          {/* ════ HEADER ════ */}
          <FadeUp>
            <div className="s-label">
              <div className="s-label-line"/>
              <span className="s-label-text">Contact</span>
            </div>
            <h1 className="serif" style={{
              fontSize:'clamp(2rem, 8vw, 4.8rem)',
              fontWeight:700, 
              color:'#1a1a2e',
              lineHeight:1.05, 
              letterSpacing:'-0.02em',
              marginBottom:'0.4rem'
            }}>
              Get in Touch
            </h1>
            <p className="serif" style={{
              fontSize:'clamp(0.9rem, 3vw, 1.45rem)',
              fontStyle:'italic', 
              color:'#aaa', 
              fontWeight:400, 
              margin:0
            }}>
              Let's start a conversation
            </p>
          </FadeUp>

          {/* ════ MAIN GRID ════ */}
          <div
            className="contact-grid"
            style={{ 
              display:'grid', 
              gridTemplateColumns:'340px 1fr', 
              gap:'1.5rem', 
              marginTop:'3rem', 
              alignItems:'start' 
            }}
          >

            {/* ── Left: Profile + Info ── */}
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>

              {/* Profile card */}
              <FadeUp delay={0.05}>
                <div className="glass-card" style={{ padding:'1.8rem 1.5rem', textAlign:'center' }}>
                  <div className="profile-img-ring">
                    <img
                      src={`${process.env.PUBLIC_URL || ''}/gallery/profile.png`}
                      alt="Edison Mwendwa"
                    />
                  </div>

                  <h2 className="serif" style={{ 
                    fontSize:'clamp(1.3rem, 5vw, 1.5rem)', 
                    fontWeight:700, 
                    color:'#1a1a2e', 
                    marginBottom:'0.2rem' 
                  }}>
                    Edison Mwendwa
                  </h2>
                  <p style={{ 
                    fontSize:'clamp(0.75rem, 2.5vw, 0.82rem)', 
                    color:'#aaa', 
                    letterSpacing:'0.05em', 
                    margin:'0 0 1rem' 
                  }}>
                    Software Engineer · Nairobi
                  </p>

                  <div style={{ 
                    display:'flex', 
                    justifyContent:'center', 
                    gap:'0.5rem', 
                    marginBottom:'1rem' 
                  }}>
                    <div style={{
                      display:'flex', 
                      alignItems:'center', 
                      gap:6,
                      fontSize:'clamp(0.68rem, 2.5vw, 0.72rem)', 
                      color:'#aaa'
                    }}>
                      <div style={{
                        width:6, 
                        height:6, 
                        borderRadius:'50%', 
                        background:'#4ade80',
                        animation:'pulse-dot 2.5s ease-in-out infinite'
                      }}/>
                      Available for work
                    </div>
                  </div>

                  <button onClick={handleDownloadResume} className="resume-btn">
                    <DownloadIcon/>
                    Download Resume
                  </button>
                </div>
              </FadeUp>

              {/* Contact details card */}
              <FadeUp delay={0.12}>
                <div className="glass-card" style={{ padding:'1.5rem 1.5rem' }}>
                  <div className="s-label" style={{ marginBottom:'0.8rem' }}>
                    <div className="s-label-line"/>
                    <span className="s-label-text">Direct</span>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon-wrap"><EmailIcon/></div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ 
                        fontSize:'0.68rem', 
                        color:'#bbb', 
                        letterSpacing:'0.08em', 
                        textTransform:'uppercase', 
                        marginBottom:2 
                      }}>Email</div>
                      <div style={{ 
                        fontSize:'clamp(0.8rem, 2.5vw, 0.9rem)', 
                        color:'#1a1a2e', 
                        fontWeight:400,
                        wordBreak: 'break-all'
                      }}>ryanedinson@gmail.com</div>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon-wrap"><PhoneIcon/></div>
                    <div>
                      <div style={{ 
                        fontSize:'0.68rem', 
                        color:'#bbb', 
                        letterSpacing:'0.08em', 
                        textTransform:'uppercase', 
                        marginBottom:2 
                      }}>Phone</div>
                      <div style={{ 
                        fontSize:'clamp(0.8rem, 2.5vw, 0.9rem)', 
                        color:'#1a1a2e', 
                        fontWeight:400 
                      }}>+254 742 644 921</div>
                    </div>
                  </div>

                  <div className="contact-item" style={{ border:'none' }}>
                    <div className="contact-icon-wrap"><LocationIcon/></div>
                    <div>
                      <div style={{ 
                        fontSize:'0.68rem', 
                        color:'#bbb', 
                        letterSpacing:'0.08em', 
                        textTransform:'uppercase', 
                        marginBottom:2 
                      }}>Location</div>
                      <div style={{ 
                        fontSize:'clamp(0.8rem, 2.5vw, 0.9rem)', 
                        color:'#1a1a2e', 
                        fontWeight:400 
                      }}>Nairobi, Kenya</div>
                    </div>
                  </div>
                </div>
              </FadeUp>

              {/* Social links card */}
              <FadeUp delay={0.2}>
                <div className="glass-card" style={{ padding:'1.5rem 1.5rem' }}>
                  <div className="s-label" style={{ marginBottom:'1rem' }}>
                    <div className="s-label-line"/>
                    <span className="s-label-text">Connect</span>
                  </div>
                  <div style={{ 
                    display:'flex', 
                    gap:'0.6rem',
                    justifyContent: window.innerWidth <= 640 ? 'center' : 'flex-start'
                  }}>
                    {[
                      { href:'https://www.linkedin.com/in/edison-ngatia-aa250a34b/', icon:<LinkedInIcon/>, label:'LinkedIn' },
                      { href:'https://github.com/EdisonMwendwaNgatia', icon:<GitHubIcon/>, label:'GitHub' },
                    ].map(s => (
                      <a 
                        key={s.label} 
                        href={s.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="social-btn" 
                        title={s.label}
                        aria-label={s.label}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* ── Right: Form ── */}
            <FadeUp delay={0.1}>
              <div className="glass-card" style={{ padding:'2rem 1.5rem' }}>
                <div className="s-label">
                  <div className="s-label-line"/>
                  <span className="s-label-text">Message</span>
                </div>
                <h2 className="serif" style={{
                  fontSize:'clamp(1.5rem, 5vw, 2rem)', 
                  fontWeight:700,
                  color:'#1a1a2e', 
                  marginBottom:'0.3rem'
                }}>
                  Send a Message
                </h2>
                <p style={{ 
                  fontSize:'clamp(0.85rem, 2.5vw, 0.9rem)', 
                  color:'#aaa', 
                  fontWeight:300, 
                  marginBottom:0 
                }}>
                  Have a project in mind or just want to say hello? I'd love to hear from you.
                </p>
                <div className="gold-div"/>

                {/* Status banner */}
                {submitStatus.type && (
                  <div className={`status-banner status-${submitStatus.type}`}>
                    {submitStatus.type === 'success' ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                    )}
                    <span style={{ fontSize: '0.85rem' }}>{submitStatus.message}</span>
                  </div>
                )}

                {/* Form */}
                <div style={{ display:'flex', flexDirection:'column', gap:'1.4rem' }}>

                  {/* Name + Email row */}
                  <div 
                    className="form-row"
                    style={{ 
                      display:'grid', 
                      gridTemplateColumns:'1fr 1fr', 
                      gap:'1rem' 
                    }}
                  >
                    <div>
                      <label className="form-label" htmlFor="name">Name</label>
                      <input
                        id="name" 
                        name="name" 
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your name"
                        style={inputStyle('name')}
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="email">Email</label>
                      <input
                        id="email" 
                        name="email" 
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="your@email.com"
                        style={inputStyle('email')}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="form-label" htmlFor="message">Message</label>
                    <textarea
                      id="message" 
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell me about your project or opportunity..."
                      style={{ 
                        ...inputStyle('message'), 
                        resize:'vertical', 
                        lineHeight:1.6,
                        minHeight: '120px'
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    className="submit-btn"
                    disabled={isSubmitting}
                    onClick={handleSubmit as unknown as React.MouseEventHandler}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"/>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowIcon/>
                      </>
                    )}
                  </button>
                </div>

                {/* Footer note */}
                <p style={{
                  fontSize:'0.75rem', 
                  color:'#ccc',
                  textAlign:'center', 
                  marginTop:'1.2rem', 
                  marginBottom:0,
                  fontWeight:300
                }}>
                  Typically responds within 24 hours
                </p>
              </div>
            </FadeUp>

          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;