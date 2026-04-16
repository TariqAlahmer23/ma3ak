import type { Intent } from '@/types/domain';
import { useDomainLabels } from '@/hooks/useDomainLabels';
import { clsx } from '@/utils';

const allIntents: Intent[] = ['study', 'work', 'project', 'networking', 'outing', 'coffee', 'walk', 'meet'];

type Props = {
  selected: Intent[];
  onChange: (next: Intent[]) => void;
};

export function PillFilterBar({ selected, onChange }: Props) {
  const { intentLabel } = useDomainLabels();

  return (
    <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      {allIntents.map((intent) => {
        const active = selected.includes(intent);
        return (
          <button
            key={intent}
            onClick={() => onChange(active ? selected.filter((x) => x !== intent) : [...selected, intent])}
            className={clsx(
              'rounded-full border px-4 py-2 text-sm transition',
              active ? 'premium-btn border-accent text-white' : 'premium-card-soft border-white/10 text-text hover:border-accent/45'
            )}
          >
            {intentLabel(intent)}
          </button>
        );
      })}
    </div>
  );
}
