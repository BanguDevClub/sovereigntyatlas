import React from 'react';
import { getTierColor, getScoreBadgeColor } from '../../lib/utils';

interface SovereigntyBadgeProps {
  score?: number;
  tier?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const SovereigntyBadge: React.FC<SovereigntyBadgeProps> = ({
  score,
  tier,
  size = 'md',
  showLabel = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1.5'
  }[size];

  if (tier) {
    const tierClasses = getTierColor(tier);
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${tierClasses} ${sizeClasses} ${className}`}
      >
        <span className="size-1.5 rounded-full bg-current opacity-80" />
        {tier}
      </span>
    );
  }

  if (score !== undefined) {
    const scoreClasses = getScoreBadgeColor(score);
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full border font-bold ${scoreClasses} ${sizeClasses} ${className}`}
      >
        {score.toFixed(1)}
        {showLabel && <span className="text-[10px] opacity-75 font-normal">/ 100</span>}
      </span>
    );
  }

  return null;
};

export default SovereigntyBadge;
