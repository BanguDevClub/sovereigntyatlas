import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

interface EstimateBannerProps {
  countryName: string;
  notice?: string;
  className?: string;
}

export const EstimateBanner: React.FC<EstimateBannerProps> = ({
  countryName,
  notice,
  className = ''
}) => {
  return (
    <div
      role="alert"
      className={`relative overflow-hidden rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-4 text-foreground shadow-xs ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-500 ring-1 ring-amber-500/30">
          <AlertTriangle className="size-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-amber-500 tracking-tight">
              Statistical Estimative Notice &bull; {countryName}
            </h4>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400">
              <Info className="size-3" />
              Secondary / Modeled Proxy
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {notice ||
              `Primary national reporting for ${countryName} is constrained by statistical restrictions, microstate opacity, or regional conflict. Sovereignty Atlas scores for this country represent econometric estimates derived from mirror trade flows, international multilateral databases (IMF, FAO, SIPRI, World Bank), and partner proxy indicators.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EstimateBanner;
