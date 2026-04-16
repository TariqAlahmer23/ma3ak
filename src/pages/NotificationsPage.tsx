import { BellRing, Clock3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { NotificationItem } from '@/components/ui/NotificationItem';
import { useAppStore } from '@/store/useAppStore';

export function NotificationsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notifications = useAppStore((s) => s.notifications);
  const markNotificationRead = useAppStore((s) => s.markNotificationRead);

  return (
    <div className="space-y-4">
      <section className="premium-card rounded-3xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan">{t('updates')}</p>
            <h1 className="font-heading text-3xl text-text">{t('notifications')}</h1>
          </div>
          <div className="premium-card-soft rounded-2xl p-3 text-cyan"><BellRing size={18} /></div>
        </div>
      </section>

      <div className="premium-card-soft rounded-2xl p-3 text-xs text-muted">
        <span className="inline-flex items-center gap-1 text-cyan"><Clock3 size={13} />{t('realtimeSignal')}</span>
        <p className="mt-1">{t('notificationsFeedHint')}</p>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <NotificationItem
            key={item.id}
            item={item}
            onClick={(route, id) => {
              markNotificationRead(id);
              navigate(route);
            }}
          />
        ))}
      </div>
    </div>
  );
}
