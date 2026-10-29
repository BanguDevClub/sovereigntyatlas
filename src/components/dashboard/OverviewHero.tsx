import React, { useState } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Cpu,
  Wheat,
  Briefcase,
  FlaskConical,
  Shield,
  ArrowRight,
  ExternalLink,
  Info
} from 'lucide-react';
import { SovereigntyRadar } from '../charts/SovereigntyRadar';
import { SovereigntyBadge } from '../ui/SovereigntyBadge';
import { KaTeXMath } from '../ui/KaTeXMath';
import type { Country } from '../../lib/types';

interface OverviewHeroProps {
  topCountries: Country[];
  champions: {
    consumption: Country;
    employment: Country;
    technological: Country;
    scientific: Country;
    military: Country;
  };
  base?: string;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({
  topCountries,
  champions,
  base = '/sovereigntyatlas'
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['USA', 'CHN', 'BRA']);

  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;

  const toggleCountry = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const selectedCountries = topCountries.filter((c) => selectedIds.includes(c.id));

  return (
    <div className="space-y-16">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-card via-card/70 to-card/30 p-8 sm:p-12 lg:p-16 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <ShieldCheck className="size-4" />
            <span>Open Source Geopolitical Independence Metric &bull; 2025 Edition</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
            How Independent is <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-sky-400 to-indigo-400">
              Your Country?
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            <strong>Sovereignty Atlas</strong> measures the national resilience, industrial autonomy, and self-defense capacity of all 195 universally recognized nations across five prioritized pillars: Consumption, Employment, Technology, Science, and Defense.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={`${cleanBase}/ranking`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md shadow-primary/20 active:scale-95"
            >
              Explore 195 Rankings
              <ArrowRight className="size-4" />
            </a>
            <a
              href={`${cleanBase}/dashboard`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border border-border bg-card hover:bg-muted text-foreground transition-all shadow-xs active:scale-95"
            >
              Country Dashboard
            </a>
            <a
              href={`${cleanBase}/sandbox`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border border-border bg-card hover:bg-muted text-foreground transition-all shadow-xs active:scale-95"
            >
              Weights Sandbox
            </a>
            <a
              href={`${cleanBase}/methodology`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border border-transparent text-muted-foreground hover:text-foreground transition-all active:scale-95"
            >
              Read Methodology
            </a>
          </div>
        </div>

        {/* Decorative corner visual */}
        <div className="absolute right-0 top-0 -mr-20 -mt-20 size-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      </section>

      {/* 4 KPI Summary Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Global Coverage</span>
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="size-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-foreground">195 / 195</div>
          <p className="text-xs text-muted-foreground">193 UN members + 2 UN observers</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">#1 Weighted Pillar</span>
            <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
              <Wheat className="size-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-foreground">Consumption</div>
          <p className="text-xs text-muted-foreground">28% weight (food, fuel, power, water)</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Leader Score</span>
            <span className="flex size-7 items-center justify-center rounded-lg bg-sky-500/10 text-sky-500">
              <TrendingUp className="size-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-foreground">
            {topCountries[0]?.overallScore.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">/ 100</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {topCountries[0]?.flag} {topCountries[0]?.name} (Rank #1)
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Appearance</span>
            <span className="flex size-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
              <Info className="size-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-foreground">6 Themes</div>
          <p className="text-xs text-muted-foreground">Dark, Light &amp; 4 Catppuccin variants</p>
        </div>
      </section>

      {/* Interactive Radar Comparison Teaser */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Multi-Pillar Sovereignty Radar
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Compare geopolitical superpowers across the 5 methodology dimensions. Click a pill to toggle.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {['USA', 'CHN', 'RUS', 'BRA', 'IND', 'FRA', 'DEU', 'JPN'].map((code) => {
              const active = selectedIds.includes(code);
              const country = topCountries.find((c) => c.id === code);
              if (!country) return null;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => toggleCountry(code)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-6">
          <SovereigntyRadar countries={selectedCountries} height={380} />
        </div>
      </section>

      {/* 5 Pillar Champions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Pillar Champions (2025)
            </h2>
            <p className="text-xs text-muted-foreground">
              Highest scoring nation in each of the 5 weighted dimensions
            </p>
          </div>
          <a
            href={`${cleanBase}/ranking`}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            Full Leaderboard <ArrowRight className="size-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Consumption */}
          <a
            href={`${cleanBase}/dashboard?country=${champions.consumption?.id}`}
            className="group block rounded-2xl border border-border bg-card p-4 hover:border-primary/50 transition-all shadow-xs"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                <Wheat className="size-4" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Rank #1 &bull; 28%
              </span>
            </div>
            <div className="text-xs font-medium text-muted-foreground">Consumption Champion</div>
            <div className="text-base font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5 mt-0.5">
              <span>{champions.consumption?.flag}</span>
              <span>{champions.consumption?.name}</span>
            </div>
            <div className="mt-2 text-xs font-semibold text-emerald-500">
              {champions.consumption?.pillars.consumption.score.toFixed(1)} / 100
            </div>
          </a>

          {/* Employment */}
          <a
            href={`${cleanBase}/dashboard?country=${champions.employment?.id}`}
            className="group block rounded-2xl border border-border bg-card p-4 hover:border-primary/50 transition-all shadow-xs"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-sky-500/10 text-sky-500">
                <Briefcase className="size-4" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Rank #2 &bull; 25%
              </span>
            </div>
            <div className="text-xs font-medium text-muted-foreground">Employment Champion</div>
            <div className="text-base font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5 mt-0.5">
              <span>{champions.employment?.flag}</span>
              <span>{champions.employment?.name}</span>
            </div>
            <div className="mt-2 text-xs font-semibold text-sky-500">
              {champions.employment?.pillars.employment.score.toFixed(1)} / 100
            </div>
          </a>

          {/* Technological */}
          <a
            href={`${cleanBase}/dashboard?country=${champions.technological?.id}`}
            className="group block rounded-2xl border border-border bg-card p-4 hover:border-primary/50 transition-all shadow-xs"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                <Cpu className="size-4" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Rank #3 &bull; 20%
              </span>
            </div>
            <div className="text-xs font-medium text-muted-foreground">Tech Champion</div>
            <div className="text-base font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5 mt-0.5">
              <span>{champions.technological?.flag}</span>
              <span>{champions.technological?.name}</span>
            </div>
            <div className="mt-2 text-xs font-semibold text-indigo-500">
              {champions.technological?.pillars.technological.score.toFixed(1)} / 100
            </div>
          </a>

          {/* Scientific */}
          <a
            href={`${cleanBase}/dashboard?country=${champions.scientific?.id}`}
            className="group block rounded-2xl border border-border bg-card p-4 hover:border-primary/50 transition-all shadow-xs"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                <FlaskConical className="size-4" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Rank #4 &bull; 15%
              </span>
            </div>
            <div className="text-xs font-medium text-muted-foreground">Scientific Champion</div>
            <div className="text-base font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5 mt-0.5">
              <span>{champions.scientific?.flag}</span>
              <span>{champions.scientific?.name}</span>
            </div>
            <div className="mt-2 text-xs font-semibold text-purple-500">
              {champions.scientific?.pillars.scientific.score.toFixed(1)} / 100
            </div>
          </a>

          {/* Military */}
          <a
            href={`${cleanBase}/dashboard?country=${champions.military?.id}`}
            className="group block rounded-2xl border border-border bg-card p-4 hover:border-primary/50 transition-all shadow-xs"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
                <Shield className="size-4" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Rank #5 &bull; 12%
              </span>
            </div>
            <div className="text-xs font-medium text-muted-foreground">Military Champion</div>
            <div className="text-base font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5 mt-0.5">
              <span>{champions.military?.flag}</span>
              <span>{champions.military?.name}</span>
            </div>
            <div className="mt-2 text-xs font-semibold text-rose-500">
              {champions.military?.pillars.military.score.toFixed(1)} / 100
            </div>
          </a>
        </div>
      </section>

      {/* Transparent Methodology Equation Card */}
      <section className="rounded-3xl border border-border bg-gradient-to-r from-card via-card to-primary/5 p-8 shadow-md">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Core Mathematical Formulation
            </span>
            <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
              KaTeX Verified
            </span>
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            The Sovereignty Objective Function
          </h3>

          <div className="p-4 rounded-2xl border border-border bg-background/80 overflow-x-auto text-center">
            <KaTeXMath
              math={`\\mathcal{S}_i = 0.28 \\, S_{\\text{consumption}} + 0.25 \\, S_{\\text{employment}} + 0.20 \\, S_{\\text{technology}} + 0.15 \\, S_{\\text{science}} + 0.12 \\, S_{\\text{military}}`}
              block={true}
              className="text-sm sm:text-base text-foreground font-semibold"
            />
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            The methodology explicitly establishes a hierarchical priority: basic survival and sustenance (Consumption at 28%) and internal wealth retention (Employment at 25%) precede technological scale (20%), frontier basic science (15%), and sovereign armed defense (12%).
          </p>

          <div>
            <a
              href={`${cleanBase}/methodology`}
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
            >
              Explore Full Equations &amp; Data Sources <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewHero;
