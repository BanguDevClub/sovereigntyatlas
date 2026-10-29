import React, { useState, useEffect } from 'react';
import {
  GitCompare,
  Plus,
  Trash2,
  Trophy,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Wheat,
  Briefcase,
  Cpu,
  FlaskConical,
  Shield
} from 'lucide-react';
import { SovereigntyRadar } from '../charts/SovereigntyRadar';
import { SovereigntyBadge } from '../ui/SovereigntyBadge';
import { EstimateBanner } from '../ui/EstimateBanner';
import { formatNumber } from '../../lib/data';
import type { Country, PillarType } from '../../lib/types';

interface CompareViewProps {
  countries: Country[];
  base?: string;
}

const PRESETS = [
  { name: 'Superpower Triad', ids: ['USA', 'CHN', 'RUS'] },
  { name: 'South American Giants', ids: ['BRA', 'ARG', 'CHL'] },
  { name: 'European Autonomy', ids: ['FRA', 'DEU', 'GBR'] },
  { name: 'Asian Tech Titans', ids: ['JPN', 'KOR', 'IND'] },
  { name: 'Nordic Fortress', ids: ['NOR', 'SWE'] }
];

export const CompareView: React.FC<CompareViewProps> = ({
  countries,
  base = '/sovereigntyatlas'
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['USA', 'CHN', 'BRA']);

  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const c1 = params.get('c1');
      const c2 = params.get('c2');
      const c3 = params.get('c3');

      const initial: string[] = [];
      if (c1 && countries.some((c) => c.id === c1.toUpperCase())) initial.push(c1.toUpperCase());
      if (c2 && countries.some((c) => c.id === c2.toUpperCase())) initial.push(c2.toUpperCase());
      if (c3 && countries.some((c) => c.id === c3.toUpperCase())) initial.push(c3.toUpperCase());

      if (initial.length > 0) {
        setSelectedIds(initial);
      }
    }
  }, [countries]);

  const selectedCountries = selectedIds
    .map((id) => countries.find((c) => c.id === id))
    .filter(Boolean) as Country[];

  const handleAddCountry = (id: string) => {
    if (!selectedIds.includes(id) && selectedIds.length < 4) {
      const updated = [...selectedIds, id];
      setSelectedIds(updated);
      syncUrl(updated);
    }
  };

  const handleRemoveCountry = (id: string) => {
    if (selectedIds.length > 1) {
      const updated = selectedIds.filter((item) => item !== id);
      setSelectedIds(updated);
      syncUrl(updated);
    }
  };

  const syncUrl = (ids: string[]) => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('c1');
      url.searchParams.delete('c2');
      url.searchParams.delete('c3');
      url.searchParams.delete('c4');
      ids.forEach((id, idx) => {
        url.searchParams.set(`c${idx + 1}`, id);
      });
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Find winner in each pillar among selected
  const getWinner = (pillar: PillarType) => {
    if (!selectedCountries.length) return null;
    let highest = selectedCountries[0];
    selectedCountries.forEach((c) => {
      if (c.pillars[pillar].score > highest.pillars[pillar].score) {
        highest = c;
      }
    });
    return highest;
  };

  const consumptionWinner = getWinner('consumption');
  const employmentWinner = getWinner('employment');
  const techWinner = getWinner('technological');
  const scienceWinner = getWinner('scientific');
  const militaryWinner = getWinner('military');

  // Check if any country is an estimate
  const estimatedInComparison = selectedCountries.filter((c) => c.isEstimate);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          Head-to-Head Sovereignty Compare
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Direct side-by-side benchmarking of up to 4 sovereign nations across all five methodology dimensions.
        </p>
      </div>

      {/* Preset Strips & Country Selector */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">
              Popular Presets:
            </span>
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => {
                  setSelectedIds(preset.ids);
                  syncUrl(preset.ids);
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-border bg-muted/40 hover:bg-muted text-foreground transition-all cursor-pointer shadow-xs"
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* Add country select */}
          {selectedIds.length < 4 && (
            <div className="flex items-center gap-2">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddCountry(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-primary/20"
              >
                <option value="">+ Add Another Country...</option>
                {countries
                  .filter((c) => !selectedIds.includes(c.id))
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.flag} {c.name} (#{c.rank})
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        {/* Selected Country Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {selectedCountries.map((c) => (
            <div
              key={c.id}
              className="relative rounded-2xl border border-border bg-muted/20 p-4 space-y-2 group shadow-xs"
            >
              {selectedCountries.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveCountry(c.id)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-rose-500 transition-colors"
                  title="Remove from comparison"
                >
                  <Trash2 className="size-3.5" />
                </button>
              )}

              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{c.flag}</span>
                <div>
                  <h3 className="text-sm font-bold text-foreground truncate">{c.name}</h3>
                  <p className="text-[11px] text-muted-foreground">
                    Rank #{c.rank} &bull; {c.continent}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-baseline justify-between border-t border-border">
                <span className="text-xs text-muted-foreground">Overall Index</span>
                <span className="text-lg font-black text-foreground">
                  {c.overallScore.toFixed(1)} <span className="text-[10px] text-muted-foreground">/ 100</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning banner if any selected country is an estimate */}
      {estimatedInComparison.length > 0 && (
        <EstimateBanner
          countryName={estimatedInComparison.map((c) => c.name).join(', ')}
          notice={`One or more compared countries (${estimatedInComparison.map((c) => c.name).join(', ')}) rely on proxy econometric estimates due to limited primary reporting.`}
        />
      )}

      {/* Overlapping Multi-Radar Chart */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-md space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Multi-Country Comparative Radar
          </h2>
          <p className="text-xs text-muted-foreground">
            Visualizing asymmetric strengths across Consumption, Employment, Technological, Scientific, and Military pillars.
          </p>
        </div>

        <SovereigntyRadar countries={selectedCountries} height={400} />
      </section>

      {/* Direct Head-to-Head Metric Delta Matrix */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Pillar Head-to-Head Matrix
            </h2>
            <p className="text-xs text-muted-foreground">
              Winning nation highlighted for each strategic sovereignty domain
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 text-[11px] font-bold text-muted-foreground uppercase border-b border-border">
              <tr>
                <th className="py-3 px-4">Pillar &amp; Weight</th>
                {selectedCountries.map((c) => (
                  <th key={c.id} className="py-3 px-4">
                    <div className="flex items-center gap-1.5 font-bold text-foreground">
                      <span>{c.flag}</span>
                      <span>{c.name}</span>
                    </div>
                  </th>
                ))}
                <th className="py-3 px-4 text-primary">Category Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {/* Overall Score */}
              <tr className="bg-muted/20 font-bold">
                <td className="py-3.5 px-4 font-black text-foreground">
                  Overall Sovereignty Index
                </td>
                {selectedCountries.map((c) => (
                  <td key={c.id} className="py-3.5 px-4 text-base font-black text-foreground">
                    {c.overallScore.toFixed(1)}
                  </td>
                ))}
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1 text-primary font-extrabold">
                    <Trophy className="size-3.5 text-amber-500" />
                    {selectedCountries.reduce((prev, curr) =>
                      curr.overallScore > prev.overallScore ? curr : prev
                    ).name}
                  </span>
                </td>
              </tr>

              {/* Consumption */}
              <tr>
                <td className="py-3.5 px-4 font-semibold text-emerald-500 flex items-center gap-1.5">
                  <Wheat className="size-3.5" />
                  1. Consumption (28%)
                </td>
                {selectedCountries.map((c) => {
                  const isWin = consumptionWinner?.id === c.id;
                  return (
                    <td
                      key={c.id}
                      className={`py-3.5 px-4 font-bold ${
                        isWin ? 'text-emerald-500 bg-emerald-500/10' : 'text-foreground'
                      }`}
                    >
                      {c.pillars.consumption.score.toFixed(1)}
                      {isWin && <span className="ml-1 text-[10px] uppercase font-bold text-emerald-500">🏆</span>}
                    </td>
                  );
                })}
                <td className="py-3.5 px-4 text-muted-foreground">
                  {consumptionWinner?.flag} {consumptionWinner?.name} (+{(consumptionWinner?.pillars.consumption.score || 0).toFixed(1)})
                </td>
              </tr>

              {/* Employment */}
              <tr>
                <td className="py-3.5 px-4 font-semibold text-sky-500 flex items-center gap-1.5">
                  <Briefcase className="size-3.5" />
                  2. Employment (25%)
                </td>
                {selectedCountries.map((c) => {
                  const isWin = employmentWinner?.id === c.id;
                  return (
                    <td
                      key={c.id}
                      className={`py-3.5 px-4 font-bold ${
                        isWin ? 'text-sky-500 bg-sky-500/10' : 'text-foreground'
                      }`}
                    >
                      {c.pillars.employment.score.toFixed(1)}
                      {isWin && <span className="ml-1 text-[10px] uppercase font-bold text-sky-500">🏆</span>}
                    </td>
                  );
                })}
                <td className="py-3.5 px-4 text-muted-foreground">
                  {employmentWinner?.flag} {employmentWinner?.name} (+{(employmentWinner?.pillars.employment.score || 0).toFixed(1)})
                </td>
              </tr>

              {/* Technology */}
              <tr>
                <td className="py-3.5 px-4 font-semibold text-indigo-500 flex items-center gap-1.5">
                  <Cpu className="size-3.5" />
                  3. Technology (20%)
                </td>
                {selectedCountries.map((c) => {
                  const isWin = techWinner?.id === c.id;
                  return (
                    <td
                      key={c.id}
                      className={`py-3.5 px-4 font-bold ${
                        isWin ? 'text-indigo-500 bg-indigo-500/10' : 'text-foreground'
                      }`}
                    >
                      {c.pillars.technological.score.toFixed(1)}
                      {isWin && <span className="ml-1 text-[10px] uppercase font-bold text-indigo-500">🏆</span>}
                    </td>
                  );
                })}
                <td className="py-3.5 px-4 text-muted-foreground">
                  {techWinner?.flag} {techWinner?.name} (+{(techWinner?.pillars.technological.score || 0).toFixed(1)})
                </td>
              </tr>

              {/* Science */}
              <tr>
                <td className="py-3.5 px-4 font-semibold text-purple-500 flex items-center gap-1.5">
                  <FlaskConical className="size-3.5" />
                  4. Science (15%)
                </td>
                {selectedCountries.map((c) => {
                  const isWin = scienceWinner?.id === c.id;
                  return (
                    <td
                      key={c.id}
                      className={`py-3.5 px-4 font-bold ${
                        isWin ? 'text-purple-500 bg-purple-500/10' : 'text-foreground'
                      }`}
                    >
                      {c.pillars.scientific.score.toFixed(1)}
                      {isWin && <span className="ml-1 text-[10px] uppercase font-bold text-purple-500">🏆</span>}
                    </td>
                  );
                })}
                <td className="py-3.5 px-4 text-muted-foreground">
                  {scienceWinner?.flag} {scienceWinner?.name} (+{(scienceWinner?.pillars.scientific.score || 0).toFixed(1)})
                </td>
              </tr>

              {/* Military */}
              <tr>
                <td className="py-3.5 px-4 font-semibold text-rose-500 flex items-center gap-1.5">
                  <Shield className="size-3.5" />
                  5. Military (12%)
                </td>
                {selectedCountries.map((c) => {
                  const isWin = militaryWinner?.id === c.id;
                  return (
                    <td
                      key={c.id}
                      className={`py-3.5 px-4 font-bold ${
                        isWin ? 'text-rose-500 bg-rose-500/10' : 'text-foreground'
                      }`}
                    >
                      {c.pillars.military.score.toFixed(1)}
                      {isWin && <span className="ml-1 text-[10px] uppercase font-bold text-rose-500">🏆</span>}
                    </td>
                  );
                })}
                <td className="py-3.5 px-4 text-muted-foreground">
                  {militaryWinner?.flag} {militaryWinner?.name} (+{(militaryWinner?.pillars.military.score || 0).toFixed(1)})
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CompareView;
