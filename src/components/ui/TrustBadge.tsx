import { ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function TrustBadge({ score }: { score: number }) {
  const { t } = useTranslation();
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-700 dark:text-emerald-300">
      <ShieldCheck size={12} />
      {t('trustTrusted', { score })}
    </div>
  );
}
