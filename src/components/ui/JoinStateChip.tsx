import { useTranslation } from 'react-i18next';
import { clsx } from '@/utils';

type Props = { state: 'pending' | 'accepted' | 'declined' };

export function JoinStateChip({ state }: Props) {
  const { t } = useTranslation();
  const map = {
    pending: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30',
    accepted: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    declined: 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30'
  } as const;

  return (
    <span className={clsx('inline-flex rounded-full border px-3 py-1 text-xs', map[state])}>
      {t(state)}
    </span>
  );
}
