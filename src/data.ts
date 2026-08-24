/* ============================================================
   FullAfri — Données du Dossier Technique Officiel (FA/DT-2026-001)
   ============================================================ */

export type Grade =
  | "AAA" | "AA" | "A" | "BBB" | "BB" | "B" | "CCC" | "CC" | "C" | "D";

export interface RegistryRow {
  name: string;
  slug: string;
  sector: string;
  country: string;
  flag: string;
  web: { grade: Grade; score: number };
  ai: { grade: Grade; score: number } | null;
  cert: "ACTIF" | "SUSPENDU" | "EN COURS";
  serial: string;
  fingerprint: string;
  auditRef: string;
  auditor: string;
  validUntil: string;
}

export const NAV = [
  { id: "s1", num: "01", title: "Fiche de présentation exécutive", short: "Exécutif" },
  { id: "s2", num: "02", title: "Architecture schématique", short: "Architecture" },
  { id: "s3", num: "03", title: "Schéma de base de données", short: "PostgreSQL" },
  { id: "s4", num: "04", title: "Plan du site & code source", short: "Site & Registre" },
  { id: "s5", num: "05", title: "Guide de déploiement", short: "Déploiement" },
  { id: "s6", num: "06", title: "Application — demande d'audit", short: "Application" },
];

export const SECTORS = [
  "TOUS", "BANQUE", "FINTECH", "E-COMMERCE", "TÉLÉCOM", "CLOUD/SAAS", "MÉDIAS", "IA",
];

