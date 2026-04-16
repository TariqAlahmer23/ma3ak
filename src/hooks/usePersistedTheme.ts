import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export function usePersistedTheme(): 'light' | 'dark' {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('ma3ak_theme', theme);
  }, [theme]);

  return theme;
}
