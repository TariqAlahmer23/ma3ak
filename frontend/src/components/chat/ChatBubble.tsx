import type { Message, User } from '@/types/domain';
import { clsx, formatTime } from '@/utils';

export function ChatBubble({ message, meId, sender }: { message: Message; meId: string; sender?: User }) {
  const mine = message.senderId === meId;
  return (
    <div className={clsx('flex', mine ? 'justify-end' : 'justify-start')}>
      <div
        className={clsx(
          'max-w-[80%] rounded-2xl px-4 py-2 text-sm',
          mine
            ? 'premium-btn rounded-br-md text-white'
            : 'premium-card-soft rounded-bl-md border border-white/10 text-text'
        )}
      >
        {!mine && sender ? <p className="mb-1 text-xs text-muted">{sender.name}</p> : null}
        <p>{message.content}</p>
        <p className={clsx('mt-1 text-[10px]', mine ? 'text-white/80' : 'text-muted')}>{formatTime(message.createdAt)}</p>
      </div>
    </div>
  );
}