export const REGISTRY: RegistryRow[] = [
  { name: "Sankofa AI", slug: "sankofa-ai", sector: "IA", country: "Ghana", flag: "GH", web: { grade: "AAA", score: 95.8 }, ai: { grade: "AAA", score: 96.2 }, cert: "ACTIF", serial: "FA-CERT-2026-00981", fingerprint: "7f3a91c4e5b8d02f6a1c94dd3e87b5a2f0c16e9d4b7a823f5e0d1c9b6a4f2e78", auditRef: "AUD-2026-0114", auditor: "Dr L. Acheampong", validUntil: "12/03/2027" },
  { name: "MTN Mobile Money", slug: "mtn-momo", sector: "FINTECH", country: "Ghana", flag: "GH", web: { grade: "AAA", score: 96.4 }, ai: { grade: "AA", score: 88.1 }, cert: "ACTIF", serial: "FA-CERT-2026-00964", fingerprint: "a1c4e7f92b8d5063c9e1f4a7d2b8c5e0f3a6d9b2c7e4f1a8d5b0c3e6f9a2d7b4", auditRef: "AUD-2026-0031", auditor: "Ing. K. Mensah", validUntil: "08/02/2027" },
  { name: "M-Pesa (Safaricom)", slug: "m-pesa", sector: "FINTECH", country: "Kenya", flag: "KE", web: { grade: "AAA", score: 95.2 }, ai: { grade: "A", score: 83.5 }, cert: "ACTIF", serial: "FA-CERT-2026-00955", fingerprint: "b2d5e8f03c9a6174d0f2a5b8e1c4d7f0a3b6e9c2d5f8a1b4e7c0d3f6a9b2e5c8", auditRef: "AUD-2026-0027", auditor: "Mme S. Wanjiru", validUntil: "21/01/2027" },
  { name: "Wave", slug: "wave", sector: "FINTECH", country: "Sénégal", flag: "SN", web: { grade: "AA", score: 90.8 }, ai: null, cert: "ACTIF", serial: "FA-CERT-2026-00942", fingerprint: "c3e6f9a14d0b7285e1a3b6c9f2d5e8a1b4c7f0d3e6a9b2c5f8d1e4a7b0c3f6d9", auditRef: "AUD-2025-0212", auditor: "M. O. Ndiaye", validUntil: "15/12/2026" },
  { name: "Orange Money", slug: "orange-money", sector: "FINTECH", country: "Côte d'Ivoire", flag: "CI", web: { grade: "AA", score: 89.3 }, ai: { grade: "BBB", score: 72.4 }, cert: "ACTIF", serial: "FA-CERT-2026-00938", fingerprint: "d4f7a0b25e1c8396f2b4c7d0a3e6f9b2c5d8a1e4f7b0c3d6a9e2f5b8c1d4a7e0", auditRef: "AUD-2025-0198", auditor: "Mme A. Koné", validUntil: "02/12/2026" },
  { name: "Standard Bank", slug: "standard-bank", sector: "BANQUE", country: "Afrique du Sud", flag: "ZA", web: { grade: "AA", score: 88.7 }, ai: { grade: "A", score: 81.2 }, cert: "ACTIF", serial: "FA-CERT-2026-00921", fingerprint: "e5a8b1c36f2d9407a3c5d8e1b4f7a0c3d6e9b2f5a8c1d4e7b0f3a6c9d2e5b8f1", auditRef: "AUD-2025-0187", auditor: "Ing. T. Van Wyk", validUntil: "19/11/2026" },
  { name: "Google Search & Cloud", slug: "google", sector: "CLOUD/SAAS", country: "États-Unis", flag: "US", web: { grade: "AA", score: 91.5 }, ai: { grade: "A", score: 84.6 }, cert: "ACTIF", serial: "FA-CERT-2026-00902", fingerprint: "f6b9c2d47a3e0518b4d6e9f2c5a8b1d4e7f0c3a6b9d2e5f8c1a4b7d0e3f6c9a2", auditRef: "AUD-2026-0008", auditor: "Dr L. Acheampong", validUntil: "30/01/2027" },
  { name: "OpenAI (GPT-5)", slug: "openai", sector: "IA", country: "États-Unis", flag: "US", web: { grade: "A", score: 82.4 }, ai: { grade: "AA", score: 88.9 }, cert: "ACTIF", serial: "FA-CERT-2026-00887", fingerprint: "a7c0d3e58b4f1629c5e7f0a3d6b9c2e5f8a1d4b7c0e3f6a9d2b5c8e1f4a7d0b3", auditRef: "AUD-2026-0003", auditor: "Pr J. Okonkwo", validUntil: "14/01/2027" },
  { name: "Andela", slug: "andela", sector: "CLOUD/SAAS", country: "Kenya", flag: "KE", web: { grade: "A", score: 83.8 }, ai: { grade: "BB", score: 63.5 }, cert: "ACTIF", serial: "FA-CERT-2025-00863", fingerprint: "b8d1e4f69c5a2730d6f8a1b4e7c0d3f6a9b2e5c8d1f4a7b0e3c6d9f2a5b8e1c4", auditRef: "AUD-2025-0176", auditor: "Mme S. Wanjiru", validUntil: "27/10/2026" },
  { name: "Mistral AI", slug: "mistral", sector: "IA", country: "France", flag: "FR", web: { grade: "A", score: 80.9 }, ai: { grade: "A", score: 82.7 }, cert: "ACTIF", serial: "FA-CERT-2025-00851", fingerprint: "c9e2f5a70d6b3841e7a9b2c5f8d1e4a7b0c3f6d9e2a5b8c1f4d7a0e3b6c9f2d5", auditRef: "AUD-2025-0164", auditor: "Pr J. Okonkwo", validUntil: "09/10/2026" },
  { name: "Meta (Facebook · Instagram)", slug: "meta", sector: "MÉDIAS", country: "États-Unis", flag: "US", web: { grade: "BBB", score: 76.1 }, ai: { grade: "BBB", score: 70.3 }, cert: "ACTIF", serial: "FA-CERT-2025-00836", fingerprint: "d0f3a6b81e7c4952f8b0c3d6a9e2f5b8c1d4a7e0f3b6c9d2a5e8f1b4c7d0a3e6", auditRef: "AUD-2025-0152", auditor: "Dr L. Acheampong", validUntil: "22/09/2026" },
  { name: "Jumia Group", slug: "jumia", sector: "E-COMMERCE", country: "Maroc · Nigéria", flag: "MA", web: { grade: "BBB", score: 74.6 }, ai: { grade: "BB", score: 66.8 }, cert: "ACTIF", serial: "FA-CERT-2025-00820", fingerprint: "e1a4b7c92f8d5063a9c1d4e7b0f3a6c9d2e5b8f1a4c7d0e3b6f9a2c5d8e1b4f7", auditRef: "AUD-2025-0141", auditor: "M. Y. El Fassi", validUntil: "05/09/2026" },
  { name: "Kuda Bank", slug: "kuda", sector: "BANQUE", country: "Nigéria", flag: "NG", web: { grade: "BBB", score: 71.9 }, ai: { grade: "BB", score: 64.3 }, cert: "ACTIF", serial: "FA-CERT-2025-00804", fingerprint: "f2b5c8d03a9e6174b0d2e5f8c1a4b7d0e3f6c9a2b5d8e1f4c7a0b3d6e9f2c5a8", auditRef: "AUD-2025-0129", auditor: "Ing. C. Eze", validUntil: "18/08/2026" },
  { name: "DStv (MultiChoice)", slug: "dstv", sector: "MÉDIAS", country: "Afrique du Sud", flag: "ZA", web: { grade: "BB", score: 68.4 }, ai: null, cert: "ACTIF", serial: "FA-CERT-2025-00788", fingerprint: "a3c6d9e14b0f7285c1e3f6a9d2b5c8e1f4a7d0b3e6f9c2a5d8b1e4f7a0c3d6b9", auditRef: "AUD-2025-0117", auditor: "Ing. T. Van Wyk", validUntil: "31/07/2026" },
  { name: "Flutterwave", slug: "flutterwave", sector: "FINTECH", country: "Nigéria", flag: "NG", web: { grade: "BB", score: 67.2 }, ai: { grade: "B", score: 58.9 }, cert: "EN COURS", serial: "FA-CERT-2024-00741", fingerprint: "b4d7e0f25c1a8396d2f4a7b0e3c6d9f2a5b8e1c4f7a0d3b6e9c2f5a8d1b4e7c0", auditRef: "AUD-2026-0121", auditor: "Ing. C. Eze", validUntil: "Renouvellement" },
  { name: "Ethio Telecom · Telebirr", slug: "telebirr", sector: "TÉLÉCOM", country: "Éthiopie", flag: "ET", web: { grade: "BB", score: 66.1 }, ai: null, cert: "ACTIF", serial: "FA-CERT-2025-00762", fingerprint: "c5e8f1a36d2b9407e3a5b8c1f4d7a0e3b6c9f2a5d8b1e4c7f0a3d6b9e2c5f8a1", auditRef: "AUD-2025-0103", auditor: "M. D. Bekele", validUntil: "12/07/2026" },
  { name: "Chipper Cash", slug: "chipper-cash", sector: "FINTECH", country: "Ghana", flag: "GH", web: { grade: "B", score: 59.6 }, ai: null, cert: "SUSPENDU", serial: "FA-CERT-2024-00695", fingerprint: "d6f9a2b47e3c0518f4b6c9d2a5e8f1b4c7d0a3e6b9f2c5d8a1e4b7c0d3f6a9b2", auditRef: "AUD-2026-0102", auditor: "Ing. K. Mensah", validUntil: "Suspendu le 02/03/2026" },
];

