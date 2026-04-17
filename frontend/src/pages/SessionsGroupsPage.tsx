import { motion } from 'framer-motion';
import { Users2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleCard } from '@/components/cards/CircleCard';
import { SessionCard } from '@/components/cards/SessionCard';
import { PillFilterBar } from '@/components/ui/PillFilterBar';
import { circles, users } from '@/data/mock';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import type { Intent } from '@/types/domain';

type Tab = 'sessions' | 'groups';

export function SessionsGroupsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sessions = useAppStore((s) => s.sessions);
  const [tab, setTab] = useState<Tab>('sessions');
  const [intents, setIntents] = useState<Intent[]>([]);

  const filteredSessions = useMemo(
    () => (intents.length ? sessions.filter((s) => intents.includes(s.intent)) : sessions),
    [sessions, intents]
  );

  const filteredGroups = useMemo(
    () => (intents.length ? circles.filter((c) => intents.includes(c.intent)) : circles),
    [intents]
  );

  const activeTitle = tab === 'sessions' ? t('sessions') : t('groups');
  const visibleCount = tab === 'sessions' ? filteredSessions.length : filteredGroups.length;

  return (
    <div className="mx-auto max-w-5xl space-y-4 pb-28">
      <header className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div className="space-y-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cyan/80">{t('sessionsAndGroups')}</p>
            <h1 className="font-heading text-2xl text-text sm:text-[2rem]">{activeTitle}</h1>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted">
            {visibleCount}
          </div>
        </div>

        <section className="premium-card-soft grid grid-cols-2 gap-2 rounded-[1.75rem] p-1.5">
          <button
            onClick={() => setTab('sessions')}
            className={`flex min-h-[52px] items-center justify-center rounded-[1.2rem] px-4 text-sm font-semibold transition ${
              tab === 'sessions'
                ? 'nav-pill-active shadow-glow'
                : 'text-muted hover:bg-white/5 hover:text-text'
            }`}
          >
            {t('sessions')}
          </button>
          <button
            onClick={() => setTab('groups')}
            className={`flex min-h-[52px] items-center justify-center rounded-[1.2rem] px-4 text-sm font-semibold transition ${
              tab === 'groups'
                ? 'nav-pill-active shadow-glow'
                : 'text-muted hover:bg-white/5 hover:text-text'
            }`}
          >
            {t('groups')}
          </button>
        </section>

        <PillFilterBar selected={intents} onChange={setIntents} />
      </header>

      {tab === 'sessions' ? (
        <section className="grid gap-3.5 md:grid-cols-2 md:gap-4">
          {filteredSessions.map((session, idx) => (
            <motion.div key={session.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
              <SessionCard
                session={session}
                host={users.find((u) => u.id === session.hostId)}
                onOpen={(id) => navigate(`/sessions/${id}`)}
              />
            </motion.div>
          ))}
        </section>
      ) : (
        <section className="grid gap-3.5 md:grid-cols-2 md:gap-4">
          {filteredGroups.map((circle, idx) => (
            <motion.div key={circle.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
              <CircleCard
                circle={circle}
                onOpen={(id) => navigate(`/circles/${id}`)}
                action={
                  <button className="premium-btn-secondary inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm">
                    <Users2 size={14} /> {t('joinGroup')}
                  </button>
                }
              />
            </motion.div>
          ))}
        </section>
      )}
    </div>
  );
}
