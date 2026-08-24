import React, { useEffect, useRef, useState } from "react";

/* ---------------- Préférences de mouvement ---------------- */
export function usePRM(): boolean {
  const [prm, setPrm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrm(mq.matches);
    const fn = (e: MediaQueryListEvent) => setPrm(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return prm;
}

/* ---------------- Révélation au défilement ---------------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setOn(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`rv ${on ? "on" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------- Effet décodage (scramble) ---------------- */
const GLYPHS = "▓▒░<>/#01AFRI·";
export function useScramble(text: string, speed = 28): string {
  const prm = usePRM();
  const [out, setOut] = useState(prm ? text : "");
  useEffect(() => {
    if (prm) {
      setOut(text);
      return;
    }
    let frame = 0;
    const total = text.length * 3 + 8;
    const id = window.setInterval(() => {
      frame++;
      const fixed = Math.floor((frame / total) * text.length * 1.4);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        if (i < fixed) s += text[i];
        else if (text[i] === " ") s += " ";
        else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (fixed >= text.length) {
        setOut(text);
        window.clearInterval(id);
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed, prm]);
  return out;
}

/* ---------------- Scrollspy ---------------- */
export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY + window.innerHeight * 0.32;
        let cur = ids[0] ?? "";
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= y) cur = id;
        }
        setActive(cur);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ids]);
  return active;
}

/* ---------------- Barre de progression de lecture ---------------- */
export function useProgress(): number {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}

/* ---------------- Copie presse-papiers ---------------- */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

export function CopyBtn({ text, dark = true }: { text: string; dark?: boolean }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={async () => {
        const done = await copyText(text);
        if (done) {
          setOk(true);
          window.setTimeout(() => setOk(false), 1700);
        }
      }}
      className={`mono-k px-3 py-1.5 border transition-colors duration-150 cursor-pointer ${
        dark
          ? "border-gold/50 text-gold-2 hover:bg-gold hover:text-pine-3"
          : "border-ink/40 text-ink hover:bg-ink hover:text-paper"
      }`}
      style={{ letterSpacing: "0.14em", fontSize: 10 }}
    >
      {ok ? "✓ COPIÉ" : "⧉ COPIER"}
    </button>
  );
}

/* ---------------- Colorimétrie des notes ---------------- */
export function gradeTone(grade: string) {
  const t = grade.replace("AI-", "");
  if (t === "AAA" || t === "AA" || t === "A")
    return { fg: "#155e3d", bg: "rgba(30,122,79,0.13)", bd: "rgba(30,122,79,0.45)" };
  if (t === "BBB" || t === "BB")
    return { fg: "#7c621a", bg: "rgba(138,109,31,0.14)", bd: "rgba(138,109,31,0.45)" };
  if (t === "B")
    return { fg: "#96690c", bg: "rgba(176,124,16,0.15)", bd: "rgba(176,124,16,0.5)" };
  if (t === "CCC" || t === "CC" || t === "C")
    return { fg: "#a04a25", bg: "rgba(180,83,42,0.14)", bd: "rgba(180,83,42,0.45)" };
  return { fg: "#96331b", bg: "rgba(166,61,34,0.18)", bd: "rgba(166,61,34,0.55)" };
}

export function GradeBadge({ grade, size = "md" }: { grade: string; size?: "sm" | "md" | "lg" }) {
  const tone = gradeTone(grade);
  const pad = size === "lg" ? "px-3 py-1 text-sm" : size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[11px]";
  return (
    <span
      className={`inline-block font-mono font-semibold border rounded-[2px] ${pad}`}
      style={{ color: tone.fg, backgroundColor: tone.bg, borderColor: tone.bd }}
    >
      {grade}
    </span>
  );
}

