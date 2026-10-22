import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme, THEMES } from '../context/ThemeContext';

export default function ThemeSwitcher({ variant = 'navbar' }) {
  const { theme, setTheme, toggleTheme } = useTheme();

  const themes = [
    {
      id: THEMES.DARK,
      label: 'Dark Sanctuary',
      shortLabel: 'Dark',
      icon: Moon,
      desc: 'Obsidian Basalt & Antique Gold'
    },
    {
      id: THEMES.LIGHT,
      label: 'Marble Light',
      shortLabel: 'Light',
      icon: Sun,
      desc: 'Pristine White Marble & Champagne'
    },
    {
      id: THEMES.AMBIENT,
      label: 'Twilight Ambient',
      shortLabel: 'Ambient',
      icon: Palette,
      desc: 'Sapphire Twilight & Amber'
    }
  ];

  if (variant === 'floating') {
    return (
      <div className="fixed left-4 bottom-6 z-40 print:hidden">
        <div className="p-1 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center gap-1">
          {themes.map((t) => {
            const Icon = t.icon;
            const isActive = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                title={`${t.label}: ${t.desc}`}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-[#c5a059] text-[#080b10] shadow-md scale-105'
                    : 'text-stone-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Compact Navbar Switcher (Single click cycle to keep navbar clean)
  const currentThemeObj = themes.find(t => t.id === theme) || themes[0];
  const CurrentIcon = currentThemeObj.icon;

  return (
    <button
      onClick={toggleTheme}
      title={`Current: ${currentThemeObj.label}. Click to cycle themes.`}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-serif bg-white/5 hover:bg-white/10 border border-white/15 text-stone-300 hover:text-white transition-all shadow-sm"
      aria-label="Toggle website theme"
    >
      <CurrentIcon className="w-3.5 h-3.5 text-[#dfb76c]" />
      <span className="hidden xl:inline">{currentThemeObj.shortLabel}</span>
    </button>
  );
}
