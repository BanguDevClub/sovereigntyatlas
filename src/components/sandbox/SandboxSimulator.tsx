import React, { useState, useMemo } from 'react';
import {
  Sliders,
  RotateCcw,
  Zap,
  TrendingUp,
  TrendingDown,
  Wheat,
  Briefcase,
  Cpu,
  FlaskConical,
  Shield,
  ArrowRight,
  Info
} from 'lucide-react';
import { KaTeXMath } from '../ui/KaTeXMath';
import { SovereigntyBadge } from '../ui/SovereigntyBadge';
import type { Country } from '../../lib/types';

interface SandboxSimulatorProps {
  initialCountries: Country[];
  base?: string;
}

interface Scenario {
  name: string;
  tagline: string;
  weights: {
    consumption: number;
    employment: number;
    technological: number;
    scientific: number;
    military: number;
  };
}

const DEFAULT_WEIGHTS = {
  consumption: 28,
  employment: 25,
  technological: 20,
  scientific: 15,
  military: 12
};

const SCENARIOS: Scenario[] = [
  {
    name: 'Official Methodology',
    tagline: 'Standard 2025 weights prioritized by Consumption & Employment',
    weights: DEFAULT_WEIGHTS
  },
  {
    name: 'Global Energy & Food Shock',
    tagline: 'Primary physical calories and fuel refining dominate survival',
    weights: { consumption: 50, employment: 15, technological: 15, scientific: 10, military: 10 }
  },
  {
    name: 'Silicon & AI Compute Embargo',
    tagline: 'Sub-3nm microchips and sovereign AI infrastructure become paramount',
    weights: { consumption: 20, employment: 15, technological: 45, scientific: 15, military: 5 }
  },
  {
    name: 'Global Kinetic War',
    tagline: 'Naval strike readiness, missile defense umbrellas, and domestic ordnance take priority',
    weights: { consumption: 30, employment: 10, technological: 15, scientific: 5, military: 40 }
  },
  {
    name: 'Digital Remote Labor Flight',
    tagline: 'Domestic formal employer ownership and talent retention are tested',
    weights: { consumption: 25, employment: 40, technological: 15, scientific: 10, military: 10 }
  }
];

