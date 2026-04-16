import { motion } from 'framer-motion';
import { Layers3, Users2 } from 'lucide-react';
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

  return (
    <div className="mx-auto max-w-5xl space-y-5 pb-28">
      <section className="premium-card rounded-3xl p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan">{t('discover')}</p>
            <h1 className="font-heading text-3xl text-text">{t('sessionsAndGroups')}</h1>
            <p className="mt-1 text-sm text-muted">{t('discoverBody')}</p>
          </div>
          <div className="premium-card-soft rounded-2xl p-3 text-cyan"><Layers3 size={18} /></div>
        </div>
      </section>

      <section className="flex gap-2">
        <button
          onClick={() => setTab('sessions')}
          className={`rounded-2xl px-4 py-2 text-sm ${tab === 'sessions' ? 'premium-btn' : 'premium-btn-secondary'}`}
        >
          {t('sessions')}
        </button>
        <button
          onClick={() => setTab('groups')}
          className={`rounded-2xl px-4 py-2 text-sm ${tab === 'groups' ? 'premium-btn' : 'premium-btn-secondary'}`}
        >
          {t('groups')}
        </button>
      </section>

      <PillFilterBar selected={intents} onChange={setIntents} />

      {tab === 'sessions' ? (
        <section className="grid gap-4 md:grid-cols-2">
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
        <section className="grid gap-4 md:grid-cols-2">
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
