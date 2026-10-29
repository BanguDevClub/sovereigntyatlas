import datasetRaw from '../data/sovereignty_atlas_2025.json';
import type { AtlasData, Country, Continent, PillarType, ContinentSummary } from './types';
export type { ContinentSummary };

export const atlasData = datasetRaw as unknown as AtlasData;

export function getAllCountries(): Country[] {
  return atlasData.countries;
}

export function getCountryById(id: string): Country | undefined {
  if (!id) return undefined;
  const upper = id.toUpperCase();
  return atlasData.countries.find(
    (c) => c.id === upper || c.iso2 === upper || c.name.toLowerCase() === id.toLowerCase()
  );
}

export function getTopCountries(limit = 10): Country[] {
  return atlasData.countries.slice(0, limit);
}

export function getTopByPillar(pillar: PillarType, limit = 5): Country[] {
  return [...atlasData.countries]
    .sort((a, b) => b.pillars[pillar].score - a.pillars[pillar].score)
    .slice(0, limit);
}

export function getCountriesByContinent(continent: Continent): Country[] {
  return atlasData.countries.filter((c) => c.continent === continent);
}

export function getContinentsSummary(): ContinentSummary[] {
  const continents: Continent[] = [
    'Africa',
    'Asia',
    'Europe',
    'North America',
    'South America',
    'Oceania'
  ];

  return continents.map((name) => {
    const list = getCountriesByContinent(name);
    const count = list.length;
    const avgScore = Number((list.reduce((acc, c) => acc + c.overallScore, 0) / count).toFixed(1));
    const avgConsumption = Number(
      (list.reduce((acc, c) => acc + c.pillars.consumption.score, 0) / count).toFixed(1)
    );
    const avgEmployment = Number(
      (list.reduce((acc, c) => acc + c.pillars.employment.score, 0) / count).toFixed(1)
    );
    const avgTechnological = Number(
      (list.reduce((acc, c) => acc + c.pillars.technological.score, 0) / count).toFixed(1)
    );
    const avgScientific = Number(
      (list.reduce((acc, c) => acc + c.pillars.scientific.score, 0) / count).toFixed(1)
    );
    const avgMilitary = Number(
      (list.reduce((acc, c) => acc + c.pillars.military.score, 0) / count).toFixed(1)
    );
    const totalPopulation = list.reduce((acc, c) => acc + c.population, 0);
    const totalGdp = Number(list.reduce((acc, c) => acc + c.gdpNominalBillions, 0).toFixed(1));

    const sorted = [...list].sort((a, b) => b.overallScore - a.overallScore);
    const topCountry = sorted[0];
    const lowestCountry = sorted[sorted.length - 1];

    return {
      name,
      count,
      avgScore,
      topCountry,
      lowestCountry,
      avgConsumption,
      avgEmployment,
      avgTechnological,
      avgScientific,
      avgMilitary,
      totalPopulation,
      totalGdp
    };
  });
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(0) + 'K';
  }
  return num.toLocaleString();
}
