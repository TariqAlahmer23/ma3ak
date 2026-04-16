import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { sessions } from '@/data/mock';
import { useAppStore } from '@/store/useAppStore';

export function CircleDetailPage() {
  const { t } = useTranslation();
  const params = useParams();
  const circles = useAppStore((s) => s.circles);
  const circle = circles.find((c) => c.id === params.id);
  if (!circle) return <p className="text-sm text-muted">{t('circleNotFound')}</p>;

  const circleSessions = sessions.filter((s) => s.circleId === circle.id);

  return (
    <div className="space-y-4 pb-8">
      <img src={circle.hero} alt={circle.name} className="h-44 w-full rounded-3xl border border-white/10 object-cover" />
      <section className="premium-card rounded-3xl p-5">
        <h1 className="font-heading text-2xl text-text">{circle.name}</h1>
        <p className="mt-2 text-sm text-muted">{circle.description}</p>
        <p className="mt-3 text-xs text-muted">{circle.members} {t('members')} • {circle.activeNow} {t('activeNow')}</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-heading text-lg text-text">{t('liveSessions')}</h2>
        {circleSessions.map((s) => (
          <div key={s.id} className="premium-card-soft rounded-2xl p-4">
            <h3 className="font-medium text-text">{s.title}</h3>
            <p className="mt-1 text-sm text-muted">{s.locationLabel}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
