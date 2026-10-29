import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface SubmetricItem {
  name: string;
  score: number;
  description?: string;
}

interface PillarBarChartProps {
  data: SubmetricItem[];
  color?: string;
  height?: number;
}

export const PillarBarChart: React.FC<PillarBarChartProps> = ({
  data,
  color = '#38bdf8',
  height = 220
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} strokeOpacity={0.15} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: 'currentColor', opacity: 0.7 }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={140}
            tick={{ fontSize: 11, fill: 'currentColor' }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload as SubmetricItem;
                return (
                  <div className="rounded-xl border border-border bg-card p-2.5 shadow-lg text-xs space-y-1">
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-primary font-bold">{item.score} / 100</p>
                    {item.description && (
                      <p className="text-muted-foreground text-[11px] max-w-xs">
                        {item.description}
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="score" radius={[0, 6, 6, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={color}
                fillOpacity={0.8 + (entry.score / 100) * 0.2}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PillarBarChart;
