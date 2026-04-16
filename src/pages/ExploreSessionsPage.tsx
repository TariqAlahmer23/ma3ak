import { Compass } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SessionCard } from '@/components/cards/SessionCard';
import { PillFilterBar } from '@/components/ui/PillFilterBar';
import { users } from '@/data/mock';
import { useAppStore } from '@/store/useAppStore';

export function ExploreSessionsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sessions = useAppStore((s) => s.sessions);
  const filters = useAppStore((s) => s.filters);
  const setFilters = useAppStore((s) => s.setFilters);

  const filtered = filters.intents.length
    ? sessions.filter((s) => filters.intents.includes(s.intent))
    : sessions;

  return (
    <div className="space-y-4">
      <section className="premium-card rounded-3xl p-5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan">{t('discover')}</p>
            <h1 className="font-heading text-3xl text-text">{t('exploreSessions')}</h1>
          </div>
          <div className="premium-card-soft rounded-2xl p-3 text-cyan"><Compass size={18} /></div>
        </div>
      </section>

      <PillFilterBar selected={filters.intents} onChange={(intents) => setFilters({ intents })} />

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            host={users.find((u) => u.id === session.hostId)}
            onOpen={(id) => navigate(`/sessions/${id}`)}
          />
        ))}
      </div>
    </div>
  );
}
