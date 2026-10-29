export type PillarType = 'consumption' | 'employment' | 'technological' | 'scientific' | 'military';

export type Continent = 'Africa' | 'Asia' | 'Europe' | 'North America' | 'South America' | 'Oceania';

export type ThemeName = 'light' | 'dark' | 'catppuccin-latte' | 'catppuccin-frappe' | 'catppuccin-macchiato' | 'catppuccin-mocha';

export interface ConsumptionPillar {
  score: number;
  weight: number;
  foodSelfSufficiency: number;
  energyIndependence: number;
  fuelRefiningCapacity: number;
  buildingMaterials: number;
  waterSanitationAccess: number;
  description: string;
}

export interface EmploymentPillar {
  score: number;
  weight: number;
  formalEmploymentRate: number;
  domesticValueRetention: number;
  brainDrainIndex: number;
  laborProtectionIndex: number;
  unemploymentResilience: number;
  description: string;
}

export interface TechnologicalPillar {
  score: number;
  weight: number;
  semiconductorFab: number;
  frontierAiCapacity: number;
  patentVolume: number;
  telecomSovereignty: number;
  industrialAutomation: number;
  description: string;
}

export interface ScientificPillar {
  score: number;
  weight: number;
  frontierResearchOutput: number;
  higherEducationCapacity: number;
  rdExpenditureGdp: number;
  scientificInfrastructure: number;
  stemGraduatesRatio: number;
  description: string;
}

export interface MilitaryPillar {
  score: number;
  weight: number;
  activePersonnelReserve: number;
  domesticDefenseIndustry: number;
  airDefenseMissileCapability: number;
  strategicDeterrence: number;
  logisticalSelfSufficiency: number;
  description: string;
}

export interface Pillars {
  consumption: ConsumptionPillar;
  employment: EmploymentPillar;
  technological: TechnologicalPillar;
  scientific: ScientificPillar;
  military: MilitaryPillar;
}

export interface Country {
  id: string;
  name: string;
  iso2: string;
  flag: string;
  continent: Continent;
  subregion: string;
  capital: string;
  population: number;
  gdpNominalBillions: number;
  overallScore: number;
  tier: string;
  dataQuality: string;
  isEstimate: boolean;
  estimateNotice: string;
  summary: string;
  keyStrengths: string[];
  keyVulnerabilities: string[];
  pillars: Pillars;
  rank: number;
  continentRank: number;
}

export interface Metadata {
  title: string;
  version: string;
  author: string;
  license: string;
  totalCountries: number;
  year: number;
  weights: {
    consumption: number;
    employment: number;
    technological: number;
    scientific: number;
    military: number;
  };
  weightRank: string[];
  pillarsDocumentation: Record<string, {
    rank: number;
    weight: number;
    name: string;
    submetrics: string[];
  }>;
}

export interface AtlasData {
  metadata: Metadata;
  countries: Country[];
}
