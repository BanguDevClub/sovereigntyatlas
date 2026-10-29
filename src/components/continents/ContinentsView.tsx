import React, { useState } from 'react';
import {
  Globe,
  MapPin,
  Trophy,
  TrendingDown,
  TrendingUp,
  Users,
  DollarSign,
  ArrowRight,
  ChevronRight,
  ShieldAlert,
  Wheat,
  Briefcase,
  Cpu,
  FlaskConical,
  Shield
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { SovereigntyBadge } from '../ui/SovereigntyBadge';
import { formatNumber } from '../../lib/data';
import type { ContinentSummary, Country, Continent } from '../../lib/types';

interface ContinentsViewProps {
  continents: ContinentSummary[];
  allCountries: Country[];
  base?: string;
}

export const ContinentsView: React.FC<ContinentsViewProps> = ({
  continents,
  allCountries,
  base = '/sovereigntyatlas'
}) => {
  const [selectedContinent, setSelectedContinent] = useState<Continent>('Europe');

  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;

  const continentCountries = allCountries
    .filter((c) => c.continent === selectedContinent)
    .sort((a, b) => b.overallScore - a.overallScore);

  const activeSummary = continents.find((c) => c.name === selectedContinent) || continents[0];

  const chartData = continents.map((c) => ({
    name: c.name,
    Consumption: c.avgConsumption,
    Employment: c.avgEmployment,
    Technology: c.avgTechnological,
    Science: c.avgScientific,
    Military: c.avgMilitary,
    Average: c.avgScore
  }));

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          Continental &amp; Regional Sovereignty
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Comparative macroeconomic autonomy, resource distribution, and geopolitical resilience across world continents.
        </p>
      </div>

      {/* Continents Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {continents.map((item) => {
          const isSelected = item.name === selectedContinent;
          return (
            <div
              key={item.name}
              onClick={() => setSelectedContinent(item.name)}
              className={`rounded-2xl border p-5 transition-all cursor-pointer shadow-xs ${
                isSelected
                  ? 'border-primary bg-primary/10 ring-2 ring-primary/20 shadow-md'
                  : 'border-border bg-card hover:border-primary/40 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-border/80">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-primary" />
                  <h3 className="font-bold text-foreground text-base">{item.name}</h3>
                </div>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                  {item.count} nations
                </span>
              </div>

              <div className="pt-3 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-muted-foreground">Average Sovereignty Index</span>
                  <span className="text-xl font-black text-foreground">
                    {item.avgScore.toFixed(1)} <span className="text-xs font-normal text-muted-foreground">/ 100</span>
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Trophy className="size-3.5 text-amber-500" />
                      Top Sovereign:
                    </span>
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      <span>{item.topCountry.flag}</span>
                      <span>{item.topCountry.name}</span>
                      <span className="text-primary font-bold">({item.topCountry.overallScore.toFixed(1)})</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <TrendingDown className="size-3.5 text-rose-500" />
                      Most Dependent:
                    </span>
                    <span className="font-medium text-foreground flex items-center gap-1">
                      <span>{item.lowestCountry.flag}</span>
                      <span>{item.lowestCountry.name}</span>
                      <span className="text-rose-500">({item.lowestCountry.overallScore.toFixed(1)})</span>
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Pop: {formatNumber(item.totalPopulation)}</span>
                  <span>GDP: ${formatNumber(item.totalGdp * 1_000_000_000)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Multi-Continent Bar Chart Comparison */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-md space-y-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Continental Pillars Benchmark
          </h2>
          <p className="text-xs text-muted-foreground">
            Comparing average scores across Consumption, Employment, Technological, Scientific, and Military capabilities.
          </p>
        </div>

        <div style={{ width: '100%', height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.15} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'currentColor' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: 'currentColor' }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-xl border border-border bg-card p-3 shadow-xl text-xs space-y-1.5">
                        <p className="font-bold text-foreground border-b border-border pb-1">
                          {label}
                        </p>
                        {payload.map((entry: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between gap-4">
                            <span style={{ color: entry.color }} className="font-medium">
                              {entry.name}:
                            </span>
                            <span className="font-bold text-foreground">
                              {Number(entry.value).toFixed(1)} / 100
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }} />
              <Bar dataKey="Consumption" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Employment" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Technology" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Science" fill="#a855f7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Military" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Selected Continent Member Table */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">
                All {continentCountries.length} Countries in {selectedContinent}
              </h2>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                Avg: {activeSummary.avgScore.toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Ranked by total sovereignty index from most autonomous to most dependent
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Select Continent:</span>
            <select
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value as Continent)}
              className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-primary/20"
            >
              {continents.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} ({c.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Nations Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 text-[11px] font-bold text-muted-foreground uppercase border-b border-border">
              <tr>
                <th className="py-3 px-3">Regional Rank</th>
                <th className="py-3 px-3">Country</th>
                <th className="py-3 px-3">Global Rank</th>
                <th className="py-3 px-3">Overall Index</th>
                <th className="py-3 px-3">Consumption</th>
                <th className="py-3 px-3">Employment</th>
                <th className="py-3 px-3">Technology</th>
                <th className="py-3 px-3">Science</th>
                <th className="py-3 px-3">Military</th>
                <th className="py-3 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {continentCountries.map((c, index) => (
                <tr
                  key={c.id}
                  className="hover:bg-muted/40 transition-colors group"
                >
                  <td className="py-3 px-3 font-extrabold text-foreground">
                    #{index + 1}
                  </td>
                  <td className="py-3 px-3">
                    <a
                      href={`${cleanBase}/dashboard?country=${c.id}`}
                      className="flex items-center gap-2 font-bold text-foreground group-hover:text-primary transition-colors"
                    >
                      <span className="text-base">{c.flag}</span>
                      <span>{c.name}</span>
                      {c.isEstimate && (
                        <span className="rounded bg-amber-500/20 px-1.5 py-0.2 text-[9px] font-semibold text-amber-500">
                          Est.
                        </span>
                      )}
                    </a>
                  </td>
                  <td className="py-3 px-3 text-muted-foreground">
                    #{c.rank}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-black text-foreground">
                      {c.overallScore.toFixed(1)}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-emerald-500 font-semibold">
                    {c.pillars.consumption.score.toFixed(1)}
                  </td>
                  <td className="py-3 px-3 text-sky-500 font-semibold">
                    {c.pillars.employment.score.toFixed(1)}
                  </td>
                  <td className="py-3 px-3 text-indigo-500 font-semibold">
                    {c.pillars.technological.score.toFixed(1)}
                  </td>
                  <td className="py-3 px-3 text-purple-500 font-semibold">
                    {c.pillars.scientific.score.toFixed(1)}
                  </td>
                  <td className="py-3 px-3 text-rose-500 font-semibold">
                    {c.pillars.military.score.toFixed(1)}
                  </td>
                  <td className="py-3 px-3">
                    <a
                      href={`${cleanBase}/dashboard?country=${c.id}`}
                      className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                    >
                      Inspect <ChevronRight className="size-3" />
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

export default ContinentsView;
