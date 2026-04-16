import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        accentSoft: 'var(--accent-soft)',
        cyan: 'var(--cyan)',
        violet: 'var(--violet)',
        coral: 'var(--coral)'
      },
      boxShadow: {
        velvet: '0 26px 60px -26px rgba(2, 8, 23, 0.85)',
        glow: '0 0 0 1px rgba(59,130,246,0.2), 0 14px 48px -22px rgba(34,211,238,0.45)'
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
        mesh: 'radial-gradient(circle at 14% 0%, rgba(59,130,246,0.24), transparent 34%), radial-gradient(circle at 85% 85%, rgba(34,211,238,0.18), transparent 30%), radial-gradient(circle at 60% 25%, rgba(139,92,246,0.16), transparent 35%)'
      }
    }
  },
  plugins: []
} satisfies Config;
