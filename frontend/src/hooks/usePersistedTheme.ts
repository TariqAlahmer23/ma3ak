import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export function usePersistedTheme(): 'light' | 'dark' {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#0b1020' : '#f5f7fb');
    }
    localStorage.setItem('ma3ak_theme', theme);
  }, [theme]);

  return theme;
}
