import { FLUX, INFRA } from "../data";
import { Kicker, Reveal, SectionHead, usePRM } from "../lib";

const MONO = "IBM Plex Mono, monospace";

function Node({
  x, y, w, h, title, sub, accent = "#0e3b2e",
}: { x: number; y: number; w: number; h: number; title: string; sub: string; accent?: string }) {
  return (
    <g>
      <rect x={x + 4} y={y + 4} width={w} height={h} fill="rgba(14,59,46,0.14)" />
      <rect x={x} y={y} width={w} height={h} fill="#f1ede0" stroke={accent} strokeWidth="2" />
      <rect x={x} y={y} width={w} height={5} fill={accent} />
      <text x={x + w / 2} y={y + h / 2 - 2} textAnchor="middle" fontFamily={MONO} fontSize="12" fontWeight="600" fill="#17211b">
        {title}
      </text>
      <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill="#17211b" opacity="0.65">
        {sub}
      </text>
    </g>
  );
}

function Packet({ d, dur, begin, color = "#c2932c" }: { d: string; dur: string; begin: string; color?: string }) {
  return (
    <circle r="4.5" fill={color} opacity="0.95">
      <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={d} />
    </circle>
  );
}

export default function Architecture() {
  const prm = usePRM();
  const P_HTTP = "M 160 305 H 385";
  const P_API = "M 515 305 C 548 305 542 270 572 270 H 770";
  const P_WEB = "M 515 275 C 548 275 542 180 572 180";
  const P_OTH = "M 652 305 V 552 H 606";

  return (
    <section id="s2" className="relative py-16 md:py-24 bg-parch paper-lines border-y border-ink/15">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHead
          num="02"
          kicker="Architecture schématique"
          title="Du navigateur citoyen au sceau PostgreSQL : un flux sous contrôle africain."
          intro="Chaque requête traverse trois périmètres de confiance — l'edge Cloudflare, le VPS Contabo durci, puis le cluster k3s — avant d'atteindre la base souveraine. Les flux sont chiffrés de bout en bout et journalisés dans audit_logs."
        />

        {/* Schéma */}
        <Reveal>
          <div className="border border-ink/25 bg-paper p-3 md:p-6 overflow-x-auto">
            <svg viewBox="0 0 1000 620" className="min-w-[760px] w-full h-auto" role="img" aria-label="Schéma d'architecture : utilisateur, Cloudflare, VPS Contabo avec Caddy, cluster k3s (Next.js, NestJS, Go, PostgreSQL), Coolify et Resend">
              <defs>
                <marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 z" fill="#0e3b2e" />
                </marker>
                <marker id="arrG" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 z" fill="#a63d22" />
                </marker>
                <marker id="arrY" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8 z" fill="#c2932c" />
                </marker>
              </defs>

              {/* Périmètre VPS */}
              <rect x="360" y="40" width="615" height="460" fill="rgba(194,147,44,0.05)" stroke="#c2932c" strokeWidth="1.5" strokeDasharray="7 5" />
              <text x="375" y="62" fontFamily={MONO} fontSize="10" letterSpacing="2" fill="#c2932c" fontWeight="600">
                VPS CONTABO — 1 vCPU · 2 Go RAM · 10 Go SSD · UBUNTU 24.04 LTS · UFW + FAIL2BAN
              </text>

              {/* Cluster k3s */}
              <rect x="545" y="100" width="410" height="380" fill="rgba(46,107,79,0.06)" stroke="#2e6b4f" strokeWidth="1.5" strokeDasharray="5 5" />
              <text x="560" y="122" fontFamily={MONO} fontSize="10" letterSpacing="2" fill="#2e6b4f" fontWeight="600">
                CLUSTER k3s — ns fullafri-ns (orchestré par Coolify)
              </text>

              {/* Lignes de flux (sous les nœuds) */}
              <path d={P_HTTP} fill="none" stroke="#0e3b2e" strokeWidth="2" className="flowline" markerEnd="url(#arr)" />
              <path d="M 205 305 H 355" fill="none" stroke="#0e3b2e" strokeWidth="2" className="flowline" />
              <path d={P_WEB} fill="none" stroke="#0e3b2e" strokeWidth="2" className="flowline" markerEnd="url(#arr)" />
              <path d={P_API} fill="none" stroke="#0e3b2e" strokeWidth="2" className="flowline" markerEnd="url(#arr)" />
              <path d="M 652 210 V 235" fill="none" stroke="#0e3b2e" strokeWidth="2" className="flowline" markerEnd="url(#arr)" />
              <path d="M 735 365 H 770" fill="none" stroke="#0e3b2e" strokeWidth="2" className="flowline" markerEnd="url(#arr)" />
              <path d={P_OTH} fill="none" stroke="#a63d22" strokeWidth="2" className="flowline-slow" markerEnd="url(#arrG)" />
              <path d="M 520 122 H 545" fill="none" stroke="#c2932c" strokeWidth="2" className="flowline-slow" markerEnd="url(#arrY)" />
              <path d="M 452 168 V 250" fill="none" stroke="#c2932c" strokeWidth="2" className="flowline-slow" markerEnd="url(#arrY)" />

              {/* Paquets (si mouvement autorisé) */}
              {!prm && (
                <g>
                  <Packet d={P_HTTP + " C 548 305 542 270 572 270 H 845"} dur="3.4s" begin="0s" color="#0e3b2e" />
                  <Packet d={P_WEB} dur="1.6s" begin="1.2s" color="#2e6b4f" />
                  <Packet d={P_OTH + " H 510"} dur="2.6s" begin="2s" color="#a63d22" />
                  <Packet d="M 452 168 V 250 H 520" dur="2s" begin="0.7s" color="#c2932c" />
                </g>
              )}

              {/* Nœuds */}
              <Node x={20} y={250} w={140} h={110} title="UTILISATEUR" sub="Navigateur · Mobile" />
              <Node x={205} y={250} w={150} h={110} title="CLOUDFLARE" sub="Anti-DDoS · WAF · SSL" />
              <Node x={385} y={250} w={130} h={110} title="CADDY" sub="Reverse proxy · TLS" accent="#2e6b4f" />
              <Node x={385} y={80} w={135} h={88} title="COOLIFY" sub="CI/CD · GitOps" accent="#c2932c" />
              <Node x={572} y={140} w={165} h={70} title="NEXT.JS (TS)" sub="Registre public · :3001" accent="#2e6b4f" />
              <Node x={572} y={235} w={165} h={70} title="NESTJS API" sub="REST /api/v1 · :3000" accent="#2e6b4f" />
              <Node x={572} y={330} w={165} h={70} title="WORKER GO" sub="Moteur d'audit · CronJob" accent="#2e6b4f" />

              {/* PostgreSQL : cylindre */}
              <g>
                <path d="M774 235 h142 v165 a71 16 0 0 1 -142 0 z" fill="#0e3b2e" opacity="0.12" transform="translate(4,4)" />
                <path d="M770 235 h142 v165 a71 16 0 0 1 -142 0 z" fill="#f1ede0" stroke="#0e3b2e" strokeWidth="2" />
                <ellipse cx="841" cy="235" rx="71" ry="16" fill="#e8e3d1" stroke="#0e3b2e" strokeWidth="2" />
                <text x="841" y="300" textAnchor="middle" fontFamily={MONO} fontSize="12" fontWeight="600" fill="#17211b">POSTGRESQL 16</text>
                <text x="841" y="318" textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill="#17211b" opacity="0.65">:5432 · volume 8 Go</text>
                <text x="841" y="336" textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill="#17211b" opacity="0.65">entités · notes · certificats</text>
              </g>

              {/* Resend */}
              <Node x={430} y={520} w={176} h={70} title="RESEND API" sub="OTP · Transactionnels DKIM" accent="#a63d22" />

              {/* Étiquettes de flux */}
              <text x="180" y="292" fontFamily={MONO} fontSize="9" fill="#0e3b2e" opacity="0.8">TLS 1.3</text>
              <text x="560" y="262" fontFamily={MONO} fontSize="9" fill="#0e3b2e" opacity="0.8">/api/*</text>
              <text x="548" y="172" fontFamily={MONO} fontSize="9" fill="#0e3b2e" opacity="0.8">SSR</text>
              <text x="666" y="545" fontFamily={MONO} fontSize="9" fill="#a63d22" opacity="0.85">HTTPS · OTP</text>
              <text x="460" y="215" fontFamily={MONO} fontSize="9" fill="#c2932c" opacity="0.9">déploie</text>

              <circle cx="28" cy="595" r="4" fill="#c2932c" className={prm ? "" : "pulse-dot"} />
              <text x="40" y="599" fontFamily={MONO} fontSize="9" fill="#17211b" opacity="0.6">
                Schéma FA/DT-2026-001 · les paquets figurent le trafic réel (production)
              </text>
            </svg>
          </div>
        </Reveal>

        {/* Légende */}
        <Reveal delay={100}>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-[12px] font-mono text-ink/70">
            <span className="flex items-center gap-2"><svg width="34" height="6" aria-hidden><line x1="0" y1="3" x2="34" y2="3" stroke="#0e3b2e" strokeWidth="2" strokeDasharray="7 7" /></svg> Flux synchrone HTTPS</span>
            <span className="flex items-center gap-2"><svg width="34" height="6" aria-hidden><line x1="0" y1="3" x2="34" y2="3" stroke="#a63d22" strokeWidth="2" strokeDasharray="4 8" /></svg> OTP / e-mails (Resend)</span>
            <span className="flex items-center gap-2"><svg width="34" height="6" aria-hidden><line x1="0" y1="3" x2="34" y2="3" stroke="#c2932c" strokeWidth="2" strokeDasharray="4 8" /></svg> Orchestration Coolify</span>
            <span className="flex items-center gap-2"><span className="inline-block w-4 h-4 border border-dashed border-gold bg-gold/10" aria-hidden /> Périmètre VPS</span>
          </div>
        </Reveal>

        {/* Flux de données */}
        <div className="mt-16">
          <Reveal><Kicker>Description des flux de données</Kicker></Reveal>
          <div className="mt-5 grid md:grid-cols-2 xl:grid-cols-3 gap-px bg-ink/20 border border-ink/20">
            {FLUX.map((f, i) => (
              <Reveal key={f.code} delay={i * 60} className="bg-paper">
                <div className="p-6 h-full group hover:bg-parch transition-colors">
                  <span className="disp-x text-2xl text-gold group-hover:text-pine transition-colors">{f.code}</span>
                  <h3 className="disp text-lg mt-2 text-ink">{f.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink/75">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Inventaire d'infrastructure */}
        <div className="mt-16">
          <Reveal><Kicker>Inventaire d'infrastructure — état cible de production</Kicker></Reveal>
          <Reveal delay={80}>
            <div className="mt-5 overflow-x-auto border border-ink/25">
              <table className="tbl min-w-[720px] bg-paper">
                <thead>
                  <tr>
                    <th>Composant</th><th>Technologie</th><th>Rôle</th><th>Localisation</th>
                  </tr>
                </thead>
                <tbody>
                  {INFRA.map((r) => (
                    <tr key={r.comp}>
                      <td className="font-semibold text-ink">{r.comp}</td>
                      <td className="font-mono text-[12px] text-pine whitespace-nowrap">{r.tech}</td>
                      <td className="text-ink/80">{r.role}</td>
                      <td className="font-mono text-[11.5px] text-ink/60 whitespace-nowrap">{r.loc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
