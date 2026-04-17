import { Clock3, MapPin, Users } from 'lucide-react';
import { useMemo, type ReactNode } from 'react';
import type { Session, User } from '@/types/domain';
import { useDomainLabels } from '@/hooks/useDomainLabels';
import { formatTime } from '@/utils';
import { intentColorMap } from '@/utils/tokens';
import { GlassSurface } from '@/components/ui/GlassSurface';
import { TrustBadge } from '@/components/ui/TrustBadge';

type Props = {
  session: Session;
  host?: User;
  onOpen: (id: string) => void;
  action?: ReactNode;
};

export function SessionCard({ session, host, onOpen, action }: Props) {
  const { t, intentLabel } = useDomainLabels();
  const seatsLeft = useMemo(() => session.capacity - session.attendees.length, [session]);

  return (
    <GlassSurface className="overflow-hidden">
      <button onClick={() => onOpen(session.id)} className="w-full text-left">
        <div className="relative h-32 w-full overflow-hidden sm:h-36">
          <img src={session.cover} alt={session.title} className="h-full w-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-b ${intentColorMap[session.intent]}`} />
          <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-[rgba(11,20,17,.62)] px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            {intentLabel(session.intent)}
          </div>
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="font-heading text-[1.02rem] leading-6 text-text">{session.title}</h3>
              <p className="mt-1 text-xs text-muted">{t('hostedBy', { name: host?.name ?? t('unknown') })}</p>
            </div>
            {host ? <TrustBadge score={host.reliability.score} /> : null}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5"><Clock3 size={13} /> {formatTime(session.startsAt)}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin size={13} /> {session.locationLabel}</span>
            <span className="inline-flex items-center gap-1.5"><Users size={13} /> {seatsLeft} {t('spotsLeft')}</span>
          </div>
          {session.note ? <p className="text-sm leading-6 text-muted/90">{session.note}</p> : null}
        </div>
      </button>
      {action ? <div className="p-4 pt-0">{action}</div> : null}
    </GlassSurface>
  );
}