export const SandboxSimulator: React.FC<SandboxSimulatorProps> = ({
  initialCountries,
  base = '/sovereigntyatlas'
}) => {
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  const [activeScenario, setActiveScenario] = useState('Official Methodology');

  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;

  // Handle individual weight slider change
  const handleSliderChange = (pillar: keyof typeof DEFAULT_WEIGHTS, val: number) => {
    setActiveScenario('Custom User Simulation');
    setWeights((prev) => ({
      ...prev,
      [pillar]: val
    }));
  };

  const totalRawWeight =
    weights.consumption +
    weights.employment +
    weights.technological +
    weights.scientific +
    weights.military;

  // Recalculate scores and ranks for all 195 nations
  const recalculatedList = useMemo(() => {
    const factor = totalRawWeight > 0 ? 1 / totalRawWeight : 1;
    const wC = (weights.consumption * factor);
    const wE = (weights.employment * factor);
    const wT = (weights.technological * factor);
    const wS = (weights.scientific * factor);
    const wM = (weights.military * factor);

    const scored = initialCountries.map((c) => {
      const newScore = Number(
        (
          c.pillars.consumption.score * wC +
          c.pillars.employment.score * wE +
          c.pillars.technological.score * wT +
          c.pillars.scientific.score * wS +
          c.pillars.military.score * wM
        ).toFixed(1)
      );

      return {
        ...c,
        simScore: newScore,
        originalRank: c.rank
      };
    });

    scored.sort((a, b) => b.simScore - a.simScore);

    return scored.map((c, idx) => ({
      ...c,
      simRank: idx + 1,
      rankDelta: c.originalRank - (idx + 1) // positive means climbed, negative means dropped
    }));
  }, [initialCountries, weights, totalRawWeight]);

  const topClimbers = useMemo(() => {
    return [...recalculatedList]
      .filter((c) => c.rankDelta > 0)
      .sort((a, b) => b.rankDelta - a.rankDelta)
      .slice(0, 5);
  }, [recalculatedList]);

  const topDecliners = useMemo(() => {
    return [...recalculatedList]
      .filter((c) => c.rankDelta < 0)
      .sort((a, b) => a.rankDelta - b.rankDelta)
      .slice(0, 5);
  }, [recalculatedList]);

  const resetToDefault = () => {
    setWeights(DEFAULT_WEIGHTS);
    setActiveScenario('Official Methodology');
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          Sovereignty Sandbox &amp; Simulator
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Simulate geopolitical shocks, customize methodology weights, and see in real time which nations surge or collapse.
        </p>
      </div>

      {/* Preset Scenarios Strip */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-amber-500" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Geopolitical Shock Scenarios
            </h2>
          </div>
          <button
            type="button"
            onClick={resetToDefault}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer"
          >
            <RotateCcw className="size-3.5" />
            Reset to Official Weights
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {SCENARIOS.map((s) => {
            const isSelected = activeScenario === s.name;
            return (
              <button
                key={s.name}
                type="button"
                onClick={() => {
                  setWeights(s.weights);
                  setActiveScenario(s.name);
                }}
                className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? 'border-primary bg-primary/10 shadow-xs'
                    : 'border-border bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="font-bold text-xs text-foreground">{s.name}</div>
                <div className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                  {s.tagline}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Weight Sliders Lab */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Methodology Weights Calibration
            </h2>
            <p className="text-xs text-muted-foreground">
              Active formula weight allocation. Auto-normalized to 100%.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Raw Sum:</span>
            <span
              className={`rounded-lg px-2.5 py-1 text-xs font-bold font-mono ${
                totalRawWeight === 100
                  ? 'bg-emerald-500/10 text-emerald-500'
                  : 'bg-primary/10 text-primary'
              }`}
            >
              {totalRawWeight}%
            </span>
          </div>
        </div>

        {/* 5 Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Consumption */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-500 flex items-center gap-1">
                <Wheat className="size-3.5" />
                Consumption
              </span>
              <span className="font-mono font-bold text-foreground">{weights.consumption}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="70"
              value={weights.consumption}
              onChange={(e) => handleSliderChange('consumption', Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[10px] text-muted-foreground">Food, energy, fuels, materials</p>
          </div>

          {/* Employment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-sky-500 flex items-center gap-1">
                <Briefcase className="size-3.5" />
                Employment
              </span>
              <span className="font-mono font-bold text-foreground">{weights.employment}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="70"
              value={weights.employment}
              onChange={(e) => handleSliderChange('employment', Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <p className="text-[10px] text-muted-foreground">Formal labor, domestic value retention</p>
          </div>

          {/* Technological */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-indigo-500 flex items-center gap-1">
                <Cpu className="size-3.5" />
                Technology
              </span>
              <span className="font-mono font-bold text-foreground">{weights.technological}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="70"
              value={weights.technological}
              onChange={(e) => handleSliderChange('technological', Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <p className="text-[10px] text-muted-foreground">Chips, AI clusters, industrial robotics</p>
          </div>

          {/* Scientific */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-purple-500 flex items-center gap-1">
                <FlaskConical className="size-3.5" />
                Scientific
              </span>
              <span className="font-mono font-bold text-foreground">{weights.scientific}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="70"
              value={weights.scientific}
              onChange={(e) => handleSliderChange('scientific', Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <p className="text-[10px] text-muted-foreground">Frontier research, superlabs, STEM</p>
          </div>

          {/* Military */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-rose-500 flex items-center gap-1">
                <Shield className="size-3.5" />
                Military
              </span>
              <span className="font-mono font-bold text-foreground">{weights.military}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="70"
              value={weights.military}
              onChange={(e) => handleSliderChange('military', Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <p className="text-[10px] text-muted-foreground">Defense industry, missile shields, triad</p>
          </div>
        </div>
      </section>

      {/* Climbers and Decliners Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Climbers */}
        <div className="rounded-3xl border border-emerald-500/20 bg-card p-6 shadow-md space-y-4">
          <div className="flex items-center gap-2 text-emerald-500">
            <TrendingUp className="size-5" />
            <h3 className="font-bold text-base text-foreground">
              Top Climbers in this Scenario
            </h3>
          </div>
          <div className="divide-y divide-border/60">
            {topClimbers.length > 0 ? (
              topClimbers.map((c) => (
                <div key={c.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{c.flag}</span>
                    <span className="font-bold text-foreground">{c.name}</span>
                    <span className="text-muted-foreground">(was #{c.originalRank})</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-emerald-500">
                    <span>Now #{c.simRank}</span>
                    <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px]">
                      +{c.rankDelta}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground py-4">No rank shifts at current weights.</p>
            )}
          </div>
        </div>

        {/* Top Decliners */}
        <div className="rounded-3xl border border-rose-500/20 bg-card p-6 shadow-md space-y-4">
          <div className="flex items-center gap-2 text-rose-500">
            <TrendingDown className="size-5" />
            <h3 className="font-bold text-base text-foreground">
              Most Vulnerable to this Scenario
            </h3>
          </div>
          <div className="divide-y divide-border/60">
            {topDecliners.length > 0 ? (
              topDecliners.map((c) => (
                <div key={c.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{c.flag}</span>
                    <span className="font-bold text-foreground">{c.name}</span>
                    <span className="text-muted-foreground">(was #{c.originalRank})</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-rose-500">
                    <span>Now #{c.simRank}</span>
                    <span className="rounded bg-rose-500/10 px-1.5 py-0.5 text-[10px]">
                      {c.rankDelta}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground py-4">No rank shifts at current weights.</p>
            )}
          </div>
        </div>
      </div>

      {/* Simulated Live Leaderboard (Top 30 Preview) */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Simulated Top 30 Leaderboard
            </h2>
            <p className="text-xs text-muted-foreground">
              Dynamic rank results according to your calibrated weight model
            </p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {activeScenario}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 text-[11px] font-bold text-muted-foreground uppercase border-b border-border">
              <tr>
                <th className="py-3 px-3">Sim Rank</th>
                <th className="py-3 px-3">Country</th>
                <th className="py-3 px-3">Simulated Score</th>
                <th className="py-3 px-3">Rank Shift</th>
                <th className="py-3 px-3">Base Score</th>
                <th className="py-3 px-3">Continent</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {recalculatedList.slice(0, 30).map((c) => (
                <tr key={c.id} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-3 font-black text-foreground">
                    #{c.simRank}
                  </td>
                  <td className="py-3 px-3 font-bold text-foreground">
                    <span className="mr-2 text-base">{c.flag}</span>
                    {c.name}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-extrabold text-foreground text-sm">
                      {c.simScore.toFixed(1)}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    {c.rankDelta > 0 ? (
                      <span className="inline-flex items-center gap-0.5 font-bold text-emerald-500">
                        <TrendingUp className="size-3" /> +{c.rankDelta}
                      </span>
                    ) : c.rankDelta < 0 ? (
                      <span className="inline-flex items-center gap-0.5 font-bold text-rose-500">
                        <TrendingDown className="size-3" /> {c.rankDelta}
                      </span>
                    ) : (
                      <span className="text-muted-foreground font-mono">= 0</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-muted-foreground">
                    {c.overallScore.toFixed(1)}
                  </td>
                  <td className="py-3 px-3 text-muted-foreground">
                    {c.continent}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <a
                      href={`${cleanBase}/dashboard?country=${c.id}`}
                      className="text-primary font-bold hover:underline"
                    >
                      Dashboard &rarr;
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SandboxSimulator;
