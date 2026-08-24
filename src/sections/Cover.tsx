import { NAV, REGISTRY } from "../data";
import { CopyBtn, GradeBadge, Seal, useScramble } from "../lib";
import { SQL } from "../data";

function Guilloche() {
  const ellipses = [];
  for (let i = 0; i < 26; i++) {
    ellipses.push(
      <ellipse
        key={i}
        cx="400"
        cy="400"
        rx="390"
        ry="150"
        fill="none"
        stroke="#c2932c"
        strokeWidth="0.7"
        transform={`rotate(${(i * 180) / 26} 400 400)`}
      />,
    );
  }
  return (
    <svg
      aria-hidden
      className="absolute -right-[18%] -top-[55%] w-[820px] h-[820px] opacity-[0.13] pointer-events-none"
      viewBox="0 0 800 800"
    >
      {ellipses}
      <circle cx="400" cy="400" r="392" fill="none" stroke="#c2932c" strokeWidth="1" />
    </svg>
  );
}

function Stamp() {
  return (
    <div className="relative w-44 h-44 md:w-52 md:h-52 select-none" aria-hidden>
      <svg viewBox="0 0 200 200" className="stamp-spin w-full h-full">
        <defs>
          <path id="circ" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        </defs>
        <circle cx="100" cy="100" r="94" fill="none" stroke="#c2932c" strokeWidth="2.5" />
        <circle cx="100" cy="100" r="88" fill="none" stroke="#c2932c" strokeWidth="1" />
        <circle cx="100" cy="100" r="52" fill="none" stroke="#c2932c" strokeWidth="1" strokeDasharray="3 4" />
        <text fill="#e0be66" fontSize="13.5" fontFamily="IBM Plex Mono, monospace" letterSpacing="3.5">
          <textPath href="#circ">
            REGISTRE PUBLIC · FULLAFRI · UNION NUMÉRIQUE AFRICAINE · MMXXVI ·
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="disp-x text-gold-2 text-2xl md:text-3xl rotate-[-8deg]">VISÉ</span>
        <span className="mono-k text-gold-2/80 mt-1" style={{ fontSize: 9 }}>
          DGT-ING / 26
        </span>
      </div>
    </div>
  );
}

