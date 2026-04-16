import { Compass, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SessionCard } from '@/components/cards/SessionCard';
import { sessions, users } from '@/data/mock';

export function GuestExplorePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <section className="premium-card rounded-3xl p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan">{t('guestMode')}</p>
            <h1 className="font-heading text-3xl text-text">{t('exploreLiveSessions')}</h1>
            <p className="mt-1 text-sm text-muted">{t('browseFreelyBody')}</p>
          </div>
          <div className="premium-card-soft rounded-2xl p-3 text-cyan">
            <Compass size={20} />
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            host={users.find((u) => u.id === session.hostId)}
            onOpen={(id) => navigate(`/sessions/${id}`)}
            action={
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/auth');
                }}
                className="premium-btn inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm"
              >
                <Lock size={14} />
                {t('joinLoginRequired')}
              </button>
            }
          />
        ))}
      </div>
    </div>
  );
}
