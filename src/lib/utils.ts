import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTierColor(tier: string): string {
  switch (tier) {
    case 'Sovereign Superpower':
      return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
    case 'High Sovereignty':
      return 'text-sky-500 bg-sky-500/10 border-sky-500/30';
    case 'Moderate Sovereignty':
      return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
    case 'Vulnerable Sovereignty':
      return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
    case 'Severely Dependent':
      return 'text-rose-500 bg-rose-500/10 border-rose-500/30';
    default:
      return 'text-muted-foreground bg-muted border-border';
  }
}

export function getScoreBadgeColor(score: number): string {
  if (score >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  if (score >= 68) return 'text-sky-400 bg-sky-500/10 border-sky-500/30';
  if (score >= 52) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  if (score >= 38) return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
  return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
}
