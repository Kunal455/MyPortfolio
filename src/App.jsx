import React, { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaHackerrank, FaCode } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";

/* ── Fonts ── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap";
document.head.appendChild(fontLink);

/* ── Global CSS ── */
const G = document.createElement("style");
G.textContent = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth; scroll-padding-top: 60px;}
  body{background:#020408;color:#dce8f5;font-family:'JetBrains Mono',monospace;overflow-x:hidden;cursor:none;}
  @media(max-width:768px){body{cursor:auto;}}
  ::-webkit-scrollbar{width:3px;}
  ::-webkit-scrollbar-track{background:#020408;}
  ::-webkit-scrollbar-thumb{background:#1e3a5f;}
  a{text-decoration:none;}
  button{cursor:pointer;}

  @keyframes fadeUp   {from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}
  @keyframes fadeIn   {from{opacity:0}to{opacity:1}}
  @keyframes pulse    {0%,100%{opacity:.35}50%{opacity:1}}
  @keyframes marquee  {from{transform:translateX(0)}to{transform:translateX(-50%)}}
  @keyframes shimmer  {0%{background-position:-400px 0}100%{background-position:400px 0}}
  @keyframes orb      {0%,100%{transform:scale(1) translate(0,0)}33%{transform:scale(1.1) translate(20px,-15px)}66%{transform:scale(.95) translate(-10px,20px)}}
  @keyframes scanline {0%{top:-6px}100%{top:100%}}
  @keyframes drift    {0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-14px) rotate(2deg)}}
  @keyframes blink    {0%,100%{opacity:1}50%{opacity:0}}
  @keyframes glitch1  {0%,100%{clip-path:inset(0 0 100% 0);transform:translateX(0)}10%{clip-path:inset(20% 0 60% 0);transform:translateX(-3px)}20%{clip-path:inset(50% 0 20% 0);transform:translateX(3px)}30%{clip-path:inset(80% 0 0 0);transform:translateX(-2px)}}
  @keyframes glitch2  {0%,100%{clip-path:inset(0 0 100% 0);transform:translateX(0)}10%{clip-path:inset(60% 0 10% 0);transform:translateX(3px)}20%{clip-path:inset(30% 0 50% 0);transform:translateX(-3px)}30%{clip-path:inset(5% 0 80% 0);transform:translateX(2px)}}
  @keyframes menuDrop {from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}

  .reveal{opacity:0;transform:translateY(36px);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1);}
  .reveal.in{opacity:1;transform:none;}
  .d1{transition-delay:.1s;} .d2{transition-delay:.2s;} .d3{transition-delay:.3s;} .d4{transition-delay:.4s;}

  .shimmer-text{
    background:linear-gradient(90deg,#4a7fb5 0%,#a8d4f5 40%,#fff 50%,#a8d4f5 60%,#4a7fb5 100%);
    background-size:400px 100%;
    -webkit-background-clip:text;background-clip:text;
    -webkit-text-fill-color:transparent;
    animation:shimmer 3s linear infinite;
  }

  /* ── Responsive grid helpers ── */
  .g2{display:grid;grid-template-columns:1fr 1fr;gap:72px;}
  .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;}
  .gp{display:grid;grid-template-columns:1fr 1fr;gap:3px;}
  .ga{display:grid;grid-template-columns:repeat(2,1fr);gap:3px;}

  @media(max-width:900px){
    .g2{grid-template-columns:1fr;gap:44px;}
    .g3{grid-template-columns:1fr 1fr;}
    .gp{grid-template-columns:1fr;}
    .ga{grid-template-columns:1fr;}
    .wide-card{grid-column:span 1 !important;}
    .sp{padding:72px 20px !important;}
    .hp{padding-left:20px !important;padding-right:20px !important;}
    .hide-mobile{display:none !important;}
  }
    .g3{grid-template-columns:1fr;}
    .sg{grid-template-columns:1fr 1fr !important;}
    .cert-row{grid-template-columns:56px 1fr !important;}
    .cert-extra{display:none !important;}
  }
  @media(max-width:400px){
    .hp{padding-left:16px !important;padding-right:16px !important;}
    .sp{padding-left:16px !important;padding-right:16px !important;}
    h1{font-size: clamp(20px, 12vw, 130px) !important;}
  }