export const AI_MODELS = [
  {
    id: "sankofa", name: "Sankofa-7B", org: "FullAfri Lab · Accra", family: "LLM souverain",
    grade: "AI-AAA" as const, score: 96.2, params: "7,3 Md", langs: 41,
    corpus: "Corpus africain multilingue (41 langues) audités + données synthétiques tracées",
    bars: [97, 96, 94, 95, 99],
  },
  {
    id: "gpt5", name: "GPT-5", org: "OpenAI · États-Unis", family: "LLM généraliste",
    grade: "AI-AA" as const, score: 88.9, params: "≈ 1 800 Md (MoE)", langs: 14,
    corpus: "Corpus propriétaire non divulgué — traçabilité partielle (58 %)",
    bars: [82, 88, 86, 95, 74],
  },
  {
    id: "gemini3", name: "Gemini 3 Ultra", org: "Google DeepMind · États-Unis", family: "LLM multimodal",
    grade: "AI-A" as const, score: 84.6, params: "≈ 1 000 Md (MoE)", langs: 11,
    corpus: "Index web + corpus multimodal — traçabilité partielle (61 %)",
    bars: [79, 86, 83, 92, 70],
  },
  {
    id: "sahel", name: "Sahel-Vision v2", org: "Caire Labs · Égypte", family: "Vision par ordinateur",
    grade: "AI-BBB" as const, score: 74.1, params: "0,9 Md", langs: 6,
    corpus: "Jeux d'images urbaines africaines — consentement vérifié à 82 %",
    bars: [68, 77, 71, 84, 72],
  },
  {
    id: "djassa", name: "Djassa-Reco", org: "Djassa Streaming · Bénin", family: "Recommandation",
    grade: "AI-BB" as const, score: 66.8, params: "0,2 Md", langs: 3,
    corpus: "Journaux d'écoute — opt-out incomplet, dark pattern signalé (F-04)",
    bars: [58, 70, 63, 74, 69],
  },
];

export const AI_CRITERIA = [
  "Transparence algorithmique",
  "Gouvernance des données d'entraînement",
  "Biais, équité & non-discrimination",
  "Robustesse, sûreté & red-teaming",
  "Inclusion linguistique africaine",
];

export interface Band { grade: string; range: string; label: string; tone: string; }
export const WEB_BANDS: Band[] = [
  { grade: "AAA", range: "95,00 – 100", label: "Excellence. Chiffrement de bout en bout, données hébergées sur le continent, conformité totale Acte UA + RGPD.", tone: "#1e7a4f" },
  { grade: "AA", range: "88,00 – 94,99", label: "Très robuste. Maturité élevée ; réserves mineures documentées dans le rapport.", tone: "#1e7a4f" },
  { grade: "A", range: "80,00 – 87,99", label: "Solide. Bonnes pratiques ; plan de correction des écarts sous 90 jours.", tone: "#2e6b4f" },
  { grade: "BBB", range: "70,00 – 79,99", label: "Adequate. Conformité de base ; surveillance renforcée semestrielle.", tone: "#8a6d1f" },
  { grade: "BB", range: "62,00 – 69,99", label: "Fragile. Lacunes significatives ; audit de suivi obligatoire sous 6 mois.", tone: "#8a6d1f" },
  { grade: "B", range: "55,00 – 61,99", label: "Insuffisante. Mise en demeure publique et correctifs sous 120 jours.", tone: "#b07c10" },
  { grade: "CCC", range: "45,00 – 54,99", label: "Défaillante. Suspension possible du certificat, alerte aux régulateurs nationaux.", tone: "#b4532a" },
  { grade: "CC", range: "38,00 – 44,99", label: "Grave. Inscription au registre des sanctions de l'Union Africaine.", tone: "#b4532a" },
  { grade: "C", range: "30,00 – 37,99", label: "Critique. Saisine de la Commission UA ; blocage recommandé aux États membres.", tone: "#a63d22" },
  { grade: "D", range: "0 – 29,99", label: "Non-conforme. Retrait du registre public positif, sanction et publication au JO de l'UA.", tone: "#a63d22" },
];

