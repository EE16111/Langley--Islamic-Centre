import React from 'react';
import { Sun, Moon, Sparkles, Check } from 'lucide-react';
import { useTheme, THEMES } from '../context/ThemeContext';

export default function ThemeSwitcher({ variant = 'navbar' }) {
  const { theme, setTheme } = useTheme();

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
      label: 'SZGMC Marble',
      shortLabel: 'Light',
      icon: Sun,
      desc: 'Pristine White Marble & Champagne'
    },
    {
      id: THEMES.AMBIENT,
      label: 'Twilight Courtyard',
      shortLabel: 'Ambient',
      icon: Sparkles,
      desc: 'Mystic Sapphire & Lantern Amber'
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

  // Default Navbar pill
  return (
    <div className="inline-flex items-center p-0.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md">
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = theme === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            title={`${t.label} • ${t.desc}`}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-serif transition-all duration-300 ${
              isActive
                ? 'bg-[#c5a059] text-[#080b10] font-bold shadow-sm'
                : 'text-stone-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
