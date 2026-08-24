import { AI_BANDS, WEB_BANDS, type Band } from "../data";
import { GradeBadge, Kicker, Reveal, SectionHead } from "../lib";

const CONSIDERANTS = [
  "la dépendance structurelle des économies africaines envers des infrastructures numériques conçues, hébergées et notées hors du continent ;",
  "l'absence d'un organisme panafricain indépendant capable d'évaluer, avec la même rigueur, un core banking de Lagos, une marketplace de Casablanca et un LLM déployé à Nairobi ;",
  "l'impératif de souveraineté numérique, de protection des données personnelles et d'éthique des algorithmes proclamé par la Stratégie UA de Transformation Numérique (2020-2030).",
];

const MISSIONS = [
  "Noter les systèmes web, cloud, e-commerce et bancaires sur une échelle souveraine AAA → D, opposable aux régulateurs nationaux.",
  "Évaluer les modèles d'IA — LLM, vision par ordinateur, algorithmes de recommandation — sur l'échelle AI-AAA → AI-D.",
  "Publier un registre public horodaté, assorti de certificats cryptographiques vérifiables par quiconque (QR signé Ed25519).",
  "Soumettre les géants de la Tech (Google, Meta, OpenAI…) aux mêmes batteries de tests que les acteurs africains : aucune exemption.",
];

const PERIMETRE = [
  "Sites & API publics", "Infrastructures cloud", "Plateformes e-commerce",
  "Core banking & fintech", "LLM & IA générative", "Vision par ordinateur",
  "Recommandation algorithmique", "Scoring de crédit automatisé",
];

function BandTable({ title, code, bands }: { title: string; code: string; bands: Band[] }) {
  return (
    <Reveal className="flex-1">
      <div className="border border-ink/25 bg-paper h-full">
        <div className="px-5 py-4 bg-pine text-paper flex items-center justify-between gap-3">
          <h3 className="disp text-base md:text-lg">{title}</h3>
          <span className="mono-k text-gold-2" style={{ fontSize: 9 }}>{code}</span>
        </div>
        <table className="w-full text-[13px]">
          <tbody>
            {bands.map((b) => (
              <tr
                key={b.grade}
                className="border-t border-ink/15 align-top transition-colors hover:bg-gold/10"
              >
                <td className="px-4 py-2.5 w-[92px] border-r border-ink/15" style={{ boxShadow: `inset 4px 0 0 ${b.tone}` }}>
                  <GradeBadge grade={b.grade} size="sm" />
                </td>
                <td className="px-4 py-2.5 font-mono text-[11px] text-ink/70 whitespace-nowrap border-r border-ink/15">
                  {b.range}
                </td>
                <td className="px-4 py-2.5 text-ink/85 leading-snug">{b.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

export default function Executive() {
  return (
    <section id="s1" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHead
          num="01"
          kicker="Fiche de présentation exécutive"
          title="Un tiers de confiance panafricain, du core banking au LLM."
          intro="FullAfri est constituée en autorité technique indépendante. Elle audite, note et régule les systèmes numériques opérant sur le continent — qu'ils soient africains ou étrangers — et publie ses décisions dans un registre ouvert, scellé cryptographiquement."
        />

        {/* Considérants */}
        <Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-ink/20 border border-ink/20 mb-14">
            {CONSIDERANTS.map((c, i) => (
              <div key={i} className="bg-paper p-6 group hover:bg-parch transition-colors">
                <span className="disp-x text-4xl text-gold block mb-3 group-hover:text-pine transition-colors">
                  §{i + 1}
                </span>
                <p className="mono-k text-moss mb-2" style={{ fontSize: 9 }}>Considérant</p>
                <p className="text-sm leading-relaxed text-ink/85">{c}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Vision / Mission */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 mb-16">
          <Reveal delay={80}>
            <Kicker>Vision</Kicker>
            <p className="mt-4 text-lg md:text-[21px] leading-relaxed text-ink">
              <span className="disp text-5xl md:text-6xl text-pine float-left mr-3 mt-1 leading-[0.8]">F</span>
              aire du continent africain un espace numérique <em className="not-italic border-b-2 border-gold">évalué
              chez lui, selon ses règles</em> : chaque plateforme, chaque banque, chaque modèle
              d'IA qui sert un citoyen africain doit porter une note lisible, vérifiable et
              opposable — émise à Accra, Dakar ou Nairobi plutôt qu'à San Francisco.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {PERIMETRE.map((p) => (
                <span
                  key={p}
                  className="mono-k border border-ink/30 px-2.5 py-1.5 text-ink/75 hover:bg-ink hover:text-paper hover:border-ink transition-colors cursor-default"
                  style={{ fontSize: 9.5 }}
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={160}>
            <Kicker>Missions statutaires</Kicker>
            <ul className="mt-4 space-y-4">
              {MISSIONS.map((m, i) => (
                <li key={i} className="flex gap-4 border-l-2 border-gold pl-4 py-1 group hover:border-pine transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 mt-0.5 text-pine" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" />
                    <path d="M8.5 12l2.5 2.5 4.5-5" />
                  </svg>
                  <span className="text-sm md:text-[15px] leading-relaxed text-ink/85">{m}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Indicateurs */}
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 border border-ink/25 bg-pine text-paper mb-20">
            {[
              ["308", "critères au référentiel officiel (96 web/cloud + 212 IA)"],
              ["8 400", "entités suivies au registre — objectif 2027"],
              ["54", "États membres couverts · CEDEAO · CEMAC · SADC · EAC"],
              ["120", "auditeurs accrédités, dont 45 experts IA"],
            ].map(([n, l], i) => (
              <div key={l} className={`p-6 md:p-7 ${i < 3 ? "border-r border-paper/15" : ""} ${i < 2 ? "border-b lg:border-b-0 border-paper/15" : ""} group`}>
                <p className="disp-x text-4xl md:text-5xl text-gold-2 group-hover:text-paper transition-colors">{n}</p>
                <p className="mt-2 text-[12.5px] leading-snug text-paper/75">{l}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Grilles de notation */}
        <Reveal>
          <Kicker>Grilles de notation officielles — Annexe A du référentiel</Kicker>
        </Reveal>
        <div className="flex flex-col xl:flex-row gap-6 mt-5">
          <BandTable
            title="Pôle Web · Cloud · Banque · E-commerce"
            code="RÉF. WEB-26"
            bands={WEB_BANDS}
          />
          <BandTable
            title="Pôle Intelligence Artificielle"
            code="RÉF. IA-26"
            bands={AI_BANDS}
          />
        </div>

        <Reveal delay={120}>
          <div className="mt-8 border-l-4 border-gold bg-parch p-5 md:p-6 text-sm leading-relaxed text-ink/85 max-w-4xl">
            <p className="mono-k text-pine mb-2" style={{ fontSize: 10 }}>Doctrine d'équivalence</p>
            Une entité ne peut afficher un certificat <strong>AAA</strong> sur ses systèmes si l'un de ses
            modèles d'IA en production est noté en dessous de <strong>AI-BB</strong> : la note la plus
            faible plafonne le certificat global. Toute note inférieure à <strong>B</strong> déclenche une
            mise en demeure publique ; toute note <strong>D</strong> ou <strong>AI-D</strong> entraîne la
            saisine de la Commission de l'Union Africaine et l'inscription au registre des sanctions.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
