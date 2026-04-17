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
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {allIntents.map((intent) => {
        const active = selected.includes(intent);
        return (
          <button
            key={intent}
            onClick={() => onChange(active ? selected.filter((x) => x !== intent) : [...selected, intent])}
            className={clsx(
              'shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition',
              active
                ? 'nav-pill-active shadow-glow'
                : 'premium-card-soft text-text/88 hover:border-accent/25 hover:text-text'
            )}
          >
            {intentLabel(intent)}
          </button>
        );
      })}
    </div>
  );
}
