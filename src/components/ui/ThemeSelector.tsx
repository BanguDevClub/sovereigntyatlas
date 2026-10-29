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
    colors: ['#080c14', '#38bdf8', '#0f172a']
  },
  {
    id: 'light',
    label: 'Light Clean',
    category: 'Standard',
    colors: ['#f8fafc', '#0284c7', '#ffffff']
  },
  {
    id: 'catppuccin-latte',
    label: 'Catppuccin Latte',
    category: 'Catppuccin',
    colors: ['#eff1f5', '#1e66f5', '#ffffff']
  },
  {
    id: 'catppuccin-frappe',
    label: 'Catppuccin Frappé',
    category: 'Catppuccin',
    colors: ['#232634', '#8caaee', '#303446']
  },
  {
    id: 'catppuccin-macchiato',
    label: 'Catppuccin Macchiato',
    category: 'Catppuccin',
    colors: ['#181926', '#8aadf4', '#24273a']
  },
  {
    id: 'catppuccin-mocha',
    label: 'Catppuccin Mocha',
    category: 'Catppuccin',
    colors: ['#11111b', '#89b4fa', '#1e1e2e']
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

  const standardThemes = THEMES.filter((t) => t.category === 'Standard');
  const catppuccinThemes = THEMES.filter((t) => t.category === 'Catppuccin');

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl border border-border/80 bg-card hover:bg-muted/80 text-foreground transition-all shadow-xs cursor-pointer select-none"
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
          <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-border bg-card/95 backdrop-blur-md p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
            {/* Standard Themes */}
            <div className="px-2 py-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
              Standard Themes
            </div>
            <div className="space-y-0.5 mb-2">
              {standardThemes.map((theme) => {
                const isSelected = theme.id === currentTheme;
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleSelect(theme.id)}
                    className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                      isSelected
                        ? 'bg-primary/15 text-primary font-bold shadow-xs'
                        : 'text-foreground hover:bg-muted/80'
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

            {/* Catppuccin Themes */}
            <div className="pt-1.5 border-t border-border/70">
              <div className="px-2 py-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase flex items-center justify-between">
                <span>Catppuccin Flavors</span>
                <span className="text-[9px] font-mono text-primary font-bold">4 Variants</span>
              </div>
              <div className="space-y-0.5 mt-0.5">
                {catppuccinThemes.map((theme) => {
                  const isSelected = theme.id === currentTheme;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => handleSelect(theme.id)}
                      className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                        isSelected
                          ? 'bg-primary/15 text-primary font-bold shadow-xs'
                          : 'text-foreground hover:bg-muted/80'
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
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;
