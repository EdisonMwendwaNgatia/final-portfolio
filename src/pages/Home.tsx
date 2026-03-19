import React, { useEffect, useRef, useState, useCallback } from "react";

/* ── Animated counter hook ── */
const useCounter = (target: number, duration = 1800, started = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    setCount(0);
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return count;
};

const stats = [
  {
    value: 2,
    suffix: "+",
    label: "Years of Experience",
    sublabel: "Building production-grade software",
  },
  {
    value: 20,
    suffix: "+",
    label: "Students Mentored",
    sublabel: "React Native · Umma TechHub",
  },
  {
    value: 40,
    suffix: "+",
    label: "Projects Built",
    sublabel: "Web · Mobile · Enterprise tools",
  },
];

const StatCard: React.FC<{
  item: (typeof stats)[0];
  visible: boolean;
  started: boolean;
  fast: boolean;
}> = ({ item, visible, started, fast }) => {
  const [counted, setCounted] = useState(false);
  useEffect(() => {
    if (visible && started) setCounted(true);
  }, [visible, started]);
  const count = useCounter(item.value, fast ? 600 : 1400, counted);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: visible ? 1 : 0,
        transform: visible
          ? "scale(1) translateY(0)"
          : "scale(0.94) translateY(12px)",
        transition:
          "opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "1.5rem 1.8rem",
          // Remove the media query from here
          background: "rgba(255,255,255,0.75)",
          border: `1px solid ${fast ? "rgba(201,169,110,0.4)" : "rgba(0,0,0,0.065)"}`,
          borderRadius: "5px",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: fast
            ? "0 4px 36px rgba(201,169,110,0.18), 0 1px 0 rgba(255,255,255,0.95) inset"
            : "0 4px 36px rgba(0,0,0,0.04), 0 1px 0 rgba(255,255,255,0.95) inset",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.4s, box-shadow 0.4s",
        }}
        // Add a className for media query styling
        className="stat-card-content"
      >
        {/* top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: fast ? "100%" : "36px",
            height: "2px",
            background: "linear-gradient(90deg, #c9a96e, transparent)",
            transition: "width 0.6s ease",
          }}
        />
        {/* shimmer sweep in fast mode */}
        {fast && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(105deg, transparent 40%, rgba(201,169,110,0.08) 50%, transparent 60%)",
              animation: "shimmer 1.4s linear infinite",
              pointerEvents: "none",
            }}
          />
        )}
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 8vw, 4rem)",
            fontWeight: 700,
            color: "#1a1a2e",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginBottom: "0.3rem",
          }}
        >
          {count}
          <span style={{ color: "#c9a96e", fontSize: "0.6em" }}>
            {item.suffix}
          </span>
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(0.9rem, 3vw, 1rem)",
            fontWeight: 500,
            color: "#1a1a2e",
            letterSpacing: "-0.01em",
            marginBottom: "0.2rem",
          }}
        >
          {item.label}
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(0.7rem, 2.5vw, 0.78rem)",
            fontWeight: 300,
            color: "#aaa",
            letterSpacing: "0.03em",
          }}
        >
          {item.sublabel}
        </div>
      </div>
    </div>
  );
};

/* ── Dots ── */
const Dots: React.FC<{
  total: number;
  active: number;
  onDot: (i: number) => void;
  fast: boolean;
}> = ({ total, active, onDot, fast }) => (
  <div
    style={{
      display: "flex",
      gap: "8px",
      justifyContent: "center",
      marginTop: "1rem",
      flexWrap: "wrap",
      padding: "0 1rem",
    }}
  >
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onDot(i)}
        style={{
          width: i === active ? "24px" : "6px",
          height: "6px",
          borderRadius: "3px",
          background: i === active ? "#c9a96e" : "rgba(0,0,0,0.15)",
          border: "none",
          padding: 0,
          cursor: "pointer",
          minWidth: i === active ? "24px" : "6px",
          transition: `width ${fast ? "0.15s" : "0.35s"} ease, background 0.35s ease`,
          boxShadow:
            i === active && fast ? "0 0 8px rgba(201,169,110,0.7)" : "none",
        }}
        aria-label={`Go to slide ${i + 1}`}
      />
    ))}
  </div>
);

