import { useTranslation } from 'react-i18next';
import { IntentSelector } from '@/components/ui/IntentSelector';
import { TimeSlotPicker } from '@/components/ui/TimeSlotPicker';
import { useAppStore } from '@/store/useAppStore';

export function EditPreferencesPage() {
  const { t } = useTranslation();
  const onboarding = useAppStore((s) => s.onboarding);
  const setOnboarding = useAppStore((s) => s.setOnboarding);

  return (
    <div className="space-y-4 pb-8">
      <h1 className="font-heading text-3xl text-text">{t('editPreferences')}</h1>
      <section className="premium-card rounded-3xl p-5">
        <h2 className="font-semibold text-text">{t('intentsTitle')}</h2>
        <div className="mt-3">
          <IntentSelector value={onboarding.intents} onChange={(intents) => setOnboarding({ intents })} />
        </div>
      </section>
      <section className="premium-card rounded-3xl p-5">
        <h2 className="font-semibold text-text">{t('preferredTime')}</h2>
        <div className="mt-3">
          <TimeSlotPicker
            value={onboarding.preferredTimes}
            onChange={(preferredTimes) => setOnboarding({ preferredTimes })}
          />
        </div>
      </section>
    </div>
  );
}