export default function Cover() {
  const title = useScramble("FULLAFRI");

  return (
    <header className="relative bg-pine-3 text-paper overflow-hidden border-b-4 border-gold">
      <Guilloche />
      <div className="paper-lines absolute inset-0 opacity-40" aria-hidden />

      {/* Bandeau institutionnel */}
      <div className="relative border-b border-paper/15">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center gap-4">
          <Seal size={46} light />
          <div className="leading-tight">
            <p className="disp text-lg md:text-xl text-paper">FULLAFRI</p>
            <p className="mono-k text-gold-2/90" style={{ fontSize: 9.5 }}>
              Agence Africaine de Notation, d'Audit & de Régulation Numérique et IA
            </p>
          </div>
          <div className="ml-auto hidden sm:block text-right font-mono text-[11px] text-paper/60 leading-relaxed">
            <p>
              RÉF. <span className="text-gold-2">FA/DT-2026-001</span> · v2.1
            </p>
            <p>DIFFUSION PUBLIQUE · 12 MARS 2026</p>
          </div>
        </div>
      </div>

      {/* Corps de la couverture */}
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-14 md:pt-20 pb-12 md:pb-16 grid lg:grid-cols-[1fr_auto] gap-12 items-start">
        <div>
          <p className="mono-k text-gold flex items-center gap-3">
            <span className="inline-block w-12 h-px bg-gold" />
            DOSSIER TECHNIQUE OFFICIEL — ÉDITION 2026
          </p>
          <h1
            className="disp-x text-paper mt-5 text-[17vw] sm:text-7xl md:text-8xl xl:text-[108px] leading-[0.95] whitespace-nowrap"
            aria-label="FULLAFRI"
          >
            {title}
            <span className="caret text-gold">_</span>
          </h1>
          <p className="mt-6 max-w-2xl text-paper/85 text-base md:text-lg leading-relaxed">
            Premier organisme indépendant panafricain d'audit, de notation
            (<span className="font-mono text-gold-2">AAA → D</span> et{" "}
            <span className="font-mono text-gold-2">AI-AAA → AI-D</span>) et de régulation des
            systèmes web, du cloud, des plateformes e-commerce, des banques et des modèles
            d'intelligence artificielle — au service de la souveraineté numérique du continent.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#s1"
              className="btn-hard disp inline-flex items-center gap-3 bg-gold text-pine-3 px-6 py-3 text-sm"
            >
              OUVRIR LE DOSSIER <span aria-hidden>↓</span>
            </a>
            <a
              href="#s4"
              className="btn-hard disp inline-flex items-center gap-3 border border-paper/40 text-paper px-6 py-3 text-sm hover:bg-paper/10"
            >
              REGISTRE PUBLIC
            </a>
            <span className="inline-flex items-center">
              <CopyBtn text={SQL} />
            </span>
          </div>

          {/* Méta du document */}
          <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 border-t border-paper/20">
            {[
              ["Émis le", "12 mars 2026"],
              ["Classification", "PUBLIC"],
              ["Sections", "05 · 32 pages éq."],
              ["Cadre", "Acte UA/SA-2025-07"],
            ].map(([k, v]) => (
              <div key={k} className="py-4 pr-4 border-r border-paper/10 last:border-r-0">
                <dt className="mono-k text-paper/50" style={{ fontSize: 9.5 }}>{k}</dt>
                <dd className="font-mono text-gold-2 text-sm mt-1.5">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Colonne droite : tampon + carte d'identité */}
        <div className="flex flex-col items-center gap-8 lg:pt-2">
          <Stamp />
          <div className="w-full max-w-[300px] border border-paper/25 bg-pine-2/70 p-5">
            <p className="mono-k text-gold-2 mb-4" style={{ fontSize: 9.5 }}>
              CARTE D'IDENTITÉ DU SYSTÈME
            </p>
            <ul className="space-y-3 text-[13px] text-paper/85">
              {[
                ["Hôte", "VPS Contabo · 1 vCPU · 2 Go · 10 Go SSD"],
                ["OS", "Ubuntu 24.04 LTS"],
                ["Orchestration", "Docker · k3s · Coolify"],
                ["Front / API", "Next.js TS · NestJS · Go"],
                ["Données", "PostgreSQL 16"],
                ["OTP & e-mails", "Resend API"],
                ["Bouclier", "Cloudflare · Caddy · Fail2ban"],
              ].map(([k, v]) => (
                <li key={k} className="flex justify-between gap-4 border-b border-paper/10 pb-2 last:border-0 last:pb-0">
                  <span className="mono-k text-paper/50 shrink-0" style={{ fontSize: 9 }}>{k}</span>
                  <span className="font-mono text-[11px] text-right text-gold-2/95">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Sommaire express */}
      <nav className="relative border-t border-paper/15" aria-label="Sommaire">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
          {NAV.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`group py-4 pr-4 flex items-baseline gap-3 border-r border-paper/10 last:border-r-0 hover:bg-paper/5 transition-colors ${
                i > 0 ? "sm:pl-4" : ""
              }`}
            >
              <span className="disp-x text-gold text-lg group-hover:text-gold-2 transition-colors">{n.num}</span>
              <span className="text-[12.5px] leading-snug text-paper/80 group-hover:text-paper transition-colors">
                {n.title}
              </span>
            </a>
          ))}
        </div>
      </nav>

      {/* Ticker du registre */}
      <div className="ticker relative border-t-2 border-gold/70 bg-pine-2 overflow-hidden py-2.5" aria-label="Extraits du registre public">
        <div className="ticker-track flex w-max items-center gap-8 px-6">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8" aria-hidden={dup === 1}>
              {REGISTRY.slice(0, 10).map((r) => (
                <span key={`${dup}-${r.slug}`} className="flex items-center gap-2.5 whitespace-nowrap">
                  <span className="font-mono text-[11px] tracking-wider text-paper/75 uppercase">
                    {r.name}
                  </span>
                  <GradeBadge grade={r.web.grade} size="sm" />
                  {r.ai && <GradeBadge grade={`AI-${r.ai.grade}`} size="sm" />}
                  <span className="text-gold/60 text-[9px]" aria-hidden>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