`;
document.head.appendChild(G);

/* ── useReveal ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      e => e.forEach(x => {
        if (x.isIntersecting) {
          x.target.classList.add("in");
        } else {
          x.target.classList.remove("in");
        }
      }),
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

/* ── useWidth ── */
function useWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

/* ── Cursor ── */
function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  const m = useRef({ x: 0, y: 0 }), r = useRef({ x: 0, y: 0 });
  const clicking = useRef(false);
  useEffect(() => {
    const mv = e => { m.current = { x: e.clientX, y: e.clientY }; };
    const dn = () => { clicking.current = true; };
    const up = () => { clicking.current = false; };
    document.addEventListener("mousemove", mv);
    document.addEventListener("mousedown", dn);
    document.addEventListener("mouseup", up);
    let raf;
    const tick = () => {
      r.current.x += (m.current.x - r.current.x) * 0.1;
      r.current.y += (m.current.y - r.current.y) * 0.1;
      if (dot.current) {
        dot.current.style.left = m.current.x + "px";
        dot.current.style.top = m.current.y + "px";
        dot.current.style.transform = `translate(-50%,-50%) scale(${clicking.current ? 0.5 : 1})`;
      }
      if (ring.current) {
        ring.current.style.left = r.current.x + "px";
        ring.current.style.top = r.current.y + "px";
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); document.removeEventListener("mousemove", mv); document.removeEventListener("mousedown", dn); document.removeEventListener("mouseup", up); };
  }, []);
  const base = { position: "fixed", pointerEvents: "none", zIndex: 9999, transform: "translate(-50%,-50%)" };
  return (
    <>
      <div ref={dot} style={{ ...base, top: 0, left: 0, width: 7, height: 7, borderRadius: "50%", background: "#5ba8f5", boxShadow: "0 0 10px #5ba8f5", transition: "transform .1s" }} />
      <div ref={ring} style={{ ...base, top: 0, left: 0, width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(91,168,245,.4)" }} />
    </>
  );
}

/* ── Particles ── */
function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let W = c.width = window.innerWidth, H = c.height = window.innerHeight;
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 60 }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, r: Math.random() * 1.5 + .3 }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = "rgba(91,168,245,.28)"; ctx.fill(); });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy); if (d < 100) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(30,80,140,${(1 - d / 100) * .3})`; ctx.lineWidth = .5; ctx.stroke(); } }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: .55 }} />;
}

