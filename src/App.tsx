import { NAV } from "./data";
import { Seal, useProgress, useScrollSpy } from "./lib";
import Cover from "./sections/Cover";
import Executive from "./sections/Executive";
import Architecture from "./sections/Architecture";
import Database from "./sections/Database";
import Registry from "./sections/Registry";
import Deployment from "./sections/Deployment";
import Application from "./sections/Application";

const IDS = NAV.map((n) => n.id);

function Sidebar({ active, progress }: { active: string; progress: number }) {
  return (
    <aside className="hidden xl:flex fixed inset-y-0 left-0 w-[236px] z-50 flex-col border-r border-ink/20 bg-paper">
      <a href="#top" className="flex items-center gap-3 px-5 py-5 border-b border-ink/15 group">
        <Seal size={40} />
        <span className="leading-tight">
          <span className="disp block text-pine text-lg group-hover:text-moss transition-colors">FULLAFRI</span>
          <span className="mono-k block text-ink/45" style={{ fontSize: 8 }}>FA/DT-2026-001 · v2.1</span>
        </span>
      </a>
      <nav className="flex-1 overflow-y-auto py-5" aria-label="Sommaire du dossier">
        <p className="mono-k text-ink/40 px-5 mb-3" style={{ fontSize: 9 }}>Sommaire</p>
        <ul>
          {NAV.map((n) => {
            const on = active === n.id;
            return (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className={`group flex items-baseline gap-3 px-5 py-3 border-l-[3px] transition-all duration-200 ${
                    on
                      ? "border-gold bg-parch"
                      : "border-transparent hover:border-gold/50 hover:bg-parch/60"
                  }`}
                  aria-current={on ? "true" : undefined}
                >
                  <span className={`disp-x text-base transition-colors ${on ? "text-gold" : "text-ink/35 group-hover:text-gold"}`}>
                    {n.num}
                  </span>
                  <span className={`text-[12.5px] leading-snug transition-colors ${on ? "text-ink font-semibold" : "text-ink/65 group-hover:text-ink"}`}>
                    {n.title}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 px-5">
          <div className="border border-ink/20 p-3.5 bg-parch/70">
            <p className="mono-k text-moss mb-2" style={{ fontSize: 8.5 }}>Lecture du dossier</p>
            <div className="h-1.5 bg-ink/10 overflow-hidden">
              <div className="h-full bg-gold transition-[width] duration-200" style={{ width: `${progress}%` }} />
            </div>
            <p className="font-mono text-[10.5px] text-ink/55 mt-2">{Math.round(progress)} % parcourus</p>
          </div>
        </div>
      </nav>
      <div className="border-t border-ink/15 px-5 py-4">
        <p className="font-mono text-[10px] text-ink/45 leading-relaxed">
          © 2026 FullAfri<br />Accra · Dakar · Nairobi
        </p>
      </div>
    </aside>
  );
}

function MobileBar({ active, progress }: { active: string; progress: number }) {
  return (
    <div className="xl:hidden fixed top-0 inset-x-0 z-50 bg-paper/95 backdrop-blur border-b border-ink/20">
      <div className="flex items-center gap-3 px-4 py-2.5">
        <Seal size={30} />
        <span className="disp text-pine text-sm">FULLAFRI</span>
        <span className="mono-k text-ink/40 ml-auto" style={{ fontSize: 8 }}>FA/DT-2026-001</span>
      </div>
      <nav className="flex gap-1 px-3 pb-2 overflow-x-auto" aria-label="Sommaire">
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={`mono-k whitespace-nowrap px-2.5 py-1.5 border transition-colors ${
              active === n.id
                ? "bg-pine text-gold-2 border-pine"
                : "border-ink/25 text-ink/60 hover:border-pine"
            }`}
            style={{ fontSize: 9 }}
          >
            {n.num} · {n.short}
          </a>
        ))}
      </nav>
      <div className="h-[3px] bg-ink/10">
        <div className="h-full bg-gold" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative bg-pine-3 text-paper border-t-4 border-gold overflow-hidden">
      <div className="paper-lines absolute inset-0 opacity-30" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-14 pb-8">
        <div className="flex flex-col md:flex-row md:items-start gap-10">
          <div className="flex items-center gap-4">
            <Seal size={64} light />
            <div>
              <p className="disp text-2xl text-paper">FULLAFRI</p>
              <p className="mono-k text-gold-2/85 mt-1" style={{ fontSize: 9 }}>
                Notation · Audit · Régulation Numérique & IA
              </p>
              <p className="font-mono text-[11px] text-paper/55 mt-3 leading-relaxed">
                registre@fullafri.africa<br />
                +233 30 274 00 01 · Airport City, Accra
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 flex-1 md:pt-2">
            {[
              ["Dr A. Ouédraogo", "Directrice Générale"],
              ["Me N. Diallo", "Commissaire à l'Éthique IA"],
              ["Ing. S. Kariuki", "Chef de l'Infrastructure"],
            ].map(([name, role]) => (
              <div key={name}>
                <p className="font-mono text-[12px] text-paper/85 italic" style={{ fontFamily: "Archivo, serif" }}>
                  <span className="disp text-lg text-gold-2 not-italic">{name}</span>
                </p>
                <p className="mono-k text-paper/50 mt-1" style={{ fontSize: 8.5 }}>{role}</p>
                <div className="mt-6 border-b border-dashed border-paper/30 w-44" />
                <p className="mono-k text-paper/35 mt-1.5" style={{ fontSize: 8 }}>Signature & cachet</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-paper/15 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="font-mono text-[11px] text-paper/55 leading-relaxed">
            © 2026 Agence FullAfri — Document FA/DT-2026-001 v2.1 · Diffusion publique ·
            Reproduction autorisée avec mention de la source.
          </p>
          <a
            href="#top"
            className="btn-hard mono-k ml-auto border border-gold/60 text-gold-2 px-4 py-2 hover:bg-gold hover:text-pine-3 transition-colors cursor-pointer"
            style={{ fontSize: 9.5 }}
          >
            <i className="fa-solid fa-arrow-up mr-2" aria-hidden />
            Haut du dossier
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const active = useScrollSpy(IDS);
  const progress = useProgress();

  return (
    <div id="top" className="noise min-h-screen bg-paper text-ink">
      <Sidebar active={active} progress={progress} />
      <MobileBar active={active} progress={progress} />

      <div className="xl:pl-[236px] pt-[94px] xl:pt-0">
        <Cover />
        <main>
          <Executive />
          <Architecture />
          <Database />
          <Registry />
          <Deployment />
          <Application />
        </main>
        <Footer />
      </div>
    </div>
  );
}
