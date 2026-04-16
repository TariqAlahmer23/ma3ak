import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IntentSelector } from '@/components/ui/IntentSelector';
import { TimeSlotPicker } from '@/components/ui/TimeSlotPicker';
import { useDomainLabels } from '@/hooks/useDomainLabels';
import { useAppStore } from '@/store/useAppStore';
import type { PrivacyLevel, Vibe } from '@/types/domain';

const vibes: Vibe[] = ['social', 'focused', 'chill', 'ambitious', 'spontaneous'];
const privacy: PrivacyLevel[] = ['public', 'approval', 'invite', 'circle'];

export function WelcomePage() {
  const { t, vibeLabel, privacyLabel } = useDomainLabels();
  const navigate = useNavigate();
  const onboarding = useAppStore((s) => s.onboarding);
  const setOnboarding = useAppStore((s) => s.setOnboarding);
  const [vibesSelected, setVibesSelected] = useState<Vibe[]>(onboarding.vibes);

  return (
    <div className="space-y-5 pb-6">
      <h1 className="font-heading text-3xl text-text">{t('onboardingShapeSignal')}</h1>
      <section className="premium-card rounded-3xl p-5">
        <h2 className="font-semibold text-text">{t('chooseIntents')}</h2>
        <div className="mt-3">
          <IntentSelector value={onboarding.intents} onChange={(intents) => setOnboarding({ intents })} />
        </div>
      </section>
      <section className="premium-card rounded-3xl p-5">
        <h2 className="font-semibold text-text">{t('yourVibe')}</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {vibes.map((vibe) => (
            <button
              key={vibe}
              onClick={() =>
                setVibesSelected((cur) =>
                  cur.includes(vibe) ? cur.filter((x) => x !== vibe) : [...cur, vibe]
                )
              }
              className={`rounded-2xl border px-3 py-2 text-sm ${
                vibesSelected.includes(vibe)
                  ? 'border-accent bg-accent/20 text-cyan'
                  : 'premium-card-soft border-white/10 text-text'
              }`}
            >
              {vibeLabel(vibe)}
            </button>
          ))}
        </div>
      </section>
      <section className="premium-card rounded-3xl p-5">
        <h2 className="font-semibold text-text">{t('preferredTimes')}</h2>
        <div className="mt-3">
          <TimeSlotPicker
            value={onboarding.preferredTimes}
            onChange={(preferredTimes) => setOnboarding({ preferredTimes })}
          />
        </div>
      </section>
      <section className="premium-card rounded-3xl p-5">
        <h2 className="font-semibold text-text">{t('privacyComfort')}</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {privacy.map((mode) => (
            <button
              key={mode}
              onClick={() => setOnboarding({ privacyComfort: mode })}
              className={`rounded-2xl border px-3 py-2 text-sm ${
                onboarding.privacyComfort === mode
                  ? 'border-accent bg-accent/20 text-cyan'
                  : 'premium-card-soft border-white/10 text-text'
              }`}
            >
              {privacyLabel(mode)}
            </button>
          ))}
        </div>
      </section>
      <button
        onClick={() => {
          setOnboarding({ vibes: vibesSelected });
          navigate('/home');
        }}
        className="premium-btn sticky bottom-24 w-full rounded-2xl px-5 py-3 text-sm font-semibold"
      >
        {t('continueToApp')}
      </button>
    </div>
  );
}
