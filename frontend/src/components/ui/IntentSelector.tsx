import type { Intent } from '@/types/domain';
import { useDomainLabels } from '@/hooks/useDomainLabels';
import { clsx } from '@/utils';

const intents: Intent[] = ['study', 'work', 'project', 'networking', 'outing', 'coffee', 'walk', 'meet'];

export function IntentSelector({ value, onChange }: { value: Intent[]; onChange: (v: Intent[]) => void }) {
  const { intentLabel } = useDomainLabels();

  return (
    <div className="grid grid-cols-2 gap-2">
      {intents.map((intent) => {
        const active = value.includes(intent);
        return (
          <button
            type="button"
            key={intent}
            onClick={() => onChange(active ? value.filter((x) => x !== intent) : [...value, intent])}
            className={clsx(
              'rounded-2xl border px-3 py-2 text-sm transition',
              active ? 'premium-tag border-accent/30 bg-accent/15 text-text shadow-glow' : 'premium-card-soft text-text'
            )}
          >
            {intentLabel(intent)}
          </button>
        );
      })}
    </div>
  );
}
