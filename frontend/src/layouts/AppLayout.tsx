import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';
import { DesktopTopNav } from '@/components/navigation/DesktopTopNav';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';
import { useLocale } from '@/hooks/useLocale';
import { usePersistedTheme } from '@/hooks/usePersistedTheme';
import { useAppStore } from '@/store/useAppStore';

const mobileHeaderBubbles = [
  { left: '10%', top: '26%', size: 8, delay: 0 },
  { left: '36%', top: '74%', size: 6, delay: 0.8 },
  { left: '62%', top: '20%', size: 7, delay: 1.5 },
  { left: '88%', top: '68%', size: 6, delay: 2.1 }
];

export function AppLayout() {
  const { t } = useTranslation();
  const location = useLocation();
  const isLanding = location.pathname === '/landing';
  const isMap = location.pathname === '/home';
  usePersistedTheme();
  const locale = useLocale();
  const setLocale = useAppStore((s) => s.setLocale);

  return (
    <div
      className={
        isMap
          ? 'relative h-[100dvh] w-full'
          : 'mx-auto min-h-full max-w-7xl px-4 pb-28 pt-4 md:px-6 md:pb-10'
      }
    >
      {!isLanding ? (
        <div className={isMap ? 'pointer-events-none fixed left-0 right-0 top-0 z-50 hidden px-4 pt-4 md:block md:px-6' : 'mb-6 hidden md:block md:mb-8'}>
          <div className={isMap ? 'pointer-events-auto' : ''}>
            <DesktopTopNav />
          </div>
        </div>
      ) : null}

      {!isLanding && !isMap ? (
        <div className="md:hidden">
          <header className="nav-shell relative mb-6 overflow-hidden rounded-[1.6rem] px-4 py-3">
            {mobileHeaderBubbles.map((bubble, index) => (
              <motion.span
                key={`${bubble.left}-${index}`}
                aria-hidden
                className="pointer-events-none absolute rounded-full"
                style={{
                  left: bubble.left,
                  top: bubble.top,
                  width: bubble.size,
                  height: bubble.size,
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.78), rgba(52,211,153,.36) 58%, rgba(52,211,153,0))',
                  boxShadow: '0 0 10px rgba(52,211,153,.18)'
                }}
                animate={{ y: [0, -4, 0], opacity: [0.24, 0.58, 0.24] }}
                transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut', delay: bubble.delay }}
              />
            ))}

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/MA3AK.png" alt="MA3AK logo" className="h-11 w-11 rounded-2xl object-cover shadow-sm ring-1 ring-white/10" />
                <div>
                  <p className="font-heading text-lg tracking-[0.16em] text-text">{t('appName')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
                  className="nav-pill rounded-2xl px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                >
                  {locale.toUpperCase()}
                </button>
              </div>
            </div>
          </header>
        </div>
      ) : null}

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className={isMap ? 'relative h-[100dvh] w-full' : 'mx-auto max-w-6xl'}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      {!isLanding ? <MobileBottomNav /> : null}
    </div>
  );
}
