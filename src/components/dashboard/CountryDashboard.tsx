import React, { useState, useEffect } from 'react';
import {
  GitCompare,
  Wheat,
  Briefcase,
  Cpu,
  FlaskConical,
  Shield,
  ChevronRight,
  Globe2,
  Users,
  DollarSign
} from 'lucide-react';
import { SovereigntyRadar } from '../charts/SovereigntyRadar';
import { PillarBarChart } from '../charts/PillarBarChart';
import { SovereigntyBadge } from '../ui/SovereigntyBadge';
import { EstimateBanner } from '../ui/EstimateBanner';
import { CustomInput } from '../ui/CustomInput';
import { CustomSelect, type SelectOption } from '../ui/CustomSelect';
import { formatNumber } from '../../lib/data';
import type { Country, PillarType } from '../../lib/types';

interface CountryDashboardProps {
  initialCountries: Country[];
  initialCountryId?: string;
  base?: string;
}

export const CountryDashboard: React.FC<CountryDashboardProps> = ({
  initialCountries,
  initialCountryId = 'USA',
  base = '/sovereigntyatlas'
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>(initialCountryId);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<PillarType>('consumption');

  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;

  useEffect(() => {
    // Check URL search params if present
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const c = params.get('country');
      if (c && initialCountries.some((item) => item.id === c.toUpperCase())) {
        setSelectedCountryId(c.toUpperCase());
      }
    }
  }, [initialCountries]);

  const currentCountry =
    initialCountries.find((c) => c.id === selectedCountryId) || initialCountries[0];

  const filteredCountries = initialCountries.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.continent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCountry = (id: string) => {
    setSelectedCountryId(id);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('country', id);
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Submetrics data for the active pillar
  const getSubmetricsData = (pillar: PillarType) => {
    switch (pillar) {
      case 'consumption':
        return [
          {
            name: 'Food Self-Sufficiency',
            score: currentCountry.pillars.consumption.foodSelfSufficiency,
            description: 'Domestic caloric staple production & harvest stability'
          },
          {
            name: 'Energy Independence',
            score: currentCountry.pillars.consumption.energyIndependence,
            description: 'Domestic electricity generation vs gross demand'
          },
          {
            name: 'Fuel Refining Capacity',
            score: currentCountry.pillars.consumption.fuelRefiningCapacity,
            description: 'Crude refining and transport fuel autonomy'
          },
          {
            name: 'Building Materials',
            score: currentCountry.pillars.consumption.buildingMaterials,
            description: 'Cement, steel, timber, and aggregate self-reliance'
          },
          {
            name: 'Water & Sanitation',
            score: currentCountry.pillars.consumption.waterSanitationAccess,
            description: 'Freshwater aquifer security & wastewater infrastructure'
          }
        ];
      case 'employment':
        return [
          {
            name: 'Formal Employment Rate',
            score: currentCountry.pillars.employment.formalEmploymentRate,
            description: 'Share of formal contracts with social protections'
          },
          {
            name: 'Domestic Value Retention',
            score: currentCountry.pillars.employment.domesticValueRetention,
            description: 'Workforce employed by domestically owned firms'
          },
          {
            name: 'Brain Drain Retention',
            score: currentCountry.pillars.employment.brainDrainIndex,
            description: 'Retention of domestic STEM, medical, & technical talent'
          },
          {
            name: 'Labor Protections',
            score: currentCountry.pillars.employment.laborProtectionIndex,
            description: 'Legal sovereignty and enforcement of labor standards'
          },
          {
            name: 'Unemployment Resilience',
            score: currentCountry.pillars.employment.unemploymentResilience,
            description: 'Economic stability against external trade shocks'
          }
        ];
      case 'technological':
        return [
          {
            name: 'Semiconductor Fabrication',
            score: currentCountry.pillars.technological.semiconductorFab,
            description: 'Microchip, CPU, GPU, & transistor foundry capability'
          },
          {
            name: 'Frontier AI & Compute',
            score: currentCountry.pillars.technological.frontierAiCapacity,
            description: 'Sovereign foundation models & supercomputing clusters'
          },
          {
            name: 'Patent Volume & IP',
            score: currentCountry.pillars.technological.patentVolume,
            description: 'Triadic high-value patents & indigenous intellectual property'
          },
          {
            name: 'Telecom & Satellite',
            score: currentCountry.pillars.technological.telecomSovereignty,
            description: 'Domestic 5G/6G, undersea cables, and space launch control'
          },
          {
            name: 'Industrial Automation',
            score: currentCountry.pillars.technological.industrialAutomation,
            description: 'Robotics density & precision machine tooling'
          }
        ];
      case 'scientific':
        return [
          {
            name: 'Frontier Research Output',
            score: currentCountry.pillars.scientific.frontierResearchOutput,
            description: 'High-impact Nature/Science publications per capita'
          },
          {
            name: 'Higher Education Depth',
            score: currentCountry.pillars.scientific.higherEducationCapacity,
            description: 'Domestic PhD training without needing foreign education'
          },
          {
            name: 'R&D Expenditure (% GDP)',
            score: currentCountry.pillars.scientific.rdExpenditureGdp,
            description: 'Gross domestic expenditure on research and development'
          },
          {
            name: 'Scientific Infrastructure',
            score: currentCountry.pillars.scientific.scientificInfrastructure,
            description: 'Synchrotrons, superlabs, particle colliders, research vessels'
          },
          {
            name: 'STEM Graduate Pipeline',
            score: currentCountry.pillars.scientific.stemGraduatesRatio,
            description: 'Annual domestic pipeline of engineers and scientists'
          }
        ];
      case 'military':
        return [
          {
            name: 'Active & Reserve Troops',
            score: currentCountry.pillars.military.activePersonnelReserve,
            description: 'Trained combat personnel relative to territorial borders'
          },
          {
            name: 'Domestic Defense Industry',
            score: currentCountry.pillars.military.domesticDefenseIndustry,
            description: 'Indigenous design & production of tanks, ships, and aircraft'
          },
          {
            name: 'Air & Missile Defense',
            score: currentCountry.pillars.military.airDefenseMissileCapability,
            description: 'Integrated surface-to-air missile umbrellas & radar'
          },
          {
            name: 'Strategic Deterrence',
            score: currentCountry.pillars.military.strategicDeterrence,
            description: 'Nuclear triad, second-strike capability, or hypersonic deterrent'
          },
          {
            name: 'Logistical Sustainment',
            score: currentCountry.pillars.military.logisticalSelfSufficiency,
            description: 'Domestic ammunition stockpiles, fuel reserves, wartime sustainment'
          }
        ];
    }
  };

  const pillarColorMap: Record<PillarType, string> = {
    consumption: '#10b981',
    employment: '#0ea5e9',
    technological: '#6366f1',
    scientific: '#a855f7',
    military: '#f43f5e'
  };

  const pillarRankList = [
    {
      type: 'consumption' as PillarType,
      label: '1. Consumption (28%)',
      icon: Wheat,
      score: currentCountry.pillars.consumption.score
    },
    {
      type: 'employment' as PillarType,
      label: '2. Employment (25%)',
      icon: Briefcase,
      score: currentCountry.pillars.employment.score
    },
    {
      type: 'technological' as PillarType,
      label: '3. Technology (20%)',
      icon: Cpu,
      score: currentCountry.pillars.technological.score
    },
    {
      type: 'scientific' as PillarType,
      label: '4. Scientific (15%)',
      icon: FlaskConical,
      score: currentCountry.pillars.scientific.score
    },
    {
      type: 'military' as PillarType,
      label: '5. Military (12%)',
      icon: Shield,
      score: currentCountry.pillars.military.score
    }
  ];

  const countrySelectOptions: SelectOption[] = initialCountries.map((c) => ({
    value: c.id,
    label: c.name,
    flag: c.flag,
    badge: `#${c.rank}`,
    description: `Score: ${c.overallScore.toFixed(1)} • ${c.continent}`
  }));

  return (
    <div className="space-y-8">
      {/* Top Search & Country Picker Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-3xl border border-border bg-card p-4 shadow-md">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          {/* Custom Select with all 195 nations */}
          <div className="w-full sm:w-72">
            <CustomSelect
              value={currentCountry.id}
              onChange={(val) => handleSelectCountry(val)}
              options={countrySelectOptions}
              searchable={true}
              searchPlaceholder="Filter 195 nations..."
              icon={<Globe2 className="size-3.5" />}
            />
          </div>

          <div className="w-full sm:w-64">
            <CustomInput
              placeholder="Quick search by name, ISO..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
            />
          </div>
        </div>

        {/* Quick Select Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <span className="text-[11px] font-bold text-muted-foreground uppercase mr-1 whitespace-nowrap">
            Quick View:
          </span>
          {['USA', 'BRA', 'CHN', 'RUS', 'IND', 'DEU', 'JPN', 'ZAF', 'PRK', 'VAT'].map((id) => {
            const item = initialCountries.find((c) => c.id === id);
            if (!item) return null;
            const active = currentCountry.id === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleSelectCountry(id)}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg font-medium whitespace-nowrap transition-all ${
                  active
                    ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                    : 'border border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>{item.flag}</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search dropdown results if searching */}
      {searchQuery && (
        <div className="max-h-60 overflow-y-auto rounded-xl border border-border bg-card p-2 shadow-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {filteredCountries.slice(0, 16).map((c) => (
            <button
              key={c.id}
              onClick={() => {
                handleSelectCountry(c.id);
                setSearchQuery('');
              }}
              className="flex items-center justify-between p-2 rounded-lg text-left hover:bg-muted transition-colors border border-transparent hover:border-border"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-base">{c.flag}</span>
                <span className="text-xs font-semibold text-foreground truncate">{c.name}</span>
              </div>
              <span className="text-[11px] font-bold text-primary shrink-0">#{c.rank}</span>
            </button>
          ))}
        </div>
      )}

      {/* Estimate Notice Banner if applicable */}
      {currentCountry.isEstimate && (
        <EstimateBanner countryName={currentCountry.name} notice={currentCountry.estimateNotice} />
      )}

      {/* Main Country Profile Card */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-border">
          <div className="flex items-start gap-4">
            <div className="flex size-16 sm:size-20 items-center justify-center rounded-2xl bg-muted/60 text-4xl sm:text-5xl shadow-inner border border-border">
              {currentCountry.flag}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                  {currentCountry.name}
                </h1>
                <span className="rounded-lg bg-muted px-2 py-0.5 text-xs font-mono font-bold text-muted-foreground">
                  {currentCountry.id}
                </span>
                <SovereigntyBadge tier={currentCountry.tier} size="sm" />
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <Globe2 className="size-3.5 text-primary" />
                  {currentCountry.continent} &bull; {currentCountry.subregion}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="size-3.5 text-primary" />
                  {formatNumber(currentCountry.population)} citizens
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="size-3.5 text-primary" />$
                  {currentCountry.gdpNominalBillions.toLocaleString()}B GDP
                </span>
              </div>
            </div>
          </div>

          {/* Score & Ranks Badge Box */}
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-center min-w-[130px]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Overall Index
              </div>
              <div className="text-3xl font-black text-foreground">
                {currentCountry.overallScore.toFixed(1)}
              </div>
              <div className="text-[10px] text-muted-foreground">out of 100</div>
            </div>

            <div className="space-y-2">
              <div className="rounded-xl border border-border bg-muted/40 px-3 py-2 text-xs">
                <span className="text-muted-foreground">Global Rank: </span>
                <span className="font-extrabold text-foreground">#{currentCountry.rank}</span>
                <span className="text-muted-foreground"> / 195</span>
              </div>
              <div className="rounded-xl border border-border bg-muted/40 px-3 py-2 text-xs">
                <span className="text-muted-foreground">Continent Rank: </span>
                <span className="font-extrabold text-foreground">
                  #{currentCountry.continentRank}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Profile Summary */}
        <div className="py-6 border-b border-border space-y-4">
          <p className="text-sm text-foreground/90 leading-relaxed max-w-4xl">
            {currentCountry.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Strengths */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
              <div className="text-xs font-bold text-emerald-500 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="size-2 rounded-full bg-emerald-500" />
                Sovereign Strengths
              </div>
              <ul className="space-y-1.5 text-xs text-foreground/80">
                {currentCountry.keyStrengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">&bull;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vulnerabilities */}
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-2">
              <div className="text-xs font-bold text-rose-500 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="size-2 rounded-full bg-rose-500" />
                Strategic Vulnerabilities
              </div>
              <ul className="space-y-1.5 text-xs text-foreground/80">
                {currentCountry.keyVulnerabilities.map((v, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">&bull;</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Radar & Compare Link */}
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Sovereignty Profile Radar (5 Pillars)
            </h3>
            <SovereigntyRadar countries={[currentCountry]} height={320} />
          </div>

          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Pillars Summary
            </h3>
            <div className="space-y-2">
              {pillarRankList.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.type}
                    onClick={() => setActiveTab(p.type)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      activeTab === p.type
                        ? 'border-primary bg-primary/10 shadow-xs'
                        : 'border-border bg-card hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex size-8 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: `${pillarColorMap[p.type]}20`,
                          color: pillarColorMap[p.type]
                        }}
                      >
                        <Icon className="size-4" />
                      </div>
                      <span className="text-xs font-semibold text-foreground">{p.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">
                        {p.score.toFixed(1)}
                      </span>
                      <ChevronRight className="size-3.5 text-muted-foreground" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3">
              <a
                href={`${cleanBase}/compare?c1=${currentCountry.id}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl border border-primary/40 text-primary hover:bg-primary/10 transition-colors shadow-xs"
              >
                <GitCompare className="size-4" />
                Compare {currentCountry.name} with Peers
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive: 5 Submetric Pillar Explorer */}
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Detailed Pillar Submetric Breakdown
            </h3>
            <p className="text-xs text-muted-foreground">
              Explore the five underlying indicator measurements for {currentCountry.name}
            </p>
          </div>

          {/* Pillar Tabs */}
          <div className="flex flex-wrap items-center gap-1 rounded-xl bg-muted p-1">
            {pillarRankList.map((p) => {
              const active = activeTab === p.type;
              return (
                <button
                  key={p.type}
                  type="button"
                  onClick={() => setActiveTab(p.type)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    active
                      ? 'bg-card text-foreground shadow-xs font-bold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {p.type.charAt(0).toUpperCase() + p.type.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Pillar Card & Bar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-border bg-muted/30 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Active Pillar Score
                </span>
                <span className="text-xs font-bold text-primary">
                  {currentCountry.pillars[activeTab].score.toFixed(1)} / 100
                </span>
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed">
                {currentCountry.pillars[activeTab].description}
              </p>
              <div className="pt-2 text-[11px] text-muted-foreground border-t border-border">
                Methodology Weight Contribution:{' '}
                <strong className="text-foreground">
                  {(currentCountry.pillars[activeTab].weight * 100).toFixed(0)}%
                </strong>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <PillarBarChart
              data={getSubmetricsData(activeTab)}
              color={pillarColorMap[activeTab]}
              height={260}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CountryDashboard;