export const AI_BANDS: Band[] = [
  { grade: "AI-AAA", range: "95,00 – 100", label: "IA exemplaire. Traçabilité complète du corpus, cartes de modèles publiques, inclusion linguistique ≥ 30 langues africaines.", tone: "#1e7a4f" },
  { grade: "AI-AA", range: "88,00 – 94,99", label: "IA très fiable. Red-teaming indépendant documenté, écarts de biais < 2 points.", tone: "#1e7a4f" },
  { grade: "AI-A", range: "80,00 – 87,99", label: "IA fiable. Explicabilité satisfaisante ; gouvernance des données perfectible.", tone: "#2e6b4f" },
  { grade: "AI-BBB", range: "70,00 – 79,99", label: "IA acceptable. Biais mesurés mais non entièrement corrigés ; suivi annuel.", tone: "#8a6d1f" },
  { grade: "AI-BB", range: "62,00 – 69,99", label: "IA fragile. Opacité du corpus ou dark patterns ; correctifs sous 90 jours.", tone: "#8a6d1f" },
  { grade: "AI-B", range: "55,00 – 61,99", label: "IA insuffisante. Mise en demeure ; gel des déploiements publics recommandé.", tone: "#b07c10" },
  { grade: "AI-CCC", range: "45,00 – 54,99", label: "IA défaillante. Risques discriminatoires avérés ; suspension du certificat.", tone: "#b4532a" },
  { grade: "AI-CC", range: "38,00 – 44,99", label: "IA grave. Interdiction de déploiement dans l'espace numérique africain.", tone: "#b4532a" },
  { grade: "AI-C", range: "30,00 – 37,99", label: "IA critique. Saisine de la Commission UA et des autorités de protection des données.", tone: "#a63d22" },
  { grade: "AI-D", range: "0 – 29,99", label: "IA non-conforme. Interdiction définitive, démantèlement surveillé, sanctions.", tone: "#a63d22" },
];

export const FLUX = [
  { code: "F1", title: "Requête publique", text: "Le navigateur (utilisateur, auditeur, entité notée) résout fullafri.africa via l'edge Cloudflare : anti-DDoS, WAF, terminaison SSL/TLS 1.3." },
  { code: "F2", title: "Routage interne", text: "Cloudflare transmet au VPS Contabo ; Caddy (reverse proxy) route vers le Service Next.js (contenu public) ou l'API NestJS selon le préfixe /api." },
  { code: "F3", title: "Lecture du registre", text: "L'API NestJS interroge PostgreSQL (tables organizations, ratings, certificates) et renvoie le JSON du registre public, mis en cache edge 60 s." },
  { code: "F4", title: "Moteur de notation", text: "Le worker Go exécute les batteries de tests (212 critères IA / 96 critères Web), écrit audit_scores puis déclenche la délibération." },
  { code: "F5", title: "OTP & notifications", text: "NestJS appelle l'API Resend pour l'envoi des OTP (connexion auditeurs, signature de rapports, révocation) ; identifiants tracés dans otp_codes." },
  { code: "F6", title: "Orchestration", text: "Coolify construit les images (Next.js, NestJS, Go) depuis Git et les déploie sur k3s ; rollbacks et certificats TLS gérés automatiquement." },
];

export const INFRA = [
  { comp: "Edge & bouclier", tech: "Cloudflare", role: "Anti-DDoS, WAF, terminaison SSL, cache du registre", loc: "Réseau mondial" },
  { comp: "Reverse proxy", tech: "Caddy", role: "Routage interne, TLS automatique (DNS-01 Cloudflare)", loc: "VPS · :80/:443" },
  { comp: "Frontend public", tech: "Next.js · TypeScript", role: "Registre public, fiches d'audit, vérification de certificats", loc: "Pod k3s · :3001" },
  { comp: "API métier", tech: "NestJS (Node.js)", role: "REST /api/v1, notation, certificats, OTP Resend", loc: "Pod k3s · :3000" },
  { comp: "Moteur d'audit", tech: "Go 1.23", role: "Batteries de tests, scoring pondéré, CronJob k3s", loc: "Pod k3s · worker" },
  { comp: "Base de données", tech: "PostgreSQL 16", role: "Entités, systèmes, modèles IA, certificats, rapports", loc: "Pod k3s · :5432 · vol. 8 Go" },
  { comp: "Orchestration", tech: "Docker · k3s · Coolify", role: "Conteneurisation, scheduling léger, CI/CD GitOps", loc: "VPS Contabo 1 vCPU · 2 Go · 10 Go SSD" },
  { comp: "Durcissement", tech: "Fail2ban · UFW", role: "Bannissement des brute-force, pare-feu minimal", loc: "Hôte Ubuntu 24.04 LTS" },
  { comp: "E-mails & OTP", tech: "Resend API", role: "Transactionnels signés DKIM, codes à usage unique", loc: "Externe (API HTTPS)" },
];

