import { MessageCircle, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { AvatarCluster } from '@/components/ui/AvatarCluster';
import { JoinStateChip } from '@/components/ui/JoinStateChip';
import { ReliabilityMeter } from '@/components/ui/ReliabilityMeter';
import { useAuthGate } from '@/hooks/useAuthGate';
import { useAppStore } from '@/store/useAppStore';
import { users } from '@/data/mock';

export function SessionDetailPage() {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const { requireAuth } = useAuthGate();
  const sessions = useAppStore((s) => s.sessions);
  const toggleSaved = useAppStore((s) => s.toggleSaved);
  const joinSession = useAppStore((s) => s.joinSession);
  const me = useAppStore((s) => s.me);

  const session = sessions.find((s) => s.id === params.id);
  if (!session) return <p className="text-sm text-muted">{t('sessionNotFound')}</p>;

  const host = users.find((u) => u.id === session.hostId);
  const attendees = users.filter((u) => session.attendees.includes(u.id));

  return (
    <div className="space-y-4 pb-8">
      <img src={session.cover} className="h-52 w-full rounded-3xl border border-white/10 object-cover" alt={session.title} />
      <div className="premium-card rounded-3xl p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-heading text-2xl text-text">{session.title}</h1>
            <p className="mt-1 text-sm text-muted">{session.locationLabel} • {session.mode}</p>
          </div>
          <JoinStateChip state={session.privacy === 'public' ? 'accepted' : 'pending'} />
        </div>
        {host ? <ReliabilityMeter className="mt-4" score={host.reliability.score} /> : null}
        <p className="mt-4 text-sm text-muted">{session.note ?? t('noNote')}</p>
        <div className="mt-4 flex items-center justify-between">
          <AvatarCluster users={attendees} />
          <p className="text-xs text-muted">{t('joinedCount', { joined: session.attendees.length, capacity: session.capacity })}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => toggleSaved(session.id)}
          className="premium-btn-secondary inline-flex items-center justify-center gap-1 rounded-2xl px-3 py-2 text-sm"
        >
          <Save size={16} /> {t('save')}
        </button>
        <button
          onClick={() => {
            if (!requireAuth('chat', session.id, `/sessions/${session.id}`)) return;
            navigate('/chat/t1');
          }}
          className="premium-btn-secondary inline-flex items-center justify-center gap-1 rounded-2xl px-3 py-2 text-sm"
        >
          <MessageCircle size={16} /> {t('chat')}
        </button>
        <button
          onClick={() => {
            if (!requireAuth('join', session.id, `/sessions/${session.id}`)) return;
            joinSession(session.id);
          }}
          className="premium-btn rounded-2xl px-3 py-2 text-sm font-semibold"
        >
          {me ? t('joinNow') : t('join')}
        </button>
      </div>
    </div>
  );
}
