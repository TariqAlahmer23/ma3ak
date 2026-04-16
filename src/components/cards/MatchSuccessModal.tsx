import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { MatchResult } from '@/types/domain';

export function MatchSuccessModal({
  match,
  onClose,
  onOpenChat
}: {
  match: MatchResult | null;
  onClose: () => void;
  onOpenChat: () => void;
}) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {match ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="premium-card fixed inset-x-4 top-1/2 z-50 -translate-y-1/2 rounded-3xl p-6 text-center shadow-2xl"
          >
            <motion.div
              className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-cyan/20 via-violet/20 to-coral/20"
              animate={{ opacity: [0.35, 0.65, 0.35] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            />
            <p className="text-sm uppercase tracking-[0.24em] text-accent">{t('itIsMatch')}</p>
            <h3 className="mt-2 font-heading text-2xl text-text">{match.title}</h3>
            <p className="mt-2 text-sm text-muted">{match.subtitle}</p>
            <div className="mt-4 flex justify-center -space-x-4">
              <img src={match.avatarA} className="h-16 w-16 rounded-full border-4 border-bg" />
              <img src={match.avatarB} className="h-16 w-16 rounded-full border-4 border-bg" />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button onClick={onClose} className="premium-btn-secondary rounded-2xl px-4 py-2 text-sm">
                {t('keepSwiping')}
              </button>
              <button onClick={onOpenChat} className="premium-btn rounded-2xl px-4 py-2 text-sm">
                {t('openChat')}
              </button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
