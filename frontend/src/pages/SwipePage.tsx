import { motion } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MatchSuccessModal } from '@/components/cards/MatchSuccessModal';
import { SwipeCardDeck } from '@/components/cards/SwipeCardDeck';
import { EmptyState } from '@/components/states/EmptyState';
import { useAuthGate } from '@/hooks/useAuthGate';
import { useSwipeDeck } from '@/hooks/useSwipeDeck';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { optimizeImageUrl, preloadImage } from '@/utils';

export function SwipePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { requireAuth } = useAuthGate();
  const sessions = useAppStore((s) => s.sessions);
  const me = useAppStore((s) => s.me);
  const likeSession = useAppStore((s) => s.likeSession);
  const setMatch = useAppStore((s) => s.setMatch);
  const match = useAppStore((s) => s.match);

  const { current, swipeNext, isComplete, remaining, reset } = useSwipeDeck(sessions);

  const canMatch = useMemo(() => !!me, [me]);

  const currentIndex = useMemo(
    () => (current ? sessions.findIndex((s) => s.id === current.id) : -1),
    [current, sessions]
  );

  useEffect(() => {
    if (!current || currentIndex < 0) return;

    const currentSession = sessions[currentIndex];
    const nextSession = sessions[currentIndex + 1];

    preloadImage(optimizeImageUrl(currentSession.cover, 880, 64));
    if (nextSession) preloadImage(optimizeImageUrl(nextSession.cover, 880, 64));
  }, [current, currentIndex, sessions]);

  if (isComplete || !current) {
    return (
      <EmptyState
        title={t('deckCompleted')}
        body={t('noMoreCardsBody')}
        action={
          <div className="flex justify-center gap-2">
            <button
              onClick={() => reset()}
              className="premium-btn-secondary inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm"
            >
              <RotateCcw size={14} /> {t('resetDeck')}
            </button>
            <button onClick={() => navigate('/sessions')} className="premium-btn rounded-2xl px-4 py-2 text-sm">
              {t('exploreSessions')}
            </button>
          </div>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <section className="premium-card relative overflow-hidden rounded-3xl p-4">
        <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan">{t('quickMatch')}</p>
            <h1 className="font-heading text-3xl text-text">{t('swipeByIntent')}</h1>
          </div>
          <div className="premium-card-soft rounded-2xl px-3 py-2 text-right">
            <p className="text-xs text-muted">{t('cardsLeft')}</p>
            <p className="font-heading text-xl text-text">{remaining}</p>
          </div>
        </div>
      </section>

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative">
        <div className="pointer-events-none absolute inset-x-8 top-6 -z-10 h-[60vh] rounded-[2rem] bg-violet/20 blur-3xl" />
        <SwipeCardDeck
          session={current}
          onSkip={() => swipeNext()}
          onLike={() => {
            if (!requireAuth('like', current.id, '/match')) return;
            likeSession(current.id);
            if (canMatch && current.privacy !== 'public') {
              setMatch({
                id: `m_${current.id}`,
                title: 'Intent synced',
                subtitle: `You and ${current.title} are aligned.`,
                avatarA: me?.avatar ?? '',
                avatarB: 'https://i.pravatar.cc/100?img=48'
              });
            }
            swipeNext();
          }}
        />
      </motion.section>

      <section className="premium-card-soft rounded-2xl p-3 text-xs text-muted">
        <div className="inline-flex items-center gap-1 text-cyan"><Sparkles size={13} />{t('proTip')}</div>
        <p className="mt-1">{t('swipeHint')}</p>
      </section>

      <MatchSuccessModal
        match={match}
        onClose={() => setMatch(null)}
        onOpenChat={() => {
          setMatch(null);
          navigate('/chat/t2');
        }}
      />
    </div>
  );
}
