import { AnimatePresence, motion } from 'framer-motion';
import { MoonStar, SunMedium } from 'lucide-react';
import { Outlet, useLocation } from 'react-router-dom';
import { DesktopTopNav } from '@/components/navigation/DesktopTopNav';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';
import { useLocale } from '@/hooks/useLocale';
import { usePersistedTheme } from '@/hooks/usePersistedTheme';
import { useAppStore } from '@/store/useAppStore';

export function AppLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/landing';
  const isMap = location.pathname === '/home';

  const theme = usePersistedTheme();
  const locale = useLocale();
  const setTheme = useAppStore((s) => s.setTheme);
  const setLocale = useAppStore((s) => s.setLocale);

  return (
    <div
      className={
        isMap
          ? 'relative min-h-screen'
          : 'mx-auto min-h-full max-w-7xl px-3 pb-28 pt-4 md:px-6 md:pb-10'
      }
    >
      {!isLanding ? (
        <div className={isMap ? 'pointer-events-none fixed inset-x-3 top-4 z-50 hidden md:block md:inset-x-6' : 'mb-6 md:mb-8'}>
          <div className={isMap ? 'pointer-events-auto' : ''}>
            <DesktopTopNav />
          </div>
        </div>
      ) : null}

      {!isLanding ? (
        <header className={`premium-card-soft flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 backdrop-blur-xl md:hidden ${isMap ? 'fixed inset-x-3 top-4 z-50' : 'mb-6'}`}>
          <div className="flex items-center gap-3">
            <img src="/MA3AK.png" alt="MA3AK logo" className="h-11 w-11 rounded-xl object-cover shadow-sm ring-1 ring-white/10" />
            <div>
              <p className="font-heading text-lg text-text">MA3AK</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
              className="premium-btn-secondary rounded-xl px-2 py-1 text-xs"
            >
              {locale.toUpperCase()}
            </button>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="premium-btn-secondary rounded-xl p-2"
            >
              {theme === 'light' ? <MoonStar size={16} /> : <SunMedium size={16} />}
            </button>
          </div>
        </header>
      ) : null}

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className={isMap ? 'h-screen w-screen' : isLanding ? 'mx-auto max-w-6xl' : 'mx-auto max-w-6xl'}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      {!isLanding ? <MobileBottomNav /> : null}
    </div>
  );
}
