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
              active ? 'border-accent bg-accent/20 text-cyan' : 'premium-card-soft border-white/10 text-text'
            )}
          >
            {intentLabel(intent)}
          </button>
        );
      })}
    </div>
  );
}
