import { BellRing } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { NotificationItem as N } from '@/types/domain';
import { formatRelative } from '@/utils';

export function NotificationItem({
  item,
  onClick
}: {
  item: N;
  onClick: (route: string, id: string) => void;
}) {
  const { t } = useTranslation();
  const title = t(`notificationTypes.${item.type}.title`);
  const body = t(`notificationTypes.${item.type}.body`);

  return (
    <button
      onClick={() => onClick(item.route, item.id)}
      className={`w-full rounded-2xl border p-4 text-left ${
        item.read ? 'premium-card-soft' : 'premium-card border-accent/25 shadow-glow'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="rounded-xl border border-accent/20 bg-accent/10 p-2 text-accent">
          <BellRing size={15} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-text">{title}</h4>
            <span className="text-xs text-muted">{formatRelative(item.createdAt)}</span>
          </div>
          <p className="mt-1 text-sm text-muted">{body}</p>
        </div>
      </div>
    </button>
  );
}