/* ── Power Surge Overlay ── */
const PowerSurge: React.FC<{ active: boolean }> = ({ active }) => (
  <>
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: active ? 1 : 0,
        transition: active ? "opacity 0s" : "opacity 0.6s ease 0.3s",
        background:
          "radial-gradient(ellipse at center, rgba(201,169,110,0.15) 0%, transparent 70%)",
      }}
    />
    {/* top edge */}
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 9999,
        pointerEvents: "none",
        background:
          "linear-gradient(90deg, transparent, #c9a96e, #fff8e8, #c9a96e, transparent)",
        opacity: active ? 1 : 0,
        transform: active ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: active
          ? "opacity 0s, transform 0.35s ease"
          : "opacity 0.4s ease 0.5s, transform 0s 0.9s",
        boxShadow: "0 0 18px 4px rgba(201,169,110,0.8)",
      }}
    />
    {/* bottom edge */}
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 9999,
        pointerEvents: "none",
        background:
          "linear-gradient(90deg, transparent, #c9a96e, #fff8e8, #c9a96e, transparent)",
        opacity: active ? 1 : 0,
        transform: active ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "right",
        transition: active
          ? "opacity 0s, transform 0.35s ease 0.05s"
          : "opacity 0.4s ease 0.5s, transform 0s 0.9s",
        boxShadow: "0 0 18px 4px rgba(201,169,110,0.8)",
      }}
    />
    {/* left edge */}
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        width: "3px",
        zIndex: 9999,
        pointerEvents: "none",
        background:
          "linear-gradient(180deg, transparent, #c9a96e, #fff8e8, #c9a96e, transparent)",
        opacity: active ? 1 : 0,
        transform: active ? "scaleY(1)" : "scaleY(0)",
        transformOrigin: "top",
        transition: active
          ? "opacity 0s, transform 0.35s ease 0.1s"
          : "opacity 0.4s ease 0.5s, transform 0s 0.9s",
        boxShadow: "0 0 18px 4px rgba(201,169,110,0.8)",
      }}
    />
    {/* right edge */}
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        right: 0,
        width: "3px",
        zIndex: 9999,
        pointerEvents: "none",
        background:
          "linear-gradient(180deg, transparent, #c9a96e, #fff8e8, #c9a96e, transparent)",
        opacity: active ? 1 : 0,
        transform: active ? "scaleY(1)" : "scaleY(0)",
        transformOrigin: "bottom",
        transition: active
          ? "opacity 0s, transform 0.35s ease 0.15s"
          : "opacity 0.4s ease 0.5s, transform 0s 0.9s",
        boxShadow: "0 0 18px 4px rgba(201,169,110,0.8)",
      }}
    />
    {/* burst ring */}
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        width: active ? "200vmax" : "0px",
        height: active ? "200vmax" : "0px",
        marginTop: active ? "-100vmax" : "0",
        marginLeft: active ? "-100vmax" : "0",
        borderRadius: "50%",
        zIndex: 9998,
        pointerEvents: "none",
        border: "1.5px solid rgba(201,169,110,0.22)",
        opacity: active ? 1 : 0,
        transition: active
          ? "width 0.6s ease, height 0.6s ease, margin 0.6s ease, opacity 0.2s"
          : "opacity 0.3s ease, width 0s 0.35s, height 0s 0.35s, margin 0s 0.35s",
      }}
    />
  </>
);

