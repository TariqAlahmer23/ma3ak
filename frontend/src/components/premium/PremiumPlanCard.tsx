import { useTranslation } from 'react-i18next';
import type { PremiumPlan } from '@/types/domain';

export function PremiumPlanCard({ plan }: { plan: PremiumPlan }) {
  const { t } = useTranslation();
  return (
    <article
      className={`rounded-3xl border p-5 ${
        plan.highlight
          ? 'premium-card border-accent/60 bg-gradient-to-b from-accent/15 to-surface shadow-glow'
          : 'premium-card'
      }`}
    >
      <p className="text-sm text-accent">{plan.name}</p>
      <h3 className="mt-2 font-heading text-2xl text-text">{plan.price}</h3>
      <p className="mt-1 text-sm text-muted">{plan.description}</p>
      <ul className="mt-4 space-y-2 text-sm text-text">
        {plan.features.map((feature) => (
          <li key={feature}>• {feature}</li>
        ))}
      </ul>
      <button className="premium-btn mt-5 w-full rounded-2xl px-4 py-2 text-sm font-semibold">
        {t('choosePlan', { name: plan.name })}
      </button>
    </article>
  );
}
