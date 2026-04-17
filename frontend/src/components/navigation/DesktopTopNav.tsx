import { motion } from 'framer-motion';
import { Bell, Map, MessageCircle, Plus, Sparkles, UserCircle2, Users2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';

const items = [
  { to: '/home', labelKey: 'map', icon: Map },
  { to: '/sessions', labelKey: 'sessions', icon: Users2 },
  { to: '/match', labelKey: 'match', icon: Sparkles },
  { to: '/messages', labelKey: 'messages', icon: MessageCircle }
];

const ambient = [
  { left: '8%', top: '18%', size: 10, delay: 0 },
  { left: '29%', top: '76%', size: 8, delay: 0.8 },
  { left: '49%', top: '14%', size: 9, delay: 1.5 },
  { left: '68%', top: '72%', size: 10, delay: 2.1 },
  { left: '88%', top: '26%', size: 8, delay: 2.9 }
];

export function DesktopTopNav() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const me = useAppStore((s) => s.me);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="hidden md:block">
      <div
        className={`nav-shell overflow-hidden rounded-[1.9rem] transition-all duration-300 ${
          isScrolled ? 'px-4 py-3 shadow-[0_30px_70px_-38px_rgba(0,0,0,0.5)]' : 'px-5 py-4'
        }`}
      >
        {ambient.map((item, index) => (
          <motion.span
            key={`${item.left}-${index}`}
            aria-hidden
            className="pointer-events-none absolute rounded-full"
            style={{
              left: item.left,
              top: item.top,
              width: item.size,
              height: item.size,
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.82), rgba(52,211,153,.34) 58%, rgba(52,211,153,0))',
              boxShadow: '0 0 10px rgba(52,211,153,.22)'
            }}
            animate={{ y: [0, -5, 0], opacity: [0.28, 0.7, 0.28] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: item.delay }}
          />
        ))}

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6">
          <button
            onClick={() => navigate('/home')}
            className="flex min-w-[180px] items-center gap-3 rounded-2xl px-1 py-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            aria-label="Go to home"
          >
            <img src="/MA3AK.png" alt="MA3AK logo" className="h-11 w-11 rounded-2xl object-cover ring-1 ring-white/10" />
            <div>
              <p className="font-heading text-sm tracking-[0.18em] text-text">{t('appName')}</p>
            </div>
          </button>

          <nav aria-label="Primary">
            <ul className="mx-auto flex w-fit items-center gap-1 rounded-[1.35rem] border border-line/60 bg-white/8 p-1.5 backdrop-blur-xl">
              {items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `inline-flex min-w-[118px] items-center justify-center gap-2 rounded-[1rem] px-4 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                        isActive ? 'nav-pill-active' : 'nav-pill'
                      }`
                    }
                  >
                    <item.icon size={15} />
                    {t(item.labelKey)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => navigate('/notifications')}
              className="nav-pill rounded-2xl p-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              aria-label={t('notifications')}
            >
              <Bell size={16} />
            </button>
            <button
              onClick={() => navigate('/profile/you')}
              className="nav-pill inline-flex items-center gap-2 rounded-2xl px-2.5 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              aria-label={me?.name ?? t('profile')}
            >
              {me?.avatar ? (
                <img src={me.avatar} alt={me.name} className="h-8 w-8 rounded-xl object-cover" />
              ) : (
                <UserCircle2 size={18} />
              )}
              <span className="max-w-[84px] truncate text-xs text-text">{me?.name ?? t('guest')}</span>
            </button>
            <button
              onClick={() => navigate('/create')}
              className="premium-btn inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              <Plus size={15} />
              {t('createSessionCta')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
