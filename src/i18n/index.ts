import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ar } from './ar';
import { en } from './en';

const saved = localStorage.getItem('ma3ak_locale');
const lng = saved === 'ar' || saved === 'en' ? saved : 'en';

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar }
  },
  lng,
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
