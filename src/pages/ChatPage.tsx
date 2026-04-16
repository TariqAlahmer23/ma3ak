import { SendHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { TypingPulse } from '@/components/chat/TypingPulse';
import { users } from '@/data/mock';
import { useAppStore } from '@/store/useAppStore';

export function ChatPage() {
  const { t } = useTranslation();
  const { threadId } = useParams();
  const [text, setText] = useState('');
  const me = useAppStore((s) => s.me);
  const threads = useAppStore((s) => s.threads);
  const messages = useAppStore((s) => s.messages);
  const sendMessage = useAppStore((s) => s.sendMessage);

  const thread = threads.find((tt) => tt.id === threadId);
  const threadMessages = useMemo(() => messages.filter((m) => m.threadId === threadId), [messages, threadId]);

  if (!thread) return <p className="text-sm text-muted">{t('threadNotFound')}</p>;

  return (
    <div className="premium-card flex h-[72vh] flex-col rounded-3xl">
      <header className="border-b border-white/10 px-4 py-3">
        <h1 className="font-heading text-lg text-text">{thread.title}</h1>
        <p className="text-xs text-muted">{thread.kind === 'group' ? t('groupCoordination') : t('directChat')}</p>
      </header>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {threadMessages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            meId={me?.id ?? 'u_me'}
            sender={users.find((u) => u.id === message.senderId)}
          />
        ))}
        <TypingPulse />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim() || !threadId) return;
          sendMessage(threadId, text.trim());
          setText('');
        }}
        className="border-t border-white/10 p-3"
      >
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="premium-input flex-1 rounded-2xl px-3 py-2 text-sm"
            placeholder={t('typeMessage')}
          />
          <button className="premium-btn rounded-2xl px-3" type="submit">
            <SendHorizontal size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
