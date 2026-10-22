/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lic: {
          blue: {
            DEFAULT: '#065c95',
            dark: '#033b63',
            deep: '#02243d',
            light: '#0a75bc',
            hover: '#084b7a'
          },
          cyan: {
            DEFAULT: '#02a3e2',
            dark: '#0285b9',
            light: '#38bdf8',
            glow: '#7dd3fc',
            muted: '#e0f2fe'
          },
          gold: {
            DEFAULT: '#d97706',
            light: '#f59e0b',
            accent: '#fbbf24',
            dark: '#b45309'
          },
          emerald: {
            DEFAULT: '#059669',
            light: '#10b981',
            dark: '#047857'
          },
          night: {
            DEFAULT: '#090e17',
            surface: '#0f172a',
            card: '#131e36',
            border: '#1e293b'
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['Amiri', 'Traditional Arabic', 'serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif']
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(2, 163, 226, 0.4)',
        'glow-blue': '0 0 35px -5px rgba(6, 92, 149, 0.5)',
        'glow-gold': '0 0 25px -5px rgba(245, 158, 11, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
