import { ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function TrustBadge({ score }: { score: number }) {
  const { t } = useTranslation();
  return (
    <div className="premium-tag inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs">
      <ShieldCheck size={12} />
      {t('trustTrusted', { score })}
    </div>
  );
}
