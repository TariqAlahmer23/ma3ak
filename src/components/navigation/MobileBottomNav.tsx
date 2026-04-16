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

const bubbles = [
  { left: '10%', top: '30%', size: 10, delay: 0 },
  { left: '30%', top: '72%', size: 8, delay: 0.8 },
  { left: '52%', top: '24%', size: 10, delay: 1.4 },
  { left: '74%', top: '70%', size: 9, delay: 2.1 },
  { left: '90%', top: '28%', size: 10, delay: 2.8 }
];

export function MobileBottomNav() {
  const { t } = useTranslation();

  return (
    <nav className="fixed inset-x-3 bottom-5 z-40 overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(90deg,#0b1020_0%,#111827_52%,#161d2e_100%)] p-2 shadow-velvet backdrop-blur-xl md:hidden">
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
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.95), rgba(59,130,246,.75) 58%, rgba(59,130,246,.2))',
            boxShadow: '0 0 12px rgba(59,130,246,.55)'
          }}
          animate={{ y: [0, -5, 0], opacity: [0.6, 0.95, 0.6], scale: [1, 1.08, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
        />
      ))}

      <ul className="relative z-10 grid grid-cols-5 gap-1">
        {nav.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center rounded-xl px-2 py-2 text-[11px] transition ${
                  isActive ? 'premium-btn text-white' : 'text-muted'
                }`
              }
            >
              <item.icon size={16} />
              {t(item.labelKey)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
