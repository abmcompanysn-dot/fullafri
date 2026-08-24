import { useEffect, useRef, useState } from "react";
import { SECTORS } from "../data";
import { CopyBtn, Reveal, SectionHead } from "../lib";

/* ---------------- Constantes ---------------- */
const COUNTRIES = [
  "Bénin", "Burkina Faso", "Cameroun", "Côte d'Ivoire", "Égypte", "Éthiopie",
  "Ghana", "Kenya", "Maroc", "Nigéria", "RD Congo", "Rwanda", "Sénégal",
  "Afrique du Sud", "Tanzanie", "Togo", "Tunisie", "France", "États-Unis", "Autre",
];

const SYSTEM_KINDS = ["Site web", "API publique", "Plateforme e-commerce", "Core banking", "Application mobile", "Infrastructure cloud"];
const AI_FAMILIES = ["LLM / IA générative", "Vision par ordinateur", "Recommandation", "Scoring automatisé"];
const HOSTING = ["Afrique (souverain)", "Europe", "Amérique du Nord", "Multi-régions", "Autre"];

const PROCESS = [
  ["Dépôt du dossier", "Référence DMD attribuée immédiatement, accusé envoyé par e-mail (Resend)."],
  ["Recevabilité", "Vérification formelle sous 72 h ouvrées par le greffe de l'Agence."],
  ["Audit", "Batterie de tests : 96 critères Web/Cloud ou 212 critères IA-26, sur pièces et en production."],
  ["Délibération", "Commission de notation collégiale ; l'entité peut répondre aux constats."],
  ["Publication", "Note inscrite au registre public, certificat scellé SHA-256, rapport PDF téléchargeable."],
];

type Pole = "WEB" | "IA";
type OtpState = "idle" | "sent" | "verified";

const isUrl = (v: string) => /^https?:\/\/[^\s]+\.[^\s]{2,}/i.test(v.trim());
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/* ---------------- Petits composants ---------------- */
function Field({
  label, required, error, hint, children,
}: { label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mono-k text-moss flex items-center gap-1.5 mb-1.5" style={{ fontSize: 9.5 }}>
        {label.toUpperCase()}
        {required && <span className="text-clay" aria-hidden>*</span>}
      </span>
      {children}
      {error ? (
        <span className="flex items-center gap-1.5 mt-1.5 text-[11.5px] font-mono text-clay" role="alert">
          <i className="fa-solid fa-circle-exclamation" aria-hidden /> {error}
        </span>
      ) : hint ? (
        <span className="block mt-1.5 text-[11px] text-ink/45">{hint}</span>
      ) : null}
    </label>
  );
}

const inputCls = (err?: boolean) =>
  `w-full bg-paper border px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-pine ${
    err ? "border-clay" : "border-ink/30 hover:border-ink/50"
  }`;

function StepDot({ n, label, state }: { n: number; label: string; state: "done" | "current" | "todo" }) {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <span
        className={`w-8 h-8 shrink-0 grid place-items-center border-2 font-mono text-[12px] font-bold transition-all duration-300 ${
          state === "done"
            ? "bg-pine border-pine text-gold-2"
            : state === "current"
              ? "border-gold text-pine bg-gold/15 scale-105"
              : "border-ink/25 text-ink/40"
        }`}
        aria-hidden
      >
        {state === "done" ? <i className="fa-solid fa-check" /> : n}
      </span>
      <span
        className={`mono-k whitespace-nowrap ${
          state === "current" ? "text-pine" : state === "done" ? "text-moss" : "text-ink/40"
        }`}
        style={{ fontSize: 9.5 }}
      >
        {label}
      </span>
    </div>
  );
}

