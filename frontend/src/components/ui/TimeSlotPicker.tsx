import { useDomainLabels } from '@/hooks/useDomainLabels';

const slots = ['morning', 'afternoon', 'evening', 'late'] as const;

type Slot = (typeof slots)[number];

export function TimeSlotPicker({
  value,
  onChange
}: {
  value: Slot[];
  onChange: (next: Slot[]) => void;
}) {
  const { timeSlotLabel } = useDomainLabels();

  return (
    <div className="grid grid-cols-2 gap-2">
      {slots.map((slot) => {
        const active = value.includes(slot);
        return (
          <button
            key={slot}
            type="button"
            onClick={() => onChange(active ? value.filter((x) => x !== slot) : [...value, slot])}
            className={`rounded-2xl border px-3 py-2 text-sm ${
              active ? 'premium-tag border-accent/30 bg-accent/15 text-text shadow-glow' : 'premium-card-soft text-text'
            }`}
          >
            {timeSlotLabel(slot)}
          </button>
        );
      })}
    </div>
  );
}
