import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import type { Country } from '../../lib/types';

interface SovereigntyRadarProps {
  countries: Country[];
  height?: number;
}

const COLORS = ['#38bdf8', '#f43f5e', '#10b981', '#f59e0b', '#a855f7'];

export const SovereigntyRadar: React.FC<SovereigntyRadarProps> = ({
  countries,
  height = 360
}) => {
  if (!countries || countries.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        Select a country to view radar chart
      </div>
    );
  }

  const radarData = [
    {
      pillar: '1. Consumption (28%)',
      ...countries.reduce((acc, c) => ({ ...acc, [c.name]: c.pillars.consumption.score }), {})
    },
    {
      pillar: '2. Employment (25%)',
      ...countries.reduce((acc, c) => ({ ...acc, [c.name]: c.pillars.employment.score }), {})
    },
    {
      pillar: '3. Technological (20%)',
      ...countries.reduce((acc, c) => ({ ...acc, [c.name]: c.pillars.technological.score }), {})
    },
    {
      pillar: '4. Scientific (15%)',
      ...countries.reduce((acc, c) => ({ ...acc, [c.name]: c.pillars.scientific.score }), {})
    },
    {
      pillar: '5. Military (12%)',
      ...countries.reduce((acc, c) => ({ ...acc, [c.name]: c.pillars.military.score }), {})
    }
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
            <PolarGrid stroke="currentColor" strokeOpacity={0.15} />
            <PolarAngleAxis
              dataKey="pillar"
              tick={{ fill: 'currentColor', fontSize: 11, fontWeight: 500 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: 'currentColor', fontSize: 9, opacity: 0.6 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-xl border border-border bg-card p-3 shadow-xl text-xs space-y-1.5">
                      <p className="font-semibold text-foreground border-b border-border pb-1">
                        {payload[0]?.payload?.pillar}
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
            {countries.map((c, idx) => (
              <Radar
                key={c.id}
                name={c.name}
                dataKey={c.name}
                stroke={COLORS[idx % COLORS.length]}
                fill={COLORS[idx % COLORS.length]}
                fillOpacity={countries.length === 1 ? 0.35 : 0.2}
                strokeWidth={2}
              />
            ))}
            {countries.length > 1 && <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />}
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SovereigntyRadar;
