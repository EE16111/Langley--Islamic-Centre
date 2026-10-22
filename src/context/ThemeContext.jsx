import React, { createContext, useContext, useState, useEffect } from 'react';

const THEME_STORAGE_KEY = 'lic_frontend_theme_v1';

export const THEMES = {
  DARK: 'dark',       // Sanctuary Obsidian Basalt & Antique Gold Leaf
  LIGHT: 'light',     // Sheikh Zayed Grand Mosque Pristine Marble & Alabaster
  AMBIENT: 'ambient'  // Sacred Sapphire Twilight & Andalusian Lantern Amber
};

const ThemeContext = createContext({
  theme: THEMES.DARK,
  setTheme: () => {},
  toggleTheme: () => {}
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved && Object.values(THEMES).includes(saved)) {
        return saved;
      }
    }
    return THEMES.DARK;
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.setAttribute('data-theme', theme);
    body.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Apply appropriate class on root for Tailwind dark mode compat if needed
    if (theme === THEMES.LIGHT) {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  }, [theme]);

  const setTheme = (newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setThemeState(newTheme);
    }
  };

  const toggleTheme = () => {
    setThemeState((prev) => {
      if (prev === THEMES.DARK) return THEMES.LIGHT;
      if (prev === THEMES.LIGHT) return THEMES.AMBIENT;
      return THEMES.DARK;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
