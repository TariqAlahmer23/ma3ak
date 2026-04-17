import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        text: 'rgb(var(--text) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        accentSoft: 'rgb(var(--accent-soft) / <alpha-value>)',
        cyan: 'rgb(var(--cyan) / <alpha-value>)',
        violet: 'rgb(var(--violet) / <alpha-value>)',
        coral: 'rgb(var(--coral) / <alpha-value>)'
      },
      boxShadow: {
        velvet: '0 28px 64px -30px rgba(0, 0, 0, 0.82), 0 14px 32px -22px rgba(29,191,115,0.16)',
        glow: '0 0 0 1px rgba(52,211,153,0.12), 0 18px 44px -20px rgba(23,169,101,0.42)'
      },
      borderRadius: {
        xl2: '1.2rem'
      },
      fontFamily: {
        heading: ['Inter', 'Alexandria', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'Alexandria', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        arabic: ['Alexandria', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at 14% 0%, rgba(29,191,115,0.2), transparent 34%), radial-gradient(circle at 85% 85%, rgba(52,211,153,0.12), transparent 30%), radial-gradient(circle at 60% 25%, rgba(24,56,43,0.32), transparent 35%)'
      }
    }
  },
  plugins: []
} satisfies Config;
