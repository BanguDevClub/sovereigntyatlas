import React, { useEffect, useState } from 'react';
import { Palette, Check } from 'lucide-react';
import type { ThemeName } from '../../lib/types';

interface ThemeOption {
  id: ThemeName;
  label: string;
  category: 'Standard' | 'Catppuccin';
  colors: string[];
}

const THEMES: ThemeOption[] = [
  {
    id: 'dark',
    label: 'Dark Modern',
    category: 'Standard',
    colors: ['#090d16', '#38bdf8', '#1e293b']
  },
  {
    id: 'light',
    label: 'Light Clean',
    category: 'Standard',
    colors: ['#f8fafc', '#0284c7', '#e2e8f0']
  },
  {
    id: 'catppuccin-latte',
    label: 'Catppuccin Latte',
    category: 'Catppuccin',
    colors: ['#eff1f5', '#1e66f5', '#7287fd']
  },
  {
    id: 'catppuccin-frappe',
    label: 'Catppuccin Frappé',
    category: 'Catppuccin',
    colors: ['#303446', '#8caaee', '#babbf1']
  },
  {
    id: 'catppuccin-macchiato',
    label: 'Catppuccin Macchiato',
    category: 'Catppuccin',
    colors: ['#24273a', '#8aadf4', '#b7bdf8']
  },
  {
    id: 'catppuccin-mocha',
    label: 'Catppuccin Mocha',
    category: 'Catppuccin',
    colors: ['#1e1e2e', '#89b4fa', '#cba6f7']
  }
];

export const ThemeSelector: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('dark');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sa-theme') as ThemeName;
    if (saved && THEMES.some((t) => t.id === saved)) {
      applyTheme(saved);
      setCurrentTheme(saved);
    } else {
      applyTheme('dark');
    }
  }, []);

  const applyTheme = (theme: ThemeName) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'light' || theme === 'catppuccin-latte') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
    localStorage.setItem('sa-theme', theme);
  };

  const handleSelect = (theme: ThemeName) => {
    applyTheme(theme);
    setCurrentTheme(theme);
    setIsOpen(false);
  };

  const currentOption = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-border bg-card hover:bg-muted text-foreground transition-all shadow-xs"
        aria-label="Switch Theme"
      >
        <Palette className="w-3.5 h-3.5 text-primary" />
        <span className="hidden sm:inline">{currentOption.label}</span>
        <div className="flex -space-x-1">
          {currentOption.colors.map((c, i) => (
            <span
              key={i}
              className="inline-block w-2.5 h-2.5 rounded-full border border-background shadow-xs"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card p-1.5 shadow-xl z-50 animate-in fade-in zoom-in-95">
            <div className="px-2 py-1 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              Select Theme (6 Presets)
            </div>
            <div className="flex flex-col gap-1 mt-1">
              {THEMES.map((theme) => {
                const isSelected = theme.id === currentTheme;
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleSelect(theme.id)}
                    className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                      isSelected
                        ? 'bg-primary/15 text-primary font-semibold'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        {theme.colors.map((c, idx) => (
                          <span
                            key={idx}
                            className="inline-block w-3 h-3 rounded-full border border-background shadow-xs"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <span>{theme.label}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;
