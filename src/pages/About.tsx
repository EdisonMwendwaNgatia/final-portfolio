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
      { threshold },
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

/* ── Data ── */
const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "React Native",
  "Next.js",
  "Node.js",
  "Java",
  "Kotlin",
  "Express.js",
  "HTML & CSS",
  "Solidity",
  "Firebase",
  "Supabase",
  "RESTful APIs",
  "Truffle",
  "Git & GitHub",
  "UI/UX Design",
  "Vercel & Netlify",
  "Render",
];

const experiences = [
  {
    title: "Attachment — NCPB HQ",
    date: "Jan 2025 — Apr 2025",
    tag: "Industry",
    desc: "Gained hands-on experience in software development and technical tasks at the National Cereals and Produce Board headquarters. Worked on internal tools that streamline operations within the organization.",
    img: "https://i.pinimg.com/736x/db/04/e0/db04e012afbe6dd55fcf8990b62f2273.jpg",
  },
  {
    title: "Presidential Showcase — BLOCKHOUSE KENYA",
    date: "2025",
    tag: "Recognition",
    desc: "Presented BLOCKHOUSE KENYA, an innovative blockchain solution, to H.E. the President of Kenya at Umma Univesity. Demonstrated how technology can revolutionize Kenya's housing sector by having tamper proof asset transfer.",
    /*img: `${process.env.PUBLIC_URL || ''}/gallery/presidential-showcase.jpg`,*/
    img:"https://i.pinimg.com/736x/6f/8c/fe/6f8cfe905f15ffbbaaa56b1c77952866.jpg"
  },
  {
    title: "React Native Tutor — Umma University TechHub",
    date: "2023 — 2025",
    tag: "Teaching",
    desc: "Mentored over 30 students in React Native development and Blockchain. Conducted weekly workshops, code reviews, and helped students code their first mobile apps",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
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
        .s-label-line { width: 28px; height: 1px; background: var(--gold); flex-shrink: 0; }
        .s-label-text {
          font-size: 0.72rem; font-weight: 500;
          letter-spacing: 0.13em; text-transform: uppercase; color: var(--gold);
        }

        .serif { font-family: 'Playfair Display', serif; }

        .gold-div {
          width: 48px; height: 1px;
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
        }

        .skill-pill {
          display: inline-block;
          font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.04em; color: var(--dark);
          border: 1px solid var(--border);
          padding: 0.45rem 1.1rem;
          border-radius: 2px;
          background: rgba(255,255,255,0.75);
          transition: border-color 0.22s, background 0.22s, transform 0.22s;
          cursor: default;
        }
        .skill-pill:hover {
          border-color: var(--gold);
          background: rgba(201,169,110,0.06);
          transform: translateY(-2px);
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
          transition: transform 0.4s cubic-bezier(0.2,0,0,1), box-shadow 0.4s ease;
          cursor: default;
          height: 100%;
        }
        .exp-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 24px 64px rgba(0,0,0,0.11);
        }

        .exp-img-wrap {
          width: 100%;
          height: 230px;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
        }
        .exp-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.65s ease;
          display: block;
        }
        .exp-card:hover .exp-img-wrap img {
          transform: scale(1.06);
        }

        .exp-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 45%, rgba(26,26,46,0.22) 100%);
        }

        .exp-tag-badge {
          position: absolute;
          top: 14px; left: 14px;
          font-size: 0.67rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--dark);
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(201,169,110,0.5);
          padding: 0.26rem 0.75rem;
          border-radius: 2px;
          backdrop-filter: blur(8px);
        }

        .exp-body {
          padding: 1.6rem 1.8rem 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .exp-date {
          font-size: 0.74rem; font-weight: 500;
          color: var(--gold); letter-spacing: 0.08em;
          margin-bottom: 0.5rem; display: block;
        }

        .exp-bottom-line {
          height: 2px;
          transition: background 0.4s ease;
        }

        .hl-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 0.65rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.04);
        }
        .hl-item:last-child { border-bottom: none; }
        .hl-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--gold); margin-top: 9px; flex-shrink: 0;
        }

        @keyframes skillIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; }
          .three-col { grid-template-columns: 1fr !important; }
          .hl-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="about-page">
        {/* Background orbs */}
        <div
          style={{
            position: "absolute",
            top: "8%",
            right: "-80px",
            width: "420px",
            height: "420px",
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
            width: "360px",
            height: "360px",
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
            padding: "5rem 2.5rem 7rem",
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
                fontSize: "clamp(2.8rem,5vw,4.8rem)",
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
                fontSize: "clamp(1rem,2vw,1.45rem)",
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
              marginTop: "4rem",
              alignItems: "start",
            }}
          >
            {/* Story */}
            <FadeUp delay={0.05}>
              <div className="glass-card" style={{ padding: "2.2rem 2.4rem" }}>
                <div className="s-label">
                  <div className="s-label-line" />
                  <span className="s-label-text">My Story</span>
                </div>
                <p
                  style={{
                    fontSize: "0.97rem",
                    color: "#555",
                    lineHeight: 1.82,
                    fontWeight: 300,
                    marginBottom: "1.2rem",
                  }}
                >
                  My journey into tech started at UMMA University, where I
                  discovered my passion for building solutions that make a
                  difference. From tutoring fellow students at the TechHub to
                  developing BLOCKHOUSE KENYA — a project that reached the
                  highest office in the country — every step has been about
                  using technology to create real impact.
                </p>
                <div className="gold-div" style={{ margin: "0 0 1.4rem" }} />
                <p
                  style={{
                    fontSize: "0.97rem",
                    color: "#666",
                    lineHeight: 1.82,
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  At my core, I just want to build things that help people.
                  Doesn't matter if it's a safety tool, a teaching moment, or
                  something that makes a tedious process suck less. If it
                  solves a real problem, I'm in.
                </p>
              </div>
            </FadeUp>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.8rem",
              }}
            >
              {/* Education */}
              <FadeUp delay={0.12}>
                <div
                  className="glass-card"
                  style={{ padding: "2.2rem 2.4rem" }}
                >
                  <div className="s-label">
                    <div className="s-label-line" />
                    <span className="s-label-text">Education</span>
                  </div>
                  <h3
                    className="serif"
                    style={{
                      fontSize: "1.35rem",
                      color: "#1a1a2e",
                      fontWeight: 700,
                      marginBottom: "0.4rem",
                    }}
                  >
                    B.Sc. Computer Science
                  </h3>
                  <p
                    style={{
                      fontSize: "0.82rem",
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
                      fontSize: "0.92rem",
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
                  style={{ padding: "1.8rem 2.4rem" }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3,1fr)",
                      gap: "1rem",
                      textAlign: "center",
                    }}
                  >
                    {[
                      { n: "2+", l: "Years Exp." },
                      { n: "30+", l: "Students Mentored" },
                      { n: "1", l: "Presidential Showcase" },
                    ].map((s) => (
                      <div key={s.l}>
                        <div
                          className="serif"
                          style={{
                            fontSize: "2rem",
                            fontWeight: 700,
                            color: "#1a1a2e",
                            lineHeight: 1,
                          }}
                        >
                          {s.n}
                        </div>
                        <div
                          style={{
                            fontSize: "0.68rem",
                            color: "#bbb",
                            letterSpacing: "0.07em",
                            textTransform: "uppercase",
                            marginTop: 6,
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

          {/* ════ SKILLS ════ */}
          <FadeUp delay={0.05} style={{ marginTop: "5rem" }}>
            <div className="glass-card" style={{ padding: "2.4rem 2.8rem" }}>
              <div className="s-label">
                <div className="s-label-line" />
                <span className="s-label-text">Technical Skills</span>
              </div>
              <h2
                className="serif"
                style={{
                  fontSize: "1.8rem",
                  color: "#1a1a2e",
                  fontWeight: 700,
                  marginBottom: "1.6rem",
                }}
              >
                Tools & Technologies
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {skills.map((s, i) => (
                  <span
                    key={s}
                    className="skill-pill"
                    style={{
                      animation: `skillIn 0.45s ease ${0.05 * i + 0.1}s both`,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.05} style={{ marginTop: "5rem" }}>
            <div className="s-label">
              <div className="s-label-line" />
              <span className="s-label-text">Experience & Achievements</span>
            </div>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(1.6rem,3vw,2.4rem)",
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
              gap: "1.6rem",
              marginTop: "2rem",
            }}
          >
            {experiences.map((exp, i) => (
              <FadeUp key={exp.title} delay={i * 0.1}>
                <div
                  className="exp-card"
                  onMouseEnter={() => setHoveredExp(i)}
                  onMouseLeave={() => setHoveredExp(null)}
                >
                  {/* Big image */}
                  <div className="exp-img-wrap">
                    <img src={exp.img} alt={exp.title} />
                    <div className="exp-img-overlay" />
                    <span className="exp-tag-badge">{exp.tag}</span>
                  </div>

                  {/* Body */}
                  <div className="exp-body">
                    <span className="exp-date">{exp.date}</span>
                    <h3
                      className="serif"
                      style={{
                        fontSize: "1.12rem",
                        fontWeight: 700,
                        color: "#1a1a2e",
                        lineHeight: 1.3,
                        marginBottom: "0.9rem",
                      }}
                    >
                      {exp.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.87rem",
                        color: "#666",
                        lineHeight: 1.78,
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
          <FadeUp delay={0.05} style={{ marginTop: "4rem" }}>
            <div className="glass-card" style={{ padding: "2.4rem 2.8rem" }}>
              <div className="s-label">
                <div className="s-label-line" />
                <span className="s-label-text">Highlights</span>
              </div>
              <h2
                className="serif"
                style={{
                  fontSize: "1.6rem",
                  color: "#1a1a2e",
                  fontWeight: 700,
                  marginBottom: "1.6rem",
                }}
              >
                Additional Notes
              </h2>
              <div
                className="hl-two-col"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0 3rem",
                }}
              >
                {highlights.map((item) => (
                  <div key={item} className="hl-item">
                    <div className="hl-dot" />
                    <span
                      style={{
                        fontSize: "0.91rem",
                        color: "#666",
                        fontWeight: 300,
                        lineHeight: 1.65,
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