/* ── Nav ── */
const NAVS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certifications" },
  { id: "achievements", label: "Achievements" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const w = useWidth();
  const isMobile = w <= 900;

  useEffect(() => {
    if (!isMobile) setOpen(false);
  }, [isMobile]);

  useEffect(() => {
    const fn = () => { if (open) setOpen(false); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [open]);

  const handleLink = () => { if (isMobile) setOpen(false); };

  const Bar = ({ style }) => (
    <span style={{ display: "block", width: 22, height: 2, background: "#5ba8f5", borderRadius: 2, transition: "all .28s cubic-bezier(.4,0,.2,1)", ...style }} />
  );

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 300, background: "rgba(6,8,18,.94)", backdropFilter: "blur(18px)", borderBottom: "1px solid rgba(30,58,95,.22)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 24px", height: 56, maxWidth: 1200, margin: "0 auto" }}>
        <a href="#home" onClick={handleLink} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: ".06em" }}>
          <span style={{ color: "#5ba8f5" }}>P</span>
          <span style={{ color: "#dce8f5" }}>ORTFOLI</span>
          <span style={{ color: "#1e3a5f" }}>O.</span>
        </a>
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 2, background: "rgba(10,18,40,.7)", border: "1px solid rgba(30,60,120,.35)", borderRadius: 10, padding: "4px 6px" }}>
            {NAVS.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <a key={id} href={`#${id}`}
                  style={{ display: "block", padding: "7px 15px", borderRadius: 7, fontSize: 12, fontFamily: "'Syne',sans-serif", fontWeight: isActive ? 700 : 500, letterSpacing: ".06em", color: isActive ? "#dce8f5" : "#3a5a80", background: isActive ? "linear-gradient(135deg,#1a3a7a,#2a5aaa)" : "transparent", boxShadow: isActive ? "0 0 18px rgba(42,90,170,.55),inset 0 1px 0 rgba(255,255,255,.05)" : "none", transition: "all .2s", whiteSpace: "nowrap" }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = "#8bbfe8"; e.currentTarget.style.background = "rgba(30,60,120,.28)"; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = "#3a5a80"; e.currentTarget.style.background = "transparent"; } }}
                >
                  {label}
                </a>
              );
            })}
          </div>
        )}
        {isMobile && (
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            style={{ background: "none", border: "1px solid rgba(30,60,120,.4)", borderRadius: 7, padding: "9px 11px", display: "flex", flexDirection: "column", gap: 5, alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color .2s", borderColor: open ? "rgba(91,168,245,.5)" : "rgba(30,60,120,.4)" }}
          >
            <Bar style={{ transform: open ? "rotate(45deg) translate(0, 7px)" : "none" }} />
            <Bar style={{ opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "none" }} />
            <Bar style={{ transform: open ? "rotate(-45deg) translate(0, -7px)" : "none" }} />
          </button>
        )}
      </div>
      {isMobile && open && (
        <div style={{ background: "rgba(4,8,20,.98)", borderTop: "1px solid rgba(20,50,100,.3)", animation: "menuDrop .22s ease both", overflow: "hidden" }}>
          {NAVS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <a key={id} href={`#${id}`} onClick={handleLink}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 24px", borderBottom: "1px solid rgba(20,50,100,.15)", color: isActive ? "#5ba8f5" : "#4a6a90", background: isActive ? "rgba(20,50,120,.18)" : "transparent", fontFamily: "'Syne',sans-serif", fontWeight: isActive ? 700 : 500, fontSize: 14, letterSpacing: ".05em", borderLeft: isActive ? "3px solid #5ba8f5" : "3px solid transparent", transition: "all .15s" }}
              >
                <span>{label}</span>
                {isActive && <span style={{ fontSize: 10, color: "#5ba8f5" }}>●</span>}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}

/* ── Shared helpers ── */
function SectionTag({ children }) {
  return (
    <div className="reveal" style={{ fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#3a6a9a", display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
      <span style={{ width: 32, height: 1, background: "linear-gradient(to right,#5ba8f5,transparent)", display: "inline-block" }} />
      {children}
    </div>
  );
}
function SectionTitle({ children }) {
  return (
    <h2 className="reveal d1" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(28px,4.5vw,62px)", color: "#dce8f5", lineHeight: 1.05, marginBottom: 44 }}>
      {children}
    </h2>
  );
}
function HoverBtn({ href, primary, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "inline-block", padding: primary ? "12px 28px" : "12px 4px", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", background: primary ? (hov ? "#3a7abf" : "#1e4a8f") : "transparent", color: primary ? "#dce8f5" : (hov ? "#dce8f5" : "#2a4a6a"), border: primary ? "1px solid rgba(91,168,245,.3)" : "none", boxShadow: primary && hov ? "0 0 24px rgba(30,74,143,.6)" : primary ? "0 0 10px rgba(30,74,143,.25)" : "none", transition: "all .25s", transform: primary && hov ? "translateY(-2px)" : "none" }}>
      {children}
    </a>
  );
}

/* ── Marquee ── */
const MARKS = ["Frontend Dev", "UI/UX Design", "React", "Node.js", "Full Stack", "Express", "MongoDB", "PostgreSQL", "Git", "Docker"];
function Marquee() {
  const items = [...MARKS, ...MARKS];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(20,50,100,.4)", borderBottom: "1px solid rgba(20,50,100,.4)", padding: "12px 0", background: "rgba(5,10,20,.8)", position: "relative", zIndex: 10 }}>
      <div style={{ display: "flex", width: "max-content", animation: "marquee 24s linear infinite" }}>
        {items.map((it, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 18, paddingRight: 32, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: i % 5 === 2 ? "#5ba8f5" : "#1a3050", whiteSpace: "nowrap" }}>
            {it} <span style={{ color: "#1e3a5f", opacity: .7 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Hero ── */
function Hero() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const full = "Full Stack Developer";
  useEffect(() => {
    const el = document.getElementById("home");
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStep(0);
          [0, 200, 400, 600, 800].forEach((t, i) => setTimeout(() => setStep(i + 1), t + 300));
        } else {
          setStep(0);
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (step < 3) {
      setTyped("");
      return;
    }
    let i = 0;
    const iv = setInterval(() => { 
      setTyped(full.slice(0, ++i)); 
      if (i >= full.length) clearInterval(iv); 
    }, 65);
    return () => clearInterval(iv);
  }, [step]);
  const show = (n, style, children) => step >= n ? <div style={{ animation: "fadeUp .8s ease both", ...style }}>{children}</div> : null;

  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", padding: "80px 52px 40px" }} className="hp">
      {[{ top: "15%", left: "60%", w: 480, c: "rgba(10,30,80,.6)" }, { top: "55%", left: "5%", w: 320, c: "rgba(5,20,60,.5)" }, { top: "70%", left: "70%", w: 260, c: "rgba(15,35,90,.4)" }].map((o, i) => (
        <div key={i} style={{ position: "absolute", top: o.top, left: o.left, width: o.w, height: o.w, borderRadius: "50%", background: `radial-gradient(circle,${o.c} 0%,transparent 70%)`, animation: `orb ${12 + i * 3}s ease-in-out infinite`, animationDelay: `${i * 2}s`, pointerEvents: "none" }} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,rgba(91,168,245,.1),transparent)", animation: "scanline 8s linear infinite", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(30,58,95,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(30,58,95,.06) 1px,transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

       <div style={{ position: "relative", zIndex: 2, maxWidth: 900, textAlign: useWidth() <= 900 ? 'center' : 'left' }}>
        {step >= 2 && (
          <div style={{ position: "relative", marginBottom: 4, width: '100%', display: 'flex', justifyContent: useWidth() <= 900 ? 'center' : 'flex-start' }}>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(24px, 10vw, 130px)", whiteSpace: "nowrap", lineHeight: .88, letterSpacing: "-.02em", color: "transparent", position: "absolute", top: 0, left: useWidth() <= 900 ? "50%" : 0, transform: useWidth() <= 900 ? "translateX(-50%)" : "none", WebkitTextStroke: "1px rgba(91,168,245,.1)", animation: "glitch1 6s steps(1) infinite 2s", pointerEvents: "none", userSelect: "none" }}>HI I AM KUNAL</h1>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(24px, 10vw, 130px)", whiteSpace: "nowrap", lineHeight: .88, letterSpacing: "-.02em", color: "transparent", position: "absolute", top: 0, left: useWidth() <= 900 ? "50%" : 0, transform: useWidth() <= 900 ? "translateX(-50%)" : "none", WebkitTextStroke: "1px rgba(150,210,255,.07)", animation: "glitch2 6s steps(1) infinite 2.3s", pointerEvents: "none", userSelect: "none" }}>HI I AM KUNAL</h1>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(24px, 10vw, 130px)", whiteSpace: "nowrap", lineHeight: .88, letterSpacing: "-.02em", animation: "fadeUp .9s ease .2s both" }}>
              <span style={{ background: "linear-gradient(135deg,#dce8f5 0%,#8bbfe8 50%,#3a7abf 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>HI I AM KUNAL</span>
            </h1>
          </div>
        )}
        {step >= 2 && (
          <h1 style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(24px, 8vw, 120px)", whiteSpace: "nowrap", lineHeight: .88, marginBottom: 28, animation: "fadeUp .9s ease .35s both", overflow: "hidden" }}>
            <span className="shimmer-text">{typed}<span style={{ animation: "blink 1s step-end infinite", color: "#5ba8f5" }}>|</span></span>
          </h1>
        )}
        {show(3, { maxWidth: useWidth() <= 900 ? "100%" : 460, fontSize: 13, color: "#2a4a6a", lineHeight: 1.9, marginBottom: 40, marginInline: useWidth() <= 900 ? "auto" : "0" },
          <>Building <span style={{ color: "#8bbfe8" }}>digital experiences</span> at the intersection of design and code. Obsessed with performance, motion, and craft.</>
        )}
        {show(4, { display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", justifyContent: useWidth() <= 900 ? 'center' : 'flex-start' },
          <><HoverBtn href="#projects" primary>View Work</HoverBtn><HoverBtn href="#contact">Let's Talk →</HoverBtn></>
        )}
      </div>
      {step >= 5 && <div style={{ position: "absolute", bottom: -50, right: -10, fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(70px,14vw,240px)", color: "transparent", WebkitTextStroke: "1px rgba(20,50,100,.13)", pointerEvents: "none", userSelect: "none", animation: "fadeIn 2s ease both", lineHeight: 1 }}>DEV</div>}
      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "#1e3a5f", fontSize: 10, letterSpacing: ".25em", textTransform: "uppercase", animation: "fadeIn 1s ease 2s both" }}>
        <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom,#5ba8f5,transparent)", animation: "pulse 2s infinite" }} />
        Scroll
      </div>
    </section>
  );
}

/* ── About ── */
function About() {
  return (
    <section id="about" className="sp" style={{ padding: "96px 52px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent,rgba(5,12,30,.4) 50%,transparent)", pointerEvents: "none" }} />
      <div className="g2" style={{ alignItems: "center", position: "relative", zIndex: 2 }}>
        <div>
          <SectionTag>About Me</SectionTag>
          <SectionTitle>Crafting the <span style={{ color: "#5ba8f5", textShadow: "0 0 18px rgba(91,168,245,.3)" }}>future</span><br />one pixel at a time</SectionTitle>
          <div className="reveal d2" style={{ color: "#2a4a6a", lineHeight: 2.1, fontSize: 13 }}>
            <p>I'm a <span style={{ color: "#8bbfe8" }}>full-stack developer</span> obsessed with building products that look great and work perfectly.</p>
            <p style={{ marginTop: 18 }}>I bridge the gap between design and robust backend systems.</p>
          </div>
        </div>
        <div className="reveal d2" style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          <div style={{ padding: "8px", background: "linear-gradient(135deg,rgba(91,168,245,.2),rgba(10,24,48,.5))", borderRadius: "50%", position: "relative" }}>
            <div style={{ width: "min(280px, 70vw)", aspectRatio: "1/1", borderRadius: "50%", background: "#050f20", border: "1px solid rgba(91,168,245,.3)", position: "relative", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.6)" }}>
              <img src="/profile.jpg" alt="Kunal" style={{ width: "100%", height: "135%", objectFit: "cover", objectPosition: "center 15%", display: "block" }} />
            </div>
          </div>
          <div style={{ position: "absolute", bottom: "0%", right: "8%", width: 60, height: 60, borderRadius: "50%", border: "1px solid rgba(91,168,245,.4)", zIndex: -1, animation: "drift 5s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}

const SKILLS_DATA = [
  { name: "React / Next.js", color: "#61DAFB" }, { name: "JavaScript/TS", color: "#F7DF1E" },
  { name: "Node.js/Express", color: "#8CC84B" }, { name: "Python", color: "#3776AB" },
  { name: "C++ / DSA", color: "#00599C" }, { name: "HTML & CSS", color: "#E34F26" },
  { name: "SQL & MySQL", color: "#00758F" }, { name: "MongoDB", color: "#47A248" },
  { name: "Power BI / Excel", color: "#F2C811" }, { name: "Pandas & NumPy", color: "#150458" },
  { name: "Git / DevOps", color: "#F05032" }, { name: "Postman / Resend", color: "#FF6C37" }
];

function SkillCard({ name, color, i }) {
  const [h, setH] = useState(false);
  return (
    <div className={`reveal d${Math.min((i % 4) + 1, 4)}`} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        background: h ? `linear-gradient(135deg, rgba(5,15,40,0.9), rgba(10,30,60,0.8))` : "rgba(5,12,30,.5)",
        border: `1px solid ${h ? color : "rgba(30,58,95,.3)"}`,
        borderRadius: "16px", transition: "all .3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: h ? "translateY(-6px)" : "none",
        boxShadow: h ? `0 10px 25px ${color}30` : "none", gap: "12px",
        cursor: "none"
      }}>
      <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${color}40`, transition: "all 0.3s" }}>
        <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: color, boxShadow: h ? `0 0 15px ${color}` : "none" }} />
      </div>
      <span style={{ fontSize: "14px", color: h ? "#fff" : "#8ba8c8", fontFamily: "'Syne',sans-serif", fontWeight: 700, letterSpacing: "0.5px", textAlign: "center", transition: "color 0.3s" }}>{name}</span>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="sp" style={{ padding: "96px 52px", background: "rgba(3,7,18,.6)", position: "relative" }}>
      <SectionTag>What I Do</SectionTag>
      <SectionTitle>Technical <span style={{ color: "#5ba8f5", textShadow: "0 0 18px rgba(91,168,245,.3)" }}>Skills</span></SectionTitle>

      <div className="reveal d1" style={{ width: "100%", margin: "40px 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(150px, 45vw, 220px), 1fr))", gap: "16px" }}>
        {SKILLS_DATA.map((s, i) => <SkillCard key={s.name} {...s} i={i} />)}
      </div>
    </section>
  );
}

/* ── Projects ── */
const PROJECTS = [
  { num: "01", title: "E-Commerce Platform", desc: "Full MERN stack store with Stripe payments and custom admin panel.", tags: ["React", "Node.js", "MongoDB", "Stripe"], grad: "linear-gradient(135deg,#040d20,#071530)", accent: "#5ba8f5", image: "/ecommerce.png" },
  { num: "02", title: "Chat System", desc: "Real-time task management using modern WebSockets for instant updates.", tags: ["Next.js", "Socket.io", "Tailwind"], grad: "linear-gradient(135deg,#060816,#0c1228)", accent: "#8bbfe8", image: "/chats.png" },
  { num: "03", title: "Customer Churn Prediction", desc: "Web Wrapper for latest AI APIs to quickly generate variations.", tags: ["React", "OpenAI", "Express"], grad: "linear-gradient(135deg,#030a1a,#080f22)", accent: "#3a7abf", wide: true },
];
function ProjectCard({ p, i }) {
  const [hov, setHov] = useState(false);
  return (
    <div className={`reveal d${i + 1}${p.wide ? " wide-card" : ""}`}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ 
        position: "relative", 
        background: p.image ? `url(${p.image}) center/cover` : p.grad, 
        border: `1px solid ${hov ? p.accent + "50" : "rgba(20,50,100,.3)"}`, 
        overflow: "hidden", 
        aspectRatio: p.wide ? "21/8" : "16/10", 
        gridColumn: p.wide ? "span 2" : "span 1", 
        transition: "border-color .3s,box-shadow .3s", 
        boxShadow: hov ? `0 0 36px rgba(30,80,160,.22)` : "none" 
      }}>
      <div style={{ position: "absolute", inset: 0, background: p.image ? `rgba(2,4,8,0.6)` : `radial-gradient(circle at ${p.wide ? "50% 60%" : "70% 30%"},${p.accent}18 0%,transparent 60%)`, opacity: hov ? 1 : .4, transition: "opacity .5s" }} />
      {hov && <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${p.accent}40,transparent)`, animation: "scanline 2s linear infinite", pointerEvents: "none" }} />}
      <span style={{ position: "absolute", top: 12, right: 16, fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 44, color: `${p.accent}08` }}>{p.num}</span>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 22, background: "linear-gradient(to top,rgba(2,4,8,.94) 0%,transparent 55%)" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 7, flexWrap: "wrap" }}>
          {p.tags.map(t => <span key={t} style={{ fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: p.accent, border: `1px solid ${p.accent}35`, padding: "2px 8px", background: `${p.accent}08` }}>{t}</span>)}
        </div>
        <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: 20, color: "#dce8f5", marginBottom: 4 }}>{p.title}</div>
        <p style={{ fontSize: 11, color: "#1e3a5f", lineHeight: 1.7 }}>{p.desc}</p>
      </div>
    </div>
  );
}
function Projects() {
  return (
    <section id="projects" className="sp" style={{ padding: "96px 52px" }}>
      <SectionTag>Selected Work</SectionTag>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
        <SectionTitle>Projects</SectionTitle>
      </div>
      <div className="gp">
        {PROJECTS.map((p, i) => <ProjectCard key={p.num} p={p} i={i} />)}
      </div>
    </section>
  );
}

/* ── Stacks & Others ── */
const CERTS = [
  { year: "2025", name: "Full Stack Web Development", issuer: "Professional Certificate", badge: "Active", color: "#5ba8f5" },
  { year: "2024", name: "Complete Python Bootcamp", issuer: "Udemy", badge: "Active", color: "#8bbfe8" },
];
function CertCard({ c, i }) {
  const [h, setH] = useState(false);
  const w = useWidth();
  return (
    <div key={c.name} className={`reveal d${Math.min(i + 1, 4)} cert-row`}
      onMouseEnter={() => setH(false || setH(true))} onMouseLeave={() => setH(false)}
      style={{ display: "grid", gridTemplateColumns: w <= 560 ? "50px 1fr" : "60px 1fr auto auto", gap: w <= 560 ? "10px 15px" : "14px 18px", alignItems: "center", padding: w <= 560 ? "15px 18px" : "19px 22px", background: h ? "rgba(10,25,60,.5)" : "rgba(5,12,30,.5)", borderLeft: `2px solid ${h ? c.color : "rgba(20,50,100,.3)"}`, transform: h ? "translateX(5px)" : "none", transition: "all .25s" }}>
      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: w <= 560 ? 16 : 20, color: h ? c.color : "#1e3a5f", transition: "color .2s" }}>{c.year}</div>
      <div>
        <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: w <= 560 ? 14 : 16, color: "#dce8f5" }}>{c.name}</div>
        <div style={{ fontSize: 10, color: "#1a3050", marginTop: 2 }}>{c.issuer}</div>
      </div>
      <span className="cert-extra" style={{ fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: c.color, border: `1px solid ${c.color}35`, padding: "2px 9px", whiteSpace: "nowrap" }}>{c.badge}</span>
      <span className="cert-extra" style={{ color: h ? "#5ba8f5" : "#1a3050", fontSize: 14, transform: h ? "translateX(3px)" : "none", transition: "all .2s" }}>→</span>
    </div>
  );
}

function Certificates() {
  return (
    <section id="certificates" className="sp" style={{ padding: "96px 52px" }}>
      <SectionTag>Credentials</SectionTag>
      <SectionTitle>Certifi<span style={{ color: "#5ba8f5", textShadow: "0 0 18px rgba(91,168,245,.3)" }}>cations</span></SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {CERTS.map((c, i) => <CertCard key={c.name} c={c} i={i} />)}
      </div>
    </section>
  );
}

const ACHIEVEMENTS = [
  { icon: "💻", title: "500+ DSA Questions Solved", org: "LeetCode & GeeksForGeeks", desc: "Demonstrated strong algorithmic and problem-solving skills across major competitive programming platforms.", year: "2024" },
  { icon: "🏆", title: "TCS CodeVita Participant", org: "Hackathon", desc: "Competed in one of the world's largest coding contests tackling complex algorithmic challenges.", year: "2024" },
];
function AchievementCard({ a, i, last }) {
  const [h, setH] = useState(false);
  const w = useWidth();
  return (
    <div key={a.title} className={`reveal d${Math.min(i + 1, 4)}${last ? " wide-card" : ""}`}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ gridColumn: (last && w > 900) ? "span 2" : "span 1", padding: w <= 560 ? "24px 20px" : "28px 24px", background: h ? "rgba(10,25,60,.7)" : "rgba(5,12,30,.6)", border: `1px solid ${h ? "rgba(91,168,245,.3)" : "rgba(20,50,100,.2)"}`, transition: "all .28s", position: "relative", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
        <div style={{ fontSize: 26, lineHeight: 1 }}>{a.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5, flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15, color: h ? "#dce8f5" : "#8ba8c8", transition: "color .2s" }}>{a.title}</div>
            <span style={{ fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "#5ba8f5", border: "1px solid rgba(91,168,245,.25)", padding: "2px 9px" }}>{a.year}</span>
          </div>
          <div style={{ fontSize: 11, color: "#3a6a9a", marginBottom: 7 }}>{a.org}</div>
          <p style={{ fontSize: 12, color: "#1e3a5f" }}>{a.desc}</p>
        </div>
      </div>
    </div>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="sp" style={{ padding: "96px 52px", background: "rgba(4,9,22,.7)" }}>
      <SectionTag>Milestones</SectionTag>
      <SectionTitle>Achieve<span style={{ color: "#5ba8f5", textShadow: "0 0 18px rgba(91,168,245,.3)" }}>ments</span></SectionTitle>
      <div className="ga">
        {ACHIEVEMENTS.map((a, i) => (
          <AchievementCard key={a.title} a={a} i={i} last={i === ACHIEVEMENTS.length - 1} />
        ))}
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section id="resume" className="sp" style={{ padding: "96px 52px", position: "relative" }}>
      <SectionTag>Background</SectionTag>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 14 }}>
        <SectionTitle>My <span style={{ color: "#5ba8f5", textShadow: "0 0 18px rgba(91,168,245,.3)" }}>Résumé</span></SectionTitle>
        <a href="/resume.pdf" target="_blank" className="reveal d1" style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 18px", border: "1px solid rgba(91,168,245,.3)", color: "#5ba8f5", fontSize: 11, fontFamily: "'Syne',sans-serif", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", background: "rgba(10,30,80,.2)", transition: "all .22s", marginBottom: 44, whiteSpace: "nowrap" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(20,60,140,.28)"; e.currentTarget.style.boxShadow = "0 0 16px rgba(30,80,160,.28)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(10,30,80,.2)"; e.currentTarget.style.boxShadow = "none"; }}>
          ↓ Download PDF
        </a>
      </div>
    </section>
  );
}

function SocialLink({ l }) {
  const [h, setH] = useState(false);
  return (
    <a key={l.label} href={l.href} target="_blank" rel="noreferrer" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} title={l.label}
      style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        width: 56, height: 56, borderRadius: "50%",
        background: h ? "rgba(91,168,245,.1)" : "rgba(20,50,100,.2)",
        border: `1px solid ${h ? "rgba(91,168,245,.5)" : "rgba(30,58,95,.5)"}`,
        color: h ? "#5ba8f5" : "#8ba8c8",
        transition: "all .3s ease",
        transform: h ? "translateY(-4px)" : "none",
        boxShadow: h ? "0 10px 20px rgba(0,0,0,.3)" : "none"
      }}>
      <l.Icon style={{ fontSize: 24 }} />
    </a>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState("");
  const w = useWidth();
  const LINKS = [
    { label: "Email", val: "kunal123647@gmail.com", href: "mailto:kunal123647@gmail.com", Icon: FiMail },
    { label: "Phone", val: "+91 9128744294", href: "tel:+919128744294", Icon: FiPhone },
    { label: "GitHub", val: "@Kunal455", href: "https://github.com/Kunal455", Icon: FaGithub },
    { label: "LinkedIn", val: "in/kunal-kumar2", href: "https://www.linkedin.com/in/kunal-kumar2/", Icon: FaLinkedin },
    { label: "LeetCode", val: "@ubLy9jJsDB", href: "https://leetcode.com/u/ubLy9jJsDB/", Icon: FaCode },
    { label: "HackerRank", val: "@kunal", href: "https://www.hackerrank.com/profile/kunal", Icon: FaHackerrank },
    { label: "GeeksForGeeks", val: "@kunal2134", href: "https://www.geeksforgeeks.org/profile/kunal2134", Icon: FaCode }
  ];
  const inp = (key, label, placeholder, type = "text") => (
    <div>
      <div style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: focused === key ? "#5ba8f5" : "#1a3050", marginBottom: 7, transition: "color .2s" }}>{label}</div>
      <input type={type} value={form[key]} placeholder={placeholder}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        onFocus={() => setFocused(key)} onBlur={() => setFocused("")}
        style={{ width: "100%", background: "rgba(5,12,30,.8)", border: `1px solid ${focused === key ? "rgba(91,168,245,.5)" : "rgba(20,50,100,.3)"}`, color: "#dce8f5", padding: "11px 13px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, outline: "none", transition: "border-color .2s" }}
      />
    </div>
  );
  return (
    <section id="contact" className="sp" style={{ padding: "96px 52px", background: "rgba(3,7,18,.7)", position: "relative" }}>
      <div style={{ position: "absolute", bottom: "20%", left: "15%", width: 300, height: 300, background: "radial-gradient(circle,rgba(10,30,100,.1) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div className="g2" style={{ alignItems: "start", position: "relative", zIndex: 2 }}>
        <div>
          <SectionTag>Get In Touch</SectionTag>
          <h2 className="reveal d1" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(40px,6vw,86px)", lineHeight: .9, color: "#dce8f5", marginBottom: 22 }}>
            LET'S<br />BUILD<br /><span style={{ color: "#5ba8f5", textShadow: "0 0 26px rgba(91,168,245,.4)" }}>TOGETHER.</span>
          </h2>
          <p className="reveal d2" style={{ color: "#1e3a5f", lineHeight: 2, fontSize: 13, marginBottom: 32, textAlign: w <= 900 ? 'center' : 'left' }}>Available for freelance and full-time roles. Have a project? Let's talk.</p>
          <div className="reveal d3" style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "10px", justifyContent: w <= 900 ? 'center' : 'flex-start', marginBottom: w <= 900 ? '40px' : '0' }}>
            {LINKS.map(l => <SocialLink key={l.label} l={l} />)}
          </div>
        </div>
        <div className="reveal d2">
          {sent ? (
            <div style={{ padding: 40, border: "1px solid rgba(91,168,245,.25)", textAlign: "center", background: "rgba(5,15,40,.8)" }}>
              <div style={{ fontSize: 40, marginBottom: 12, color: "#5ba8f5", animation: "drift 3s ease-in-out infinite" }}>✓</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 17, color: "#5ba8f5" }}>Message Sent!</div>
              <p style={{ color: "#1e3a5f", marginTop: 7, fontSize: 12 }}>I'll be in touch soon.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {inp("name", "Your Name", "Jane Smith")}
              {inp("email", "Email", "jane@company.com", "email")}
              <div>
                <div style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: focused === "message" ? "#5ba8f5" : "#1a3050", marginBottom: 7, transition: "color .2s" }}>Message</div>
                <textarea value={form.message} placeholder="Tell me about your project..."
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  onFocus={() => setFocused("message")} onBlur={() => setFocused("")}
                  style={{ width: "100%", minHeight: 110, background: "rgba(5,12,30,.8)", border: `1px solid ${focused === "message" ? "rgba(91,168,245,.5)" : "rgba(20,50,100,.3)"}`, color: "#dce8f5", padding: "11px 13px", fontFamily: "'JetBrains Mono',monospace", fontSize: 12, outline: "none", resize: "vertical", transition: "border-color .2s" }}
                />
              </div>
              <button onClick={() => form.name && form.email && setSent(true)}
                style={{ background: "linear-gradient(135deg,#0a2050,#1e4a8f)", color: "#dce8f5", border: "1px solid rgba(91,168,245,.3)", padding: 13, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", marginTop: 5, transition: "all .25s", boxShadow: "0 0 16px rgba(10,40,120,.22)", width: "100%", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg,#1e4a8f,#3a7abf)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(30,80,160,.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg,#0a2050,#1e4a8f)"; e.currentTarget.style.boxShadow = "0 0 16px rgba(10,40,120,.22)"; e.currentTarget.style.transform = "none"; }}>
                Send Message →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "24px", textAlign: "center", borderTop: "1px solid rgba(20,50,100,.3)", fontSize: 10, color: "#2a4a6a", background: "#020408" }}>
      <span>© 2026 Kunal. Building with passion & pixels.</span>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("home");
  const w = useWidth();

  useEffect(() => {
    const secs = document.querySelectorAll("section[id]");
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: .25 }
    );
      secs.forEach(s => io.observe(s));
      return () => io.disconnect();
    }, []);
  
    useReveal();
  
    return (
    <div style={{ minHeight: "100vh", background: "#020408", position: "relative" }}>
      <Particles />
      {w > 768 && <Cursor />}
      <Nav active={active} />
      <div style={{ position: "relative", zIndex: 10, paddingTop: 56 }}>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Achievements />
        <Resume />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
