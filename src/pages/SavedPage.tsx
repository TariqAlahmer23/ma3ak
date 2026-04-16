import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SessionCard } from '@/components/cards/SessionCard';
import { EmptyState } from '@/components/states/EmptyState';
import { users } from '@/data/mock';
import { useAppStore } from '@/store/useAppStore';

export function SavedPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sessions = useAppStore((s) => s.sessions);
  const saved = useAppStore((s) => s.savedSessionIds);

  const items = sessions.filter((session) => saved.includes(session.id));
  if (!items.length) {
    return (
      <EmptyState
        title={t('noSavedSessions')}
        body={t('savedBody')}
        action={<button onClick={() => navigate('/sessions')} className="premium-btn rounded-2xl px-4 py-2 text-sm">{t('explore')}</button>}
      />
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-3xl text-text">{t('savedSessions')}</h1>
      {items.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          host={users.find((u) => u.id === session.hostId)}
          onOpen={(id) => navigate(`/sessions/${id}`)}
        />
      ))}
    </div>
  );
}
