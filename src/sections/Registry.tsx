import { useEffect, useMemo, useState } from "react";
import { AI_CRITERIA, AI_MODELS, HTML_SRC, REGISTRY, SITEMAP } from "../data";
import { CodeBlock, CopyBtn, GradeBadge, Kicker, Reveal, SectionHead } from "../lib";

const GRADES = ["TOUS", "AAA", "AA", "A", "BBB", "BB", "B", "CCC", "CC", "C", "D"];

function CertChip({ status }: { status: string }) {
  const map: Record<string, { fg: string; bg: string; icon: string }> = {
    ACTIF: { fg: "#155e3d", bg: "rgba(30,122,79,0.14)", icon: "fa-solid fa-certificate" },
    SUSPENDU: { fg: "#96331b", bg: "rgba(166,61,34,0.16)", icon: "fa-solid fa-triangle-exclamation" },
    "EN COURS": { fg: "#7c621a", bg: "rgba(194,147,44,0.18)", icon: "fa-solid fa-hourglass-half" },
  };
  const m = map[status] ?? map["ACTIF"];
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-semibold px-2 py-1 border rounded-[2px] whitespace-nowrap"
      style={{ color: m.fg, backgroundColor: m.bg, borderColor: m.fg + "66" }}
    >
      <i className={m.icon} aria-hidden /> {status}
    </span>
  );
}

