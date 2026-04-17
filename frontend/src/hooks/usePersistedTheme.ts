import { useEffect } from 'react';

export function usePersistedTheme(): 'dark' {
  const theme = 'dark';

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', '#0B1411');
    }
    localStorage.setItem('ma3ak_theme', theme);
  }, [theme]);

  return theme;
}