export const SITEMAP = `fullafri.africa/
├── /                          Accueil institutionnel
├── /registre                  Registre public des entités notées
│   └── /registre/:slug        Fiche détaillée + certificat (QR signé)
├── /audits
│   ├── /audits/web-cloud      Pôle Web, Cloud & E-commerce
│   ├── /audits/banques        Pôle Banques & Fintech
│   └── /audits/:ref           Rapport d'audit (PDF scellé SHA-256)
├── /ia                        Pôle d'audit Intelligence Artificielle
│   ├── /ia/modeles            Modèles évalués (LLM · Vision · Recommandation)
│   └── /ia/modeles/:id        Fiche de notation AI-AAA → AI-D
├── /methodologie              Référentiel officiel & grille des 308 critères
├── /certificats/verifier      Vérification cryptographique publique
├── /espace-audite             Portail des entités auditées (connexion OTP Resend)
├── /presse                    Communiqués, mises en demeure & sanctions
└── /api/v1                    API publique (Go/NestJS) · docs OpenAPI`;

/* ---------------- Schéma SQL complet ---------------- */
export const SQL = `-- =========================================================
-- FullAfri — Schéma PostgreSQL 16
-- Registre public · Audits · Notation · Certificats · IA
-- Réf. FA/DT-2026-001 · v2.1 · Licence institutionnelle
-- =========================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------- Domaines & énumérations ----------------
CREATE TYPE entity_sector  AS ENUM ('BANQUE','ECOMMERCE','CLOUD','TELECOM',
                                    'FINTECH','ADMINISTRATION','MEDIAS','IA');
CREATE TYPE system_kind    AS ENUM ('SITE_WEB','API','CLOUD','APP_MOBILE',
                                    'PLATEFORME_ECOMMERCE','CORE_BANKING');
CREATE TYPE ai_family      AS ENUM ('LLM','VISION','RECOMMANDATION','SCORING','GENERATIF');
CREATE TYPE audit_status   AS ENUM ('PLANIFIE','EN_COURS','DELIBERATION','PUBLIE','CLOS');
CREATE TYPE grade_band     AS ENUM ('AAA','AA','A','BBB','BB','B','CCC','CC','C','D');
CREATE TYPE cert_status    AS ENUM ('ACTIF','SUSPENDU','REVOQUE','EXPIRE');

-- ---------------- Entités notées ----------------
CREATE TABLE organizations (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legal_name       TEXT NOT NULL,
  trade_name       TEXT,
  sector           entity_sector NOT NULL,
  country_iso      CHAR(2) NOT NULL,
  website          TEXT,
  dpo_email        TEXT,                        -- Délégué à la protection des données
  is_public_listed BOOLEAN NOT NULL DEFAULT TRUE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE digital_systems (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  kind            system_kind NOT NULL,
  name            TEXT NOT NULL,
  base_url        TEXT,
  hosting_region  TEXT,                          -- ex. 'af-south-1', 'eu-west-3'
  data_residency  BOOLEAN NOT NULL DEFAULT FALSE,-- données hébergées en Afrique
  last_scan_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE ai_models (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id           UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  family                    ai_family NOT NULL,
  name                      TEXT NOT NULL,
  version                   TEXT NOT NULL,
  params_billions           NUMERIC(8,1),
  training_corpus           TEXT,
  corpus_traceability_pct   SMALLINT CHECK (corpus_traceability_pct BETWEEN 0 AND 100),
  african_languages         INT NOT NULL DEFAULT 0,
  deployed_in               TEXT[],              -- pays de déploiement déclarés
  created_at                TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------- Référentiel d'audit ----------------
CREATE TABLE audit_criteria (
  id          SERIAL PRIMARY KEY,
  code        TEXT UNIQUE NOT NULL,              -- ex. 'SEC-01', 'IA-07', 'RGD-12'
  pole        TEXT NOT NULL CHECK (pole IN ('WEB','CLOUD','IA')),
  label       TEXT NOT NULL,
  weight      NUMERIC(5,2) NOT NULL DEFAULT 1.00,
  description TEXT
);

CREATE TABLE audits (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_code         TEXT UNIQUE NOT NULL,          -- ex. 'AUD-2026-0114'
  organization_id  UUID NOT NULL REFERENCES organizations(id),
  target_system_id UUID REFERENCES digital_systems(id),
  target_model_id  UUID REFERENCES ai_models(id),
  status           audit_status NOT NULL DEFAULT 'PLANIFIE',
  lead_auditor     TEXT NOT NULL,
  opened_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  closed_at        TIMESTAMPTZ,
  CONSTRAINT single_target CHECK (
    (target_system_id IS NULL) <> (target_model_id IS NULL)
  )
);

CREATE TABLE audit_scores (
  audit_id     UUID NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
  criterion_id INT  NOT NULL REFERENCES audit_criteria(id),
  score        NUMERIC(5,2) NOT NULL CHECK (score BETWEEN 0 AND 100),
  evidence     JSONB NOT NULL DEFAULT '{}'::jsonb, -- captures, journaux, extraits
  scored_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (audit_id, criterion_id)
);

CREATE TABLE ratings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id        UUID NOT NULL UNIQUE REFERENCES audits(id),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  pole            TEXT NOT NULL CHECK (pole IN ('WEB','IA')),
  global_score    NUMERIC(5,2) NOT NULL CHECK (global_score BETWEEN 0 AND 100),
  grade           grade_band NOT NULL,            -- préfixée 'AI-' à l'affichage si pole='IA'
  valid_until     DATE NOT NULL,
  published_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------- Certificats cryptographiques ----------------
CREATE TABLE certificates (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rating_id          UUID NOT NULL UNIQUE REFERENCES ratings(id),
  serial             TEXT UNIQUE NOT NULL,        -- ex. 'FA-CERT-2026-00981'
  status             cert_status NOT NULL DEFAULT 'ACTIF',
  public_key_pem     TEXT NOT NULL,               -- clé Ed25519 de vérification
  signature          TEXT NOT NULL,               -- signature du payload de notation
  fingerprint_sha256 CHAR(64) NOT NULL,
  qr_payload         TEXT NOT NULL,               -- https://fullafri.africa/verify/<serial>
  issued_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at         TIMESTAMPTZ NOT NULL,
  revoked_at         TIMESTAMPTZ,
  revoke_reason      TEXT
);

-- ---------------- Rapports d'audit ----------------
CREATE TABLE audit_reports (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id     UUID NOT NULL UNIQUE REFERENCES audits(id),
  title        TEXT NOT NULL,
  summary      TEXT NOT NULL,
  pdf_sha256   CHAR(64) NOT NULL,                 -- sceau du PDF publié
  download_url TEXT NOT NULL,
  pages        SMALLINT,
  language     CHAR(2) NOT NULL DEFAULT 'fr',
  published_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE report_findings (
  id             BIGSERIAL PRIMARY KEY,
  report_id      UUID NOT NULL REFERENCES audit_reports(id) ON DELETE CASCADE,
  severity       TEXT NOT NULL CHECK (severity IN ('CRITIQUE','MAJEURE','MINEURE','INFO')),
  code           TEXT NOT NULL,                   -- ex. 'F-04'
  finding        TEXT NOT NULL,
  recommendation TEXT
);

-- ---------------- Comptes, OTP (Resend) & journalisation ----------------
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  full_name     TEXT NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('AUDITEUR','COMMISSAIRE','ADMIN','PUBLIC')),
  password_hash TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE otp_codes (
  id            BIGSERIAL PRIMARY KEY,
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  code_hash     TEXT NOT NULL,                    -- jamais stocké en clair
  purpose       TEXT NOT NULL CHECK (purpose IN ('LOGIN','SIGN_REPORT','REVOKE')),
  expires_at    TIMESTAMPTZ NOT NULL,
  consumed_at   TIMESTAMPTZ,
  resend_msg_id TEXT                              -- identifiant de message Resend
);

CREATE TABLE audit_logs (
  id        BIGSERIAL PRIMARY KEY,
  actor_id  UUID REFERENCES users(id),
  action    TEXT NOT NULL,                        -- ex. 'RATING_PUBLISHED'
  entity    TEXT NOT NULL,                        -- table concernée
  entity_id UUID,
  meta      JSONB NOT NULL DEFAULT '{}'::jsonb,
  at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------------- Index ----------------
CREATE INDEX idx_systems_org       ON digital_systems(organization_id);
CREATE INDEX idx_models_org        ON ai_models(organization_id);
CREATE INDEX idx_ratings_org_pole  ON ratings(organization_id, pole);
CREATE INDEX idx_certs_active      ON certificates(status) WHERE status = 'ACTIF';
CREATE INDEX idx_scores_audit      ON audit_scores(audit_id);
CREATE INDEX idx_logs_at           ON audit_logs(at DESC);
CREATE INDEX idx_otp_pending       ON otp_codes(user_id) WHERE consumed_at IS NULL;

-- ---------------- Déclencheur updated_at ----------------
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_orgs_updated
  BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();`;

