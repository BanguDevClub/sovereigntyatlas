import React from 'react';
import {
  BookOpen,
  Wheat,
  Briefcase,
  Cpu,
  FlaskConical,
  Shield,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Code2
} from 'lucide-react';
import { KaTeXMath } from '../ui/KaTeXMath';

interface MethodologyViewProps {
  base?: string;
}

export const MethodologyView: React.FC<MethodologyViewProps> = () => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
          <BookOpen className="size-4" />
          <span>Scientific Specification &bull; 2025 Edition</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          Sovereignty Atlas Methodology
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Mathematical formulation, indicator weighting rationale, data normalization protocols, and
          proxy estimation framework evaluating the national independence of all 195 sovereign
          states.
        </p>
      </div>

      {/* Core Equation Box */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">
            1. The Sovereignty Objective Function
          </h2>
          <span className="text-xs font-mono font-bold text-primary">KaTeX Formula</span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          The national sovereignty index <KaTeXMath math="\mathcal{S}_i \in [0, 100]" /> for country{' '}
          <KaTeXMath math="i" /> is modeled as a normalized multi-criteria objective function across
          the five strategic independence pillars:
        </p>

        <div className="rounded-2xl border border-border bg-muted/40 p-5 overflow-x-auto text-center space-y-3">
          <KaTeXMath
            math={`\\mathcal{S}_i = \\sum_{p \\in \\mathcal{P}} w_p \\cdot S_{i,p}`}
            block={true}
            className="text-base font-bold text-foreground"
          />
          <div className="pt-2 border-t border-border/80">
            <KaTeXMath
              math={`\\mathcal{S}_i = 0.28 \\, S_{\\text{consumption}} + 0.25 \\, S_{\\text{employment}} + 0.20 \\, S_{\\text{technology}} + 0.15 \\, S_{\\text{science}} + 0.12 \\, S_{\\text{military}}`}
              block={true}
              className="text-sm sm:text-base font-extrabold text-primary"
            />
          </div>
          <div className="text-[11px] text-muted-foreground">
            Subject to the unity constraint:{' '}
            <KaTeXMath
              math={`\\sum_{p \\in \\mathcal{P}} w_p = 0.28 + 0.25 + 0.20 + 0.15 + 0.12 = 1.00`}
            />
          </div>
        </div>

        <div className="text-xs text-muted-foreground space-y-2">
          <p>
            Where each pillar score <KaTeXMath math="S_{i,p} \in [0, 100]" /> is calculated as the
            arithmetic mean of its five calibrated sub-indicators <KaTeXMath math="k \in K_p" />:
          </p>
          <div className="p-3 rounded-xl bg-muted/30 text-center font-mono">
            <KaTeXMath math={`S_{i,p} = \\frac{1}{|K_p|} \\sum_{k \\in K_p} \\phi_k(x_{i,k})`} />
          </div>
          <p>
            and <KaTeXMath math="\phi_k(x)" /> is the min-max standardizer mapped to{' '}
            <KaTeXMath math="[0, 100]" />:
          </p>
          <div className="p-3 rounded-xl bg-muted/30 text-center font-mono">
            <KaTeXMath
              math={`\\phi_k(x) = \\min\\left(100, \\max\\left(0, \\frac{x - x_{\\min, k}}{x_{\\max, k} - x_{\\min, k}} \\times 100\\right)\\right)`}
            />
          </div>
        </div>
      </section>

      {/* Pillar Hierarchy & Weights Rationale */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            2. Pillar Ranking &amp; Weighting Rationale
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Why the methodology prioritizes physical survival and labor before technology and armed
            defense.
          </p>
        </div>

        <div className="space-y-4">
          {/* Pillar 1: Consumption */}
          <div className="rounded-2xl border border-emerald-500/30 bg-card p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Wheat className="size-4" />
                </span>
                <h3 className="font-bold text-foreground text-base">
                  Rank #1 &bull; Consumption Sovereignty
                </h3>
              </div>
              <span className="rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 px-3 py-1 text-xs font-bold font-mono">
                Weight: 28% (w₁ = 0.28)
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Rationale:</strong> The biological and thermal survival of a population
              precedes all economic and geopolitical activity. A nation that cannot produce staple
              food, refine vehicle fuels, generate electricity, produce basic building materials, or
              secure potable water can be brought to capitulation within days of a naval quarantine
              or trade embargo without a single shot fired.
            </p>
            <div className="pt-2 text-xs">
              <span className="font-semibold text-foreground">Five Sub-Indicators:</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5 text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-emerald-500" /> Food Self-Sufficiency (%
                  caloric staples)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-emerald-500" /> Primary Electrical Energy
                  Independence
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-emerald-500" /> Domestic Petroleum &amp;
                  Biofuel Refining
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-emerald-500" /> Basic Construction
                  Materials (Cement, Steel)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-emerald-500" /> Freshwater Security &amp;
                  Aquifer Autonomy
                </li>
              </ul>
            </div>
          </div>

          {/* Pillar 2: Employment */}
          <div className="rounded-2xl border border-sky-500/30 bg-card p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-500">
                  <Briefcase className="size-4" />
                </span>
                <h3 className="font-bold text-foreground text-base">
                  Rank #2 &bull; Employment Sovereignty
                </h3>
              </div>
              <span className="rounded-full bg-sky-500/10 text-sky-500 border border-sky-500/30 px-3 py-1 text-xs font-bold font-mono">
                Weight: 25% (w₂ = 0.25)
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Rationale:</strong> Economic independence requires that a country's citizens
              work inside formalized domestic enterprises where labor laws, social safety nets, and
              capital reinvestment remain within national borders. If the workforce is dominated by
              informality or serves as precarious remote digital contractors for foreign
              conglomerates, national surplus is drained and domestic stability is held hostage.
            </p>
            <div className="pt-2 text-xs">
              <span className="font-semibold text-foreground">Five Sub-Indicators:</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5 text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-sky-500" /> Formal Protected Employment
                  Rate
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-sky-500" /> Domestic Enterprise Value
                  Retention
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-sky-500" /> Brain Drain Retention Index
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-sky-500" /> Labor Law Sovereignty &amp;
                  Protection
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-sky-500" /> Trade Shock Employment
                  Resilience
                </li>
              </ul>
            </div>
          </div>

          {/* Pillar 3: Technology */}
          <div className="rounded-2xl border border-indigo-500/30 bg-card p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                  <Cpu className="size-4" />
                </span>
                <h3 className="font-bold text-foreground text-base">
                  Rank #3 &bull; Technological Sovereignty
                </h3>
              </div>
              <span className="rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/30 px-3 py-1 text-xs font-bold font-mono">
                Weight: 20% (w₃ = 0.20)
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Rationale:</strong> In the 21st century, silicon, artificial intelligence,
              telecommunications, and industrial automation determine industrial capability. A
              nation lacking domestic compute infrastructure or relying entirely on foreign chip
              foundries can be remotely partitioned from digital infrastructure during geopolitical
              conflicts.
            </p>
            <div className="pt-2 text-xs">
              <span className="font-semibold text-foreground">Five Sub-Indicators:</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5 text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-indigo-500" /> Semiconductor Wafer
                  Fabrication
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-indigo-500" /> Sovereign AI Foundation
                  Compute
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-indigo-500" /> Triadic High-Value Patent
                  Generation
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-indigo-500" /> Telecom 5G/6G &amp; Undersea
                  Cables
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-indigo-500" /> Industrial Robotics Density
                </li>
              </ul>
            </div>
          </div>

          {/* Pillar 4: Scientific */}
          <div className="rounded-2xl border border-purple-500/30 bg-card p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                  <FlaskConical className="size-4" />
                </span>
                <h3 className="font-bold text-foreground text-base">
                  Rank #4 &bull; Scientific Sovereignty
                </h3>
              </div>
              <span className="rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/30 px-3 py-1 text-xs font-bold font-mono">
                Weight: 15% (w₄ = 0.15)
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Rationale:</strong> Technological patents are downstream from fundamental
              science. A sovereign society must be able to train PhDs, physicists, biochemists, and
              engineers domestically without relying on foreign visas or foreign academic
              institutions to acquire frontier scientific breakthroughs.
            </p>
            <div className="pt-2 text-xs">
              <span className="font-semibold text-foreground">Five Sub-Indicators:</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5 text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-purple-500" /> Frontier Journal Citations
                  (Nature Index)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-purple-500" /> Domestic University PhD
                  Depth
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-purple-500" /> R&amp;D Expenditure as % of
                  GDP
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-purple-500" /> Mega-Science Lab
                  Infrastructure
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-purple-500" /> STEM Graduate Annual
                  Pipeline
                </li>
              </ul>
            </div>
          </div>

          {/* Pillar 5: Military */}
          <div className="rounded-2xl border border-rose-500/30 bg-card p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
                  <Shield className="size-4" />
                </span>
                <h3 className="font-bold text-foreground text-base">
                  Rank #5 &bull; Military Sovereignty
                </h3>
              </div>
              <span className="rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/30 px-3 py-1 text-xs font-bold font-mono">
                Weight: 12% (w₅ = 0.12)
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Rationale:</strong> Sovereign borders and exclusive economic zones must be
              defendable by indigenous armed forces and domestic weapons industries. While military
              capability is vital for survival, it ranks fifth because a military cannot operate or
              sustain readiness without food, fuel, domestic labor, and technology.
            </p>
            <div className="pt-2 text-xs">
              <span className="font-semibold text-foreground">Five Sub-Indicators:</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5 text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-rose-500" /> Active Troops &amp;
                  Territorial Reserves
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-rose-500" /> Indigenous Defense
                  Manufacturing
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-rose-500" /> Air &amp; Ballistic Missile
                  Defense
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-rose-500" /> Strategic Deterrence (Nuclear
                  / Triad)
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-rose-500" /> Logistical Wartime Ammunition
                  Sustainment
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Estimation & Data Quality Disclosure */}
      <section className="rounded-3xl border border-amber-500/30 bg-card p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex items-center gap-2 text-amber-500">
          <AlertTriangle className="size-5" />
          <h2 className="text-lg font-bold text-foreground">
            3. Transparency &amp; Third-Party Proxy Estimatives
          </h2>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          For jurisdictions with restricted primary statistical reporting, wartime censorship, or
          microstate data gaps (e.g. North Korea, Syria, Somalia, Yemen, South Sudan, Cuba, Vatican
          City), Sovereignty Atlas executes a calibrated proxy econometric model:
        </p>

        <ul className="space-y-2 text-xs text-foreground/80 list-disc list-inside">
          <li>
            <strong>Mirror Trade Statistics:</strong> Import/export quantities cross-verified via
            primary partner customs declarations (UN Comtrade, IMF Direction of Trade).
          </li>
          <li>
            <strong>Satellite &amp; Remote Sensing:</strong> Nighttime luminosity tracking, crop
            vegetation indices (NDVI), and marine automatic identification system (AIS) oil tanker
            tracking.
          </li>
          <li>
            <strong>Multilateral Defense Baselines:</strong> SIPRI Military Expenditure Database and
            IISS The Military Balance.
          </li>
          <li>
            <strong>Mandatory Banner Notice:</strong> Any nation evaluated via secondary proxy
            models displays the explicit &ldquo;Statistical Estimative Notice&rdquo; banner
            throughout its dashboard.
          </li>
        </ul>
      </section>

      {/* Open Source Notice */}
      <section className="rounded-3xl border border-border bg-gradient-to-r from-card via-card to-primary/10 p-6 sm:p-8 shadow-md space-y-3">
        <div className="flex items-center gap-2 text-primary font-bold text-sm">
          <Code2 className="size-4" />
          <span>BanguDevClub Open Source Commitment</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Sovereignty Atlas is released under the permissive MIT License. All data, scoring scripts,
          and components are fully public and reproducible on GitHub.
        </p>
        <div className="pt-2">
          <a
            href="https://github.com/BanguDevClub/sovereigntyatlas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-all shadow-xs"
          >
            Inspect Source Code on GitHub <ExternalLink className="size-3 text-muted-foreground" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default MethodologyView;