/* ---------------- En-tête de section ---------------- */
export function SectionHead({
  num,
  kicker,
  title,
  intro,
}: {
  num: string;
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <Reveal>
      <div className="relative mb-10 md:mb-14">
        <span
          aria-hidden
          className="disp-x absolute -top-9 -left-3 text-[110px] md:text-[170px] leading-none text-transparent pointer-events-none select-none"
          style={{ WebkitTextStroke: "1.5px rgba(14,59,46,0.16)" }}
        >
          {num}
        </span>
        <div className="relative">
          <p className="mono-k text-gold flex items-center gap-3">
            <span className="inline-block w-10 h-px bg-gold" />
            SECTION {num} — {kicker}
          </p>
          <h2 className="disp text-3xl md:text-5xl text-ink mt-3 max-w-3xl leading-[1.02]">
            {title}
          </h2>
          {intro && (
            <p className="mt-4 max-w-2xl text-[15px] md:text-base leading-relaxed text-ink/75">
              {intro}
            </p>
          )}
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------- Bloc de code avec coloration ---------------- */
const KW =
  /\b(CREATE|TABLE|TYPE|ENUM|AS|NOT|NULL|DEFAULT|PRIMARY|KEY|REFERENCES|UNIQUE|CHECK|CONSTRAINT|ON|DELETE|CASCADE|AND|OR|IN|IF|EXISTS|EXTENSION|FUNCTION|RETURNS|TRIGGER|BEFORE|UPDATE|FOR|EACH|ROW|EXECUTE|LANGUAGE|INDEX|WHERE|BEGIN|END|RETURN|REPLACE|NEW|curl|sudo|apt|sh|systemctl|ufw|ssh|echo|docker|kubectl|pg_dump|gzip|fallocate|mkswap|swapon|chmod|adduser|usermod|fail2ban|git|openssl|services|type|port|ports|env|volume|kind|handle|reverse_proxy|tls|dns|encode|log|output|file|delete|allow|from|to|enable|install|get|status)\b/;

function highlight(code: string): React.ReactNode[] {
  const rx =
    /(--[^\n]*|#[^\n]*|\/\/[^\n]*)|('[^'\n]*'|"[^"\n]*")|(\b\d[\d.,]*\b)/g;
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = rx.exec(code)) !== null) {
    if (m.index > last) out.push(...plainWithKw(code.slice(last, m.index), k));
    k += 1000;
    if (m[1]) out.push(<span key={`c${m.index}`} className="tok-com">{m[1]}</span>);
    else if (m[2]) out.push(<span key={`s${m.index}`} className="tok-str">{m[2]}</span>);
    else if (m[3]) out.push(<span key={`n${m.index}`} className="tok-num">{m[3]}</span>);
    last = m.index + m[0].length;
  }
  if (last < code.length) out.push(...plainWithKw(code.slice(last), k));
  return out;
}

function plainWithKw(text: string, keyBase: number): React.ReactNode[] {
  const parts = text.split(KW);
  return parts.map((p, i) =>
    KW.test(p) ? (
      <span key={`kw${keyBase + i}`} className="tok-kw">{p}</span>
    ) : (
      <span key={`p${keyBase + i}`}>{p}</span>
    ),
  );
}

export function CodeBlock({
  code,
  file,
  note,
}: {
  code: string;
  file: string;
  note?: string;
}) {
  return (
    <div className="codebox border border-pine-3/60 bg-pine-3 text-paper/90 rounded-[3px] overflow-hidden shadow-[6px_6px_0_0_rgba(14,59,46,0.12)]">
      <div className="flex items-center gap-3 px-4 py-2.5 bg-pine-2 border-b border-paper/10">
        <span className="flex gap-1.5" aria-hidden>
          <i className="w-2.5 h-2.5 rounded-full bg-clay-2/80 inline-block" />
          <i className="w-2.5 h-2.5 rounded-full bg-gold/80 inline-block" />
          <i className="w-2.5 h-2.5 rounded-full bg-leaf/80 inline-block" />
        </span>
        <span className="font-mono text-[11px] tracking-widest text-paper/70 uppercase">
          {file}
        </span>
        {note && (
          <span className="hidden md:inline font-mono text-[10px] text-paper/40 ml-2">
            {note}
          </span>
        )}
        <span className="ml-auto">
          <CopyBtn text={code} />
        </span>
      </div>
      <pre className="p-4 md:p-5">{highlight(code)}</pre>
    </div>
  );
}

/* ---------------- Divers ---------------- */
export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="mono-k text-moss flex items-center gap-3">
      <span className="inline-block w-2 h-2 bg-gold" aria-hidden />
      {children}
    </p>
  );
}

export function Seal({ size = 52, light = false }: { size?: number; light?: boolean }) {
  const ring = light ? "#e0be66" : "#c2932c";
  const core = light ? "#0e3b2e" : "#f1ede0";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden className="shrink-0">
      <circle cx="32" cy="32" r="30" fill={light ? "#f1ede0" : "#0e3b2e"} />
      <circle cx="32" cy="32" r="29" fill="none" stroke={ring} strokeWidth="1.6" />
      <circle cx="32" cy="32" r="23.5" fill="none" stroke={ring} strokeWidth="0.8" strokeDasharray="2.5 2.5" />
      <path
        d="M32 14l5.3 11.2 12.3 1.5-9.1 8.4 2.4 12.2L32 41.2 21.1 47.3l2.4-12.2-9.1-8.4 12.3-1.5z"
        fill={ring}
      />
      <circle cx="32" cy="32" r="5.5" fill={core} />
      <circle cx="32" cy="32" r="2.2" fill={ring} />
    </svg>
  );
}
