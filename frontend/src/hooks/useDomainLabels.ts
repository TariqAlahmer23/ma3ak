import { useTranslation } from 'react-i18next';
import type { Intent, PrivacyLevel, Vibe } from '@/types/domain';

type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'late';

export function useDomainLabels() {
  const { t } = useTranslation();

  return {
    t,
    intentLabel: (intent: Intent | 'mixed') => t(`intents.${intent}`),
    vibeLabel: (vibe: Vibe) => t(`vibes.${vibe}`),
    privacyLabel: (privacy: PrivacyLevel) => t(`privacy.${privacy}`),
    timeSlotLabel: (slot: TimeSlot) => t(`timeSlots.${slot}`)
  };
}