const Home: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [fast, setFast] = useState(false);
  const [surging, setSurging] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setStatsStarted(true), 950);
    return () => clearTimeout(t);
  }, [visible]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsStarted(true);
      },
      { threshold: 0.2, rootMargin: "50px" },
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const startCarousel = useCallback((isFast: boolean) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const delay = isFast ? 900 : 2800;
    intervalRef.current = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % stats.length);
    }, delay);
  }, []);

  useEffect(() => {
    if (!statsStarted) return;
    startCarousel(fast);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [statsStarted, fast, startCarousel]);

  const handleBoost = () => {
    if (fast) {
      setFast(false);
    } else {
      setSurging(true);
      setTimeout(() => setSurging(false), 900);
      setTimeout(() => setFast(true), 180);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          @media (min-width: 768px) {
    .stat-card-content {
      padding: 2.2rem 2.4rem !important;
    }
  }

        .home-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: linear-gradient(160deg, #ffffff 0%, #fafafa 52%, #f9f7f4 100%);
          position: relative; 
          overflow-x: hidden;
          overflow-y: auto;
        }

        .reveal { opacity: 0; transform: translateY(18px); }
        .reveal.show { opacity: 1; transform: translateY(0); }
        .t0 { transition: opacity 0.65s ease 0.05s, transform 0.65s ease 0.05s; }
        .t1 { transition: opacity 0.65s ease 0.15s, transform 0.65s ease 0.15s; }
        .t2 { transition: opacity 0.65s ease 0.25s, transform 0.65s ease 0.25s; }
        .t3 { transition: opacity 0.65s ease 0.38s, transform 0.65s ease 0.38s; }
        .t4 { transition: opacity 0.65s ease 0.52s, transform 0.65s ease 0.52s; }

        .ticker-wrap {
          overflow: hidden;
          border-top: 1px solid rgba(0,0,0,0.05);
          border-bottom: 1px solid rgba(0,0,0,0.05);
          padding: 0.6rem 0;
        }
        .ticker-track {
          display: flex; 
          white-space: nowrap;
          animation: ticker var(--ticker-speed, 28s) linear infinite;
          width: max-content;
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-item {
          font-size: 0.72rem; 
          font-weight: 500;
          letter-spacing: 0.14em; 
          text-transform: uppercase;
          color: #ccc; 
          padding: 0 1.5rem;
        }
        @media (max-width: 768px) {
          .ticker-item {
            padding: 0 1rem;
            font-size: 0.65rem;
          }
        }
        .ticker-dot { color: #c9a96e; margin: 0 0.4rem; }

        .btn-primary {
          font-family: 'DM Sans', sans-serif;
          display: inline-flex; 
          align-items: center; 
          gap: 9px;
          background: #1a1a2e; 
          color: #fff;
          border: none; 
          padding: 0.9rem 2rem; 
          border-radius: 3px;
          font-size: 0.85rem; 
          font-weight: 500;
          letter-spacing: 0.07em; 
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          position: relative; 
          overflow: hidden;
          width: fit-content;
          -webkit-tap-highlight-color: transparent;
        }
        @media (max-width: 480px) {
          .btn-primary, .btn-secondary {
            padding: 0.8rem 1.5rem;
            font-size: 0.8rem;
            width: 100%;
            justify-content: center;
          }
        }
        .btn-primary::after {
          content: ''; 
          position: absolute; 
          inset: 0;
          background: linear-gradient(135deg, rgba(201,169,110,0.2) 0%, transparent 60%);
          opacity: 0; 
          transition: opacity 0.3s;
        }
        .btn-primary:active::after { opacity: 1; }
        .btn-primary:active { transform: translateY(-1px); box-shadow: 0 10px 32px rgba(26,26,46,0.22); }
        @media (hover: hover) {
          .btn-primary:hover::after { opacity: 1; }
          .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(26,26,46,0.22); }
        }

        .btn-secondary {
          font-family: 'DM Sans', sans-serif;
          display: inline-flex; 
          align-items: center; 
          gap: 9px;
          background: transparent; 
          color: #1a1a2e;
          border: 1px solid rgba(26,26,46,0.18);
          padding: 0.9rem 2rem; 
          border-radius: 3px;
          font-size: 0.85rem; 
          font-weight: 500;
          letter-spacing: 0.07em; 
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.25s, border-color 0.25s, background 0.25s;
          width: fit-content;
          -webkit-tap-highlight-color: transparent;
        }
        .btn-secondary:active { transform: translateY(-1px); border-color: #c9a96e; background: rgba(201,169,110,0.05); }
        @media (hover: hover) {
          .btn-secondary:hover { transform: translateY(-2px); border-color: #c9a96e; background: rgba(201,169,110,0.05); }
        }

        .scroll-ind {
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          gap: 6px;
          opacity: 0; 
          animation: fadeIn 0.8s ease 1.2s forwards;
        }
        @media (max-width: 1024px) {
          .scroll-ind {
            display: none;
          }
        }
        @keyframes fadeIn { to { opacity: 1; } }
        .scroll-line {
          width: 1px; 
          height: 52px;
          background: linear-gradient(to bottom, #c9a96e, transparent);
          animation: scrollDrop 2s ease-in-out infinite;
        }
        @keyframes scrollDrop {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        @keyframes shimmer {
          from { transform: translateX(-100%); }
          to   { transform: translateX(200%); }
        }

        /* boost button */
        .boost-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem; 
          font-weight: 600;
          letter-spacing: 0.12em; 
          text-transform: uppercase;
          border-radius: 20px; 
          padding: 0.38rem 1rem;
          cursor: pointer;
          display: inline-flex; 
          align-items: center; 
          gap: 6px;
          transition: all 0.3s ease;
          position: relative; 
          overflow: hidden;
          border: none;
          -webkit-tap-highlight-color: transparent;
        }
        .boost-btn.normal {
          background: transparent; 
          color: #aaa;
          border: 1px solid rgba(0,0,0,0.12);
        }
        .boost-btn.normal:active {
          color: #c9a96e; 
          border-color: #c9a96e;
          background: rgba(201,169,110,0.05);
          box-shadow: 0 0 12px rgba(201,169,110,0.2);
        }
        @media (hover: hover) {
          .boost-btn.normal:hover {
            color: #c9a96e; 
            border-color: #c9a96e;
            background: rgba(201,169,110,0.05);
            box-shadow: 0 0 12px rgba(201,169,110,0.2);
          }
        }
        .boost-btn.fast-mode {
          background: linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 100%);
          color: #c9a96e;
          border: 1px solid rgba(201,169,110,0.4);
          box-shadow: 0 0 20px rgba(201,169,110,0.3), inset 0 1px 0 rgba(255,255,255,0.1);
          animation: pulseGlow 1.8s ease-in-out infinite;
        }
        .boost-btn.fast-mode::before {
          content: ''; 
          position: absolute; 
          inset: 0;
          background: linear-gradient(105deg, transparent 35%, rgba(201,169,110,0.25) 50%, transparent 65%);
          animation: shimmer 1.2s linear infinite;
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(201,169,110,0.3), inset 0 1px 0 rgba(255,255,255,0.1); }
          50%       { box-shadow: 0 0 34px rgba(201,169,110,0.6), inset 0 1px 0 rgba(255,255,255,0.1); }
        }

        /* page surge brightness flash */
        .page-surge {
          animation: surgePulse 0.6s ease forwards;
        }
        @keyframes surgePulse {
          0%   { filter: brightness(1)    saturate(1); }
          18%  { filter: brightness(1.1)  saturate(1.5); }
          45%  { filter: brightness(1.05) saturate(1.2); }
          100% { filter: brightness(1)    saturate(1); }
        }
      `}</style>

      <PowerSurge active={surging} />

      <div className={`home-root${surging ? " page-surge" : ""}`}>
        {/* Atmosphere blobs - adjusted for mobile */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "5%",
            width: "clamp(300px, 70vw, 500px)",
            height: "clamp(300px, 70vw, 500px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 68%)",
            filter: "blur(50px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-60px",
            width: "clamp(250px, 60vw, 400px)",
            height: "clamp(250px, 60vw, 400px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(26,26,46,0.04) 0%, transparent 70%)",
            filter: "blur(55px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.018) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        {/* Top gold accent line — glows when fast */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: fast
              ? "linear-gradient(90deg, transparent 0%, #c9a96e 30%, #fff8e0 50%, #c9a96e 70%, transparent 100%)"
              : "linear-gradient(90deg, transparent 0%, #c9a96e 50%, transparent 100%)",
            opacity: fast ? 0.9 : 0.55,
            zIndex: 2,
            transition: "opacity 0.5s, background 0.5s",
            boxShadow: fast ? "0 0 14px rgba(201,169,110,0.65)" : "none",
          }}
        />

        {/* Ticker */}
        <div
          className="ticker-wrap"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div
            className="ticker-track"
            style={
              { "--ticker-speed": fast ? "10s" : "28s" } as React.CSSProperties
            }
          >
            {Array(2)
              .fill(null)
              .map((_, ri) =>
                [
                  "Software Engineer",
                  "React Developer",
                  "AI Tech",
                  "Nairobi, Kenya",
                  "Open to Opportunities",
                ].map((item, i) => (
                  <span key={`${ri}-${i}`} className="ticker-item">
                    {item}
                    <span className="ticker-dot">·</span>
                  </span>
                )),
              )}
          </div>
        </div>

        {/* Hero grid - mobile optimized */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "1.5rem 1.5rem 2.5rem",
            minHeight: "calc(100vh - 42px)",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2.5rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <style>{`
            @media (min-width: 1024px) {
              .hero-grid {
                grid-template-columns: 1fr 420px !important;
                padding: 0 2.5rem !important;
                gap: 5rem !important;
              }
            }
          `}</style>

          {/* LEFT */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              className={`reveal t0 ${visible ? "show" : ""}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{ width: "32px", height: "1px", background: "#c9a96e" }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.73rem",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#c9a96e",
                }}
              >
                Portfolio 2025
              </span>
              <div
                style={{ width: "32px", height: "1px", background: "#c9a96e" }}
              />
            </div>

            <h1
              className={`reveal t1 ${visible ? "show" : ""}`}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 12vw, 5.8rem)",
                fontWeight: 700,
                color: "#1a1a2e",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                marginBottom: "0.5rem",
              }}
            >
              Edison Mwendwa
            </h1>

            <h2
              className={`reveal t2 ${visible ? "show" : ""}`}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1rem, 4vw, 1.7rem)",
                color: "#aaa",
                marginBottom: "1.5rem",
              }}
            >
              Software Engineer
            </h2>

            <div
              className={`reveal t2 ${visible ? "show" : ""}`}
              style={{
                width: "52px",
                height: "1px",
                margin: "0 auto 1.5rem",
                background: "linear-gradient(90deg, #c9a96e, transparent)",
              }}
            />

            <p
              className={`reveal t3 ${visible ? "show" : ""}`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.95rem, 3vw, 1.05rem)",
                color: "#666",
                lineHeight: 1.8,
                fontWeight: 300,
                maxWidth: "600px",
                margin: "0 auto 2rem",
                padding: "0 1rem",
              }}
            >
              Passionate about creating innovative solutions through code.
              Building things that matter with precision and intent.
            </p>

            <div
              className={`reveal t4 ${visible ? "show" : ""}`}
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                justifyContent: "center",
                marginBottom: "3rem",
                width: "100%",
                padding: "0 1rem",
              }}
            >
              <button className="btn-primary">
                View My Work
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M1 6h10M7 2l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button className="btn-secondary">Contact Me</button>
            </div>
          </div>

          {/* RIGHT — Carousel */}
          <div ref={statsRef} style={{ marginTop: "1rem" }}>
            <div
              style={{
                position: "relative",
                height: "auto",
                minHeight: "240px",
                opacity: statsStarted ? 1 : 0,
                transition: "opacity 0.6s ease 0.1s",
              }}
            >
              {stats.map((item, i) => (
                <StatCard
                  key={i}
                  item={item}
                  visible={statsStarted && activeCard === i}
                  started={statsStarted}
                  fast={fast}
                />
              ))}
            </div>

            <div
              style={{
                opacity: statsStarted ? 1 : 0,
                transition: "opacity 0.6s ease 0.3s",
                marginTop: "1rem",
              }}
            >
              <Dots
                total={stats.length}
                active={activeCard}
                fast={fast}
                onDot={(i) => {
                  setActiveCard(i);
                  startCarousel(fast);
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "0.9rem",
                  marginBottom: "1rem",
                }}
              >
                <button
                  className={`boost-btn ${fast ? "fast-mode" : "normal"}`}
                  onClick={handleBoost}
                >
                  {fast ? (
                    <>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                      >
                        <path
                          d="M5.5 1v2M5.5 8v2M1 5.5h2M8 5.5h2M2.64 2.64l1.42 1.42M6.94 6.94l1.42 1.42M2.64 8.36l1.42-1.42M6.94 4.06l1.42-1.42"
                          stroke="#c9a96e"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                      Normal Pace
                    </>
                  ) : (
                    <>
                      <svg
                        width="10"
                        height="12"
                        viewBox="0 0 10 12"
                        fill="none"
                      >
                        <path
                          d="M6 1L1 7h4l-1 4 5-6H5.5L6 1z"
                          fill="currentColor"
                        />
                      </svg>
                      Fast
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
