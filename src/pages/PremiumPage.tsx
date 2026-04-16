import { useTranslation } from 'react-i18next';
import { PremiumPlanCard } from '@/components/premium/PremiumPlanCard';
import { useAppStore } from '@/store/useAppStore';

export function PremiumPage() {
  const { t } = useTranslation();
  const plans = useAppStore((s) => s.premiumPlans);

  return (
    <div className="space-y-4 pb-8">
      <section className="premium-card rounded-3xl p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan">MA3AK Pro</p>
        <h1 className="mt-2 font-heading text-3xl text-text">{t('premiumTitle')}</h1>
        <p className="mt-2 text-sm text-muted">{t('premiumBody')}</p>
      </section>
      <div className="grid gap-4 md:grid-cols-2">
        {plans.map((plan) => (
          <PremiumPlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
