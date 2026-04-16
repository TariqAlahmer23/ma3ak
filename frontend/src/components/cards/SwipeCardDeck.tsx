import { motion } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import type { Session } from '@/types/domain';
import { SwipeCard } from './SwipeCard';

export function SwipeCardDeck({
  session,
  onLike,
  onSkip
}: {
  session: Session;
  onLike: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <SwipeCard session={session} />
      </motion.div>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={onSkip}
          className="premium-btn-secondary inline-flex h-14 w-14 items-center justify-center rounded-full"
        >
          <X size={22} />
        </button>
        <button
          onClick={onLike}
          className="premium-btn inline-flex h-16 w-16 items-center justify-center rounded-full"
        >
          <Heart size={24} />
        </button>
      </div>
    </div>
  );
}
