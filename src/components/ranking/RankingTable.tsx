import React, { useState, useMemo } from 'react';
import {
  ArrowUpDown,
  Download,
  ChevronRight,
  AlertTriangle,
  Globe,
  Shield,
  Database
} from 'lucide-react';
import { SovereigntyBadge } from '../ui/SovereigntyBadge';
import { CustomInput } from '../ui/CustomInput';
import { CustomSelect, type SelectOption } from '../ui/CustomSelect';
import { formatNumber } from '../../lib/data';
import type { Country } from '../../lib/types';

interface RankingTableProps {
  countries: Country[];
  base?: string;
}

type SortField =
  | 'rank'
  | 'name'
  | 'overallScore'
  | 'consumption'
  | 'employment'
  | 'technological'
  | 'scientific'
  | 'military'
  | 'population'
  | 'gdpNominalBillions';

export const RankingTable: React.FC<RankingTableProps> = ({
  countries,
  base = '/sovereigntyatlas'
}) => {
  const [search, setSearch] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [estimateFilter, setEstimateFilter] = useState<'All' | 'official' | 'estimate'>('All');
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      // default descending for scores and numbers, ascending for rank and name
      if (['name', 'rank'].includes(field)) {
        setSortOrder('asc');
      } else {
        setSortOrder('desc');
      }
    }
  };

  const filteredAndSortedCountries = useMemo(() => {
    let result = [...countries];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          c.continent.toLowerCase().includes(q)
      );
    }

    if (selectedContinent !== 'All') {
      result = result.filter((c) => c.continent === selectedContinent);
    }

    if (selectedTier !== 'All') {
      result = result.filter((c) => c.tier === selectedTier);
    }

    if (estimateFilter === 'official') {
      result = result.filter((c) => !c.isEstimate);
    } else if (estimateFilter === 'estimate') {
      result = result.filter((c) => c.isEstimate);
    }

    result.sort((a, b) => {
      let valA: string | number;
      let valB: string | number;

      switch (sortField) {
        case 'rank':
          valA = a.rank;
          valB = b.rank;
          break;
        case 'name':
          valA = a.name;
          valB = b.name;
          break;
        case 'overallScore':
          valA = a.overallScore;
          valB = b.overallScore;
          break;
        case 'consumption':
          valA = a.pillars.consumption.score;
          valB = b.pillars.consumption.score;
          break;
        case 'employment':
          valA = a.pillars.employment.score;
          valB = b.pillars.employment.score;
          break;
        case 'technological':
          valA = a.pillars.technological.score;
          valB = b.pillars.technological.score;
          break;
        case 'scientific':
          valA = a.pillars.scientific.score;
          valB = b.pillars.scientific.score;
          break;
        case 'military':
          valA = a.pillars.military.score;
          valB = b.pillars.military.score;
          break;
        case 'population':
          valA = a.population;
          valB = b.population;
          break;
        case 'gdpNominalBillions':
          valA = a.gdpNominalBillions;
          valB = b.gdpNominalBillions;
          break;
        default:
          valA = a.rank;
          valB = b.rank;
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [countries, search, selectedContinent, selectedTier, estimateFilter, sortField, sortOrder]);

  const exportCSV = () => {
    const headers = [
      'Rank',
      'Country',
      'ISO3',
      'Continent',
      'OverallScore',
      'Tier',
      'Consumption',
      'Employment',
      'Technology',
      'Science',
      'Military',
      'Population',
      'GDP_Billions',
      'IsEstimate'
    ];
    const rows = filteredAndSortedCountries.map((c) => [
      c.rank,
      `"${c.name}"`,
      c.id,
      `"${c.continent}"`,
      c.overallScore,
      `"${c.tier}"`,
      c.pillars.consumption.score,
      c.pillars.employment.score,
      c.pillars.technological.score,
      c.pillars.scientific.score,
      c.pillars.military.score,
      c.population,
      c.gdpNominalBillions,
      c.isEstimate
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sovereignty_atlas_ranking_2025.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const avgFilteredScore = useMemo(() => {
    if (!filteredAndSortedCountries.length) return 0;
    const sum = filteredAndSortedCountries.reduce((acc, c) => acc + c.overallScore, 0);
    return (sum / filteredAndSortedCountries.length).toFixed(1);
  }, [filteredAndSortedCountries]);

  const continentOptions: SelectOption[] = [
    { value: 'All', label: 'All Continents', badge: '6' },
    { value: 'Africa', label: 'Africa', description: '54 nations' },
    { value: 'Asia', label: 'Asia', description: '48 nations' },
    { value: 'Europe', label: 'Europe', description: '44 nations' },
    { value: 'North America', label: 'North America', description: '23 nations' },
    { value: 'South America', label: 'South America', description: '12 nations' },
    { value: 'Oceania', label: 'Oceania', description: '14 nations' }
  ];

  const tierOptions: SelectOption[] = [
    { value: 'All', label: 'All Sovereignty Tiers' },
    { value: 'Sovereign Superpower', label: 'Sovereign Superpower', badge: '80+' },
    { value: 'High Sovereignty', label: 'High Sovereignty', badge: '68–79' },
    { value: 'Moderate Sovereignty', label: 'Moderate Sovereignty', badge: '52–67' },
    { value: 'Vulnerable Sovereignty', label: 'Vulnerable Sovereignty', badge: '38–51' },
    { value: 'Severely Dependent', label: 'Severely Dependent', badge: '<38' }
  ];

  const estimateOptions: SelectOption[] = [
    { value: 'All', label: 'All Data Qualities' },
    { value: 'official', label: 'Official Baseline Only', badge: 'Primary' },
    { value: 'estimate', label: 'Modeled Estimates Only', badge: 'Proxy' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Filter Controls */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-md space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="w-full lg:w-80">
            <CustomInput
              placeholder="Search by country, code, continent..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch('')}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Continent filter */}
            <div className="w-44">
              <CustomSelect
                value={selectedContinent}
                onChange={(val) => setSelectedContinent(val)}
                options={continentOptions}
                icon={<Globe className="size-3.5" />}
              />
            </div>

            {/* Tier Filter */}
            <div className="w-52">
              <CustomSelect
                value={selectedTier}
                onChange={(val) => setSelectedTier(val)}
                options={tierOptions}
                icon={<Shield className="size-3.5" />}
              />
            </div>

            {/* Estimate Filter */}
            <div className="w-48">
              <CustomSelect
                value={estimateFilter}
                onChange={(val) => setEstimateFilter(val as 'All' | 'official' | 'estimate')}
                options={estimateOptions}
                icon={<Database className="size-3.5" />}
              />
            </div>

            {/* Export CSV Button */}
            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] rounded-xl text-xs font-semibold border border-border/80 bg-card hover:bg-muted/80 text-foreground transition-all shadow-xs cursor-pointer select-none"
            >
              <Download className="size-3.5 text-primary" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Status Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/70 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>
              Showing{' '}
              <strong className="text-foreground">{filteredAndSortedCountries.length}</strong> of
              195 nations
            </span>
            <span>&bull;</span>
            <span>
              Average Score: <strong className="text-foreground">{avgFilteredScore}</strong> / 100
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-500">
              <span className="size-2 rounded-full bg-emerald-500" /> Consumption: 28%
            </span>
            <span className="flex items-center gap-1 text-sky-500">
              <span className="size-2 rounded-full bg-sky-500" /> Employment: 25%
            </span>
            <span className="flex items-center gap-1 text-indigo-500">
              <span className="size-2 rounded-full bg-indigo-500" /> Tech: 20%
            </span>
            <span className="flex items-center gap-1 text-purple-500">
              <span className="size-2 rounded-full bg-purple-500" /> Science: 15%
            </span>
            <span className="flex items-center gap-1 text-rose-500">
              <span className="size-2 rounded-full bg-rose-500" /> Military: 12%
            </span>
          </div>
        </div>
      </div>

      {/* Main Full Table */}
      <div className="rounded-3xl border border-border bg-card shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/60 text-[11px] font-bold text-muted-foreground uppercase border-b border-border select-none">
              <tr>
                <th
                  onClick={() => handleSort('rank')}
                  className="py-3.5 px-3.5 cursor-pointer hover:text-foreground transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Rank</span>
                    <ArrowUpDown className="size-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('name')}
                  className="py-3.5 px-3.5 cursor-pointer hover:text-foreground transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Country</span>
                    <ArrowUpDown className="size-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('overallScore')}
                  className="py-3.5 px-3.5 cursor-pointer hover:text-foreground transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Sovereignty</span>
                    <ArrowUpDown className="size-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('consumption')}
                  className="py-3.5 px-3.5 cursor-pointer hover:text-emerald-500 transition-colors"
                >
                  <div className="flex items-center gap-1 text-emerald-500">
                    <span>Consumption (28%)</span>
                    <ArrowUpDown className="size-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('employment')}
                  className="py-3.5 px-3.5 cursor-pointer hover:text-sky-500 transition-colors"
                >
                  <div className="flex items-center gap-1 text-sky-500">
                    <span>Employment (25%)</span>
                    <ArrowUpDown className="size-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('technological')}
                  className="py-3.5 px-3.5 cursor-pointer hover:text-indigo-500 transition-colors"
                >
                  <div className="flex items-center gap-1 text-indigo-500">
                    <span>Tech (20%)</span>
                    <ArrowUpDown className="size-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('scientific')}
                  className="py-3.5 px-3.5 cursor-pointer hover:text-purple-500 transition-colors"
                >
                  <div className="flex items-center gap-1 text-purple-500">
                    <span>Science (15%)</span>
                    <ArrowUpDown className="size-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('military')}
                  className="py-3.5 px-3.5 cursor-pointer hover:text-rose-500 transition-colors"
                >
                  <div className="flex items-center gap-1 text-rose-500">
                    <span>Military (12%)</span>
                    <ArrowUpDown className="size-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('population')}
                  className="py-3.5 px-3.5 cursor-pointer hover:text-foreground transition-colors hidden sm:table-cell"
                >
                  <div className="flex items-center gap-1">
                    <span>Population</span>
                    <ArrowUpDown className="size-3" />
                  </div>
                </th>
                <th className="py-3.5 px-3.5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredAndSortedCountries.map((c) => (
                <tr key={c.id} className="hover:bg-muted/40 transition-colors group">
                  {/* Rank */}
                  <td className="py-3.5 px-3.5 font-black text-foreground">#{c.rank}</td>

                  {/* Country Name & Flag */}
                  <td className="py-3.5 px-3.5">
                    <a
                      href={`${cleanBase}/dashboard?country=${c.id}`}
                      className="flex items-center gap-2 group-hover:text-primary transition-colors"
                    >
                      <span className="text-base">{c.flag}</span>
                      <span className="font-bold text-foreground truncate max-w-[150px] sm:max-w-none">
                        {c.name}
                      </span>
                      <span className="rounded bg-muted px-1.5 py-0.2 text-[10px] font-mono text-muted-foreground">
                        {c.id}
                      </span>
                      {c.isEstimate && (
                        <span
                          title="Modeled estimate due to restricted official reporting"
                          className="rounded bg-amber-500/20 px-1.5 py-0.2 text-[9px] font-semibold text-amber-500 flex items-center gap-0.5"
                        >
                          <AlertTriangle className="size-2.5" />
                          Est.
                        </span>
                      )}
                    </a>
                  </td>

                  {/* Overall Score */}
                  <td className="py-3.5 px-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-foreground">
                        {c.overallScore.toFixed(1)}
                      </span>
                      <SovereigntyBadge tier={c.tier} size="sm" showLabel={false} />
                    </div>
                  </td>

                  {/* Consumption */}
                  <td className="py-3.5 px-3.5 text-emerald-500 font-bold">
                    {c.pillars.consumption.score.toFixed(1)}
                  </td>

                  {/* Employment */}
                  <td className="py-3.5 px-3.5 text-sky-500 font-bold">
                    {c.pillars.employment.score.toFixed(1)}
                  </td>

                  {/* Technological */}
                  <td className="py-3.5 px-3.5 text-indigo-500 font-bold">
                    {c.pillars.technological.score.toFixed(1)}
                  </td>

                  {/* Scientific */}
                  <td className="py-3.5 px-3.5 text-purple-500 font-bold">
                    {c.pillars.scientific.score.toFixed(1)}
                  </td>

                  {/* Military */}
                  <td className="py-3.5 px-3.5 text-rose-500 font-bold">
                    {c.pillars.military.score.toFixed(1)}
                  </td>

                  {/* Population */}
                  <td className="py-3.5 px-3.5 text-muted-foreground hidden sm:table-cell">
                    {formatNumber(c.population)}
                  </td>

                  {/* Action Link */}
                  <td className="py-3.5 px-3.5 text-right">
                    <a
                      href={`${cleanBase}/dashboard?country=${c.id}`}
                      className="inline-flex items-center gap-1 font-bold text-primary hover:underline"
                    >
                      View <ChevronRight className="size-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RankingTable;
