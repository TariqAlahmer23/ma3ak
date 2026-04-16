import { motion } from 'framer-motion';
import { Clock3, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AvatarCluster } from '@/components/ui/AvatarCluster';
import { FloatingCTA } from '@/components/ui/FloatingCTA';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { users } from '@/data/mock';
import { useAuthGate } from '@/hooks/useAuthGate';
import { useDomainLabels } from '@/hooks/useDomainLabels';
import { useAppStore } from '@/store/useAppStore';
import { formatTime } from '@/utils';

const intentColor: Record<string, string> = {
  study: 'from-cyan/35 to-accent/15',
  work: 'from-accent/35 to-violet/15',
  project: 'from-violet/35 to-cyan/15',
  networking: 'from-coral/30 to-violet/15',
  outing: 'from-coral/35 to-accent/15',
  coffee: 'from-coral/35 to-cyan/15',
  walk: 'from-cyan/35 to-emerald-400/20',
  meet: 'from-violet/35 to-coral/20'
};

export function HomePage() {
  const { t } = useTranslation();
  const { intentLabel } = useDomainLabels();
  const navigate = useNavigate();
  const { requireAuth } = useAuthGate();
  const sessions = useAppStore((s) => s.sessions).slice(0, 5);
  const joinSession = useAppStore((s) => s.joinSession);

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-32">
      <section className="premium-card relative overflow-hidden rounded-[2rem] p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-mesh opacity-70" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/30 blur-3xl" />

        <div className="relative text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-cyan">{t('quickMatch')}</p>
          <h1 className="mt-2 font-heading text-3xl text-text md:text-4xl">{t('swipeByIntent')}</h1>
          <button
            onClick={() => navigate('/swipe')}
            className="premium-btn mt-5 inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-2xl px-6 py-4 text-lg font-bold"
          >
            <Sparkles size={18} />
            {t('imFreeNow')}
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl text-text">{t('happeningNow')}</h2>
          <span className="inline-flex items-center gap-1 text-xs text-cyan">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            {t('liveLabel')}
          </span>
        </div>

        <div className="space-y-4">
          {sessions.map((session, idx) => {
            const host = users.find((u) => u.id === session.hostId);
            const attendees = users.filter((u) => session.attendees.includes(u.id));
            const seatsLeft = Math.max(0, session.capacity - session.attendees.length);

            return (
              <motion.article
                key={session.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="premium-card overflow-hidden rounded-3xl"
              >
                <div className="relative h-44">
                  <img src={session.cover} alt={session.title} className="h-full w-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${intentColor[session.intent] ?? 'from-cyan/35 to-accent/15'}`} />
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/45 px-2 py-1 text-[11px] text-white">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    {t('liveLabel')}
                  </div>
                  <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/45 px-2 py-1 text-[11px] text-white">
                    {intentLabel(session.intent)}
                  </div>
                </div>

                <div className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-heading text-xl leading-tight text-text">{session.title}</h3>
                    {host ? <TrustBadge score={host.reliability.score} /> : null}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <AvatarCluster users={attendees} />
                    <span className="text-xs text-cyan">{t('joinedJustNow', { count: idx + 2 })}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted">
                    <span className="inline-flex items-center gap-1"><Clock3 size={14} /> {formatTime(session.startsAt)}</span>
                    <span>{seatsLeft} {t('spotsLeft')}</span>
                  </div>

                  <button
                    onClick={() => {
                      if (!requireAuth('join', session.id, '/home')) return;
                      joinSession(session.id);
                      navigate(`/sessions/${session.id}`);
                    }}
                    className="premium-btn w-full rounded-2xl px-4 py-2.5 text-sm font-semibold"
                  >
                    {t('joinNow')}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="premium-card-soft rounded-3xl p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="font-heading text-lg text-text">{t('quickMatch')}</h3>
            <p className="text-sm text-muted">{t('swipeHint')}</p>
          </div>
          <button onClick={() => navigate('/swipe')} className="premium-btn rounded-2xl px-4 py-2 text-sm font-semibold">
            {t('findPeopleNow')}
          </button>
        </div>
      </section>

      <FloatingCTA onClick={() => navigate('/create')} label={t('createSession')} />
    </div>
  );
}
