import { motion } from 'framer-motion';
import type { Session } from '@/types/domain';
import { Clock3, MapPin, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useDomainLabels } from '@/hooks/useDomainLabels';
import { formatTime, optimizeImageUrl } from '@/utils';

export function SwipeCard({ session }: { session: Session }) {
  const { intentLabel, t } = useDomainLabels();
  const [loaded, setLoaded] = useState(false);

  const imageSrc = useMemo(() => optimizeImageUrl(session.cover, 880, 64), [session.cover]);

  return (
    <motion.div
      layout
      className="relative h-[52vh] w-full overflow-hidden rounded-[2rem] border border-white/15 bg-surface shadow-velvet md:h-[65vh]"
    >
      {!loaded ? (
        <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,.28),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,.16),transparent_30%),#0b1020]" />
      ) : null}

      <img
        src={imageSrc}
        alt={session.title}
        className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/75" />
      <div className="absolute inset-x-0 bottom-0 space-y-3 p-5 text-white">
        <span className="rounded-full bg-white/20 px-2 py-1 text-xs">{intentLabel(session.intent)}</span>
        <h3 className="font-heading text-2xl">{session.title}</h3>
        <div className="flex flex-wrap gap-3 text-xs text-white/90">
          <span className="inline-flex items-center gap-1"><Clock3 size={13} />{formatTime(session.startsAt)}</span>
          <span className="inline-flex items-center gap-1"><MapPin size={13} />{session.locationLabel}</span>
          <span className="inline-flex items-center gap-1"><Users size={13} />{session.capacity} {t('capacityShort')}</span>
        </div>
      </div>
    </motion.div>
  );
}
