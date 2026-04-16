import { useTranslation } from 'react-i18next';
import { clsx } from '@/utils';

export function ReliabilityMeter({ score, className }: { score: number; className?: string }) {
  const { t } = useTranslation();
  return (
    <div className={clsx('space-y-1', className)}>
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{t('reliability')}</span>
        <span>{score}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted/35">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
