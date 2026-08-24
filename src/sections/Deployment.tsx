import { DEPLOY_STEPS, ENV_TABLE } from "../data";
import { CodeBlock, Kicker, Reveal, SectionHead } from "../lib";

const PREREQ = [
  { icon: "fa-solid fa-server", k: "Serveur", v: "VPS Contabo · 1 vCPU · 2 Go RAM · 10 Go SSD" },
  { icon: "fa-brands fa-ubuntu", k: "Système", v: "Ubuntu 24.04 LTS (image Contabo)" },
  { icon: "fa-solid fa-globe", k: "Domaine", v: "fullafri.africa — zone DNS chez Cloudflare (proxied)" },
  { icon: "fa-solid fa-envelope-circle-check", k: "Services", v: "Compte Resend (clé API) · dépôt Git privé" },
];

export default function Deployment() {
  return (
    <section id="s5" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHead
          num="05"
          kicker="Guide de déploiement"
          title="Déployer FullAfri sur Coolify, du VPS nu au cadenas vert."
          intro="Procédure officielle de mise en production, testée sur l'instance de référence. Comptez 45 minutes, en respectant l'ordre des étapes : chaque bloc de commandes est copiable et idempotent."
        />

        {/* Prérequis */}
        <Reveal><Kicker>Prérequis matériels & contractuels</Kicker></Reveal>
        <div className="mt-5 grid sm:grid-cols-2 xl:grid-cols-4 gap-px bg-ink/20 border border-ink/20 mb-14">
          {PREREQ.map((p) => (
            <Reveal key={p.k} className="bg-paper">
              <div className="p-5 h-full hover:bg-parch transition-colors">
                <i className={`${p.icon} text-xl text-pine`} aria-hidden />
                <p className="mono-k text-moss mt-3" style={{ fontSize: 9.5 }}>{p.k}</p>
                <p className="mt-1.5 font-mono text-[12px] text-ink/80 leading-relaxed">{p.v}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mb-12 border-l-4 border-clay bg-parch p-5 text-sm leading-relaxed text-ink/85 max-w-4xl">
            <p className="mono-k text-clay mb-1.5" style={{ fontSize: 10 }}>
              <i className="fa-solid fa-triangle-exclamation mr-1.5" aria-hidden />
              Note d'ingénierie — mémoire
            </p>
            Avec 2 Go de RAM, l'étape 1 provisionne 2 Go de swap : sans ce matelas, le couple
            Coolify + k3s sature l'hôte lors des builds d'images. Sur cette classe de machine, les
            builds Next.js s'exécutent avec <code className="font-mono text-[12px] bg-paper border border-ink/20 px-1">NODE_OPTIONS=--max-old-space-size=1024</code>.
          </div>
        </Reveal>

        {/* Étapes */}
        <div className="space-y-12">
          {DEPLOY_STEPS.map((s, i) => (
            <div key={s.n} className="grid lg:grid-cols-[90px_1fr] gap-5 md:gap-8">
              <Reveal className="hidden lg:block">
                <div className="sticky top-28 text-right">
                  <span className="disp-x text-6xl text-transparent" style={{ WebkitTextStroke: "1.5px rgba(194,147,44,0.85)" }}>
                    {String(s.n).padStart(2, "0")}
                  </span>
                  <span className="block mono-k text-ink/40 mt-1" style={{ fontSize: 9 }}>
                    étape {s.n}/6
                  </span>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className={i < DEPLOY_STEPS.length - 1 ? "border-b border-ink/15 pb-12" : ""}>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="lg:hidden disp-x text-2xl text-gold">{String(s.n).padStart(2, "0")}</span>
                    <h3 className="disp text-xl md:text-2xl text-ink">{s.title}</h3>
                  </div>
                  <p className="max-w-3xl text-[14px] leading-relaxed text-ink/75 mb-5">{s.text}</p>
                  <CodeBlock
                    code={s.code}
                    file={`etape-${s.n}.${s.lang === "conf" ? "conf" : s.lang === "yaml" ? "yml" : "sh"}`}
                    note={s.lang === "bash" ? "shell · à exécuter sur le VPS" : s.lang === "conf" ? "Caddyfile" : "stack Coolify"}
                  />
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Cartographie des services */}
        <div className="mt-16">
          <Reveal><Kicker>Cartographie des services & secrets injectés</Kicker></Reveal>
          <Reveal delay={80}>
            <div className="mt-5 overflow-x-auto border border-ink/25">
              <table className="tbl min-w-[760px] bg-paper">
                <thead>
                  <tr>
                    <th>Service Coolify</th><th>Type</th><th>Port interne</th><th>Exposition</th><th>Variables critiques</th>
                  </tr>
                </thead>
                <tbody>
                  {ENV_TABLE.map((r) => (
                    <tr key={r.svc}>
                      <td className="font-mono text-[12px] font-semibold text-pine whitespace-nowrap">{r.svc}</td>
                      <td className="text-ink/80 whitespace-nowrap">{r.type}</td>
                      <td className="font-mono text-[12px] text-ink/70">{r.port}</td>
                      <td className="font-mono text-[11.5px] text-ink/70 whitespace-nowrap">{r.expose}</td>
                      <td className="font-mono text-[11.5px] text-clay-2" style={{ color: "#a63d22" }}>{r.vars}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 max-w-3xl text-[13.5px] leading-relaxed text-ink/70">
              Les secrets ne transitent jamais par Git : ils sont saisis dans l'onglet{" "}
              <span className="font-mono text-[12px] text-pine">Environment Variables</span> de Coolify
              puis injectés au runtime des conteneurs. Toute rotation de clé (Resend, JWT, Cloudflare)
              déclenche un redéploiement zero-downtime du service concerné.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
