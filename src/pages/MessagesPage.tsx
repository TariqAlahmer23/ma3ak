import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { formatRelative } from '@/utils';

export function MessagesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const threads = useAppStore((s) => s.threads);

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-3xl text-text">{t('messages')}</h1>
      {threads.map((thread) => (
        <button
          key={thread.id}
          onClick={() => navigate(`/chat/${thread.id}`)}
          className="premium-card w-full rounded-2xl p-4 text-left"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-medium text-text">{thread.title}</h3>
              <p className="mt-1 text-sm text-muted">{thread.lastMessage}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted">{formatRelative(thread.lastMessageAt)}</p>
              {thread.unread > 0 ? (
                <span className="mt-1 inline-flex min-w-5 justify-center rounded-full bg-coral px-1.5 py-0.5 text-[10px] text-white">
                  {thread.unread}
                </span>
              ) : null}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
