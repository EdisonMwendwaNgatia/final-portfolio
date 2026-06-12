import React, { useEffect, useRef, useState } from "react";

/* ── Intersection observer hook ── */
const useInView = (threshold = 0.12) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold, rootMargin: "50px" },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
};

/* ── Fade-up wrapper ── */
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
        transform: inView ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* ── Grouped Skills Data ── */
const skillCategories = [
  {
    title: "Frontend",
    skills: ["JavaScript", "TypeScript", "React", "React Native", "Next.js", "HTML & CSS", "UI/UX Design"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Java", "Kotlin", "Express.js", "RESTful APIs", "Solidity"]
  },
  {
    title: "Database",
    skills: ["Firebase", "Supabase"]
  },
  {
    title: "DevOps & Cloud",
    skills: ["Docker", "Kubernetes", "Git & GitHub", "Vercel & Netlify", "Render", "Truffle"]
  }
];

const experiences = [
  {
    title: "Attachment — NCPB HQ",
    date: "Jan 2025 — Apr 2025",
    tag: "Industry",
    desc: "Gained hands-on experience in software development and technical tasks at the National Cereals and Produce Board headquarters. Worked on internal tools that streamline operations within the organization.",
    img: "/gallery/ncpb.jpg",
  },
  {
    title: "Presidential Showcase — BLOCKHOUSE KENYA",
    date: "2025",
    tag: "Recognition",
    desc: "Presented BLOCKHOUSE KENYA, an innovative blockchain solution, to H.E. the President of Kenya at Umma University. Demonstrated how technology can revolutionize Kenya's housing sector by having tamper proof asset transfer.",
    youtubeId: "TSBLxqF1I8g",
    startTime: 1000,
    img: "https://i.pinimg.com/736x/6f/8c/fe/6f8cfe905f15ffbbaaa56b1c77952866.jpg",
  },
  {
    title: "React Native Tutor — Umma University TechHub",
    date: "2023 — 2025",
    tag: "Teaching",
    desc: "Mentored over 30 students in React Native development and Blockchain. Conducted weekly workshops, code reviews, and helped students code their first mobile apps",
    img: "/gallery/umma6.jpg",
  },
];

const highlights = [
  "Active member of Umma University TechHub community",
  "Participated in multiple hackathons and tech events",
  "Passionate about technology for social impact in agriculture",
  "Continuous learner in web and mobile development",
];

const About: React.FC = () => {
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');

        :root {
          --gold: #c9a96e;
          --dark: #1a1a2e;
          --grey: #666;
          --light-grey: #aaa;
          --border: rgba(0,0,0,0.07);
          --card-bg: rgba(255,255,255,0.82);
        }

        .about-page {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: linear-gradient(160deg, #ffffff 0%, #fafafa 55%, #f9f7f4 100%);
          position: relative;
          overflow-x: hidden;
        }

        .s-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1.4rem;
        }
        .s-label-line { 
          width: 28px; 
          height: 1px; 
          background: var(--gold); 
          flex-shrink: 0; 
        }
        .s-label-text {
          font-size: 0.72rem; 
          font-weight: 500;
          letter-spacing: 0.13em; 
          text-transform: uppercase; 
          color: var(--gold);
        }

        .serif { font-family: 'Playfair Display', serif; }

        .gold-div {
          width: 48px; 
          height: 1px;
          background: linear-gradient(90deg, var(--gold), transparent);
          margin: 1.4rem 0;
        }

        .glass-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 4px 40px rgba(0,0,0,0.04), 0 1px 0 rgba(255,255,255,0.9) inset;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .glass-card:active {
          transform: scale(0.98);
        }

        /* Skill Category Card */
        .skill-category-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 1.2rem;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        @media (hover: hover) {
          .skill-category-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 32px rgba(0,0,0,0.08);
            border-color: rgba(201,169,110,0.3);
          }
        }

        .skill-category-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(201,169,110,0.3);
        }

        .skill-category-title .s-label-line {
          width: 24px;
          height: 1px;
          background: var(--gold);
        }

        .skill-category-title h3 {
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 0;
          color: var(--gold);
        }

        .skill-items {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--dark);
          background: rgba(255,255,255,0.75);
          border: 1px solid var(--border);
          padding: 0.3rem 0.8rem;
          border-radius: 2px;
          transition: all 0.2s ease;
        }

        @media (hover: hover) {
          .skill-badge:hover {
            border-color: var(--gold);
            background: rgba(201,169,110,0.06);
            transform: translateY(-1px);
          }
        }

        .skill-pill {
          display: inline-block;
          font-size: clamp(0.7rem, 2.5vw, 0.78rem); 
          font-weight: 500;
          letter-spacing: 0.04em; 
          color: var(--dark);
          border: 1px solid var(--border);
          padding: 0.45rem 1rem;
          border-radius: 2px;
          background: rgba(255,255,255,0.75);
          transition: border-color 0.22s, background 0.22s, transform 0.22s;
          cursor: default;
          -webkit-tap-highlight-color: transparent;
        }
        
        @media (hover: hover) {
          .skill-pill:hover {
            border-color: var(--gold);
            background: rgba(201,169,110,0.06);
            transform: translateY(-2px);
          }
        }
        
        .skill-pill:active {
          border-color: var(--gold);
          background: rgba(201,169,110,0.06);
          transform: translateY(-1px);
        }

        /* Experience cards */
        .exp-card {
          display: flex;
          flex-direction: column;
          border-radius: 6px;
          overflow: hidden;
          background: var(--card-bg);
          border: 1px solid var(--border);
          box-shadow: 0 4px 32px rgba(0,0,0,0.04);
          transition: transform 0.3s cubic-bezier(0.2,0,0,1), box-shadow 0.3s ease;
          cursor: default;
          height: 100%;
          -webkit-tap-highlight-color: transparent;
        }
        
        @media (hover: hover) {
          .exp-card:hover {
            transform: translateY(-7px);
            box-shadow: 0 24px 64px rgba(0,0,0,0.11);
          }
        }
        
        .exp-card:active {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.11);
        }

        .exp-img-wrap {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
          flex-shrink: 0;
        }
        
        @media (min-width: 768px) {
          .exp-img-wrap {
            height: 230px;
          }
        }

        .exp-img-wrap img {
          width: 100%; 
          height: 100%;
          object-fit: cover;
          transition: transform 0.65s ease;
          display: block;
        }
        
        @media (hover: hover) {
          .exp-card:hover .exp-img-wrap img {
            transform: scale(1.06);
          }
        }
        
        .exp-card:hover .exp-img-wrap iframe {
          opacity: 1;
        }

        .exp-img-overlay {
          position: absolute; 
          inset: 0;
          background: linear-gradient(to bottom, transparent 45%, rgba(26,26,46,0.22) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .exp-tag-badge {
          position: absolute;
          top: 12px; 
          left: 12px;
          font-size: 0.65rem; 
          font-weight: 500;
          letter-spacing: 0.1em; 
          text-transform: uppercase;
          color: var(--dark);
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(201,169,110,0.5);
          padding: 0.2rem 0.7rem;
          border-radius: 2px;
          backdrop-filter: blur(8px);
          z-index: 2;
        }

        .exp-body {
          padding: 1.4rem 1.5rem 1.8rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        @media (min-width: 768px) {
          .exp-body {
            padding: 1.6rem 1.8rem 2rem;
          }
        }

        .exp-date {
          font-size: 0.7rem; 
          font-weight: 500;
          color: var(--gold); 
          letter-spacing: 0.08em;
          margin-bottom: 0.5rem; 
          display: block;
        }

        .exp-bottom-line {
          height: 2px;
          transition: background 0.4s ease;
        }

        .exp-img-wrap iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
          pointer-events: auto;
          z-index: 0;
        }

        .hl-item {
          display: flex; 
          align-items: flex-start; 
          gap: 14px;
          padding: 0.65rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }
        .hl-item:last-child { border-bottom: none; }
        .hl-dot {
          width: 5px; 
          height: 5px; 
          border-radius: 50%;
          background: var(--gold); 
          margin-top: 9px; 
          flex-shrink: 0;
        }

        @keyframes skillIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Skills grid - 2x2 */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.2rem;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        @media (max-width: 1024px) {
          .two-col { 
            grid-template-columns: 1fr !important; 
            gap: 1.5rem !important;
          }
          .three-col { 
            grid-template-columns: repeat(2, 1fr) !important; 
          }
          .hl-two-col { 
            grid-template-columns: 1fr !important; 
            gap: 0 !important;
          }
        }

        @media (max-width: 640px) {
          .three-col { 
            grid-template-columns: 1fr !important; 
          }
          
          .glass-card {
            padding: 1.5rem 1.5rem !important;
          }
          
          .exp-body {
            padding: 1.2rem 1.2rem 1.5rem !important;
          }
          
          .hl-item {
            padding: 0.5rem 0;
          }
        }

        /* Better touch targets */
        .skill-pill {
          margin: 2px;
        }
      `}</style>

      <div className="about-page">
        {/* Background orbs - responsive */}
        <div
          style={{
            position: "absolute",
            top: "8%",
            right: "-80px",
            width: "clamp(250px, 60vw, 420px)",
            height: "clamp(250px, 60vw, 420px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "-100px",
            width: "clamp(220px, 50vw, 360px)",
            height: "clamp(220px, 50vw, 360px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(26,26,46,0.04) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg, transparent 0%, #c9a96e 50%, transparent 100%)",
            opacity: 0.5,
          }}
        />

        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            padding: "3rem 1.5rem 5rem",
          }}
        >
          {/* ════ PAGE HEADER ════ */}
          <FadeUp>
            <div className="s-label">
              <div className="s-label-line" />
              <span className="s-label-text">About Me</span>
            </div>
            <h1
              className="serif"
              style={{
                fontSize: "clamp(2rem, 8vw, 4.8rem)",
                fontWeight: 700,
                color: "#1a1a2e",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                marginBottom: "0.4rem",
              }}
            >
              The Story
            </h1>
            <p
              className="serif"
              style={{
                fontSize: "clamp(0.9rem, 3vw, 1.45rem)",
                fontStyle: "italic",
                color: "#aaa",
                fontWeight: 400,
                margin: 0,
              }}
            >
              Behind the code
            </p>
          </FadeUp>

          {/* ════ STORY + EDUCATION + STATS ════ */}
          <div
            className="two-col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.8rem",
              marginTop: "2.5rem",
              alignItems: "start",
            }}
          >
            {/* Story */}
            <FadeUp delay={0.05}>
              <div className="glass-card" style={{ padding: "1.8rem 1.8rem" }}>
                <div className="s-label">
                  <div className="s-label-line" />
                  <span className="s-label-text">My Story</span>
                </div>
                <p
                  style={{
                    fontSize: "clamp(0.9rem, 2.5vw, 0.97rem)",
                    color: "#555",
                    lineHeight: 1.7,
                    fontWeight: 300,
                    marginBottom: "1rem",
                  }}
                >
                  My journey into tech started at UMMA University, where I
                  discovered my passion for building solutions that make a
                  difference. From tutoring fellow students at the TechHub to
                  developing BLOCKHOUSE KENYA — a project that reached the
                  highest office in the country — every step has been about
                  using technology to create real impact.
                </p>
                <div className="gold-div" style={{ margin: "0 0 1.2rem" }} />
                <p
                  style={{
                    fontSize: "clamp(0.9rem, 2.5vw, 0.97rem)",
                    color: "#666",
                    lineHeight: 1.7,
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  At my core, I just want to build things that help people.
                  Doesn't matter if it's a safety tool, a teaching moment, or
                  something that makes a tedious process suck less. If it solves
                  a real problem, I'm in.
                </p>
              </div>
            </FadeUp>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Education */}
              <FadeUp delay={0.12}>
                <div
                  className="glass-card"
                  style={{ padding: "1.8rem 1.8rem" }}
                >
                  <div className="s-label">
                    <div className="s-label-line" />
                    <span className="s-label-text">Education</span>
                  </div>
                  <h3
                    className="serif"
                    style={{
                      fontSize: "clamp(1.1rem, 3.5vw, 1.35rem)",
                      color: "#1a1a2e",
                      fontWeight: 700,
                      marginBottom: "0.4rem",
                    }}
                  >
                    B.Sc. Computer Science
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.75rem, 2vw, 0.82rem)",
                      color: "#aaa",
                      letterSpacing: "0.05em",
                      marginBottom: 0,
                    }}
                  >
                    UMMA University · 2022 — 2026
                  </p>
                  <div className="gold-div" />
                  <p
                    style={{
                      fontSize: "clamp(0.85rem, 2.5vw, 0.92rem)",
                      color: "#666",
                      fontWeight: 300,
                      margin: 0,
                    }}
                  >
                    Graduated with{" "}
                    <strong style={{ color: "#1a1a2e", fontWeight: 500 }}>
                      Second Class Upper Honours
                    </strong>
                  </p>
                </div>
              </FadeUp>

              {/* Quick stats */}
              <FadeUp delay={0.2}>
                <div
                  className="glass-card"
                  style={{ padding: "1.5rem 1.5rem" }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3,1fr)",
                      gap: "0.5rem",
                      textAlign: "center",
                    }}
                  >
                    {[
                      { n: "2+", l: "Years Exp." },
                      { n: "30+", l: "Students" },
                      { n: "1", l: "Presidential" },
                    ].map((s) => (
                      <div key={s.l}>
                        <div
                          className="serif"
                          style={{
                            fontSize: "clamp(1.5rem, 5vw, 2rem)",
                            fontWeight: 700,
                            color: "#1a1a2e",
                            lineHeight: 1,
                          }}
                        >
                          {s.n}
                        </div>
                        <div
                          style={{
                            fontSize: "clamp(0.6rem, 2vw, 0.68rem)",
                            color: "#bbb",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            marginTop: 4,
                          }}
                        >
                          {s.l}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>

          {/* ════ SKILLS - 2x2 GRID ════ */}
          <FadeUp delay={0.05} style={{ marginTop: "3rem" }}>
            <div className="glass-card" style={{ padding: "1.8rem 1.5rem" }}>
              <div className="s-label">
                <div className="s-label-line" />
                <span className="s-label-text">Technical Skills</span>
              </div>
              <h2
                className="serif"
                style={{
                  fontSize: "clamp(1.4rem, 4vw, 1.8rem)",
                  color: "#1a1a2e",
                  fontWeight: 700,
                  marginBottom: "1.5rem",
                }}
              >
                Tools & Technologies
              </h2>
              
              <div className="skills-grid">
                {skillCategories.map((category, idx) => (
                  <div
                    key={category.title}
                    className="skill-category-card"
                    style={{
                      animation: `skillIn 0.45s ease ${0.05 * idx + 0.1}s both`,
                    }}
                  >
                    <div className="skill-category-title">
                      <div className="s-label-line" />
                      <h3>{category.title}</h3>
                    </div>
                    <div className="skill-items">
                      {category.skills.map((skill) => (
                        <span key={skill} className="skill-badge">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.05} style={{ marginTop: "3rem" }}>
            <div className="s-label">
              <div className="s-label-line" />
              <span className="s-label-text">Experience & Achievements</span>
            </div>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(1.4rem, 4vw, 2.4rem)",
                color: "#1a1a2e",
                fontWeight: 700,
                marginBottom: "0.4rem",
              }}
            >
              What I've Built & Done
            </h2>
            <div className="gold-div" />
          </FadeUp>

          <div
            className="three-col"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.2rem",
              marginTop: "1.5rem",
            }}
          >
            {experiences.map((exp, i) => (
              <FadeUp key={exp.title} delay={i * 0.1}>
                <div
                  className="exp-card"
                  onMouseEnter={() => setHoveredExp(i)}
                  onMouseLeave={() => setHoveredExp(null)}
                  onClick={() => {}}
                >
                  {/* Video/Image container */}
                  <div className="exp-img-wrap">
                    {exp.youtubeId ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${exp.youtubeId}?start=${exp.startTime || 0}&autoplay=0&controls=1&modestbranding=1&rel=0`}
                        title={exp.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <img src={exp.img} alt={exp.title} loading="lazy" />
                    )}
                    <div className="exp-img-overlay" />
                    <span className="exp-tag-badge">{exp.tag}</span>
                  </div>

                  {/* Body */}
                  <div className="exp-body">
                    <span className="exp-date">{exp.date}</span>
                    <h3
                      className="serif"
                      style={{
                        fontSize: "clamp(1rem, 3vw, 1.12rem)",
                        fontWeight: 700,
                        color: "#1a1a2e",
                        lineHeight: 1.3,
                        marginBottom: "0.7rem",
                      }}
                    >
                      {exp.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(0.8rem, 2.5vw, 0.87rem)",
                        color: "#666",
                        lineHeight: 1.6,
                        fontWeight: 300,
                        margin: 0,
                        flex: 1,
                      }}
                    >
                      {exp.desc}
                    </p>
                  </div>

                  {/* Gold bottom accent on hover */}
                  <div
                    className="exp-bottom-line"
                    style={{
                      background:
                        hoveredExp === i
                          ? "linear-gradient(90deg, #c9a96e, transparent)"
                          : "transparent",
                    }}
                  />
                </div>
              </FadeUp>
            ))}
          </div>

          {/* ════ HIGHLIGHTS ════ */}
          <FadeUp delay={0.05} style={{ marginTop: "3rem" }}>
            <div className="glass-card" style={{ padding: "1.8rem 1.5rem" }}>
              <div className="s-label">
                <div className="s-label-line" />
                <span className="s-label-text">Highlights</span>
              </div>
              <h2
                className="serif"
                style={{
                  fontSize: "clamp(1.3rem, 4vw, 1.6rem)",
                  color: "#1a1a2e",
                  fontWeight: 700,
                  marginBottom: "1.2rem",
                }}
              >
                Additional Notes
              </h2>
              <div
                className="hl-two-col"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0 2rem",
                }}
              >
                {highlights.map((item) => (
                  <div key={item} className="hl-item">
                    <div className="hl-dot" />
                    <span
                      style={{
                        fontSize: "clamp(0.85rem, 2.5vw, 0.91rem)",
                        color: "#666",
                        fontWeight: 300,
                        lineHeight: 1.6,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </>
  );
};

export default About;