function RegistryDemo() {
  const [q, setQ] = useState("");
  const [sector, setSector] = useState("TOUS");
  const [grade, setGrade] = useState("TOUS");
  const [open, setOpen] = useState<string | null>("mtn-momo");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return REGISTRY.filter((r) => {
      if (sector !== "TOUS" && r.sector !== sector) return false;
      if (grade !== "TOUS" && r.web.grade !== grade && r.ai?.grade !== grade) return false;
      if (
        needle &&
        !r.name.toLowerCase().includes(needle) &&
        !r.country.toLowerCase().includes(needle) &&
        !r.sector.toLowerCase().includes(needle)
      )
        return false;
      return true;
    });
  }, [q, sector, grade]);

  const selectCls =
    "bg-paper border border-ink/30 px-3 py-2.5 font-mono text-[12px] text-ink outline-none focus:border-pine cursor-pointer hover:border-pine transition-colors";

  return (
    <div>
      {/* Contrôles */}
      <div className="flex flex-col md:flex-row gap-3">
        <label className="flex-1 flex items-center gap-3 bg-paper border border-ink/30 px-4 py-2.5 focus-within:border-pine transition-colors">
          <i className="fa-solid fa-magnifying-glass text-ink/45" aria-hidden />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder="Rechercher une entité, un pays, un secteur… (ex. MoMo, Ghana, IA)"
            className="w-full bg-transparent outline-none text-sm placeholder:text-ink/40"
          />
          {q && (
            <button onClick={() => setQ("")} className="mono-k text-ink/50 hover:text-clay cursor-pointer" style={{ fontSize: 9 }}>
              Effacer
            </button>
          )}
        </label>
        <select value={sector} onChange={(e) => setSector(e.target.value)} className={selectCls} aria-label="Filtrer par secteur">
          {["TOUS", "BANQUE", "FINTECH", "E-COMMERCE", "TÉLÉCOM", "CLOUD/SAAS", "MÉDIAS", "IA"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select value={grade} onChange={(e) => setGrade(e.target.value)} className={selectCls} aria-label="Filtrer par note">
          {GRADES.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </div>

      <p className="mt-3 font-mono text-[11.5px] text-ink/60" role="status">
        <span className="text-pine font-semibold">{rows.length}</span> entité{rows.length > 1 ? "s" : ""} au
        registre — cliquez sur une ligne pour afficher le certificat.
      </p>

      {/* Table */}
      <div className="mt-3 overflow-x-auto border border-ink/25 bg-paper">
        <table className="tbl min-w-[860px]">
          <thead>
            <tr>
              <th>Entité notée</th>
              <th>Secteur</th>
              <th>Pays</th>
              <th>Web / Cloud</th>
              <th>IA</th>
              <th>Certificat</th>
              <th aria-label="Détail" className="w-10" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-ink/50 text-sm">
                  <i className="fa-solid fa-folder-open mr-2" aria-hidden />
                  Aucune entité ne correspond à cette requête dans l'extrait de démonstration.
                </td>
              </tr>
            )}
            {rows.map((r) => (
              <RegistryRows key={r.slug} r={r} open={open === r.slug} toggle={() => setOpen(open === r.slug ? null : r.slug)} />
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 font-mono text-[10.5px] text-ink/45">
        Source : GET /api/v1/registre · extrait de démonstration — les notes publiées font foi au Journal Officiel de l'UA.
      </p>
    </div>
  );
}

function RegistryRows({ r, open, toggle }: { r: (typeof REGISTRY)[number]; open: boolean; toggle: () => void }) {
  return (
    <>
      <tr className="cursor-pointer" onClick={toggle} aria-expanded={open}>
        <td>
          <p className="font-semibold text-ink leading-tight">{r.name}</p>
          <p className="font-mono text-[10.5px] text-ink/45">/{r.slug}</p>
        </td>
        <td className="font-mono text-[11.5px] text-ink/70 whitespace-nowrap">{r.sector}</td>
        <td className="whitespace-nowrap">
          <span className="font-mono text-[10.5px] text-ink/45 mr-1.5">{r.flag}</span>
          <span className="text-[13px] text-ink/80">{r.country}</span>
        </td>
        <td className="whitespace-nowrap">
          <GradeBadge grade={r.web.grade} />
          <span className="ml-2 font-mono text-[11.5px] text-ink/60">{r.web.score.toFixed(1).replace(".", ",")}</span>
        </td>
        <td className="whitespace-nowrap">
          {r.ai ? (
            <>
              <GradeBadge grade={`AI-${r.ai.grade}`} />
              <span className="ml-2 font-mono text-[11.5px] text-ink/60">{r.ai.score.toFixed(1).replace(".", ",")}</span>
            </>
          ) : (
            <span className="text-ink/35 font-mono text-[12px]">—</span>
          )}
        </td>
        <td><CertChip status={r.cert} /></td>
        <td className="text-center">
          <i className={`fa-solid fa-chevron-down text-ink/50 transition-transform duration-300 ${open ? "rotate-180 text-gold" : ""}`} aria-hidden />
        </td>
      </tr>
      {open && (
        <tr className="bg-parch">
          <td colSpan={7} className="!p-0">
            <div className="px-5 py-5 grid md:grid-cols-2 xl:grid-cols-4 gap-5 text-[12.5px]">
              <div>
                <p className="mono-k text-moss mb-1.5" style={{ fontSize: 9 }}>Référence d'audit</p>
                <p className="font-mono text-pine font-semibold">{r.auditRef}</p>
                <p className="mono-k text-moss mt-3 mb-1.5" style={{ fontSize: 9 }}>Auditeur principal</p>
                <p className="text-ink/80">{r.auditor}</p>
              </div>
              <div>
                <p className="mono-k text-moss mb-1.5" style={{ fontSize: 9 }}>N° de série du certificat</p>
                <p className="font-mono text-pine font-semibold">{r.serial}</p>
                <p className="mono-k text-moss mt-3 mb-1.5" style={{ fontSize: 9 }}>Validité</p>
                <p className="text-ink/80">{r.validUntil}</p>
              </div>
              <div className="xl:col-span-2">
                <p className="mono-k text-moss mb-1.5" style={{ fontSize: 9 }}>
                  Empreinte SHA-256 du certificat · QR : fullafri.africa/verify/{r.serial.split("-").pop()}
                </p>
                <div className="flex items-start gap-2">
                  <code className="font-mono text-[11px] text-ink/75 break-all leading-relaxed bg-paper border border-ink/20 px-2.5 py-2 flex-1">
                    {r.fingerprint}
                  </code>
                  <CopyBtn text={r.fingerprint} dark={false} />
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function BarRow({ label, v, delay }: { label: string; v: number; delay: number }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const id = window.setTimeout(() => setW(v), 60 + delay);
    return () => window.clearTimeout(id);
  }, [v, delay]);
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-[13px] text-ink/85">{label}</span>
        <span className="font-mono text-[12px] font-semibold text-pine">{v}/100</span>
      </div>
      <div className="h-3 bg-ink/10 border border-ink/20 overflow-hidden">
        <div
          className="bar-fill h-full"
          style={{ width: `${w}%`, background: "linear-gradient(90deg,#0e3b2e,#2e6b4f 70%,#c2932c)" }}
        />
      </div>
    </div>
  );
}

function AIPole() {
  const [sel, setSel] = useState(AI_MODELS[0].id);
  const m = AI_MODELS.find((x) => x.id === sel)!;
  return (
    <div className="grid lg:grid-cols-[290px_1fr] gap-6 items-start">
      {/* Liste des modèles */}
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
        {AI_MODELS.map((x) => {
          const on = x.id === sel;
          return (
            <button
              key={x.id}
              onClick={() => setSel(x.id)}
              className={`text-left px-4 py-3 border transition-all duration-200 shrink-0 lg:shrink cursor-pointer w-full lg:w-auto ${
                on
                  ? "bg-pine text-paper border-pine shadow-[5px_5px_0_0_rgba(194,147,44,0.9)]"
                  : "bg-paper border-ink/25 hover:border-pine hover:-translate-y-0.5"
              }`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className={`disp text-sm ${on ? "text-gold-2" : "text-ink"}`}>{x.name}</span>
                <GradeBadge grade={x.grade} size="sm" />
              </span>
              <span className={`block mt-1 font-mono text-[10.5px] ${on ? "text-paper/60" : "text-ink/50"}`}>
                {x.org}
              </span>
            </button>
          );
        })}
      </div>

      {/* Fiche modèle */}
      <div key={m.id} className="border border-ink/25 bg-paper p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mono-k text-moss">{m.family}</p>
            <h4 className="disp text-2xl md:text-3xl text-ink mt-1.5">{m.name}</h4>
            <p className="font-mono text-[12px] text-ink/55 mt-1">{m.org}</p>
          </div>
          <div className="text-right">
            <GradeBadge grade={m.grade} size="lg" />
            <p className="font-mono text-2xl font-semibold text-pine mt-2">
              {m.score.toFixed(1).replace(".", ",")}
              <span className="text-[12px] text-ink/45"> /100</span>
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {[`Paramètres : ${m.params}`, `Langues africaines : ${m.langs}`, `Batterie : 212 critères IA-26`].map((c) => (
            <span key={c} className="mono-k border border-ink/25 px-2.5 py-1.5 text-ink/65" style={{ fontSize: 9.5 }}>
              {c}
            </span>
          ))}
        </div>

        <div className="mt-7 space-y-5">
          {AI_CRITERIA.map((c, i) => (
            <BarRow key={c} label={c} v={m.bars[i]} delay={i * 90} />
          ))}
        </div>

        <p className="mt-7 border-t border-ink/15 pt-4 text-[13px] leading-relaxed text-ink/70">
          <span className="mono-k text-pine mr-2" style={{ fontSize: 9.5 }}>Corpus d'entraînement</span>
          {m.corpus}
        </p>
      </div>
    </div>
  );
}

export default function Registry() {
  return (
    <section id="s4" className="relative py-16 md:py-24 bg-parch paper-lines border-y border-ink/15">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHead
          num="04"
          kicker="Plan du site & code source"
          title="Le registre public, cœur battant de la plateforme."
          intro="Cette section présente l'arborescence officielle, une instance vivante du moteur de recherche du registre, la fiche d'évaluation du pôle IA — et le gabarit HTML5/Tailwind/FontAwesome servant de socle au frontend."
        />

        {/* 4.1 Arborescence */}
        <Reveal><Kicker>4.1 — Arborescence officielle du site</Kicker></Reveal>
        <Reveal delay={80}>
          <div className="mt-5 border border-pine-3/60 bg-pine-3 text-paper/90 p-5 md:p-7 overflow-x-auto shadow-[6px_6px_0_0_rgba(14,59,46,0.12)]">
            <pre className="font-mono text-[12.5px] leading-[1.75] text-gold-2/95">{SITEMAP}</pre>
          </div>
        </Reveal>

        {/* 4.2 Registre */}
        <div className="mt-16">
          <Reveal><Kicker>4.2 — Moteur de recherche du registre public (instance de démonstration)</Kicker></Reveal>
          <Reveal delay={80}>
            <div className="mt-5">
              <RegistryDemo />
            </div>
          </Reveal>
        </div>

        {/* 4.3 Pôle IA */}
        <div className="mt-16">
          <Reveal><Kicker>4.3 — Pôle d'audit IA : fiche d'évaluation d'un modèle</Kicker></Reveal>
          <Reveal delay={80}>
            <div className="mt-5">
              <AIPole />
            </div>
          </Reveal>
        </div>

        {/* 4.4 Code source */}
        <div className="mt-16">
          <Reveal>
            <Kicker>4.4 — Code source : gabarit index.html (HTML5 · Tailwind CSS · FontAwesome)</Kicker>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-5">
              <CodeBlock
                code={HTML_SRC}
                file="public/index.html"
                note="Tailwind CDN · FontAwesome 6 · fetch /api/v1/registre"
              />
              <p className="mt-4 max-w-3xl text-[13.5px] leading-relaxed text-ink/70">
                Ce gabarit autonome est distribué aux régulateurs nationaux et aux organismes
                partenaires : il affiche le registre et interroge l'API publique sans dépendance de
                build. En production, la version Next.js (TypeScript) reprend cette structure avec
                rendu serveur, pagination et cache edge de 60 secondes.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