/* ---------------- Formulaire ---------------- */
function AuditForm() {
  const [step, setStep] = useState(1);
  const [tried, setTried] = useState(false);

  // Étape 1 — entité
  const [legalName, setLegalName] = useState("");
  const [sector, setSector] = useState("");
  const [country, setCountry] = useState("");
  const [website, setWebsite] = useState("");

  // Étape 2 — cible
  const [pole, setPole] = useState<Pole | "">("");
  const [systemKind, setSystemKind] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [hosting, setHosting] = useState("");
  const [modelName, setModelName] = useState("");
  const [aiFamily, setAiFamily] = useState("");

  // Étape 3 — contact + OTP
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [otpState, setOtpState] = useState<OtpState>("idle");
  const [sentCode, setSentCode] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [otpError, setOtpError] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [dossierRef, setDossierRef] = useState("");
  const [done, setDone] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const id = window.setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => window.clearTimeout(id);
  }, [countdown]);

  /* --- validation --- */
  const step1Ok =
    legalName.trim().length >= 3 && sector !== "" && country !== "" && isUrl(website);
  const step2Ok =
    pole === "WEB"
      ? systemKind !== "" && isUrl(baseUrl)
      : pole === "IA"
        ? modelName.trim().length >= 2 && aiFamily !== ""
        : false;
  const step3Ok = contactName.trim().length >= 3 && isEmail(contactEmail);
  const currentOk = step === 1 ? step1Ok : step === 2 ? step2Ok : step3Ok && otpState === "verified";

  const next = () => {
    setTried(true);
    if (!currentOk) return;
    setTried(false);
    setStep((s) => Math.min(3, s + 1));
  };
  const back = () => {
    setTried(false);
    setStep((s) => Math.max(1, s - 1));
  };

  /* --- OTP simulé (Resend) --- */
  const sendCode = () => {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setSentCode(code);
    setOtp(Array(6).fill(""));
    setOtpError(false);
    setOtpState("sent");
    setCountdown(30);
    window.setTimeout(() => otpRefs.current[0]?.focus(), 80);
  };

  const setDigit = (i: number, v: string) => {
    const c = v.replace(/\D/g, "").slice(-1);
    setOtp((prev) => {
      const nextArr = [...prev];
      nextArr[i] = c;
      return nextArr;
    });
    setOtpError(false);
    if (c && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const onOtpKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const onOtpPaste = (e: React.ClipboardEvent) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    if (!digits.length) return;
    e.preventDefault();
    const nextArr = Array(6).fill("");
    digits.forEach((d, i) => (nextArr[i] = d));
    setOtp(nextArr);
    setOtpError(false);
    otpRefs.current[Math.min(digits.length, 5)]?.focus();
  };

  const verifyOtp = () => {
    if (otp.join("") === sentCode) {
      setOtpState("verified");
      setOtpError(false);
    } else {
      setOtpError(true);
    }
  };

  const submit = () => {
    if (!currentOk) return;
    setDossierRef(`DMD-2026-${String(Math.floor(1000 + Math.random() * 9000))}`);
    setDone(true);
  };

  const reset = () => {
    setStep(1); setTried(false); setDone(false);
    setLegalName(""); setSector(""); setCountry(""); setWebsite("");
    setPole(""); setSystemKind(""); setBaseUrl(""); setHosting(""); setModelName(""); setAiFamily("");
    setContactName(""); setContactEmail("");
    setOtpState("idle"); setSentCode(""); setOtp(Array(6).fill("")); setOtpError(false);
    setCountdown(0); setDossierRef("");
  };

  /* --- écran de succès --- */
  if (done) {
    return (
      <div className="border border-ink/25 bg-paper p-6 md:p-10">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-grid place-items-center w-16 h-16 border-2 border-pine text-pine bg-pine/10 mb-6" aria-hidden>
            <i className="fa-solid fa-check text-2xl" />
          </span>
          <p className="mono-k text-moss" style={{ fontSize: 10 }}>Demande enregistrée au greffe</p>
          <h3 className="disp text-2xl md:text-3xl text-ink mt-2">Votre dossier est déposé.</h3>
          <div className="mt-6 inline-flex items-center gap-3 border-2 border-dashed border-gold bg-parch px-5 py-3">
            <span className="font-mono text-lg md:text-xl font-semibold text-pine tracking-wide">{dossierRef}</span>
            <CopyBtn text={dossierRef} dark={false} />
          </div>
          <dl className="mt-8 text-left grid sm:grid-cols-2 gap-x-8 gap-y-4 border-t border-ink/15 pt-6">
            {[
              ["Entité", legalName],
              ["Pôle d'audit", pole === "WEB" ? "Web / Cloud / Banque" : `IA — ${aiFamily}`],
              ["Cible", pole === "WEB" ? `${systemKind} · ${baseUrl}` : modelName],
              ["Contact", `${contactName} · ${contactEmail}`],
              ["Accusé e-mail", `Envoyé via Resend ✓`],
              ["Prochaine étape", "Recevabilité sous 72 h ouvrées"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="mono-k text-moss mb-1" style={{ fontSize: 9 }}>{k.toUpperCase()}</dt>
                <dd className="text-sm text-ink/85 font-mono break-words">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={reset} className="btn-hard disp bg-pine text-paper px-6 py-3 text-sm inline-flex items-center gap-2 cursor-pointer">
              <i className="fa-solid fa-plus" aria-hidden /> Nouvelle demande
            </button>
            <a href="#s4" className="btn-hard disp border border-ink/40 px-6 py-3 text-sm inline-flex items-center gap-2 hover:bg-parch">
              Consulter le registre
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-ink/25 bg-paper shadow-[8px_8px_0_0_rgba(14,59,46,0.10)]">
      {/* Stepper */}
      <div className="px-5 md:px-8 py-5 border-b border-ink/15 bg-parch/60 flex flex-wrap items-center gap-x-8 gap-y-3">
        <StepDot n={1} label="Entité" state={step > 1 ? "done" : step === 1 ? "current" : "todo"} />
        <span className="hidden sm:block h-px w-8 bg-ink/20" aria-hidden />
        <StepDot n={2} label="Cible d'audit" state={step > 2 ? "done" : step === 2 ? "current" : "todo"} />
        <span className="hidden sm:block h-px w-8 bg-ink/20" aria-hidden />
        <StepDot n={3} label="Contact & OTP" state={step === 3 ? "current" : "todo"} />
        <span className="ml-auto font-mono text-[11px] text-ink/45">Étape {step}/3</span>
      </div>

      <div className="p-5 md:p-8">
        {/* ---------- ÉTAPE 1 ---------- */}
        {step === 1 && (
          <div className="grid sm:grid-cols-2 gap-5 animate-fadeup">
            <Field label="Raison sociale" required error={tried && legalName.trim().length < 3 ? "Au moins 3 caractères." : undefined}>
              <input className={inputCls(tried && legalName.trim().length < 3)} value={legalName} onChange={(e) => setLegalName(e.target.value)} placeholder="Ex. Banque Sahélienne de Développement" />
            </Field>
            <Field label="Secteur" required error={tried && !sector ? "Sélectionnez un secteur." : undefined}>
              <select className={inputCls(tried && !sector) + " cursor-pointer"} value={sector} onChange={(e) => setSector(e.target.value)}>
                <option value="">— Choisir —</option>
                {SECTORS.filter((s) => s !== "TOUS").map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Pays du siège" required error={tried && !country ? "Sélectionnez un pays." : undefined}>
              <select className={inputCls(tried && !country) + " cursor-pointer"} value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">— Choisir —</option>
                {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Site / URL principale" required error={tried && !isUrl(website) ? "URL attendue (https://…)." : undefined}>
              <input className={inputCls(tried && !isUrl(website))} value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://exemple.africa" inputMode="url" />
            </Field>
          </div>
        )}

        {/* ---------- ÉTAPE 2 ---------- */}
        {step === 2 && (
          <div className="animate-fadeup">
            <p className="mono-k text-moss mb-3" style={{ fontSize: 9.5 }}>PÔLE D'AUDIT DEMANDÉ <span className="text-clay">*</span></p>
            <div className="grid sm:grid-cols-2 gap-4 mb-7">
              {([
                ["WEB", "fa-solid fa-globe", "Web · Cloud · Banque · E-commerce", "Notation AAA → D · 96 critères · 12 jours ouvrés"],
                ["IA", "fa-solid fa-microchip", "Intelligence Artificielle", "Notation AI-AAA → AI-D · 212 critères · 18 jours ouvrés"],
              ] as const).map(([p, icon, t, sub]) => {
                const on = pole === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPole(p)}
                    aria-pressed={on}
                    className={`text-left p-5 border-2 transition-all duration-200 cursor-pointer ${
                      on
                        ? "border-pine bg-pine text-paper shadow-[6px_6px_0_0_rgba(194,147,44,0.85)] -translate-y-0.5"
                        : "border-ink/25 bg-paper hover:border-pine hover:-translate-y-0.5"
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <i className={`${icon} text-xl ${on ? "text-gold-2" : "text-pine"}`} aria-hidden />
                      <span className={`w-4 h-4 border-2 grid place-items-center ${on ? "border-gold" : "border-ink/30"}`}>
                        {on && <span className="w-2 h-2 bg-gold" aria-hidden />}
                      </span>
                    </span>
                    <span className={`disp block mt-3 ${on ? "text-paper" : "text-ink"}`}>{t}</span>
                    <span className={`block mt-1 font-mono text-[10.5px] ${on ? "text-paper/65" : "text-ink/50"}`}>{sub}</span>
                  </button>
                );
              })}
            </div>

            {pole === "WEB" && (
              <div className="grid sm:grid-cols-2 gap-5 animate-fadeup">
                <Field label="Type de système" required error={tried && !systemKind ? "Sélectionnez un type." : undefined}>
                  <select className={inputCls(tried && !systemKind) + " cursor-pointer"} value={systemKind} onChange={(e) => setSystemKind(e.target.value)}>
                    <option value="">— Choisir —</option>
                    {SYSTEM_KINDS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="URL de base à auditer" required error={tried && !isUrl(baseUrl) ? "URL attendue (https://…)." : undefined}>
                  <input className={inputCls(tried && !isUrl(baseUrl))} value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} placeholder="https://api.exemple.africa" inputMode="url" />
                </Field>
                <Field label="Région d'hébergement" hint="Optionnel — pondère le critère de souveraineté.">
                  <select className={inputCls() + " cursor-pointer"} value={hosting} onChange={(e) => setHosting(e.target.value)}>
                    <option value="">— Choisir —</option>
                    {HOSTING.map((h) => <option key={h}>{h}</option>)}
                  </select>
                </Field>
              </div>
            )}

            {pole === "IA" && (
              <div className="grid sm:grid-cols-2 gap-5 animate-fadeup">
                <Field label="Nom & version du modèle" required error={tried && modelName.trim().length < 2 ? "Nom du modèle requis." : undefined}>
                  <input className={inputCls(tried && modelName.trim().length < 2)} value={modelName} onChange={(e) => setModelName(e.target.value)} placeholder="Ex. Sankofa-7B v1.2" />
                </Field>
                <Field label="Famille" required error={tried && !aiFamily ? "Sélectionnez une famille." : undefined}>
                  <select className={inputCls(tried && !aiFamily) + " cursor-pointer"} value={aiFamily} onChange={(e) => setAiFamily(e.target.value)}>
                    <option value="">— Choisir —</option>
                    {AI_FAMILIES.map((f) => <option key={f}>{f}</option>)}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Corpus d'entraînement" hint="Optionnel — accélère l'évaluation de la gouvernance des données.">
                    <textarea className={inputCls() + " min-h-[84px] resize-y"} placeholder="Origine des données, consentement, langues couvertes…" />
                  </Field>
                </div>
              </div>
            )}

            {tried && pole === "" && (
              <p className="flex items-center gap-2 mt-4 font-mono text-[11.5px] text-clay" role="alert">
                <i className="fa-solid fa-circle-exclamation" aria-hidden /> Choisissez un pôle d'audit pour continuer.
              </p>
            )}
          </div>
        )}

        {/* ---------- ÉTAPE 3 ---------- */}
        {step === 3 && (
          <div className="animate-fadeup">
            {/* Récapitulatif */}
            <div className="border border-ink/20 bg-parch/70 px-4 py-3 mb-6 flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-[11.5px] text-ink/70">
              <span><span className="mono-k text-moss mr-2" style={{ fontSize: 9 }}>ENTITÉ</span>{legalName}</span>
              <span><span className="mono-k text-moss mr-2" style={{ fontSize: 9 }}>PÔLE</span>{pole === "WEB" ? "Web/Cloud" : "IA"}</span>
              <span className="truncate max-w-[220px]"><span className="mono-k text-moss mr-2" style={{ fontSize: 9 }}>CIBLE</span>{pole === "WEB" ? baseUrl : modelName}</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Nom du contact" required error={tried && contactName.trim().length < 3 ? "Nom requis." : undefined}>
                <input className={inputCls(tried && contactName.trim().length < 3)} value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Ex. Aminata Traoré" />
              </Field>
              <Field label="E-mail professionnel" required error={tried && !isEmail(contactEmail) ? "Adresse e-mail invalide." : undefined} hint="Le code OTP et l'accusé de dépôt seront envoyés à cette adresse.">
                <input className={inputCls(tried && !isEmail(contactEmail))} value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="a.traore@exemple.africa" inputMode="email" />
              </Field>
            </div>

            {/* Bloc OTP */}
            <div className={`mt-7 border p-5 transition-colors ${otpError ? "border-clay bg-clay/5" : otpState === "verified" ? "border-pine bg-pine/5" : "border-ink/25"}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="disp text-base text-ink">Vérification du demandeur</p>
                <span className={`mono-k px-2 py-1 border text-[9px] ${otpState === "verified" ? "border-pine text-pine" : otpState === "sent" ? "border-gold text-moss" : "border-ink/30 text-ink/50"}`}>
                  {otpState === "verified" ? "IDENTITÉ VÉRIFIÉE" : otpState === "sent" ? "CODE ENVOYÉ" : "OTP REQUIS"}
                </span>
              </div>

              {otpState === "idle" && (
                <button
                  onClick={sendCode}
                  disabled={!step3Ok}
                  className="btn-hard mt-4 disp inline-flex items-center gap-2.5 bg-pine text-paper px-5 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <i className="fa-solid fa-envelope" aria-hidden /> Recevoir le code à 6 chiffres
                </button>
              )}

              {otpState !== "idle" && (
                <>
                  <div className={`mt-4 border border-dashed px-4 py-3 font-mono text-[12px] ${otpState === "verified" ? "border-pine/60 bg-paper text-pine" : "border-gold/70 bg-parch text-moss"}`}>
                    {otpState === "verified" ? (
                      <><i className="fa-solid fa-circle-check mr-2" aria-hidden />Code validé — l'accusé de dépôt sera signé et envoyé via Resend.</>
                    ) : (
                      <>
                        <i className="fa-solid fa-flask mr-2" aria-hidden />
                        <strong>Mode démonstration</strong> — l'envoi Resend est simulé. Code reçu :{" "}
                        <strong className="tracking-[0.35em] text-pine">{sentCode}</strong>
                      </>
                    )}
                  </div>

                  {otpState === "sent" && (
                    <div className="mt-4">
                      <div
                        className={`flex gap-2 sm:gap-2.5 ${otpError ? "shake" : ""}`}
                        onPaste={onOtpPaste}
                        role="group"
                        aria-label="Code de vérification à 6 chiffres"
                      >
                        {otp.map((d, i) => (
                          <input
                            key={i}
                            ref={(el) => { otpRefs.current[i] = el; }}
                            value={d}
                            onChange={(e) => setDigit(i, e.target.value)}
                            onKeyDown={(e) => onOtpKey(i, e)}
                            inputMode="numeric"
                            maxLength={2}
                            aria-label={`Chiffre ${i + 1}`}
                            className={`w-10 h-13 sm:w-12 sm:h-14 text-center font-mono text-xl font-bold bg-paper border-2 outline-none transition-colors ${
                              otpError ? "border-clay text-clay" : d ? "border-pine text-pine" : "border-ink/30 focus:border-gold"
                            }`}
                            style={{ height: "3.25rem" }}
                          />
                        ))}
                      </div>
                      {otpError && (
                        <p className="mt-2.5 font-mono text-[11.5px] text-clay" role="alert">
                          <i className="fa-solid fa-circle-exclamation mr-1.5" aria-hidden />
                          Code incorrect — vérifiez le message reçu (3 tentatives avant renvoi).
                        </p>
                      )}
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <button
                          onClick={verifyOtp}
                          disabled={otp.join("").length < 6}
                          className="btn-hard disp inline-flex items-center gap-2 bg-gold text-pine-3 px-5 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <i className="fa-solid fa-shield-halved" aria-hidden /> Vérifier le code
                        </button>
                        <button
                          onClick={sendCode}
                          disabled={countdown > 0}
                          className="mono-k border border-ink/30 px-3.5 py-2.5 text-ink/60 hover:border-pine hover:text-pine transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          style={{ fontSize: 9.5 }}
                        >
                          <i className="fa-solid fa-rotate-right mr-1.5" aria-hidden />
                          {countdown > 0 ? `RENVOYER (${countdown} s)` : "RENVOYER UN CODE"}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Pied de formulaire */}
      <div className="px-5 md:px-8 py-4 border-t border-ink/15 bg-parch/60 flex items-center justify-between gap-4">
        <button
          onClick={back}
          disabled={step === 1}
          className="mono-k text-ink/55 hover:text-pine transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          style={{ fontSize: 9.5 }}
        >
          <i className="fa-solid fa-arrow-left mr-2" aria-hidden />PRÉCÉDENT
        </button>
        {step < 3 ? (
          <button onClick={next} className="btn-hard disp inline-flex items-center gap-2.5 bg-pine text-paper px-6 py-2.5 text-sm cursor-pointer">
            CONTINUER <i className="fa-solid fa-arrow-right" aria-hidden />
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={!currentOk}
            className="btn-hard disp inline-flex items-center gap-2.5 bg-gold text-pine-3 px-6 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <i className="fa-solid fa-stamp" aria-hidden /> DÉPOSER LA DEMANDE
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------- Section ---------------- */
export default function Application() {
  return (
    <section id="s6" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHead
          num="06"
          kicker="Annexe opérationnelle — Application fonctionnelle"
          title="Guichet unique de demande d'audit."
          intro="Instance vivante du formulaire officiel : dépôt d'une demande de notation Web/Cloud ou IA, avec validation en ligne, vérification d'identité par code OTP (flux Resend) et accusé de dépôt horodaté. Interface conçue mobile-first."
        />

        <div className="grid lg:grid-cols-[320px_1fr] gap-8 items-start">
          {/* Rail gauche : procédure */}
          <div className="space-y-6 lg:sticky lg:top-6">
            <Reveal>
              <div className="border border-ink/25 bg-pine text-paper p-6">
                <p className="mono-k text-gold-2 mb-4" style={{ fontSize: 9.5 }}>STATUT DU GUICHET</p>
                <p className="flex items-center gap-2.5 text-sm">
                  <span className="relative flex w-2.5 h-2.5">
                    <span className="ping-dot absolute inline-flex h-full w-full bg-gold-2 opacity-75" />
                    <span className="relative inline-flex w-2.5 h-2.5 bg-gold-2" />
                  </span>
                  Guichet ouvert — délai moyen : <strong className="font-mono text-gold-2">12 j ouvrés</strong>
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="border border-ink/25 bg-paper p-6">
                <p className="mono-k text-moss mb-5" style={{ fontSize: 9.5 }}>CIRCUIT OFFICIEL D'UNE DEMANDE</p>
                <ol className="relative">
                  {PROCESS.map(([t, d], i) => (
                    <li key={t} className="relative pl-7 pb-6 last:pb-0 group">
                      {i < PROCESS.length - 1 && <span className="absolute left-[9px] top-6 bottom-0 w-px bg-ink/20" aria-hidden />}
                      <span className="absolute left-0 top-0.5 w-[19px] h-[19px] grid place-items-center border border-gold bg-parch font-mono text-[9.5px] font-bold text-pine group-hover:bg-gold group-hover:text-pine-3 transition-colors">
                        {i + 1}
                      </span>
                      <p className="text-sm font-semibold text-ink leading-tight">{t}</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-ink/60">{d}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="border border-dashed border-ink/35 p-5 text-[12.5px] leading-relaxed text-ink/65">
                <p className="mono-k text-moss mb-2" style={{ fontSize: 9 }}>ASSISTANCE</p>
                <p><i className="fa-solid fa-envelope mr-2 text-pine" aria-hidden />guichet@fullafri.africa</p>
                <p className="mt-1"><i className="fa-solid fa-phone mr-2 text-pine" aria-hidden />+233 30 274 00 02</p>
                <p className="mt-1"><i className="fa-regular fa-clock mr-2 text-pine" aria-hidden />Lun–Ven · 08 h – 17 h GMT</p>
              </div>
            </Reveal>
          </div>

          {/* Formulaire */}
          <Reveal delay={60}>
            <AuditForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
