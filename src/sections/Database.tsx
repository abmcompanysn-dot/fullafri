import { SQL } from "../data";
import { CodeBlock, Kicker, Reveal, SectionHead } from "../lib";

const CONVENTIONS = [
  ["Clés primaires", "UUID v4 via gen_random_uuid() (pgcrypto) — aucun identifiant séquentiel exposé."],
  ["Horodatage", "TIMESTAMPTZ systématique ; created_at immuable, updated_at par déclencheur."],
  ["Nommage", "snake_case, tables au pluriel, enums métiers typés (grade_band, cert_status…)."],
  ["Intégrité", "clés étrangères ON DELETE contrôlé, contraintes CHECK sur scores et sévérités."],
  ["Souveraineté", "aucune donnée personnelle en clair : otp_codes stocke un hash, jamais le code."],
];

const CONTRACTS = [
  { rel: "organizations 1 — N digital_systems", note: "une entité exploite plusieurs systèmes notés" },
  { rel: "organizations 1 — N ai_models", note: "chaque modèle IA est rattaché à son éditeur/opérateur" },
  { rel: "audits 1 — N audit_scores", note: "un score par critère, preuves JSONB à l'appui" },
  { rel: "audits 1 — 1 ratings", note: "une délibération produit une note unique (WEB ou IA)" },
  { rel: "ratings 1 — 1 certificates", note: "la note est scellée dans un certificat signé Ed25519" },
  { rel: "audits 1 — 1 audit_reports", note: "le rapport PDF publié porte son empreinte SHA-256" },
  { rel: "audit_reports 1 — N report_findings", note: "constats classés CRITIQUE → INFO, tous traçables" },
  { rel: "users 1 — N otp_codes", note: "chaque OTP Resend est tracé (purpose, expiration, msg_id)" },
];

export default function Database() {
  return (
    <section id="s3" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHead
          num="03"
          kicker="Schéma de base de données"
          title="PostgreSQL 16 : le registre comme pièce d'horlogerie."
          intro="Quatorze tables portent l'intégralité du cycle de notation — de l'entité auditée au certificat cryptographique publié. Le schéma ci-dessous est celui déployé en production sur le VPS, versionné par migrations."
        />

        <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
          {/* Conventions */}
          <Reveal className="lg:sticky lg:top-24">
            <Kicker>Conventions de modélisation</Kicker>
            <ul className="mt-5 space-y-4">
              {CONVENTIONS.map(([k, v]) => (
                <li key={k} className="border-l-2 border-gold pl-4">
                  <p className="mono-k text-pine" style={{ fontSize: 10 }}>{k}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink/75">{v}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 border border-ink/25 bg-parch p-4">
              <p className="mono-k text-pine mb-2" style={{ fontSize: 10 }}>Tables (14)</p>
              <p className="font-mono text-[11.5px] leading-relaxed text-ink/75">
                organizations · digital_systems · ai_models · audit_criteria · audits ·
                audit_scores · ratings · certificates · audit_reports · report_findings ·
                users · otp_codes · audit_logs
              </p>
            </div>
          </Reveal>

          {/* SQL */}
          <Reveal delay={100}>
            <CodeBlock
              code={SQL}
              file="migrations/0001_schema_fullafri.sql"
              note="PostgreSQL 16 · utf8 · UTF-8"
            />
          </Reveal>
        </div>

        {/* Contrats d'intégrité */}
        <div className="mt-16">
          <Reveal><Kicker>Contrats d'intégrité relationnelle</Kicker></Reveal>
          <div className="mt-5 grid sm:grid-cols-2 gap-px bg-ink/20 border border-ink/20">
            {CONTRACTS.map((c, i) => (
              <Reveal key={c.rel} delay={i * 50} className="bg-paper">
                <div className="p-5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5 hover:bg-parch transition-colors h-full">
                  <code className="font-mono text-[12px] text-pine font-semibold whitespace-nowrap">{c.rel}</code>
                  <span className="text-[13px] text-ink/70">{c.note}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
