import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IntentSelector } from '@/components/ui/IntentSelector';
import { useAuthGate } from '@/hooks/useAuthGate';
import { useDomainLabels } from '@/hooks/useDomainLabels';
import { useAppStore } from '@/store/useAppStore';
import type { Intent, PrivacyLevel, Session, Vibe } from '@/types/domain';
import { uid } from '@/utils';

const vibeOptions: Vibe[] = ['social', 'focused', 'chill', 'ambitious', 'spontaneous'];

export function CreateSessionPage() {
  const { t } = useTranslation();
  const { vibeLabel, privacyLabel } = useDomainLabels();
  const navigate = useNavigate();
  const { requireAuth, isGuest } = useAuthGate();
  const addSession = useAppStore((s) => s.addSession);
  const me = useAppStore((s) => s.me);

  const [intents, setIntents] = useState<Intent[]>(['study']);
  const [title, setTitle] = useState('');
  const [privacy, setPrivacy] = useState<PrivacyLevel>('approval');
  const [vibes, setVibes] = useState<Vibe[]>([]);

  useEffect(() => {
    if (isGuest) requireAuth('create', undefined, '/create');
  }, [isGuest, requireAuth]);

  const submit = () => {
    const intent = intents[0] ?? 'study';
    const payload: Session = {
      id: uid('session'),
      title: title || t('untitledSession'),
      intent,
      hostId: me?.id ?? 'u_me',
      vibeTags: vibes,
      startsAt: new Date(Date.now() + 3600000).toISOString(),
      durationMins: 60,
      mode: 'in_person',
      capacity: 4,
      attendees: [me?.id ?? 'u_me'],
      privacy,
      locationLabel: t('approxArea'),
      note: t('createdQuickFlow'),
      cover: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=1200&q=80&auto=format&fit=crop'
    };
    addSession(payload);
    navigate(`/sessions/${payload.id}`);
  };

  return (
    <div className="space-y-4 pb-8">
      <h1 className="font-heading text-3xl text-text">{t('createInSeconds')}</h1>
      <div className="premium-card rounded-3xl p-5">
        <label className="space-y-2 text-sm">
          <span className="text-muted">{t('title')}</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('whatCoordinating')}
            className="premium-input w-full rounded-2xl px-3 py-2"
          />
        </label>
        <div className="mt-4">
          <p className="mb-2 text-sm text-muted">{t('intentTitle')}</p>
          <IntentSelector value={intents} onChange={setIntents} />
        </div>
        <div className="mt-4">
          <p className="mb-2 text-sm text-muted">{t('privacyTitle')}</p>
          <div className="grid grid-cols-2 gap-2">
            {(['public', 'approval', 'invite', 'circle'] as PrivacyLevel[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPrivacy(item)}
                className={`rounded-2xl border px-3 py-2 text-sm ${
                  privacy === item
                    ? 'border-accent bg-accent/20 text-cyan'
                    : 'premium-card-soft border-white/10 text-text'
                }`}
              >
                {privacyLabel(item)}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-2 text-sm text-muted">{t('vibesTitle')}</p>
          <div className="grid grid-cols-2 gap-2">
            {vibeOptions.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVibes((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]))}
                className={`rounded-2xl border px-3 py-2 text-sm ${
                  vibes.includes(v)
                    ? 'border-accent bg-accent/20 text-cyan'
                    : 'premium-card-soft border-white/10 text-text'
                }`}
              >
                {vibeLabel(v)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={submit}
        className="premium-btn sticky bottom-24 w-full rounded-2xl px-4 py-3 text-sm font-semibold"
      >
        {t('publishSession')}
      </button>
    </div>
  );
}