/* ---------------- Extrait de code source (livrable 4.4) ---------------- */
export const HTML_SRC = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>FullAfri — Registre public de notation numérique & IA</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</head>
<body class="bg-stone-100 text-stone-900 font-sans">

  <!-- Barre institutionnelle -->
  <header class="bg-emerald-950 text-emerald-50">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
      <i class="fa-solid fa-shield-halved text-amber-400 text-2xl"></i>
      <div>
        <p class="font-black tracking-tight text-lg leading-none">FULLAFRI</p>
        <p class="text-[11px] uppercase tracking-[0.2em] text-emerald-300">
          Notation · Audit · Régulation Numérique & IA
        </p>
      </div>
      <nav class="ml-auto hidden md:flex gap-6 text-sm">
        <a href="#registre" class="hover:text-amber-300">Registre public</a>
        <a href="#ia" class="hover:text-amber-300">Pôle IA</a>
        <a href="/certificats/verifier" class="hover:text-amber-300">
          <i class="fa-solid fa-certificate"></i> Vérifier
        </a>
      </nav>
    </div>
  </header>

  <main class="max-w-6xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-black">Registre public des entités notées</h1>
    <p class="text-stone-600 mt-1">
      Notations Web/Cloud (AAA→D) et IA (AI-AAA→AI-D) · mises à jour quotidiennes.
    </p>

    <!-- Moteur de recherche du registre -->
    <div class="mt-6 flex gap-2">
      <label class="flex-1 flex items-center gap-2 bg-white border
                    border-stone-300 px-3 py-2 rounded">
        <i class="fa-solid fa-magnifying-glass text-stone-400"></i>
        <input id="q" type="search" placeholder="Entité, pays, secteur…"
               class="w-full outline-none text-sm" />
      </label>
      <select id="secteur" class="bg-white border border-stone-300
                                  rounded px-3 text-sm">
        <option value="">Tous les secteurs</option>
        <option>Banque</option><option>Fintech</option>
        <option>E-commerce</option><option>IA</option>
      </select>
    </div>

    <!-- Table du registre -->
    <table id="registre" class="w-full mt-6 bg-white border border-stone-300 text-sm">
      <thead class="bg-emerald-950 text-emerald-50 text-left uppercase text-xs">
        <tr>
          <th class="px-3 py-2">Entité</th><th class="px-3 py-2">Secteur</th>
          <th class="px-3 py-2">Web/Cloud</th><th class="px-3 py-2">IA</th>
          <th class="px-3 py-2">Certificat</th>
        </tr>
      </thead>
      <tbody><!-- lignes injectées via GET /api/v1/registre --></tbody>
    </table>
  </main>

  <script>
    // Recherche côté client (l'API NestJS expose /api/v1/registre?q=...)
    const q = document.getElementById("q");
    q.addEventListener("input", async () => {
      const r = await fetch("/api/v1/registre?q=" + encodeURIComponent(q.value));
      const rows = await r.json();
      document.querySelector("#registre tbody").innerHTML = rows.map(e =>
        "<tr class='border-t border-stone-200'>" +
        "<td class='px-3 py-2 font-semibold'>" + e.nom + "</td>" +
        "<td class='px-3 py-2'>" + e.secteur + "</td>" +
        "<td class='px-3 py-2'>" + e.noteWeb + "</td>" +
        "<td class='px-3 py-2'>" + (e.noteIA ?? "—") + "</td>" +
        "<td class='px-3 py-2'><i class='fa-solid fa-certificate text-emerald-700'></i> "
        + e.certificat + "</td></tr>").join("");
    });
  </script>
