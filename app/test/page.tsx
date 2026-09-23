"use client";
import { useEffect, useRef, useState } from "react";

// 6 soothing palettes — no hard purples
const SECTION_PALETTES = [
  { h1: 172, s1: 55, l1: 38, h2: 185, s2: 50, l2: 42 }, // teal
  { h1: 35,  s1: 75, l1: 46, h2: 22,  s2: 70, l2: 49 }, // warm amber
  { h1: 338, s1: 55, l1: 48, h2: 350, s2: 50, l2: 52 }, // dusty rose
  { h1: 145, s1: 50, l1: 36, h2: 158, s2: 45, l2: 40 }, // sage green
  { h1: 200, s1: 65, l1: 40, h2: 215, s2: 58, l2: 44 }, // sky / steel blue
  { h1: 18,  s1: 70, l1: 46, h2: 8,   s2: 65, l2: 50 }, // warm terracotta
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const sectionPal = (idx: number, t: number) => {
  const p = SECTION_PALETTES[Math.min(idx, SECTION_PALETTES.length - 1)];
  const wave = 0.5 + 0.5 * Math.sin(t * 0.7);
  return {
    h: lerp(p.h1, p.h2, wave),
    s: lerp(p.s1, p.s2, wave),
    l: lerp(p.l1, p.l2, wave),
  };
};

const SECTIONS = [
  { text: "Piyush",    label: "· 2026" },
  { text: "Creative",  label: "Design · Art" },
  { text: "Developer", label: "Code · Build" },
  { text: "Builder",   label: "Ship · Scale" },
  { text: "Thinker",   label: "Ideas · Vision" },
  { text: "Maker",     label: "Craft · Launch" },
];

// All 6 mid-palette colors for the mixed ball
const ALL_COLS = [
  { h: 178, s: 52, l: 40 },
  { h:  28, s: 72, l: 47 },
  { h: 344, s: 52, l: 50 },
  { h: 151, s: 47, l: 38 },
  { h: 207, s: 62, l: 42 },
  { h:  13, s: 67, l: 48 },
];

export default function TestPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRefs  = SECTIONS.map(() => useRef<HTMLDivElement>(null));
  const scrollRef = useRef(0);
  const [fontReady, setFontReady] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@900&family=Inter:wght@300;400&display=swap";
    document.head.appendChild(link);
    document.fonts.ready.then(() =>
      document.fonts.load("900 120px Outfit").then(() => setFontReady(true))
    );
  }, []);

  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!fontReady) return;
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    let W = 0, H = 0;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const off    = document.createElement("canvas");
    const offCtx = off.getContext("2d")!;
    let startTime: number | null = null;
    let raf: number;

    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const ease  = (t: number) => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2;

    const bezPt = (
      t: number,
      p0: [number,number], p1: [number,number],
      p2: [number,number], p3: [number,number]
    ): [number,number] => [
      (1-t)**3*p0[0] + 3*(1-t)**2*t*p1[0] + 3*(1-t)*t**2*p2[0] + t**3*p3[0],
      (1-t)**3*p0[1] + 3*(1-t)**2*t*p1[1] + 3*(1-t)*t**2*p2[1] + t**3*p3[1],
    ];

    /* ─── PREMIUM PARTICLE STREAM ───────────────────────────────────────── */
    const drawStream = (
      ax: number, ay: number, bx: number, by: number,
      prog: number, s: number, palIdx: number
    ) => {
      if (prog <= 0) return;
      const pal = sectionPal(palIdx, s);

      const p0: [number,number] = [ax, ay];
      const p3: [number,number] = [bx, by];
      const dx = bx - ax, dy = by - ay;
      // Gentle arc — control points create an elegant curved path
      const p1: [number,number] = [ax + dx * 0.12, ay + dy * 0.38];
      const p2: [number,number] = [bx - dx * 0.12, by - dy * 0.38];

      // Sample the visible portion of the curve
      const STEPS = 140;
      const visCount = Math.floor(STEPS * prog);
      const pts: [number,number][] = Array.from(
        { length: visCount + 1 }, (_, i) => bezPt(i / STEPS, p0, p1, p2, p3)
      );
      if (pts.length < 2) return;

      // ── 1. Gossamer guide thread — barely visible, like a silk wire ───
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      // Faint colored thread
      ctx.strokeStyle = `hsla(${pal.h},${pal.s}%,${pal.l}%,0.12)`;
      ctx.lineWidth   = 1.2;
      ctx.stroke();
      ctx.restore();

      // ── 2. Flowing luminous droplets ─────────────────────────────────
      // Deterministic positions based on time — no state needed
      const N = 14;
      // Particle configs: [speed multiplier, size, opacity peak]
      const configs = [
        [0.38, 4.5, 0.88], [0.44, 2.5, 0.70], [0.31, 3.5, 0.80],
        [0.52, 1.8, 0.60], [0.40, 5.0, 0.92], [0.36, 2.0, 0.65],
        [0.48, 3.0, 0.75], [0.33, 4.0, 0.85], [0.55, 1.5, 0.55],
        [0.42, 2.8, 0.72], [0.29, 3.8, 0.82], [0.50, 2.2, 0.68],
        [0.46, 1.2, 0.50], [0.35, 4.2, 0.88],
      ];

      for (let k = 0; k < N; k++) {
        const [spd, sz, peakAlpha] = configs[k % configs.length];
        // Phase 0→1 along the full path, wrapping over time
        const rawPhase = ((s * spd + k / N) % 1);
        // Only draw if within the visible (prog) portion
        if (rawPhase > prog) continue;

        // Absolute position along the curve 0→1
        const t = rawPhase;
        const [px, py] = bezPt(t, p0, p1, p2, p3);

        // Fade in at tail, fade out at tip for smoothness
        const fadeIn  = Math.min(t / 0.08, 1);
        const fadeOut = Math.min((prog - t) / 0.06, 1);
        const alpha   = (peakAlpha as number) * fadeIn * fadeOut;
        if (alpha <= 0.01) continue;

        const r = sz as number;

        ctx.save();
        // Soft glow behind each droplet
        ctx.shadowColor = `hsla(${pal.h},${pal.s}%,${pal.l}%,${alpha * 0.7})`;
        ctx.shadowBlur  = r * 5;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        // Radial gradient: bright centre → section color → transparent edge
        const dg = ctx.createRadialGradient(
          px - r * 0.3, py - r * 0.3, 0,
          px, py, r
        );
        dg.addColorStop(0,   `hsla(${pal.h},${Math.max(0,pal.s-15)}%,${pal.l + 28}%,${alpha})`);
        dg.addColorStop(0.5, `hsla(${pal.h},${pal.s}%,${pal.l + 10}%,${alpha * 0.8})`);
        dg.addColorStop(1,   `hsla(${pal.h},${pal.s}%,${pal.l}%,0)`);
        ctx.fillStyle = dg;
        ctx.fill();
        ctx.restore();
      }

      // ── 3. Leading droplet at the tip — slightly larger anchor ────────
      const tip = pts[pts.length - 1];
      ctx.save();
      ctx.shadowColor = `hsla(${pal.h},${pal.s}%,${pal.l}%,0.85)`;
      ctx.shadowBlur  = 18;
      ctx.beginPath();
      ctx.arc(tip[0], tip[1], 4.5, 0, Math.PI * 2);
      const tg = ctx.createRadialGradient(tip[0]-1.5, tip[1]-1.5, 0, tip[0], tip[1], 4.5);
      tg.addColorStop(0, "rgba(255,255,255,0.95)");
      tg.addColorStop(0.4, `hsla(${pal.h},${pal.s}%,${pal.l+22}%,0.9)`);
      tg.addColorStop(1,   `hsla(${pal.h},${pal.s}%,${pal.l}%,0.4)`);
      ctx.fillStyle = tg;
      ctx.fill();
      ctx.restore();
    };

    /* ─── LIQUID TEXT FILL ──────────────────────────────────────────────── */
    const drawLiquidText = (
      text: string, tx: number, ty: number,
      fz: number, font: string, level: number, s: number, palIdx: number
    ) => {
      if (level <= 0) return;
      if (off.width !== W || off.height !== H) { off.width = W; off.height = H; }
      offCtx.clearRect(0, 0, W, H);

      ctx.font = font; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      const tw   = ctx.measureText(text).width;
      const tL   = tx - tw / 2, tR = tx + tw / 2;
      const tTop = ty - fz * 0.72, tBot = ty + fz * 0.32, tH = tBot - tTop;

      const pal  = sectionPal(palIdx, s);
      const pal2 = sectionPal(palIdx, s + 3);

      // Diagonal gradient for a rich liquid look
      const lg = offCtx.createLinearGradient(tL, tTop, tR, tBot);
      lg.addColorStop(0,   `hsl(${pal.h},${pal.s}%,${Math.max(22, pal.l - 10)}%)`);
      lg.addColorStop(0.4, `hsl(${lerp(pal.h, pal2.h, 0.4)},${lerp(pal.s, pal2.s, 0.4)}%,${pal.l}%)`);
      lg.addColorStop(1,   `hsl(${pal2.h},${pal2.s}%,${Math.max(22, pal2.l - 8)}%)`);
      offCtx.fillStyle = lg;

      const fillTop = tBot - tH * level;
      const wAmp    = 3.5 * (1 - level * 0.88);
      offCtx.beginPath();
      offCtx.moveTo(tL - 30, tBot + 10);
      offCtx.lineTo(tL - 30, fillTop);
      for (let i = 0; i <= 70; i++) {
        const x = tL + (tw + 60) * i / 70 - 30;
        offCtx.lineTo(x, fillTop + wAmp * Math.sin(i * 0.28 + s * 5.2));
      }
      offCtx.lineTo(tR + 30, tBot + 10);
      offCtx.closePath();
      offCtx.fill();

      offCtx.globalCompositeOperation = "destination-in";
      offCtx.font = font; offCtx.textAlign = "center"; offCtx.textBaseline = "middle";
      offCtx.fillStyle = "#000";
      offCtx.fillText(text, tx, ty);
      offCtx.globalCompositeOperation = "source-over";

      ctx.save();
      ctx.shadowColor = `hsla(${pal.h},${pal.s}%,${pal.l}%,0.6)`;
      ctx.shadowBlur  = 36 * level;
      ctx.drawImage(off, 0, 0);
      ctx.restore();
    };

    /* ─── BALL ──────────────────────────────────────────────────────────── */
    const drawBall = (bx: number, by: number, br: number, s: number) => {
      const morph = 1 + 0.05 * Math.sin(s * 1.3);
      ctx.save();
      ctx.translate(bx, by);
      ctx.scale(morph, 1 / morph);

      // Outer halos — each ring cycles through the 6 colors
      [80, 60, 42].forEach((r, i) => {
        const shift = Math.floor((s * 0.15 + i * 1.5) % ALL_COLS.length);
        const gc = ALL_COLS[shift];
        const glo = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
        glo.addColorStop(0, `hsla(${gc.h},${gc.s}%,${gc.l}%,${[0.07, 0.11, 0.2][i]})`);
        glo.addColorStop(1, `hsla(${gc.h},${gc.s}%,${gc.l}%,0)`);
        ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fillStyle = glo; ctx.fill();
      });

      // Body: 6 slowly rotating blobs, one per section color
      const rot = s * 0.18;
      ALL_COLS.forEach((c, i) => {
        const angle = rot + (i / ALL_COLS.length) * Math.PI * 2;
        const ox = Math.cos(angle) * br * 0.25;
        const oy = Math.sin(angle) * br * 0.25;
        const blob = ctx.createRadialGradient(ox, oy, 0, ox, oy, br * 0.82);
        blob.addColorStop(0,    `hsla(${c.h},${c.s}%,${c.l + 18}%,0.68)`);
        blob.addColorStop(0.55, `hsla(${c.h},${c.s}%,${c.l}%,0.48)`);
        blob.addColorStop(1,    `hsla(${c.h},${c.s}%,${c.l}%,0)`);
        ctx.beginPath(); ctx.arc(0, 0, br, 0, Math.PI * 2);
        ctx.fillStyle = blob; ctx.fill();
      });

      // Dark vignette rim for depth
      const rim = ctx.createRadialGradient(0, 0, br * 0.5, 0, 0, br);
      rim.addColorStop(0, "rgba(0,0,0,0)");
      rim.addColorStop(1, "rgba(0,0,0,0.28)");
      ctx.beginPath(); ctx.arc(0, 0, br, 0, Math.PI * 2);
      ctx.fillStyle = rim; ctx.fill();

      // Specular highlight
      const sp = ctx.createRadialGradient(-br*0.28, -br*0.32, 0, -br*0.28, -br*0.32, br * 0.46);
      sp.addColorStop(0, "rgba(255,255,255,0.75)");
      sp.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath(); ctx.arc(0, 0, br, 0, Math.PI * 2);
      ctx.fillStyle = sp; ctx.fill();

      ctx.restore();
    };

    /* ─── MAIN DRAW LOOP ────────────────────────────────────────────────── */
    const draw = (ts: number) => {
      if (!startTime) startTime = ts;
      const s = (ts - startTime) / 1000;
      if (off.width !== W || off.height !== H) { off.width = W; off.height = H; }
      ctx.clearRect(0, 0, W, H);

      const fz   = Math.max(64, Math.min(W * 0.17, 160));
      const font = `900 ${fz}px Outfit, sans-serif`;
      ctx.font = font; ctx.textAlign = "center"; ctx.textBaseline = "middle";

      const bx = W - 72, by = 72, br = 44;
      const N  = SECTIONS.length;
      const rawSf = scrollRef.current / H; // 0 … N-1

      const rects = textRefs.map(r => r.current?.getBoundingClientRect() || null);

      // ── Section 0: auto-fill on load, then drain as we start scrolling ──
      const initStream = s < 0.4 ? 0 : Math.min(1, (s - 0.4) / 1.6);
      const initFill   = s < 2.0 ? 0 : ease(Math.min(1, (s - 2.0) / 2.4));
      const s0drain    = ease(clamp(rawSf / 0.5, 0, 1));
      const fill0      = initFill * (1 - s0drain);

      // ── Sections 1…N-1: symmetric fill + drain ────────────────────────
      // Each section n:
      //   Fill window  : rawSf [n-0.5 → n]       ball → text
      //   Drain window : rawSf [n   → n+0.5]      text → ball  (except last)
      const sectionFills: number[]  = [fill0];
      const sectionDrains: number[] = [s0drain];

      for (let n = 1; n < N; n++) {
        const fillFrac  = ease(clamp((rawSf - (n - 0.5)) / 0.5, 0, 1));
        const drainFrac = (n < N - 1)
          ? ease(clamp((rawSf - n) / 0.5, 0, 1))
          : 0; // last section never drains
        sectionFills.push(fillFrac * (1 - drainFrac));
        sectionDrains.push(drainFrac);
      }

      // Outlines + liquid fill
      const drawOutline = (text: string, tx: number, ty: number, lvl: number) => {
        ctx.save(); ctx.font = font; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.strokeStyle = `rgba(20,20,20,${Math.max(0.04, 0.14 - lvl * 0.11)})`;
        ctx.lineWidth = 2; ctx.strokeText(text, tx, ty); ctx.restore();
      };

      rects.forEach((r, i) => {
        if (!r || r.bottom < 0 || r.top > H) return;
        const tx = r.left + r.width / 2, ty = r.top + r.height / 2;
        drawOutline(SECTIONS[i].text, tx, ty, sectionFills[i]);
        drawLiquidText(SECTIONS[i].text, tx, ty, fz, font, sectionFills[i], s, i);
      });

      // ── Streams ────────────────────────────────────────────────────────
      // Section 0
      const r0 = rects[0];
      if (r0) {
        const t0x = r0.left + r0.width / 2, t0y = r0.top + r0.height / 2;
        if (initStream > 0 && s0drain < 0.05)
          drawStream(bx, by, t0x, t0y, initStream, s, 0);          // ball → text (fill)
        if (s0drain > 0.05 && s0drain < 0.95 && initFill > 0.4)
          drawStream(t0x, t0y, bx, by, s0drain, s, 0);              // text → ball (drain)
      }

      // Sections 1…N-1
      for (let n = 1; n < N; n++) {
        const r = rects[n];
        if (!r || r.top > H + 100) continue;
        const tx = r.left + r.width / 2, ty = r.top + r.height / 2;
        const fillFrac  = ease(clamp((rawSf - (n - 0.5)) / 0.5, 0, 1));
        const drainFrac = sectionDrains[n];

        // Ball → text while filling (and not yet draining)
        if (fillFrac > 0 && fillFrac < 1 && drainFrac < 0.05)
          drawStream(bx, by, tx, ty, fillFrac, s, n);

        // Text → ball while draining
        if (drainFrac > 0.05 && drainFrac < 0.95)
          drawStream(tx, ty, bx, by, drainFrac, s, n);
      }

      drawBall(bx, by, br, s);
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [fontReady]);

  const labelColors = [
    "hsl(172,52%,36%)", "hsl(35,68%,42%)", "hsl(338,52%,44%)",
    "hsl(145,48%,34%)", "hsl(207,60%,38%)", "hsl(13,64%,44%)",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@900&family=Inter:wght@300;400&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{background:#f9f9f8;font-family:'Inter',sans-serif;}

        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{
          background:linear-gradient(180deg,
            hsl(172,52%,50%) 0%,
            hsl(35,65%,55%)  33%,
            hsl(338,50%,58%) 66%,
            hsl(13,60%,52%)  100%
          );
          border-radius:100px;
        }
        ::-webkit-scrollbar-thumb:hover{filter:brightness(0.88);}
        *{scrollbar-width:thin;scrollbar-color:hsl(172,45%,48%) transparent;}

        @keyframes bob{
          0%,100%{transform:translateX(-50%) translateY(0);}
          50%{transform:translateX(-50%) translateY(8px);}
        }
        @keyframes fadeUp{
          from{opacity:0;transform:translateY(14px);}
          to{opacity:1;transform:translateY(0);}
        }
        .sec-label{
          font-family:'Inter',sans-serif;font-weight:300;
          font-size:0.63rem;letter-spacing:0.3em;text-transform:uppercase;
          opacity:0;animation:fadeUp 1s ease both;
        }
        .page-grain{
          position:fixed;inset:0;pointer-events:none;z-index:5;opacity:0.022;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:200px 200px;
        }
        .sec-divider{
          position:absolute;bottom:0;left:50%;transform:translateX(-50%);
          width:36px;height:1px;background:rgba(0,0,0,0.07);
        }
      `}</style>

      <div className="page-grain"/>

      <canvas ref={canvasRef} style={{position:"fixed",inset:0,display:"block",zIndex:10,pointerEvents:"none"}}/>

      <div style={{height:`${SECTIONS.length * 100}vh`}}>
        {SECTIONS.map((sec, i) => (
          <section key={i} style={{
            height:"100vh",display:"flex",flexDirection:"column",
            alignItems:"center",justifyContent:"center",
            position:"relative",gap:18,
          }}>
            <p className="sec-label" style={{color:labelColors[i], animationDelay:`${i===0?0.5:0}s`}}>
              {sec.label}
            </p>

            <div ref={textRefs[i]} style={{
              fontFamily:"'Outfit',sans-serif",fontWeight:900,
              fontSize:"clamp(4.5rem,17vw,160px)",letterSpacing:"0.04em",
              color:"transparent",userSelect:"none",lineHeight:1,
            }}>
              {sec.text}
            </div>

            {i === 0 && (
              <div style={{
                position:"absolute",bottom:44,left:"50%",
                animation:"bob 2.4s ease-in-out infinite",
                display:"flex",flexDirection:"column",alignItems:"center",gap:7,opacity:0.28,
              }}>
                <span style={{
                  fontFamily:"'Inter',sans-serif",fontWeight:300,
                  fontSize:"0.6rem",letterSpacing:"0.24em",
                  color:labelColors[0],textTransform:"uppercase",
                }}>Scroll</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke={labelColors[0]} strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
              </div>
            )}

            {i < SECTIONS.length - 1 && <div className="sec-divider"/>}
          </section>
        ))}
      </div>
    </>
  );
}