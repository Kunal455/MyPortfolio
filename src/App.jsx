import React, { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaHackerrank, FaCode, FaReact, FaJs, FaNodeJs, FaPython, FaHtml5, FaGitAlt, FaChartBar } from "react-icons/fa";
import { FiMail, FiPhone, FiExternalLink } from "react-icons/fi";
import { SiCplusplus, SiMysql, SiMongodb, SiPandas, SiPostman } from "react-icons/si";
/* Fonts are handled via index.html */

/* ── useReveal ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      e => e.forEach(x => {
        if (x.isIntersecting) {
          x.target.classList.add("in");
          x.target.setAttribute("data-in", "true");
        } else {
          x.target.classList.remove("in");
          x.target.removeAttribute("data-in");
        }
      }),
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
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
  const base = "fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2";
  return (
    <>
      <div ref={dot} className={`${base} top-0 left-0 w-[7px] h-[7px] rounded-full bg-portfolio-blue shadow-[0_0_10px_#5ba8f5] transition-transform duration-100`} />
      <div ref={ring} className={`${base} top-0 left-0 w-[36px] h-[36px] rounded-full border border-portfolio-blue/40`} />
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
  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none opacity-[0.55]" />;
}

/* ── Nav ── */
const NAVS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certifications" },
  { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" },
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

  const Bar = ({ className }) => (
    <span className={`block w-[22px] h-[2px] bg-portfolio-blue rounded-[2px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${className}`} />
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-[300] bg-[#060812]/95 backdrop-blur-[18px] border-b border-portfolio-blue/20">
      <div className="flex justify-between items-center px-6 h-14 max-w-[1200px] mx-auto">
        <a href="#home" onClick={handleLink} className="font-syne font-extrabold text-xl tracking-wider">
          <span className="text-portfolio-blue">P</span>
          <span className="text-portfolio-text">ORTFOLI</span>
          <span className="text-portfolio-secondary">O.</span>
        </a>
        {!isMobile && (
          <div className="flex items-center gap-0.5 bg-portfolio-dark/70 border border-white/10 rounded-[10px] p-1">
            {NAVS.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <a key={id} href={`#${id}`}
                  className={`block px-[15px] py-[7px] rounded-[7px] text-[12px] font-syne tracking-wider transition-all duration-200 whitespace-nowrap ${
                    isActive ? "font-bold text-portfolio-text bg-gradient-to-br from-[#1a3a7a] to-[#2a5aaa] shadow-[0_0_18px_rgba(42,90,170,0.55)]" : "font-medium text-[#3a5a80] hover:text-[#8bbfe8] hover:bg-white/5"
                  }`}
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
            className={`bg-transparent border rounded-[7px] p-[9px_11px] flex flex-col gap-[5px] items-center justify-center cursor-pointer transition-all duration-200 ${open ? "border-portfolio-blue/50" : "border-white/10"}`}
          >
            <Bar className={open ? "rotate-45 translate-y-[7px]" : ""} />
            <Bar className={open ? "opacity-0 scale-x-0" : "opacity-100"} />
            <Bar className={open ? "-rotate-45 -translate-y-[7px]" : ""} />
          </button>
        )}
      </div>
      {isMobile && open && (
        <div className="bg-[#040814]/98 border-t border-white/10 animate-[menuDrop_0.22s_ease_both] overflow-hidden">
          {NAVS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <a key={id} href={`#${id}`} onClick={handleLink}
                className={`flex items-center justify-between px-6 py-[15px] border-b border-white/5 font-syne text-[14px] tracking-wide transition-all duration-150 border-l-[3px] ${
                  isActive ? "text-portfolio-blue bg-portfolio-blue/10 font-bold border-l-portfolio-blue" : "text-[#4a6a90] font-medium border-l-transparent"
                }`}
              >
                <span>{label}</span>
                {isActive && <span className="text-[10px] text-portfolio-blue">●</span>}
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
    <div className="reveal flex items-center gap-3 mb-3.5 text-[10px] tracking-[0.3em] uppercase text-[#3a6a9a]">
      <span className="inline-block w-8 h-[1px] bg-gradient-to-r from-portfolio-blue to-transparent" />
      {children}
    </div>
  );
}
function SectionTitle({ children }) {
  return (
    <h2 className="reveal d1 font-syne font-extrabold text-[clamp(28px,4.5vw,62px)] text-portfolio-text leading-[1.05] mb-11">
      {children}
    </h2>
  );
}
function HoverBtn({ href, primary, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} 
       onMouseEnter={() => setHov(true)} 
       onMouseLeave={() => setHov(false)}
       className={`inline-block font-syne font-bold text-[11px] tracking-[0.14em] uppercase transition-all duration-200 border border-transparent ${
         primary 
         ? `px-7 py-3 ${hov ? "bg-[#3a7abf] shadow-[0_0_24px_rgba(30,74,143,0.6)] -translate-y-[2px]" : "bg-[#1e4a8f] shadow-[0_0_10px_rgba(30,74,143,0.25)]"} text-portfolio-text border-portfolio-blue/30` 
         : `px-1 py-3 ${hov ? "text-portfolio-text" : "text-[#2a4a6a]"}`
       }`}
    >
      {children}
    </a>
  );
}

/* ── Marquee ── */
const MARKS = ["Frontend Dev", "UI/UX Design", "React", "Node.js", "Full Stack", "Express", "MongoDB", "PostgreSQL", "Git", "Docker"];
function Marquee() {
  const items = [...MARKS, ...MARKS];
  return (
    <div className="overflow-hidden border-y border-white/10 py-3 bg-portfolio-dark/80 relative z-10">
      <div className="flex w-max animate-marquee">
        {items.map((it, i) => (
          <span key={i} className={`flex items-center gap-[18px] pr-8 font-syne font-bold text-[11px] tracking-[0.1rem] uppercase whitespace-nowrap ${i % 5 === 2 ? "text-portfolio-blue" : "text-[#1a3050]"}`}>
            {it} <span className="text-portfolio-secondary opacity-70">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const HERO_PHRASES = ["Full Stack Developer", "Data Science Enthusiast"];
function Hero() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const w = useWidth();

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
      setPhraseIdx(0);
      setIsDeleting(false);
      return;
    }
    const current = HERO_PHRASES[phraseIdx];
    let timeout;
    if (!isDeleting && typed === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typed === "") {
      setPhraseIdx(p => (p + 1) % HERO_PHRASES.length);
      setIsDeleting(false);
    } else {
      timeout = setTimeout(() => {
        setTyped(current.slice(0, typed.length + (isDeleting ? -1 : 1)));
      }, isDeleting ? 30 : 65);
    }
    return () => clearTimeout(timeout);
  }, [step, typed, isDeleting, phraseIdx]);

  const show = (n, className, children) => step >= n ? <div className={`animate-fade-up ${className}`}>{children}</div> : null;

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden px-5 md:px-[52px] py-20">
      {[{ top: "15%", left: "60%", w: 480, c: "rgba(10,30,80,.6)" }, { top: "55%", left: "5%", w: 320, c: "rgba(5,20,60,.5)" }, { top: "70%", left: "70%", w: 260, c: "rgba(15,35,90,.4)" }].map((o, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none" 
             style={{ top: o.top, left: o.left, width: o.w, height: o.w, background: `radial-gradient(circle,${o.c} 0%,transparent 70%)`, animation: `orb ${12 + i * 3}s ease-in-out infinite`, animationDelay: `${i * 2}s` }} />
      ))}
      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-portfolio-blue/10 to-transparent animate-[scanline_8s_linear_infinite] pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,95,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.06)_1px,transparent_1px)] bg-[length:48px_48px] pointer-events-none" />

       <div className="relative z-10 max-w-[900px] text-center mx-auto">
        {step >= 2 && (
          <div className="relative mb-6 w-full flex flex-col items-center">
            <h2 className="font-syne font-bold text-[clamp(18px,4vw,36px)] leading-[1.2] text-[#8bbfe8] mb-1 animate-[fadeUp_0.9s_ease_0.1s_both] tracking-[0.2em] relative z-20 text-center">
              HI, I AM
            </h2>
            <div className="relative w-full flex justify-center">
              <h1 className="font-syne font-bold text-[clamp(36px,8.5vw,90px)] whitespace-nowrap leading-[0.9] tracking-[-0.01em] text-transparent absolute top-0 outline-px outline-[#5ba8f5]/10 animate-[glitch1_6s_steps(1)_infinite_2s] pointer-events-none select-none left-1/2 -translate-x-1/2" style={{ WebkitTextStroke: "2px rgba(91,168,245,.15)" }}>Kunal Kumar</h1>
              <h1 className="font-syne font-bold text-[clamp(36px,8.5vw,90px)] whitespace-nowrap leading-[0.9] tracking-[-0.01em] text-transparent absolute top-0 outline-px outline-[#96d2ff]/7 animate-[glitch2_6s_steps(1)_infinite_2.3s] pointer-events-none select-none left-1/2 -translate-x-1/2" style={{ WebkitTextStroke: "2px rgba(150,210,255,.1)" }}>Kunal Kumar</h1>
              <h1 className="font-syne font-bold text-[clamp(36px,8.5vw,90px)] whitespace-nowrap leading-[0.9] tracking-[-0.01em] animate-[fadeUp_0.9s_ease_0.2s_both]">
                <span className="bg-gradient-to-br from-[#ffffff] via-[#8bbfe8] to-[#3a7abf] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(91,168,245,0.35)]">Kunal Kumar</span>
              </h1>
            </div>
          </div>
        )}
        {step >= 2 && (
          <h1 className="font-serif italic font-normal text-[clamp(16px,4.5vw,100px)] whitespace-nowrap overflow-hidden leading-[0.88] mb-7 animate-[fadeUp_0.9s_ease_0.35s_both]">
            <span className="shimmer-text">{typed}<span className="inline-block animate-[blink_1s_step-end_infinite] text-portfolio-blue">|</span></span>
          </h1>
        )}
        {show(3, "max-w-full md:max-w-[460px] text-[13px] text-[#2a4a6a] leading-[1.9] mb-10 mx-auto",
          <>Building <span className="text-[#8bbfe8]">digital experiences</span> at the intersection of design and code. Obsessed with performance, motion, and craft.</>
        )}
        {show(4, "flex gap-5 items-center flex-wrap justify-center mt-6",
          <>
            <HoverBtn href="/resume.pdf" download="Kunal_Resume.pdf" primary>
              Download Resume
            </HoverBtn>
            <HoverBtn href="#contact">
              Let's Connect
            </HoverBtn>
          </>
        )}
      </div>
      {step >= 5 && <div className="absolute -bottom-[50px] -right-[10px] font-syne font-extrabold text-[clamp(70px,14vw,240px)] text-transparent animate-fade-in pointer-events-none select-none leading-none" style={{ WebkitTextStroke: "1px rgba(20,50,100,.13)" }}>DEV</div>}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-portfolio-secondary text-[10px] tracking-[0.25em] uppercase animate-[fadeIn_1s_ease_2s_both]">
        <div className="w-[1px] h-9 bg-gradient-to-b from-portfolio-blue to-transparent animate-pulse" />
        Scroll
      </div>
    </section>
  );
}

function About() {
  const w = useWidth();
  return (
    <section id="about" className="px-5 md:px-[52px] py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-portfolio-blue/5 to-transparent pointer-events-none" />
      <div className={`flex ${w <= 900 ? 'flex-col gap-14 text-center' : 'flex-row gap-16 lg:gap-24 justify-center'} items-center relative z-10 max-w-[1050px] mx-auto`}>
        <div className="reveal d1 relative flex justify-center shrink-0">
          <div className="p-2 bg-gradient-to-br from-portfolio-blue/20 to-white/5 rounded-full relative">
            <div className="w-[min(320px,75vw)] lg:w-[380px] aspect-square rounded-full bg-[#050f20] border border-portfolio-blue/30 relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
              <img src="/profile.jpg" alt="Kunal" className="w-full h-[135%] object-cover object-[center_15%] block" />
            </div>
          </div>
          <div className="absolute -bottom-2 right-[5%] w-[70px] h-[70px] rounded-full border border-portfolio-blue/40 z-[1] animate-drift" />
        </div>
        <div className={`flex flex-col ${w <= 900 ? 'items-center text-center' : 'items-start text-left'} max-w-[540px]`}>
          <SectionTag>About Me</SectionTag>
          <div className={`reveal d2 text-[#3a5a80] leading-[2.1] text-[13.5px] mt-4`}>
            <p>
              I am a <span className="text-portfolio-text font-bold">3rd-year Computer Science Engineering student</span> with a strong interest in building scalable, real-world applications using the <span className="text-[#8bbfe8] font-bold">MERN stack</span>, along with a growing focus on integrating <span className="text-portfolio-blue font-bold">AI and Machine Learning</span> into modern systems.
            </p>
            <p className="mt-[18px]">
              I enjoy solving complex problems and have developed a solid foundation in <span className="text-portfolio-text font-bold">Data Structures and Algorithms</span>, which helps me write efficient, optimized, and reliable code.
            </p>
            <p className="mt-[18px]">
              With hands-on experience in full-stack development, I have worked on multiple projects that reflect my ability to design, develop, and deploy end-to-end applications. I am continuously learning new technologies and striving to build <span className="text-[#8bbfe8] font-bold">impactful, user-centric solutions.</span>
            </p>
            <div className={`flex gap-4 md:gap-6 mt-10 flex-wrap ${w <= 900 ? 'justify-center' : 'justify-start'}`}>
              <div className="group relative overflow-hidden flex flex-col items-center justify-center py-5 px-2 min-w-[100px] md:min-w-[130px] rounded-xl border border-portfolio-blue/20 bg-portfolio-blue/5 transition-all duration-300 hover:border-portfolio-blue/40 hover:bg-portfolio-blue/10 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(91,168,245,0.15)] flex-1 md:flex-none">
                <div className="absolute inset-0 bg-gradient-to-br from-portfolio-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <h4 className="font-syne text-2xl md:text-4xl font-extrabold text-[#8bbfe8] mb-1 relative z-10">4+</h4>
                <p className="font-syne text-[9px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-portfolio-text/70 relative z-10 text-center">Projects</p>
              </div>
              <div className="group relative overflow-hidden flex flex-col items-center justify-center py-5 px-2 min-w-[100px] md:min-w-[130px] rounded-xl border border-portfolio-blue/20 bg-portfolio-blue/5 transition-all duration-300 hover:border-portfolio-blue/40 hover:bg-portfolio-blue/10 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(91,168,245,0.15)] flex-1 md:flex-none">
                <div className="absolute inset-0 bg-gradient-to-br from-portfolio-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <h4 className="font-syne text-2xl md:text-4xl font-extrabold text-[#8bbfe8] mb-1 relative z-10">8.31</h4>
                <p className="font-syne text-[9px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-portfolio-text/70 relative z-10 text-center">CGPA</p>
              </div>
              <div className="group relative overflow-hidden flex flex-col items-center justify-center py-5 px-2 min-w-[100px] md:min-w-[130px] rounded-xl border border-portfolio-blue/20 bg-portfolio-blue/5 transition-all duration-300 hover:border-portfolio-blue/40 hover:bg-portfolio-blue/10 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(91,168,245,0.15)] flex-1 md:flex-none">
                <div className="absolute inset-0 bg-gradient-to-br from-portfolio-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <h4 className="font-syne text-2xl md:text-4xl font-extrabold text-[#8bbfe8] mb-1 relative z-10">10+</h4>
                <p className="font-syne text-[9px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-portfolio-text/70 relative z-10 text-center">Certificates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SKILLS_DATA = [
  { name: "React / Next.js", color: "#61DAFB", icon: FaReact }, 
  { name: "JavaScript/TS", color: "#F7DF1E", icon: FaJs },
  { name: "Node.js/Express", color: "#8CC84B", icon: FaNodeJs }, 
  { name: "Python", color: "#3776AB", icon: FaPython },
  { name: "C++ / DSA", color: "#00599C", icon: SiCplusplus }, 
  { name: "HTML & CSS", color: "#E34F26", icon: FaHtml5 },
  { name: "SQL & MySQL", color: "#00758F", icon: SiMysql }, 
  { name: "MongoDB", color: "#47A248", icon: SiMongodb },
  { name: "Power BI / Excel", color: "#F2C811", icon: FaChartBar }, 
  { name: "Pandas & NumPy", color: "#150458", icon: SiPandas },
  { name: "Git / DevOps", color: "#F05032", icon: FaGitAlt }, 
  { name: "Postman / Resend", color: "#FF6C37", icon: SiPostman }
];

function SkillCard({ name, color, icon: Icon, i }) {
  const [h, setH] = useState(false);
  return (
    <div className={`reveal d${Math.min((i % 4) + 1, 4)} flex flex-col items-center justify-center gap-3.5 cursor-none`}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    >
      <div className={`w-[85px] h-[85px] rounded-full flex items-center justify-center transition-all duration-300 border-[1.5px]`} 
           style={{ 
             background: h ? `${color}15` : '#050c1e50',
             borderColor: h ? color : 'rgba(255,255,255,0.08)', 
             boxShadow: h ? `0 0 25px ${color}40` : "none",
             transform: h ? 'translateY(-6px)' : 'none'
           }}>
        {Icon ? <Icon className="text-[38px] transition-all duration-300" style={{ color: h ? '#ffffff' : color, filter: h ? `drop-shadow(0 0 8px ${color})` : 'none' }} /> : <div className="w-4 h-4 rounded-full" style={{ background: color }} />}
      </div>
      <span className={`text-[13px] font-syne font-bold tracking-[0.5px] text-center transition-colors duration-300 ${h ? "text-white" : "text-[#8ba8c8]"}`}>{name}</span>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="px-5 md:px-[52px] py-24 bg-[#030712]/60 relative">
      <SectionTag>What I Do</SectionTag>
      <SectionTitle>Technical <span className="text-portfolio-blue shadow-blue-500/30 shadow-[0_0_18px]">Skills</span></SectionTitle>

      <div className="reveal d1 w-full mt-12 grid grid-cols-2 min-[450px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-10 gap-x-4">
        {SKILLS_DATA.map((s, i) => <SkillCard key={s.name} {...s} i={i} />)}
      </div>
    </section>
  );
}

const PROJECTS = [
  { 
    num: "01", 
    title: "An E-commerce Website", 
    desc: [
      "Building a production-ready MERN e-commerce platform with responsive UI and modular components architecture while managing version control using Git.",
      "Creating secure RESTful APIs using Node.js and Express.js for authentication, product catalog, cart, and order workflows with JWT authorization and encryption.",
      "Architecting a scalable MongoDB database and admin dashboard with role-based access control and full CRUD for products, categories, orders, and users, optimizing performance through Mongoose schemas, indexing, and Postman-tested APIs."
    ],
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "JavaScript", "JWT", "Mongoose", "Git", "REST APIs"], 
    grad: "linear-gradient(135deg,#040d20,#071530)", accent: "#5ba8f5", image: "/ecommerce.png", codeUrl: "https://github.com/Kunal455/Ecommerce", demoUrl: "#" 
  },
  { 
    num: "02", 
    title: "Customer Churn Prediction", 
    desc: [
      "Developed a churn prediction model using Python and Random Forest by analyzing telecom customer data through exploratory data analysis, feature engineering, and model evaluation with ROC-AUC.",
      "Implemented probability-based churn risk classification with threshold tuning to improve recall and identify at-risk customers for early retention.",
      "Deployed the trained ML model using FastAPI and integrated it with a React frontend to deliver real-time churn predictions through a user-friendly interface."
    ],
    tags: ["Python", "Pandas", "NumPy", "Scikit-learn", "Random Forest", "FastAPI", "React", "EDA", "ROC-AUC"], 
    grad: "linear-gradient(135deg,#030a1a,#080f22)", accent: "#3a7abf", image: "/churn-new.png", codeUrl: "https://github.com/Kunal455/Customer-Churn-Prediction", demoUrl: "#" 
  },
  { 
    num: "03", 
    title: "Real-Time Chat System", 
    desc: [
      "Designed and implemented a secure one-to-one real-time messaging system using the MERN stack, delivering a responsive UI and a seamless cross-device user experience.",
      "Engineered RESTful backend services using Node.js and Express.js, implementing JWT authentication, password hashing, and scalable MongoDB schemas with Mongoose.",
      "Enabled low-latency, bidirectional communication using Socket.io, supporting real-time message synchronization and online/offline user status tracking, and deployed the application."
    ],
    tags: ["MongoDB Atlas", "Express.js", "React.js", "Node.js", "Mongoose", "Tailwind CSS", "REST APIs", "Socket.io"], 
    grad: "linear-gradient(135deg,#060816,#0c1228)", accent: "#8bbfe8", image: "/chats.png", codeUrl: "https://github.com/Kunal455/ChatSystem", demoUrl: "#" 
  },
  { 
    num: "04", 
    title: "Laptop Performance Prediction", 
    desc: [
      "Machine learning model predicting laptop performance metrics based on hardware specifications.",
      "Utilized advanced regression techniques to accurately estimate real-world computing power.",
      "Preprocessed and analyzed complex hardware datasets using Pandas and NumPy libraries."
    ],
    tags: ["Python", "Scikit-Learn", "Pandas", "Regression Models", "Feature Engineering"], 
    grad: "linear-gradient(135deg,#050a14,#0c152a)", accent: "#5ba8f5", image: "/laptop-perf.png", codeUrl: "https://github.com/Kunal455/Laptop-Performance-Prediction", demoUrl: "#" 
  },
];

function ProjectCard({ p, i }) {
  const [hov, setHov] = useState(false);
  return (
    <div className={`reveal d${Math.min(i + 1, 4)} group bg-[#081021] rounded-[24px] overflow-hidden border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(20,50,100,0.25)] flex flex-col h-full hover:border-[#3a7abf]/40`}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      <div className="w-full aspect-[16/10] overflow-hidden relative">
        {p.image ? (
          <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        ) : (
          <div className="w-full h-full" style={{ background: p.grad }} />
        )}
        <div className="absolute inset-0 bg-portfolio-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      
      <div className="p-7 md:p-9 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2.5 mb-5">
          {p.tags.map(t => (
            <span key={t} className="text-[10px] font-mono px-3 py-1 rounded-full bg-portfolio-blue/10 text-portfolio-blue border border-portfolio-blue/20">
              {t}
            </span>
          ))}
        </div>
        
        <h3 className="font-syne font-bold text-[22px] md:text-[24px] text-portfolio-text mb-3 leading-[1.3] group-hover:text-portfolio-blue transition-colors duration-300">
          {p.title}
        </h3>
        
        <ul className="text-[12.5px] text-[#3a6a9a] leading-[1.65] mb-8 flex-grow list-disc pl-4 space-y-1.5 marker:text-portfolio-blue/60 max-w-full">
          {Array.isArray(p.desc) ? (
            p.desc.map((d, j) => <li key={j}>{d}</li>)
          ) : (
            <li>{p.desc}</li>
          )}
        </ul>
        
        <div className="flex items-center gap-3 mt-auto">
          <a href={p.codeUrl || "#"} className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-portfolio-blue/30 text-portfolio-blue hover:bg-portfolio-blue/10 transition-colors duration-300 w-full md:w-auto">
            <FaGithub className="text-[16px]" />
            <span className="text-[12px] font-syne font-bold tracking-wide">Code</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="px-5 md:px-[52px] py-16">
      <SectionTag>Selected Work</SectionTag>
      <div className="flex justify-between items-end flex-wrap gap-3 mb-10">
        <SectionTitle>Projects</SectionTitle>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-11">
        {PROJECTS.map((p, i) => <ProjectCard key={p.num} p={p} i={i} />)}
      </div>
    </section>
  );
}

/* ── Stacks & Others ── */
const CERTS = [
  { year: "2024", name: "Full Stack Web Development", issuer: "Professional Certificate", badge: "Active", color: "#5ba8f5", image: "/full-stack-web-cert.png", link: "#" },
  { year: "2024", name: "A Complete Web Development Course with AI", issuer: "Udemy", badge: "Active", color: "#8bbfe8", image: "/web-dev-ai-cert.png", link: "https://ude.my/UC-040b5e43-9198-4515-bbd4-f9fb3c0cf44e" },
  { year: "2024", name: "Learn Python Programming - Beginner to Master", issuer: "Udemy", badge: "Active", color: "#3a7abf", image: "/python-cert.png", link: "https://ude.my/UC-1c40de81-4eed-44d7-8cad-02a3e482f82e" },
  { year: "2024", name: "Cloud Computing", issuer: "NPTEL", badge: "Active", color: "#5ba8f5", image: "/cloud-computing-cert.png", link: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS11S1337300282" },
  { year: "2024", name: "Master Generative AI & Generative AI tools", issuer: "Online Course", badge: "Active", color: "#8bbfe8", image: "/generative-ai-cert.png", link: "https://verify.onwingspan.com" },
  { year: "2024", name: "Introduction to Hardware and Operating Systems", issuer: "Online Course", badge: "Active", color: "#3a7abf", image: "/hardware-os-cert.png", link: "https://coursera.org/verify/RGGH2RCY5D8M" },
  { year: "2025", name: "Git and Github", issuer: "CipherSchools", badge: "Active", color: "#f58b5b", image: "/cipher-git-cert.png", link: "https://www.cipherschools.com/verify/CSW2025-11521" },
  { year: "2024", name: "Data Structures & Algorithms Using C++", issuer: "CipherSchools", badge: "Active", color: "#e88b5b", image: "/cipher-dsa-cert.png", link: "https://www.cipherschools.com/verify/CS2024-10167" },
];
function CertCard({ c, i, onClick }) {
  const [h, setH] = useState(false);
  return (
    <div 
      className={`reveal d${Math.min(i + 1, 4)} group flex-shrink-0 w-[300px] md:w-[380px] bg-[#081021] rounded-[24px] overflow-hidden border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(20,50,100,0.25)] hover:border-[#3a7abf]/40 snap-center cursor-pointer`}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      onClick={onClick}
    >
      <div className="w-full aspect-[4/3] overflow-hidden relative bg-[#040814]">
        {c.image ? (
          <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-syne text-[50px] font-extrabold text-white/5" style={{ background: `radial-gradient(circle at 50% 50%, ${c.color}22 0%, #040814 100%)` }}>
            {c.name.charAt(0)}
          </div>
        )}
        <div className="absolute top-4 right-4 bg-[#0a193c]/90 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ color: c.color }}>
          {c.year}
        </div>
      </div>
      
      <div className="p-6 md:p-8 flex flex-col h-[180px]">
        <h3 className="font-syne font-bold text-[18px] md:text-[20px] text-portfolio-text mb-1.5 leading-[1.3] group-hover:text-portfolio-blue transition-colors duration-300 line-clamp-2">
          {c.name}
        </h3>
        <p className="text-[13px] text-[#3a6a9a] mb-6 flex-grow">
          {c.issuer}
        </p>

      </div>
    </div>
  );
}

function Certificates() {
  const [activeCert, setActiveCert] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveCert(null);
    };
    if (activeCert) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCert]);

  useEffect(() => {
    if (activeCert) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [activeCert]);

  return (
    <section id="certificates" className="px-5 md:px-[52px] py-16 overflow-hidden">
      <SectionTag>Credentials</SectionTag>
      <SectionTitle>Certifi<span className="text-portfolio-blue shadow-blue-500/30 shadow-[0_0_18px]">cations</span></SectionTitle>
      
      {/* Horizontal Slider visually mimicking the user's design constraints */}
      <div 
        className="flex overflow-x-auto gap-6 md:gap-8 pb-10 pt-4 mt-6 snap-x snap-mandatory hide-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {CERTS.map((c, i) => <CertCard key={c.name} c={c} i={i} onClick={() => setActiveCert(c)} />)}
      </div>

      {/* Lightbox Modal */}
      {activeCert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn" onClick={() => setActiveCert(null)}>
          <div className="relative max-w-5xl w-full flex flex-col items-center justify-center animate-[fadeUp_0.3s_ease-out]">
            <button className="absolute -top-12 md:-top-10 right-0 md:-right-4 text-white hover:text-portfolio-blue transition-colors text-4xl w-10 h-10 flex items-center justify-center" onClick={() => setActiveCert(null)}>
              &times;
            </button>
            {activeCert.image ? (
              <img src={activeCert.image} alt={activeCert.name} className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 bg-[#040814]" onClick={(e) => e.stopPropagation()} />
            ) : (
              <div className="w-full max-w-md aspect-[4/3] flex flex-col items-center justify-center bg-[#040814] rounded-xl border border-white/10 gap-4" onClick={(e) => e.stopPropagation()}>
                 <span className="text-[60px] leading-none" style={{ color: activeCert.color }}>{activeCert.name.charAt(0)}</span>
                 <span className="text-[#8ba8c8] font-syne text-sm text-center px-6">Image not available for this certificate.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

const ACHIEVEMENTS = [
  { icon: "🏆", title: "Vibe Code India 2025 Hackathon", org: "Certificate of Participation", desc: "Successfully participated and competed in the Vibe Code India 2025 national hackathon.", year: "2025", image: "/vibecode-cert.jpg" },
  { icon: "🔥", title: "100 Days LeetCode Streak Badge", org: "LeetCode", desc: "Maintained a continuous 100-day problem-solving streak, showcasing unyielding consistency and dedication.", year: "2025", image: "/leetcode-100-badge.jpg" },
];
function AchievementCard({ a, i }) {
  const [h, setH] = useState(false);
  const w = useWidth();
  return (
    <div key={a.title} 
      className={`reveal d${Math.min(i + 1, 4)} group relative overflow-hidden flex flex-col transition-all duration-[0.28s] border col-span-1 rounded-2xl ${
         h ? "bg-[#0a193c]/70 border-portfolio-blue/30 -translate-y-1 shadow-[0_15px_30px_rgba(20,60,120,0.25)]" : "bg-[#050c1e]/60 border-white/5"}`}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
    >
      {a.image && (
        <div className="w-full aspect-square overflow-hidden bg-[#02050f] border-b border-white/5 p-4 flex items-center justify-center">
          <img src={a.image} alt={a.title} className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105" />
        </div>
      )}
      <div className="p-6 md:p-7 flex items-start gap-4">
        <div className="text-[26px] leading-none mt-1">{a.icon}</div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1 flex-wrap gap-2">
            <div className={`font-syne font-extrabold text-[15px] transition-colors duration-200 ${h ? "text-portfolio-text" : "text-[#8ba8c8]"}`}>{a.title}</div>
            <span className="text-[9px] tracking-[0.18em] uppercase text-portfolio-blue border border-portfolio-blue/25 px-[9px] py-0.5">{a.year}</span>
          </div>
          <div className="text-[11px] text-[#3a6a9a] mb-[7px]">{a.org}</div>
          <p className="text-[12px] text-[#1e3a5f]">{a.desc}</p>
        </div>
      </div>
    </div>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="px-5 md:px-[52px] py-16 bg-[#040916]/70">
      <SectionTag>Milestones</SectionTag>
      <SectionTitle>Achieve<span className="text-portfolio-blue shadow-blue-500/30 shadow-[0_0_18px]">ments</span></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[3px]">
        {ACHIEVEMENTS.map((a, i) => (
          <AchievementCard key={a.title} a={a} i={i} />
        ))}
      </div>
    </section>
  );
}


function SocialLink({ l }) {
  const [h, setH] = useState(false);
  return (
    <a key={l.label} href={l.href} target="_blank" rel="noreferrer" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} title={l.label}
       className={`flex justify-center items-center w-14 h-14 rounded-full transition-all duration-300 border ${
         h ? "bg-portfolio-blue/10 border-portfolio-blue/50 text-portfolio-blue -translate-y-1 shadow-[0_10px_20px_rgba(0,0,0,0.3)]" : "bg-[#143264]/20 border-white/5 text-[#8ba8c8]"
       }`}>
      <l.Icon className="text-2xl" />
    </a>
  );
}

/* ── Education ── */
const EDUCATION = [
  { institution: "Lovely Professional University", location: "Phagwara, Punjab", degree: "Bachelor of Technology in Computer Science and Engineering", score: "CGPA: 8.31", period: "Aug '23 - Present", accent: "#5ba8f5" },
  { institution: "Modern Public School", location: "Motihari, Bihar", degree: "Intermediate", score: "Percentage: 82.6%", period: "Mar '21 - Mar '22", accent: "#8bbfe8" },
  { institution: "Jeevan Public School", location: "Motihari, Bihar", degree: "Matriculation", score: "Percentage: 88.6%", period: "Mar '19 - Mar '20", accent: "#3a7abf" },
];

function EduCard({ item, i, last }) {
  const [h, setH] = useState(false);
  return (
    <div className={`reveal d${Math.min(i + 1, 5)} relative pl-8 md:pl-12 pb-10`} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      {!last && <div className="absolute left-[11px] md:left-[15px] top-8 bottom-[-10px] w-px bg-white/10" />}
      <div className={`absolute left-1.5 md:left-2 top-2 w-4 h-4 rounded-full border-2 z-10 transition-colors duration-300 flex items-center justify-center ${h ? "bg-[#0a193c]" : "bg-[#050c1e]"}`} style={{ borderColor: item.accent }}>
        {h && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.accent, boxShadow: `0 0 8px ${item.accent}` }} />}
      </div>
      
      <div className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 ${h ? "bg-[#0a193c]/60 shadow-[0_10px_30px_rgba(20,50,100,0.2)] -translate-y-1" : "bg-[#050c1e]/40 border-white/5"}`} style={{ borderColor: h ? item.accent + '50' : 'rgba(255,255,255,0.03)' }}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-3">
          <div>
            <h3 className={`font-syne font-extrabold text-[18px] md:text-[20px] transition-colors duration-300 ${h ? "text-portfolio-text" : "text-[#8ba8c8]"}`}>{item.institution}</h3>
            <div className="text-[12px] text-[#3a6a9a] mt-1">{item.location}</div>
          </div>
          <div className="text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full border whitespace-nowrap" style={{ color: item.accent, borderColor: `${item.accent}30`, backgroundColor: `${item.accent}0a` }}>
            {item.period}
          </div>
        </div>
        <p className="text-[13.5px] text-[#1e3a5f] leading-relaxed mb-3">{item.degree}</p>
        <div className="inline-block px-3 py-1 rounded-md bg-black/40 text-[11px] font-mono font-bold" style={{ color: item.accent, border: `1px solid ${item.accent}30` }}>
          {item.score}
        </div>
      </div>
    </div>
  );
}

function Education() {
  return (
    <section id="education" className="px-5 md:px-[52px] py-16 bg-[#030610]/40">
      <SectionTag>Academic Journey</SectionTag>
      <SectionTitle>Edu<span className="text-portfolio-blue shadow-blue-500/30 shadow-[0_0_18px]">cation</span></SectionTitle>
      
      <div className="relative mt-12 max-w-[800px]">
        {EDUCATION.map((item, i) => <EduCard key={item.institution} item={item} i={i} last={i === EDUCATION.length - 1} />)}
      </div>
    </section>
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
      <div className={`text-[10px] tracking-[0.2em] uppercase mb-1.5 transition-colors duration-200 ${focused === key ? "text-portfolio-blue" : "text-[#1a3050]"}`}>{label}</div>
      <input type={type} value={form[key]} placeholder={placeholder}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        onFocus={() => setFocused(key)} onBlur={() => setFocused("")}
        className={`w-full bg-[#050c1e]/80 border text-portfolio-text px-[13px] py-[11px] font-mono text-[12px] outline-none transition-colors duration-200 ${
          focused === key ? "border-portfolio-blue/50" : "border-white/5"
        }`}
      />
    </div>
  );

  return (
    <section id="contact" className="px-5 md:px-[52px] py-24 bg-[#030712]/70 relative">
      <div className="absolute bottom-[20%] left-[15%] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(10,30,100,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className={`grid ${w <= 900 ? 'grid-cols-1' : 'grid-cols-2'} items-start relative z-10 gap-11`}>
        <div>
          <SectionTag>Get In Touch</SectionTag>
          <h2 className="reveal d1 font-syne font-extrabold text-[clamp(40px,6vw,86px)] leading-[0.9] text-portfolio-text mb-[22px]">
            LET'S<br />BUILD<br /><span className="text-portfolio-blue shadow-blue-500/40 shadow-[0_0_26px]">TOGETHER.</span>
          </h2>
          <p className={`reveal d2 text-[#1e3a5f] leading-loose text-[13px] mb-8 ${w <= 900 ? 'text-center' : 'text-left'}`}>Available for freelance and full-time roles. Have a project? Let's talk.</p>
          <div className={`reveal d3 flex gap-4 flex-wrap mt-[10px] ${w <= 900 ? 'justify-center mb-10' : 'justify-start mb-0'}`}>
            {LINKS.map(l => <SocialLink key={l.label} l={l} />)}
          </div>
        </div>
        <div className="reveal d2">
          {sent ? (
            <div className="p-10 border border-portfolio-blue/25 text-center bg-[#050f28]/80">
              <div className="text-[40px] mb-3 text-portfolio-blue animate-drift">✓</div>
              <div className="font-syne font-extrabold text-[17px] text-portfolio-blue">Message Sent!</div>
              <p className="text-[#1e3a5f] mt-[7px] text-[12px]">I'll be in touch soon.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-[13px]">
              {inp("name", "Your Name", "Jane Smith")}
              {inp("email", "Email", "jane@company.com", "email")}
              <div>
                <div className={`text-[10px] tracking-[0.2em] uppercase mb-1.5 transition-colors duration-200 ${focused === "message" ? "text-portfolio-blue" : "text-[#1a3050]"}`}>Message</div>
                <textarea value={form.message} placeholder="Tell me about your project..."
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  onFocus={() => setFocused("message")} onBlur={() => setFocused("")}
                  className={`w-full min-h-[110px] bg-[#050c1e]/80 border text-portfolio-text px-[13px] py-[11px] font-mono text-[12px] outline-none resize-y transition-colors duration-200 ${
                    focused === "message" ? "border-portfolio-blue/50" : "border-white/5"
                  }`}
                />
              </div>
              <button onClick={() => form.name && form.email && setSent(true)}
                className="w-full bg-gradient-to-br from-[#0a2050] to-[#1e4a8f] text-portfolio-text border border-portfolio-blue/30 p-[13px] font-syne font-bold text-[11px] tracking-[0.15em] uppercase mt-[5px] transition-all duration-200 shadow-[0_0_16px_rgba(10,40,120,0.22)] hover:from-[#1e4a8f] hover:to-[#3a7abf] hover:shadow-[0_0_24px_rgba(30,80,160,0.4)] hover:-translate-y-[2px] cursor-pointer"
              >
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
    <footer className="p-6 text-center border-t border-white/5 text-[10px] text-[#2a4a6a] bg-[#020408]">
      <span>© 2026 Kunal. Building with passion & pixels.</span>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("home");
  const w = useWidth();
  useReveal();

  useEffect(() => {
    const secs = document.querySelectorAll("section[id]");
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: .25 }
    );
    secs.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);
  
  return (
    <div className="min-h-screen bg-portfolio-dark relative">
      <Particles />
      {w > 768 && <Cursor />}
      <Nav active={active} />
      <div className="relative z-10 pt-14">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Achievements />
        <Education />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
