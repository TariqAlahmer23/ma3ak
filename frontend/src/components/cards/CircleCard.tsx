import type { ReactNode } from 'react';
import { UsersRound } from 'lucide-react';
import type { Circle } from '@/types/domain';
import { useDomainLabels } from '@/hooks/useDomainLabels';
import { GlassSurface } from '@/components/ui/GlassSurface';

type Props = {
  circle: Circle;
  onOpen: (id: string) => void;
  action?: ReactNode;
};

export function CircleCard({ circle, onOpen, action }: Props) {
  const { t, intentLabel } = useDomainLabels();

  return (
    <GlassSurface className="overflow-hidden">
      <button onClick={() => onOpen(circle.id)} className="w-full text-left">
        <div className="relative h-28 overflow-hidden sm:h-32">
          <img src={circle.hero} alt={circle.name} className="h-full w-full object-cover" />
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-[1.02rem] leading-6 text-text">{circle.name}</h3>
            <span className="shrink-0 rounded-full border border-accent/35 bg-accent/15 px-2.5 py-1 text-[11px] font-medium text-cyan">
              {intentLabel(circle.intent)}
            </span>
          </div>
          <p className="text-sm leading-6 text-muted/90">{circle.description}</p>
          <div className="inline-flex items-center gap-1.5 text-xs text-muted">
            <UsersRound size={13} /> {circle.members} {t('members')} | {circle.activeNow} {t('activeNow')}
          </div>
        </div>
      </button>
      {action ? <div className="p-4 pt-0">{action}</div> : null}
    </GlassSurface>
  );
}
