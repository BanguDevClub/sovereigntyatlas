import React, { useState } from 'react';
import {
  Globe,
  LayoutDashboard,
  MapPin,
  Trophy,
  GitCompare,
  Sliders,
  BookOpen,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';
import { ThemeSelector } from '../ui/ThemeSelector';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'size-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);


interface HeaderProps {
  currentPath?: string;
  base?: string;
}

export const Header: React.FC<HeaderProps> = ({ currentPath = '', base = '/sovereigntyatlas' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;

  const navLinks = [
    { href: `${cleanBase}/`, label: 'Overview', icon: Globe },
    { href: `${cleanBase}/dashboard`, label: 'Dashboard', icon: LayoutDashboard },
    { href: `${cleanBase}/continents`, label: 'Continents', icon: MapPin },
    { href: `${cleanBase}/ranking`, label: 'Ranking', icon: Trophy },
    { href: `${cleanBase}/compare`, label: 'Compare', icon: GitCompare },
    { href: `${cleanBase}/sandbox`, label: 'Sandbox', icon: Sliders },
    { href: `${cleanBase}/methodology`, label: 'Methodology', icon: BookOpen }
  ];

  const isActive = (href: string) => {
    const cleanPath = currentPath.endsWith('/') && currentPath !== `${cleanBase}/` ? currentPath.slice(0, -1) : currentPath;
    const target = href.endsWith('/') && href !== `${cleanBase}/` ? href.slice(0, -1) : href;
    return cleanPath === target;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-card/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <a
            href={`${cleanBase}/`}
            className="flex items-center gap-2.5 group transition-transform active:scale-95"
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-xs">
              <Globe className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-foreground text-base">
                  Sovereignty<span className="text-primary font-black">Atlas</span>
                </span>
                <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary tracking-wide">
                  2025
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground hidden sm:block -mt-0.5">
                by BanguDevClub &bull; MIT Open Source
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    active
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="size-3.5" />
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <ThemeSelector />

          <a
            href="https://github.com/BanguDevClub/sovereigntyatlas"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border bg-card hover:bg-muted text-foreground transition-all shadow-xs"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="size-4" />
            <span>GitHub</span>
            <ExternalLink className="size-3 text-muted-foreground" />
          </a>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden size-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-card px-4 py-3 space-y-1 animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? 'bg-primary/15 text-primary font-semibold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="size-4" />
                {link.label}
              </a>
            );
          })}
          <div className="pt-2 border-t border-border mt-2">
            <a
              href="https://github.com/BanguDevClub/sovereigntyatlas"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold rounded-lg border border-border bg-muted/50 hover:bg-muted text-foreground"
            >
              <GithubIcon className="size-4" />
              View on GitHub (BanguDevClub)
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