</body>
</html>`;

/* ---------------- Guide de déploiement ---------------- */
export interface DeployStep { n: number; title: string; text: string; lang: "bash" | "conf" | "yaml"; code: string; }

export const DEPLOY_STEPS: DeployStep[] = [
  {
    n: 1,
    title: "Prise en main & durcissement du VPS Contabo",
    text: "Le VPS (1 vCPU · 2 Go RAM · 10 Go SSD) est livré sous Ubuntu 24.04 LTS. On crée un compte non-root, on ouvre uniquement les ports nécessaires et on arme Fail2ban. Avec 2 Go de RAM, on ajoute 2 Go de swap : k3s et Coolify cohabitent ainsi sans OOM.",
    lang: "bash",
    code: `ssh root@203.0.113.10                       # IP Contabo du VPS
adduser fullafri && usermod -aG sudo fullafri
ssh-copy-id fullafri@203.0.113.10

# Pare-feu minimal
ufw allow 22/tcp && ufw allow 80/tcp && ufw allow 443/tcp
ufw allow 8000/tcp                            # console Coolify (à restreindre ensuite)
ufw enable

# Fail2ban contre les brute-force
apt update && apt install -y fail2ban
systemctl enable --now fail2ban

# Swap de confort (2 Go)
fallocate -l 2G /swapfile && chmod 600 /swapfile
mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab`,
  },
  {
    n: 2,
    title: "Moteur de conteneurs : Docker + Kubernetes k3s",
    text: "Docker sert de runtime local (builds, outillage). k3s — distribution Kubernetes allégée (~512 Mo de RAM) — accueille les charges de production. On désactive Traefik : c'est Caddy qui assurera l'ingress.",
    lang: "bash",
    code: `# Docker CE
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker fullafri

