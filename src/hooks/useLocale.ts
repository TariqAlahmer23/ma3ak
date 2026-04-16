import { useEffect } from 'react';
import i18n from '@/i18n';
import { useAppStore } from '@/store/useAppStore';

export function useLocale() {
  const locale = useAppStore((s) => s.locale);

  useEffect(() => {
    void i18n.changeLanguage(locale);
    localStorage.setItem('ma3ak_locale', locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  return locale;
}
