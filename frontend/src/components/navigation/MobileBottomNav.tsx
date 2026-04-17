import { motion } from 'framer-motion';
import { Map, MessageCircle, Sparkles, UserCircle2, Users2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const nav = [
  { to: '/home', icon: Map, labelKey: 'map' },
  { to: '/sessions', icon: Users2, labelKey: 'sessions' },
  { to: '/match', icon: Sparkles, labelKey: 'match' },
  { to: '/messages', icon: MessageCircle, labelKey: 'messages' },
  { to: '/profile/you', icon: UserCircle2, labelKey: 'profile' }
];

const dockBubbles = [
  { left: '12%', top: '20%', size: 8, delay: 0 },
  { left: '28%', top: '72%', size: 7, delay: 0.8 },
  { left: '72%', top: '18%', size: 7, delay: 1.5 },
  { left: '88%', top: '68%', size: 8, delay: 2.1 }
];

export function MobileBottomNav() {
  const { t } = useTranslation();
  const sideItems = nav.filter((item) => item.to !== '/home');

  return (
    <>
      <NavLink
        to="/home"
        aria-label={t('map')}
        className="fixed bottom-[calc(1.45rem+env(safe-area-inset-bottom))] left-1/2 z-50 flex h-[4rem] w-[4rem] -translate-x-1/2 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 md:hidden"
      >
        {({ isActive }) => (
          <motion.div
            whileTap={{ scale: 0.96 }}
            animate={
              isActive
                ? {
                    y: [0, -2, 0],
                    boxShadow: [
                      '0 14px 24px rgba(3,12,10,.18)',
                      '0 18px 28px rgba(29,191,115,.2)',
                      '0 14px 24px rgba(3,12,10,.18)'
                    ]
                  }
                : { y: 0 }
            }
            transition={{ duration: 2.6, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
            className={`relative inline-flex h-[3.45rem] w-[3.45rem] items-center justify-center rounded-full border transition ${
              isActive
                ? 'border-white/16 bg-[linear-gradient(160deg,#22b86f,#178a58)] text-white shadow-[0_14px_28px_rgba(0,0,0,.22)]'
                : 'border-white/12 bg-white/10 text-text'
            }`}
          >
            <span className="absolute inset-[4px] rounded-full border border-white/18" />
            <Map size={20} className="relative z-10" />
          </motion.div>
        )}
      </NavLink>

      <nav className="fixed inset-x-0 bottom-0 z-40 md:hidden" aria-label="Primary">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
          className="relative mx-auto max-w-lg overflow-hidden rounded-t-[1.55rem] border-x border-t border-white/10 bg-[linear-gradient(180deg,rgba(14,22,19,.76),rgba(8,14,12,.9))] px-4 pb-[calc(0.58rem+env(safe-area-inset-bottom))] pt-1 shadow-[0_-6px_18px_rgba(0,0,0,.12)] backdrop-blur-[22px]"
        >
          {dockBubbles.map((bubble, index) => (
            <motion.span
              key={`${bubble.left}-${index}`}
              aria-hidden
              className="pointer-events-none absolute rounded-full"
              style={{
                left: bubble.left,
                top: bubble.top,
                width: bubble.size,
                height: bubble.size,
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255,255,255,.78), rgba(52,211,153,.34) 58%, rgba(52,211,153,0))',
                boxShadow: '0 0 14px rgba(52,211,153,.18)'
              }}
              animate={{ y: [0, -4, 0], opacity: [0.18, 0.48, 0.18] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: bubble.delay }}
            />
          ))}

          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/22 to-transparent" />

          <div className="relative z-10 grid grid-cols-[1fr_1fr_3rem_1fr_1fr] items-end gap-1">
            {sideItems.slice(0, 2).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex min-h-[44px] flex-col items-center justify-end gap-0.5 rounded-[1rem] px-1 py-0.5 text-[10px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                    isActive ? 'text-text' : 'text-text/64'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`inline-flex h-6.5 w-6.5 items-center justify-center rounded-full transition ${
                        isActive
                          ? 'border border-white/14 bg-[linear-gradient(160deg,#22b86f,#178a58)] text-white shadow-[0_10px_20px_rgba(23,169,101,.28)]'
                          : 'text-current'
                      }`}
                    >
                      <item.icon size={16} />
                    </span>
                    <span className={`font-medium tracking-[0.01em] ${isActive ? 'text-cyan' : 'text-text/66'}`}>
                      {t(item.labelKey)}
                    </span>
                  </>
                )}
              </NavLink>
            ))}

            <div aria-hidden className="h-7" />

            {sideItems.slice(2).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex min-h-[44px] flex-col items-center justify-end gap-0.5 rounded-[1rem] px-1 py-0.5 text-[10px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                    isActive ? 'text-text' : 'text-text/64'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`inline-flex h-6.5 w-6.5 items-center justify-center rounded-full transition ${
                        isActive
                          ? 'border border-white/14 bg-[linear-gradient(160deg,#22b86f,#178a58)] text-white shadow-[0_10px_20px_rgba(23,169,101,.28)]'
                          : 'text-current'
                      }`}
                    >
                      <item.icon size={16} />
                    </span>
                    <span className={`font-medium tracking-[0.01em] ${isActive ? 'text-cyan' : 'text-text/66'}`}>
                      {t(item.labelKey)}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </motion.div>
      </nav>
    </>
  );
}