# k3s (sans Traefik, ingress délégué à Caddy)
curl -sfL https://get.k3s.io | sh -s - --disable traefik --write-kubeconfig-mode 644
kubectl get nodes                             # le nœud doit être Ready`,
  },
  {
    n: 3,
    title: "Installation de Coolify (orchestration & CI/CD)",
    text: "Coolify est installé en auto-hébergement sur le même VPS. Sa console (port 8000) pilote builds Git, déploiements zero-downtime sur k3s, variables d'environnement et certificats. Une fois l'installation validée, on restreint l'accès console au VPN ou à une IP fixe.",
    lang: "bash",
    code: `curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
# Console : http://203.0.113.10:8000  (créer le compte admin)

# Puis dans Coolify :
#   Servers  -> Localhost  ->  activer "Build server"
#   Settings -> activer les déploiements vers k3s
ufw delete allow 8000/tcp && ufw allow from 41.202.0.0/16 to any port 8000`,
  },
  {
    n: 4,
    title: "DNS Cloudflare & reverse proxy Caddy",
    text: "Chez Cloudflare, le domaine pointe vers le VPS en mode proxifié (orange) : anti-DDoS et SSL edge. Caddy termine le TLS interne via challenge DNS-01 (plugin Cloudflare) et route /api vers NestJS, le reste vers Next.js.",
    lang: "conf",
    code: `# Zone DNS Cloudflare
#   A   fullafri.africa      203.0.113.10   (proxied)
#   A   api.fullafri.africa  203.0.113.10   (proxied)
#   TXT _acme-challenge      (géré par Caddy, DNS-01)

# /etc/caddy/Caddyfile
fullafri.africa, api.fullafri.africa {
    tls {
        dns cloudflare {env.CLOUDFLARE_API_TOKEN}
    }
    handle /api/* {
        reverse_proxy nestjs-api.fullafri-ns.svc.cluster.local:3000
    }
    handle {
        reverse_proxy nextjs-web.fullafri-ns.svc.cluster.local:3001
    }
    encode zstd gzip
    log { output file /var/log/caddy/access.log }
}`,
  },
  {
    n: 5,
    title: "Déploiement des services dans Coolify",
    text: "Chaque service est déclaré dans Coolify (onglet Projects → fullafri) : PostgreSQL 16 comme ressource managée, Next.js et NestJS en applications Nixpacks/Dockerfile, le moteur Go en CronJob k3s. Les secrets (Resend, JWT, Cloudflare) sont saisis une seule fois dans Coolify et injectés au runtime.",
    lang: "yaml",
    code: `# Récapitulatif des services (Coolify → Project "fullafri")
services:
  fullafri-db:
    type: postgresql:16-alpine
    port: 5432              # interne uniquement
    volume: /data/pg (8 Go)
  fullafri-api:
    type: nestjs (Dockerfile)
    port: 3000 -> api.fullafri.africa
    env: [DATABASE_URL, RESEND_API_KEY, JWT_SECRET, CERT_SIGNING_KEY]
  fullafri-web:
    type: nextjs (Nixpacks)
    port: 3001 -> fullafri.africa
    env: [NEXT_PUBLIC_API_URL]
  fullafri-worker:
    type: go 1.23 (multi-stage)
    kind: k3s CronJob "0 2 * * *"   # batterie de tests nocturne
  caddy-proxy:
    type: caddy + plugin cloudflare
    ports: 80/443`,
  },
  {
    n: 6,
    title: "Vérification, sauvegardes & exploitation",
    text: "On contrôle la chaîne complète — DNS, TLS, santé de l'API, écriture en base — puis on automatise la sauvegarde nocturne de PostgreSQL (pg_dump chiffré, rétention 14 jours) et la surveillance des bannissements Fail2ban.",
    lang: "bash",
    code: `curl -s https://api.fullafri.africa/api/v1/health
# -> {"status":"ok","db":"up","version":"2.1.0"}

echo | openssl s_client -connect fullafri.africa:443 -servername fullafri.africa \\
  | openssl x509 -noout -dates

# Sauvegarde PostgreSQL (cron quotidien 03:00)
pg_dump -h localhost -U fullafri fullafri_db \\
  | gzip > /backups/fullafri_$(date +%F).sql.gz

fail2ban-client status sshd                   # suivi des bannissements
kubectl -n fullafri-ns get pods               # état des charges k3s`,
  },
];

export const ENV_TABLE = [
  { svc: "fullafri-db", type: "PostgreSQL 16", port: "5432", expose: "Interne k3s", vars: "POSTGRES_PASSWORD (secret Coolify)" },
  { svc: "fullafri-api", type: "NestJS · Dockerfile", port: "3000", expose: "api.fullafri.africa (443)", vars: "DATABASE_URL · RESEND_API_KEY · JWT_SECRET" },
  { svc: "fullafri-web", type: "Next.js · Nixpacks", port: "3001", expose: "fullafri.africa (443)", vars: "NEXT_PUBLIC_API_URL" },
  { svc: "fullafri-worker", type: "Go 1.23 · multi-stage", port: "—", expose: "CronJob k3s 02:00 UTC", vars: "DATABASE_URL · SCORING_CONFIG" },
  { svc: "caddy-proxy", type: "Caddy + plugin Cloudflare", port: "80 / 443", expose: "Edge interne VPS", vars: "CLOUDFLARE_API_TOKEN" },
];
