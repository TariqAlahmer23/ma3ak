import { motion } from 'framer-motion';
import { Bell, Map, MessageCircle, Plus, Sparkles, UserCircle2, Users2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';

const items = [
  { to: '/home', labelKey: 'map', icon: Map },
  { to: '/sessions', labelKey: 'sessions', icon: Users2 },
  { to: '/match', labelKey: 'match', icon: Sparkles }
];

const bubbles = [
  { left: '6%', top: '22%', size: 14, delay: 0 },
  { left: '18%', top: '74%', size: 11, delay: 0.8 },
  { left: '36%', top: '18%', size: 13, delay: 1.5 },
  { left: '54%', top: '72%', size: 10, delay: 2.2 },
  { left: '72%', top: '26%', size: 14, delay: 3 },
  { left: '90%', top: '68%', size: 12, delay: 3.8 }
];

export function DesktopTopNav() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const me = useAppStore((s) => s.me);

  return (
    <header className="hidden md:block">
      <div className="sticky top-3 z-40 overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(90deg,#0b1020_0%,#111827_52%,#161d2e_100%)] px-4 py-3 shadow-velvet backdrop-blur-xl">
        {bubbles.map((b, i) => (
          <motion.span
            key={`${b.left}-${i}`}
            aria-hidden
            className="pointer-events-none absolute rounded-full"
            style={{
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.95), rgba(34,211,238,.75) 58%, rgba(34,211,238,.22))',
              boxShadow: '0 0 14px rgba(34,211,238,.55)'
            }}
            animate={{ y: [0, -7, 0], opacity: [0.6, 0.95, 0.6], scale: [1, 1.08, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
          />
        ))}

        <div className="relative z-10 flex items-center justify-between gap-4">
          <button onClick={() => navigate('/home')} className="flex items-center gap-3 rounded-xl px-2 py-1 text-left">
            <img src="/MA3AK.png" alt="MA3AK logo" className="h-10 w-10 rounded-lg object-cover shadow-sm ring-1 ring-white/10" />
            <div>
              <p className="font-heading text-sm text-text">{t('appName')}</p>
            </div>
          </button>

          <nav>
            <ul className="flex items-center gap-1">
              {items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                        isActive ? 'premium-btn text-white' : 'premium-btn-secondary text-text'
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

          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/notifications')} className="premium-btn-secondary rounded-xl p-2" aria-label={t('notifications')}>
              <Bell size={16} />
            </button>
            <button onClick={() => navigate('/messages')} className="premium-btn-secondary rounded-xl p-2" aria-label={t('messages')}>
              <MessageCircle size={16} />
            </button>
            <button onClick={() => navigate('/create')} className="premium-btn inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold">
              <Plus size={15} />
              {t('createSessionCta')}
            </button>
            <button onClick={() => navigate('/profile/you')} className="premium-btn-secondary inline-flex items-center gap-2 rounded-xl px-2 py-1.5">
              {me?.avatar ? (
                <img src={me.avatar} alt={me.name} className="h-7 w-7 rounded-lg object-cover" />
              ) : (
                <UserCircle2 size={18} />
              )}
              <span className="text-xs text-text">{me?.name ?? t('guest')}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
